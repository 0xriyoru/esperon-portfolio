import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

interface RepoItem {
  name: string;
  url: string;
  description: string;
  tech: string[];
}

const recentRepos: RepoItem[] = [
  {
    name: "0xriyoru/Mekai",
    url: "https://github.com/0xriyoru/Mekai",
    description:
      "OCR-assisted manga translation reader with selective canvas bounding boxes and PaddleOCR pipeline.",
    tech: ["TypeScript", "Canvas API", "PaddleOCR", "FastAPI"],
  },
  {
    name: "0xriyoru/MaUlam",
    url: "https://github.com/0xriyoru/MaUlam",
    description:
      "Android mobile companion app with camera ingredient scanning and Gemini Vision recipe generation.",
    tech: ["React Native", "Expo", "Gemini AI", "Android APK"],
  },
  {
    name: "0xriyoru/rebeat",
    url: "https://github.com/0xriyoru/rebeat",
    description:
      "Low-latency browser audio launchpad with sample-accurate loop scheduling and polyphonic layered playback.",
    tech: ["React", "Tone.js", "Web Audio API"],
  },
  {
    name: "0xriyoru/uma-helper",
    url: "https://github.com/0xriyoru/uma-helper",
    description:
      "Game analytical companion and deck builder with sub-50ms optimistic state updates and dynamic dataset loading.",
    tech: ["Next.js", "TypeScript", "Zustand", "Supabase"],
  },
];

export default function Activity() {
  return (
    <div>
      <ul className="divide-y divide-rule border-y border-rule-strong">
        {recentRepos.map((repo) => (
          <li
            key={repo.name}
            className="group py-5 transition-colors hover:bg-paper-deep/40"
          >
            <div className="grid gap-2 md:grid-cols-12 md:items-baseline md:gap-6">
              <div className="md:col-span-5">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[15px] font-medium text-ink transition-colors group-hover:text-accent link-draw"
                >
                  {repo.name}
                  <ArrowUpRight
                    size={14}
                    className="text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="md:col-span-7">
                <p className="text-[14.5px] leading-relaxed text-ink-soft">
                  {repo.description}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {repo.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-note border border-rule bg-paper px-2 py-0.5 font-mono text-[11.5px] text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
        <span>Public source repositories on GitHub</span>
        <a
          href="https://github.com/0xriyoru?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent link-draw"
        >
          View all repositories
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
