import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RoomList from '../../components/chat/RoomList';
import { getRoomList, unloadRoomList } from '../../modules/roomList';

const RoomListContainer = () => {
  const { loading, roomList, error } = useSelector(({ loading, roomList }) => ({
    loading: loading['roomList/GET_ROOM_LIST'],
    roomList: roomList.roomList,
    error: roomList.error,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomList());

    return () => dispatch(unloadRoomList());
  }, [dispatch]);

  return <RoomList loading={loading} error={error} roomList={roomList} />;
};

export default withRouter(RoomListContainer);
