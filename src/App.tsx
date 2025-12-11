import { useEffect } from "react";
import JokerMaker from "./components/JokerMaker";
import { useState } from "react";

export default function App() {

  let bg = ChooseRandomBackground();
  const [bgPath, setBgPath] = useState(bg);


  return (
    <div
      id="app"
      className="body-text flex flex-col items-center gap-5 md:gap-0 justify-around h-full md:h-dvh w-full bg-cover bg-center bg-repeat-y "
      style={{backgroundImage: `url('${bgPath == "" ? "/bg1.webp" : bgPath}')`}}
    >
      <h1 className="body-text pt-5 text-4xl md:pt-0 sm:text-6xl md:text-7xl lg:text-8xl tracking-wider letter-outline">Balatro Joker Maker</h1>
      <JokerMaker />
      <footer className="flex flex-row gap-5 pb-8 px-4 md:px-0 md:pb-0">
        <button
          id="crtButton"
          className="cursor-pointer px-2 py-1 text-xl md:text-2xl pbbo blue small"
          onClick={() => {
            const el = document.getElementById("app");
            const thisButton = document.getElementById('crtButton');
            if (el == null || thisButton == null) return; // guard clause
            if (el.classList.contains("crt")) {
              el.classList.remove("crt");
              thisButton.innerText = "Enable CRT";
            } else {
              el.classList.add("crt");
              thisButton.innerText = "Disable CRT";
            }
          }}
        >
          Enable CRT
        </button>

        <a target="_blank" href="https://github.com/m-GDEV/balatro-joker-maker/issues" className=" pbbo red clicky small text-xl md:text-2xl px-3">Feedback</a>
        <a target="_blank" href="https://github.com/m-GDEV/balatro-joker-maker" className="cursor-pointer pbbo green small clicky text-xl md:text-2xl px-3">Source Code</a>
      </footer>
    </div>
  );

function ChooseRandomBackground() {
  const numberOfBackgrounds = 3;
  const el = document.getElementById('app')
  let bgNum = Math.floor(Math.random() * (numberOfBackgrounds)) + 1;

  // console.log(bgNum)

  return `/bg${bgNum}.webp`;
}
}
