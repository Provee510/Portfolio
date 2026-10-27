
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  FilePlus2,
  ImagePlus,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  X,
  ExternalLink,
} from "lucide-react";

import {
  apiRequest,
  clearToken,
  getToken,
  setToken,
} from "../lib/api.js";

const emptyForm = {
  title: "",
  category: "",
  shortDescription: "",
  description: "",
  technologies: "",
  liveUrl: "",
  githubUrl: "",
  year: String(new Date().getFullYear()),
  sortOrder: "0",
  featured: false,
  status: "draft",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#C5FF62]/70";

const labelClass = "mb-2 block text-xs font-medium text-white/65";

function makeScreenshotUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(value.trim());

    if (!["http:", "https:"].includes(url.protocol)) return "";

    return `https://image.thum.io/get/width/1200/crop/900/noanimate/${url.toString()}`;
  } catch {
    return "";
  }
}

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const published = status === "published";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
        published
          ? "bg-[#C5FF62]/10 text-[#C5FF62]"
          : "bg-white/10 text-white/60"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          published ? "bg-[#C5FF62]" : "bg-white/40"
        }`}
      />
      {published ? "Published" : "Draft"}
    </span>
  );
}

function ProjectForm({ project, onClose, onSaved }) {
  const [form, setForm] = useState(() => {
    if (!project) return { ...emptyForm };

    return {
      title: project.title || "",
      category: project.category || "",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      technologies: (project.technologies || []).join(", "),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      year: String(project.year || new Date().getFullYear()),
      sortOrder: String(project.sortOrder ?? 0),
      featured: Boolean(project.featured),
      status: project.status || "draft",
    };
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const screenshotUrl = makeScreenshotUrl(form.liveUrl);

  useEffect(() => {
    setImageFailed(false);

    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setImagePreview(screenshotUrl || project?.coverImage?.url || "");
  }, [image, screenshotUrl, project?.coverImage?.url]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.liveUrl.trim() && !image && !project?.coverImage?.url) {
      setError(
        "Enter a live website URL to generate a screenshot, or upload a cover image."
      );
      return;
    }

    const payload = new FormData();

    payload.append("title", form.title.trim());
    payload.append("category", form.category.trim());
    payload.append("shortDescription", form.shortDescription.trim());
    payload.append("description", form.description.trim());
    payload.append(
      "technologies",
      JSON.stringify(
        form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );
    payload.append("liveUrl", form.liveUrl.trim());
    payload.append("githubUrl", form.githubUrl.trim());
    payload.append("year", form.year);
    payload.append("sortOrder", form.sortOrder);
    payload.append("featured", String(form.featured));
    payload.append("status", form.status);

    if (image) payload.append("coverImage", image);

    try {
      setSaving(true);

      const endpoint = project
        ? `/api/projects/${project._id}`
        : "/api/projects";

      const result = await apiRequest(endpoint, {
        method: project ? "PUT" : "POST",
        body: payload,
      });

      await onSaved(result.message || "Project saved successfully.");
    } catch (requestError) {
      setError(requestError.message || "Unable to save this project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6">
      <div className="mx-auto my-4 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0C] shadow-2xl sm:my-8">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C5FF62]">
              Project workspace
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {project ? "Edit project" : "Add a project"}
            </h2>
            <p className="mt-2 text-sm text-white/45">
              Your saved details power the public project page.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Close project form"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 p-5 sm:p-8">
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
            >
              {error}
            </div>
          )}

          <div className="grid gap-7 md:grid-cols-[1fr_0.85fr]">
            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="title">
                  Project name *
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  maxLength={120}
                  value={form.title}
                  onChange={updateField}
                  placeholder="e.g. IronHarvest Equipment"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="category">
                  Category *
                </label>
                <input
                  id="category"
                  name="category"
                  required
                  maxLength={100}
                  value={form.category}
                  onChange={updateField}
                  placeholder="e.g. Business website"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="shortDescription">
                  Short description *
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  required
                  maxLength={240}
                  rows={3}
                  value={form.shortDescription}
                  onChange={updateField}
                  placeholder="A concise introduction to the project..."
                  className={`${inputClass} resize-y`}
                />
                <p className="mt-1 text-right text-[11px] text-white/30">
                  {form.shortDescription.length}/240
                </p>
              </div>

              <div>
                <label className={labelClass} htmlFor="description">
                  Full description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  maxLength={10000}
                  rows={7}
                  value={form.description}
                  onChange={updateField}
                  placeholder="Describe the project, its purpose, the work you did, and the result..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="technologies">
                  Technologies
                </label>
                <input
                  id="technologies"
                  name="technologies"
                  value={form.technologies}
                  onChange={updateField}
                  placeholder="React, Node.js, MongoDB"
                  className={inputClass}
                />
                <p className="mt-2 text-xs text-white/35">
                  Separate technologies with commas.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Homepage screenshot</label>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
                  <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/80" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                    <span className="h-2 w-2 rounded-full bg-green-400/80" />
                    <span className="ml-2 truncate text-[10px] text-white/40">
                      {form.liveUrl || "Enter a website URL below"}
                    </span>
                  </div>

                  <div className="relative flex min-h-48 items-center justify-center bg-[#171717]">
                    {imagePreview && !imageFailed ? (
                      <img
                        src={imagePreview}
                        alt="Homepage screenshot preview"
                        className="min-h-48 w-full object-cover"
                        onError={() => setImageFailed(true)}
                      />
                    ) : (
                      <div className="px-5 py-10 text-center">
                        <ImagePlus
                          size={28}
                          className="mx-auto mb-3 text-[#C5FF62]"
                        />
                        <p className="text-sm text-white/75">
                          {imageFailed
                            ? "The screenshot could not be loaded."
                            : "Your preview will appear here."}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-white/35">
                          Enter a live URL, or upload an image below.
                        </p>
                      </div>
                    )}
                  </div>

                  {form.liveUrl && (
                    <a
                      href={form.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3 text-xs text-[#C5FF62] hover:bg-white/5"
                    >
                      Open live website <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                <p className="mt-2 text-xs leading-5 text-white/35">
                  Screenshot previews are generated from your website URL.
                  They may take a moment to load.
                </p>

                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs text-white/65 transition hover:bg-white/5">
                  <Upload size={15} />
                  {image ? image.name : "Upload a custom cover image (optional)"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                      setImage(event.target.files?.[0] || null);
                      setImageFailed(false);
                    }}
                  />
                </label>

                {image && (
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="mt-2 text-xs text-white/45 hover:text-white"
                  >
                    Use website screenshot instead
                  </button>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="liveUrl">
                  Live website URL *
                </label>
                <input
                  id="liveUrl"
                  name="liveUrl"
                  type="url"
                  required={!image && !project?.coverImage?.url}
                  value={form.liveUrl}
                  onChange={(event) => {
                    updateField(event);
                    setImageFailed(false);
                  }}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="githubUrl">
                  GitHub repository URL
                </label>
                <input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  value={form.githubUrl}
                  onChange={updateField}
                  placeholder="https://github.com/username/project"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} htmlFor="year">
                    Year
                  </label>
                  <input
                    id="year"
                    name="year"
                    type="number"
                    min="2000"
                    max="2100"
                    value={form.year}
                    onChange={updateField}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="sortOrder">
                    Display order
                  </label>
                  <input
                    id="sortOrder"
                    name="sortOrder"
                    type="number"
                    value={form.sortOrder}
                    onChange={updateField}
                    className={inputClass}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={updateField}
                  className="mt-1 accent-[#C5FF62]"
                />
                <span>
                  <span className="block text-sm text-white">
                    Feature this project
                  </span>
                  <span className="mt-1 block text-xs text-white/40">
                    Give it priority in the featured section.
                  </span>
                </span>
              </label>

              <div>
                <label className={labelClass} htmlFor="status">
                  Publishing status
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option value="draft">Save as draft</option>
                  <option value="published">Publish project</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/65 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5FF62] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff8c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {saving ? "Saving..." : project ? "Save changes" : "Save project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [admin, setAdmin] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [pageError, setPageError] = useState("");
  const [notice, setNotice] = useState("");
  const [formProject, setFormProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);
    setPageError("");

    try {
      const result = await apiRequest("/api/projects/admin/all");
      setProjects(result.projects || []);
    } catch (error) {
      setPageError(error.message);
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  const verifySession = useCallback(async () => {
    if (!getToken()) {
      setCheckingSession(false);
      return;
    }

    try {
      const result = await apiRequest("/api/auth/me");
      setAdmin(result.admin);
    } catch {
      clearToken();
      setAdmin(null);
    } finally {
      setCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  useEffect(() => {
    if (admin) loadProjects();
  }, [admin, loadProjects]);

  async function handleLogin(event) {
    event.preventDefault();
    setPageError("");
    setLoginLoading(true);

    try {
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(result.token);
      setAdmin(result.admin);
      setPassword("");
    } catch (error) {
      setPageError(error.message);
    } finally {
      setLoginLoading(false);
    }
  }

  function handleLogout() {
    clearToken();
    setAdmin(null);
    setProjects([]);
    setPageError("");
    setNotice("");
  }

  async function handleSaved(message) {
    setShowForm(false);
    setFormProject(null);
    setNotice(message);
    await loadProjects();
  }

  async function handleDelete(project) {
    if (
      !window.confirm(
        `Delete "${project.title}" permanently?`
      )
    ) {
      return;
    }

    setPageError("");
    setNotice("");

    try {
      const result = await apiRequest(`/api/projects/${project._id}`, {
        method: "DELETE",
      });

      setNotice(result.message);
      await loadProjects();
    } catch (error) {
      setPageError(error.message);
    }
  }

  async function togglePublish(project) {
    const nextStatus =
      project.status === "published" ? "draft" : "published";

    setPageError("");
    setNotice("");

    const payload = new FormData();
    payload.append("status", nextStatus);

    try {
      const result = await apiRequest(`/api/projects/${project._id}`, {
        method: "PUT",
        body: payload,
      });

      setNotice(result.message || `Project ${nextStatus}.`);
      await loadProjects();
    } catch (error) {
      setPageError(error.message);
    }
  }

  const visibleProjects = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.status === filter;
    const term = search.trim().toLowerCase();

    const matchesSearch =
      !term ||
      project.title?.toLowerCase().includes(term) ||
      project.category?.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  const publishedCount = projects.filter(
    (project) => project.status === "published"
  ).length;

  const draftCount = projects.length - publishedCount;

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <LoaderCircle className="animate-spin text-[#C5FF62]" size={28} />
      </main>
    );
  }

  if (!admin) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-5 py-12 text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#C5FF62]/[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-500/[0.08] blur-[120px]" />

        <div className="relative w-full max-w-md">
          <a
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </a>

          <div className="rounded-3xl border border-white/10 bg-[#0E0E0E]/90 p-7 shadow-2xl sm:p-9">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C5FF62] text-black">
              <ShieldCheck size={23} />
            </div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C5FF62]">
              Private workspace
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back.
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/45">
              Sign in to manage your projects and control what visitors see.
            </p>

            {pageError && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
              >
                {pageError}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className={labelClass} htmlFor="admin-email">
                  Admin email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="admin-password">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C5FF62] px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-[#d5ff91] disabled:opacity-60"
              >
                {loginLoading ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <ShieldCheck size={17} />
                )}
                {loginLoading ? "Signing in..." : "Sign in securely"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-white/30">
              Authorized access only.
            </p>
          </div>

          <p className="mt-6 text-center text-[10px] tracking-[0.18em] text-white/25">
            PROVEE · ADMINISTRATION
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-white/10 bg-[#0B0B0B] p-6 lg:flex">
        <a href="/" className="text-xl font-bold tracking-tight">
          PROVEE<span className="text-[#C5FF62]">.</span>
        </a>

        <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/30">
          Portfolio control
        </p>

        <div className="mt-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Workspace
          </p>
          <div className="flex items-center gap-3 rounded-xl bg-[#C5FF62]/10 px-4 py-3 text-sm text-[#C5FF62]">
            <LayoutDashboard size={17} />
            Projects
          </div>
        </div>

        <div className="mt-auto border-t border-white/10 pt-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
              {(admin.name || "P").slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{admin.name}</p>
              <p className="truncate text-xs text-white/40">{admin.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#080808]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div>
            <p className="text-xs text-white/40">PROVEE / Workspace</p>
            <h1 className="mt-1 text-lg font-semibold">Project management</h1>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs text-white/65 transition hover:bg-white/5 sm:inline-flex"
            >
              View portfolio <ArrowUpRight size={14} />
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs text-white/65 transition hover:bg-white/5 lg:hidden"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C5FF62]">
                Your work, under control
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Projects<span className="text-[#C5FF62]">.</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
                Add your work, keep drafts private, and publish finished
                projects to your portfolio.
              </p>
            </div>

            <button
              onClick={() => {
                setFormProject(null);
                setShowForm(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5FF62] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d5ff91]"
            >
              <Plus size={17} />
              Add project
            </button>
          </div>

          {notice && (
            <div className="mt-7 flex items-center gap-2 rounded-xl border border-[#C5FF62]/20 bg-[#C5FF62]/[0.07] px-4 py-3 text-sm text-[#C5FF62]">
              <Check size={17} />
              {notice}
              <button
                onClick={() => setNotice("")}
                className="ml-auto text-white/40 hover:text-white"
                aria-label="Dismiss notification"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {pageError && (
            <div
              role="alert"
              className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
            >
              <span>{pageError}</span>
              <button
                onClick={() => setPageError("")}
                aria-label="Dismiss error"
              >
                <X size={15} />
              </button>
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total projects", value: projects.length, note: "Across your workspace" },
              { label: "Published", value: publishedCount, note: "Visible to visitors" },
              { label: "Drafts", value: draftCount, note: "Private until published" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#0D0D0D] p-5 sm:p-6"
              >
                <p className="text-sm text-white/45">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold tabular-nums">
                  {String(stat.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs text-white/30">{stat.note}</p>
              </div>
            ))}
          </div>

          <section className="mt-10">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Your portfolio work</h3>
                <p className="mt-1 text-xs text-white/40">
                  Manage the projects stored in your database.
                </p>
              </div>

              <button
                onClick={loadProjects}
                disabled={loadingProjects}
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 px-3 py-2.5 text-xs text-white/60 transition hover:bg-white/5 disabled:opacity-50"
              >
                <RefreshCw size={14} className={loadingProjects ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            <div className="flex flex-col gap-3 py-5 sm:flex-row">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className={`${inputClass} sm:max-w-xs`}
              />

              <div className="flex flex-wrap gap-2">
                {[
                  ["all", "All projects"],
                  ["published", "Published"],
                  ["draft", "Drafts"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`rounded-xl px-4 py-2.5 text-xs transition ${
                      filter === value
                        ? "bg-white text-black"
                        : "border border-white/10 text-white/55 hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {loadingProjects ? (
              <div className="flex min-h-48 items-center justify-center text-white/40">
                <LoaderCircle className="mr-3 animate-spin" size={20} />
                Loading projects...
              </div>
            ) : visibleProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
                <FilePlus2 size={30} className="mx-auto mb-4 text-white/35" />
                <h4 className="font-medium">
                  {projects.length ? "No matching projects" : "Your next project starts here"}
                </h4>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/40">
                  {projects.length
                    ? "Try another search or filter."
                    : "Add a project to start building your portfolio."}
                </p>
                {projects.length === 0 && (
                  <button
                    onClick={() => {
                      setFormProject(null);
                      setShowForm(true);
                    }}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C5FF62] px-4 py-3 text-sm font-semibold text-black"
                  >
                    <Plus size={16} />
                    Create your first project
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {visibleProjects.map((project) => (
                  <article
                    key={project._id}
                    className="grid gap-4 border-b border-white/10 p-4 last:border-b-0 sm:grid-cols-[150px_1fr_auto] sm:items-center sm:gap-5 sm:p-5"
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-white/5">
                      {project.coverImage?.url ? (
                        <img
                          src={project.coverImage.url}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/30">
                          <Eye size={22} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium">{project.title}</h4>
                        <StatusBadge status={project.status} />
                        {project.featured && (
                          <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/50">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-white/40">
                        {project.category} · {project.year}
                      </p>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/55">
                        {project.shortDescription}
                      </p>
                      <p className="mt-2 text-[11px] text-white/30">
                        Updated {formatDate(project.updatedAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <button
                        onClick={() => togglePublish(project)}
                        title={project.status === "published" ? "Move to drafts" : "Publish project"}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs text-white/65 transition hover:bg-white/5"
                      >
                        {project.status === "published" ? <Eye size={14} /> : <Check size={14} />}
                        {project.status === "published" ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => {
                          setFormProject(project);
                          setShowForm(true);
                        }}
                        title="Edit project"
                        className="rounded-lg border border-white/10 p-2.5 text-white/65 transition hover:bg-white/5 hover:text-[#C5FF62]"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(project)}
                        title="Delete project"
                        className="rounded-lg border border-white/10 p-2.5 text-white/65 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <footer className="mt-12 flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>PROVEE Admin · Built to manage your work.</p>
            <p>Signed in as {admin.email}</p>
          </footer>
        </div>
      </div>

      {showForm && (
        <ProjectForm
          key={formProject?._id || "new-project"}
          project={formProject}
          onClose={() => {
            setShowForm(false);
            setFormProject(null);
          }}
          onSaved={handleSaved}
        />
      )}
    </main>
  );
}
