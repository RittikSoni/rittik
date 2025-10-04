import About from "@/components/About";
import Contact from "@/components/Contact";
import HomeMain from "@/components/HomeMain";
import Navbar from "@/components/Navbar";
import OpenSourceContributions from "@/components/openSourceSection/OpenSourceSection";
import Projects from "@/components/Projects";
import ResearchPublications from "@/components/r&d/ResearchAndPublications";
import Skills from "@/components/Skills";
import Videos from "@/components/videos/videos";
import Head from "next/head";
import { motion, useSpring, useScroll } from "framer-motion";

export default function Home() {
  // Track scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <Head>
        <title>Rittik | Software Engineer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/rittik_logo.png" />
        <meta
          name="description"
          content="Rittik soni is a software engineer with expertise in web development, mobile app development, and software architecture."
        />
        <meta
          name="keywords"
          content="rittik, software engineering, web development, mobile app development, software architecture, portfolio, Rittik Soni"
        />
        <meta property="og:title" content="Rittik Soni | Software Engineer" />
        <meta
          property="og:description"
          content="Rittik soni is a software engineer with expertise in web development, mobile app development, and software architecture."
        />
        <meta property="og:url" content="https://rittik.vercel.app/" />
        <meta name="twitter:title" content="Rittik Soni | Software Engineer" />
        <meta
          name="twitter:description"
          content="Rittik soni is a software engineer with expertise in web development, mobile app development, and software architecture."
        />
        <link rel="canonical" href="https://rittik.vercel.app/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Rittik soni" />
      </Head>

      <Navbar />
      {/* Progress top bar. 
      Track how much user scrolled */}
      <motion.div
        id="scroll-indicator"
        className="z-100 bg-emerald-500 rounded-full fixed h-1 top-0 left-0 right-0"
        style={{
          scaleX,
          originX: 0,
        }}
      />
      <HomeMain />
      <About />
      <Skills />
      <Projects />
      <Videos />
      <OpenSourceContributions />
      <ResearchPublications />
      <Contact />
    </>
  );
}
