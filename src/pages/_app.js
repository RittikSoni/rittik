import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AmbientSound from "@/components/music/AmbientSound";

export default function App({ Component, pageProps }) {
  return (
    <>
      {" "}
      <AmbientSound />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
