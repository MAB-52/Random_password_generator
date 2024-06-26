import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback (() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "1234567890"
    if(symbolAllowed) str += "!@#$%^&*()_+"

    for(let i = 1; i < length; i++)
      {
        const char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }
    setPassword(pass)
  }, [length, numberAllowed, symbolAllowed])

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()

    //Lets you select the range of text to copy !!
    //passwordRef.current?.setSelectionRange(1,3)
  }

  useEffect (() => {
    generatePassword()
  }, [length, numberAllowed, symbolAllowed])


  return (
    <>
    <div className='flex items-center justify-center min-h-screen bg-gray-600'>
      <div className='w-full max-w-xl mx-auto shadow-lg shadow-slate-900 rounded-lg px-5 py-3 my-8 bg-gray-800 text-red-500'>
        <h1 className='text-white text-center my-4 font-extrabold text-lg'>PASSWORD GENERATOR</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-6'>
          <input 
          type="text"
          value = {password}
          className = "outline-none w-full py-3 px-3 font-bold"
          placeholder='Password'
          readOnly
          ref={passwordRef}
           />
           <button onClick={copyPassword} className='outline-none bg-green-800 text-white px-3 py-0.5 shrink-0'>COPY</button>
        </div>
        <div className='flex text-sm gap-x-10 pb-5'>
          <div className="flex items-center gap-x-3">
            <input 
            type="range" 
            min={8}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name="" 
            id="" />
            <label htmlFor="length" className='text-lg'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed ((prev) => !prev)}}
            className='' 
            name="" 
            id="" />
            <label htmlFor="numbers" className='text-lg'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input 
            type="checkbox"
            defaultChecked={symbolAllowed}
            onChange={() => {
              setSymbolAllowed ((prev) => !prev)}}
            className='' 
            name="" 
            id="" />
            <label htmlFor="symbols" className='text-lg'>Symbols</label>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
