"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConflict = exports.computeNewBuildingVisibility = exports.flipLoc = exports.idToLoc = exports.locToId = void 0;
const Building_1 = require("./Building");
const defaults_1 = require("./defaults");
const locToId = (loc) => {
    if (loc[0] < 0 || loc[1] < 0 || loc[0] >= defaults_1.GRID_SIZE || loc[1] >= defaults_1.GRID_SIZE) {
        return -1;
    }
    return loc[0] + loc[1] * defaults_1.GRID_SIZE;
};
exports.locToId = locToId;
const idToLoc = (id) => [id % defaults_1.GRID_SIZE, Math.floor(id / defaults_1.GRID_SIZE)];
exports.idToLoc = idToLoc;
const flipLoc = (loc) => [defaults_1.GRID_SIZE - 1 - loc[0], defaults_1.GRID_SIZE - 1 - loc[1]];
exports.flipLoc = flipLoc;
const computeNewBuildingVisibility = (friendlyBuildings) => {
    const visibility = new Set();
    for (const building of friendlyBuildings) {
        switch (building.type) {
            case Building_1.BuildingType.NEXUS:
            case Building_1.BuildingType.FARM:
                for (let x = -4; x <= 4; x++) {
                    for (let y = -4; y <= 4; y++) {
                        visibility.add((0, exports.locToId)([building.position[0] + x, building.position[1] + y]));
                    }
                }
                break;
            case Building_1.BuildingType.POWER_PLANT:
            case Building_1.BuildingType.REFINERY:
            case Building_1.BuildingType.BARRACKS:
            case Building_1.BuildingType.TURRET:
                for (let x = -4; x <= 3; x++) {
                    for (let y = -3; y <= 4; y++) {
                        visibility.add((0, exports.locToId)([building.position[0] + x, building.position[1] + y]));
                    }
                }
                break;
            case Building_1.BuildingType.WATCHTOWER:
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
        case Building_1.BuildingType.NEXUS:
        case Building_1.BuildingType.FARM:
            if (hoverLocation[0] < 1 || hoverLocation[0] > defaults_1.GRID_SIZE - 1 || hoverLocation[1] < 1 || hoverLocation[1] > defaults_1.GRID_SIZE - 1) {
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
        case Building_1.BuildingType.POWER_PLANT:
        case Building_1.BuildingType.REFINERY:
        case Building_1.BuildingType.BARRACKS:
        case Building_1.BuildingType.TURRET:
            if (hoverLocation[0] < 1 || hoverLocation[1] > defaults_1.GRID_SIZE - 1) {
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
        case Building_1.BuildingType.WATCHTOWER:
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
//# sourceMappingURL=util.js.map