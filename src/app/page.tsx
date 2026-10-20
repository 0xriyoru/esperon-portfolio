import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import HeroSpecimen from "@/components/HeroSpecimen";
import FactTicker from "@/components/FactTicker";
import Activity from "@/components/Activity";

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

      {/* Experience */}
      <section id="experience">
        <div className="border-y border-rule-strong bg-accent text-on-accent">
          <div className={`${shell} grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-16`}>
            <div className="lg:col-span-7">
              <h2 className="max-w-[18ch] font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                OJT Trainee at Subic Bay Metropolitan Authority
              </h2>
              <p className="mt-6 text-lg text-on-accent-soft">
                Asset Management Department (AMD) · May to September 2026
              </p>
              <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-on-accent/90">
                Built between July and August 2026, replaced a vulnerable local server with a cloud Supabase and PostgreSQL web system for the SBMA Asset Management Division. Built automated Form PPD-CF-36 job order slip printing with atomic sequential numbering, COA-compliant accountable form tracking, and real-time hauling analytics cards.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-note border border-white/20 bg-white/5 p-6 md:p-8">
                <div className="border-b border-white/15 pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-on-accent-soft">
                    System Architecture & Compliance
                  </span>
                </div>

                <dl className="mt-5 space-y-4 font-mono text-xs">
                  <div>
                    <dt className="text-on-accent-soft">Data Tier & Integrity</dt>
                    <dd className="mt-1 font-sans text-sm font-medium text-white">
                      PostgreSQL with atomic PL/pgSQL sequential numbering & row locks
                    </dd>
                  </div>
                  <div>
                    <dt className="text-on-accent-soft">Security Posture</dt>
                    <dd className="mt-1 font-sans text-sm font-medium text-white">
                      Role-Based Access Control (RBAC) & Cloudflare Turnstile verification
                    </dd>
                  </div>
                  <div>
                    <dt className="text-on-accent-soft">Audit Compliance</dt>
                    <dd className="mt-1 font-sans text-sm font-medium text-white">
                      Commission on Audit (COA) accountable booklet serialization
                    </dd>
                  </div>
                  <div>
                    <dt className="text-on-accent-soft">Production Impact</dt>
                    <dd className="mt-1 font-sans text-sm font-medium text-white">
                      Zero-loss migration eliminating on-prem database corruptions
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Seminars */}
      <section id="events" className="border-b border-rule">
        <div className={`${shell} grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-4">
            <h2 className={`${h2} lg:sticky lg:top-24`}>Events and seminars</h2>
          </div>
          <div className="lg:col-span-8">
            <Credentials />
          </div>
        </div>
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
