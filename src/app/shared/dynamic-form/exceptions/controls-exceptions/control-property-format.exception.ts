import { AbstractFormException } from '../abstract-form.exception';

export class ControlPropertyFormatException extends AbstractFormException {
    name = 'FormControlFormatConfigError';
    property: string;
    propType: string;
    needPropType: string;

    constructor(options: {
                    property?: string,
                    controlKey?: string,
                    className?: string,
                    propType?: string,
                    needPropType?: string
                } = {},
                ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(options, ...params);

        this.property = options.property;
        this.propType = options.propType;
        this.needPropType = options.needPropType;
        this.message = `Неверный тип свойство '${this.property}'! Текущий тип '${this.propType}', должен быть '${this.needPropType}'! Ключ контрола: '${this.controlKey ? this.controlKey : 'unknown'}'.`;

        if (this.className) {
            this.message = `${this.message} Имя класса '${this.className}'`;
        }

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(this, ControlPropertyFormatException);
        }
    }
}

