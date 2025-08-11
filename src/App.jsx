import JokerMaker from "./components/JokerMaker";

export default function App() {
  return (
    <div
      id="app"
      className="body-text flex flex-col items-center justify-around bg-[url(/bg.webp)] h-dvh w-full bg-cover bg-center bg-repeat-y crt"
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
            if (el.classList.contains("crt")) {
              el.classList.remove("crt");
              thisButton.innerText = "Enable CRT";
            } else {
              el.classList.add("crt");
              thisButton.innerText = "Disable CRT";
            }
          }}
        >
          Disable CRT
        </button>
      </div>
    </div>
  );
}
