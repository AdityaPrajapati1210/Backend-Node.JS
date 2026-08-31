import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [color, setColor] = useState("Olive")

  return (
    <>
      <div className='w-full h-screen' style={{ backgroundColor: color }}>
        <h1 className='bg-amber-400 text-center'>This is my first react project ---bgChanger in this i can use Tailwind CSS</h1>

        <div className='fixed bottom-10 left-1/2 -translate-x-1/2'>
          <div className='flex gap-1.5 bg-white py-2.5 px-2.5 rounded-full'>
            <button onClick={() => setColor("red")} className='bg-red-600 px-2 py-0.5 rounded-2xl'>red</button>
            <button onClick={() => setColor("blue")} className='bg-blue-600 px-2 py-0.5 rounded-2xl'>blue</button>
            <button onClick={() => setColor("green")} className='bg-green-600 px-2 py-0.5 rounded-2xl'>green</button>
            <button onClick={() => setColor("yellow")} className='bg-yellow-200 px-2 py-0.5 rounded-2xl'>yellow</button>
            <button onClick={() => setColor("orange")} className='bg-orange-400 px-2 py-0.5 rounded-2xl'>orange</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
