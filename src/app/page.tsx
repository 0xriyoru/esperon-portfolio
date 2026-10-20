import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import HeroSpecimen from "@/components/HeroSpecimen";
import FactTicker from "@/components/FactTicker";
import Activity from "@/components/Activity";
import Journey from "@/components/Journey";

const shell = "mx-auto max-w-[1280px] px-5 md:px-10";
const h2 = "font-display text-4xl font-light tracking-tight md:text-6xl";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="border-b border-rule">
        <div
          className={`${shell} grid min-h-[calc(100dvh-3.5rem)] items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10`}
        >
          <div className="lg:col-span-8">
            <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-light leading-[0.98] tracking-[-0.03em]">
              <span className="hero-line">
                <span>Rhodge Esperon</span>
              </span>
            </h1>

            <div className="hero-rule mt-10 h-px w-full max-w-xl bg-rule-strong" />

            <p className="hero-fade mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-soft md:text-xl">
              4th-year student at Lyceum of Subic Bay College in Olongapo. Focused on full-stack web development and defensive cybersecurity, with an active interest in SOC operations and secure systems.
            </p>

            <div className="hero-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-note bg-accent px-6 py-3.5 text-[15px] font-medium text-on-accent transition-[background-color,transform] duration-200 hover:bg-accent-deep active:translate-y-px"
              >
                View CV
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
              <a
                href="mailto:rhodgesperon@gmail.com"
                className="link-draw whitespace-nowrap py-1 text-[15px]"
              >
                Email me
              </a>
            </div>
          </div>

          <HeroSpecimen />
        </div>
      </section>

      {/* Facts */}
      <section aria-label="Background" className="border-b border-rule">
        <FactTicker />
      </section>

      {/* Projects */}
      <section id="projects" className={`${shell} py-24 md:py-32`}>
        <h2 className={`${h2} mb-12 md:mb-16`}>Projects built</h2>
        <Projects />
      </section>

      {/* Journey */}
      <section id="journey" className="border-t border-b border-rule">
        <Journey />
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-rule">
        <div className={`${shell} py-24 md:py-32`}>
          <h2 className={`${h2} mb-12 md:mb-16`}>Tools I work with</h2>
          <Skills />
        </div>
      </section>

      {/* Activity */}
      <section id="activity" className="border-t border-rule">
        <div className={`${shell} py-24 md:py-32`}>
          <h2 className={`${h2} mb-12 md:mb-16`}>Activity</h2>
          <Activity />
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="border-t border-rule-strong">
        <div className={`${shell} py-24 md:py-32`}>
          <h2 className="max-w-[20ch] font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            Hiring, or have a project in mind?
          </h2>
          <a
            href="mailto:rhodgesperon@gmail.com"
            className="link-draw mt-10 inline-block break-all font-display text-[clamp(1.5rem,5vw,4rem)] font-light tracking-tight text-accent"
          >
            rhodgesperon@gmail.com
          </a>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-[15px]">
            <a
              href="https://github.com/0xriyoru"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex items-center gap-2 py-1"
            >
              <GithubLogo size={18} aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rhodge-esperon"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex items-center gap-2 py-1"
            >
              <LinkedinLogo size={18} aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-rule">
          <div
            className={`${shell} flex flex-wrap items-center justify-between gap-3 py-6 text-[13px] text-ink-soft`}
          >
            <span>Olongapo City, Philippines</span>
            <span>Designed and developed by Rhodge Esperon &copy; 2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}
