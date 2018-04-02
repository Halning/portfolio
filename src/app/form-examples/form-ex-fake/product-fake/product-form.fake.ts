export let PrFormFake = [
    {
        formType: 'widget',
        key: 'product-form',
        label: 'Add Product',
        actionUrl: '/asdasd',
        behaviors: [
            {
                behaviorType: 'addLLControls',
                multi: true,
                request: {
                    url: 'api/addControls', // '/ard/v2/product/products/pse?view=speed-angular',
                    // method: 'get', // default 'get'
                    // bodyParams: {url: 'productId'},
                },
                conditions: [
                    {
                        conditionType: 'conGroup',
                        conditions: [
                            {
                                conditionType: 'valuePresence',
                                // conditionsMatchingRule: 'all',
                                fieldKey: 'productId'
                            }
                        ]
                    }
                ]
            }
        ],
        // disabledView: true, // if form-root dV = true all form disabled and action btns (Save, Revert) is hide
        controls: [
            {
                // sc can't implements behaviors 'reset' or 'patchValue'
                key: 'productId',
                label: 'Product',
                labelIcon: 'erp_independent',
                validation: [{required: null}],
                controlType: 'sc-widget',
                value: '', // if exist default value required need to be selectedOption
                searchUrl: 'api/scfake',
                // behaviors: [
                //     {
                //         behaviorType: 'display',
                //         conditions: [
                //             {
                //                 conditionType: 'valueMatch',
                //                 // conditionsMatchingRule: 'all',
                //                 fieldKey: ['all', 'qp', 'quantity', 'q'],
                //                 matchingValues: ['2']
                //             },
                //             // {
                //             //     conditionType: 'valueMatch',
                //             //     conditionsMatchingRule: 'all',
                //             //     fieldKey: ['all', 'variety', 'size'],
                //             //     matchingValues: ['s']
                //             // },
                //         ]
                //     }
                // ],
                selectedConfig: {
                    placing: {
                        TemplatePoint1: [
                            'icon'
                        ],
                        TemplatePoint2: [
                            'subtitle',
                            'title',
                            'mark'
                        ],
                    },
                    components: [
                        {
                            name: 'form-sc__icon',
                            id: 'icon'
                        },
                        {
                            name: 'form-sc__subtitle',
                            id: 'subtitle'
                        },
                        {
                            name: 'form-sc__title',
                            id: 'title'
                        },
                        {
                            name: 'form-sc__mark',
                            id: 'mark'
                        }
                    ]
                },
                optionColConfig: {
                    placing: {
                        TemplatePoint1: [
                            'icon'
                        ],
                        TemplatePoint2: [
                            'subtitle',
                            'title',
                            'stats'
                        ],
                    },
                    components: [
                        {
                            name: 'form-sc__icon',
                            id: 'icon'
                        },
                        {
                            name: 'form-sc__subtitle',
                            id: 'subtitle'
                        },
                        {
                            name: 'form-sc__title',
                            id: 'title'
                        },
                        {
                            name: 'form-sc__stats',
                            id: 'stats'
                        }
                    ]
                },
            },
        ]
    }
];

