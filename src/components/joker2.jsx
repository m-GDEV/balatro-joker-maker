import { useEffect, useState } from "react";

export default function JokerDebug() {
  // Sample data for testing
  const [jokerInfo, setJokerInfo] = useState({
    isSmall: false,
    overlay: "",
    jokerTextDisabled: false,
    mainImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Sm9rZXI8L3RleHQ+PC9zdmc+",
    name: "Test Joker",
    desc: "This is a test description that should appear in the capture",
    rarity: "RARE"
  });

  const [debugMode, setDebugMode] = useState(1);

  const captureElement = async () => {
    if (typeof window !== 'undefined' && window.html2canvas) {
      const element = document.getElementById("JokerDiv");
      if (element) {
        try {
          // Add delay to ensure full rendering
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const canvas = await window.html2canvas(element, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            scale: 2,
            logging: true,
            onclone: (clonedDoc) => {
              console.log('Cloned document for capture');
            }
          });
          
          const link = document.createElement('a');
          link.download = 'joker-capture.png';
          link.href = canvas.toDataURL();
          link.click();
        } catch (error) {
          console.error('Capture failed:', error);
        }
      }
    }
  };

  // Load html2canvas if not available
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.html2canvas) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      document.head.appendChild(script);
    }
  }, []);

  const debugModes = {
    1: "Original with fixes",
    2: "Forced backgrounds",
    3: "Static content only",
    4: "Simplified styling",
    5: "Minimal version"
  };

  if (!jokerInfo.isSmall) {
    return (
      <div className="p-4">
        <div className="mb-4 flex gap-2 flex-wrap">
          <button 
            onClick={captureElement}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Capture with html2canvas
          </button>
          {Object.entries(debugModes).map(([mode, label]) => (
            <button
              key={mode}
              onClick={() => setDebugMode(parseInt(mode))}
              className={`px-3 py-1 rounded text-sm ${
                debugMode === parseInt(mode) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {mode}: {label}
            </button>
          ))}
        </div>
        
        <div className="mb-2 text-sm text-gray-600">
          Current mode: {debugModes[debugMode]}
        </div>

        {/* Debug Mode 1: Original with basic fixes */}
        {debugMode === 1 && (
          <div className={`flex flex-col gap-10`} id="JokerDiv">
            <div className={`h-[25rem] w-[19rem] rounded flex flex-row p-3 bg-white relative ${
              jokerInfo.overlay === "negative-overlay" ? "negative-overlay" : ""
            }`}>
              <div className={`absolute top-0 left-0 h-full w-full z-10 rounded ${jokerInfo.overlay}`}></div>
              <div className="flex flex-row w-full">
                <JokerCardSideText isInverted={false} isDisabled={jokerInfo.jokerTextDisabled} />
                <div className="flex items-center px-2 w-full justify-center">
                  <img src={jokerInfo.mainImage} className="max-w-full max-h-full" alt="Joker" />
                </div>
                <JokerCardSideText isInverted={true} isDisabled={jokerInfo.jokerTextDisabled} />
              </div>
            </div>
            <div className="flex flex-col items-center bg-[#3f4a4d] w-full rounded py-3 px-2">
              <span className="text-white text-5xl font-bold">
                {jokerInfo.name !== "" ? jokerInfo.name : "Joker"}
              </span>
              <div className="bg-white rounded text-[#3d5458] w-full text-center text-3xl p-4 mt-2">
                {jokerInfo.desc}
              </div>
              <div className="w-3/4 mt-2">
                <div className="bg-[#34bc85] px-3 rounded text-center">
                  <span className="text-white text-4xl font-bold">{jokerInfo.rarity}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Mode 2: Forced visible backgrounds */}
        {debugMode === 2 && (
          <div className={`flex flex-col gap-10`} id="JokerDiv">
            <div className="h-[25rem] w-[19rem] rounded flex flex-row p-3 bg-red-200 relative border-2 border-red-500">
              <div className="flex flex-row w-full">
                <JokerCardSideText isInverted={false} isDisabled={jokerInfo.jokerTextDisabled} />
                <div className="flex items-center px-2 w-full justify-center bg-blue-100">
                  <img src={jokerInfo.mainImage} className="max-w-full max-h-full" alt="Joker" />
                </div>
                <JokerCardSideText isInverted={true} isDisabled={jokerInfo.jokerTextDisabled} />
              </div>
            </div>
            <div className="flex flex-col items-center bg-yellow-300 w-full rounded py-3 px-2 border-2 border-yellow-600">
              <span className="text-black text-5xl font-bold bg-green-200 px-2">
                {jokerInfo.name !== "" ? jokerInfo.name : "Joker"}
              </span>
              <div className="bg-pink-200 rounded text-black w-full text-center text-3xl p-4 mt-2 border-2 border-pink-500">
                {jokerInfo.desc}
              </div>
              <div className="w-3/4 mt-2">
                <div className="bg-purple-300 px-3 rounded text-center border-2 border-purple-600">
                  <span className="text-black text-4xl font-bold">{jokerInfo.rarity}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Mode 3: Static content only */}
        {debugMode === 3 && (
          <div className={`flex flex-col gap-10`} id="JokerDiv">
            <div className="h-[25rem] w-[19rem] rounded flex flex-row p-3 bg-white relative">
              <div className="flex flex-row w-full">
                <div className="flex flex-col items-start">
                  <span className="text-2xl font-bold text-black">J</span>
                  <span className="text-2xl font-bold text-black">O</span>
                  <span className="text-2xl font-bold text-black">K</span>
                  <span className="text-2xl font-bold text-black">E</span>
                  <span className="text-2xl font-bold text-black">R</span>
                </div>
                <div className="flex items-center px-2 w-full justify-center">
                  <div className="w-20 h-20 bg-gray-400 rounded flex items-center justify-center">
                    <span className="text-white">IMG</span>
                  </div>
                </div>
                <div className="flex flex-col items-start" style={{ transform: "rotate(180deg) scaleX(-1)" }}>
                  <span className="text-2xl font-bold text-black">J</span>
                  <span className="text-2xl font-bold text-black">O</span>
                  <span className="text-2xl font-bold text-black">K</span>
                  <span className="text-2xl font-bold text-black">E</span>
                  <span className="text-2xl font-bold text-black">R</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center bg-gray-600 w-full rounded py-3 px-2">
              <span className="text-white text-5xl font-bold">Static Joker Name</span>
              <div className="bg-white rounded text-gray-800 w-full text-center text-3xl p-4 mt-2">
                This is static description text that should always be visible
              </div>
              <div className="w-3/4 mt-2">
                <div className="bg-green-600 px-3 rounded text-center">
                  <span className="text-white text-4xl font-bold">COMMON</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Mode 4: Simplified styling */}
        {debugMode === 4 && (
          <div className="flex flex-col gap-4" id="JokerDiv">
            <div className="h-80 w-72 border-2 border-gray-400 flex flex-row p-3 bg-white">
              <div className="flex flex-row w-full">
                <div className="flex flex-col text-xl font-bold text-black">
                  <span>J</span><span>O</span><span>K</span><span>E</span><span>R</span>
                </div>
                <div className="flex items-center px-2 w-full justify-center">
                  <img src={jokerInfo.mainImage} className="max-w-full max-h-full" alt="Joker" />
                </div>
                <div className="flex flex-col text-xl font-bold text-black">
                  <span>R</span><span>E</span><span>K</span><span>O</span><span>J</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center bg-gray-700 w-full border-2 border-gray-400 py-3 px-2">
              <h2 className="text-white text-4xl font-bold mb-2">
                {jokerInfo.name || "Joker"}
              </h2>
              <div className="bg-white border-2 border-gray-400 text-black w-full text-center text-2xl p-4">
                {jokerInfo.desc}
              </div>
              <div className="w-3/4 mt-2">
                <div className="bg-green-600 border-2 border-green-800 px-3 text-center">
                  <span className="text-white text-3xl font-bold">{jokerInfo.rarity}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Mode 5: Minimal version */}
        {debugMode === 5 && (
          <div className="border-4 border-red-500 p-4 bg-white" id="JokerDiv">
            <div className="border-2 border-blue-500 p-4 mb-4 bg-gray-100">
              <h1 className="text-2xl font-bold text-black">Card Top Section</h1>
              <p className="text-black">This should always be visible</p>
            </div>
            <div className="border-2 border-green-500 p-4 bg-yellow-100">
              <h2 className="text-xl font-bold text-black">Card Bottom Section</h2>
              <p className="text-black">Name: {jokerInfo.name || "Test"}</p>
              <p className="text-black">Desc: {jokerInfo.desc}</p>
              <p className="text-black">Rarity: {jokerInfo.rarity}</p>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <h3 className="font-bold">Debugging Instructions:</h3>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Start with Mode 5 (minimal) - if this works, the issue is styling-related</li>
            <li>Try Mode 2 (forced backgrounds) - this reveals invisible content</li>
            <li>Try Mode 3 (static content) - this tests if dynamic content is the issue</li>
            <li>Try Mode 4 (simplified) - this removes complex CSS features</li>
            <li>Finally try Mode 1 (original with fixes) for the real solution</li>
          </ol>
        </div>
      </div>
    );
  } else {
    return <div>Small version!</div>;
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
    return <span className="text-2xl font-bold text-transparent">K</span>;
  } else {
    return (
      <>
        <span className="text-2xl font-bold text-black">J</span>
        <span className="text-2xl font-bold text-black">O</span>
        <span className="text-2xl font-bold text-black">K</span>
        <span className="text-2xl font-bold text-black">E</span>
        <span className="text-2xl font-bold text-black">R</span>
      </>
    );
  }
}