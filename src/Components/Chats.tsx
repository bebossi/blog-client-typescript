import { useEffect, useState, useContext, SyntheticEvent } from "react";
import { api } from "../api";
import { Chat, Message } from "../interfaces";
import { AuthContext } from "./authContextComponents";
import socket from "../socketio";

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

      socket.emit("getChat", data.id);
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
      const response = await api.post(`/message/${userId}/${chatId}`, {
        message: sendingMessage,
      });

      const sentMessage = response.data
       socket.emit("sendMessage", {
        sentMessage
       });

       setChat((prevChat: Chat | undefined) => {
        const updatedChat = { ...prevChat! };
        updatedChat.messages = [...updatedChat.messages, sentMessage]
        return updatedChat;
      });
       setSendingMessage("")
    } catch (error) {
      console.log(error);
    }
  };

//   useEffect(() => {
//     socket.on("receivedMessage", (data) => {
//         console.log(data)
//       if (chat && data.sentMessage.chatId.id === chat.id) {
//         setChat((prevChat: Chat | undefined) => {
//           const updatedChat = { ...prevChat! };
//           updatedChat.messages = [...updatedChat.messages, data.sentMessage]
//           console.log(updatedChat)
//           return updatedChat;
//         });
//       }
//     });
//   }, [socket, chat]);

useEffect(() => {
    const handleReceivedMessage = (data: { sentMessage: Message; }) => {
      console.log(data);
      if (chat && data.sentMessage.chatId.id === chat.id) {
        setChat((prevChat) => {
          const updatedChat = { ...prevChat! };
          updatedChat.messages = [...updatedChat.messages, data.sentMessage];
          console.log(updatedChat);
          return updatedChat;
        });
      }
    };
  
    socket.on("receivedMessage", handleReceivedMessage);
  
    return () => {
      socket.off("receivedMessage", handleReceivedMessage);
    };
  }, [socket, chat]);


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
            
            {chat.messages && chat.messages.map((message) => {
              return (
                <div>
                  <p
                    key={message.id}
                    className={
                      message.senderId?.id === user.user.id
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
