import {  useEffect, useState } from "react";
import { api } from "../api";
import { Chat } from "../interfaces";

function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chat, setChat] = useState<Chat | undefined>();
  const [showChat, setShowChat] = useState(false);
  const [showChats, setShowChats] = useState(false);


  useEffect(() => {
    const fetchChats = async () => {
      const response = await api.get(`/chats`);
      const data = response.data;
      setChats(data);
      console.log(response.data);
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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleChat = async () => {
    setShowChats(!showChats);
    setShowChat(false);
    setChat(undefined);
  };

  const handleUsernameClick = (userId: number) => {
    fetchChat(userId);
    console.log(userId);
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
          <h2>
            {chat.messages.map((message) => (
              <p key={message.id} >{message.message}</p>
            ))}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Chats;
