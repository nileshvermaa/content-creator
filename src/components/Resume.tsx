import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { hasResume } from "@/lib/resume";
import {
  site,
  experience,
  education,
  certifications,
  projects,
  skills,
} from "@/lib/data";

function ColumnTitle({ children }: { children: string }) {
  return <h3 className="kicker border-y border-ink py-3 text-ink">{children}</h3>;
}

export default function Resume() {
  return (
    <section id="resume" className="torn-top torn-bottom bg-paper-soft">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <Image
          src="/decor/statue.jpg"
          alt=""
          width={303}
          height={590}
          className="decor right-8 top-14 hidden w-36 rotate-6 sm:block md:w-48"
        />
        <div className="flex flex-col items-start gap-8">
          <SectionHead kicker="Experience & education" title="résumé" hand="the short version" />
          {hasResume && (
            <a href={site.resume} download="Pragati-Srivastava-Resume.pdf" className="btn btn-solid">
              Download résumé (PDF) <span aria-hidden>↓</span>
            </a>
          )}
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <ColumnTitle>Experience &amp; internships</ColumnTitle>
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={0.05 * i}>
                <article className="border-b border-line py-6">
                  <p className="kicker text-rose">
                    {job.period}
                    {job.current && " · Now"}
                  </p>
                  <h4 className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl">
                    {job.role}
                  </h4>
                  <p className="mt-1 italic text-muted">
                    {job.company} — {job.place}
                  </p>
                  <p className="mt-3 leading-relaxed">{job.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                    {job.tags.map((tag) => (
                      <li key={tag}>#{tag.replace(/\s+/g, "")}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="space-y-12 md:col-span-5">
            <div>
              <ColumnTitle>Key skills</ColumnTitle>
              <table className="w-full text-left text-sm">
                <tbody>
                  {skills.map((row) => (
                    <tr key={row.group} className="border-b border-line align-top">
                      <th scope="row" className="kicker w-24 py-3.5 pr-3 text-rose">
                        {row.group}
                      </th>
                      <td className="py-3 leading-relaxed">{row.items.join(" · ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <ColumnTitle>Education</ColumnTitle>
              <ul>
                {education.map((e) => (
                  <li key={e.degree} className="border-b border-line py-4">
                    <p className="font-display text-xl font-bold">{e.degree}</p>
                    <p className="text-sm text-muted">
                      {e.school} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnTitle>Certifications</ColumnTitle>
              <ul>
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="flex justify-between gap-4 border-b border-line py-3 text-sm"
                  >
                    <span>
                      <span className="font-semibold">{c.name}</span>
                      <span className="block text-muted">{c.org}</span>
                    </span>
                    <span className="text-muted">{c.year}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnTitle>Strategic marketing project</ColumnTitle>
              {projects.map((p) => (
                <article key={p.title} className="py-4">
                  <h4 className="font-display text-xl font-bold">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed">{p.description}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kicker mt-3 inline-block text-rose underline underline-offset-4"
                  >
                    {p.cta} →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
