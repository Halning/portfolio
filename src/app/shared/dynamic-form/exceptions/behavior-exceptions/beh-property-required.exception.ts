import { ControlPropertyRequiredException } from '../controls-exceptions/control-property-required.exception';

export class BehPropertyRequiredException extends ControlPropertyRequiredException {
    name = 'FormBehaviorRequiredConfigError';
    behaviorType: string;

    constructor(options: {
        property?: string,
        controlKey?: string,
        className?: string,
        behaviorType?: string,
    } = {}, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(options, ...params);

        this.behaviorType = options.behaviorType;
        this.message = `${this.message} Имя поведения '${this.behaviorType}'.`;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(this, BehPropertyRequiredException);
        }
    }
}
