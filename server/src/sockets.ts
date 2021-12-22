
import { Socket, Server } from 'socket.io';
import http from 'http';
import { RequestHandler } from 'express';
import sharedSession from 'express-socket.io-session';
import Player from './game/Player';

export default function sockets(
  httpServer: http.Server, 
  sessionMiddleware: RequestHandler): Server {
    
  const io = new Server(httpServer, { cors: {
    origin: ['https://echo.terranceli.com', 'http://localhost:5000'],
    methods: ['GET', 'POST'],
    credentials: true,
  }});

  io.use(sharedSession(sessionMiddleware, {
    autoSave: true,
  }));

  io.on('connection', (socket: Socket) => {
    // User must create/join room before connecting to socket
    const id = socket.handshake.sessionID;
    if (!id) {
      return socket.disconnect(true);
    }

    const player = Player.getPlayer(id);
    if (!player || !player.game) {
      return socket.disconnect(true);
    }
    
    player.socket = socket;
    const game = player.game;

    // Check if both players are connected
    if (game.player1 && game.player2) {
      game.player1.socket.emit('start_game');
      game.player2.socket.emit('start_game');
    }

    // TODO: handle socket.on('disconnect')
  });

  return io;
}