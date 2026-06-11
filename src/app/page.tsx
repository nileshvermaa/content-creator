import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Showcase from "@/components/Showcase";
import Watch from "@/components/Watch";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Showcase />
      <Watch />
      <Skills />
      <Contact />
    </main>
  );
}
