import { Socket } from 'socket.io';
import Building, { BuildingType } from './Building';
import Game from './Game';
import { flipLoc } from './util';

export default class Player {
  id: string;
  game?: Game;
  socket?: Socket;
  buildings: Building[];

  private static players: Map<string, Player> = new Map();

  /**
   * Fetches a player from the server state by ID.
   * @param id 
   * @returns 
   */
  static getPlayer(id: string): Player | undefined {
    return Player.players.get(id);
  }

  /**
   * Creates a new Player object, and added to the server state.
   */
  constructor(id: string) {
    this.id = id;
    this.buildings = [];
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
      this.buildings = [new Building([4, 4], BuildingType.NEXUS)];
    } else if (!game.player2) {
      game.player2 = this;
      this.buildings = [new Building(flipLoc([4, 4]), BuildingType.NEXUS)];
    } else {
      throw new Error('Game already has two players');
    }
  }

  delete(): void {
    Player.players.delete(this.id);
  }
}
