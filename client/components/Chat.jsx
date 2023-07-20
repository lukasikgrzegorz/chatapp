import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Chat = ({ socket, username, room, handleLeave }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const leaveRoom = () => {
    socket.emit("leave_room", room);
    handleLeave();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()} : ${new Date(
          Date.now()
        ).getMinutes()} `,
      };

      await socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);

      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on(
      "recive_message",
      (data) => {
        setMessageList([...messageList, data]);
      },
      [socket]
    );
  });

  return (
    <div>
      <div>
        <h4>Live chat ({room})</h4>
        <button onClick={leaveRoom}>Leave this room</button>
      </div>
      <div>
        {messageList.map((messageContent, id) => {
          return (
            <div key={id}>
              <h5>{messageContent.message}</h5>
              <p>
                {messageContent.author}
                {messageContent.time}
              </p>
            </div>
          );
        })}
      </div>
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

Chat.propTypes = {
  socket: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  handleLeave: PropTypes.func.isRequired,
};

export default Chat;
