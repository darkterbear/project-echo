import { Application } from 'express';
import Game from './game/Game';
import Player from './game/Player';
import { Server } from 'socket.io';

export default function routes(app: Application, io: Server): void {
  app.post('/create_game', (req, res) => {
    const id = req.sessionID;
    let player = Player.getPlayer(id);

    if (!player) {
      player = new Player(id);
    }

    // Cannot create a game if the player is already in one
    if (player.game) {
      return res.status(409).end();
    }

    const game = new Game();
    player.joinGame(game);

    res.json({ id: game.id });
  });

  app.post('/join_game', (req, res) => {
    const id = req.sessionID;
    let player = Player.getPlayer(id);

    if (!player) {
      player = new Player(id);
    }

    // Cannot create a game if the player is already in one
    if (player.game) {
      return res.status(409).end();
    }

    const gameId = req.body.id;
    const game = Game.getGame(gameId);

    if (!game) {
      return res.status(404).end();
    }

    // Cannot join a game if there are already two players
    try {
      player.joinGame(game);
    } catch (e) {
      return res.status(409).end();
    }

    res.status(200).end();
  });

  app.post('/building', (req, res) => {
    const id = req.sessionID;
    const player = Player.getPlayer(id);

    if (!player) {
      return res.status(404).end();
    }

    const game = player.game;
    if (!game) {
      return res.status(404).end();
    }

    const { position, type } = req.body;
    try {
      game.addBuilding(player, position, type);
    } catch (e) {
      return res.status(400).end();
    }

    res.status(200).end();
  });
}
