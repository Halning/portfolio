import { AbstractFormException } from '../abstract-form.exception';

export class BehaviorCantWorkException extends AbstractFormException {
    name = 'FormBehaviorsResolverError';
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
        this.message = `Поведение не может работать с контролом '${this.controlKey}'! Тип поведения '${this.behaviorType}'. Имя класса ${this.className}.`;

        if (this.behaviorType === 'disableOptions') {
            this.message = `${this.message} Работает только с контролами у которых есть свойство 'options' таких как 'select', 'radio' и т.д.`;
        } else if (this.behaviorType === 'reset' || this.behaviorType === 'patchValue') {
            this.message = `${this.message} Не может работать с 'sc' и 'sc-widget' так как не можем отобразить выбранный элемент! 'value' поменяет, но ничего не отобразиться!`;
        }

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ((<any>Error).captureStackTrace) {
            (<any>Error).captureStackTrace(this, BehaviorCantWorkException);
        }
    }
}

