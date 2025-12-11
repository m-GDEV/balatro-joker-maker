import { useEffect } from "react";
import JokerMaker from "./components/JokerMaker";
import { useState } from "react";
import ReactGA from "react-ga4";
import { GAButtonClick } from "./lib/helperFunctions";
import { GAButtonTypes } from "./types/MainTypes";
import AppFooter from "./components/AppFooter";
import { appVersion } from "./types/Constants";

export default function App() {
  const [bgPath, setBgPath] = useState("");

  useEffect(() => {
    ReactGA.initialize("G-CTQM7XWLQC");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    ChooseRandomBackground();
    console.log(`Version: ${appVersion}`);
  }, []);

  return (
    <div
      id="app"
      className="body-text flex flex-col items-center gap-5 md:gap-0 justify-around h-full md:h-dvh w-full bg-cover bg-center bg-repeat-y "
      style={{ backgroundImage: `url('${bgPath == "" ? "/images/bg1.webp" : bgPath}')` }}
    >
      <h1 className="body-text pt-5 text-4xl md:pt-0 sm:text-6xl md:text-7xl lg:text-8xl tracking-wider letter-outline underline md:no-underline">
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
