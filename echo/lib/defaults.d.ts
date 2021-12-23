import Building from './Building';
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
