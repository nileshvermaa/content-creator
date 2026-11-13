/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about Pragati in this file.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Pragati Srivastava",
  firstName: "Pragati",
  lastName: "Srivastava",
  role: "Content Creator · Digital Marketing · Social Media Executive",
  tagline: "POV: your brand finally has a story worth watching.",
  location: "Lucknow, India",
  email: "work.pragspov@gmail.com",
  availability:
    "Open to Digital Marketing & Social Media Executive roles, and brand collaborations",
  /** Drop the PDF at public/resume.pdf — the download buttons appear automatically. */
  resume: "/resume.pdf",
};

/** Hand-written labels around the hero photo (clockwise from top-left). */
export const heroLabels = {
  topLeft: "Digital Marketing",
  topRight: "Content Creator",
  bottomRight: "Social Media Executive",
  bottomLeft: "Based in Lucknow",
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
  {
    label: "Myntra",
    handle: "Myntra Studio",
    href: "https://www.myntra.com/studio/influencer?id=Sog3Jjt7vK&affiliateId=Sog3Jjt7vK&shared=true&utm_medium=social_share_ugc_profile&utm_source=ugc_affiliate&utm_campaign=Sog3Jjt7vK&affiliate_id=Sog3Jjt7vK",
  },
  {
    label: "Wishlink",
    handle: "wishlink.com/pragspov",
    href: "https://www.wishlink.com/pragspov",
  },
] as const;

export const about = {
  intro:
    "I'm a storyteller who treats every frame like a strategy deck. Currently pursuing my MBA in HR & Marketing at IIT Patna, I create POV-first content and manage digital media for brands across fitness, finance and pharma — turning scattered feeds into voices people actually follow.",
  philosophy:
    "Great content isn't louder. It's truer. I blend market research, consumer psychology and cinematic storytelling so every post earns its place on the feed.",
  stats: [
    { value: "60+", label: "Brands collaborated with" },
    { value: "150K+", label: "Views in the best month" },
    { value: "3", label: "Industries — fitness, finance & pharma" },
    { value: "4", label: "Professional certifications" },
  ],
};

export const experience = [
  {
    period: "May 2026 — Present",
    role: "Digital Marketing & Pre-Sales Intern",
    company: "Bhawani Fitness",
    place: "New Delhi, India",
    summary:
      "Working directly with the CEO on digital marketing and pre-sales strategy across fitness and fertility wellness — 800+ qualified leads generated, lead-to-consultation response rates up 28%, community engagement up 35%, and lead response time cut by 40%.",
    tags: ["Pre-Sales Funnels", "Lead Generation", "Segmented Campaigns", "Community"],
    current: true,
  },
  {
    period: "2026 — Present",
    role: "Brand Collaborations & Digital Campaigns",
    company: "Independent Digital Creator",
    place: "Remote",
    summary:
      "Conceptualising and executing sponsored campaigns with leading brands including L'Oréal, Nykaa, Aqualogica, BBLUNT and HK Vitals — owning outreach, creative delivery, scheduling and community engagement, then reporting impressions, CTR and reach back to brand partners.",
    tags: ["Brand Partnerships", "Sponsored Campaigns", "Content", "Reporting"],
    current: true,
  },
  {
    period: "Mar 2026 — May 2026",
    role: "Client Portfolio Management Intern",
    company: "Tradoi Systems Pvt. Ltd.",
    place: "Lucknow, India",
    summary:
      "Managed strategic client portfolios by mapping business requirements and tracking account health — holding a 95%+ client satisfaction rate and cutting query resolution turnaround by 30% through structured CRM interaction logs.",
    tags: ["Client Relations", "Portfolio Management", "CRM", "Retention"],
  },
  {
    period: "Dec 2025 — Feb 2026",
    role: "Social Media Marketing & Market Research Intern",
    company: "Synova Financial Services",
    place: "Lucknow, India",
    summary:
      "Benchmarked 10+ financial-services competitors to uncover consumer pain points and shape messaging, turning quantitative and qualitative data into business summaries that lifted social media reach by 22%.",
    tags: ["Market Research", "Competitor Benchmarking", "Social Media", "Reporting"],
  },
  {
    period: "Aug 2023 — Sep 2023",
    role: "Marketing & Operations Trainee",
    company: "East African (India) Overseas",
    place: "Dehradun, India",
    summary:
      "Supported cross-functional teams with pharmaceutical market research, campaign documentation and product positioning analysis in healthcare manufacturing.",
    tags: ["Market Research", "Campaign Support", "Product Positioning"],
  },
];

/** Academic & strategy projects. */
export const projects = [
  {
    title: "ZARA vs H&M — Brand Wars",
    description:
      "A deep-dive competitive study of two fast-fashion giants — positioning, the 4Ps, digital strategy and sustainability — distilled into a 10-page strategic playbook.",
    href: "https://www.linkedin.com/in/pragatisrivastava3107",
    cta: "Read the case",
  },
];

/** Core competencies, as on the résumé. */
export const skills = [
  {
    group: "Brand",
    items: [
      "Brand Positioning & Messaging",
      "Competitive Benchmarking",
      "Consumer Insights & Market Research",
      "4Ps Marketing Mix",
      "Brand Partnerships",
      "Go-to-Market Strategy",
    ],
  },
  {
    group: "Digital",
    items: [
      "Performance Marketing Fundamentals",
      "Multi-Channel Campaign Management",
      "Pre-Sales Outreach & Funnel Optimisation",
      "Lead Generation",
      "Audience Segmentation",
      "Social Media Strategy",
      "CRM & Retention",
    ],
  },
  {
    group: "Tools",
    items: ["Meta Ads", "MS Excel", "PowerPoint", "Canva", "CRM Systems", "Data Visualisation"],
  },
  {
    group: "Creative",
    items: [
      "Content Marketing Strategy",
      "Campaign Copywriting",
      "Storytelling",
      "Creative Direction",
      "Community Engagement",
      "Video Editing",
    ],
  },
];

export const education = [
  {
    period: "2025 — 2027",
    degree: "MBA — Marketing & HR",
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
    views: 12834,
    date: "May 2026",
  },
  {
    id: "M-m4Zubuiak",
    title: "Freshly baked hottie 🥵",
    views: 9421,
    date: "Jun 2026",
  },
  {
    id: "LvpEeBi4ALQ",
    title: "in love with me 💅🫦",
    views: 6275,
    date: "May 2026",
  },
];

/**
 * Instagram reels to embed. Add the reel link plus a short caption;
 * `tag` is an optional badge (e.g. brand collabs). Instagram blocks
 * anonymous fetching, so keep these in sync by hand.
 */
export const instagramReels: {
  url: string;
  caption: string;
  date: string;
  tag?: string;
}[] = [
  {
    url: "https://www.instagram.com/reel/DbTaIWdiom-/",
    caption: "Brand collaboration with BBLUNT",
    date: "Aug 7, 2026",
    tag: "Brand collab - BBLUNT",
  },
  {
    url: "https://www.instagram.com/reel/DbWAB0ti2S0/",
    caption: "Brand collaboration with The Derma Co",
    date: "Aug 7, 2026",
    tag: "Brand collab - The Derma Co",
  },
  {
    url: "https://www.instagram.com/reel/DbSL3uSCvMY/",
    caption: "Brand collaboration with Pilgrim",
    date: "Aug 7, 2026",
    tag: "Brand collab - Pilgrim",
  },
  {
    url: "https://www.instagram.com/reel/DbKcUchiRrk/",
    caption: "Brand collaboration with Caredale",
    date: "Aug 7, 2026",
    tag: "Brand collab - Caredale",
  },
  {
    url: "https://www.instagram.com/reel/DZZHZ7UirxZ/",
    caption: "Quirky unboxing 🎀👁️👄👁️",
    date: "Jun 9, 2026",
    tag: "Brand collab · Dot & Key",
  },
  {
    url: "https://www.instagram.com/reel/DZXUMIFipHR/",
    caption: "Freshly baked hottie 🥵",
    date: "Jun 9, 2026",
  },
  {
    url: "https://www.instagram.com/reel/DZWm7A4Cu3Q/",
    caption: "It is what it is 🥵",
    date: "Jun 8, 2026",
  },
  {
    url: "https://www.instagram.com/reel/DZWvmOKC0hD/",
    caption: "Comment ❤️ for template",
    date: "Jun 8, 2026",
  },
];

/** Headline number for the brands section. */
export const brandCount = "60+";

/**
 * Brand collaborations. Add new ones at the top.
 * `times` marks a brand worked with more than once (shown as ★ ×N).
 * `href` is optional — a reel or the brand's page.
 */
export const brands: { name: string; note: string; href?: string; times?: number }[] = [
  { name: "BlaBliBlu", note: "Three collaborations", times: 3 },
  { name: "Aqualogica", note: "Three collaborations", times: 3 },
  { name: "HK Vitals", note: "Two collaborations", times: 2 },
  { name: "Nykaa", note: "Brand collaboration" },
  { name: "L'Oréal", note: "Brand collaboration" },
  { name: "Mamaearth", note: "Brand collaboration" },
  { name: "P&G", note: "Brand collaboration" },
  { name: "Engage", note: "Brand collaboration" },
  { name: "MyFitness", note: "Brand collaboration" },
  { name: "Epiiglobal", note: "International PR" },
  { name: "BBLUNT", note: "Hair care · Instagram reel", href: "https://www.instagram.com/reel/DbTaIWdiom-/" },
  { name: "The Derma Co", note: "Body care & sunscreen · reel", href: "https://www.instagram.com/reel/DbWAB0ti2S0/" },
  { name: "Pilgrim", note: "Hair growth serum · reel", href: "https://www.instagram.com/reel/DbSL3uSCvMY/" },
  { name: "Caredale", note: "Collaboration package · reel", href: "https://www.instagram.com/reel/DbKcUchiRrk/" },
  { name: "Dot & Key", note: "Skincare unboxing reel", href: "https://www.instagram.com/dotandkey.skincare" },
  { name: "Fiama", note: "Hokkaido Milk Bar · Niacinamide Scrub", href: "https://www.instagram.com/fiamaindia" },
  { name: "Himalayan Organics", note: "Biotin · L-Carnitine · Vitamin B12", href: "https://www.instagram.com/the_himalayan_organics" },
  { name: "Bentica", note: "Matcha Mellow Mask", href: "https://www.instagram.com/bentica.skincare" },
  { name: "Rosaa", note: "Rose Water — set of 2", href: "https://www.instagram.com/rosaa.in" },
  { name: "oBuddy", note: "Brand partnership", href: "https://www.instagram.com/obuddy.in" },
  { name: "Dr. Sheth's", note: "Skin care serum" },
  { name: "WishCare", note: "Hair growth concentrate" },
  { name: "Joy", note: "Face care collection" },
  { name: "DeoDap", note: "Lifestyle collection" },
];

/**
 * Total monthly views across Reels & Shorts (cumulative).
 * Append a point whenever the numbers are re-checked.
 */
export const viewsTrend = [
  { label: "Jan '26", views: 18000 },
  { label: "Feb '26", views: 31000 },
  { label: "Mar '26", views: 26000 },
  { label: "Apr '26", views: 57000 },
  { label: "May '26", views: 46000 },
  { label: "Jun '26", views: 94000 },
  { label: "Jul '26", views: 78000 },
  { label: "Aug '26", views: 152000 },
];

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
