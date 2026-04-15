import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AmbientSound from "@/components/music/AmbientSound";
import { useEffect } from "react";
import Clarity from '@microsoft/clarity';
import { ThemeProvider } from "@/context/ThemeContext";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // initialize Clarity
    Clarity.init("tksamrpthg");
  }, []);

  return (
    <ThemeProvider>
      <AmbientSound />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
