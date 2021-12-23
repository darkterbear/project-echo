import { randomId } from '../util';
import { Building, BuildingType, getTerrain } from 'echo';
import Player from './Player';

export default class Game {
  id: string;
  player1: Player;
  player2: Player;
  terrain: Building[];
  buildingTakenSquares: Set<number>;

  private static games: Map<string, Game> = new Map();

  /**
   * Generates a unique game id.
   * @returns 
   */
  static generateId(): string {
    const existingIds = new Set(this.games.keys());

    let id;
    do id = randomId(); while (existingIds.has(id));

    return id;
  }

  /**
   * Fetches a game from the server state by id.
   * @param id 
   * @returns 
   */
  static getGame(id: string): Game | undefined {
    return Game.games.get(id);
  }

  /**
   * Creates a new Game object, and added to the server state.
   */
  constructor() {
    this.id = Game.generateId();
    this.player1 = null;
    this.player2 = null;
    this.terrain = getTerrain();

    Game.games.set(this.id, this);
  }

  addBuilding(player: Player, position: [number, number], type: BuildingType): void {
    // Check if it conflicts with an existing building or terrain

    // Add the building

    // Update player visibility, send building updates for uncovered enemy buildings

    // Check if new building is visible by opponent, send building update
  }

  delete(): void {
    Game.games.delete(this.id);
  }
}