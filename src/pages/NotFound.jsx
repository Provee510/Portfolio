
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Home,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#F8F7F3] text-[#171916]">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#D8F5A7]/40 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#DCE8FF]/40 blur-[110px]"
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <a
          href="/"
          aria-label="PROVEE home"
          className="group inline-flex items-center gap-2.5"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#B7ED52] shadow-[0_0_15px_#B7ED5266] transition-transform group-hover:scale-125" />

          <span className="text-xl font-bold tracking-[-0.06em]">
            PROVEE<span className="text-[#8EBE38]">.</span>
          </span>
        </a>

        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#85877F] sm:block">
          Digital experiences · 2026
        </span>

        <a
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#6E9827]"
        >
          Explore work
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </header>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-black/[0.07] bg-white/70 px-4 py-2.5 shadow-sm shadow-black/[0.02]"
            >
              <Compass size={14} className="text-[#739B3C]" />
              <span className="text-xs font-medium tracking-wide text-[#696C65]">
                Looks like we took a wrong turn
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#85877F]">
                Error 404
              </p>

              <h1 className="text-[clamp(4.5rem,12vw,10rem)] font-semibold leading-[0.78] tracking-[-0.11em]">
                Lost<span className="text-[#A4D746]">.</span>
                <br />
                <span className="text-black/25">Not stuck.</span>
              </h1>

              <p className="mt-8 max-w-lg text-base leading-8 text-[#777A72] sm:text-lg">
                The page you're looking for may have moved, disappeared, or
                never existed. No worries — there's plenty more to explore.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="/"
                className="group inline-flex items-center gap-3 rounded-full bg-[#171916] px-6 py-4 text-sm font-medium !text-white shadow-lg shadow-black/[0.08] transition hover:-translate-y-0.5 hover:bg-[#30392A]"
              >
                <Home size={16} />
                Back to home
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-6 py-4 text-sm font-medium transition hover:border-[#B7D980] hover:bg-white"
              >
                View projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* Custom 404 visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[480px]"
          >
            <div className="absolute inset-[8%] rotate-[-8deg] rounded-[2.5rem] bg-[#E7EFD9]" />

            <div className="relative aspect-[0.95] overflow-hidden rounded-[2.2rem] border border-white/80 bg-gradient-to-br from-white via-[#F2F5E9] to-[#DDEDBF] shadow-[0_35px_100px_-45px_rgba(45,58,30,0.3)]">
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full border border-[#A6C778]/40" />
              <div className="absolute -right-1 top-8 h-48 w-48 rounded-full border border-[#A6C778]/30" />
              <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[#CBE6A1]/50 blur-3xl" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-48 w-48 items-center justify-center rounded-[2.8rem] border border-white/90 bg-white/70 shadow-[0_25px_70px_-25px_rgba(65,84,45,0.25)] backdrop-blur-xl sm:h-56 sm:w-56"
                >
                  <div className="absolute inset-4 rounded-[2.2rem] border border-[#B9D98D]/50" />

                  <span className="select-none text-[5.5rem] font-semibold tracking-[-0.12em] text-[#8EBE38] sm:text-8xl">
                    404
                  </span>

                  <span className="absolute right-5 top-5 h-3 w-3 rounded-full border-2 border-white bg-[#A9E34B] shadow-[0_0_15px_#A9E34B80]" />
                </motion.div>

                <div className="mt-8 flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2.5 shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9DCE3B]" />
                  <span className="text-xs font-medium text-[#62685A]">
                    Every path leads somewhere.
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between border-t border-[#B5C9A0]/50 pt-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#81877A]">
                    PROVEE
                  </p>
                  <p className="mt-1 text-xs font-medium">
                    Find your way back.
                  </p>
                </div>

                <Compass size={20} strokeWidth={1.3} className="text-[#829B61]" />
              </div>
            </div>

            <div className="absolute -left-2 top-[13%] hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-black/[0.05] backdrop-blur-xl sm:block">
              <p className="font-mono text-[10px] text-[#85877F]">
                STATUS
              </p>
              <p className="mt-1 text-xs font-semibold">Route not found</p>
            </div>

            <div className="absolute -right-2 bottom-[16%] hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-black/[0.05] backdrop-blur-xl sm:block">
              <p className="font-mono text-[10px] text-[#85877F]">
                SUGGESTION
              </p>
              <p className="mt-1 text-xs font-semibold">Try another path ↗</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-3 border-t border-black/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#92948C]">
          Providence · PROVEE
        </span>

        <span className="text-xs text-[#85877F]">
          Thoughtfully built. Always evolving.
        </span>

        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#777A72] transition hover:text-[#658D2D]"
        >
          <ArrowLeft size={14} />
          Return to the beginning
        </a>
      </footer>
    </main>
  );
}
