import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:3005';

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

export const placeBuilding = (position, type) => {
  return fetch(`${BASE_URL}/building`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ position, type }),
    credentials: 'include'
  });
}

export let socket = null;
export const connectSocket = () => {
  socket = io(BASE_URL, { withCredentials: true });
}
