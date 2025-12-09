import { JokerInfoType, KeyValue, overlayOptionsType } from "./MainTypes";

export const overlayOptions : overlayOptionsType[] = [
    { key: "None", value: "" },
    { key: "Polychrome", value: "polychrome-overlay" },
    { key: "Debuff", value: "debuff-overlay" },
    { key: "Holographic", value: "holographic-overlay" },
    { key: "Foil", value: "foil-overlay" },
    { key: "Stone", value: "stone-overlay" },
    { key: "Negative", value: "negative-overlay" },
  ];

export const defaultJokerInfo: JokerInfoType = {
    name: "Joker", // Name of Joker
    desc: "+4 Mult", // Description of Joker
    rarity: "Common", // Rarity of Joker
    mainImage: "/sj2.webp", // Main image of Joker card
    backgroundImage: "", // Background image of Joker card
    backgroundImageCover: false, // Whether the background image should cover the whole card or be contained 
    backgroundColor: "#fff", // Background color of Joker card
    jokerTextColor: "#4f6367", // Color of the 'Joker' text
    jokerTextInverted: false, // Whether the 'Joker' text should be inverted (white) or not (grey)
    jokerTextDisabled: false, // Whether to disable the Joker text
    overlay: overlayOptions[0], // Overlay effect on the card
    isSmall: false, // Wee?
  };