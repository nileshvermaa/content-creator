"use client";

import { useState } from "react";
import { site } from "@/lib/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Résumé", href: "#resume" },
  { label: "Brands", href: "#brands" },
  { label: "Watch", href: "#watch" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink bg-paper/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10"
      >
        <a href="#home" className="font-display text-xl font-black italic">
          {site.firstName}
          <span className="text-rose">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="kicker underline decoration-1 underline-offset-[6px] transition-colors hover:text-rose"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${site.email}`}
          className="kicker hidden bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-rose md:block"
        >
          Hire me
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="kicker border border-ink px-3 py-2 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-ink px-6 py-4 md:hidden">
          {links.map((l) => (
            <li key={l.href} className="border-b border-line last:border-0">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl font-bold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
