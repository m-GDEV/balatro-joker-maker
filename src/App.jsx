import { useState } from 'react'
import Joker from './components/joker'

function App() {
  const [jokerName, setJokerName] = useState('');

  return (
    <div className='body-text bg-[url(/bg.webp)] h-dvh w-full bg-cover bg-center bg-repeat-y flex flex-row items-center justify-center'>
      <div>
        <h1 className='text-9xl text-white body-text'>hello!</h1>
        <input className='bg-white p-3' type='text' value={jokerName} onChange={e => setJokerName(e.target.value)}/>
      </div>
      <Joker isBig={true} name={"Joker"} desc={"+4 Mult"} rarity={"Common"} mainImage={"/sj2.webp"} overlay={""}/>
    </div >
  )
}

export default App
