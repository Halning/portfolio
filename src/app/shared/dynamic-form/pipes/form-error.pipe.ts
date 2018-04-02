import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formError'
})

export class FormErrorPipe implements PipeTransform {
    transform(value: any, ...args: any[]): string {
        let errors = '';

        for (const validation in value) {
            if (value && value.hasOwnProperty(validation)) {
                switch (validation) {
                    case 'required':
                        errors = `${errors} Field is required`;
                        break;
                    case 'minlength':
                        errors = `${errors} Field required min-length ${value[validation].requiredLength}`;
                        break;
                    case 'maxlength':
                        errors = `${errors} Field required max-length ${value[validation].requiredLength}`;
                        break;
                    case 'email':
                        errors = `${errors} Wrong e-mail`;
                        break;
                    case 'pattern':
                        errors = `${errors} Wrong value, required pattern ${value[validation].requiredPattern}`;
                        break;
                }
            }
        }

        return errors;
    }
}
