import { useState } from "react";
import Joker from "./components/joker";
import { useEffect } from "react";

function App() {
  const [jokerInfo, setJokerInfo] = useState({
    name: "Joker",
    desc: "+4 Mult",
    rarity: "Uncommon",
    mainImage: "/sj2.webp",
    overlay: "",
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
    if (ready == false) {
      return
    }
    console.log(JSON.stringify(jokerInfo));
    const url = new URL(window.location);
    const jInfo = JSON.stringify(jokerInfo);
    const sp = url.searchParams.get("jokerInfo");

    // console.log(jInfo, sp)

    if (sp !== jInfo) {
      url.searchParams.set("jokerInfo", jInfo);
      history.pushState(null, "", url);
    }
  }, [jokerInfo]);

  return (
    <div className="body-text bg-[url(/bg.webp)] h-dvh w-full bg-cover bg-center bg-repeat-y flex flex-row items-center justify-center">
      <div>
        <h1 className="text-9xl text-white body-text">hello!</h1>
        <div>
          <label>Name</label>
          <input
            className="bg-white p-3"
            type="text"
            value={jokerInfo.name}
            onChange={(e) =>
              setJokerInfo({
                name: e.target.value,
                desc: "+4 Mult",
                rarity: "Uncommon",
                mainImage: "/sj2.webp",
                overlay: "",
                jokerTextDisabled: false,
                isSmall: false,
              })
            }
          />
        </div>
      </div>
      <Joker jokerInfo={jokerInfo} />
    </div>
  );
}

export default App;
