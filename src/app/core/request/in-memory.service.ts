import { InMemoryDbService } from 'angular-in-memory-web-api';


import { ScFake } from '../../shared/dynamic-form/form-brick/form-sc/form-sc-fake-data';
import { DELIVERY_FAKE_FORM_DATA } from '../../form-examples/form-ex-fake/delivery-terms/delivert-terms-form.fake';
import { metricProductFake, PrFormFake, quantityProductFake } from '../../form-examples/form-ex-fake/product-fake';
import { CRFormFake, SalesConfigCase } from '../../form-examples/form-ex-fake/com-rules-fake';





export class InMemService implements InMemoryDbService {
    createDb() {
        const operation = true;

        // product fake
        const formExPr = PrFormFake;
        const quantityControl = quantityProductFake;
        const addControls = metricProductFake;

        // cr fake
        const crForm = CRFormFake;
        const salesConfigCase = SalesConfigCase;

        // delivery-term-form
        const deliveryTermsform = DELIVERY_FAKE_FORM_DATA;

        const scfake = ScFake;
        return {
            operation,

            formExPr,
            quantityControl,
            addControls,

            crForm,
            salesConfigCase,

            deliveryTermsform,

            scfake
        };
    }
}
