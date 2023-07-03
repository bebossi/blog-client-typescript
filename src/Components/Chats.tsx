import { useEffect, useState, useContext, SyntheticEvent } from "react";
import { api } from "../api";
import { Chat } from "../interfaces";
import { AuthContext } from "./authContextComponents";

function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chat, setChat] = useState<Chat | undefined>();
  const [showChat, setShowChat] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [sendingMessage, setSendingMessage] = useState("");
  const user = useContext(AuthContext);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await api.get(`/chats`);
      const data = response.data;
      setChats(data);
    };
    fetchChats();
  }, []);

  const fetchChat = async (userId: number) => {
    try {
      const response = await api.get(`/chat/${userId}`);
      const data = response.data;
      setChat(data);
      setShowChat(true);
      setShowChats(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [chat]);

  const toggleChat = async () => {
    setShowChats(!showChats);
    setShowChat(false);
    setChat(undefined);
  };

  const handleUsernameClick = (userId: number) => {
    fetchChat(userId);
  };

  const handleSubmit = async (
    e: SyntheticEvent,
    userId: number,
    chatId: number
  ) => {
    e.preventDefault();
    try {
      if (!sendingMessage) {
        return;
      }
       await api.post(`/message/${userId}/${chatId}`, {
        message: sendingMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 text-slate-950 rounded-t mr-2">
      <h1
        onClick={toggleChat}
        className="bg-gray-200 text-slate-950 rounded-t flex justify-center"
      >
        Chats
      </h1>
      {showChats && (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              {chat.users.map((user) => {
                //   console.log(user.id);
                return (
                  <div className="">
                    <div className=" flex p-1">
                      <img
                        src={user.imageUrl}
                        className="w-6 h-6 rounded-full"
                      />
                      <p
                        key={user.id}
                        onClick={() => handleUsernameClick(user.id)}
                      >
                        {user.userName}
                      </p>
                    </div>
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      )}
      {showChat && chat && (
        <div>
          <button onClick={toggleChat}>←</button>
          <div>
            {chat.messages.map((message) => {
              console.log(chat);
              return (
                <div>
                  <p
                    key={message.id}
                    className={
                      message.senderId.id === user.user.id
                        ? "text-right"
                        : "text-left"
                    }
                  >
                    {message.message}
                  </p>
                </div>
              );
            })}
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e, chat.users[0].id, chat.id)}>
              <input
                value={sendingMessage}
                onChange={(e) => setSendingMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chats;
