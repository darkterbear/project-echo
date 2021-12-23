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
export declare const computeNewBuildingVisibility: (friendlyBuildings: Building[]) => Set<unknown>;
export declare const buildConflict: (takenSquares: Set<number>, visibility: Set<number>, hoverLocation: [number, number], type: BuildingType) => boolean;
export declare const GRID_SIZE = 49;
export declare const perspectiveNexus: Building;
export declare const player2Nexus: Building;
export declare const getTerrain: () => Building[];
/**
 * Player perspective of all squares taken by buildings/terrain at start. Does not include opponent nexus.
 */
export declare const PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES: Set<unknown>;
/**
 * Server-side view of all squares that are taken by buildings/terrain at start (includes player 2 Nexus).
 */
export declare const DEFAULT_BUILDING_TAKEN_SQUARES: Set<unknown>;
