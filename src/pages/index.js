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
        <meta name="description" content="Rittik Soni Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/rittik_logo.png" />
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
