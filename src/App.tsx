import { useEffect } from "react";
import JokerMaker from "./components/JokerMaker";
import { useState } from "react";

export default function App() {

  let bg = ChooseRandomBackground();
  const [bgPath, setBgPath] = useState(bg);


  return (
    <div
      id="app"
      className="body-text flex flex-col items-center justify-around h-dvh w-full bg-cover bg-center bg-repeat-y "
      style={{backgroundImage: `url('${bgPath == "" ? "/bg1.webp" : bgPath}')`}}
    >
      <h1 className="body-text text-8xl tracking-wider letter-outline">Balatro Joker Maker</h1>
      <JokerMaker />
      <div className="flex flex-row gap-10">
        <button
          id="crtButton"
          className="cursor-pointer px-2 py-1 bg-blue-500 text-2xl pixel-corners"
          onClick={() => {
            const el = document.getElementById("app");
            const thisButton = document.getElementById('crtButton');
            if (el == null || thisButton == null) return; // guard clause
            if (el.classList.contains("crt")) {
              el.classList.remove("crt");
              thisButton.innerText = "Disable CRT";
            } else {
              el.classList.add("crt");
              thisButton.innerText = "Enable CRT";
            }
          }}
        >
          Enable CRT
        </button>
      </div>
    </div>
  );

function ChooseRandomBackground() {
  const numberOfBackgrounds = 3;
  const el = document.getElementById('app')
  let bgNum = Math.floor(Math.random() * (numberOfBackgrounds)) + 1;

  console.log(bgNum)

  return `/bg${bgNum}.webp`;
}
}
