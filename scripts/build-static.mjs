/**
 * Static export build.
 *
 * `STATIC_EXPORT=true next build` is POSIX syntax and fails on Windows cmd,
 * and adding cross-env for a single variable is not worth a dependency in a
 * project that has deliberately kept its runtime dependencies to four.
 *
 * Produces `out/` - a plain folder of HTML/CSS/JS for upload to any ordinary
 * web host with no Node runtime (IONOS, cPanel, shared hosting).
 *
 * ---------------------------------------------------------------------------
 * Empty dynamic routes
 *
 * `output: 'export'` refuses any dynamic route whose generateStaticParams()
 * returns an empty array: "at least one route must be generated". Both
 * /blog/[slug] and /case-studies/[slug] are intentionally empty - there is no
 * published content yet, and inventing a placeholder post to satisfy the
 * bundler would put fabricated content on a live site (Constitution 48 Rule 8).
 *
 * So this script moves those route folders aside for the duration of the build
 * and restores them afterwards, including on failure. Once real content exists
 * the folders build normally and are left untouched.
 *
 * This only affects the static export. The standard `npm run build` used for
 * Vercel handles empty dynamic routes without complaint.
 */
import { spawn } from 'node:child_process'
import { cpSync, existsSync, renameSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const HOLDING = '.static-export-holding'

/** Route folders that cannot be exported while they have no content. */
const conditionalRoutes = [
  { route: join('src', 'app', 'blog', '[slug]'), content: 'posts' },
  { route: join('src', 'app', 'case-studies', '[slug]'), content: 'caseStudies' },
]

/** True when the matching content array is empty. */
async function isEmpty(exportName) {
  const mod =
    exportName === 'posts'
      ? await import('../src/content/blog.ts')
      : await import('../src/content/proof.ts')
  return (mod[exportName] ?? []).length === 0
}

const moved = []

function restore() {
  for (const { from, to } of moved.reverse()) {
    if (existsSync(from)) renameSync(from, to)
  }
  moved.length = 0
  rmSync(HOLDING, { recursive: true, force: true })
}

// Restore even if the process is interrupted.
process.on('SIGINT', () => {
  restore()
  process.exit(130)
})

try {
  mkdirSync(HOLDING, { recursive: true })

  for (const { route, content } of conditionalRoutes) {
    if (!existsSync(route)) continue
    if (!(await isEmpty(content))) continue

    const parked = join(HOLDING, content)
    renameSync(route, parked)
    moved.push({ from: parked, to: route })
    console.log(`Parked empty route ${route} for the export build`)
  }
} catch (error) {
  restore()
  console.error('Failed while preparing the export build:', error)
  process.exit(1)
}

const child = spawn('next', ['build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, STATIC_EXPORT: 'true' },
})

child.on('exit', (code) => {
  restore()

  if (code !== 0) {
    console.error('\nStatic export failed.')
    process.exit(code ?? 1)
  }

  // Next copies public/ into out/, but dotfiles are skipped on some platforms.
  // .htaccess carries the security headers, so losing it silently would be bad.
  if (existsSync(join('public', '.htaccess')) && existsSync('out')) {
    cpSync(join('public', '.htaccess'), join('out', '.htaccess'))
    console.log('Copied .htaccess into out/')
  }

  console.log('\nStatic export ready in ./out')
  console.log('Upload the CONTENTS of out/ to your web root, including .htaccess')
  process.exit(0)
})
