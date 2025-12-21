import { useEffect } from "react";
import JokerMaker from "./components/JokerMaker";
import { useState } from "react";
import ReactGA from "react-ga4";
import isDev, { GAButtonClick } from "./lib/helperFunctions";
import { GAButtonTypes } from "./types/MainTypes";
import AppFooter from "./components/AppFooter";
import { appVersion } from "./types/Constants";

export default function App() {
  const [bgPath, setBgPath] = useState("");

  useEffect(() => {
    // Only use google analytics in production
    if (!isDev()) {
      ReactGA.initialize("G-CTQM7XWLQC", { testMode: true });
    } else {
      ReactGA.initialize("G-CTQM7XWLQC");
    }
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    ChooseRandomBackground();
    console.log(`Version: ${appVersion}`);
    console.log(`Environment: ` + (isDev() ? "Development" : "Production"));
  }, []);

  return (
    <div
      id="app"
      className="body-text flex flex-col items-center gap-5 md:gap-0 justify-around h-full md:h-dvh w-full bg-cover bg-center bg-repeat-y "
      style={{ backgroundImage: `url('${bgPath == "" ? "/images/bg1.webp" : bgPath}')` }}
    >
      <h1 className="body-text text-4xl md:pt-0 sm:text-6xl md:text-7xl lg:text-8xl underline md:no-underline bg-[#ab5bb5] pixel-corners px-4 ">
        Balatro Joker Maker
      </h1>
      <JokerMaker />
      <AppFooter />
    </div>
  );

  function ChooseRandomBackground() {
    const numberOfBackgrounds = 3;
    let bgNum = Math.floor(Math.random() * numberOfBackgrounds) + 1;
    setBgPath(`/images/bg${bgNum}.webp`);
  }
}
