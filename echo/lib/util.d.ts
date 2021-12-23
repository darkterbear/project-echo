import Building, { BuildingType } from './Building';
export declare const locToId: (loc: [number, number]) => number;
export declare const idToLoc: (id: number) => [number, number];
export declare const flipLoc: (loc: [number, number]) => [number, number];
export declare const computeNewBuildingVisibility: (friendlyBuildings: Building[]) => Set<unknown>;
export declare const buildConflict: (takenSquares: Set<number>, visibility: Set<number>, hoverLocation: [number, number], type: BuildingType) => boolean;
