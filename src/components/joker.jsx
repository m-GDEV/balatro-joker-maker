export default function Joker({ isBig, jokerName }) {
  if (isBig) {
    return (
      <div className="flex flex-col gap-10">
        <div className="h-[25rem] w-[19rem] bg-white rounded flex flex-row p-3 pixel-corners relative">
          <div className="absolute top-0 left-0 h-full w-full z-10 rounded thing"></div>
          <JokerCardSideText isInverted={false} />
          <div className="w-full h-full">
            <img src="/sj2.jpg" className="w-4/5 mx-auto" />
          </div>
          <JokerCardSideText isInverted={true} />
        </div>

        <div className="flex flex-col items-center bg-[#3f4a4d] w-full rounded py-3 px-2 pixel-corners white">
          <span className="text-white text-5xl">Razor</span>
          <div className="bg-white pixel-corners rounded text-[#3d5458] w-full text-center text-3xl">
            <span className="rounded pl-1 pt-1 bg-red-500 text-white">X3</span>{" "}
            Mult
            <br />
            Destroy this if played
            <br />
            hand contains any
            <br />
            cards that don't score
            <br />
          </div>
          <div className="pixel-corners w-3/4">
            <div className="bg-[#34bc85] pixel-corners px-3 rounded text-center mt-2">
              <span className="text-white text-4xl text-shadow-lg">
                Uncommon
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>pnies!</div>;
  }
}

function JokerCardSideText({ isInverted }) {
  if (isInverted) {
    return (
      <div
        className="flex flex-col items-start"
        style={{ transform: "rotate(180deg) scaleX(-1)" }}
      >
        <JokerText />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-start">
        <JokerText />
      </div>
    );
  }
}

function JokerText() {
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
