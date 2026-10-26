
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Monitor,
  Server,
  Workflow,
} from "lucide-react";

const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    subtitle: "Interfaces & experiences",
    icon: Monitor,
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    accent: "lime",
  },
  {
    number: "02",
    title: "Backend",
    subtitle: "Application logic & APIs",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs"],
    accent: "lavender",
  },
  {
    number: "03",
    title: "Databases",
    subtitle: "Data & persistence",
    icon: Database,
    skills: ["MongoDB", "Data modeling", "CRUD operations"],
    accent: "blue",
  },
  {
    number: "04",
    title: "Tools & workflow",
    subtitle: "Building & collaboration",
    icon: Workflow,
    skills: ["Git", "GitHub", "Vite", "npm"],
    accent: "sand",
  },
];

const accentStyles = {
  lime: {
    icon: "bg-[#EAF5D9] text-[#668D32]",
    dot: "bg-[#A6D84A]",
  },
  lavender: {
    icon: "bg-[#EFEBFA] text-[#8171B6]",
    dot: "bg-[#A99AE2]",
  },
  blue: {
    icon: "bg-[#E4F0F5] text-[#59889D]",
    dot: "bg-[#84C5DE]",
  },
  sand: {
    icon: "bg-[#F2EBDD] text-[#987C51]",
    dot: "bg-[#D9B981]",
  },
};

function SkillGroup({ group, index }) {
  const Icon = group.icon;
  const accent = accentStyles[group.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-[1.6rem] border border-black/[0.06] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_-35px_rgba(0,0,0,0.2)] sm:p-7"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.icon}`}
        >
          <Icon size={21} strokeWidth={1.7} />
        </div>

        <span className="text-xs text-[#A1A39B]">{group.number}</span>
      </div>

      <h3 className="mt-7 text-xl font-semibold tracking-[-0.045em]">
        {group.title}
      </h3>

      <p className="mt-1 text-xs text-[#898B83]">
        {group.subtitle}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-black/[0.07] bg-[#FAFAF7] px-3 py-2 text-xs text-[#65675F] transition group-hover:border-black/[0.12]"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-2 border-t border-black/[0.06] pt-4">
        <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
        <span className="text-[10px] uppercase tracking-[0.13em] text-[#85877F]">
          Core skill category
        </span>
      </div>
    </motion.article>
  );
}

export default function SkillsPreview() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#F1F0EA] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#A7D84D]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#777A72]">
                My technical toolkit
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.03] tracking-[-0.075em] sm:text-6xl lg:text-7xl">
              The tools
              <br />
              <span className="text-[#999C92]">behind the work.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#777A72] sm:text-base">
            From interfaces to application logic, I keep developing the
            skills needed to build complete web experiences.
          </p>
        </motion.div>

        {/* Featured technical panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative mb-6 overflow-hidden rounded-[1.8rem] bg-[#171916] p-6 text-white sm:p-9 lg:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#B7ED52]/10 blur-[90px]"
          />

          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Braces size={16} className="text-[#B7ED52]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  My development approach
                </span>
              </div>

              <h3 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.06em] sm:text-4xl">
                Understanding the whole product,
                <span className="text-[#B7ED52]"> not just one layer.</span>
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
                I enjoy learning how user interfaces, server-side logic, and
                data work together to create a reliable application.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <Monitor size={20} className="text-[#B7ED52]" />
              </div>

              <ArrowUpRight size={17} className="text-white/35" />

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <Server size={20} className="text-[#B7ED52]" />
              </div>

              <ArrowUpRight size={17} className="text-white/35" />

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <Database size={20} className="text-[#B7ED52]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.number} group={group} index={index} />
          ))}
        </div>

        {/* Honest growth statement */}
        <div className="mt-8 flex flex-col gap-3 border-t border-black/[0.09] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <GitBranch size={15} className="text-[#7B9E43]" />
            <p className="text-xs text-[#777A72]">
              Always learning. Always improving.
            </p>
          </div>

          <p className="text-xs text-[#999B93]">
            Skills shown should reflect my actual experience.
          </p>
        </div>
      </div>
    </section>
  );
}
