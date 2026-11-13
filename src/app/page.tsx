import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Brands from "@/components/Brands";
import Watch from "@/components/Watch";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <Hero />
      <main>
        <Marquee />
        <About />
        <Resume />
        <Brands />
        <Watch />
      </main>
      <Contact />
    </>
  );
}
