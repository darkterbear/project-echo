import './css/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import WaitPage from './pages/WaitPage';
import JoinPage from './pages/JoinPage';

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

