import About from "@/components/About";
import Contact from "@/components/Contact";
import HomeMain from "@/components/HomeMain";
import Navbar from "@/components/Navbar";
import FeaturedAppearances from "@/components/FeaturedAppearances";
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
        {/* ── Primary ─────────────────────────────────────────── */}
        <title>Rittik | Software Engineer, YouTuber, Speaker, AI Builder & Content Creator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Rittik Soni (King Rittik) is a Software Engineer, YouTuber, Speaker and Content Creator. Creator of Doctors AI. Speaker at Google AI Day. Featured on Startup Party podcast. Building at the intersection of AI, mobile & web."
        />
        <meta
          name="keywords"
          content="Rittik Soni, Rittik, ritik, hrithik, King Rittik, kingrittik, software engineer, Flutter developer, AI engineer, Doctors AI, Google AI Day speaker, Startup Party podcast, mobile app developer, React developer, Node.js, python, machine learning, YouTube, content creator, India, king rittik, kr"
        />
        <meta name="author" content="Rittik Soni" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="color-scheme" content="dark light" />
        <link rel="shortcut icon" href="/assets/rittik_logo.png" />

        {/* ── Open Graph ──────────────────────────────────────── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rittik Soni — King Rittik" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:url" content="https://rittik.vercel.app/" />
        <meta property="og:title" content="Rittik Soni (King Rittik) | Software Engineer, YouTuber & Content Creator" />
        <meta
          property="og:description"
          content="Software Engineer, YouTuber & Content Creator. Creator of Doctors AI. Speaker at Google AI Day. Featured on Startup Party podcast. Building AI-powered mobile & web products."
        />
        <meta property="og:image" content="https://rittik.vercel.app/assets/rittik.jpg" />
        <meta property="og:image:secure_url" content="https://rittik.vercel.app/assets/rittik.jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Rittik Soni (King Rittik) — Software Engineer, YouTuber & Content Creator" />

        {/* ── Twitter / X Card ────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kingrittik" />
        <meta name="twitter:creator" content="@kingrittik" />
        <meta name="twitter:title" content="Rittik Soni (King Rittik) | Software Engineer, YouTuber & Content Creator" />
        <meta
          name="twitter:description"
          content="Software Engineer, YouTuber & Content Creator. Creator of Doctors AI. Speaker at Google AI Day. Featured on Startup Party podcast."
        />
        <meta name="twitter:image" content="https://rittik.vercel.app/assets/rittik.jpg" />
        <meta name="twitter:image:alt" content="Rittik Soni (King Rittik) — Software Engineer & Content Creator" />
        <meta name="twitter:label1" content="Role" />
        <meta name="twitter:data1" content="Software Engineer & YouTuber" />
        <meta name="twitter:label2" content="Open Source" />
        <meta name="twitter:data2" content="github.com/RittikSoni" />

        {/* ── AI Crawler Hints ─────────────────────────────────── */}
        <meta name="google-extended" content="index, follow" />

        {/* ── JSON-LD Structured Data ──────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              /* 1. Person — triggers Google Knowledge Panel */
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://rittik.vercel.app/#person",
                name: "Rittik Soni",
                givenName: "Rittik",
                familyName: "Soni",
                alternateName: ["King Rittik", "kingrittik", "KingRittik"],
                url: "https://rittik.vercel.app/",
                image: {
                  "@type": "ImageObject",
                  url: "https://rittik.vercel.app/assets/rittik.jpg",
                  width: 800,
                  height: 800,
                },
                jobTitle: [
                  "Software Engineer",
                  "YouTuber",
                  "Content Creator",
                  "AI Builder",
                  "Speaker",
                ],
                description:
                  "Rittik Soni, known as King Rittik, is a Software Engineer, YouTuber and Content Creator from Delhi, India. He is the creator of Doctors AI, a speaker at Google AI Day, and was featured on the Startup Party podcast. He builds AI-powered mobile and web applications.",
                nationality: { "@type": "Country", name: "India" },
                homeLocation: { "@type": "Place", name: "Delhi, India" },
                sameAs: [
                  "https://rittik.vercel.app/",
                  "https://github.com/RittikSoni",
                  "https://www.linkedin.com/in/rittik-soni/",
                  "https://www.youtube.com/@king_rittik",
                  "https://www.instagram.com/kingrittikofficial",
                  "https://medium.com/@kingrittik",
                  "https://discord.gg/Tmn6BKwSnr",
                  "https://play.google.com/store/apps/dev?id=4707482099887111290",
                  "https://open.spotify.com/episode/4Mi0R9ZRvmnDKm2HfRYF3O",
                ],
                knowsAbout: [
                  "Software Engineering",
                  "Flutter",
                  "React",
                  "Node.js",
                  "python",
                  "Artificial Intelligence",
                  "Large Language Models",
                  "Machine Learning",
                  "Mobile App Development",
                  "Web Development",
                  "YouTube Content Creation",
                  "AI Product Development",
                  "Doctors AI",
                ],
              },

              /* 2. WebSite — enables Sitelinks Search Box + AI context */
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://rittik.vercel.app/#website",
                name: "Rittik Soni — King Rittik",
                alternateName: "King Rittik Portfolio",
                url: "https://rittik.vercel.app/",
                description:
                  "Official portfolio of Rittik Soni (King Rittik) — Software Engineer, YouTuber & Content Creator from Delhi, India.",
                author: {
                  "@type": "Person",
                  "@id": "https://rittik.vercel.app/#person",
                  name: "Rittik Soni",
                },
                inLanguage: "en-IN",
                copyrightYear: new Date().getFullYear(),
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: ["#about", "#home", "#featured"],
                },
              },

              /* 3. YouTube Channel */
              {
                "@context": "https://schema.org",
                "@type": "VideoChannel",
                name: "King Rittik",
                alternateName: "king_rittik",
                description:
                  "King Rittik is the official YouTube channel of Rittik Soni — a Software Engineer and Content Creator sharing videos on Flutter, AI, web development, and software engineering.",
                url: "https://www.youtube.com/@king_rittik",
                identifier: "@king_rittik",
                author: {
                  "@type": "Person",
                  "@id": "https://rittik.vercel.app/#person",
                  name: "Rittik Soni",
                },
              },

              /* 4. Podcast Episode — Startup Party */
              {
                "@context": "https://schema.org",
                "@type": "PodcastEpisode",
                name: "Building the Future: Engineering, AI & Entrepreneurship — ft. Rittik Soni (King Rittik)",
                description:
                  "Rittik Soni (King Rittik) featured on Startup Party podcast discussing software engineering, AI product building, and the journey from developer to content creator.",
                url: "https://open.spotify.com/episode/4Mi0R9ZRvmnDKm2HfRYF3O",
                partOfSeries: {
                  "@type": "PodcastSeries",
                  name: "Startup Party",
                  url: "https://open.spotify.com",
                },
                actor: {
                  "@type": "Person",
                  "@id": "https://rittik.vercel.app/#person",
                  name: "Rittik Soni",
                },
              },

              /* 5. Google AI Day Event */
              {
                "@context": "https://schema.org",
                "@type": "Event",
                name: "Google AI Day — Speaker: Rittik Soni (King Rittik)",
                description:
                  "Rittik Soni (King Rittik) invited as a speaker at Google AI Day to present on AI in the Real World: Building Intelligent Applications with LLMs, AI APIs, and on-device ML. Featuring Doctors AI.",
                performer: {
                  "@type": "Person",
                  "@id": "https://rittik.vercel.app/#person",
                  name: "Rittik Soni",
                },
                organizer: {
                  "@type": "Organization",
                  name: "Google",
                  url: "https://google.com",
                },
                recordedIn: {
                  "@type": "VideoObject",
                  name: "AI in the Real World — Google AI Day Talk by Rittik Soni (King Rittik)",
                  description:
                    "Rittik Soni (King Rittik) speaks at Google AI Day about building intelligent applications using LLMs, AI APIs, and on-device machine learning. Featuring Doctors AI.",
                  url: "https://youtube.com/shorts/odgsD_H4a_A",
                  thumbnailUrl: "https://rittik.vercel.app/assets/rittik.jpg",
                  uploadDate: "2024-01-01",
                  author: {
                    "@type": "Person",
                    name: "Rittik Soni",
                    alternateName: "King Rittik",
                  },
                },
              },

              /* 6. BreadcrumbList — helps Google understand site structure */
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://rittik.vercel.app/" },
                  { "@type": "ListItem", position: 2, name: "Projects", item: "https://rittik.vercel.app/#projects" },
                  { "@type": "ListItem", position: 3, name: "Speaking & Media", item: "https://rittik.vercel.app/#featured" },
                  { "@type": "ListItem", position: 4, name: "Videos", item: "https://rittik.vercel.app/#tech-posts" },
                  { "@type": "ListItem", position: 5, name: "Contact", item: "https://rittik.vercel.app/#contact" },
                ],
              },
            ]),
          }}
        />
      </Head>


      <Navbar />
      {/* Progress top bar. 
      Track how much user scrolled */}
      <motion.div
        id="scroll-indicator"
        className="z-100 rounded-full fixed h-1 top-0 left-0 right-0"
        style={{
          scaleX,
          originX: 0,
          background: "var(--accent-cyan)",
        }}
      />
      <HomeMain />
      <About />
      <Skills />
      <Projects />
      <Videos />
      <FeaturedAppearances />
      <OpenSourceContributions />
      <ResearchPublications />
      <Contact />
    </>
  );
}
