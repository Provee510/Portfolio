const API_URL = (
  import.meta.env.VITE_API_URL || "https://portfolio-p6yc.onrender.com"
).replace(/\/+$/, "");

export function getToken() {
  return localStorage.getItem("provee_admin_token");
}

export function setToken(token) {
  localStorage.setItem("provee_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("provee_admin_token");
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && path !== "/api/auth/login") {
      clearToken();
    }

    throw new Error(data.message || `Request failed (${response.status}).`);
  }

  return data;
}

export { API_URL };