import useWebSocket from "react-use-websocket";
import { socketURL, getMessagesByConversation } from "../utils/API_URLs";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import ProfileContext from "../contexts/ProfileContext";
import useAxios from "../utils/useAxios";
import { Formik } from "formik";
import InfiniteScroll from "react-infinite-scroll-component";

const Chat = ({ otherParticipants }) => {
  const { user } = useContext(AuthContext);
  const { ticket } = useContext(ProfileContext);
  const api = useAxios();

  const [chatMessage, setChatMessage] = useState("");
  const [messageHistoryInfo, setMessageHistoryInfo] = useState();
  const [messageHistory, setMessageHistory] = useState([]);

  const fetchChatMessages = async () => {
    const response = await api.get(
      getMessagesByConversation(getConverationName())
    );
    if (response.status === 200) {
      setMessageHistoryInfo(response.data);
      const messagesReverse = response.data.results.reverse();
      setMessageHistory((prev) => [...messagesReverse]);
    }
  };

  useEffect(() => {
    setMessageHistoryInfo();
    setChatMessage("");
    setMessageHistory([]);
    fetchChatMessages();
  }, [otherParticipants]);

  const getConverationName = () => {
    const allParticipants = [user.username, ...otherParticipants]
      .sort()
      .join(".");
    return allParticipants;
  };

  const handleNextMessagesFetch = async () => {
    const response = await api.get(messageHistoryInfo.next);
    if (response.status === 200) {
      setMessageHistoryInfo(response.data);
      const messagesReverse = response.data.results.reverse();
      setMessageHistory((prev) => [...messagesReverse, ...prev]);
    }
  };

  const handleMessageSending = (e) => {
    if (chatMessage.length === 0) return;
    sendJsonMessage({
      type: "form_message",
      message: chatMessage,
      time: Date.now(),
    });
    setChatMessage("");
  };

  const { sendJsonMessage } = useWebSocket(user && ticket ? socketURL : null, {
    queryParams: { ticket_uuid: ticket, conv_name: getConverationName() },
    onOpen: () => {},
    onClose: () => {
      setMessageHistoryInfo();
      setChatMessage("");
      setMessageHistory([]);
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "form_message_echo":
          setMessageHistory((prev) => [data.message, ...prev]);
          break;
        default:
          console.error("Unknown message type");
      }
    },
  });

  return (
    <div className="flex-1">
      <Formik initialValues={{ message: "" }} onSubmit={handleMessageSending}>
        {({ values, handleBlur, handleSubmit }) => (
          <form className="flex flex-row">
            <input
              type="text"
              name="message"
              placeholder=""
              className="input input-bordered w-full"
              onChange={(e) => {
                setChatMessage(e.target.value);
              }}
              onBlur={handleBlur}
              value={chatMessage}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-xs btn-md ml-5"
            >
              Send
            </button>
          </form>
        )}
      </Formik>
      <div className="flex-1 my-3 rounded-lg p-3 flex flex-col border-2 border-slate-600">
        {messageHistoryInfo && (
          <InfiniteScroll
            className="flex-1 flex flex-col h-96"
            height={500}
            dataLength={messageHistoryInfo?.count}
            next={handleNextMessagesFetch}
            hasMore={messageHistoryInfo?.next}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            refreshFunction={() => {
              messageHistory?.map((message, ind) => {
                if (message.from_user === user.user_id) {
                  return (
                    <div className="chat chat-end" key={ind}>
                      <div className="chat-bubble">{message.content}</div>
                    </div>
                  );
                } else {
                  return (
                    <div className="chat chat-start" key={ind}>
                      <div className="chat-bubble">{message.content}</div>
                    </div>
                  );
                }
              });
            }}
          >
            {messageHistory?.map((message, ind) => {
              if (message.from_user === user.user_id) {
                return (
                  <div className="chat chat-end" key={ind}>
                    <div className="chat-bubble">{message.content}</div>
                  </div>
                );
              } else {
                return (
                  <div className="chat chat-start" key={ind}>
                    <div className="chat-bubble">{message.content}</div>
                  </div>
                );
              }
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Chat;
