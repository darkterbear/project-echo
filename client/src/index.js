import './css/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import GamePage from './GamePage';
import HomePage from './HomePage';
import WaitPage from './WaitPage';
import JoinPage from './JoinPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<JoinPage />} />
      <Route path="/:id/wait" element={<WaitPage />} />
      <Route path="/:id/game" element={<GamePage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

