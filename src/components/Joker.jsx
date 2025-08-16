
export default function Joker({ jokerInfo }) {
  return (
    <div
      className={`flex flex-col gap-10 bg-[url(/bg.webp)] bg-cover bg-center bg-repeat-y p-4 rounded-xl drop-shadow-2xl min-w-[21rem] min-h-[42rem] items-center justify-evenly`}
      id="JokerDiv"
    >
      <div
        className={`w-[11rem] h-[14.66rem] rounded flex flex-row p-3 pixel-corners white relative bg-contain bg-no-repeat bg-center
              ${jokerInfo.overlay == "negative-overlay" ? "negative-overlay" : ""}
             ${jokerInfo.isSmall ? "w-[11rem] h-[14.66rem]" : "h-[25rem] w-[19rem]"}
             ${jokerInfo.backgroundImage != "" ? `bg-[url('${jokerInfo.backgroundImage}')]` : "bg-white"}
            `}
            style={{backgroundImage: `url('${jokerInfo.backgroundImage}')`}}
      >
        <div className={`absolute top-0 left-0 h-full w-full z-10 rounded ${jokerInfo.overlay}`}></div>
        <div className="flex flex-row w-full">
          <JokerCardSideText isInverted={false} isDisabled={jokerInfo.jokerTextDisabled} isSmall={jokerInfo.isSmall} />
          <div className="flex items-center px-2 w-full justify-center ">
            <img src={`${jokerInfo.mainImage}`} className="" />
          </div>
          <JokerCardSideText isInverted={true} isDisabled={jokerInfo.jokerTextDisabled} isSmall={jokerInfo.isSmall} />
        </div>
      </div>

      <JokerDescription jokerInfo={jokerInfo} />
    </div>
  );
}

function JokerCardSideText({ isInverted, isDisabled, isSmall }) {
  if (isInverted) {
    return (
      <div className={`flex flex-col items-start ${isSmall ? "text-[1.25rem]" : "text-[2rem]"}`} style={{ transform: "rotate(180deg) scaleX(-1)" }}>
        <JokerText isDisabled={isDisabled} />
      </div>
    );
  } else {
    return (
      <div className={`flex flex-col items-start ${isSmall ? "text-[1.25rem]" : "text-[2rem]"}`}>
        <JokerText isDisabled={isDisabled} />
      </div>
    );
  }
}

function JokerDescription({ jokerInfo }) {
  {
    /* This basically hides each individual component if it is not populated. Easily allows you to only show the joker card*/
  }
  return (
    <>
      {(jokerInfo.name != "" || jokerInfo.desc != "" || jokerInfo.rarity != "") && (
        <div className="flex flex-col gap-3 items-center bg-[#3f4a4d] w-full rounded py-3 px-2 white pixel-corners" id="Test">
          {jokerInfo.name != "" && <span className="text-white text-5xl">{jokerInfo.name != "" ? jokerInfo.name : "Joker"}</span>}
          {jokerInfo.desc != "" && (
            <div className="bg-white pixel-corners rounded text-[#3d5458] w-full text-center text-3xl">{jokerInfo.desc}</div>
          )}
          <div className="w-3/4">
            {jokerInfo.rarity != "" && (
              <div className={`${GetRarityBgColor(jokerInfo.rarity)} text-center pbbo green big`}>
                <span className="text-white text-4xl ">{jokerInfo.rarity}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
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

function GetRarityBgColor(rarity) {
  switch (rarity.toLowerCase()) {
    case "common":
      return "bg-[#0093ff]"
    case "uncommon":
      return "bg-[#35bd86]"
    case "rare":
      return "bg-[#ff4c40]"
    case "legendary":
      return "bg-[#ab5bb5]"
    default:
      return "bg-[#0093ff]" // common colour
  }
}
