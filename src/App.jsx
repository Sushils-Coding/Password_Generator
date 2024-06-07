import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [num, setNum] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState('')


  const passwordGenerator = useCallback(() => {
    let pass = ''
    
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if (num) str += '0123456789'
    
    if (character) str += '()*&^%$#@!{}[]><?/'
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    
    setPassword(pass)
    
  }, [length, num, character, setPassword])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, num, character, passwordGenerator])
  
  const ref = useRef();

  const copyPasswordToClipboard = useCallback(()=>{
    ref.current?.select();
    ref.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-300 bg-gray-700 tracking-wide font-bold'>
        <div className='text-white text-center my-3 text-2xl font-bold tracking-wider'>Password Generator</div>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            ref={ref}
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 text-gray-950' placeholder='password' readOnly />
          <button className='text-xl text-white bg-blue-500 px-4 py-2 shrink-0 active:bg-blue-800' onClick={copyPasswordToClipboard} >copy</button>
        </div>
        <div className='flex text-sm gap-x-4 '>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              value={num}
              defaultChecked={num}
              id='numberInput'
              onChange={() => { setNum((prev) => !prev) }}
            />
            <label htmlFor='numberInput' >Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              value={num}
              defaultChecked={num}
              id='numberInput'
              onChange={() => { setCharacter(!character) }}
            />
            <label htmlFor='characterInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
