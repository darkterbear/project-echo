import './css/GamePage.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { joinGame } from './api';

function JoinPage() {
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await joinGame(id);
      if (res.status === 200) {
        window.location.href = `/${id}/wait`;
      }
    })();
  }, []);

  return (
    <div>
      <h1>Join Page: {useParams().id}</h1>
    </div>
  );
}

export default JoinPage;
