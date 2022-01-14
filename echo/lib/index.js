"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxResources = exports.getBuildingTime = exports.getVisibleBuildings = exports.getBuildingTakenSquares = exports.getTerrain = exports.player2Nexus = exports.player1Nexus = exports.GRID_SIZE = exports.buildConflict = exports.sufficientResources = exports.computeNewBuildingVisibility = exports.idToLoc = exports.locToId = exports.ResourceSet = exports.BuildingType = exports.Building = void 0;
class Building {
    constructor(position, type, complete) {
        this.position = position;
        this.type = type;
        if (!complete) {
            this.completionTime = Date.now() + (0, exports.getBuildingTime)(type);
        }
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
class ResourceSet {
    constructor(food = 0, steel = 0, energy = 0) {
        this.food = food;
        this.steel = steel;
        this.energy = energy;
    }
    capMax(max) {
        this.food = Math.min(this.food, max.food);
        this.steel = Math.min(this.steel, max.steel);
        this.energy = Math.min(this.energy, max.energy);
    }
    sufficient(cost) {
        return this.food >= cost.food && this.steel >= cost.steel && this.energy >= cost.energy;
    }
    deduct(cost) {
        this.food -= cost.food;
        this.steel -= cost.steel;
        this.energy -= cost.energy;
    }
}
exports.ResourceSet = ResourceSet;
ResourceSet.BUILDING_COSTS = {
    [BuildingType.POWER_PLANT]: new ResourceSet(1, 3, 2),
    [BuildingType.FARM]: new ResourceSet(3, 1, 2),
    [BuildingType.REFINERY]: new ResourceSet(2, 2, 2),
    [BuildingType.BARRACKS]: new ResourceSet(3, 1, 2),
    [BuildingType.TURRET]: new ResourceSet(2, 5, 5),
    [BuildingType.WATCHTOWER]: new ResourceSet(0, 4, 2),
};
const locToId = (loc) => {
    if (loc[0] < 0 || loc[1] < 0 || loc[0] >= exports.GRID_SIZE || loc[1] >= exports.GRID_SIZE) {
        return -1;
    }
    return loc[0] + loc[1] * exports.GRID_SIZE;
};
exports.locToId = locToId;
const idToLoc = (id) => [id % exports.GRID_SIZE, Math.floor(id / exports.GRID_SIZE)];
exports.idToLoc = idToLoc;
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
const sufficientResources = (type, resources) => {
    return type in ResourceSet.BUILDING_COSTS && resources.sufficient(ResourceSet.BUILDING_COSTS[type]);
};
exports.sufficientResources = sufficientResources;
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
exports.player1Nexus = new Building([4, 4], BuildingType.NEXUS, true);
exports.player2Nexus = new Building([44, 44], BuildingType.NEXUS, true);
const getTerrain = () => [
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
exports.getTerrain = getTerrain;
/**
 * Maps all occupied squares to the building that occupies them.
 */
const getBuildingTakenSquares = (buildings) => {
    const takenSquares = new Map();
    for (const b of buildings) {
        switch (b.type) {
            case BuildingType.NEXUS:
            case BuildingType.FARM:
            case BuildingType.TERRAIN:
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        takenSquares.set((0, exports.locToId)([b.position[0] + x, b.position[1] + y]), b);
                    }
                }
                break;
            case BuildingType.POWER_PLANT:
            case BuildingType.REFINERY:
            case BuildingType.BARRACKS:
            case BuildingType.TURRET:
                for (let x = -1; x <= 0; x++) {
                    for (let y = 0; y <= 1; y++) {
                        takenSquares.set((0, exports.locToId)([b.position[0] + x, b.position[1] + y]), b);
                    }
                }
                break;
            case BuildingType.WATCHTOWER:
                takenSquares.set((0, exports.locToId)([b.position[0], b.position[1]]), b);
                break;
            default:
                break;
        }
    }
    return takenSquares;
};
exports.getBuildingTakenSquares = getBuildingTakenSquares;
/**
 * @param buildings Buildings to consider
 * @param visibility Set of locations to inspect
 * @param takenSquares Map of locations to Buildings
 * @returns Array of buildings that are at least partially visible in visibility and are part of buildings
 */
const getVisibleBuildings = (buildings, visibility, takenSquares) => {
    const visibleBuildings = new Set();
    for (const id of visibility) {
        if (takenSquares.has(id)) {
            const building = takenSquares.get(id);
            if (buildings.includes(building))
                visibleBuildings.add(building);
        }
    }
    return visibleBuildings;
};
exports.getVisibleBuildings = getVisibleBuildings;
const getBuildingTime = (type) => {
    return 5000;
};
exports.getBuildingTime = getBuildingTime;
const getMaxResources = (buildings) => {
    const max = new ResourceSet();
    for (const b of buildings.filter(b => !b.completionTime)) {
        switch (b.type) {
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
exports.getMaxResources = getMaxResources;
//# sourceMappingURL=index.js.map