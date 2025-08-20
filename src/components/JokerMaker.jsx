import { useState, useEffect } from "react";
import { captureImage, getImageDataUrl, MVRC } from "../lib/helperFunctions";
import Joker from "./Joker";
import TextInput from "./TextInput";
import LabelAndSomething from "./LabelAndSomething";
import TextAreaInput from "./TextAreaInput";

export default function JokerMaker() {
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
    backgroundImage: "",
    backgroundImageCover: false,
    jokerTextInverted: false,
    overlay: overlayOptions[0].value,
    jokerTextDisabled: false,
    isSmall: false,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const url = new URL(window.location);
    const info = url.searchParams.get("jokerInfo");
    if (info != undefined) {
      setJokerInfo(JSON.parse(info));
    }
    setReady(true);
  }, []);

  useEffect(() => {
    // This is necessary because this function will try to replace the url query with the default object
    if (ready == false) {
      return;
    }

    // Check if image blob is valid
    // (image blob expires after page load so we want to replace it with a default img if it doesn't work)
    // let img = new Image();
    // img.onerror = () => setJokerInfo(MVRC(jokerInfo, "mainImage", "/sj2.jpg", true));
    // img.src = jokerInfo.mainImage;

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
    <div className="body-text  flex flex-col justify-center gap-15 sm:flex-row">
      {/* Edit Joker Details Form */}
      <div className="flex flex-col gap-2 max-w-[23rem] text-center bg-[#3f4a4d] p-5 rounded-xl">
        <h2 className="text-5xl pb-4">Create your custom Joker!</h2>
        <TextInput label={"Name:"} value={jokerInfo.name} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "name", e.target.value))} />
        <TextInput label={"Rarity:"} value={jokerInfo.rarity} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "rarity", e.target.value))} />
        <TextAreaInput label={"Description:"} value={jokerInfo.desc} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "desc", e.target.value))} />
        <LabelAndSomething label={"Main Image:"}>
          <div className="flex items-center gap-3">
            <label className="inline-block rounded bg-gray-600 px-2 py-1 cursor-pointer text-white w-full pixel-corners white">
              <span>Open</span>
              <input
                className="top-0 left-0 absolute opacity-0"
                type="file"
                onChange={(e) => setJokerInfo(MVRC(jokerInfo, "mainImage", event.target.files[0]))}
              />
            </label>
            <button
              className="pixel-corners white balatro-red px-2 py-1"
              onClick={() => setJokerInfo(MVRC(jokerInfo, "mainImage", "", true))}
            >
              X
            </button>
          </div>
        </LabelAndSomething>
        <LabelAndSomething label={"Bg Image:"}>
          <div className="flex items-center gap-3">
            <label className="inline-block rounded bg-gray-600 px-2 py-1 cursor-pointer text-white w-full pixel-corners white">
              <span>Open</span>
              <input
                className="top-0 left-0 absolute opacity-0"
                type="file"
                onChange={(e) => setJokerInfo(MVRC(jokerInfo, "backgroundImage", event.target.files[0]))}
              />
            </label>
            <button
              className="pixel-corners white balatro-red px-2 py-1"
              onClick={() => setJokerInfo(MVRC(jokerInfo, "backgroundImage", "", true))}
            >
              X
            </button>
          </div>
        </LabelAndSomething>
        <LabelAndSomething label={"Bg Image Stretched"}>
          <input
            className="p-3 pixel-corners self-end"
            type="checkbox"
            checked={jokerInfo.backgroundImageCover}
            onChange={(e) => setJokerInfo(MVRC(jokerInfo, "backgroundImageCover", !jokerInfo.backgroundImageCover, true))}
          />
        </LabelAndSomething>
        <LabelAndSomething label={"'Joker' Text Inverted"}>
          <input
            className="p-3 pixel-corners self-end"
            type="checkbox"
            checked={jokerInfo.jokerTextInverted}
            onChange={(e) => setJokerInfo(MVRC(jokerInfo, "jokerTextInverted", !jokerInfo.jokerTextInverted))}
          />
        </LabelAndSomething>
        <LabelAndSomething label={"Edition:"}>
          <select
            className="bg-white px-2 py-1 text-black rounded-sm w-full pixel-corners"
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
        <LabelAndSomething label={"Wee?"}>
          <input
            className="p-3 pixel-corners self-end"
            type="checkbox"
            checked={jokerInfo.isSmall}
            onChange={(e) => setJokerInfo(MVRC(jokerInfo, "isSmall", !jokerInfo.isSmall))}
          />
        </LabelAndSomething>
        <button className="text-white pbbo green clicky big w-full max-w-3/4 self-center" onClick={captureImage}>
          <span className="text-4xl">Save</span>
        </button>
        {navigator.share && true && (
          <button
            className="text-white pbbo blue clicky big w-full max-w-3/4 self-center"
            onClick={() => {
              navigator.share({
                title: document.title,
                files: [new File(
                  [jokerInfo.mainImage],
                  "joker-image.png",
                  { type: "image/png", lastModified: Date.now() }
                )],
              });
            }}
          >
            <span className="text-4xl">Share</span>
          </button>
        )}
      </div>

      {/* Joker side */}
      <Joker jokerInfo={jokerInfo} />
    </div>
  );
}
