import { useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (currentMessage !== "") {
      e.preventDefault();

      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()} : ${new Date(
          Date.now()
        ).getMinutes()} `,
      };

      setCurrentMessage("");
    }
  };

  return (
    <div>
      <div>
        <p>Live chat</p>
      </div>
      <div></div>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Message"
          name="message"
          value={currentMessage}
          onChange={handleChange}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
