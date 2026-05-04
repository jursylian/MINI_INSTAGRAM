const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://mini-instagram-2.onrender.com/api";
const DEFAULT_TIMEOUT_MS = 12000;

function getToken() {
  return localStorage.getItem("token");
}

export async function request(path, options = {}) {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal: externalSignal,
    ...fetchOptions
  } = options;
  const headers = new Headers(fetchOptions.headers || {});
  const token = getToken();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener("abort", () => controller.abort(), {
        once: true,
      });
    }
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const body = fetchOptions.body;
  const isFormData = body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const message = data?.message || "Request failed";
      const error = new Error(message);
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      const error = new Error("Unable to load data. Please try again.");
      error.status = 408;
      throw error;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
