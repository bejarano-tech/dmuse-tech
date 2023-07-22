import { v0ToV1 } from './toV1.js';
import { v1ToV2 } from './toV2.js';
import { v2ToV3 } from './toV3.js';
import { v3ToV4 } from './toV4.js';
export const enumVersions = ['V4', 'V3', 'V2', 'V1'];
function createConverter(next, step) {
    return (registry, input) => next(registry, step(registry, input));
}
export function v4ToLatest(_registry, v4) {
    return v4;
}
export const v3ToLatest = /*#__PURE__*/ createConverter(v4ToLatest, v3ToV4);
export const v2ToLatest = /*#__PURE__*/ createConverter(v3ToLatest, v2ToV3);
export const v1ToLatest = /*#__PURE__*/ createConverter(v2ToLatest, v1ToV2);
export const v0ToLatest = /*#__PURE__*/ createConverter(v1ToLatest, v0ToV1);
export const convertVersions = [
    ['V4', v4ToLatest],
    ['V3', v3ToLatest],
    ['V2', v2ToLatest],
    ['V1', v1ToLatest],
    ['V0', v0ToLatest]
];
