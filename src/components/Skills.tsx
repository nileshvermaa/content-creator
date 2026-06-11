import Reveal from "./Reveal";
import { skills, education, certifications } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative border-y border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose">
            05 — The Toolkit
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-(family-name:--font-display) max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Create. Analyse. <span className="text-gradient">Connect.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={0.12 * i}>
              <div className="h-full rounded-3xl border border-line p-8">
                <h3 className="font-(family-name:--font-display) text-gradient text-2xl font-bold">
                  {group.group}
                </h3>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="cursor-default rounded-full border border-line px-4 py-2 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-rose/50 hover:text-cream"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* education + certifications */}
        <div className="mt-24 grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <h3 className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-muted">
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="flex items-baseline justify-between gap-6 border-b border-line pb-6"
                  >
                    <div>
                      <p className="font-(family-name:--font-display) text-xl font-semibold">
                        {edu.degree}
                      </p>
                      <p className="mt-1 text-sm text-muted">{edu.school}</p>
                    </div>
                    <span className="shrink-0 text-sm text-muted">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <h3 className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-muted">
                Certifications
              </h3>
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-baseline justify-between gap-6 border-b border-line pb-6"
                  >
                    <div>
                      <p className="font-(family-name:--font-display) text-lg font-semibold">
                        {cert.name}
                      </p>
                      <p className="mt-1 text-sm text-muted">{cert.org}</p>
                    </div>
                    <span className="shrink-0 text-sm text-muted">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
