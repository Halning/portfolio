import { isArray } from 'util';

import { ControlPropertyRequiredException } from './control-property-required.exception';
import { ControlPropertyFormatException } from './control-property-format.exception';
import { ControlPropertyArrayLengthException } from './control-property-array-length.exception';

class EmptyClass {
    constructor() {
    }
}

interface Constructable<T> {
    new (...args: any[]): T;
}

interface IEM {
    /**
     * check property 'Required' and type of property and return him
     * @param {U} obj
     * @param {K} key
     * @param {string} type
     * @param {boolean} required
     * @returns {U[K]}
     * @private
     */
    getProperty<U, K extends keyof U>(obj: U, key: K, type: string, required?: boolean, literalStringTypes?: string[]): U[K];

    getControls(group: object): object;

    _isLiteralStringType(arg: any, literalStringTypes: string[]): boolean;
}

const EM = (superclass) => class  extends superclass {
    getControls(group: object): object {
        try {
            if (!group.hasOwnProperty('controls') || group['controls'] === undefined) {
                throw new ControlPropertyRequiredException({
                    property: 'controls',
                    controlKey: group['key'],
                    className: this.constructor.name
                });
            }

            const propType = isArray(group['controls']) ? 'array' : typeof group['controls'];

            if (propType !== 'array') {
                throw new ControlPropertyFormatException({
                    property: 'controls',
                    controlKey: group['key'],
                    className: this.constructor.name,
                    propType: propType,
                    needPropType: 'array'
                });
            } else if (propType === 'array' && !group['controls']['length']) {
                throw new ControlPropertyArrayLengthException({
                    property: 'controls',
                    controlKey: group['key'],
                    className: this.constructor.name,
                });
            }

        } catch (e) {
            console.warn(e.stack);
        }

        return group['controls'];
    }

    getProperty<U, K extends keyof U>(obj: U, key: K, type: string, required?: boolean, literalStringTypes?: string[]): U[K] {
        try {
            if (required && (!obj.hasOwnProperty(key) || obj[key] === undefined)) {
                throw new ControlPropertyRequiredException({
                    property: key,
                    controlKey: this['key'] || obj['key'],
                    className: this.constructor.name,
                });
            }

            const typesArray = type.split('|');
            const propType = isArray(obj[key]) ? 'array' : typeof obj[key];

            switch (typesArray[0]) {
                case 'number':
                case 'string':
                case 'boolean':
                case 'object':
                case 'array':
                    if (obj[key] && (!typesArray['includes'](propType))) {
                        throw new ControlPropertyFormatException({
                            property: key,
                            controlKey: this['key'] || obj['key'],
                            className: this.constructor.name,
                            propType: propType,
                            needPropType: type
                        });
                    }
                    break;
                case 'literalString':
                    if (obj[key] && (propType !== 'string' || !this._isLiteralStringType(obj[key], literalStringTypes))) {
                        throw new ControlPropertyFormatException({
                            property: key,
                            controlKey: this['key'] || obj['key'],
                            className: this.constructor.name,
                            propType: obj[key].toString(),
                            needPropType: literalStringTypes.toString()
                        });
                    }
            }


            if (propType === 'array' && !obj[key]['length']) {
                throw new ControlPropertyArrayLengthException({
                    property: key,
                    controlKey: this['key'],
                    className: this.constructor.name,
                });
            }

        } catch (e) {
            console.warn(e.stack);
        }

        return obj[key];
    }

    _isLiteralStringType(arg: any, literalStringTypes: string[]): boolean {

        for (const literalType of literalStringTypes) {
            if (arg.toLowerCase() === literalType.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
};

export { EM, IEM, EmptyClass, Constructable };
