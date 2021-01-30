/**
 * The file 'DDO.view.setup.employeesetup.PersonalDetailsTab' is the form panel of PersonalDetails tab.
 * @extends {Ext.form.Panel}
 * @alias 'widget.personaldetailstab'.
 * ViewModel : 'DDO.view.setup.employeesetup.PersonalDetailsTabViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.PersonalDetailsTabController'.
 */
Ext.define('DDO.view.setup.employeesetup.PersonalDetailsTab', {
  extend: 'Ext.form.Panel',

  requires: [
    'DDO.view.setup.employeesetup.PersonalDetailsTabController',
    'DDO.view.setup.employeesetup.PersonalDetailsTabViewModel',
    'Ext.form.RadioGroup',
    'DDO.ux.form.trigger.Clear'
  ],

  alias: 'widget.personaldetailstab',

  title: LabelsTitles.EMPSETUP.EMPTAB.EMP.PERSONALDETAILS,

  trackResetOnLoad: true,

  controller: 'personaldetailstabcontroller',
  viewModel: {
    type: 'personaldetailstabviewmodel'
  },

  bbar: {
    layout: {
      type: 'hbox'
    },
    padding: '25 0 20 0',
    items: [{
      xtype: 'button',
      text: LabelsTitles.EMPSETUP.EMPTAB.EMP.CANCELBTN,
      cls: 'karmaform-cancel-btn',
      listeners: {
        click: 'onFormCancelClick'
      }
    }, {
      xtype: 'button',
      text: LabelsTitles.EMPSETUP.EMPTAB.EMP.PERSONALSAVEBTN,
      cls: 'karmaform-save-btn',
      bind: {
        disabled: '{personaldetailssavebutton}'
      },
      listeners: {
        click: 'onPersonalDetailsFormSaveClick'
      }
    }]
  },
  defaults: {
    labelSeparator: ''
  },
  items: [{
    xtype: 'hiddenfield',
    name: 'ddo_emppersonaldetails_id'
  }, {

    xtype: 'container',
    defaults: {
      labelSeparator: '',
      width: '50%',
      padding: 10,
      cls: 'personal-details-cls'
    },
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'stretch'
    },
    items: [{
      xtype: 'datefield',
      anchor: '50%',
      padding: 10,
      width: '50%',
      fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.DOB,
      emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.DATEEMPTYTEXT,
      afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
      format: 'd-m-Y',
      submitFormat: 'd-m-Y',
      maskRe: /[0-9\-\/]/,
      maxValue: new Date(),
      allowBlank: false,
      cls: 'personal-details-cls',
      name: 'dob',
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
            this.up('form').getViewModel().set('personaldetailssavebutton', false);
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
        focusleave: "onKeyDownDate"
      }
    }
    ]
  }, {
      xtype: 'container',
      defaults: {
        labelSeparator: '',
        width: '50%',
        padding: 10,
        cls: 'personal-details-cls'
      },
      layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
      },
      items: [{
        xtype: 'radiogroup',
        cls: 'employeesetup-radiogroup-cls',
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.GENDER,
        labelSeparator: '',
        // Arrange radio buttons into two columns, distributed vertically
        columns: 4,
        name: 'gender',
        vertical: true,
        items: [{
          boxLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.MALE,
          inputValue: 'M',
          checked: true
        }, {
          boxLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.FEMALE,
          inputValue: 'F'
        }],
      }, {
        xtype: 'textfield',
        name: 'bloodgroup',
        reference: 'bloodgroup',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.BLOODGROUP,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.BLOODGROUP,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        enableKeyEvents: true,
        allowBlank: false,
        listeners: {
          keyup: 'onFormValid'
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
              this.up('form').getViewModel().set('personaldetailssavebutton', false);
            }
          }
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
        xtype: 'combobox',
        width: Constants.ViewportWidth * 0.22,
        padding: '0 0 0 10',
        name: 'maritalstatus',
        displayField: 'name',
        valueField: 'value',
        editable: false,
        forceSelection: true,
        minChars: 1,
        cls: 'personal-details-cls',
        queryMode: 'local',
        lastQuery: '',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.MARITALSTATUS,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.MARITALSTATUS,

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
      }, {
        xtype: 'datefield',
        anchor: '100%',
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ANNIVERSARYDATE,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.DATEEMPTYTEXT,
        format: 'd-m-Y',
        padding: '0 0 0 16',
        submitFormat: 'd-m-Y',
        maskRe: /[0-9\-\/]/,
        maxValue: new Date(),
        cls: 'personal-details-cls',
        name: 'anniversarydate',
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
              this.up('form').getViewModel().set('personaldetailssavebutton', false);
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
          focusleave: "onKeyDownDate"
        }
      }]
    }, {
      xtype: 'container',
      defaults: {
        labelSeparator: '',
        width: '50%',
        padding: 10,
        cls: 'personal-details-cls'
      },
      layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
      },
      items: [{
        xtype: 'numberfield',
        regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        regexText: LabelsTitles.EMPSETUP.EMPTAB.EMP.PHONEREGEX,
        name: 'phoneno',
        reference: 'phoneno',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.PHONEEMPTY,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.PHONELABEL,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        hideTrigger: true,
        maxLength: 10,
        minLength: 10,
        enforceMaxLength: true,
        allowBlank: false,
        enableKeyEvents: true,
        listeners: {
          keyup: 'onFormValid'
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
              this.up('form').getViewModel().set('personaldetailssavebutton', false);
            }
          }
        }
      }, {
        xtype: 'numberfield',
        regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        regexText: LabelsTitles.EMPSETUP.EMPTAB.EMP.PHONEREGEX,
        name: 'emergencyphoneno',
        reference: 'emergencyphoneno',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.PHONEEMPTY,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMERGENCYPHN,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        hideTrigger: true,
        maxLength: 10,
        minLength: 10,
        enforceMaxLength: true,
        allowBlank: false,
        enableKeyEvents: true,
        listeners: {
          keyup: 'onFormValid'
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
              this.up('form').getViewModel().set('personaldetailssavebutton', false);
            }
          }
        }
      }
      ]
    }, {
      xtype: 'container',
      defaults: {
        labelSeparator: '',
        width: '50%',
        padding: 10,
        cls: 'personal-details-cls'
      },
      layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
      },
      items: [{
        xtype: 'textfield',
        name: 'panno',
        enforceMaxLength: true,
        maxLength: 20,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.PANNO,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.PANNO,
        enableKeyEvents: true,
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
              this.up('form').getViewModel().set('personaldetailssavebutton', false);
            }
          }
        }
      }, {
        xtype: 'numberfield',
        regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        name: 'aadharno',
        enforceMaxLength: true,
        maxLength: 16,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADHAARNO,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADHAARNO,
        enableKeyEvents: true,
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
              this.up('form').getViewModel().set('personaldetailssavebutton', false);
            }
          }
        }
      }]
    }],

  listeners: {
    fieldvaliditychange: 'onFormValid'
  }
});
