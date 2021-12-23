import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connectSocket, socket } from '../api';

function WaitPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    connectSocket();

    socket.on('start_game', () => {
      navigate(`/${id}/game`);
    });
  }, []);

  return (
    <div className="full-center">
      <h1>Waiting for opponent...</h1>
      <p>Give them this link: <a href="https://terranceli.com">https://echo.terranceli.com/{id}</a></p>
    </div>
  );
}

export default WaitPage;
