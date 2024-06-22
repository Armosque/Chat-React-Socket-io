
import './App.css'
import {io} from 'socket.io-client'
import { useState, useEffect } from 'react'


const socket = io('http://localhost:3000');

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('chat', {
        usuario: socket.id,
        mensaje: newMessage,
      });
      setNewMessage('');
    }
  };

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('chat', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat');
    };
  }, []);

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-md bg-blue-400 rounded-lg shadow-md overflow-hidden">
        <h1 className="text-center text-white bg-blue-500 p-4 text-2xl">
          {isConnected ? 'Connected' : 'Not Connected'}
        </h1>
        <div className="messages p-4 h-80 overflow-y-auto bg-slate-50 text-black">
          {messages.map((msg, index) => (
            <div key={index} className="message bg-gray-200 p-2 my-2 rounded">
              {msg.usuario}: {msg.mensaje}
            </div>
          ))}
        </div>
        <div className="input-container flex border-t p-4 text-black bg-gray-700">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border rounded mr-2 bg-white"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded text-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
