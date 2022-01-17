import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connectSocket, socket } from '../api';

const FRONTEND_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://echo.terranceli.com' : 'http://localhost:5000';

function WaitPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    connectSocket();

    socket.on('start_game', (p2) => {
      navigate(`/${id}/game`, { state: { p2 } });
    });
  }, []);

  return (
    <div className="full-center">
      <h1>Waiting for opponent...</h1>
      <p>Give them this link: <a href={FRONTEND_BASE_URL + '/' + id}>{FRONTEND_BASE_URL}/{id}</a></p>
    </div>
  );
}

export default WaitPage;
