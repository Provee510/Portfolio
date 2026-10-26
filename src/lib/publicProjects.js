
import { apiRequest } from "./api.js";

export async function fetchPublishedProjects() {
  const data = await apiRequest("/api/projects");
  return data.projects;
}

export async function fetchPublishedProject(slug) {
  const data = await apiRequest(
    `/api/projects/${encodeURIComponent(slug)}`
  );

  return data.project;
}
