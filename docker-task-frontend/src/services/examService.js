const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081"
).replace(/\/$/, "");

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      `Could not reach the backend at ${API_BASE_URL}. Check that the Spring Boot server is running.`,
    );
  }

  const raw = await response.text();
  let data;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }
  if (!response.ok) {
    const serverMessage =
      typeof data === "string"
        ? data
        : data?.message || data?.error || data?.details;
    const fallback =
      response.status === 400
        ? "Please check the submitted exam details."
        : response.status === 404
          ? "The requested exam was not found."
          : response.status >= 500
            ? "The server encountered an error."
            : "The request could not be completed.";
    throw new Error(serverMessage || `${fallback} (HTTP ${response.status})`);
  }
  return data;
}

export const examService = {
  list: () => request("/exam/displayall"),
  create: (exam) =>
    request("/exam/add", { method: "POST", body: JSON.stringify(exam) }),
  get: (id) => request(`/exam/display/${encodeURIComponent(id)}`),
  update: (id, exam) =>
    request(`/exam/update/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(exam),
    }),
  remove: (id) =>
    request(`/exam/delete/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
