import { useState } from "react";
import Joker from "./components/joker";
import { useEffect } from "react";
import TextInput from "./components/TextInput";
import LabelAndSomething from "./components/LabelAndSomething";
import { useRef } from "react";
import { captureElement } from "./lib/helperFunctions";
import JokerDebug from "./components/joker2";
import html2canvas from "html2canvas";

function App() {
  const overlayOptions = [
    { key: "None", value: "" },
    { key: "Polychrome", value: "polychrome-overlay" },
    { key: "Debuff", value: "debuff-overlay" },
    { key: "Holographic", value: "holographic-overlay" },
    { key: "Foil", value: "foil-overlay" },
    { key: "Stone", value: "stone-overlay" },
    { key: "Negative", value: "negative-overlay" },
  ];

  const [jokerInfo, setJokerInfo] = useState({
    name: "Joker",
    desc: "+4 Mult",
    rarity: "Uncommon",
    mainImage: "/sj2.webp",
    overlay: overlayOptions[0].value,
    jokerTextDisabled: false,
    isSmall: false,
  });



  const [ready, setReady] = useState(false);

  useEffect(() => {
    const url = new URL(window.location);
    const info = url.searchParams.get("jokerInfo");
    setJokerInfo(JSON.parse(info));
    setReady(true);
  }, []);

  useEffect(() => {
    // This is necessary because this function will try to replace the url query with the default object
    if (ready == false) {
      return;
    }

    // Check if image blob is valid
    // (image blob expires after page load so we want to replace it with a default img if it doesn't work)
    let img = new Image();
    img.onerror = () => setJokerInfo(MVRC(jokerInfo, "mainImage", "/sj2.jpg", true));
    img.src = jokerInfo.mainImage;

    // Save object value to query param
    const url = new URL(window.location);
    const jInfo = JSON.stringify(jokerInfo);
    const sp = url.searchParams.get("jokerInfo");

    if (sp !== jInfo) {
      url.searchParams.set("jokerInfo", jInfo);
      history.pushState(null, "", url);
    }
  }, [jokerInfo]);

  return (
    <div className="body-text bg-[url(/bg.webp)] h-dvh w-full bg-cover bg-center bg-repeat-y flex flex-row items-center justify-center gap-5">
      {/* Edit Joker Details Form */}
      <div className="flex flex-col gap-3 max-w-[20rem]">
        <TextInput label={"Name:"} value={jokerInfo.name} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "name", e.target.value))} />
        <TextInput label={"Rarity:"} value={jokerInfo.rarity} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "rarity", e.target.value))} />
        <TextInput label={"Description:"} value={jokerInfo.desc} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "desc", e.target.value))} />
        <LabelAndSomething label={"Image:"}>
          <label className="relative inline-block rounded bg-gray-600 px-2 py-1 cursor-pointer text-white w-full">
            <span>Choose a file</span>
            <input
              className="top-0 left-0 absolute opacity-0"
              type="file"
              onChange={(e) => setJokerInfo(MVRC(jokerInfo, "mainImage", event.target.files[0]))}
            />
          </label>
        </LabelAndSomething>
        <LabelAndSomething label={"Edition:"}>
          <select
            className="bg-white px-2 py-1 text-black rounded-sm w-full"
            value={jokerInfo.overlay}
            onChange={(e) => setJokerInfo(MVRC(jokerInfo, "overlay", e.target.value))}
          >
            {overlayOptions.map((option) => {
              return (
                <option key={option.key} value={option.value}>
                  {option.key}
                </option>
              );
            })}
          </select>
        </LabelAndSomething>
        <button
          className="px-2 py-1 text-4xl bg-[#34bc85] text-white rounded"
          onClick={() => PrintDiv(document.getElementById("JokerDiv"))}
        >
          Save
        </button>
        <button
          className="px-2 py-1 text-4xl bg-[#34bc85] text-white rounded"
          onClick={captureElement}
        >
          Save2
        </button>
          <button 
            onClick={captureElement}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Capture with html2canvas
          </button>
      </div>
      <Joker jokerInfo={jokerInfo} />
      {/* <JokerDebug jokerInfo={jokerInfo} /> */}
    </div>
  );
}

export default App;

// ModifyValueAndReturnCopy: Makes it easy to modify one property of the object in a setState call
function MVRC(obj, key, value, mainImageOverride = false) {
  let copy = structuredClone(obj);

  // If the value is an image, we need to encode it
  if (key == "mainImage" && !mainImageOverride) {
    copy[key] = URL.createObjectURL(value);
  } else {
    copy[key] = value;
  }
  return copy;
}
