import { useState, useEffect } from "react";
import { captureImage, getImageDataUrl, MVRC } from "../lib/helperFunctions";
import Joker from "./Joker";
import TextInput from "./TextInput";
import LabelAndSomething from "./LabelAndSomething";
import TextAreaInput from "./TextAreaInput";
import { JokerInfoType } from "../types/MainTypes";
import { defaultJokerInfo } from "../types/Constants";
import { overlayOptions } from "../types/Constants";

export default function JokerMaker() {
  const [jokerInfo, setJokerInfo] = useState<JokerInfoType>(defaultJokerInfo);

  const [ready, setReady] = useState(false);

  const [collapseBgOptions, setCollapseBgOptions] = useState(true);
  const [collapseJokerTextOptions, setCollapseJokerTextOptions] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
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
    const url = new URL(window.location.href);
    const jInfo = JSON.stringify(jokerInfo);
    const sp = url.searchParams.get("jokerInfo");

    // Wrap this in a try-catch because sometimes if the values in jokerInfo are changed to quickly, the history api rate-limits the changes
    // so we just ignore it and it doesn't crash the app, nor does it update the URL but that's fine
    try {
      if (sp !== jInfo) {
        url.searchParams.set("jokerInfo", jInfo);
        history.pushState(null, "", url);
      }
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  }, [jokerInfo]);

  return (
    <div className="body-text  flex flex-col justify-center gap-10 sm:flex-row h-[75%]">
      {/* Edit Joker Details Form */}
      <div className="flex flex-col gap-2 max-w-[23rem] text-center bg-[#3f4a4d] p-5 rounded-xl pixel-corners ">
        <h2 className="text-3xl pb-">Create your custom Joker!</h2>
        <h3 className="text-xl text-green-500">📜 Scroll for more options</h3>
        <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden">
          {/* Action buttons  */}
          <div className="flex flex-row gap-2  pb-2 sticky top-0 z-1 bg-[#3f4a4d]">
            <button className="text-white pbbo red clicky big py-1 px-3 w-full" onClick={() => setJokerInfo(defaultJokerInfo)}>
              <span className="text-4xl">Reset</span>
            </button>
            <button className="text-white pbbo green clicky big py-1 px-3 w-full" onClick={captureImage}>
              <span className="text-4xl">Save</span>
            </button>
            {navigator.share && true && (
              <button
                className="text-white pbbo blue clicky big w-full max-w-3/4 self-center"
                onClick={() => {
                  navigator.share({
                    title: document.title,
                    files: [new File([jokerInfo.mainImage], "joker-image.png", { type: "image/png", lastModified: Date.now() })],
                  });
                }}
              >
                <span className="text-4xl">Share</span>
              </button>
            )}
          </div>
          {/* Joker info form */}

          {/* Name */}
          <TextInput label={"Name:"} value={jokerInfo.name} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "name", e.target.value))} />
          {/* Rarity */}
          <TextInput label={"Rarity:"} value={jokerInfo.rarity} onChange={(e) => setJokerInfo(MVRC(jokerInfo, "rarity", e.target.value))} />
          <TextAreaInput
            label={"Description:"}
            value={jokerInfo.desc}
            onChange={(e) => setJokerInfo(MVRC(jokerInfo, "desc", e.target.value))}
          />
          {/* Main Image */}
          <LabelAndSomething label={"Main Image:"}>
            <div className="flex items-center gap-3">
              <label className="inline-block rounded bg-gray-600 px-2 py-1 cursor-pointer text-white w-full pixel-corners white">
                <span>Open</span>
                <input
                  className="top-0 left-0 absolute opacity-0"
                  type="file"
                  onChange={(e) => {
                    if (e.target && e.target.files) {
                      setJokerInfo(MVRC(jokerInfo, "mainImage", e.target.files[0]));
                    }
                  }}
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
          {/* BG Stuff */}
          <button
            className="text-2xl text-white self-start hover:bg-gray-400 p-2 rounded transition-all duration-500"
            onClick={() => setCollapseBgOptions(!collapseBgOptions)}
          >
            {!collapseBgOptions ? "⬇️" : "⬆️"} Background Image Options
          </button>
          {!collapseBgOptions && (
            <>
              {/* Bg image */}
              <LabelAndSomething label={"Bg Image:"} subLabel={true}>
                <div className="flex items-center gap-3">
                  <label className="inline-block rounded bg-gray-600 px-2 py-1 cursor-pointer text-white w-full pixel-corners white">
                    <span>Open</span>
                    <input
                      className="top-0 left-0 absolute opacity-0"
                      type="file"
                      onChange={(e) => {
                        if (e.target && e.target.files) {
                          setJokerInfo(MVRC(jokerInfo, "backgroundImage", e.target.files[0]));
                        }
                      }}
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
              {/* Bg image stretched */}
              <LabelAndSomething label={"Bg Image Stretched"} subLabel={true}>
                <input
                  className="p-3 pixel-corners self-end"
                  type="checkbox"
                  checked={jokerInfo.backgroundImageCover}
                  onChange={(e) => setJokerInfo(MVRC(jokerInfo, "backgroundImageCover", !jokerInfo.backgroundImageCover, true))}
                />
              </LabelAndSomething>
              {/* Bg color */}
              <LabelAndSomething label={"Bg Color:"} subLabel={true}>
                <div className="flex items-center ">
                  <input
                    className={`w-[6rem] text-2xl text-black bg-white px-2 py-1 rounded-sm pixel-corners outline-none`}
                    type="text"
                    value={jokerInfo.backgroundColor}
                    onChange={(e) => setJokerInfo(MVRC(jokerInfo, "backgroundColor", e.target.value))}
                  />
                  <input
                    className="p-3 pixel-corners self-end h-[4rem]"
                    type="color"
                    value={jokerInfo.backgroundColor}
                    onChange={(e) => setJokerInfo(MVRC(jokerInfo, "backgroundColor", e.target.value))}
                  />
                  <button
                    className="pixel-corners white balatro-red px-2 py-1"
                    onClick={() => setJokerInfo(MVRC(jokerInfo, "backgroundColor", ""))}
                  >
                    X
                  </button>
                </div>
              </LabelAndSomething>
            </>
          )}
          {/* 'Joker' Text Options */}
          <button
            className="text-2xl text-white self-start hover:bg-gray-400 p-2 rounded transition-all duration-500"
            onClick={() => setCollapseJokerTextOptions(!collapseJokerTextOptions)}
          >
            {!collapseJokerTextOptions ? "⬇️" : "⬆️"} 'Joker' Text Options
          </button>
          {!collapseJokerTextOptions && (
            <div>
              {/* disable joker text */}
              <LabelAndSomething label={"Disable Joker Text?"} subLabel={true}>
                <input
                  className="p-3 pixel-corners self-end"
                  type="checkbox"
                  checked={jokerInfo.jokerTextDisabled}
                  onChange={(e) => setJokerInfo(MVRC(jokerInfo, "jokerTextDisabled", !jokerInfo.jokerTextDisabled))}
                />
              </LabelAndSomething>
              {/* Joker color */}
              <LabelAndSomething subLabel={true} label={"Color:"}>
                <div className="flex items-center ">
                  <input
                    className={`w-[6rem] text-2xl text-black bg-white px-2 py-1 rounded-sm pixel-corners outline-none`}
                    type="text"
                    value={jokerInfo.jokerTextColor}
                    onChange={(e) => setJokerInfo(MVRC(jokerInfo, "jokerTextColor", e.target.value))}
                  />
                  <input
                    className="p-3 pixel-corners self-end h-[4rem]"
                    type="color"
                    value={jokerInfo.jokerTextColor}
                    onChange={(e) => setJokerInfo(MVRC(jokerInfo, "jokerTextColor", e.target.value))}
                  />
                  <button
                    className="pixel-corners white balatro-red px-2 py-1"
                    onClick={() => setJokerInfo(MVRC(jokerInfo, "jokerTextColor", ""))}
                  >
                    X
                  </button>
                </div>
              </LabelAndSomething>
              {/* Joker color inverted */}
              <LabelAndSomething label={"Color Inverted:"} subLabel={true}>
                <input
                  className="p-3 pixel-corners self-end"
                  type="checkbox"
                  checked={jokerInfo.jokerTextInverted}
                  onChange={(e) => setJokerInfo(MVRC(jokerInfo, "jokerTextInverted", !jokerInfo.jokerTextInverted))}
                />
              </LabelAndSomething>
            </div>
          )}
          {/* edition */}
          <LabelAndSomething label={"Edition:"}>
            <select
              className="bg-white px-2 py-1 text-black rounded-sm w-full pixel-corners"
              value={jokerInfo.overlay.value}
              onChange={(e) => setJokerInfo(MVRC(jokerInfo, "overlay", overlayOptions.find((o) => o.value === e.target.value)))}
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
          {/* wee? */}
          <LabelAndSomething label={"Wee?"}>
            <input
              className="p-3 pixel-corners self-end"
              type="checkbox"
              checked={jokerInfo.isSmall}
              onChange={(e) => setJokerInfo(MVRC(jokerInfo, "isSmall", !jokerInfo.isSmall))}
            />
          </LabelAndSomething>
        </div>
      </div>

      {/* Joker side */}
      <Joker jokerInfo={jokerInfo} />
    </div>
  );
}
