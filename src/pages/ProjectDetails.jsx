
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Code2,
  Layers3,
} from "lucide-react";
import projects from "../data/projects";

const statusStyles = {
  "Website launched": "bg-[#DDF5C4] text-[#31551D]",
  "In development": "bg-[#F6E7B5] text-[#74551B]",
  Prototype: "bg-[#E7E2F8] text-[#59458C]",
};

function ProjectVisual({ project }) {
  const visual = project.visual;

  return (
    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[#EAE9E2] p-6 sm:min-h-[440px] sm:p-12">
      <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute -bottom-16 -left-12 h-64 w-64 rounded-full bg-[#D4E8B8]/60 blur-3xl" />

      {visual === "ironharvest" ? (
        <div className="relative w-full max-w-md border border-black/10 bg-[#F8F7F3] p-7 shadow-2xl shadow-black/10 sm:p-10">
          <div className="mb-10 flex items-center justify-between border-b border-black/10 pb-4">
            <span className="text-xs font-black tracking-[0.18em]">
              IRONHARVEST
            </span>
            <span className="text-[10px] text-black/40">EST. 1993</span>
          </div>

          <p className="max-w-xs text-4xl font-semibold leading-[0.95] tracking-[-0.07em] text-[#20271C] sm:text-6xl">
            Built for the land.
          </p>

          <div className="mt-8 flex items-end justify-between">
            <span className="text-xs text-black/50">
              Agricultural equipment
            </span>
            <div className="h-14 w-20 bg-[#8D9C63]" />
          </div>
        </div>
      ) : visual === "karma" ? (
        <div className="relative flex h-[300px] w-[230px] items-center justify-center bg-[#171717] shadow-2xl shadow-black/20 sm:h-[350px] sm:w-[270px]">
          <div className="absolute inset-4 border border-white/15" />
          <span className="text-3xl font-black tracking-[0.2em] text-white sm:text-4xl">
            KARMA
          </span>
          <span className="absolute bottom-8 text-[9px] tracking-[0.35em] text-white/50">
            OWN YOUR ENERGY
          </span>
        </div>
      ) : (
        <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-black/10 bg-[#101010] text-white shadow-2xl shadow-black/15">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
            <span className="h-2 w-2 rounded-full bg-[#C5FF62]" />
            <span className="text-sm font-medium">Messages</span>
            <span className="ml-auto text-xs text-white/40">Inbox</span>
          </div>

          {["Alex Morgan", "Sarah Williams", "Mike Johnson"].map(
            (name, index) => (
              <div
                key={name}
                className="flex items-center gap-3 border-b border-white/5 px-5 py-4 last:border-0"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                    index === 0
                      ? "bg-[#C5FF62] text-black"
                      : index === 1
                        ? "bg-[#D9D2F5] text-black"
                        : "bg-[#E8C7B2] text-black"
                  }`}
                >
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm">{name}</p>
                  <p className="mt-1 text-xs text-white/40">
                    Conversation preview
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((item) => item.id === slug);

  if (!project) {
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
            This project may not exist or its address may be incorrect.
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

  const statusClass =
    statusStyles[project.status] ?? "bg-black/5 text-black/60";

  const otherProjects = projects.filter((item) => item.id !== project.id);

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#171916]">
      {/* Header */}
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

      {/* Project introduction */}
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
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-medium ${statusClass}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {project.status}
            </span>
          </div>

          <h1 className="mt-8 text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.09em]">
            {project.name}
            <span className="text-[#A4D746]">.</span>
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <p className="max-w-2xl text-lg leading-8 text-[#777A72] sm:text-xl sm:leading-9">
              {project.description}
            </p>

            <div className="lg:justify-self-end">
              <p className="text-xs uppercase tracking-[0.16em] text-black/40">
                Project category
              </p>
              <p className="mt-2 text-sm font-medium">{project.category}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main project artwork */}
      <section className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ProjectVisual project={project} />
        </motion.div>
      </section>

      {/* Project information */}
      <section className="mx-auto grid max-w-[1600px] gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-16">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-black/40">
            01 / Overview
          </p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.06em] sm:text-4xl">
            The thinking behind the build.
          </h2>
        </div>

        <div>
          <p className="max-w-2xl text-base leading-8 text-[#777A72]">
            Every project is an opportunity to solve a problem, make thoughtful
            decisions, and improve the experience for the people using it.
            This project brings together its intended purpose, visual
            direction, and technical implementation.
          </p>

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

          <div className="mt-10 border-t border-black/10 pt-6">
            <div className="flex items-center gap-3">
              {project.status === "Website launched" ? (
                <CheckCircle2 size={19} className="text-[#789C42]" />
              ) : (
                <CircleDashed size={19} className="text-[#789C42]" />
              )}
              <h3 className="text-lg font-medium tracking-tight">
                Current status
              </h3>
            </div>

            <p className="mt-3 text-sm leading-7 text-[#777A72]">
              {project.status === "Website launched"
                ? "This website has launched. Its project story and technical details can be expanded as the portfolio evolves."
                : project.status === "In development"
                  ? "This project is actively in development. Its features and implementation may continue to evolve."
                  : "This project is currently a prototype. Its scope and functionality may change as development progresses."}
            </p>
          </div>
        </div>
      </section>

      {/* More projects */}
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
                  to={`/projects/${item.id}`}
                  className="group flex items-center justify-between gap-5 border border-black/10 bg-white/40 p-5 transition hover:border-[#B7D980] hover:bg-white sm:p-7"
                >
                  <div>
                    <p className="text-xs text-black/45">{item.category}</p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.05em]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs text-black/50">{item.status}</p>
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

      {/* Footer */}
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
