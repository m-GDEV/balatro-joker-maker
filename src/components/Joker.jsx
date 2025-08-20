// Main component
export default function Joker({ jokerInfo }) {
  return (
    <div
      className={`flex flex-col gap-3 bg-[url(/bg.webp)] bg-cover bg-center bg-repeat-y p-4 rounded-xl drop-shadow-2xl w-[22rem] h-[47rem] items-center justify-evenly pixel-corners `}
      id="JokerDiv"
    >
      <div
        className={`rounded flex flex-row p-3 pixel-corners white relative bg-no-repeat bg-center
              ${jokerInfo.overlay == "negative-overlay" ? "negative-overlay" : ""}
             ${jokerInfo.isSmall ? "w-[11rem] h-[14.66rem]" : "h-[25rem] w-[19rem]"}
             ${jokerInfo.backgroundImage == "" ? "bg-white" : ""}
             ${jokerInfo.backgroundImageCover ? "bg-cover" : "bg-contain"}
            `}
        style={{ backgroundImage: `url('${jokerInfo.backgroundImage}')` }}
      >
        <div className={`absolute top-0 left-0 h-full w-full z-10 rounded ${jokerInfo.overlay}`}></div>
        <div className="flex flex-row w-full">
          <JokerCardSideText jokerInfo={jokerInfo} />
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
function JokerCardSideText({ jokerInfo, isInverted }) {
  return (
    <div
      className={`flex flex-col items-start ${jokerInfo.isSmall ? "text-[1.25rem]" : "text-[2rem] "}
        ${isInverted ? "rotate-180" : ""}
        ${jokerInfo.jokerTextInverted ? "text-white" : "text-[#4f6367] letter-outline"}
        `}
    >
      <JokerText isDisabled={jokerInfo.isDisabled} />
    </div>
  );
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
            <div className="bg-white pixel-corners rounded text-[black] w-full text-center text-3xl max-w-[17rem] max-h-[11.5rem] overflow-y-auto overflow-x-hidden p-1  ">
              {jokerInfo.desc.split(" ").map((word, index) => (
                <JokerDescriptionWord key={index} word={word} />
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

function JokerDescriptionWord({ word }) {
  return (
    <>
      <span
        className=
        {`
      ${word[0] == "X" && Number.isInteger(parseInt(word[1])) ? "text-white bg-[color:hsl(3.77,100%,62.55%)] p-0.5 rounded-sm" : ""}
    `}
      >{word}</span>
      <span> </span>
    </>
  );
}

// JS Functions
function GetRarityBgColor(rarity) {
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

function GetMappedColour(type) {
  switch (type.toLowerCase()) {
    case "mult":
      return "#ff4c40";
    case "chips":
      return "#0093ff";
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

function processDescription(desc) {
  newDesc = "";

}