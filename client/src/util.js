import { BuildingType } from "./components/Building";

export const SKY_BLUE = '#5adeff';
export const GRID_LINE_COLOR = '#cccccc';
export const DARK_GREEN = '#347436';

export const PLANE_THICKNESS = 0.5;
export const GRID_SIZE = 49;

export const DEFAULT_TERRAIN = [
  { position: [4, 4], type: BuildingType.NEXUS, friendly: true },
  
  { position: [9, 24], type: BuildingType.TERRAIN, friendly: false },
  { position: [12, 24], type: BuildingType.TERRAIN, friendly: false },
  { position: [15, 24], type: BuildingType.TERRAIN, friendly: false },
  { position: [33, 24], type: BuildingType.TERRAIN, friendly: false },
  { position: [36, 24], type: BuildingType.TERRAIN, friendly: false },
  { position: [39, 24], type: BuildingType.TERRAIN, friendly: false },

  { position: [24, 9], type: BuildingType.TERRAIN, friendly: false },
  { position: [24, 12], type: BuildingType.TERRAIN, friendly: false },
  { position: [24, 15], type: BuildingType.TERRAIN, friendly: false },
  { position: [24, 33], type: BuildingType.TERRAIN, friendly: false },
  { position: [24, 36], type: BuildingType.TERRAIN, friendly: false },
  { position: [24, 39], type: BuildingType.TERRAIN, friendly: false },

  { position: [21, 27], type: BuildingType.TERRAIN, friendly: false },
  { position: [27, 21], type: BuildingType.TERRAIN, friendly: false },
];

export const locToId = (loc) => {
  if (loc[0] < 0 || loc[1] < 0 || loc[0] >= GRID_SIZE || loc[1] >= GRID_SIZE) {
    return -1;
  }
  return loc[0] + loc[1] * GRID_SIZE;
};
export const idToLoc = (id) => [id % GRID_SIZE, Math.floor(id / GRID_SIZE)];

export const DEFAULT_BUILDING_TAKEN_SQUARES = new Set();

for (const defaultBuilding of DEFAULT_TERRAIN) {
  switch (defaultBuilding.type) {
    case BuildingType.NEXUS:
    case BuildingType.FARM:
    case BuildingType.TERRAIN:
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          DEFAULT_BUILDING_TAKEN_SQUARES.add(locToId([defaultBuilding.position[0] + x, defaultBuilding.position[1] + y]));
        }
      }
      break;
    case BuildingType.POWER_PLANT:
    case BuildingType.REFINERY:
    case BuildingType.BARRACKS:
    case BuildingType.TURRET:
      for (let x = -1; x <= 0; x++) {
        for (let y = 0; y <= 1; y++) {
          DEFAULT_BUILDING_TAKEN_SQUARES.add(locToId([defaultBuilding.position[0] + x, defaultBuilding.position[1] + y]));
        }
      }
      break;
    case BuildingType.WATCHTOWER:
      DEFAULT_BUILDING_TAKEN_SQUARES.add(locToId([defaultBuilding.position[0], defaultBuilding.position[1]]));
      break;
    default:
      break;
  }
}

export const computeNewBuildingVisibility = (buildings) => {
  const visibility = new Set();
  for (const building of buildings.filter(b => b.friendly)) {
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

export const DEFAULT_BUILDING_VISIBLE_SQUARES = computeNewBuildingVisibility(DEFAULT_TERRAIN);

export const buildConflict = (takenSquares, visibility, hoverLocation, type) => {
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

export const keyToType = (k) => {
  if (k === '1') {
    return (BuildingType.NEXUS);
  } else if (k === '2') {
    return (BuildingType.POWER_PLANT);
  } else if (k === '3') {
    return (BuildingType.FARM);
  } else if (k === '4') {
    return (BuildingType.REFINERY);
  } else if (k === '5') {
    return (BuildingType.BARRACKS);
  } else if (k === '6') {
    return (BuildingType.TURRET);
  } else if (k === '7') {
    return (BuildingType.WATCHTOWER);
  } else return null;
}
