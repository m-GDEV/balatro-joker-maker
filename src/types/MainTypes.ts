import { overlayOptions } from "./Constants";
import { overlayOptionsType } from "./SharedTypes";

export interface JokerInfo {
  name: string; // Name of Joker
  desc: string; // Description of Joker
  rarity: string; // Rarity of Joker
  mainImage: string; // Main image of Joker card
  backgroundImage: string; // Background image of Joker card
  backgroundImageCover: boolean; // Whether the background image should cover the whole card or be contained
  backgroundColor: string; // Background color of Joker card
  jokerTextInverted: boolean; // Whether the 'Joker' text should be inverted (white) or not (grey)
  overlay: overlayOptionsType; // Overlay effect on the card
  isSmall: boolean; // Wee?
}
