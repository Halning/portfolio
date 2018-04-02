import { AbstractFormException } from '../abstract-form.exception';

export class ControlPropertyRequiredException extends AbstractFormException {
    name = 'FormControlRequiredConfigError';
    message: string;
    property: string;

    constructor(options: {
        property?: string,
        controlKey?: string,
        className?: string,

    } = {}, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(options, ...params);

        this.property = options.property;
        this.message = `Отсутствует свойство '${this.property}', обязательное! Ключ контрола: '${this.controlKey ? this.controlKey : 'unknown'}'.`;

        if (this.className) {
            this.message = `${this.message} Имя класса '${this.className}'.`;
        }

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(this, ControlPropertyRequiredException);
        }
    }
}
