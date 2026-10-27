
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
} from "lucide-react";

import {
  fetchPublishedProject,
  fetchPublishedProjects,
} from "../lib/publicProjects";

function normalizeProject(project, index = 0) {
  return {
    ...project,
    id: project?.slug || "",
    name: project?.title || "Untitled project",
    number: String(index + 1).padStart(2, "0"),
    shortDescription: project?.shortDescription || "",
    description: project?.description || "",
    category: project?.category || "Development",
    year: project?.year || new Date().getFullYear(),
    status: project?.status || "published",
    technologies: Array.isArray(project?.technologies)
      ? project.technologies
      : [],
    coverImage: project?.coverImage || null,
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
  };
}

function ExternalLinkButton({ href, children, primary = false }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
        primary
          ? "bg-[#C5FF62] text-[#171916] hover:bg-[#d5ff91]"
          : "border border-black/10 bg-white/50 text-[#171916] hover:border-black/25 hover:bg-white"
      }`}
    >
      {children}
      <ExternalLink size={15} />
    </a>
  );
}

function ProjectScreenshot({ project }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [project.coverImage?.url]);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_90px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 border-b border-black/[0.08] bg-white px-4 py-3 sm:px-5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F27D75]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E9C36A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#82BD75]" />

        <div className="ml-3 min-w-0 flex-1 truncate rounded-md bg-[#F5F4F0] px-3 py-2 text-xs text-black/45">
          {project.liveUrl || project.name}
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} live website`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-black/45 transition hover:bg-black/5 hover:text-black"
          >
            <ArrowUpRight size={17} />
          </a>
        )}
      </div>

      {project.coverImage?.url && !imageFailed ? (
        <img
          src={project.coverImage.url}
          alt={`${project.name} website homepage`}
          onError={() => setImageFailed(true)}
          className="block aspect-[16/10] w-full bg-[#ECEBE5] object-cover object-top sm:aspect-[16/9]"
        />
      ) : (
        <div className="flex aspect-[16/10] flex-col items-center justify-center bg-[#ECEBE5] px-6 text-center sm:aspect-[16/9]">
          <Globe2 size={34} strokeWidth={1.2} className="text-black/35" />
          <p className="mt-4 text-sm font-medium text-black/65">
            Homepage preview unavailable
          </p>
          <p className="mt-2 max-w-sm text-xs leading-5 text-black/45">
            The project information is available, but its screenshot could not
            be loaded.
          </p>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black/65 underline underline-offset-4 hover:text-black"
            >
              Visit live website <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#F8F7F3] px-6 text-[#171916]"
      role="status"
    >
      <div className="text-center">
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-[#789C42]" />
        <p className="mt-5 text-sm text-black/55">Loading project…</p>
      </div>
    </main>
  );
}

function ErrorState({ message }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F7F3] px-6 text-[#171916]">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/40">
          Project unavailable
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.07em]">
          Nothing here yet.
        </h1>

        <p className="mt-4 text-sm leading-7 text-black/60">
          {message ||
            "This project may not exist or may no longer be published."}
        </p>

        <Link
          to="/projects"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171916] px-5 py-3 text-sm font-medium !text-white transition hover:bg-[#39432C]"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </div>
    </main>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProject() {
      setLoading(true);
      setError("");
      setProject(null);
      setOtherProjects([]);

      try {
        const projectData = await fetchPublishedProject(slug);

        if (!projectData) {
          throw new Error("This project could not be found.");
        }

        const selectedProject = normalizeProject(projectData);

        if (cancelled) return;

        setProject(selectedProject);

        // Related projects are optional. Their failure should not block
        // the main project details.
        try {
          const allProjects = await fetchPublishedProjects();

          if (!cancelled && Array.isArray(allProjects)) {
            setOtherProjects(
              allProjects
                .filter((item) => item.slug !== selectedProject.id)
                .map((item, index) => normalizeProject(item, index + 1))
                .slice(0, 2)
            );
          }
        } catch (relatedError) {
          console.error("Unable to load related projects:", relatedError);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError.message || "Unable to load this project."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (slug) {
      loadProject();
    } else {
      setError("A project address is required.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <LoadingState />;
  if (error || !project) return <ErrorState message={error} />;

  const hasTechnologies = project.technologies.length > 0;
  const isPublished = project.status === "published";

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#171916]">
      <header className="border-b border-black/[0.07]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
          <Link to="/" aria-label="PROVEE home">
            <span className="text-xl font-bold tracking-[-0.06em]">
              PROVEE<span className="text-[#8EBE38]">.</span>
            </span>
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#72746F] transition hover:text-[#171916]"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-24 lg:px-16 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs tracking-[0.18em] text-black/40">
              PROJECT / {project.number}
            </span>

            <span className="h-1 w-1 rounded-full bg-black/25" />

            <span className="text-xs text-black/50">{project.year}</span>

            <span className="inline-flex items-center gap-2 rounded-full bg-[#DDF5C4] px-3 py-1.5 text-[10px] font-medium text-[#31551D]">
              {isPublished ? (
                <CheckCircle2 size={13} />
              ) : (
                <CircleDashed size={13} />
              )}
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>

          <h1 className="mt-8 break-words text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.09em]">
            {project.name}
            <span className="text-[#A4D746]">.</span>
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <p className="max-w-2xl text-lg leading-8 text-[#777A72] sm:text-xl sm:leading-9">
              {project.shortDescription || project.description}
            </p>

            <div className="lg:justify-self-end">
              <p className="text-xs uppercase tracking-[0.16em] text-black/40">
                Project category
              </p>
              <p className="mt-2 text-sm font-medium">{project.category}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalLinkButton href={project.liveUrl} primary>
              View live project
            </ExternalLinkButton>
            <ExternalLinkButton href={project.githubUrl}>
              View source code
            </ExternalLinkButton>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ProjectScreenshot project={project} />
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-16">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-black/40">
            01 / Project details
          </p>

          <h2 className="mt-5 text-3xl font-medium tracking-[-0.06em] sm:text-4xl">
            The story behind the work.
          </h2>
        </div>

        <div>
          <p className="whitespace-pre-line break-words text-base leading-8 text-[#777A72]">
            {project.description ||
              project.shortDescription ||
              "No additional project description has been provided."}
          </p>

          {hasTechnologies && (
            <div className="mt-10 border-t border-black/10 pt-6">
              <div className="flex items-center gap-3">
                <Layers3 size={19} className="text-[#789C42]" />
                <h3 className="text-lg font-medium tracking-tight">
                  Technologies used
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-black/10 bg-white/50 px-4 py-2.5 text-sm text-black/65"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 border-t border-black/10 pt-6">
            <div className="flex items-center gap-3">
              <Code2 size={19} className="text-[#789C42]" />
              <h3 className="text-lg font-medium tracking-tight">
                Project information
              </h3>
            </div>

            <dl className="mt-5 divide-y divide-black/10">
              <div className="flex items-start justify-between gap-6 py-4">
                <dt className="text-sm text-black/45">Category</dt>
                <dd className="text-right text-sm font-medium">
                  {project.category}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6 py-4">
                <dt className="text-sm text-black/45">Year</dt>
                <dd className="text-right text-sm font-medium">
                  {project.year}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6 py-4">
                <dt className="text-sm text-black/45">Status</dt>
                <dd className="text-right text-sm font-medium">
                  {isPublished ? "Published" : "Draft"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {otherProjects.length > 0 && (
        <section className="border-t border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-black/40">
                  Keep exploring
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.06em] sm:text-5xl">
                  More from PROVEE.
                </h2>
              </div>

              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                All projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {otherProjects.map((item) => (
                <Link
                  key={item.id}
                  to={`/projects/${encodeURIComponent(item.id)}`}
                  className="group flex items-center justify-between gap-5 border border-black/10 bg-white/40 p-5 transition hover:border-[#B7D980] hover:bg-white sm:p-7"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-black/45">{item.category}</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.05em]">
                      {item.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">
                      {item.shortDescription || item.description}
                    </p>
                  </div>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 transition group-hover:border-[#C5FF62] group-hover:bg-[#C5FF62]">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-black/[0.07]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <Link to="/" className="text-sm font-bold tracking-[-0.05em]">
            PROVEE<span className="text-[#8EBE38]">.</span>
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#777A72] transition hover:text-[#171916]"
          >
            <Code2 size={15} />
            Discover more work
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
