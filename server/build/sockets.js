"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_socket_io_session_1 = __importDefault(require("express-socket.io-session"));
function sockets(httpServer, sessionMiddleware) {
    const io = new socket_io_1.Server(httpServer, { cors: {
            origin: ['https://echo.terranceli.com', 'http://localhost:3000'],
            methods: ['GET', 'POST'],
            credentials: true,
        } });
    io.use(express_socket_io_session_1.default(sessionMiddleware, {
        autoSave: true,
    }));
    io.on('connection', (socket) => {
        // User must create/join room before connecting to socket
        const id = socket.handshake.sessionID;
        if (!id) {
            return socket.disconnect(true);
        }
        // const player = Player.getPlayer(id);
        // if (!player || !player.room) {
        //   return socket.disconnect(true);
        // }
        // socket.join(player.room.code);
        // player.socket = socket;
        // socket.on('disconnect', () => {
        //   const room = player.room;
        //   player.destroy();
        //   // If player was in non-empty room, send update_players
        //   if (room) {
        //     io.to(room.code).emit('update_players', room.playerNames(), room.leader?.username);
        //     // If was in game, no longer in game
        //     room.deck = [];
        //     room.turn = -1;
        //     room.pendingAction = undefined;
        //   }
        // });
    });
    return io;
}
exports.default = sockets;
//# sourceMappingURL=sockets.js.map