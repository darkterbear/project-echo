import React from 'react';
import { createGame } from '../api';

function HomePage() {

  const onCreateGame = async () => {
    const res = await createGame();
    if (res.status === 200) {
      const { id } = await res.json();
      window.location.href = `/${id}/wait`;
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
