export const metricProductFake = [
  // we replace the controls then we need to specify the same group where we replace (*)
  // the same keys of controls that we want to replace (**) otherwise we will not replace it but add
  {
    // insertGroup: 'priceG', // (*)
    insertControls: [
      {
        key: 'all',
        controlType: 'form-group',
        behaviors: [
          {
            behaviorType: 'addLLControls',
            multi: true,
            request: {
              url: 'api/quantityControl', // '/ard/v2/product/products/pse?view=speed-angular',
              method: 'get' // default 'get'
              // bodyParams: {
              //     size: ['all', 'variety', 'size'],
              //     color: ['all', 'variety', 'color'],
              //     form: ['all', 'variety', 'form']
              // },
            },
            conditions: [
              {
                conditionType: 'statusMatch',
                // conditionsMatchingRule: 'all',
                fieldKey: ['all', 'variety'],
                matchingStatus: 'valid'
              }
            ]
          },
          {
            behaviorType: 'removeControl',
            conditions: [
              {
                conditionType: 'valueMatch',
                // conditionsMatchingRule: 'all',
                fieldKey: ['productId'],
                matchingValues: ['']
              }
            ]
          }
        ],
        controls: [
          {
            key: 'varietyId',
            controlType: 'textbox',
            value: '',
            hidden: true,
            behaviors: [
              {
                behaviorType: 'patchValue',
                patchValue: '1',
                conditions: [
                  {
                    conditionType: 'valueMatch',
                    conditionsMatchingRule: 'all',
                    fieldKey: 'all.variety.size',
                    matchingValues: ['xxl']
                  },
                  {
                    conditionType: 'valueMatch',
                    conditionsMatchingRule: 'all',
                    fieldKey: 'all.variety.color',
                    matchingValues: ['red']
                  },
                  {
                    conditionType: 'valueMatch',
                    conditionsMatchingRule: 'all',
                    fieldKey: 'all.variety.form',
                    matchingValues: ['long']
                  },
                  {
                    conditionType: 'statusMatch',
                    conditionsMatchingRule: 'all',
                    fieldKey: ['all', 'variety'],
                    matchingStatus: 'valid'
                  }
                ]
              }
            ]
          },
          {
            key: 'variety', // (**)
            controlType: 'form-group-separate',
            controls: [
              {
                key: 'size',
                label: 'Size',
                validation: [{ required: null }],
                value: '',
                controlType: 'radio',
                sendValue: false,
                options: [
                  { label: 'XS', value: 'xs' },
                  { label: 'S', value: 's' },
                  { label: 'M', value: 'm' },
                  { label: 'L', value: 'l' },
                  { label: 'XL', value: 'xl' },
                  { label: 'XXL', value: 'xxl' }
                ],
                behaviors: [
                  {
                    // this behavior only for radio control in future maybe in element
                    // ho have options for example 'select' control
                    behaviorType: 'disableOptions',
                    conditions: [
                      {
                        conditionType: 'valueMatchDO',
                        // conditionsMatchingRule: 'all',
                        fieldKey: 'all.variety.color',
                        disabledOptions: { red: ['xl', 's'], blue: ['m', 'l'], green: ['xxl'] }
                      },
                      {
                        conditionType: 'valueMatchDO',
                        // conditionsMatchingRule: 'all',
                        fieldKey: 'all.variety.form',
                        disabledOptions: { short: ['s'], long: ['m'] }
                      }
                    ]
                  }
                ]
              },
              {
                key: 'color',
                label: 'Color',
                validation: [{ required: null }],
                value: '',
                controlType: 'radio',
                sendValue: false,
                options: [
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'blue' },
                  { label: 'Green', value: 'green' },
                  { label: 'Grey', value: 'grey' },
                  { label: 'Dark Grey', value: 'darkgrey' },
                  { label: 'Yellow', value: 'yellow' }
                ],
                behaviors: [
                  {
                    behaviorType: 'disableOptions',
                    conditions: [
                      {
                        conditionType: 'valueMatchDO',
                        conditionsMatchingRule: 'all',
                        fieldKey: ['all', 'variety', 'size'],
                        disabledOptions: {
                          m: ['red', 'blue'],
                          xxl: ['green', 'grey'],
                          xl: ['darkgrey', 'red', 'blue'],
                          s: ['red'],
                          xs: ['red']
                        }
                      },
                      {
                        conditionType: 'valueMatchDO',
                        conditionsMatchingRule: 'all',
                        fieldKey: ['all', 'variety', 'form'],
                        disabledOptions: {
                          short: ['red', 'blue']
                        }
                      }
                    ]
                  }
                ]
              },
              {
                key: 'form',
                label: 'Form',
                validation: [{ required: null }],
                value: '',
                controlType: 'radio',
                sendValue: false,
                options: [
                  { label: 'Short', value: 'short' },
                  { label: 'Long', value: 'long' }
                ],
                behaviors: [
                  {
                    behaviorType: 'disableOptions',
                    conditions: [
                      {
                        conditionType: 'valueMatchDO',
                        fieldKey: ['all', 'variety', 'size'],
                        disabledOptions: {
                          s: ['short'],
                          l: ['long']
                        }
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
