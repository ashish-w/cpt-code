// import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/bootstrap.min.css";
import "../styles/font-poppins.css";
import "../styles/globals.css";
import "../styles/navbar.css";

// import '../styles/custom-antd.css';
import "../styles/globals_old.css";

import "react-lazy-load-image-component/src/effects/blur.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import WeatherBar from "components/WeatherBar/WeatherBar";
import WhatsAppButton from "components/whatsAppButton/whatsAppButton";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="#88bc2c"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
      />

      <WhatsAppButton/>

      <Component {...pageProps} />
    </>
  );
}
