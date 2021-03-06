export class Building {
  position: [number, number];
  type: BuildingType;
  completionTime?: number; // If not null, the building is current in construction to complete at the given time (ms epoch).

  constructor(position: [number, number], type: BuildingType, complete?: boolean) {
    this.position = position;
    this.type = type;
    if (!complete) {
      this.completionTime = Date.now() + getBuildingTime(type);
    }
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

export class ResourceSet {
  food: number;
  steel: number;
  energy: number;

  constructor(food: number = 0, steel: number = 0, energy: number = 0) {
    this.food = food;
    this.steel = steel;
    this.energy = energy;
  }

  capMax(max: ResourceSet) {
    this.food = Math.min(this.food, max.food);
    this.steel = Math.min(this.steel, max.steel);
    this.energy = Math.min(this.energy, max.energy);
  }

  sufficient(cost: ResourceSet) {
    return this.food >= cost.food && this.steel >= cost.steel && this.energy >= cost.energy;
  }

  deduct(cost: ResourceSet) {
    this.food -= cost.food;
    this.steel -= cost.steel;
    this.energy -= cost.energy;
  }

  static BUILDING_COSTS: { [key in BuildingType]?: ResourceSet } = {
    [BuildingType.POWER_PLANT]: new ResourceSet(1, 3, 2),
    [BuildingType.FARM]:        new ResourceSet(3, 1, 2),
    [BuildingType.REFINERY]:    new ResourceSet(2, 2, 2),
    [BuildingType.BARRACKS]:    new ResourceSet(3, 1, 2),
    [BuildingType.TURRET]:      new ResourceSet(2, 5, 5),
    [BuildingType.WATCHTOWER]:  new ResourceSet(0, 4, 2),
  };
}

export const locToId = (loc: [number, number]): number => {
  if (loc[0] < 0 || loc[1] < 0 || loc[0] >= GRID_SIZE || loc[1] >= GRID_SIZE) {
    return -1;
  }
  return loc[0] + loc[1] * GRID_SIZE;
};

export const idToLoc = (id: number): [number, number] => [id % GRID_SIZE, Math.floor(id / GRID_SIZE)];

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

export const sufficientResources = (type: BuildingType, resources: ResourceSet): boolean => {
  return type in ResourceSet.BUILDING_COSTS && resources.sufficient(ResourceSet.BUILDING_COSTS[type]);
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

export const player1Nexus = new Building([4, 4], BuildingType.NEXUS, true);
export const player2Nexus = new Building([44, 44], BuildingType.NEXUS, true);

export const getTerrain = (): Building[] => [
  new Building([9, 24], BuildingType.TERRAIN, true),
  new Building([12, 24], BuildingType.TERRAIN, true),
  new Building([15, 24], BuildingType.TERRAIN, true),
  new Building([33, 24], BuildingType.TERRAIN, true),
  new Building([36, 24], BuildingType.TERRAIN, true),
  new Building([39, 24], BuildingType.TERRAIN, true),
  new Building([24, 9], BuildingType.TERRAIN, true),
  new Building([24, 12], BuildingType.TERRAIN, true),
  new Building([24, 15], BuildingType.TERRAIN, true),
  new Building([24, 33], BuildingType.TERRAIN, true),
  new Building([24, 36], BuildingType.TERRAIN, true),
  new Building([24, 39], BuildingType.TERRAIN, true),
  new Building([21, 27], BuildingType.TERRAIN, true),
  new Building([27, 21], BuildingType.TERRAIN, true),
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

/**
 * @param buildings Buildings to consider
 * @param visibility Set of locations to inspect
 * @param takenSquares Map of locations to Buildings
 * @returns Array of buildings that are at least partially visible in visibility and are part of buildings
 */
export const getVisibleBuildings = (buildings: Building[], visibility: Set<number>, takenSquares: Map<number, Building>): Set<Building> => {
  const visibleBuildings = new Set<Building>();

  for (const id of visibility) {
    if (takenSquares.has(id)) {
      const building = takenSquares.get(id);
      if (buildings.includes(building))
        visibleBuildings.add(building);
    }
  }

  return visibleBuildings;
}

export const getBuildingTime = (type: BuildingType): number => {
  return 5000;
}

export const getMaxResources = (buildings: Building[]): ResourceSet => {
  const max = new ResourceSet();

  for (const b of buildings.filter(b => !b.completionTime)) {
    switch(b.type) {
      case BuildingType.NEXUS:
        max.energy += 10;
        max.food += 10;
        max.steel += 10;
        break;
      case BuildingType.FARM:
        max.food += 10;
        break;
      case BuildingType.POWER_PLANT:
        max.energy += 10;
        break;
      case BuildingType.REFINERY:
        max.steel += 10;
        break;
      default:
        break;
    }
  }

  return max;
};
