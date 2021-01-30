Ext.define('DDO.view.profile.editPersonelDetails.EditPersonelDetailsWindow', {
  extend: 'Ext.window.Window',
  requires: [
    'Ext.form.Panel',
    'DDO.view.profile.UserProfileModel',
    'DDO.view.profile.EditPersonelDetailWindowController',
    'Ext.form.RadioGroup',
    'DDO.ux.form.trigger.Clear'
  ],
  controller: 'editpersoneldetailwindowcontroller',
  xtype: 'editpersoneldetailwindow',
  closable: true,

  width: Constants.ViewportWidth * 0.51,
  resizable: false,
  height: Constants.ViewportHeight * 0.78,
  constrain: true,

  modal: true,

  layout: 'fit',

  viewModel: {
    type: 'userprofile',
  },

  items: [{
    xtype: 'form',
    reference: 'myFormm',
    bodyPadding: 10,
    scrollable: true,

    bbar: {
      layout: {
        type: 'hbox'
      },
      padding: '25 0 20 0',
      items: [{
        xtype: 'button',
        text: LabelsTitles.PROFILE.PERSONALDETAILS.CANCEL,
        cls: 'karmaform-cancel-btn',
        listeners: {
          click: 'onFormCancelClick'
        }
      }, {
        xtype: 'button',
        text: LabelsTitles.PROFILE.PERSONALDETAILS.SAVE,
        name: 'save',
        cls: 'karmaform-save-btn',
        bind: {
          disabled: '{editpersoneldetailswindowsave}'
        },
        listeners: {
          click: 'onPersonalDetailsFormSaveClick',
        }
      }]
    },

    items: [{
      xtype: 'hiddenfield',
      name: 'personaldetails.ddo_emppersonaldetails_id',
      bind: {
        value: '{setup.employeesetup.EmployeeStore}'
      },
    }, {
      xtype: 'textfield',
      fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.FIRSTNAME,
      name: 'basic.firstname',
      vertical: true,
      allowBlank: false,
      padding: '0 10 10 10',

      disabled: true
    }, {
      xtype: 'textfield',
      padding: '0 10 10 10',
      fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.LASTNAME,
      name: 'basic.lastname',
      allowBlank: false,
      minLength: 8,
      disabled: true
    }, {
      xtype: 'textfield',
      fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.EMAIL,
      name: 'basic.email',
      padding: '0 10 10 10',
      allowBlank: false,
      vtype: 'email',
      disabled: true,
      width: '80%'

    },
      {
        xtype: 'textfield',
        fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.EMPCODE,
        name: 'basic.employee_code',
        allowBlank: false,
        padding: '0 10 5 10',
        disabled: true
      },
      {
        xtype: 'container',
        width: '50%',

        style: {
          'padding-left': '-1px',
          'margin': '0px'
        },
        items: [{
          xtype: 'radiogroup',
          cls: 'employeesetup-radiogroup-cls',
          fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.GENDER,
          labelSeparator: '',
          disabled: true,
          padding: '0 10 10 10',

          width: '100%',

          columns: 4,

          name: 'gender',
          vertical: true,
          items: [{
            boxLabel: LabelsTitles.PROFILE.PERSONALDETAILS.MALE,
            inputValue: 'M',

            checked: true

          }, {
            boxLabel: LabelsTitles.PROFILE.PERSONALDETAILS.FEMALE,
            inputValue: 'F',

          },

          ],
        }]

      },{

        xtype: 'container',
        defaults: {
          labelSeparator: '',
          width: '40%',
          margin: 0
        },
        layout: {
          type: 'hbox',
          pack: 'start',
          align: 'stretch'
        },
        items: [{
          xtype: 'datefield',
          anchor: '50%',
          padding: '0 0 0 5',
          width: '50%',
          fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.DOB,
          emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.DATEEMPTYTEXT,
          format: 'd-m-Y',
  
  
          submitFormat: 'd-m-Y',
          maskRe: /[0-9\-\/]/,
          disabled: true,
  
          cls: 'personal-details-cls',
  
          name: 'personaldetails.dob',
          style: {
  
            'margin': '0px'
          },
          triggers: {
            clear: {
              type: 'clear',
              weight: -1,
              hideWhenEmpty: true,
              handler: function(cmp) {
                if (Ext.isFunction(cmp.clearValue)) {
                  cmp.clearValue();
                } else {
                  cmp.setValue('');
                }
              }
            }
          },
          createPicker: function() {
            var me = this,
              format = Ext.String.format;
  
            return Ext.create('Ext.picker.Date', {
              pickerField: me,
              ownerCt: me.ownerCt,
              renderTo: document.body,
              floating: true,
              hidden: true,
              focusOnShow: true,
              cls: 'ddo-create-datepicker',
              minDate: me.minValue,
              maxDate: me.maxValue,
              disabledDatesRE: me.disabledDatesRE,
              disabledDatesText: me.disabledDatesText,
              disabledDays: me.disabledDays,
              disabledDaysText: me.disabledDaysText,
              format: me.format,
              showToday: me.showToday,
              startDay: me.startDay,
              minText: format(me.minText, me.formatDate(me.minValue)),
              maxText: format(me.maxText, me.formatDate(me.maxValue)),
              listeners: {
                scope: me,
                select: me.onSelect
  
              },
              keyNavConfig: {
                esc: function() {
                  me.collapse();
                }
              }
            });
          },
          listeners: {
            select: 'onDateRange',
            focusleave: "onKeyDownDate",
          }
      },{
        xtype: 'textfield',
        name: 'personaldetails.bloodgroup',
        emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.BLOODGROUP,
        fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.BLOODGROUP,
        enableKeyEvents: true,
        listeners: {
          keyup: 'onPersonalDetailsChange'
        },
        triggers: {
          clear: {
            type: 'clear',
            weight: -1,
            hideWhenMouseOut: true,
            hideWhenEmpty: true,
            handler: function(cmp) {
              if (Ext.isFunction(cmp.clearValue)) {
                cmp.clearValue();
              } else {
                cmp.setValue('');
              }

            }
          }
        }
      
          }]
      
      }, {
        xtype: 'container',
        defaults: {
          labelSeparator: '',
          width: '40%',
          margin: 0
        },
        layout: {
          type: 'hbox',
          pack: 'start',
          align: 'stretch'
        },
        items: [{
          xtype: 'combobox',
          width: Constants.ViewportWidth * 0.22,
          padding: '0 5 5 20',
          name: 'personaldetails.maritalstatus',
          displayField: 'name',
          valueField: 'value',
         
          forceSelection: true,
          minChars: 1,
          cls: 'personal-details-cls',
         
          queryMode: 'local',
          lastQuery: '',
          emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.MARITALSTATUS,
          fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.MARITALSTATUS,

          store: Ext.create('Ext.data.Store', {
              fields: ['name', 'value'],
              data: [{
                  "name": "Married",
                  "value": "married"
              }, {
                  "name": "Single",
                  "value": "single"
              }]
          }),
          listeners: {
              select: 'onMartialStaus',
              
          }
      },
          , {
            xtype: 'datefield',
            anchor: '100%',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.ANNIVERSARYDATE,
            emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.DATEEMPTYTEXT,
            format: 'd-m-Y',
            padding: '0 0 0 2',
            submitFormat: 'd-m-Y',
            enableKeyEvents: true,
            maskRe: /[0-9\-\/]/,

            cls: 'personal-details-cls',

            name: 'personaldetails.anniversarydate',
            triggers: {
              clear: {
                type: 'clear',
                weight: -1,
                hideWhenEmpty: true,
                handler: function(cmp) {
                  if (Ext.isFunction(cmp.clearValue)) {
                    cmp.clearValue();
                  } else {
                    cmp.setValue('');
                  }

                }
              }
            },
            createPicker: function() {
              var me = this,
                format = Ext.String.format;

              return Ext.create('Ext.picker.Date', {
                pickerField: me,
                ownerCt: me.ownerCt,
                renderTo: document.body,
                floating: true,
                hidden: true,
                focusOnShow: true,
                cls: 'ddo-create-datepicker',
                minDate: me.minValue,
                maxDate: me.maxValue,
                disabledDatesRE: me.disabledDatesRE,
                disabledDatesText: me.disabledDatesText,
                disabledDays: me.disabledDays,
                disabledDaysText: me.disabledDaysText,
                format: me.format,
                showToday: me.showToday,
                startDay: me.startDay,
                minText: format(me.minText, me.formatDate(me.minValue)),
                maxText: format(me.maxText, me.formatDate(me.maxValue)),
                listeners: {
                  scope: me,
                  select: me.onSelect

                },
                keyNavConfig: {
                  esc: function() {
                    me.collapse();
                  }
                }
              });
            },
            listeners: {
              select: 'onDateRange',
              keypress:'onPersonalDetailsChange',
              focusleave: "onKeyDownDate"
            }
          }]
      }, {
        xtype: 'container',
        defaults: {
          labelSeparator: '',
          width: '50%',

        },
        layout: {
          type: 'hbox',
          pack: 'start',
          align: 'stretch'
        },
        items: [{
          xtype: 'numberfield',
          regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          regexText: LabelsTitles.PROFILE.PERSONALDETAILS.PHONEREGEX,
          name: 'personaldetails.phoneno',

          emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.PHONEEMPTY,
          fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.PHONELABEL,
          hideTrigger: true,
          padding: '0 10 5 10',
          maxLength: 10,
          minLength: 10,
          enforceMaxLength: true,
          enableKeyEvents: true,
          listeners: {
            keyup: 'onPersonalDetailsChange'
          },
          triggers: {
            clear: {
              type: 'clear',
              weight: -1,
              hideWhenEmpty: true,
              handler: function(cmp) {
                if (Ext.isFunction(cmp.clearValue)) {
                  cmp.clearValue();
                } else {
                  cmp.setValue('');
                }
              }
            }
          }
        }, {
          xtype: 'numberfield',
          regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          regexText: LabelsTitles.PROFILE.PERSONALDETAILS.PHONEREGEX,
          name: 'personaldetails.emergencyphoneno',

          emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.PHONEEMPTY,
          fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMERGENCYPHN,
          hideTrigger: true,
          padding: '0 10 5 10',
          maxLength: 10,
          minLength: 10,
          enforceMaxLength: true,
          enableKeyEvents: true,
          listeners: {
            keyup: 'onPersonalDetailsChange'
          },
          triggers: {
            clear: {
              type: 'clear',
              weight: -1,
              hideWhenEmpty: true,
              handler: function(cmp) {
                if (Ext.isFunction(cmp.clearValue)) {
                  cmp.clearValue();
                } else {
                  cmp.setValue('');
                }
              }
            }
          }
        }]
      },
      {
        xtype: 'container',
        defaults: {
          labelSeparator: '',
          width: '50%',

        },
        layout: {
          type: 'hbox',
          pack: 'start',
          align: 'stretch'
        },
        items: [{
          xtype: 'textfield',
          name: 'personaldetails.panno',
          enforceMaxLength: true,
          maxLength: 20,
          emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.PANNO,
          fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.PANNO,
          padding: '0 10 5 10',
          enableKeyEvents: true,
          listeners: {
            keyup: 'onPersonalDetailsChange'
          },
          triggers: {
            clear: {
              type: 'clear',
              weight: -1,
              hideWhenMouseOut: true,
              hideWhenEmpty: true,
              handler: function(cmp) {
                if (Ext.isFunction(cmp.clearValue)) {
                  cmp.clearValue();
                } else {
                  cmp.setValue('');
                }

              }
            }
          }
        }, {
          xtype: 'textfield',
          name: 'personaldetails.aadharno',
          enforceMaxLength: true,
          maxLength: 16,
          emptyText: LabelsTitles.PROFILE.PERSONALDETAILS.ADHAARNO,
          fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.ADHAARNO,
          enableKeyEvents: true,
          listeners: {
            keyup: 'onPersonalDetailsChange'
          },
          triggers: {
            clear: {
              type: 'clear',
              weight: -1,
              hideWhenMouseOut: true,
              hideWhenEmpty: true,
              handler: function(cmp) {
                if (Ext.isFunction(cmp.clearValue)) {
                  cmp.clearValue();
                } else {
                  cmp.setValue('');
                }
                this.up('form').getViewModel().set('editpersoneldetailswindowsave', false);
              }
            }
          }
        }]
      },
      {
        xtype: 'fieldset',
        title: LabelsTitles.PROFILE.PERSONALDETAILS.CADDRESS,
        reference: 'currentaddrRef',
        cls: 'employeesetup-fieldset-cls',
        collapsible: true,
        defaults: {
          anchor: '90%',
          enableKeyEvents: true,
          listeners: {
            keyup: 'onPersonalDetailsChange'
          },
          labelSeparator: ''
        },
        items: [
          
          
          {
            xtype: 'textarea',
            enforceMaxLength: true,
            maxLength: 160,
            name: 'addresses[0].details',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.DETAILS,
            maskRe: /[^!\"\'\$\@\#\%\^\&\*\(\)\_\+\=\{\}\]\[\?\:\;\<\>\%\|\\\`\~\+^]/,
            cls: 'employee-setup-txtfield-cls'
          }, {
            xtype: 'textfield',
            name: 'addresses[0].country',
            reference: 'countryComboRef',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.COUNTRY,
            cls: 'employeesetup-combo-cls',
            
           
          }, {
            xtype: 'textfield',
            reference: 'stateComboRef',
            name: 'addresses[0].state',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.STATE,
            cls: 'employeesetup-combo-cls'
          }, {
            xtype: 'textfield',
            name: 'addresses[0].city',
            reference: 'cityComboRef',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.CITY,
            cls: 'employeesetup-combo-cls'
          }, {
            xtype: 'numberfield',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.ZIP,
            name: 'addresses[0].zipcode',
            reference: 'zipcode',
            hideTrigger: true,
            cls: 'employeesetup-combo-cls'
          }]
      },
      {
        xtype: 'fieldset',
        title: LabelsTitles.PROFILE.PERSONALDETAILS.PADDRESS,
        cls: 'employeesetup-fieldset-cls',
        reference: 'permanentaddrRef',
        collapsible: true,
        defaults: {
          anchor: '90%',
          enableKeyEvents: true,
          listeners: {
            keyup: 'onPersonalDetailsChange'
          },
          labelSeparator: ''
        },
        items: [
        
          {
            xtype: 'checkbox',
            boxLabel: LabelsTitles.PROFILE.PERSONALDETAILS.CHECKADDRESS,
            cls: 'employeesetup-chkbox-cls',
            name: 'ischecked',
            reference: 'checkbxRef',
            listeners: {
              keyup: 'onChange'
            }
          }, {
            xtype: 'textarea',
            enforceMaxLength: true,
            maxLength: 160,
            readOnly: false,
            name: 'addresses[1].details',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.DETAILS,
            cls: 'employee-setup-txtfield-cls',
            bind: {
              disabled: '{checkbxRef.checked}'
            }
          }, {
            xtype: 'textfield',
            name: 'addresses[1].country',
            reference: 'countryPermanentRef',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.COUNTRY,
            readOnly: false,
            cls: 'employeesetup-combo-cls',
            bind: {
              disabled: '{checkbxRef.checked}'
            }
          }, {
            xtype: 'textfield',
            name: 'addresses[1].state',
            reference: 'statePermanentRef',
            readOnly: false,
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.STATE,
            cls: 'employeesetup-combo-cls',
            bind: {
              disabled: '{checkbxRef.checked}'
            }
          }, {
            xtype: 'textfield',
            name: 'addresses[1].city',
            reference: 'cityPermanentRef',
            readOnly: false,
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.CITY,
            cls: 'employeesetup-combo-cls',
            bind: {
              disabled: '{checkbxRef.checked}'
            }
          }, {
            xtype: 'numberfield',
            fieldLabel: LabelsTitles.PROFILE.PERSONALDETAILS.ZIP,
            name: 'addresses[1].zipcode',
            reference: 'permanentzipcode',
            hideTrigger: true,
            readOnly: false,
            cls: 'employeesetup-combo-cls',
            bind: {
              disabled: '{checkbxRef.checked}'
            }
          }]
      }
    ]
  }]


});


