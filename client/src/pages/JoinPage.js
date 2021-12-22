import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { joinGame } from '../api';

function JoinPage() {
  const { id } = useParams();

  const [errored, setErrored] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await joinGame(id);
      if (res.status === 200) {
        window.location.href = `/${id}/wait`;
      } else {
        setErrored(true);
      }
    })();
  }, []);

  return (
    <div className="full-center">
      { errored ? <h1>Error joining game :(</h1> : <h1>Loading...</h1> }
    </div>
  );
}

export default JoinPage;
