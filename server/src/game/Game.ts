import { randomId } from '../util';
import { Building, BuildingType, getTerrain, buildConflict, computeNewBuildingVisibility, getVisibleBuildings } from 'echo';
import Player from './Player';

export default class Game {
  id: string;
  player1: Player;
  player2: Player;
  terrain: Building[];
  buildingTakenSquares: Map<number, Building>;

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
    if (buildConflict(this.buildingTakenSquares, player.visibility, position, type)) {
      throw new Error('Building conflicts with existing terrain or building');
    }

    // Add the building
    const building = new Building(position, type);
    player.buildings.push(building);

    // Update player visibility, send building updates for uncovered enemy buildings
    const opponent = player.opponent();
    const preVisible = getVisibleBuildings(opponent.buildings, player.visibility, this.buildingTakenSquares);
    player.visibility = computeNewBuildingVisibility(player.buildings);
    const postVisible = getVisibleBuildings(opponent.buildings, player.visibility, this.buildingTakenSquares);
    
    player.socket.emit('update_buildings', {
      type: 'add',
      buildings: [...postVisible].filter(b => !preVisible.has(b)),
    });

    // Check if new building is visible by opponent, send building update
    if (getVisibleBuildings([building], opponent.visibility, this.buildingTakenSquares).size > 0) {
      opponent.socket.emit('update_buildings', {
        type: 'add',
        buildings: [building],
      });
    }
  }

  delete(): void {
    Game.games.delete(this.id);
  }
}