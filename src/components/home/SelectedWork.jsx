
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { fetchPublishedProjects } from "../../lib/publicProjects";

function getProjectVisual(project) {
  const slug = (project.slug || "").toLowerCase();

  if (slug.includes("ironharvest")) return "ironharvest";
  if (slug.includes("karma")) return "karma";

  if (
    slug.includes("tiktok") ||
    slug.includes("message") ||
    slug.includes("inbox")
  ) {
    return "messages";
  }

  return "cover";
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
    visual: getProjectVisual(project),
  };
}

function ProjectVisual({ project }) {
  // Use the image uploaded through the admin dashboard when available.
  if (project.coverImage?.url) {
    return (
      <div className="relative h-full min-h-[270px] overflow-hidden bg-[#ECEDE7] sm:min-h-[360px]">
        <img
          src={project.coverImage.url}
          alt={`${project.name} project cover`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
          {project.category}
        </span>
      </div>
    );
  }

  // IronHarvest artwork
  if (project.visual === "ironharvest") {
    return (
      <div className="relative flex h-full min-h-[270px] flex-col justify-between overflow-hidden bg-[#E7EBDD] p-6 sm:min-h-[360px] sm:p-9">
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#879779]/30 sm:h-80 sm:w-80" />
        <div className="absolute -right-2 -top-8 h-52 w-52 rounded-full border border-[#879779]/30 sm:h-64 sm:w-64" />

        <div className="relative flex items-center justify-between">
          <span className="text-xs font-bold tracking-[0.12em] text-[#283B27]">
            IH / EQUIPMENT
          </span>

          <span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#4D6049]">
            Corporate website
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#63745A]">
            Built for the field
          </p>

          <h3 className="mt-3 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.07em] text-[#253624] sm:text-6xl">
            Powering
            <br />
            agriculture.
          </h3>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-12 bg-[#738568]" />
            <span className="text-xs text-[#52634B]">
              Digital brand experience
            </span>
          </div>
        </div>

        <div className="absolute bottom-7 right-7 flex h-16 w-16 rotate-[-12deg] items-center justify-center rounded-2xl border border-white/60 bg-white/50 text-2xl font-bold text-[#526B45] shadow-sm sm:bottom-10 sm:right-10 sm:h-20 sm:w-20 sm:text-3xl">
          IH
        </div>
      </div>
    );
  }

  // KARMA artwork
  if (project.visual === "karma") {
    return (
      <div className="relative flex h-full min-h-[250px] flex-col justify-between overflow-hidden bg-[#151515] p-6 sm:min-h-[310px] sm:p-8">
        <div className="absolute -right-16 top-[-5rem] h-64 w-64 rounded-full bg-[#B5E96B]/10 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <span className="text-xs tracking-[0.22em] text-white/80">
            K A R M A
          </span>

          <span className="text-[10px] uppercase tracking-wider text-white/40">
            Fashion label
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#B9E97B]">
            Find your expression
          </p>

          <h3 className="mt-3 text-5xl font-semibold tracking-[-0.09em] text-[#F5F3EC] sm:text-7xl">
            OWN
            <br />
            YOUR
            <span className="text-[#B9E97B]"> KARMA.</span>
          </h3>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/15 pt-4">
          <span className="text-xs text-white/50">
            Brand & commerce experience
          </span>

          <ArrowUpRight size={17} className="text-[#B9E97B]" />
        </div>
      </div>
    );
  }

  // Messages artwork
  if (project.visual === "messages") {
    return (
      <div className="relative flex h-full min-h-[250px] flex-col overflow-hidden bg-[#E9E8F3] p-6 sm:min-h-[310px] sm:p-8">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#A7A0E9]/30 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wide text-[#484363]">
            INBOX / MESSAGES
          </span>

          <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] text-[#615A85]">
            UI prototype
          </span>
        </div>

        <div className="relative mt-7 flex flex-1 gap-3">
          <div className="w-[38%] rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm">
            <div className="mb-4 h-2 w-14 rounded-full bg-[#AAA4D9]" />

            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="mb-3 flex items-center gap-2">
                <span className="h-7 w-7 shrink-0 rounded-full bg-[#DAD7EE]" />

                <span
                  className={`h-1.5 rounded-full ${
                    item === 0
                      ? "w-12 bg-[#8D83D2]"
                      : "w-9 bg-[#D3D0E4]"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col justify-between rounded-2xl border border-white/80 bg-white/80 p-3 shadow-sm sm:p-4">
            <div className="flex items-center gap-2 border-b border-[#E6E3F0] pb-3">
              <span className="h-7 w-7 rounded-full bg-[#C5C0E9]" />

              <div className="space-y-1.5">
                <div className="h-1.5 w-16 rounded-full bg-[#77709F]" />
                <div className="h-1 w-10 rounded-full bg-[#D0CDDF]" />
              </div>
            </div>

            <div className="space-y-2 py-3">
              <div className="h-7 w-[80%] rounded-xl rounded-bl-sm bg-[#E8E5F6]" />
              <div className="ml-auto h-7 w-[72%] rounded-xl rounded-br-sm bg-[#A9A0E5]" />
              <div className="h-7 w-[60%] rounded-xl rounded-bl-sm bg-[#E8E5F6]" />
            </div>

            <div className="h-8 rounded-full border border-[#E6E3F0] bg-white" />
          </div>
        </div>

        <div className="relative mt-5 flex items-center justify-between">
          <span className="text-xs text-[#716B91]">
            Conversations, thoughtfully designed
          </span>

          <Code2 size={17} className="text-[#716B91]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[270px] items-center justify-center bg-[#ECEDE7] sm:min-h-[360px]">
      <Code2 size={36} className="text-[#85877F]" />
    </div>
  );
}

// CLICKABLE PROJECT CARD
function ProjectCard({ project, index }) {
  const projectSlug = project.slug || project.id;

  return (
    <Link
      to={`/projects/${encodeURIComponent(projectSlug)}`}
      aria-label={`View ${project.name} project`}
      className="group block min-w-0"
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        className={`min-w-0 overflow-hidden rounded-[1.6rem] border border-black/[0.06] bg-white/80 shadow-[0_12px_50px_-35px_rgba(0,0,0,0.15)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.2)] ${
          project.featured ? "lg:col-span-2" : ""
        }`}
      >
        <div className="relative overflow-hidden">
          <ProjectVisual project={project} />

          <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/75 text-[11px] font-semibold text-[#35382F] backdrop-blur-md">
            {project.number}
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#85877F]">
              {project.category}
            </p>

            <span className="rounded-full bg-[#F0F2EB] px-3 py-1.5 text-[10px] text-[#69745C]">
              {project.status}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.055em] transition-colors group-hover:text-[#566D2C] sm:text-3xl">
                {project.name}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#777A72]">
                {project.description}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 transition group-hover:border-[#B5DB7B] group-hover:bg-[#EAF5D9]"
            >
              <ArrowUpRight size={19} />
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-5">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-black/[0.07] px-3 py-1.5 text-[11px] text-[#666960]"
              >
                {technology}
              </span>
            ))}

            <span className="ml-auto text-xs text-[#92948C]">
              {project.year}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function SelectedWork() {
  const [projects, setProjects] = useState([]);
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
            err.message ||
              "We couldn't load the projects. Please try again."
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

  return (
    <section
      id="work"
      className="relative bg-[#F8F7F3] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#A7D84D]" />

              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#777A72]">
                A selection of my work
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.075em] sm:text-6xl lg:text-7xl">
              Ideas into
              <br className="sm:hidden" />{" "}
              <span className="text-[#999C92]">experiences.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#777A72] sm:text-base">
            A growing collection of products, interfaces, and experiments
            that reflect how I think, build, and learn.
          </p>
        </motion.div>

        {loading && (
          <div
            role="status"
            className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6"
          >
            {[0, 1].map((item) => (
              <div
                key={item}
                className="min-h-[320px] animate-pulse rounded-[1.6rem] border border-black/[0.06] bg-white/70 sm:min-h-[400px]"
              />
            ))}

            <span className="sr-only">
              Loading published projects…
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[1.6rem] border border-black/10 bg-white/70 p-8 sm:p-10">
            <p className="text-lg font-medium text-[#303229]">
              Projects couldn't be loaded.
            </p>

            <p className="mt-2 text-sm leading-6 text-[#777A72]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-full bg-[#20231D] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#42483A]"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="rounded-[1.6rem] border border-black/[0.06] bg-white/70 px-6 py-14 text-center sm:py-20">
            <p className="text-xl font-medium tracking-tight text-[#303229]">
              New work is on the way.
            </p>

            <p className="mt-3 text-sm leading-6 text-[#777A72]">
              Published projects will appear here as they become available.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-black/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-[#85877F]">
            Every project is a chance to build something better.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium transition hover:text-[#719C31] sm:self-auto"
          >
            Have a project in mind?

            <ArrowDownRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
