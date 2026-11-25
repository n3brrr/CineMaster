import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serves /api/tmdb in `vite dev` with the same function Vercel runs in production.
function tmdbDevApi(): Plugin {
  return {
    name: 'tmdb-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/tmdb', async (req, res) => {
        const { GET } = await server.ssrLoadModule('/api/tmdb.ts')
        const search = new URL(req.url ?? '', 'http://localhost').search
        const response: Response = await GET(
          new Request(`http://localhost/api/tmdb${search}`),
        )
        res.statusCode = response.status
        response.headers.forEach((value, name) => res.setHeader(name, value))
        res.end(Buffer.from(await response.arrayBuffer()))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Make TMDB_API_KEY from .env available to the dev API (never exposed to the client).
  process.env.TMDB_API_KEY ??= loadEnv(mode, process.cwd(), '').TMDB_API_KEY

  return {
    plugins: [react(), tailwindcss(), tmdbDevApi()],
  }
})
