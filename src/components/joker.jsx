export default function Joker({ isBig, jokerName }) {
  if (isBig) {
    return (
      <div className="h-[25rem] w-[19rem] bg-white rounded flex flex-row p-3">
        <JokerCardSideText isInverted={false} />
        <div className="w-full">
            heloo!
        </div>
        <JokerCardSideText isInverted={true} />
      </div>
    );
  } else {
    return <div>pnies!</div>;
  }
}

function JokerCardSideText({ isInverted }) {
  if (isInverted) {
    return (
      <div className="flex flex-col items-start" style={{transform: 'rotate(180deg) scaleX(-1)'}}>
        <span className="joker-text">J</span>
        <span className="joker-text">O</span>
        <span className="joker-text">K</span>
        <span className="joker-text">E</span>
        <span className="joker-text">R</span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-start">
        <span className="joker-text">J</span>
        <span className="joker-text">O</span>
        <span className="joker-text">K</span>
        <span className="joker-text">E</span>
        <span className="joker-text">R</span>
      </div>
    );
  }
}
