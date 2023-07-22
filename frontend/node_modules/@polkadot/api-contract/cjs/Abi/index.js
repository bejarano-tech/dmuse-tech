"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Abi = void 0;
const types_1 = require("@polkadot/types");
const types_create_1 = require("@polkadot/types-create");
const util_1 = require("@polkadot/util");
const toLatest_js_1 = require("./toLatest.js");
const l = (0, util_1.logger)('Abi');
const PRIMITIVE_ALWAYS = ['AccountId', 'AccountIndex', 'Address', 'Balance'];
function findMessage(list, messageOrId) {
    const message = (0, util_1.isNumber)(messageOrId)
        ? list[messageOrId]
        : (0, util_1.isString)(messageOrId)
            ? list.find(({ identifier }) => [identifier, (0, util_1.stringCamelCase)(identifier)].includes(messageOrId.toString()))
            : messageOrId;
    return (0, util_1.assertReturn)(message, () => `Attempted to call an invalid contract interface, ${(0, util_1.stringify)(messageOrId)}`);
}
function getLatestMeta(registry, json) {
    // this is for V1, V2, V3
    const vx = toLatest_js_1.enumVersions.find((v) => (0, util_1.isObject)(json[v]));
    // this was added in V4
    const jsonVersion = json.version;
    if (!vx && jsonVersion && !toLatest_js_1.enumVersions.find((v) => v === `V${jsonVersion}`)) {
        throw new Error(`Unable to handle version ${jsonVersion}`);
    }
    const metadata = registry.createType('ContractMetadata', vx
        ? { [vx]: json[vx] }
        : jsonVersion
            ? { [`V${jsonVersion}`]: json }
            : { V0: json });
    const converter = toLatest_js_1.convertVersions.find(([v]) => metadata[`is${v}`]);
    if (!converter) {
        throw new Error(`Unable to convert ABI with version ${metadata.type} to latest`);
    }
    return converter[1](registry, metadata[`as${converter[0]}`]);
}
function parseJson(json, chainProperties) {
    const registry = new types_1.TypeRegistry();
    const info = registry.createType('ContractProjectInfo', json);
    const latest = getLatestMeta(registry, json);
    const lookup = registry.createType('PortableRegistry', { types: latest.types }, true);
    // attach the lookup to the registry - now the types are known
    registry.setLookup(lookup);
    if (chainProperties) {
        registry.setChainProperties(chainProperties);
    }
    // warm-up the actual type, pre-use
    lookup.types.forEach(({ id }) => lookup.getTypeDef(id));
    return [json, registry, latest, info];
}
/**
 * @internal
 * Determines if the given input value is a ContractTypeSpec
 */
function isTypeSpec(value) {
    return !!value && value instanceof Map && !(0, util_1.isUndefined)(value.type) && !(0, util_1.isUndefined)(value.displayName);
}
/**
 * @internal
 * Determines if the given input value is an Option
 */
function isOption(value) {
    return !!value && value instanceof types_1.Option;
}
class Abi {
    constructor(abiJson, chainProperties) {
        this.environment = new Map();
        this.__internal__createArgs = (args, spec) => {
            return args.map(({ label, type }, index) => {
                try {
                    if (!(0, util_1.isObject)(type)) {
                        throw new Error('Invalid type definition found');
                    }
                    const displayName = type.displayName.length
                        ? type.displayName[type.displayName.length - 1].toString()
                        : undefined;
                    const camelName = (0, util_1.stringCamelCase)(label);
                    if (displayName && PRIMITIVE_ALWAYS.includes(displayName)) {
                        return {
                            name: camelName,
                            type: {
                                info: types_create_1.TypeDefInfo.Plain,
                                type: displayName
                            }
                        };
                    }
                    const typeDef = this.registry.lookup.getTypeDef(type.type);
                    return {
                        name: camelName,
                        type: displayName && !typeDef.type.startsWith(displayName)
                            ? { displayName, ...typeDef }
                            : typeDef
                    };
                }
                catch (error) {
                    l.error(`Error expanding argument ${index} in ${(0, util_1.stringify)(spec)}`);
                    throw error;
                }
            });
        };
        this.__internal__createEvent = (spec, index) => {
            const args = this.__internal__createArgs(spec.args, spec);
            const event = {
                args,
                docs: spec.docs.map((d) => d.toString()),
                fromU8a: (data) => ({
                    args: this.__internal__decodeArgs(args, data),
                    event
                }),
                identifier: spec.label.toString(),
                index
            };
            return event;
        };
        this.__internal__createMessage = (spec, index, add = {}) => {
            const args = this.__internal__createArgs(spec.args, spec);
            const identifier = spec.label.toString();
            const message = {
                ...add,
                args,
                docs: spec.docs.map((d) => d.toString()),
                fromU8a: (data) => ({
                    args: this.__internal__decodeArgs(args, data),
                    message
                }),
                identifier,
                index,
                isDefault: spec.default.isTrue,
                method: (0, util_1.stringCamelCase)(identifier),
                path: identifier.split('::').map((s) => (0, util_1.stringCamelCase)(s)),
                selector: spec.selector,
                toU8a: (params) => this.__internal__encodeArgs(spec, args, params)
            };
            return message;
        };
        this.__internal__decodeArgs = (args, data) => {
            // for decoding we expect the input to be just the arg data, no selectors
            // no length added (this allows use with events as well)
            let offset = 0;
            return args.map(({ type: { lookupName, type } }) => {
                const value = this.registry.createType(lookupName || type, data.subarray(offset));
                offset += value.encodedLength;
                return value;
            });
        };
        this.__internal__decodeMessage = (type, list, data) => {
            const [, trimmed] = (0, util_1.compactStripLength)(data);
            const selector = trimmed.subarray(0, 4);
            const message = list.find((m) => m.selector.eq(selector));
            if (!message) {
                throw new Error(`Unable to find ${type} with selector ${(0, util_1.u8aToHex)(selector)}`);
            }
            return message.fromU8a(trimmed.subarray(4));
        };
        this.__internal__encodeArgs = ({ label, selector }, args, data) => {
            if (data.length !== args.length) {
                throw new Error(`Expected ${args.length} arguments to contract message '${label.toString()}', found ${data.length}`);
            }
            return (0, util_1.compactAddLength)((0, util_1.u8aConcat)(this.registry.createType('ContractSelector', selector).toU8a(), ...args.map(({ type: { lookupName, type } }, index) => this.registry.createType(lookupName || type, data[index]).toU8a())));
        };
        [this.json, this.registry, this.metadata, this.info] = parseJson((0, util_1.isString)(abiJson)
            ? JSON.parse(abiJson)
            : abiJson, chainProperties);
        this.constructors = this.metadata.spec.constructors.map((spec, index) => this.__internal__createMessage(spec, index, {
            isConstructor: true,
            isDefault: spec.default.isTrue,
            isPayable: spec.payable.isTrue,
            returnType: spec.returnType.isSome
                ? this.registry.lookup.getTypeDef(spec.returnType.unwrap().type)
                : null
        }));
        this.events = this.metadata.spec.events.map((spec, index) => this.__internal__createEvent(spec, index));
        this.messages = this.metadata.spec.messages.map((spec, index) => this.__internal__createMessage(spec, index, {
            isDefault: spec.default.isTrue,
            isMutating: spec.mutates.isTrue,
            isPayable: spec.payable.isTrue,
            returnType: spec.returnType.isSome
                ? this.registry.lookup.getTypeDef(spec.returnType.unwrap().type)
                : null
        }));
        // NOTE See the rationale for having Option<...> values in the actual
        // ContractEnvironmentV4 structure definition in interfaces/contractsAbi
        // (Due to conversions, the fields may not exist)
        for (const [key, opt] of this.metadata.spec.environment.entries()) {
            if (isOption(opt)) {
                if (opt.isSome) {
                    const value = opt.unwrap();
                    if ((0, util_1.isBn)(value)) {
                        this.environment.set(key, value);
                    }
                    else if (isTypeSpec(value)) {
                        this.environment.set(key, this.registry.lookup.getTypeDef(value.type));
                    }
                    else {
                        throw new Error(`Invalid environment definition for ${key}:: Expected either Number or ContractTypeSpec`);
                    }
                }
            }
            else {
                throw new Error(`Expected Option<*> definition for ${key} in ContractEnvironment`);
            }
        }
    }
    /**
     * Warning: Unstable API, bound to change
     */
    decodeEvent(data) {
        const index = data[0];
        const event = this.events[index];
        if (!event) {
            throw new Error(`Unable to find event with index ${index}`);
        }
        return event.fromU8a(data.subarray(1));
    }
    /**
     * Warning: Unstable API, bound to change
     */
    decodeConstructor(data) {
        return this.__internal__decodeMessage('message', this.constructors, data);
    }
    /**
     * Warning: Unstable API, bound to change
     */
    decodeMessage(data) {
        return this.__internal__decodeMessage('message', this.messages, data);
    }
    findConstructor(constructorOrId) {
        return findMessage(this.constructors, constructorOrId);
    }
    findMessage(messageOrId) {
        return findMessage(this.messages, messageOrId);
    }
}
exports.Abi = Abi;
