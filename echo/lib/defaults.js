"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BUILDING_TAKEN_SQUARES = exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES = exports.getTerrain = exports.player2Nexus = exports.perspectiveNexus = exports.GRID_SIZE = void 0;
const _1 = require("./");
const Building_1 = __importStar(require("./Building"));
exports.GRID_SIZE = 49;
exports.perspectiveNexus = new Building_1.default([4, 4], Building_1.BuildingType.NEXUS);
exports.player2Nexus = new Building_1.default([44, 44], Building_1.BuildingType.NEXUS);
const getTerrain = () => [
    new Building_1.default([9, 24], Building_1.BuildingType.TERRAIN),
    new Building_1.default([12, 24], Building_1.BuildingType.TERRAIN),
    new Building_1.default([15, 24], Building_1.BuildingType.TERRAIN),
    new Building_1.default([33, 24], Building_1.BuildingType.TERRAIN),
    new Building_1.default([36, 24], Building_1.BuildingType.TERRAIN),
    new Building_1.default([39, 24], Building_1.BuildingType.TERRAIN),
    new Building_1.default([24, 9], Building_1.BuildingType.TERRAIN),
    new Building_1.default([24, 12], Building_1.BuildingType.TERRAIN),
    new Building_1.default([24, 15], Building_1.BuildingType.TERRAIN),
    new Building_1.default([24, 33], Building_1.BuildingType.TERRAIN),
    new Building_1.default([24, 36], Building_1.BuildingType.TERRAIN),
    new Building_1.default([24, 39], Building_1.BuildingType.TERRAIN),
    new Building_1.default([21, 27], Building_1.BuildingType.TERRAIN),
    new Building_1.default([27, 21], Building_1.BuildingType.TERRAIN),
];
exports.getTerrain = getTerrain;
/**
 * Player perspective of all squares taken by buildings/terrain at start. Does not include opponent nexus.
 */
exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES = new Set();
for (const b of (0, exports.getTerrain)().concat(exports.perspectiveNexus)) {
    switch (b.type) {
        case Building_1.BuildingType.NEXUS:
        case Building_1.BuildingType.FARM:
        case Building_1.BuildingType.TERRAIN:
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES.add(_1.util.locToId([b.position[0] + x, b.position[1] + y]));
                }
            }
            break;
        case Building_1.BuildingType.POWER_PLANT:
        case Building_1.BuildingType.REFINERY:
        case Building_1.BuildingType.BARRACKS:
        case Building_1.BuildingType.TURRET:
            for (let x = -1; x <= 0; x++) {
                for (let y = 0; y <= 1; y++) {
                    exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES.add(_1.util.locToId([b.position[0] + x, b.position[1] + y]));
                }
            }
            break;
        case Building_1.BuildingType.WATCHTOWER:
            exports.PERSPECTIVE_DEFAULT_BUILDING_TAKEN_SQUARES.add(_1.util.locToId([b.position[0], b.position[1]]));
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
        exports.DEFAULT_BUILDING_TAKEN_SQUARES.add(_1.util.locToId([exports.player2Nexus.position[0] + x, exports.player2Nexus.position[1] + y]));
    }
}
//# sourceMappingURL=defaults.js.map