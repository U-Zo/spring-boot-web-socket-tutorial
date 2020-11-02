import React from 'react';

const Message = React.memo(({ user, message }) => {
  return (
    <li>
      {user}: {message}
    </li>
  );
});

const ChatRoom = ({ messages, onSubmit, onChange, message }) => {
  return (
    <div>
      <div>
        <ul>
          {messages &&
            messages.map((message) => (
              <Message user={message.sender} message={message.message} />
            ))}
        </ul>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" name="message" onChange={onChange} value={message} />
        <button>보내기</button>
      </form>
    </div>
  );
};

export default ChatRoom;
