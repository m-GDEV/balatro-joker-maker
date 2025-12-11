import { GAButtonTypes } from "../types/MainTypes";
import { GAButtonClick } from "../lib/helperFunctions";

export default function AppFooter() {
  return (
    <footer className="flex flex-row gap-5 pb-8 px-4 md:px-0 md:pb-4 items-center justify-center flex-wrap">
      {/* Fun Features */}
      <button
        id="crtButton"
        className="cursor-pointer px-3 py-1 text-xl md:text-2xl pbbo blue small"
        onClick={() => {
          const el = document.getElementById("app");
          const thisButton = document.getElementById("crtButton");
          if (el == null || thisButton == null) return; // guard clause
          if (el.classList.contains("crt")) {
            el.classList.remove("crt");
            thisButton.innerText = "Enable CRT";
          } else {
            el.classList.add("crt");
            thisButton.innerText = "Disable CRT";
          }

          GAButtonClick(GAButtonTypes.CRT);
        }}
      >
        Enable CRT
      </button>

      <button
        className="text-white pbbo purple clicky small text-xl md:text-2xl px-3 py-1"
        onClick={() => {
          let el = document.getElementById("audio") as HTMLAudioElement;
          let buttonEl = document.activeElement as HTMLButtonElement;
          if (buttonEl.innerText.toLocaleLowerCase().includes("pause")) {
            el.pause();
            buttonEl.innerText = "Play Theme Music";
          } else {
            el.play();
            buttonEl.innerText = "Pause Theme Music";
          }

          GAButtonClick(GAButtonTypes.Music);
        }}
      >
        Play Theme Music
      </button>
      <audio src="/audio/balatro-main-theme.mp3" id="audio" loop></audio>

      {/* Feedback, source code */}
      <a
        target="_blank"
        href="https://github.com/m-GDEV/balatro-joker-maker/issues"
        className=" pbbo red clicky small text-xl md:text-2xl px-3 py-1"
        onClick={() => {
          GAButtonClick(GAButtonTypes.Feedback);
        }}
      >
        Feedback
      </a>
      <a
        target="_blank"
        href="https://github.com/m-GDEV/balatro-joker-maker"
        className="cursor-pointer pbbo green small clicky text-xl md:text-2xl px-3 py-1"
        onClick={() => {
          GAButtonClick(GAButtonTypes.Source);
        }}
      >
        Source Code
      </a>
    </footer>
  );
}
