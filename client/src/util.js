import { BuildingType } from "./components/Building";

export const SKY_BLUE = '#5adeff';
export const GRID_LINE_COLOR = '#cccccc';
export const GRASS_GREEN = '#52a523';
export const DARK_GREEN = '#347436';

export const PLANE_THICKNESS = 0.5;
export const GRID_SIZE = 50;

export const DEFAULT_TERRAIN = [
  { position: [10, 22], type: BuildingType.TERRAIN, friendly: false },
  { position: [13, 22], type: BuildingType.TERRAIN, friendly: false },
  { position: [16, 22], type: BuildingType.TERRAIN, friendly: false },
  { position: [22, 10], type: BuildingType.TERRAIN, friendly: false },
  { position: [22, 13], type: BuildingType.TERRAIN, friendly: false },
  { position: [22, 16], type: BuildingType.TERRAIN, friendly: false },

  { position: [40, 28], type: BuildingType.TERRAIN, friendly: false },
  { position: [37, 28], type: BuildingType.TERRAIN, friendly: false },
  { position: [34, 28], type: BuildingType.TERRAIN, friendly: false },
  { position: [28, 40], type: BuildingType.TERRAIN, friendly: false },
  { position: [28, 37], type: BuildingType.TERRAIN, friendly: false },
  { position: [28, 34], type: BuildingType.TERRAIN, friendly: false },

  { position: [21, 29], type: BuildingType.TERRAIN, friendly: false },
  { position: [29, 21], type: BuildingType.TERRAIN, friendly: false },
]

export const locToId = (loc) => loc[0] + loc[1] * GRID_SIZE;

export const buildConflict = (takenSquares, hoverLocation, type) => {
  switch (type) {
    case BuildingType.NEXUS:
    case BuildingType.FARM:
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (takenSquares.has(locToId([hoverLocation[0] + x, hoverLocation[1] + y]))) {
            return true;
          }
        }
      }
      break;
    case BuildingType.POWER_PLANT:
    case BuildingType.REFINERY:
    case BuildingType.BARRACKS:
    case BuildingType.TURRET:
      for (let x = -1; x <= 0; x++) {
        for (let y = 0; y <= 1; y++) {
          if (takenSquares.has(locToId([hoverLocation[0] + x, hoverLocation[1] + y]))) {
            return true;
          }
        }
      }
      break;
    case BuildingType.WATCHTOWER:
      if (takenSquares.has(locToId([hoverLocation[0], hoverLocation[1]]))) {
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
