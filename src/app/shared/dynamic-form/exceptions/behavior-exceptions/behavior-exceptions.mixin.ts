import { isArray } from 'util';
import { BehaviorCantWorkException } from './beh-cant-work.exception';
import { BehPropertyRequiredException } from './beh-property-required.exception';
import { BehPropertyFormatException } from './beh-property-format.exception';
import { BehPropertyArrayLengthException } from './beh-property-array-length.exception';


class EmptyClass {
    constructor() {
    }
}

interface Constructable<T> {
    new (...args: any[]): T;
}

interface IBM {
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

    canBehWorkWithControl(behavior: object): boolean;

    _isLiteralStringType(arg: any, literalStringTypes: string[]): boolean;
}

const EBM = (superclass) => class  extends superclass {

    getProperty<U, K extends keyof U>(obj: U, key: K, type: string, required?: boolean, literalStringTypes?: string[]): U[K] {
        try {
            if (required && (!obj.hasOwnProperty(key) || obj[key] === undefined)) {
                throw new BehPropertyRequiredException({
                    property: key,
                    controlKey: this['controlIns'] && this['controlIns']['key']
                    || this['parentKey'] || obj['controlIns']['key'] ,
                    className: this.constructor.name,
                    behaviorType: this['behaviorType'] || obj['behaviorType']
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
                        throw new BehPropertyFormatException({
                            property: key,
                            controlKey: this['controlIns'] && this['controlIns']['key']
                            || this['parentKey']|| obj['controlIns']['key'],
                            className: this.constructor.name,
                            behaviorType: this['behaviorType'] || obj['behaviorType'],
                            propType: propType,
                            needPropType: type
                        });
                    }
                    break;
                case 'literalString':
                    if (obj[key] && (propType !== 'string' || !this._isLiteralStringType(obj[key], literalStringTypes))) {
                        throw new BehPropertyFormatException({
                            property: key,
                            controlKey: this['controlIns'] && this['controlIns']['key']
                            || this['parentKey']|| obj['controlIns']['key'],
                            className: this.constructor.name,
                            behaviorType: this['behaviorType'] || obj['behaviorType'],
                            propType: obj[key].toString(),
                            needPropType: literalStringTypes.toString()
                        });
                    }
            }


            if (propType === 'array' && !obj[key]['length']) {
                throw new BehPropertyArrayLengthException({
                    property: key,
                    controlKey: this['controlIns'] && this['controlIns']['key']
                    || this['parentKey'] || obj['controlIns']['key'],
                    className: this.constructor.name,
                    behaviorType: this['behaviorType'] || obj['behaviorType'],
                });
            }

        } catch (e) {
            console.warn(e.stack);
        }

        return obj[key];
    }

    canBehWorkWithControl(behavior: object): boolean {
        try {

            switch (behavior['behaviorType']) {
                case 'disableOptions':
                    if (!behavior['controlIns']['options']) {
                        throw new BehaviorCantWorkException({
                            controlKey: behavior['controlIns']['key'],
                            className: this.constructor.name,
                            behaviorType: behavior['behaviorType']
                        });
                    }
                    break;
                case 'reset':
                case 'patchValue':
                    if (behavior['controlIns']['controlType']
                        && (behavior['controlIns']['controlType'] === 'sc'
                            || behavior['controlIns']['controlType'] === 'sc-widget')) {
                        throw new BehaviorCantWorkException({
                            controlKey: behavior['controlIns']['key'],
                            className: this.constructor.name,
                            behaviorType: behavior['behaviorType']
                        });
                    }
                    break;
            }
        } catch (e) {
            console.warn(e.stack);
            return false;
        }
        return true;
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

export { EBM, IBM, EmptyClass, Constructable };
