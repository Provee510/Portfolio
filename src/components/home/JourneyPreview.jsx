
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  GitBranch,
  Layers3,
  Rocket,
} from "lucide-react";

const journey = [
  {
    number: "01",
    period: "The foundation",
    title: "Learning the fundamentals",
    description:
      "Building a strong understanding of web development, from the structure of a page to the logic that powers an application.",
    icon: BookOpen,
    status: "Foundation",
  },
  {
    number: "02",
    period: "Building in practice",
    title: "Turning knowledge into projects",
    description:
      "Applying what I learn through practical projects, reusable components, responsive interfaces, and application features.",
    icon: Code2,
    status: "Hands-on practice",
  },
  {
    number: "03",
    period: "Growing full-stack skills",
    title: "Connecting the entire application",
    description:
      "Exploring how frontend interfaces, backend services, APIs, databases, and authentication work together.",
    icon: Layers3,
    status: "Continued development",
  },
  {
    number: "04",
    period: "What's next",
    title: "Building better software",
    description:
      "Deepening my technical knowledge, improving code quality, and creating projects that solve meaningful problems.",
    icon: Rocket,
    status: "Looking ahead",
  },
];

export default function JourneyPreview() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#F8F7F3] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col justify-between gap-6 sm:mb-20 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#A7D84D]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#777A72]">
                My development journey
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.075em] sm:text-6xl lg:text-7xl">
              Progress over
              <br />
              <span className="text-[#999C92]">perfection.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#777A72] sm:text-base">
            Becoming a better developer is a process. I focus on learning,
            applying what I learn, and improving with every project.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Dark feature panel */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#171916] p-7 text-white sm:min-h-[440px] sm:p-10"
          >
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#B7ED52]/10 blur-[80px]" />

            <div className="relative flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.16em]">
                PROVEE<span className="text-[#B7ED52]">.</span>
              </span>
              <GitBranch size={18} className="text-[#B7ED52]" />
            </div>

            <div className="relative py-10">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <Code2 size={26} className="text-[#B7ED52]" />
              </div>

              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                The mindset
              </p>

              <h3 className="mt-4 text-4xl font-medium leading-[1.06] tracking-[-0.065em] sm:text-5xl">
                Learn it.
                <br />
                Build it.
                <br />
                <span className="text-[#B7ED52]">Understand it.</span>
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
                My goal is not simply to make something work. It's to
                understand why it works and how to make it better.
              </p>
            </div>

            <div className="relative flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs text-white/45">
                One project at a time
              </span>
              <ArrowUpRight size={17} className="text-[#B7ED52]" />
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute bottom-10 left-[17px] top-10 w-px bg-[#DCDDD5] sm:left-[21px]" />

            <div className="space-y-3">
              {journey.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.number}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="group relative grid grid-cols-[36px_1fr] gap-4 sm:grid-cols-[44px_1fr] sm:gap-5"
                  >
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#DCDDD5] bg-[#F8F7F3] transition group-hover:border-[#A7D84D] group-hover:bg-[#EAF5D9] sm:h-11 sm:w-11">
                      <Icon
                        size={17}
                        strokeWidth={1.6}
                        className="text-[#777A72] transition group-hover:text-[#587B2C]"
                      />
                    </div>

                    <div className="mb-3 rounded-[1.4rem] border border-black/[0.06] bg-white/75 p-5 transition duration-300 group-hover:border-[#D6E5BD] group-hover:bg-white sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#92948C]">
                          {item.period}
                        </span>

                        <span className="text-[10px] text-[#A1A39B]">
                          {item.number}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold tracking-[-0.045em] sm:text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#777A72]">
                        {item.description}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F0F2EB] px-3 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A7D84D]" />
                        <span className="text-[10px] text-[#69745C]">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-[#85877F]">
            Every challenge is an opportunity to learn something new.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium transition hover:text-[#719C31] sm:self-auto"
          >
            Let's build something
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
