
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Layers3,
  Menu,
  Sparkles,
} from "lucide-react";
import profileImage from "../../../src/assets/profile.png";
import Navbar from '../layout/Navbar'

const technologies = [
  { name: "React", symbol: "R" },
  { name: "JavaScript", symbol: "JS" },
  { name: "Node.js", symbol: "N" },
  { name: "MongoDB", symbol: "M" },
];

export default function Hero() {
  return (
    <main
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#171916]"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-20 h-[32rem] w-[32rem] rounded-full bg-[#D8F5A7]/40 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12rem] top-[28rem] h-[25rem] w-[25rem] rounded-full bg-[#DCE8FF]/40 blur-[110px]"
      />

     
      {/* Shared navigation */}
<Navbar />

      {/* Hero content */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-88px)] max-w-[1600px] grid-cols-1 items-center gap-12 px-6 pb-12 pt-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-16 lg:pb-16 lg:pt-4">
        {/* Introduction */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-black/[0.07] bg-white/70 px-4 py-2.5 shadow-sm shadow-black/[0.02]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7ED52] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9DCE3B]" />
            </span>

            <span className="text-xs font-medium tracking-wide text-[#696C65]">
              Full-stack developer
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <p className="mb-1 text-lg font-medium tracking-tight text-[#777A72] sm:text-xl">
              Hi, I'm
            </p>

            <h1 className="text-[clamp(3.7rem,8.4vw,8rem)] font-semibold leading-[0.91] tracking-[-0.085em]">
              Providence<span className="text-[#A4D746]">.</span>
            </h1>

            <h2 className="mt-5 max-w-xl text-2xl font-medium leading-tight tracking-[-0.055em] sm:text-4xl">
              I build digital products
              <span className="text-[#969990]"> with purpose.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-7 text-[#777A72] sm:text-[17px] sm:leading-8"
          >
            I turn ideas into thoughtful web experiences, bringing together
            clean interfaces, reliable functionality, and a passion for
            building things that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full bg-[#171916] px-6 py-4 text-sm font-medium !text-white shadow-lg shadow-black/[0.08] transition hover:-translate-y-0.5 hover:bg-[#30392A]"
            >
              View my work
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-6 py-4 text-sm font-medium transition hover:border-[#B7D980] hover:bg-white"
            >
              About me
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex items-center gap-3 text-xs text-[#85877F]"
          >
            <div className="flex -space-x-1.5">
              <span className="h-7 w-7 rounded-full border-2 border-[#F8F7F3] bg-[#D9E8C2]" />
              <span className="h-7 w-7 rounded-full border-2 border-[#F8F7F3] bg-[#E7DFD2]" />
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#F8F7F3] bg-[#E6E8E0]">
                <Sparkles size={12} />
              </span>
            </div>
            <span>Curiosity-led. Detail-focused. Always learning.</span>
          </motion.div>
        </div>

        {/* Custom visual composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[590px] py-8 sm:py-12 lg:py-16"
        >
          {/* Main visual */}
          <div className="relative aspect-[0.98] w-full">
            <div className="absolute inset-[7%] rotate-[-7deg] rounded-[3rem] bg-[#E7EFD9]" />

            <div className="absolute inset-[8%] overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-white via-[#F2F5E9] to-[#DDEDBF] shadow-[0_35px_100px_-45px_rgba(45,58,30,0.28)]">
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-[#A6C778]/40" />
              <div className="absolute -right-1 top-5 h-48 w-48 rounded-full border border-[#A6C778]/30" />
              <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[#CBE6A1]/40 blur-3xl" />

              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-9">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#81877A]">
                      Personal portfolio
                    </p>
                    <p className="mt-2 text-sm font-semibold tracking-tight">
                      PROVEE®
                    </p>
                  </div>                                                                                    

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-sm">
                    <Braces size={21} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="relative mx-auto flex w-full max-w-[310px] flex-1 items-center justify-center">
                  <div className="absolute h-[78%] w-[78%] rounded-full border border-[#A4C87B]/50" />
                  <div className="absolute h-[58%] w-[58%] rounded-full border border-dashed border-[#A4C87B]/60" />

                  <div className="absolute h-3 w-3 translate-x-[-105px] translate-y-[-85px] rounded-full bg-[#9DCB47] shadow-[0_0_24px_#9DCB4780]" />
                  <div className="absolute h-2 w-2 translate-x-[100px] translate-y-[65px] rounded-full bg-[#7C9D52]" />

                  
<div className="group relative h-36 w-36 rounded-[2.5rem] border border-white/90 bg-white/75 p-2 shadow-[0_20px_70px_-25px_rgba(65,84,45,0.3)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_-25px_rgba(65,84,45,0.4)] sm:h-44 sm:w-44">
  {/* Premium inner frame */}
  <div className="absolute inset-1.5 rounded-[2rem] border border-[#B9D98D]/60 pointer-events-none z-10" />

  {/* Portrait */}
  <img
    src={profileImage}
    alt="Providence — Full-stack developer"
    className="h-full w-full rounded-[2rem] object-cover object-center"
  />

  {/* Subtle image shading */}
  <div className="pointer-events-none absolute inset-2 overflow-hidden rounded-[2rem] bg-gradient-to-t from-black/20 via-transparent to-white/10" />

  {/* Status accent */}
  <span className="absolute bottom-4 right-4 z-20 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-[#A9E34B] shadow-[0_0_16px_rgba(169,227,75,0.65)] sm:bottom-5 sm:right-5" />
</div>


                  <div className="absolute bottom-[10%] left-[2%] rounded-2xl border border-white/80 bg-white/85 px-3 py-2.5 shadow-lg shadow-black/[0.04] backdrop-blur-md sm:px-4">
                    <div className="flex items-center gap-2">
                      <Code2 size={15} className="text-[#7DA43C]" />
                      <span className="text-xs font-medium">Thoughtful code</span>
                    </div>
                  </div>

                  <div className="absolute right-[-1%] top-[14%] rounded-2xl border border-white/80 bg-white/85 px-3 py-2.5 shadow-lg shadow-black/[0.04] backdrop-blur-md sm:px-4">
                    <div className="flex items-center gap-2">
                      <Layers3 size={15} className="text-[#7DA43C]" />
                      <span className="text-xs font-medium">Built to scale</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-3 border-t border-[#B5C9A0]/50 pt-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#81877A]">
                      Current focus
                    </p>
                    <p className="mt-1.5 text-sm font-medium">
                      Design × Engineering
                    </p>
                  </div>
                  <span className="rounded-full bg-[#E3F2CF] px-3 py-1.5 text-[10px] font-medium text-[#4E6B2C]">
                    In progress
                  </span>
                </div>
              </div>
            </div>

            {/* Floating technology card */}
            <div className="absolute -right-1 top-[6%] hidden w-[145px] rotate-[5deg] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:block">
              <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-[#898B83]">
                My toolkit
              </p>
              <div className="space-y-3">
                {technologies.map((technology) => (
                  <div
                    key={technology.name}
                    className="flex items-center gap-2.5"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0F4E9] text-[10px] font-bold text-[#657E43]">
                      {technology.symbol}
                    </span>
                    <span className="text-[11px] text-[#55584F]">
                      {technology.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating detail card */}
            <div className="absolute -bottom-1 -left-1 max-w-[210px] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:left-[-5%]">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF5D9] text-[#638B30]">
                  <Sparkles size={15} />
                </span>
                <div>
                  <p className="text-xs font-semibold">Growing with purpose</p>
                  <p className="mt-1 text-[10px] text-[#8B8D85]">
                    One project at a time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom scroll indicator */}
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between border-t border-black/[0.06] px-6 py-5 sm:px-10 lg:px-16">
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#92948C]">
          Providence · PROVEE
        </span>

        <a
          href="/projects"
          className="flex items-center gap-2 text-xs text-[#777A72] transition hover:text-[#658D2D]"
        >
          Discover what I build
          <ArrowDown size={14} />
        </a>
      </div>
    </main>
  );
}
