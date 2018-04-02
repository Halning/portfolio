import { FormBaseType } from './form-base.type';
import { Observable } from 'rxjs/Observable';

interface Constructable<T> {
    new (...args: any[]): T;
}

/**
 *  Glossary:
 * `Control` - {@link BoFormControl}
 * `Group` - {@link BoFormGroup}
 * `ContGroup` - {@link BoFormControl} or {@link BoFormGroup}
 * `RootGroup` - {@link BoFormRoot}
 *
 * The interface describes methods for working with deep penetrations into the form and obtaining the desired values
 */
interface IM1 {
    /**
     * Retrieves `Control` values ​​by its `key` by deep traversing the `value` of the main form `root.value`
     * value of `RootGroup`
     *
     * @param {Array<string | number> | string} key
     * @returns {string}
     */
    getValueFromRoot(key: Array<string | number> | string): string;

    /**
     * Gets `valid` or `invalid` `ContGroup` by `key` by finding the `ContGroup` from the main form `RootGroup`
     *
     * @param {Array<string | number> | string} key
     * @returns {string}
     */
    getStatusFromRoot(key: Array<string | number> | string): string;

    /**
     * By enumerating the parents we compile the path to the `ContGroup` from `RootGroup`
     * without the `key` itself
     * For example ['path', 'to', 'control', 'from', 'root']
     *
     * @param {FormBaseType} controlIns - current `ContGroup`
     * @param {string[]} pathArr
     * @returns {Array<string>}
     */
    getPathOfKeysFromRoot(controlIns: FormBaseType, pathArr: string[]): Array<string>;

    showLoadingOnRoot(): void;

    hideLoadingOnRoot(): void;
}

interface IM2 {
    /**
     * We are subscribed to the load of lazily loaded `Control`
     * Subscription is made through the `RootGroup`
     *
     * @returns {Observable<void> | null}
     */
    subToLazyLoadingControls(): Observable<string[]> | null;
}


const M1 = (superclass) => class extends superclass {
    getValueFromRoot(key: Array<string | number> | string): string {
        let obj = this['root'].value;
        const arr = Array.isArray(key) ? key.slice(0) : key.slice(0).split('.');

        while (arr.length && (obj = obj[arr.shift()])) {
        }
        return obj;
    }

    getStatusFromRoot(key: Array<string | number> | string): string {
        return this['root'].get(key).valid ? 'valid' : 'invalid';
    }

    getPathOfKeysFromRoot(controlIns, pathArr: string[]): Array<string> {
        if (controlIns.parent && controlIns.parent.key) {
            pathArr.push(controlIns.parent.key);
            this.getPathOfKeysFromRoot(controlIns.parent, pathArr);
        }

        return pathArr;
    }

    showLoadingOnRoot(): void {
        this['root'].loading = true;
    }

    hideLoadingOnRoot(): void {
        this['root'].loading = false;
    }
};

const M2 = (superclass) => class extends superclass {
    subToLazyLoadingControls(): Observable<string[]> | null {
        if (this.behaviors && this.nonExistingDependControls.length) {
            return this['root'].lzControlsChanges$;
        } else {
            return null;
        }
    }
};

export { M1, M2, IM1, IM2, Constructable };
