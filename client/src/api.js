import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:3000';

export const createGame = () => {
  return fetch(`${BASE_URL}/create_game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
}

export const joinGame = (id) => {
  return fetch(`${BASE_URL}/join_game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id }),
    credentials: 'include'
  });
}

export let socket = null;
export const connectSocket = () => {
  socket = io(BASE_URL, { withCredentials: true });
}
