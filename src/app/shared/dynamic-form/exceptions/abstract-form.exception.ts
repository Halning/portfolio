export class AbstractFormException extends Error {
    message: string;
    controlKey: string;
    className: string;

    constructor(options: {
                    controlKey?: string,
                    className?: string,
                } = {},
                ...params) {
        super(...params);

        this.controlKey = options.controlKey;
        this.className = options.className;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(this, AbstractFormException);
        }
    }
}

