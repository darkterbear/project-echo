import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../api';

function HomePage() {

  const navigate = useNavigate();
  const onCreateGame = async () => {
    const res = await createGame();
    if (res.status === 200) {
      const { id } = await res.json();
      navigate(`/${id}/wait`);
    }
  }

  return (
    <div className="full-center">
      <h1>Home Page</h1>
      <button onClick={onCreateGame}>Create Game</button>
    </div>
  );
}

export default HomePage;
