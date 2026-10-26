
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Code2,
  Layers3,
  Lightbulb,
} from "lucide-react";

const principles = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Think before building",
    description:
      "Understand the problem, explore the possibilities, and choose a thoughtful approach.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Build with intention",
    description:
      "Write organized, maintainable code and create interfaces that feel natural to use.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Keep getting better",
    description:
      "Learn from every project, improve my decisions, and keep pushing the quality of my work.",
  },
];

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col justify-between gap-5 sm:mb-20 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#A7D84D]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#777A72]">
                A little about me
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.075em] sm:text-6xl lg:text-7xl">
              More than
              <br />
              <span className="text-[#A0A398]">just writing code.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#777A72] sm:text-base">
            The best digital experiences happen when thoughtful engineering
            meets an understanding of the people using the product.
          </p>
        </motion.div>

        {/* Main about composition */}
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Identity panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65 }}
            className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#171916] p-7 text-white sm:min-h-[440px] sm:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#B7ED52]/10 blur-[80px]"
            />

            <div className="relative flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.2em]">
                PROVEE<span className="text-[#B7ED52]">.</span>
              </span>

              <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/55">
                My approach
              </span>
            </div>

            <div className="relative py-12">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <Braces
                  size={32}
                  strokeWidth={1.3}
                  className="text-[#B7ED52]"
                />
              </div>

              <p className="text-sm text-white/50">
                My mindset
              </p>

              <h3 className="mt-3 max-w-md text-4xl font-medium leading-[1.04] tracking-[-0.065em] sm:text-5xl">
                Stay curious.
                <br />
                Build thoughtfully.
                <br />
                <span className="text-[#B7ED52]">Never stand still.</span>
              </h3>
            </div>

            <div className="relative flex items-center justify-between border-t border-white/10 pt-5">
              <p className="text-xs text-white/45">
                Learning through building.
              </p>

              <ArrowUpRight size={18} className="text-[#B7ED52]" />
            </div>
          </motion.div>

          {/* Personal introduction and principles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col justify-between rounded-[2rem] border border-black/[0.06] bg-[#F8F7F3] p-7 sm:p-10"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.17em] text-[#8A8C83]">
                Hello, I'm Providence
              </p>

              <h3 className="mt-5 max-w-xl text-2xl font-medium leading-snug tracking-[-0.055em] sm:text-3xl">
                I'm a junior full-stack developer focused on turning ideas
                into useful, thoughtful web experiences.
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#777A72] sm:text-base sm:leading-8">
                I enjoy working across the frontend and backend, understanding
                how the pieces of an application fit together, and improving
                the details that make a product feel complete.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#777A72] sm:text-base sm:leading-8">
                I'm still growing as a developer, and I see every project as
                an opportunity to strengthen my skills, solve new problems,
                and build better software.
              </p>
            </div>

            <div className="mt-10 border-t border-black/[0.08] pt-2">
              {principles.map((principle) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.number}
                    className="group flex gap-4 border-b border-black/[0.07] py-5 last:border-b-0"
                  >
                    <span className="pt-1 text-[10px] text-[#9A9C94]">
                      {principle.number}
                    </span>

                    <div className="flex-1">
                      <h4 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                        {principle.title}
                        <Icon
                          size={15}
                          className="text-[#8AAE4D] transition-transform group-hover:translate-x-1"
                        />
                      </h4>

                      <p className="mt-2 max-w-md text-xs leading-6 text-[#81837B] sm:text-sm">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="#skills"
              className="group mt-6 inline-flex items-center gap-2 self-start text-sm font-medium"
            >
              Explore my capabilities
              <ArrowDownRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
