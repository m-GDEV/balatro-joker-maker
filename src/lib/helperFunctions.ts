import { GAButtonTypes, JokerInfoType } from "../types/MainTypes";
import * as htmlToImage from "./html-to-image-dist";
import ReactGA from "react-ga4";

export function captureImage() {
  let el = document.getElementById("JokerDiv");
  if (!el) {
    console.error('Element with id "JokerDiv" not found.');
    return;
  }
  htmlToImage
    .toPng(el)
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "joker-image.png";
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.log("oops, something went wrong!", error);
    });
}

export async function getImageDataUrl(): Promise<string | null> {
  const el = document.getElementById("JokerDiv");

  if (!el) {
    console.error('Element with id "JokerDiv" not found.');
    return null;
  }

  try {
    // await is crucial here to unwrap the Promise from htmlToImage
    const dataUrl = await htmlToImage.toPng(el);
    return dataUrl;
  } catch (error) {
    console.error("oops, something went wrong!", error);
    return null;
  }
}

// Export share function
export async function shareJokerImage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  // Optional: Stop propagation if nested
  e.preventDefault();

  // 1. Get the Base64 string (awaiting the Promise)
  const dataUrl = await getImageDataUrl();

  if (!dataUrl) {
    console.error("Failed to generate image data URL");
    return;
  }

  try {
    // 2. Convert Base64 string to a Blob
    // We use fetch() because it handles the base64 decoding natively and faster
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    // 3. Create the File object
    const file = new File([blob], "joker-image.png", {
      type: "image/png",
      lastModified: Date.now(),
    });

    // 4. Define Share Data
    const shareData: ShareData = {
      title: document.title,
      text: "Check out this Joker I made on balatrojokermaker.com!",
      url: "https://balatrojokermaker.com",
      files: [file],
    };

    // 5. Validate and Share
    // 'navigator.canShare' checks if the browser accepts these specific files
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      GAButtonClick(GAButtonTypes.Share);
    } else {
      console.warn("System does not support sharing this file type.");
    }
  } catch (err) {
    // This catches if the user closes the share sheet without picking an app
    if ((err as Error).name !== "AbortError") {
      console.error("Error sharing:", err);
    }
  }
}

// ModifyValueAndReturnCopy: Makes it easy to modify one property of the object in a setState call
export function MVRC<K extends keyof JokerInfoType>(obj: JokerInfoType, key: K, value: JokerInfoType[K], imageOverride: boolean = false) {
  let copy: JokerInfoType = structuredClone(obj);
  console.log(key, value, imageOverride);

  // If the value is an image, we need to encode it
  if ((key == "mainImage" || key == "backgroundImage") && !imageOverride && (value instanceof File || value instanceof Blob)) {
    (copy as any)[key] = URL.createObjectURL(value);
  } else {
    copy[key] = value;
  }
  console.log("Modified copy:", copy);
  return copy;
}

// Inverts a hex color
export function invertColor(hex: string) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r, 2) + padZero(g, 2) + padZero(b, 2);
}

function padZero(str: string, len: number) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

// GA functions

export const GAButtonClick = (buttonName: GAButtonTypes) => {
  console.log(`GA Event: Clicked '${GAButtonTypes[buttonName]}' Button`);
  ReactGA.event({
    category: "User",
    action: `Clicked ${GAButtonTypes[buttonName]} Button`,
  });
};
