import JokerMaker from "./components/JokerMaker";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-around bg-[url(/bg.webp)] h-dvh w-full bg-cover bg-center bg-repeat-y">
      <h1 className="body-text text-8xl tracking-wider letter-outline">Balatro Joker Maker</h1>
      <JokerMaker />
    </div>
  );
}
