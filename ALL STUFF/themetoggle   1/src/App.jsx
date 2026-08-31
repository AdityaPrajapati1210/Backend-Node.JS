import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ThemeBtn from './components/ThemeBtn'
import Card from './components/Card'
import { ThemeContextProvider } from './context/ThemeContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeContextProvider>
      <h1 className='p-5 bg-yellow-500 text-3xl'>Dekhte h mughe samaj me aaya ki nhi</h1>

      <div className="flex flex-wrap min-h-screen items-center dark:bg-gray-600">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>
          </div>

          <div className="w-full max-w-sm mx-auto">
              <Card/>
          </div>
        </div>
      </div>

    </ThemeContextProvider>
  )
}

export default App
