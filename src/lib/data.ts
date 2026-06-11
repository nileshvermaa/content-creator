/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about Pragati in this file.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Pragati Srivastava",
  firstName: "Pragati",
  lastName: "Srivastava",
  role: "Content Creator & Digital Media Manager",
  tagline: "POV: your brand finally has a story worth watching.",
  location: "Lucknow, India",
  email: "pragatisrivastava3107@gmail.com",
  availability: "Open to collaborations & brand partnerships",
};

export const socials = [
  {
    label: "Instagram",
    handle: "@pragspov_",
    href: "https://www.instagram.com/pragspov_",
  },
  {
    label: "YouTube",
    handle: "@palakunfiltered26",
    href: "https://youtube.com/@palakunfiltered26",
  },
  {
    label: "LinkedIn",
    handle: "pragatisrivastava3107",
    href: "https://www.linkedin.com/in/pragatisrivastava3107",
  },
] as const;

export const about = {
  intro:
    "I'm a storyteller who treats every frame like a strategy deck. Currently pursuing my MBA in HR & Marketing at IIT Patna, I create POV-first content and manage digital media for brands across fitness, finance and pharma — turning scattered feeds into voices people actually follow.",
  philosophy:
    "Great content isn't louder. It's truer. I blend market research, consumer psychology and cinematic storytelling so every post earns its place on the feed.",
  stats: [
    { value: 3, suffix: "", label: "Industries — fitness, finance & pharma" },
    { value: 4, suffix: "", label: "Professional certifications" },
    { value: 2, suffix: "", label: "Platforms, one unmistakable voice" },
  ],
};

export const experience = [
  {
    period: "Feb 2026 — Present",
    role: "Marketing Intern",
    company: "Bhavani Fitness",
    place: "India",
    summary:
      "Driving brand-awareness campaigns and social content for the fitness space — from competitor research and trend-spotting to creative production and KPI reporting.",
    tags: ["Brand Campaigns", "Social Content", "Market Research", "KPI Tracking"],
  },
  {
    period: "Dec 2025 — Feb 2026",
    role: "Social Media Marketing Intern",
    company: "Synova Financial Services",
    place: "Lucknow, India",
    summary:
      "Turned data into stories for a financial services brand — content aligned to business goals, competitor benchmarking, and campaign execution across multiple digital channels.",
    tags: ["Content Strategy", "Data Analysis", "Campaign Planning", "Reporting"],
  },
  {
    period: "Aug 2023 — Sep 2023",
    role: "Operations & Marketing Trainee",
    company: "East African (India) Overseas",
    place: "Dehradun, India",
    summary:
      "Cross-functional exposure inside a pharmaceutical business — content creation, campaign support, consumer research, and operational coordination with senior teams.",
    tags: ["Content Creation", "Consumer Research", "Operations"],
  },
];

export const showcase = [
  {
    index: "01",
    platform: "Instagram",
    title: "pragspov_",
    description:
      "POV-first lifestyle storytelling. Everyday moments reframed through a cinematic lens — reels, carousels and captions built to stop the scroll.",
    href: "https://www.instagram.com/pragspov_",
    cta: "Watch the feed",
    accent: "from-pink-500 via-fuchsia-500 to-violet-500",
  },
  {
    index: "02",
    platform: "YouTube",
    title: "palakunfiltered26",
    description:
      "Long-form, unfiltered stories. Vlogs and sit-downs where the edit serves the emotion — honest content that builds community, not just views.",
    href: "https://youtube.com/@palakunfiltered26",
    cta: "Press play",
    accent: "from-red-500 via-orange-500 to-amber-400",
  },
  {
    index: "03",
    platform: "Brand Strategy",
    title: "ZARA vs H&M — Brand Wars",
    description:
      "A deep-dive competitive study of two fast-fashion giants — positioning, the 4Ps, digital strategy and sustainability — distilled into a 10-page strategic playbook.",
    href: "https://www.linkedin.com/in/pragatisrivastava3107",
    cta: "Read the case",
    accent: "from-violet-500 via-purple-500 to-indigo-400",
  },
];

export const skills = [
  {
    group: "Create",
    items: [
      "Content Creation",
      "Social Media Marketing",
      "Campaign Management",
      "Digital Marketing",
      "Canva",
      "Brand Management",
    ],
  },
  {
    group: "Analyse",
    items: [
      "Market Research",
      "Competitive Analysis",
      "Data Visualization",
      "Consumer Behavior",
      "MS Excel",
      "HR Analytics",
    ],
  },
  {
    group: "Connect",
    items: [
      "Storytelling",
      "Stakeholder Communication",
      "Employee Engagement",
      "Team Collaboration",
      "Leadership",
      "Cross-functional Coordination",
    ],
  },
];

export const education = [
  {
    period: "2025 — 2027",
    degree: "MBA — HR & Marketing",
    school: "Indian Institute of Technology (IIT) Patna",
  },
  {
    period: "2020 — 2024",
    degree: "Bachelor of Pharmacy",
    school: "Bareilly International University",
  },
];

export const certifications = [
  { name: "Introduction to Digital Business Skills", org: "HP LIFE", year: "2025" },
  { name: "AI for Beginners", org: "HP LIFE", year: "2025" },
  { name: "Data Visualisation for Business", org: "Tata Group · Forage", year: "2025" },
  { name: "Digital Marketing in Pharmacy", org: "Makeskill, Delhi", year: "2022" },
];

/**
 * YouTube Shorts pulled from @palakunfiltered26 (sorted by views).
 * Add new entries with the 11-char video id from the short's URL.
 */
export const youtubeShorts = [
  {
    id: "_-Qb-w9-VWs",
    title: "New zudio blush pods ✨",
    views: 2338,
    date: "May 2026",
  },
  {
    id: "M-m4Zubuiak",
    title: "Freshly baked hottie 🥵",
    views: 1954,
    date: "Jun 2026",
  },
  {
    id: "LvpEeBi4ALQ",
    title: "in love with me 💅🫦",
    views: 1446,
    date: "May 2026",
  },
];

/**
 * Instagram reels to embed. Paste full reel links here, e.g.
 *   "https://www.instagram.com/reel/AbC123xYz/"
 * and they appear on the site automatically. (Instagram blocks
 * anonymous fetching, so these must be added by hand.)
 */
export const instagramReels: string[] = [];

export const marqueeWords = [
  "Content Strategy",
  "POV Storytelling",
  "Reels & Shorts",
  "Brand Building",
  "Social Media",
  "Market Research",
  "Campaign Design",
  "Community",
];
