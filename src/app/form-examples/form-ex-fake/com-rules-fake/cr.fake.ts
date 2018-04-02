export let CRFormFake = [
    {
        formType: 'widget',
        key: 'commercialRule',
        label: 'Commercial Rules',
        actionUrl: '/transactions/5a997f99f8c0d01f920a8165/commercial-rules/post',
        nestedBody: true,
        controls: [
            {
                key: 'type',
                controlType: 'radio-center',
                validation: [{required: null}],
                value: 'sales-config',
                options: [
                    {label: 'Sales Config', value: 'sales-config'},
                    {label: 'Offer', value: 'offer'},
                    {label: 'Custom', value: 'custom'}
                ]
            },
            {
                key: 'sales-config-selected',
                controlType: 'form-group',
                controls: [
                    {
                        key: 'salesConfig',
                        controlType: 'sc',
                        value: '',
                        label: 'Sales Config',
                        validation: [{required: null}],
                        searchUrl: 'api/scfake',
                        // disabledView: true,
                        // selectedOption: {
                        //     id: '2',
                        //     url: 'api/some2',
                        //     viewData: {
                        //         'icon': {
                        //             value: 'erp_independent'
                        //         },
                        //         'subtitle': {
                        //             value: 'Product'
                        //         },
                        //         'title': {
                        //             value: 'no batch exist pricelist no metrics'
                        //         },
                        //         'mark': {
                        //             value: 'some'
                        //         },
                        //         'stats': {
                        //             collection: [
                        //                 {
                        //                     label: 'Weight',
                        //                     value: '1kg'
                        //                 },
                        //                 {
                        //                     label: 'Direction',
                        //                     value: 'Left'
                        //                 }
                        //             ]
                        //         }
                        //     },
                        // },
                        selectedConfig: {
                            placing: {
                                TemplatePoint1: [
                                    'icon'
                                ],
                                TemplatePoint2: [
                                    'subtitle',
                                    'title',
                                    'stats',
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
                                    name: 'form-sc__stats',
                                    id: 'stats'
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
                                }
                            ]
                        },
                    }
                ],
                behaviors: [
                    {
                        behaviorType: 'addLLControls',
                        multi: true,
                        request: {
                            url: 'api/salesConfigCase', // '/ard/v2/product/products/pse?view=speed-angular',
                            method: 'get', // default 'get'
                            // bodyParams: {sc: ['sales-config-selected', 'salesConfig']},
                        },
                        conditions: [
                            {
                                conditionType: 'valuePresence',
                                fieldKey: ['sales-config-selected', 'salesConfig']
                            },
                        ]
                    },
                    {
                        behaviorType: 'display',
                        conditions: [
                            {
                                conditionType: 'valueMatch',
                                fieldKey: ['type'],
                                matchingValues: ['sales-config']
                            }
                        ]
                    }
                ]
            },
            {
                key: 'offer-selected',
                controlType: 'form-group',
                behaviors: [
                    {
                        behaviorType: 'display',
                        conditions: [
                            {
                                conditionType: 'conGroup',
                                conditions: [
                                    {
                                        conditionType: 'valueMatch',
                                        fieldKey: ['type'],
                                        matchingValues: ['offer']
                                    }
                                ]
                            }
                        ]
                    }
                ],
                controls: [
                    {
                        key: 'offer',
                        controlType: 'sc',
                        value: '',
                        label: 'Offer',
                        validation: [{required: null}],
                        searchUrl: 'api/scfake',
                        grid: 'col-6',
                        selectedConfig: {
                            placing: {
                                TemplatePoint1: [
                                    'icon'
                                ],
                                TemplatePoint2: [
                                    'subtitle',
                                    'title',
                                    'mark',
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
                                    name: 'form-sc__mark',
                                    id: 'mark'
                                },
                                {
                                    name: 'form-sc__stats',
                                    id: 'stats'
                                },
                            ]
                        },
                        optionColConfig: {
                            placing: {
                                TemplatePoint1: [
                                    'icon',
                                ],
                                TemplatePoint2: [
                                    'subtitle',
                                    'title',
                                    'mark',
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
                                    name: 'form-sc__mark',
                                    id: 'mark'
                                },
                                {
                                    name: 'form-sc__stats',
                                    id: 'stats'
                                },
                            ]
                        },
                    },
                    {
                        key: 'licenseType',
                        controlType: 'sc-widget',
                        value: '',
                        grid: 'col-6',
                        label: 'License Type',
                        labelIcon: 'mmj_license',
                        searchUrl: 'api/scfake',
                        selectedConfig: {
                            placing: {
                                TemplatePoint1: [
                                    'icon'
                                ],
                                TemplatePoint2: [
                                    'subtitle',
                                    'title',
                                    'mark',
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
                                    name: 'form-sc__mark',
                                    id: 'mark'
                                },
                                {
                                    name: 'form-sc__stats',
                                    id: 'stats'
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
                                },
                            ]
                        },
                    },
                    {
                        key: 'orderStatusProcessing',
                        label: 'Status Work',
                        controlType: 'select',
                        validation: [{required: null}],
                        value: 'expedited',
                        options: [
                            {key: 'Expedited', value: 'expedited'},
                            {key: 'Non Expedited', value: 'non-expedited'}
                        ]
                    },
                    {
                        key: 'orderProcessingType',
                        label: 'Processing Type',
                        controlType: 'select',
                        validation: [{required: null}],
                        value: 'Manual',
                        options: [
                            {key: 'Automatic', value: 'Automatic'},
                            {key: 'Semi-automatic', value: 'Semi-automatic'},
                            {key: 'Manual', value: 'Manual'}
                        ]
                    },
                    {
                        key: 'sStockRequired',
                        label: 'Stock management',
                        controlType: 'checkbox',
                        validation: [{required: null}],
                        value: true
                    },
                    {
                        key: 'sellType',
                        label: 'Type of sales',
                        controlType: 'radio-big',
                        validation: [{required: null}],
                        value: '',
                        options: [
                            {label: 'Retail', value: 'Retail', disabled: null},
                            {label: 'Wholesale', value: 'Wholesale', disabled: null},
                        ]
                    },
                    {
                        key: 'returnAllowedDaysAmount',
                        label: 'Return is available within (days)',
                        controlType: 'counter',
                        validation: [{required: null}],
                        value: '30',
                        params: {
                            // min: 10,
                            step: 1
                        },
                    },
                    {
                        key: 'exchangeAllowedDaysAmount',
                        label: 'Exchange is available within (days)',
                        controlType: 'counter',
                        validation: [{required: null}],
                        value: '30',
                        params: {
                            // min: 10,
                            step: 1
                        },
                    }
                ]
            },
            {
                key: 'custom-selected',
                controlType: 'form-group',
                behaviors: [
                    {
                        behaviorType: 'display',
                        conditions: [
                            {
                                conditionType: 'valueMatch',
                                fieldKey: ['type'],
                                matchingValues: ['custom']
                            }
                        ]
                    }
                ],
                controls: [
                    {
                        key: 'licenseType',
                        controlType: 'sc-widget',
                        value: '',
                        label: 'License Type',
                        labelIcon: 'mmj_license',
                        searchUrl: 'api/scfake',
                        selectedConfig: {
                            placing: {
                                TemplatePoint1: [
                                    'icon'
                                ],
                                TemplatePoint2: [
                                    'subtitle',
                                    'title',
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
                                }
                            ]
                        },
                    },
                    {
                        key: 'orderStatusProcessing',
                        label: 'Status Work',
                        controlType: 'select',
                        validation: [{required: null}],
                        value: 'expedited',
                        options: [
                            {key: 'Expedited', value: 'expedited'},
                            {key: 'Non Expedited', value: 'non-expedited'}
                        ]
                    },
                    {
                        key: 'orderProcessingType',
                        label: 'Processing Type',
                        controlType: 'select',
                        validation: [{required: null}],
                        value: 'Manual',
                        options: [
                            {key: 'Automatic', value: 'Automatic'},
                            {key: 'Semi-automatic', value: 'Semi-automatic'},
                            {key: 'Manual', value: 'Manual'}
                        ]
                    },
                    {
                        key: 'sStockRequired',
                        label: 'Stock management',
                        controlType: 'checkbox',
                        validation: [{required: null}],
                        value: true
                    },
                    {
                        key: 'sellType',
                        label: 'Type of sales',
                        controlType: 'radio-big',
                        validation: [{required: null}],
                        value: '',
                        options: [
                            {label: 'Retail', value: 'Retail', disabled: null},
                            {label: 'Wholesale', value: 'Wholesale', disabled: null},
                        ]
                    },
                    {
                        key: 'returnAllowedDaysAmount',
                        label: 'Return is available within (days)',
                        controlType: 'counter',
                        validation: [{required: null}],
                        value: '30',
                        params: {
                            // min: 10,
                            step: 1
                        },
                    },
                    {
                        key: 'exchangeAllowedDaysAmount',
                        label: 'Exchange is available within (days)',
                        controlType: 'counter',
                        validation: [{required: null}],
                        value: '30',
                        params: {
                            // min: 10,
                            step: 1
                        },
                    }
                ],
            }
        ]
    }
];

