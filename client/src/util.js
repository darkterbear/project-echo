import { BuildingType } from "./components/Building";

export const SKY_BLUE = '#5adeff';
export const GRID_LINE_COLOR = '#cccccc';
export const DARK_GREEN = '#347436';

export const PLANE_THICKNESS = 0.5;

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
