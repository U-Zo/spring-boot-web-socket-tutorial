import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const sockJS = new SockJS('/ws-stomp');
const stompClient = (Stomp.Client = Stomp.over(sockJS));
stompClient.debug = () => {};

const ChatRoomContainer = ({ match }) => {
  const { roomId } = match.params;
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (data) => {
        const message = JSON.parse(data.body);
        setMessages(messages.concat(message));
      });
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    stompClient.send(
      '/pub/chat/message',
      {},
      JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        sender: username,
        message: message,
      })
    );
  };

  return <div></div>;
};

export default withRouter(ChatRoomContainer);
