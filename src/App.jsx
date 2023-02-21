import React, { useState, useRef } from 'react'
import "./style.css"
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import {Auth, cookies, SignOut} from './components/Auth.jsx'
import { Chat } from './components/Chat.jsx'
// import { SignOut } from './components/SignOut.jsx'

export function App() {
  const [ isAuth, setIsAuth ] = useState(cookies.get("auth-token"))
  const [ room, setRoom ] = useState(null)
  const roomInputRef = useRef(null)

  return <>
  <Canvas
    shadows
    camera={ {
        fov: 45,
        near: 0.1,
        far: 200000,
        position: [ 2.5, 4, 6 ]
    } }
  >
    <Experience />
    
  </Canvas>
  <div className="overlay">
    { !isAuth ? <Auth setIsAuth={setIsAuth} /> : <SignOut setIsAuth={setIsAuth} /> }
    { room ? <Chat room={room} />  : <div className="room">
          <label> Type room name: </label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)} >
            Enter Chat
          </button>
        </div> }
    
  </div>
</>
}
