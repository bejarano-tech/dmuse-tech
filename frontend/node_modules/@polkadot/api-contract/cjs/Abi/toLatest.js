"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertVersions = exports.v0ToLatest = exports.v1ToLatest = exports.v2ToLatest = exports.v3ToLatest = exports.v4ToLatest = exports.enumVersions = void 0;
const toV1_js_1 = require("./toV1.js");
const toV2_js_1 = require("./toV2.js");
const toV3_js_1 = require("./toV3.js");
const toV4_js_1 = require("./toV4.js");
exports.enumVersions = ['V4', 'V3', 'V2', 'V1'];
function createConverter(next, step) {
    return (registry, input) => next(registry, step(registry, input));
}
function v4ToLatest(_registry, v4) {
    return v4;
}
exports.v4ToLatest = v4ToLatest;
exports.v3ToLatest = createConverter(v4ToLatest, toV4_js_1.v3ToV4);
exports.v2ToLatest = createConverter(exports.v3ToLatest, toV3_js_1.v2ToV3);
exports.v1ToLatest = createConverter(exports.v2ToLatest, toV2_js_1.v1ToV2);
exports.v0ToLatest = createConverter(exports.v1ToLatest, toV1_js_1.v0ToV1);
exports.convertVersions = [
    ['V4', v4ToLatest],
    ['V3', exports.v3ToLatest],
    ['V2', exports.v2ToLatest],
    ['V1', exports.v1ToLatest],
    ['V0', exports.v0ToLatest]
];
