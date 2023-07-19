import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:3001");

const initalState = {
  username: "",
  room: "",
};

function App() {
  const [form, setForm] = useState(initalState);
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    joinRoom();
  };

  const joinRoom = () => {
    if (form.username !== "" && form.room !== "") {
      socket.emit("join_room", form.room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <form onSubmit={handleSubmit}>
          <h3>Join chat</h3>
          <input
            type="text"
            placeholder="Name"
            name="username"
            value={form.username}
            onChange={handleChange}></input>
          <input
            type="text"
            placeholder="Room ID"
            name="room"
            value={form.room}
            onChange={handleChange}></input>
          <button type="submit">Join a room</button>
        </form>
      ) : (
        <Chat socket={socket} username={form.username} room={form.room} />
      )}
    </>
  );
}

export default App;
