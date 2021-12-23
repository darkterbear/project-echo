export class Building {
  position: [number, number];
  type: BuildingType;

  constructor(position: [number, number], type: BuildingType) {
    this.position = position;
    this.type = type;
  }
}

export enum BuildingType {
  NEXUS = 'nexus',
  POWER_PLANT = 'powerPlant',
  FARM = 'farm',
  REFINERY = 'refinery',
  BARRACKS = 'barracks',
  TURRET = 'turret',
  WATCHTOWER = 'watchtower',
  TERRAIN = 'terrain',
}

export const locToId = (loc: [number, number]): number => {
  if (loc[0] < 0 || loc[1] < 0 || loc[0] >= GRID_SIZE || loc[1] >= GRID_SIZE) {
    return -1;
  }
  return loc[0] + loc[1] * GRID_SIZE;
};

export const idToLoc = (id: number): [number, number] => [id % GRID_SIZE, Math.floor(id / GRID_SIZE)];

export const flipLoc = (loc: [number, number]): [number, number] => [GRID_SIZE - 1 - loc[0], GRID_SIZE - 1 - loc[1]];

export const computeNewBuildingVisibility = (friendlyBuildings: Building[]) => {
  const visibility = new Set<number>();
  for (const building of friendlyBuildings) {
    switch (building.type) {
      case BuildingType.NEXUS:
      case BuildingType.FARM:
        for (let x = -4; x <= 4; x++) {
          for (let y = -4; y <= 4; y++) {
            visibility.add(locToId([building.position[0] + x, building.position[1] + y]));
          }
        }
        break;
      case BuildingType.POWER_PLANT:
      case BuildingType.REFINERY:
      case BuildingType.BARRACKS:
      case BuildingType.TURRET:
        for (let x = -4; x <= 3; x++) {
          for (let y = -3; y <= 4; y++) {
            visibility.add(locToId([building.position[0] + x, building.position[1] + y]));
          }
        }
        break;
      case BuildingType.WATCHTOWER:
        for (let x = -5; x <= 5; x++) {
          for (let y = -5; y <= 5; y++) {
            visibility.add(locToId([building.position[0] + x, building.position[1] + y]));
          }
        }
        break;
      default:
        break;
    }
  }
  return visibility;
}

export const buildConflict = (takenSquares: Map<number, Building>, visibility: Set<number>, hoverLocation: [number, number], type: BuildingType) => {
  switch (type) {
    case BuildingType.NEXUS:
    case BuildingType.FARM:
      if (hoverLocation[0] < 1 || hoverLocation[0] > GRID_SIZE - 1 || hoverLocation[1] < 1 || hoverLocation[1] > GRID_SIZE - 1) {
        return true;
      }

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (takenSquares.has(locToId([hoverLocation[0] + x, hoverLocation[1] + y]))) {
            return true;
          }

          if (!visibility.has(locToId([hoverLocation[0] + x, hoverLocation[1] + y]))) {
            return true;
          }
        }
      }
      break;
    case BuildingType.POWER_PLANT:
    case BuildingType.REFINERY:
    case BuildingType.BARRACKS:
    case BuildingType.TURRET:
      if (hoverLocation[0] < 1 || hoverLocation[1] > GRID_SIZE - 1) {
        return true;
      }

      for (let x = -1; x <= 0; x++) {
        for (let y = 0; y <= 1; y++) {
          if (takenSquares.has(locToId([hoverLocation[0] + x, hoverLocation[1] + y]))) {
            return true;
          }

          if (!visibility.has(locToId([hoverLocation[0] + x, hoverLocation[1] + y]))) {
            return true;
          }
        }
      }
      break;
    case BuildingType.WATCHTOWER:
      if (takenSquares.has(locToId([hoverLocation[0], hoverLocation[1]]))) {
        return true;
      }

      if (!visibility.has(locToId([hoverLocation[0], hoverLocation[1]]))) {
        return true;
      }
      break;
    default:
      return true;
  }
  return false;
}

export const GRID_SIZE = 49;

export const perspectiveNexus = new Building([4, 4], BuildingType.NEXUS);
export const player2Nexus = new Building([44, 44], BuildingType.NEXUS);

export const getTerrain = (): Building[] => [
  new Building([9, 24], BuildingType.TERRAIN),
  new Building([12, 24], BuildingType.TERRAIN),
  new Building([15, 24], BuildingType.TERRAIN),
  new Building([33, 24], BuildingType.TERRAIN),
  new Building([36, 24], BuildingType.TERRAIN),
  new Building([39, 24], BuildingType.TERRAIN),
  new Building([24, 9], BuildingType.TERRAIN),
  new Building([24, 12], BuildingType.TERRAIN),
  new Building([24, 15], BuildingType.TERRAIN),
  new Building([24, 33], BuildingType.TERRAIN),
  new Building([24, 36], BuildingType.TERRAIN),
  new Building([24, 39], BuildingType.TERRAIN),
  new Building([21, 27], BuildingType.TERRAIN),
  new Building([27, 21], BuildingType.TERRAIN),
];

/**
 * Maps all occupied squares to the building that occupies them.
 */
export const getBuildingTakenSquares = (buildings: Building[]): Map<number, Building> => {
  const takenSquares = new Map<number, Building>();
  for (const b of buildings) {
    switch (b.type) {
      case BuildingType.NEXUS:
      case BuildingType.FARM:
      case BuildingType.TERRAIN:
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            takenSquares.set(locToId([b.position[0] + x, b.position[1] + y]), b);
          }
        }
        break;
      case BuildingType.POWER_PLANT:
      case BuildingType.REFINERY:
      case BuildingType.BARRACKS:
      case BuildingType.TURRET:
        for (let x = -1; x <= 0; x++) {
          for (let y = 0; y <= 1; y++) {
            takenSquares.set(locToId([b.position[0] + x, b.position[1] + y]), b);
          }
        }
        break;
      case BuildingType.WATCHTOWER:
        takenSquares.set(locToId([b.position[0], b.position[1]]), b);
        break;
      default:
        break;
    }
  }
  return takenSquares;
}
