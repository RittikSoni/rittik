import About from "@/components/About";
import Contact from "@/components/Contact";
import HomeMain from "@/components/HomeMain";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Head from "next/head";

export default function Home() {
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
      <HomeMain />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
