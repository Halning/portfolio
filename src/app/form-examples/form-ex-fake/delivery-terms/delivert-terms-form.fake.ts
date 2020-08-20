export const DELIVERY_FAKE_FORM_DATA = {
  key: 'delivery-form',
  formType: 'widget',
  actionUrl: '/ad',
  label: 'Delivery terms',
  controls: [
    {
      key: 'deliveryTerm',
      controlType: 'radio-center',
      validation: [{ required: null }],
      value: '',
      options: [
        { label: 'Branch', value: 'branch' },
        { label: 'To door', value: 'door' }
      ]
    },
    {
      key: 'groupBranch',
      controlType: 'form-group',
      behaviors: [
        {
          behaviorType: 'display',
          conditions: [
            {
              conditionType: 'valueMatch',
              fieldKey: 'deliveryTerm',
              matchingValues: ['branch']
            }
          ]
        }
      ],
      controls: [
        {
          key: 'payment',
          controlType: 'sc',
          validation: [{ required: null }],
          value: '',
          label: 'Payment moment',
          searchUrl: 'api/scfake',
          selectedConfig: {
            placing: {
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'sc__title',
                id: 'title'
              }
            ]
          },
          optionColConfig: {
            placing: {
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'form-sc__title',
                id: 'title'
              }
            ]
          }
        },
        {
          key: 'date',
          controlType: 'datePicker',
          validation: [{ required: null }],
          // disabledView: true,
          // value:  'Thu Apr 19 2018 13:00:00 GMT+0300 (EEST)',
          value: '',
          label: 'Choose date',
          translates: {
            selectTime: 'Select time',
            selectDate: 'Select date'
          }
        },
        {
          key: 'deliveryPlace',
          controlType: 'sc',
          validation: [{ required: null }],
          value: '',
          label: 'Select Branch',
          searchUrl: 'api/scfake',
          selectedConfig: {
            placing: {
              TemplatePoint1: ['icon'],
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'sc__icon',
                id: 'icon'
              },
              {
                name: 'sc__title',
                id: 'title'
              }
            ]
          },
          optionColConfig: {
            placing: {
              TemplatePoint1: ['icon'],
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'sc__icon',
                id: 'icon'
              },
              {
                name: 'sc__title',
                id: 'title'
              }
            ]
          }
        }
      ]
    },
    {
      key: 'groupToDoor',
      controlType: 'form-group',
      behaviors: [
        {
          behaviorType: 'display',
          conditions: [
            {
              conditionType: 'valueMatch',
              fieldKey: 'deliveryTerm',
              matchingValues: ['door']
            }
          ]
        }
      ],
      controls: [
        {
          key: 'payment',
          controlType: 'sc',
          validation: [{ required: null }],
          value: '',
          label: 'Payment moment',
          searchUrl: 'api/scfake',
          selectedConfig: {
            placing: {
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'sc__title',
                id: 'title'
              }
            ]
          },
          optionColConfig: {
            placing: {
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'form-sc__title',
                id: 'title'
              }
            ]
          }
        },
        {
          key: 'date',
          controlType: 'datePicker',
          validation: [{ required: null }],
          value: '',
          label: 'Choose date',
          translates: {
            selectTime: 'Select time',
            selectDate: 'Select date'
          }
        },
        {
          key: 'deliveryPlace',
          controlType: 'sc',
          validation: [{ required: null }],
          value: '',
          label: 'Select customer Address',
          searchUrl: 'api/scfake',
          selectedConfig: {
            placing: {
              TemplatePoint1: ['icon'],
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'sc__icon',
                id: 'icon'
              },
              {
                name: 'sc__title',
                id: 'title'
              }
            ]
          },
          optionColConfig: {
            placing: {
              TemplatePoint1: ['icon'],
              TemplatePoint2: ['title']
            },
            components: [
              {
                name: 'sc__icon',
                id: 'icon'
              },
              {
                name: 'sc__title',
                id: 'title'
              }
            ]
          }
        }
      ]
    }
  ]
};
