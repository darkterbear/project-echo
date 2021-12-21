import { Socket } from 'socket.io';
import Game from './Game';

export default class Player {
  id: string;
  game?: Game;
  socket?: Socket;

  private static players: Map<string, Player> = new Map();

  /**
   * Fetches a player from the server state by ID.
   * @param id 
   * @returns 
   */
  static getPlayer(id: string): Player | undefined {
    return this.players.get(id);
  }

  /**
   * Creates a new Player object, and added to the server state.
   */
  constructor(id: string) {
    this.id = id;
    Player.players.set(id, this);
  }

  /**
   * Joins the player into the room. Sets the room field of the player, and adds the player to the player list in the room.
   * @param room 
   */
  joinGame(game: Game): void {
    this.game = game;

    if (!game.player1) {
      game.player1 = this;
    } else if (!game.player2) {
      game.player2 = this;
    } else {
      throw new Error('Game already has two players');
    }
  }
}
