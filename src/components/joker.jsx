import { useEffect } from "react";

export default function Joker({ jokerInfo }) {
  if (!jokerInfo.isSmall) {
    return (
      <div className={`flex flex-col gap-10 bg-[url(/bg.webp)] bg-cover bg-center bg-repeat-y p-4 rounded-xl drop-shadow-2xl`} id="JokerDiv">
        <div
          className={`h-[25rem] w-[19rem] rounded flex flex-row p-3 pixel-corners bg-white relative ${
            jokerInfo.overlay == "negative-overlay" ? "negative-overlay" : ""
          }`}
        >
          <div className={`absolute top-0 left-0 h-full w-full z-10 rounded ${jokerInfo.overlay}`}></div>
          <div className="flex flex-row w-full">
            <JokerCardSideText isInverted={false} isDisabled={jokerInfo.jokerTextDisabled} />
            <div className="flex items-center px-2 w-full justify-center ">
              <img src={`${jokerInfo.mainImage}`} className="" />
            </div>
            <JokerCardSideText isInverted={true} isDisabled={jokerInfo.jokerTextDisabled} />
          </div>
        </div>

        <div className="flex flex-col items-center bg-[#3f4a4d] w-full rounded py-3 px-2 pixel-corners" id="Test">
          <span className="text-white text-5xl">{jokerInfo.name != "" ? jokerInfo.name : "Joker"}</span>
          <div className="bg-white pixel-corners rounded text-[#3d5458] w-full text-center text-3xl">
            {jokerInfo.desc}
          </div>
          <div className="pixel-corners w-3/4">
            <div className="bg-[#34bc85] pixel-corners px-3 rounded text-center mt-2">
              <span className="text-white text-4xl text-shadow-lg">{jokerInfo.rarity}</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>pnies!</div>;
  }
}

function JokerCardSideText({ isInverted, isDisabled }) {
  if (isInverted) {
    return (
      <div className="flex flex-col items-start" style={{ transform: "rotate(180deg) scaleX(-1)" }}>
        <JokerText isDisabled={isDisabled} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-start">
        <JokerText isDisabled={isDisabled} />
      </div>
    );
  }
}

function JokerText({ isDisabled }) {
  if (isDisabled) {
    return <span className="joker-text !text-transparent">K</span>;
  } else {
    return (
      <>
        <span className="joker-text">J</span>
        <span className="joker-text">O</span>
        <span className="joker-text">K</span>
        <span className="joker-text">E</span>
        <span className="joker-text">R</span>
      </>
    );
  }
}
