import { ControlPropertyArrayLengthException } from '../controls-exceptions/control-property-array-length.exception';

export class BehPropertyArrayLengthException extends ControlPropertyArrayLengthException {
    name = 'FormBehaviorArrayLengthConfigError';
    behaviorType: string;

    constructor(options: {
        property?: string,
        controlKey?: string,
        className?: string,
        behaviorType?: string
    } = {}, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(options, ...params);

        this.behaviorType = options.behaviorType;
        this.message = `${this.message} Имя поведения '${this.behaviorType}'`;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(this, BehPropertyArrayLengthException);
        }
    }
}
