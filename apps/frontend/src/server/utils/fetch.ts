const origin = process.env.BACKEND_URL;

export const cleanFetch = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(`${origin}/${input}`, {
    ...init,
    headers: { ...init?.headers, "Content-Type": "application/json" },
  });
