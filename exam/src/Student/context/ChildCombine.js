import React,{useState} from 'react'
import { MoonStars, Sun } from 'react-bootstrap-icons'
import setmode from './contexts'
export default function ChildCombine(props) {
  const [mode, setMode] = useState("light")
  const [icon, setIcon] = useState(<Sun color="dark" size={25} className='mx-3 my-2' />)
  const changeMode = () => {
    if(mode === "dark"){
      setMode("light")
      setIcon(<Sun color="dark" size={25} className='mx-3 my-2' />) 
    }
    else{
      setMode("dark")
      setIcon(<MoonStars color='white' size={25} className='mx-3 my-2' />)
    }
}
     
  
    
  return (
    <setmode.Provider value={{ mode, changeMode,icon }}>
            {props.children}
    </setmode.Provider>
  )
}
