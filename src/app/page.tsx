import Image from "next/image";
import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Activity from "@/components/Activity";
import PageViews from "@/components/PageViews";
import Reveal from "@/components/Reveal";

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
            <h1 className="font-display text-[clamp(3.5rem,11vw,6rem)] font-light leading-[0.95] tracking-[-0.03em]">
              <span className="hero-line">
                <span>Rhodge</span>
              </span>
              <span className="hero-line">
                <span>Esperon</span>
              </span>
            </h1>

            <div className="hero-rule mt-10 h-px w-full max-w-xl bg-rule-strong" />

            <p className="hero-fade mt-8 max-w-[44ch] text-lg leading-relaxed text-ink-soft md:text-xl">
              Systems and front-end developer and UI/UX designer in Olongapo. Built the SBMA Job Order Management System (AMD) and production web tools.
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

          <figure className="hero-fade lg:col-span-4 lg:justify-self-end">
            <Image
              src="/profile.png"
              alt="Portrait of Rhodge Esperon"
              width={288}
              height={288}
              priority
              className="h-56 w-56 object-cover mix-blend-multiply grayscale-[0.15] md:h-72 md:w-72"
            />
            <figcaption className="mt-3 text-sm text-ink-soft">Olongapo City, Philippines</figcaption>
          </figure>
        </div>
      </section>

      {/* Facts */}
      <section aria-label="Background" className="border-b border-rule">
        <Reveal><dl className={`${shell} grid gap-8 py-10 md:grid-cols-3 md:gap-10`}>
          <div>
            <dt className="text-sm text-ink-soft">Studying</dt>
            <dd className="mt-1 text-base">
              BS Information Technology, Lyceum of Subic Bay. 2023 to present.
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">Internship</dt>
            <dd className="mt-1 text-base">
              Asset Management Department (AMD) at SBMA, May to September 2026.
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">Works with</dt>
            <dd className="mt-1 text-base">
              React, Next.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS, Figma.
            </dd>
          </div>
        </dl></Reveal>
      </section>

      {/* Work */}
      <section id="work" className={`${shell} py-24 md:py-32`}>
        <Reveal><h2 className={`${h2} mb-12 md:mb-16`}>Selected work</h2></Reveal>
        <Reveal delay={0.1}><Projects /></Reveal>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="bg-accent text-on-accent">
          <Reveal className={`${shell} py-20 md:py-28`}>
            <h2 className="max-w-[18ch] font-display text-4xl font-light leading-[1.05] tracking-tight md:text-7xl">
              IT intern and systems developer at SBMA
            </h2>
            <p className="mt-6 text-lg text-on-accent-soft">
              Asset Management Department (AMD, formerly PPMD) / System built July to August 2026 (Internship: May to September 2026)
            </p>
            <p className="mt-10 max-w-[62ch] text-lg leading-relaxed">
              Replaced a vulnerable local server with a cloud Supabase and PostgreSQL web system for the SBMA Asset Management Division. Built automated Form PPD-CF-36 job order slip printing with atomic sequential numbering, COA-compliant accountable form tracking, and real-time hauling analytics cards.
            </p>
            <a
              href="#work"
              className="link-draw mt-8 inline-flex items-center gap-1 py-1 text-[15px]"
            >
              See SBMA-JO under Selected work
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className={`${shell} grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-4">
            <h2 className={`${h2} lg:sticky lg:top-24`}>Events and seminars</h2>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}><Credentials /></Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-rule">
        <div className={`${shell} py-24 md:py-32`}>
          <Reveal><h2 className={`${h2} mb-12 md:mb-16`}>Tools I work with</h2></Reveal>
          <Reveal delay={0.1}><Skills /></Reveal>
        </div>
      </section>

      {/* Activity */}
      <section id="activity" className="border-t border-rule">
        <div className={`${shell} py-20 md:py-24`}>
          <h2 className="mb-8 font-display text-3xl font-light tracking-tight md:text-4xl">
            Open source code
          </h2>
          <Reveal><Activity /></Reveal>
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
            <span>Rhodge Esperon, Olongapo City, Philippines</span>
            <PageViews />
          </div>
        </div>
      </footer>
    </>
  );
}
