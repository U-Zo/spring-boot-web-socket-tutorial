import React from 'react';
import { Link } from 'react-router-dom';

const Room = ({ name }) => {
  return (
    <li>
      <div>{name}</div>
    </li>
  );
};

const RoomList = ({ loading, roomList, error }) => {
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <ul>
      {!loading &&
        roomList &&
        roomList.map((room) => (
          <Link to={`/room/${room.roomId}`}>
            <Room name={room.name} />
          </Link>
        ))}
    </ul>
  );
};

export default RoomList;
