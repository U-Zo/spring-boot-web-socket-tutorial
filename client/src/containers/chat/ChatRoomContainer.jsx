import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatRoom from '../../components/chat/ChatRoom';

const sockJS = new SockJS('http://192.168.0.12:8080/ws-stomp');
const stompClient = (Stomp.Client = Stomp.over(sockJS));

const ChatRoomContainer = ({ match }) => {
  const { roomId } = match.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const { nickname } = useSelector(({ user }) => ({
    nickname: user.nickname,
  }));

  const onChange = (e) => {
    const { name, value } = e.target;
    setMessage(value);
  };

  const addMessage = (mesg) => {
    setMessages((prev) => [...prev, mesg]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    stompClient.send(
      '/pub/chat/message',
      {},
      JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        sender: nickname,
        message: message,
      })
    );
    setMessage('');
  };

  const stompSubscribe = () =>
    stompClient.subscribe(`/sub/chat/room/${roomId}`, (data) => {
      const mesg = JSON.parse(data.body);
      addMessage(mesg);
    });

  useEffect(() => {
    if (!stompClient.connected) {
      stompClient.connect({}, stompSubscribe);
    } else {
      stompSubscribe();
    }

    return () => stompClient.unsubscribe();
  }, [roomId]);

  return (
    <ChatRoom
      onSubmit={sendMessage}
      messages={messages}
      message={message}
      onChange={onChange}
      nickname={nickname}
    />
  );
};

export default withRouter(ChatRoomContainer);
