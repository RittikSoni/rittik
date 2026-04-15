import rsCustomVideo from "../../public/assets/projects/rs_custom_video.jpg";
import rsPredictionOfDementia from "../../public/assets/projects/rs_prediction_of_dementia.png";
import rsPredictionOfDiseases from "../../public/assets/projects/rs_prediction_of_diseases.png";
import rsAahc from "../../public/assets/projects/rs_aahc.jpg";
import rsMessengerPegasus from "../../public/assets/projects/rs_pegasus_messenger.jpg";
import rsNetflix from "../../public/assets/projects/rs_netflix_clone.jpg";
import rsTinder from "../../public/assets/projects/rs_tinder_clone.png";
import rsMotherEarthGame from "../../public/assets/projects/rs_mother_earth_game.png";
import rsAiEjustice from "../../public/assets/projects/ai_ejustice.png";
import rsEcommerceApp from "../../public/assets/projects/rs_elpisverse_ecommerce_app.jpg";
import rsWeatherForecast from "../../public/assets/projects/rs_weather_forecast.jpg";
import rsAdgl from "../../public/assets/projects/rittik_adgl.jpg";
import rsDoctorsAI from "../../public/assets/projects/doctors_ai_king_rittik.jpg";
import rsBloom from "../../public/assets/projects/bloom_kingrittik.jpg";
import rsPatientAI from "../../public/assets/projects/patient_ai.png";

export const projectData = [
  {
    id: 1,
    title: "USG&J: E-Commerce App",
    description:
      "A cross-platform e-commerce app for Android, iOS, web, and soon Windows. Elevate user experience with seamless order tracking, lightning-fast real-time search, and an extensive product catalog. Ensuring secure transactions on every device.",
    image: rsEcommerceApp,
    projectLink:
      "https://play.google.com/store/apps/details?id=com.kingrittik.elpis",
    sourceCode: null,
    author: "Rittik Soni",
    tags: ["iOS", "Android", "Web"],
    category: "Mobile App",
    featured: true,
  },
  {
    id: 14,
    title: "Doctors AI",
    description:
      "A cross-platform AI-powered app for Android, iOS, web, Windows, and macOS. Features AI-driven diagnosis, secure medical records, and concise AI-generated summaries of medical data. Empowering healthcare with cutting-edge technology.",
    image: rsDoctorsAI,
    projectLink:
      "https://play.google.com/store/apps/details?id=com.kingrittik.doctors",
    appStoreLink: "https://apps.apple.com/in/app/doctors-ai/id6758019612",
    sourceCode: null,
    author: "Rittik Soni",
    tags: ["iOS", "Android", "Web"],
    category: ["AI", "Mobile App", "Web"],
    featured: true,
  },
  {
    id: 12,
    title: "Patient AI",
    description:
      "A cross-platform AI-powered app for Android & iOS featuring AI-driven diagnosis, online/offline doctor consultation & appointment booking, secure medical records, and AI-generated summaries of medical data.",
    image: rsPatientAI,
    projectLink:
      "https://play.google.com/store/apps/details?id=com.kingrittik.patients_ai",
    sourceCode: null,
    author: "Rittik Soni",
    tags: ["iOS", "Android", "Web"],
    category: ["AI", "Mobile App", "Web"],
    featured: true,
  },
  {
    id: 15,
    title: "Bloom",
    description:
      "Effortlessly record and share your screen. An open-source alternative to Loom built for simplicity and speed.",
    image: rsBloom,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/Bloom",
    author: "Rittik Soni",
    tags: ["Open Source", "Desktop", "Loom Alternative"],
    category: "Productivity",
    featured: true,
  },
  {
    id: 2,
    title: "Netflix Clone",
    description:
      "Elysian — a fully functional iOS and Android OTT streaming app that closely resembles Netflix, with a premium UI and real content browsing experience.",
    image: rsNetflix,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/Elysian",
    author: "Rittik Soni",
    tags: ["iOS", "Android", "OTT"],
    category: "Mobile App",
    featured: false,
  },
  {
    id: 3,
    title: "Tinder Clone",
    description:
      "A dating-app clone featuring fluid swipe card functionality for seamless liking and disliking interactions.",
    image: rsTinder,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/Tinder-clone",
    author: "Rittik Soni",
    tags: ["iOS", "Android"],
    category: "Mobile App",
    featured: false,
  },
  {
    id: 4,
    title: "A.I. E-Justice",
    description:
      "Revolutionizes legal accessibility using the Gemini API. Intelligently analyzes user inquiries, delivering precise legal insights tailored to diverse jurisdictions, transforming legal complexities into clear, actionable knowledge.",
    image: rsAiEjustice,
    projectLink: null,
    websiteLink: "https://ai.google.dev/competition/projects/ai-e-justice",
    sourceCode: "https://github.com/RittikSoni/AI-Powered-E-Justice",
    author: "Rittik Soni",
    tags: ["iOS", "Android", "Windows", "Web"],
    category: ["AI", "Mobile App", "Web"],
    featured: true,
  },
  {
    id: 5,
    title: "Mother Earth Game",
    description:
      "A game rooted in the UN's SDG goals. Join the global movement for sustainability, one interactive challenge at a time.",
    image: rsMotherEarthGame,
    projectLink: null,
    youtubeLink: "https://www.youtube.com/watch?v=Go7SRUBSsPk",
    sourceCode: "https://github.com/RittikSoni/Mother-Earth",
    author: "Rittik Soni",
    tags: ["Game", "Web", "iOS", "Android", "Desktop"],
    category: "Game",
    featured: false,
  },
  {
    id: 6,
    title: "Prediction of Dementia",
    description:
      "ML algorithms analyze data and identify patterns used to build a predictive model, aiding healthcare professionals in early detection of dementia for earlier intervention and better patient outcomes.",
    image: rsPredictionOfDementia,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/AI-ML",
    author: "Rittik Soni",
    tags: ["AI","Machine Learning", "Healthcare"],
    category: "AI",
    featured: false,
  },
  {
    id: 7,
    title: "Custom Video Player",
    description:
      "A web-based video player with a unique mid-playback CTA feature. Fully customizable playback controls supporting a wide range of video formats for a seamless viewing experience.",
    image: rsCustomVideo,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/custom_video_player",
    author: "Rittik Soni",
    tags: ["Web"],
    category: "Web",
    featured: false,
  },
  {
    id: 8,
    title: "AAHC Business App",
    description:
      "A customized business app for AAHC featuring latest news, in-built videos, personalized jewelry designs, certificate verification, and job postings — redefining business engagement.",
    image: rsAahc,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/AAHC",
    author: "Rittik Soni",
    tags: ["iOS", "Android", "Web"],
    category: "Mobile App",
    featured: false,
  },
  {
    id: 9,
    title: "Disease Prediction",
    description:
      "Uses ML algorithms to predict possible diseases based on patient-reported symptoms, helping healthcare professionals diagnose patients more accurately and improve health outcomes.",
    image: rsPredictionOfDiseases,
    projectLink: null,
    sourceCode: null,
    author: "Rittik Soni",
    tags: ["AI", "Machine Learning", "Healthcare"],
    category: "AI",
    featured: false,
  },
  {
    id: 10,
    title: "ADGL",
    description:
      "Your pocket-sized diamonds, gemstone & jewelry verifier. On-the-go authentication for diamonds and jewelry with precision and security — inspired by tech leaders like Google and Apple.",
    image: rsAdgl,
    projectLink:
      "https://play.google.com/store/apps/details?id=com.kingrittik.adgl",
    sourceCode: null,
    author: "Rittik Soni",
    tags: ["AI", "iOS", "Android"],
    category: "Mobile App",
    featured: false,
  },
];
