import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "./data";

/** Server-only. True once public/resume.pdf exists, so a download button never 404s. */
export const hasResume = existsSync(join(process.cwd(), "public", site.resume));
