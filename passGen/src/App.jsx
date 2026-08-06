import { cloneElement, use, useCallback, useState, useEffect,useRef } from 'react'
import './App.css'
import createPlugin from 'tailwindcss/plugin';


function App() {
  const [range, setrange] = useState(10);
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [pass, setpass] = useState(" ");
  
  
  const inputRef = useRef(null);
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_+=";


  // let random = Math.random() * range;
  // console.log(random);
  console.log(number);
  console.log(char);

  const passgenrator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (number) {
      str += numbers;
    }
    if (char) {
      str += symbols;
    }


    for (let i = 0; i < range; i++) {
      let random = Math.floor(Math.random() * str.length) + 1;
      pass += str[random]
    }

    setpass(pass);

  }, [range, number, char])


  useEffect(() => {
    passgenrator();
  }, [range, number, char]);

  function handleClick(){
    inputRef.current.select();
    let text = inputRef.current.value;
    window.navigator.clipboard.writeText(text);
  }



 return (
  <>
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="w-500 bg-gray-800 rounded-xl p-6 shadow-lg">

      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Password Generator
      </h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={pass}
          readOnly
          className="flex-1 p-3 rounded-l-lg bg-white text-black outline-none"
          ref={inputRef}
        />

        <button onClick={handleClick} className="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700">
          Copy
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">

        <div className="flex items-center gap-2">
          <input
            type="range"
            min={1}
            max={100}
            value={range}
            onChange={(e) => setrange(Number(e.target.value))}
            className="cursor-pointer"
          />
          <label className="text-orange-400">
            Length ({range})
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="number"
            onChange={(e) => setnumber(e.target.checked)}
          />
          <label htmlFor="number" className="text-white">
            Numbers
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="characters"
            onChange={(e) => setchar(e.target.checked)}
          />
          <label htmlFor="characters" className="text-white">
            Symbols
          </label>
        </div>

      </div>

    </div>
  </div>
  </>
)
}

export default App
