
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isProjectsPage =
    location.pathname === "/projects" ||
    location.pathname.startsWith("/projects/");

  const isActive = (section) => {
    if (section === "projects") return isProjectsPage;

    return (
      !isProjectsPage &&
      location.pathname === "/" &&
      location.hash === `#${section}`
    );
  };

  const linkStyles = (section) =>
    `relative py-2 text-[13px] transition-colors hover:text-[#6E9827] ${
      isActive(section)
        ? "text-[#171916] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#B7ED52]"
        : "text-[#72746F]"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-30 border-b border-black/[0.04]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <Link
          to="/"
          aria-label="PROVEE home"
          onClick={closeMenu}
          className="group flex items-center gap-2.5"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#B7ED52] shadow-[0_0_15px_#B7ED5266]" />
          <span className="text-xl font-bold tracking-[-0.06em]">
            PROVEE<span className="text-[#8EBE38]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navigation.map(({ label, href, section }) => (
            <a
              key={label}
              href={href}
              className={linkStyles(section)}
              aria-current={isActive(section) ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="/#contact"
          className="hidden items-center gap-3 rounded-full bg-[#171916] px-5 py-3 text-sm !text-white transition hover:bg-[#39432C] sm:flex"
        >
          Let's talk
          <ArrowUpRight size={16} />
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="flex items-center justify-center rounded-full border border-black/10 p-3 transition hover:bg-white md:hidden"
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full border-b border-black/10 bg-[#F8F7F3] px-6 pb-6 pt-3 shadow-xl shadow-black/5 sm:px-10 md:hidden"
        >
          <div className="mx-auto flex max-w-[1600px] flex-col">
            {navigation.map(({ label, href, section }) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                aria-current={isActive(section) ? "page" : undefined}
                className={`border-b border-black/[0.06] py-4 text-sm transition-colors hover:text-[#6E9827] ${
                  isActive(section)
                    ? "font-semibold text-[#171916]"
                    : "text-[#72746F]"
                }`}
              >
                {label}
              </a>
            ))}

            <a
              href="/#contact"
              onClick={closeMenu}
              className="mt-5 flex items-center justify-between rounded-full bg-[#171916] px-5 py-4 text-sm !text-white transition hover:bg-[#39432C]"
            >
              Let's talk
              <ArrowUpRight size={17} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
