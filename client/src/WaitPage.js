import './css/GamePage.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connectSocket, socket } from './api';

function WaitPage() {

  useEffect(() => {
    connectSocket();

    socket.on('start_game', () => {
      console.log('start game')
    });
  }, []);

  return (
    <div>
      <h1>Wait Page: {useParams().id}</h1>
    </div>
  );
}

export default WaitPage;
