export declare class Building {
    position: [number, number];
    type: BuildingType;
    constructor(position: [number, number], type: BuildingType);
}
export declare enum BuildingType {
    NEXUS = "nexus",
    POWER_PLANT = "powerPlant",
    FARM = "farm",
    REFINERY = "refinery",
    BARRACKS = "barracks",
    TURRET = "turret",
    WATCHTOWER = "watchtower",
    TERRAIN = "terrain"
}
export declare const locToId: (loc: [number, number]) => number;
export declare const idToLoc: (id: number) => [number, number];
export declare const flipLoc: (loc: [number, number]) => [number, number];
export declare const computeNewBuildingVisibility: (friendlyBuildings: Building[]) => Set<number>;
export declare const buildConflict: (takenSquares: Map<number, Building>, visibility: Set<number>, hoverLocation: [number, number], type: BuildingType) => boolean;
export declare const GRID_SIZE = 49;
export declare const perspectiveNexus: Building;
export declare const player2Nexus: Building;
export declare const getTerrain: () => Building[];
/**
 * Maps all occupied squares to the building that occupies them.
 */
export declare const getBuildingTakenSquares: (buildings: Building[]) => Map<number, Building>;
/**
 * @param buildings Buildings to consider
 * @param visibility Set of locations to inspect
 * @param takenSquares Map of locations to Buildings
 * @returns Array of buildings that are at least partially visible in visibility and are part of buildings
 */
export declare const getVisibleBuildings: (buildings: Building[], visibility: Set<number>, takenSquares: Map<number, Building>) => Set<Building>;
