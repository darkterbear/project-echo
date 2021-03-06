import { Socket } from 'socket.io';
import Game from './Game';
import { BuildingType, computeNewBuildingVisibility, getBuildingTakenSquares, getVisibleBuildings, ResourceSet } from 'echo';
import Building from './Building';

export default class Player {
  id: string;
  game?: Game;
  socket?: Socket;
  buildings: Building[];
  resources: ResourceSet;
  visibility: Set<number>;

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
    this.resources = new ResourceSet();
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
      
      this.visibility = computeNewBuildingVisibility(this.buildings);
    } else if (!game.player2) {
      game.player2 = this;
      this.buildings = [new Building([44, 44], BuildingType.NEXUS, this, true)];
      this.visibility = computeNewBuildingVisibility(this.buildings);

      game.player1.buildings = [new Building([4, 4], BuildingType.NEXUS, game.player1, true)];
      game.player1.visibility = computeNewBuildingVisibility(game.player1.buildings);

      // Initialize building taken squares
      game.buildingTakenSquares = getBuildingTakenSquares(game.terrain.concat(this.buildings).concat(game.player1.buildings));
    } else {
      throw new Error('Game already has two players');
    }
  }

  opponent(): Player {
    if (this.game) {
      return this.game.player1 === this ? this.game.player2 : this.game.player1;
    } else {
      throw new Error('Player is not in a game');
    }
  }

  delete(): void {
    Player.players.delete(this.id);
  }

  canSeeOpponentBuilding(building: Building): boolean {
    return getVisibleBuildings([building], this.visibility, this.game.buildingTakenSquares).size > 0;
  }
}
