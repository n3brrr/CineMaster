// Builds a URL for the server-side TMDB proxy (api/tmdb.ts).
// The API key is added on the server; it never reaches the browser.
export function tmdbUrl(path: string, params: Record<string, string> = {}) {
  return `/api/tmdb?${new URLSearchParams({ path, ...params }).toString()}`;
}
