"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BUILDING_TAKEN_SQUARES = exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES = exports.getTerrain = exports.player2Nexus = exports.perspectiveNexus = exports.GRID_SIZE = exports.buildConflict = exports.computeNewBuildingVisibility = exports.flipLoc = exports.idToLoc = exports.locToId = exports.BuildingType = exports.Building = void 0;
class Building {
    constructor(position, type) {
        this.position = position;
        this.type = type;
    }
}
exports.Building = Building;
var BuildingType;
(function (BuildingType) {
    BuildingType["NEXUS"] = "nexus";
    BuildingType["POWER_PLANT"] = "powerPlant";
    BuildingType["FARM"] = "farm";
    BuildingType["REFINERY"] = "refinery";
    BuildingType["BARRACKS"] = "barracks";
    BuildingType["TURRET"] = "turret";
    BuildingType["WATCHTOWER"] = "watchtower";
    BuildingType["TERRAIN"] = "terrain";
})(BuildingType = exports.BuildingType || (exports.BuildingType = {}));
const locToId = (loc) => {
    if (loc[0] < 0 || loc[1] < 0 || loc[0] >= exports.GRID_SIZE || loc[1] >= exports.GRID_SIZE) {
        return -1;
    }
    return loc[0] + loc[1] * exports.GRID_SIZE;
};
exports.locToId = locToId;
const idToLoc = (id) => [id % exports.GRID_SIZE, Math.floor(id / exports.GRID_SIZE)];
exports.idToLoc = idToLoc;
const flipLoc = (loc) => [exports.GRID_SIZE - 1 - loc[0], exports.GRID_SIZE - 1 - loc[1]];
exports.flipLoc = flipLoc;
const computeNewBuildingVisibility = (friendlyBuildings) => {
    const visibility = new Set();
    for (const building of friendlyBuildings) {
        switch (building.type) {
            case BuildingType.NEXUS:
            case BuildingType.FARM:
                for (let x = -4; x <= 4; x++) {
                    for (let y = -4; y <= 4; y++) {
                        visibility.add((0, exports.locToId)([building.position[0] + x, building.position[1] + y]));
                    }
                }
                break;
            case BuildingType.POWER_PLANT:
            case BuildingType.REFINERY:
            case BuildingType.BARRACKS:
            case BuildingType.TURRET:
                for (let x = -4; x <= 3; x++) {
                    for (let y = -3; y <= 4; y++) {
                        visibility.add((0, exports.locToId)([building.position[0] + x, building.position[1] + y]));
                    }
                }
                break;
            case BuildingType.WATCHTOWER:
                for (let x = -5; x <= 5; x++) {
                    for (let y = -5; y <= 5; y++) {
                        visibility.add((0, exports.locToId)([building.position[0] + x, building.position[1] + y]));
                    }
                }
                break;
            default:
                break;
        }
    }
    return visibility;
};
exports.computeNewBuildingVisibility = computeNewBuildingVisibility;
const buildConflict = (takenSquares, visibility, hoverLocation, type) => {
    switch (type) {
        case BuildingType.NEXUS:
        case BuildingType.FARM:
            if (hoverLocation[0] < 1 || hoverLocation[0] > exports.GRID_SIZE - 1 || hoverLocation[1] < 1 || hoverLocation[1] > exports.GRID_SIZE - 1) {
                return true;
            }
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (takenSquares.has((0, exports.locToId)([hoverLocation[0] + x, hoverLocation[1] + y]))) {
                        return true;
                    }
                    if (!visibility.has((0, exports.locToId)([hoverLocation[0] + x, hoverLocation[1] + y]))) {
                        return true;
                    }
                }
            }
            break;
        case BuildingType.POWER_PLANT:
        case BuildingType.REFINERY:
        case BuildingType.BARRACKS:
        case BuildingType.TURRET:
            if (hoverLocation[0] < 1 || hoverLocation[1] > exports.GRID_SIZE - 1) {
                return true;
            }
            for (let x = -1; x <= 0; x++) {
                for (let y = 0; y <= 1; y++) {
                    if (takenSquares.has((0, exports.locToId)([hoverLocation[0] + x, hoverLocation[1] + y]))) {
                        return true;
                    }
                    if (!visibility.has((0, exports.locToId)([hoverLocation[0] + x, hoverLocation[1] + y]))) {
                        return true;
                    }
                }
            }
            break;
        case BuildingType.WATCHTOWER:
            if (takenSquares.has((0, exports.locToId)([hoverLocation[0], hoverLocation[1]]))) {
                return true;
            }
            if (!visibility.has((0, exports.locToId)([hoverLocation[0], hoverLocation[1]]))) {
                return true;
            }
            break;
        default:
            return true;
    }
    return false;
};
exports.buildConflict = buildConflict;
exports.GRID_SIZE = 49;
exports.perspectiveNexus = new Building([4, 4], BuildingType.NEXUS);
exports.player2Nexus = new Building([44, 44], BuildingType.NEXUS);
const getTerrain = () => [
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
exports.getTerrain = getTerrain;
/**
 * Player perspective of all squares taken by buildings/terrain at start. Does not include opponent nexus.
 */
exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES = new Set();
for (const b of (0, exports.getTerrain)().concat(exports.perspectiveNexus)) {
    switch (b.type) {
        case BuildingType.NEXUS:
        case BuildingType.FARM:
        case BuildingType.TERRAIN:
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES.add((0, exports.locToId)([b.position[0] + x, b.position[1] + y]));
                }
            }
            break;
        case BuildingType.POWER_PLANT:
        case BuildingType.REFINERY:
        case BuildingType.BARRACKS:
        case BuildingType.TURRET:
            for (let x = -1; x <= 0; x++) {
                for (let y = 0; y <= 1; y++) {
                    exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES.add((0, exports.locToId)([b.position[0] + x, b.position[1] + y]));
                }
            }
            break;
        case BuildingType.WATCHTOWER:
            exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES.add((0, exports.locToId)([b.position[0], b.position[1]]));
            break;
        default:
            break;
    }
}
/**
 * Server-side view of all squares that are taken by buildings/terrain at start (includes player 2 Nexus).
 */
exports.DEFAULT_BUILDING_TAKEN_SQUARES = new Set(exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES);
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        exports.DEFAULT_BUILDING_TAKEN_SQUARES.add((0, exports.locToId)([exports.player2Nexus.position[0] + x, exports.player2Nexus.position[1] + y]));
    }
}
//# sourceMappingURL=index.js.map