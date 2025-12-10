import { JokerInfoType } from "../types/MainTypes";
import { invertColor } from "../lib/helperFunctions";

// Main component
export default function Joker({ jokerInfo }: { jokerInfo: JokerInfoType }) {
  return (
    <div
      className={`flex flex-col gap-3 bg-[url(/bg.webp)] bg-cover bg-center bg-repeat-y p-4 rounded-xl drop-shadow-2xl w-[22rem] h-full items-center justify-evenly pixel-corners `}
      id="JokerDiv"
    >
      <div
        className={`rounded flex flex-row p-3 pixel-corners white relative bg-no-repeat bg-center
              ${jokerInfo.overlay.value == "negative-overlay" ? "negative-overlay" : ""}
             ${jokerInfo.isSmall ? "w-[11rem] h-[14.66rem]" : "h-[25rem] w-[19rem]"}
             ${jokerInfo.backgroundImage == "" ? "bg-white" : `bg-[${jokerInfo.backgroundColor}]`}
             ${jokerInfo.backgroundImageCover ? "bg-cover" : "bg-contain"}
            `}
        style={{ backgroundImage: `url('${jokerInfo.backgroundImage}')`, backgroundColor: jokerInfo.backgroundColor }}
      >
        <div className={`absolute top-0 left-0 h-full w-full z-10 rounded ${jokerInfo.overlay.value}`}></div>
        <div className="flex flex-row w-full">
          <JokerCardSideText jokerInfo={jokerInfo} isInverted={false} />
          <div className="flex items-center px-2 w-full justify-center ">
            {jokerInfo.mainImage != "" && <img src={`${jokerInfo.mainImage}`} className="" />}
          </div>
          <JokerCardSideText jokerInfo={jokerInfo} isInverted={true} />
        </div>
      </div>

      <JokerDescription jokerInfo={jokerInfo} />
    </div>
  );
}

// Other JSX Functions
function JokerCardSideText({ jokerInfo, isInverted }: { jokerInfo: JokerInfoType; isInverted?: boolean }) {
  return (
    // ${isInverted ? "rotate-180" : ""}
    // ${jokerInfo.jokerTextInverted ? ` ${invertColor(jokerInfo.jokerTextColor)} letter-outline-grey` : `text-[${jokerInfo.jokerTextColor}] letter-outline-white`}
    <div
      className={`flex flex-col items-start ${jokerInfo.isSmall ? "text-[1.25rem]" : "text-[2rem] "} text-[${jokerInfo.jokerTextColor}]
    ${isInverted ? "rotate-180" : ""}
    ${jokerInfo.jokerTextDisabled ? "" : jokerInfo.jokerTextInverted ? ` letter-outline-grey` : `letter-outline-white`}
      
      `}
      style={{ color: jokerInfo.jokerTextInverted ? invertColor(jokerInfo.jokerTextColor) : jokerInfo.jokerTextColor }}
    >
      <JokerText isDisabled={jokerInfo.jokerTextDisabled} />
    </div>
  );
}

function JokerDescription({ jokerInfo }: { jokerInfo: JokerInfoType }) {
  {
    /* This basically hides each individual component if it is not populated. Easily allows you to only show the joker card*/
  }
  return (
    <>
      {(jokerInfo.name != "" || jokerInfo.desc != "" || jokerInfo.rarity != "") && (
        <div className="flex flex-col gap-3 items-center bg-[#3f4a4d] w-full rounded py-3 px-2 white pixel-corners" id="Test">
          {jokerInfo.name != "" && <span className="text-white text-5xl">{jokerInfo.name != "" ? jokerInfo.name : "Joker"}</span>}
          {jokerInfo.desc != "" && (
            <div className="bg-white pixel-corners rounded text-[black] w-full text-center text-3xl   p-1  ">
              {jokerInfo.desc.split(" ").map((word: string, index: number) => (
                <JokerDescriptionWord key={index} word={word} fullDesc={jokerInfo.desc} />
              ))}
            </div>
          )}
          <div className="w-3/4">
            {jokerInfo.rarity != "" && (
              <div className={`${GetRarityBgColor(jokerInfo.rarity)} text-center pbbo big`}>
                <span className="text-white text-4xl ">{jokerInfo.rarity}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function JokerText({ isDisabled }: { isDisabled?: boolean }) {
  if (isDisabled) {
    return <span className="joker-text text-transparent">K</span>;
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

function JokerDescriptionWord({ word, fullDesc }: { word: string; fullDesc: string }) {
  const xMult: boolean = (word[0] == "X" || word[0] == "x") && Number.isInteger(parseInt(word[1]));
  const mult : boolean = (word[0] == "+" || word[0] == "-") && Number.isInteger(parseInt(word[1])) && fullDesc.toLocaleLowerCase().includes("mult");
  const chips: boolean = (word[0] == "+" || word[0] == "-") && Number.isInteger(parseInt(word[1])) && fullDesc.toLocaleLowerCase().includes("chips");
  const money : boolean = (word[0] == "$" || word[0] == "-") && Number.isInteger(parseInt(word[1]));

  // console.log(word, xMult, mult, chips);
  return (
    <>
      <span
        className={`
      ${xMult ? "text-white bg-[color:hsl(3.77,100%,62.55%)] p-0.5 rounded-sm" : ""}
      ${mult ? "text-[color:hsl(3.77,100%,62.55%)] p-0.5 rounded-sm" : ""}
      ${chips ? "text-[#0394FC] p-0.5 rounded-sm" : ""}
      ${money ? "text-[#f5b244] p-0.5 rounded-sm" : ""}
    `}
        style={{ color: GetMappedColour(word.toLowerCase()) }}
      >
        {word}
      </span>
      <span> </span>
    </>
  );
}

// JS Functions
function GetRarityBgColor(rarity: string) {
  switch (rarity.toLowerCase()) {
    case "common":
      return "blue";
    case "uncommon":
      return "green";
    case "rare":
      return "red";
    case "legendary":
      return "purple";
    default:
      return "blue"; // common colour
  }
}

function GetMappedColour(type: string): string {
  switch (type.toLowerCase()) {
    // case "mult":
    //   return "#ff4c40";
    // case "chips":
    //   return "#0093ff";
    case "tarot":
      return "#7b559c";
    case "econ":
      return "#35bd86";
    case "chance":
      return "#35bd86";
    case "money":
      return "#f5b244";
    case "diamonds":
      return "#f15a27";
    case "hearts":
      return "#f11b52";
    case "spades":
      return "#292189";
    case "clubs":
      return "#074540";

    case "handType":
      return "#ff8f00";
    case "keyword":
      return "#ff8f00";

    default:
      return "";
  }
}
