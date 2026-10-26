
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { fetchPublishedProjects } from "../lib/publicProjects";

const filters = ["All projects", "Websites", "Applications", "Experiments"];

function categoryForProject(project) {
  const category = (project.category || "").toLowerCase();

  if (
    category.includes("prototype") ||
    category.includes("messaging") ||
    category.includes("application") ||
    category.includes("experiment")
  ) {
    return "Experiments";
  }

  if (
    category.includes("website") ||
    category.includes("e-commerce") ||
    category.includes("ecommerce") ||
    category.includes("fashion") ||
    category.includes("business")
  ) {
    return "Websites";
  }

  return "Applications";
}

function normalizeProject(project, index) {
  return {
    ...project,
    id: project.slug,
    number: String(index + 1).padStart(2, "0"),
    name: project.title,
    description:
      project.shortDescription || project.description || "",
    category: project.category || "Development",
    status: "Published",
    year: project.year || new Date().getFullYear(),
    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : [],
  };
}

function ProjectArtwork({ project, index }) {
  if (project.coverImage?.url) {
    return (
      <div className="relative min-h-[280px] overflow-hidden bg-[#EAE9E2] sm:min-h-[340px]">
        <img
          src={project.coverImage.url}
          alt={`${project.name} project cover`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs text-white backdrop-blur-md">
          {project.category}
        </span>

        <span className="absolute left-5 top-5 font-mono text-xs tracking-[0.18em] text-white drop-shadow">
          PROJECT / {String(index + 1).padStart(2, "0")}
        </span>

        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md">
          <ArrowUpRight size={18} strokeWidth={1.6} />
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-[#EAE9E2] p-5 sm:min-h-[340px] sm:p-7">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.18em] text-black/50">
          PROJECT / {String(index + 1).padStart(2, "0")}
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70">
          <ArrowUpRight size={18} strokeWidth={1.6} />
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/40">
          {project.category}
        </p>

        <h3 className="mt-3 max-w-lg text-4xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-6xl">
          {project.name}
        </h3>

        <p className="mt-4 max-w-md text-sm leading-6 text-black/55">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-black/10 pt-4">
        <span className="font-mono text-[10px] tracking-wider text-black/35">
          PROVEE STUDIO
        </span>
        <span className="text-xs text-black/45">{project.year}</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
      className="group"
    >
      <a
        href={`/projects/${encodeURIComponent(project.id)}`}
        className="block"
        aria-label={`View ${project.name} project`}
      >
        <div className="relative overflow-hidden">
          <ProjectArtwork project={project} index={index} />

          <div className="absolute inset-0 flex items-center justify-center bg-[#C5FF62]/0 transition-colors duration-300 group-hover:bg-[#C5FF62]/10">
            <span className="flex h-14 w-14 translate-y-3 items-center justify-center rounded-full bg-[#C5FF62] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={23} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest text-black/40">
                {project.number}
              </span>

              <span className="text-xs text-black/30">/</span>

              <span className="text-xs text-black/50">
                {project.category}
              </span>
            </div>

            <h2 className="text-2xl font-medium tracking-[-0.055em] transition-colors group-hover:text-[#566D2C] sm:text-3xl">
              {project.name}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-black/60">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] text-black/60"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#DDF5C4] px-3 py-2 text-[10px] font-medium text-[#31551D]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Published
          </span>
        </div>
      </a>
    </motion.article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All projects");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchPublishedProjects();

        if (!Array.isArray(data)) {
          throw new Error("The projects API returned an unexpected response.");
        }

        if (!cancelled) {
          setProjects(data.map(normalizeProject));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "We couldn't load your published projects."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All projects") return projects;

    return projects.filter(
      (project) => categoryForProject(project) === activeFilter
    );
  }, [projects, activeFilter]);

  const featuredProject = projects.find((project) => project.featured);

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#111111]">
      <Navbar />

      <section className="mx-auto max-w-[1600px] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-[1.5fr_0.5fr] lg:items-end"
        >
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black/60">
              <Sparkles size={13} />
              Selected work & experiments
            </div>

            <h1 className="max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-medium leading-[0.83] tracking-[-0.09em]">
              Ideas made
              <br />
              <span className="text-black/30">into reality.</span>
            </h1>
          </div>

          <div className="max-w-sm lg:justify-self-end">
            <p className="text-sm leading-7 text-black/60 sm:text-base">
              A collection of digital experiences, experiments, and products
              built with curiosity, intention, and a focus on the details.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-black/50">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10">
                <Code2 size={16} />
              </span>
              <span>Design-minded development</span>
              <span className="text-black/20">/</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10">
                <Layers3 size={16} />
              </span>
              <span>Full-stack thinking</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col gap-5 border-t border-black/10 pt-5 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-black/50">
            A closer look at what I’m building.
          </p>

          <div className="flex flex-wrap gap-2" aria-label="Filter projects">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2.5 text-xs transition-colors ${
                    isActive
                      ? "bg-[#111111] text-white"
                      : "border border-black/10 text-black/60 hover:border-black/30 hover:text-black"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {loading && (
          <div
            role="status"
            className="mt-10 grid gap-x-7 gap-y-12 md:grid-cols-2 md:gap-y-16"
          >
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-[340px] animate-pulse rounded-xl bg-black/[0.05]"
              />
            ))}
            <span className="sr-only">Loading published projects…</span>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 border border-black/10 bg-white/60 p-8 sm:p-10">
            <h2 className="text-xl font-medium tracking-tight">
              Projects couldn't be loaded.
            </h2>

            <p className="mt-3 text-sm leading-7 text-black/60">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-full bg-[#111111] px-5 py-3 text-sm text-white transition hover:bg-black/75"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-10 border border-black/10 bg-white/50 px-6 py-16 text-center sm:py-24">
            <p className="text-2xl font-medium tracking-tight">
              Your next chapter is loading.
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-black/55">
              No projects have been published yet. Publish a project from your
              admin dashboard and it will appear here.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            {featuredProject && activeFilter === "All projects" && (
              <div className="mb-16 mt-10 grid gap-8 border-b border-black/10 pb-14 md:mt-10 md:grid-cols-2 md:items-center md:gap-12">
                <a
                  href={`/projects/${encodeURIComponent(featuredProject.id)}`}
                  className="group relative block overflow-hidden"
                  aria-label={`Explore ${featuredProject.name}`}
                >
                  <ProjectArtwork project={featuredProject} index={0} />

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#C5FF62]/0 transition-colors duration-300 group-hover:bg-[#C5FF62]/10">
                    <span className="flex h-14 w-14 translate-y-3 items-center justify-center rounded-full bg-[#C5FF62] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={23} />
                    </span>
                  </div>
                </a>

                <div className="py-2">
                  <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#789C42]" />
                    Featured project
                  </span>

                  <h2 className="mt-5 text-4xl font-medium tracking-[-0.07em] sm:text-6xl">
                    {featuredProject.name}
                  </h2>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-black/60">
                    {featuredProject.description}
                  </p>

                  <a
                    href={`/projects/${encodeURIComponent(featuredProject.id)}`}
                    className="group mt-7 inline-flex items-center gap-3 border-b border-black/20 pb-2 text-sm font-medium"
                  >
                    Explore the project
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            )}

            <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 md:gap-y-16">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg tracking-tight">
                  No published projects match this category yet.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveFilter("All projects")}
                  className="mt-4 border-b border-black/30 pb-1 text-sm text-black/60 hover:text-black"
                >
                  Show all projects
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-20 border-t border-black/10 pt-6 sm:mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-black/50">
              Designed with intention. Built one step at a time.
            </p>

            <a
              href="/#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              Let’s build something
              <ArrowDownRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
