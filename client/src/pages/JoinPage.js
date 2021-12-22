import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { joinGame } from '../api';

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
    <div className="full-center">
      <h1>Loading...</h1>
    </div>
  );
}

export default JoinPage;