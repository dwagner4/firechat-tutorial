import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import '../styles/Chat.css'

export const Chat = (props) =>
{
  const { room } = props

  const [newMessage, setNewMessage] = useState("")

  const messagesRef = collection(db, "messages")

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room))
    onSnapshot(queryMessages, (snapshot) => {
      console.log("NEW MESSAGE")
    })
  }, [])

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    if ( newMessage === "") return
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    })
    setNewMessage("")
  }

  return <div className="chat-app">
    <form onSubmit={handleSubmit} className="new-message-form">
      <input 
        className="new-message-input" 
        placeholder="Type your message here..."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
        />  
      <button type="submit" className="send-button"> send </button>
    </form>
  </div>
}