export const SalesConfigCase = [
  {
    insertGroup: 'sales-config-selected',
    insertControls: [
      {
        key: 'scradio-add',
        controlType: 'form-group',
        controls: [
          // {
          //     key: 'sc-lt-empty',
          //     label: 'License Type',
          //     controlType: 'select',
          //     disabledView: true,
          //     value: '',
          // },
          {
            key: 'licenseType',
            controlType: 'sc-widget',
            value: '',
            label: 'License Type',
            labelIcon: 'mmj_license',
            searchUrl: 'api/scfake',
            selectedConfig: {
              placing: {
                TemplatePoint1: ['icon'],
                TemplatePoint2: ['subtitle', 'title']
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
            // selectedOption: {
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
            optionColConfig: {
              placing: {
                TemplatePoint1: ['icon'],
                TemplatePoint2: ['subtitle', 'title']
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
            }
          },
          {
            key: 'orderStatusProcessing',
            label: 'Status Work',
            controlType: 'select',
            validation: [{ required: null }],
            value: 'expedited',
            options: [
              { key: 'Expedited', value: 'expedited', icon: 'erp_independent' },
              { key: 'Non Expedited', value: 'non-expedited' }
            ]
          },
          {
            key: 'orderProcessingType',
            label: 'Processing Type',
            controlType: 'select',
            disabledView: true,
            value: 'Automatic',
            options: [
              { key: 'Automatic', value: 'Automatic' }
              // {key: 'Semi-automatic', value: 's-auto'},
              // {key: 'Semi-manual', value: 's-man'}
            ]
          },
          {
            key: 'isStockRequired',
            label: 'Stock management',
            controlType: 'checkbox',
            disabledView: true,
            value: true
          },
          {
            key: 'returnAllowedDaysAmount',
            label: 'Return is available within (days)',
            controlType: 'counter',
            disabledView: true,
            validation: [{ required: null }],
            value: '30',
            params: {
              // min: 10,
              step: 1
            }
          },
          {
            key: 'exchangeAllowedDaysAmount',
            label: 'Exchange is available within (days)',
            controlType: 'counter',
            disabledView: true,
            validation: [{ required: null }],
            value: '30',
            params: {
              // min: 10,
              step: 1
            }
          }
        ],
        behaviors: [
          {
            behaviorType: 'removeControl',
            conditions: [
              {
                conditionType: 'valueMatch',
                // conditionsMatchingRule: 'all',
                fieldKey: ['sales-config-selected', 'salesConfig'],
                matchingValues: ['']
              }
            ]
          }
        ]
      }
    ]
  }
];
