import project1 from "../../public/assets/Rittik_bg.jpg";
import rsCustomVideo from "../../public/assets/projects/rs_custom_video.png";
import rsPredictionOfDementia from "../../public/assets/projects/rs_prediction_of_dementia.png";
import rsPredictionOfDiseases from "../../public/assets/projects/rs_prediction_of_diseases.png";
import rsAahc from "../../public/assets/projects/rs_aahc.png";
import rsDoc from "../../public/assets/projects/rs_doc.png";
import rsMessengerPegasus from "../../public/assets/projects/rs_pegasus_messenger.png";
import rsNetflix from "../../public/assets/projects/rs_netflix.png";
import rsEcommerceApp from "../../public/assets/projects/rs_ecommerce_app.png";
import rsWeatherForecast from "../../public/assets/projects/rs_weather_forecast.png";

export const projectData = [
  {
    id: 1,
    title: "Babyhood: E-Commerce App",
    description:
      "Babyhood: A cross-platform e-commerce app for Android, iOS, web, and soon Windows. Elevate user experience with seamless order tracking, lightning-fast real-time search, and an extensive product catalog. Ensuring secure transactions on every device. Delivering innovation and versatility in every click. 🌐📱💻 ",
    image: rsEcommerceApp,
    projectLink:
      "https://play.google.com/store/apps/details?id=com.kingrittik.babyhood",
    sourceCode: null,
  },
  {
    id: 1,
    title: "Netflix clone (iOS & Android)",
    description:
      "Fully functional iOS and Android app that closely resembles the popular streaming service Netflix",
    image: rsNetflix,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/Android-iOS/tree/main/netflix",
  },
  {
    id: 2,
    title: "Prediction of Dementia",
    description:
      "Used Machine learning algorithms to analyze the data and identify patterns that can be used to develop a predictive model. The ultimate goal of the project is to provide healthcare professionals with a tool that can aid in the early detection of dementia, allowing for earlier intervention and better patient outcomes.",
    image: rsPredictionOfDementia,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/AI-ML",
  },
  {
    id: 8,
    title: "Custom Video player",
    description:
      "Web-based application that includes a unique feature - a button that appears on the top right corner of the video player when the video has completed 50% playback. This feature is designed to capture the user's attention and encourage them to take action, such as sharing the video on social media or signing up for more related content. The video player itself is fully customizable, with options for playback controls. It also supports a wide range of video formats.Users can enjoy a seamless and engaging video watching experience, complete with a compelling call-to  -action at the halfway point.",
    image: rsCustomVideo,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/custom_video_player",
  },
  {
    id: 3,
    title: "AAHC (Web, iOS & Android)",
    description: "",
    image: rsAahc,
    projectLink: null,
    sourceCode: "https://github.com/RittikSoni/AAHC",
  },
  {
    id: 4,
    title: "Disease prediction",
    description:
      "It uses machine learning algorithms to predict possible diseases based on symptoms reported by patients. By analyzing symptom data and identifying patterns, the project can help healthcare professionals diagnose and treat patients more accurately, leading to improved health outcomes.",
    image: rsPredictionOfDiseases,
    projectLink: null,
    sourceCode: null,
  },
  {
    id: 5,
    title: "Weather forecasting app (iOS & Android)",
    description:
      "Weather forecasting app that provides real-time weather information for a specific location or region using data from weather stations, satellites, and other sources. Users can access up-to-date Weather forecasts. With this app, users can stay informed and plan their activities based on the latest weather conditions.",
    image: rsWeatherForecast,
    projectLink: null,
    sourceCode:
      "https://github.com/RittikSoni/Android-iOS/tree/main/weather%20forecast%20app",
  },
  {
    id: 6,
    title: "Pegasus Messenger (Web, iOS & Android)",
    description:
      "Messaging app that enables users to send and receive text messages. It provides an easy and efficient way to stay connected with friends, family, and colleagues, allowing users to communicate in real-time and exchange information quickly. With features such as message history, and notifications, this messaging app offers a convenient way to stay connected with others from anywhere, at any time.",
    image: rsMessengerPegasus,
    projectLink: null,
    sourceCode: null,
  },
  {
    id: 7,
    title: "Doc (Web, iOS & Android)",
    description:
      "An app that allows users to view their medical reports such as X-ray, MRI, and doctor's prescriptions. It requires internet connectivity and login credentials for security. Doctors can also add new reports to specific patients' records. The app provides a secure and efficient way to manage medical records conveniently from mobile devices.",
    image: rsDoc,
    projectLink: null,
    sourceCode: null,
  },
];
