export type ApiErrorPayload = {
  detail?: string;
};

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(message: string, status: number, payload?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function getApiBaseUrl() {
  // NEXT_PUBLIC_* is required for browser usage.
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";
}

/**
 * PUBLIC_INTERFACE
 * Get the health status of the backend.
 * Currently the backend only exposes GET / in OpenAPI.
 */
export async function getBackendHealth(): Promise<unknown> {
  const url = `${getApiBaseUrl()}/`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    let payload: ApiErrorPayload | undefined;
    try {
      payload = (await res.json()) as ApiErrorPayload;
    } catch {
      // ignore
    }
    throw new ApiError(payload?.detail ?? "Backend health check failed", res.status, payload);
  }
  return res.json().catch(() => ({}));
}

/**
 * PUBLIC_INTERFACE
 * Read the current auth token stored by the app (client-side).
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("linguaspeak_token");
}

/**
 * PUBLIC_INTERFACE
 * Save (or clear) the auth token stored by the app (client-side).
 */
export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem("linguaspeak_token", token);
  else window.localStorage.removeItem("linguaspeak_token");
}
