export const quantityProductFake = [
  {
    insertGroup: 'all',
    insertControls: [
      {
        key: 'qp',
        controlType: 'form-group',
        // disabledView: true,
        behaviors: [
          {
            behaviorType: 'enable',
            conditions: [
              {
                conditionType: 'statusMatch',
                // conditionsMatchingRule: 'all',
                fieldKey: ['all', 'variety'],
                matchingStatus: 'valid'
              }
            ]
          }
        ],
        controls: [
          {
            key: 'quantity',
            controlType: 'form-group',
            controls: [
              {
                key: 'q',
                label: 'Quantity',
                controlType: 'counter',
                validation: [{ required: null }],
                value: '', // value and params.min need to be equal
                grid: 'col-6',
                params: {
                  step: 0.01,
                  min: 2,
                  max: 34.05
                }
                // behaviors: [
                //     {
                //         behaviorType: 'disableOptions',
                //         conditions: [
                //             {
                //                 conditionType: 'valueMatchDO',
                //                 // conditionsMatchingRule: 'all',
                //                 fieldKey: ['all', 'qp', 'priceG', 'priceCheckbox'],
                //                 disabledOptions: {true: ['102'], false: ['103']}
                //             },
                //         ]
                //     },
                // ]
              },
              {
                key: 'mu',
                label: 'Measurement unit',
                controlType: 'select',
                validation: [{ required: null }],
                value: '',
                grid: 'col-6',
                options: [
                  { key: 'pkg.', value: '102' },
                  { key: 'psc.', value: '103' }
                ],
                behaviors: [
                  {
                    behaviorType: 'disableOptions',
                    conditions: [
                      {
                        conditionType: 'valueMatchDO',
                        // conditionsMatchingRule: 'all',
                        fieldKey: ['productId'],
                        disabledOptions: { 1: ['102'], 2: ['103'] }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            key: 'priceG',
            controlType: 'form-group',
            controls: [
              {
                id: 501,
                key: 'priceCheckbox',
                label: 'Manual price',
                controlType: 'checkbox',
                value: false
              },
              {
                id: 502,
                key: 'pricelist',
                label: 'PriceList',
                controlType: 'select',
                validation: [{ required: null }],
                value: '',
                options: [
                  { key: 'somecollpl', value: 'cp' },
                  { key: 'somebadps', value: 'bp' }
                ],
                behaviors: [
                  {
                    behaviorType: 'display',
                    conditions: [
                      {
                        conditionType: 'valueMatch',
                        conditionsMatchingRule: 'all',
                        fieldKey: ['all', 'qp', 'priceG', 'priceCheckbox'],
                        matchingValues: [false]
                      },
                      {
                        conditionType: 'valueMatch',
                        conditionsMatchingRule: 'all',
                        fieldKey: ['all', 'qp', 'date'],
                        matchingValues: ['Fri Mar 30 2018 20:00:00 GMT+0300']
                      }
                    ]
                  }
                ]
              },
              {
                key: 'price',
                label: 'Price',
                controlType: 'counter-price',
                validation: [{ required: null }],
                order: 3,
                value: '2', // value and params.min need to be equal
                params: {
                  step: 1,
                  min: 2,
                  max: 1000,
                  currency: 'USD'
                },
                behaviors: [
                  {
                    behaviorType: 'display',
                    conditions: [
                      {
                        conditionType: 'valueMatch',
                        // conditionsMatchingRule: 'all',
                        fieldKey: ['all', 'qp', 'priceG', 'priceCheckbox'],
                        matchingValues: [true]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
