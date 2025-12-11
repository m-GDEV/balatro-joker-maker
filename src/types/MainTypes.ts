import { overlayOptions } from "./Constants";
import { Key } from "react";

export type KeyValue<K extends string, V = unknown> = {
  key: K;
  value: V;
};
export type overlayOptionsType = KeyValue<string, string>;

export interface JokerInfoType {
  name: string; // Name of Joker
  desc: string; // Description of Joker
  rarity: string; // Rarity of Joker
  mainImage: string | File; // Main image of Joker card
  backgroundImage: string | File; // Background image of Joker card
  backgroundImageCover: boolean; // Whether the background image should cover the whole card or be contained
  backgroundColor: string; // Background color of Joker card
  jokerTextColor: string; // Color of the 'Joker' text
  jokerTextInverted: boolean; // Whether the 'Joker' text should be inverted (white) or not (grey)
  jokerTextDisabled: boolean; // Whether to disable the Joker text
  overlay: overlayOptionsType; // Overlay effect on the card
  isSmall: boolean; // Wee?
}

export enum GAButtonTypes {
  Reset, //-> Reset button in JokerMaker
  Save, //-> Save button in JokerMaker
  Share, //-> Share button in JokerMaker
  CRT, //-> CRT toggle in App footer
  Music, //-> Music toggle in App footer
  Feedback, //-> Feedback link in App footer
  Source, //-> Source link in App footer
  Wee, //-> Wee toggle in JokerMaker
}
