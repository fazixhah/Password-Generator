import { useState , useCallback , useEffect, useRef  } from 'react'
import './App.css'

function App() {
  const [length ,setLength] = useState(8)
  const [checkbox ,setCheckbox] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)
  const [password , setPassword] = useState("")
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback( ()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(checkbox) str+= "0123456789"
    if(charAllowed) str+= "*&^%$#@!?>[]|"
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)  
      pass += str.charAt(char)
      
    } 
    setPassword(pass)

  } , [length, checkbox , charAllowed , setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },  [password])

  useEffect(()=>{
    passwordGenerator()
  } , [length, checkbox , charAllowed , passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 pb-6 py-5 my-5 text-orange-400 bg-gray-800'>
        <h1 className='m-4 py-2 font-bold font-serif '> Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 border-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
       />
       <button onClick={copyPasswordToClipboard} className='px-2 border-l-2 rounded-l-3xl bg-gray-900 text-sherif
       hover:bg-blue-600 text-white border-orange-400 w-20'>
        Copy</button>
        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-xp1'>
          <input type="range"
          min={7}
          max={30}
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}

          className='cursor-pointer'
        />
        <label className='px-2'> Length: {length}</label>
      </div>
      
      <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      defaultChecked = {checkbox}
      id="numberinput"
      onChange={ ()=>{ setCheckbox((prev)=> !prev)}} />
      <label> Numbers</label>
    </div>
    
    <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      defaultChecked = {charAllowed}
      id="characterInput"
      onChange={ ()=>{ setcharAllowed((prev)=> !prev)}} />
      <label> Characters </label>
    </div>
    </div>

  </div> 
  </>
  )
}

export default App
