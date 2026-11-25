// Vercel serverless function: server-side proxy for TMDB.
// The API key lives only in the TMDB_API_KEY environment variable (no VITE_ prefix),
// so it is never bundled into the browser code.

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Only the endpoints and parameters the app needs: this is not an open proxy.
const ALLOWED_PATH = /^(discover\/movie|search\/movie|movie\/\d+)$/;
const ALLOWED_PARAMS = ["page", "language", "sort_by", "with_genres", "query"];

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export async function GET(request: Request): Promise<Response> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return json({ error: "TMDB_API_KEY is not configured" }, 500);
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "";
  if (!ALLOWED_PATH.test(path)) {
    return json({ error: "Path not allowed" }, 400);
  }

  const upstream = new URL(`${TMDB_BASE_URL}/${path}`);
  for (const name of ALLOWED_PARAMS) {
    const value = searchParams.get(name);
    if (value !== null) upstream.searchParams.set(name, value);
  }
  upstream.searchParams.set("api_key", apiKey);

  try {
    const response = await fetch(upstream, { signal: AbortSignal.timeout(8000) });
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "content-type": "application/json",
        "cache-control": response.ok
          ? "public, s-maxage=300, stale-while-revalidate=600"
          : "no-store",
      },
    });
  } catch {
    return json({ error: "Upstream request failed" }, 502);
  }
}
