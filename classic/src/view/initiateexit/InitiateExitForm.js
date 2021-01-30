/**
 * This view is responsible for Initiate exit process by taking input of few details.
 * @class DDO.view.initiateexit.InitiateExitForm,
 * @extends Ext.form.Panel
 * @alias widget.initiateexitform
 * @viewModel : 'DDO.view.initiateexit.InitiateExitViewModel'
 * @controller : 'DDO.view.initiateexit.InitiateExitController'
 */
Ext.define('DDO.view.initiateexit.InitiateExitForm', {
  extend: 'Ext.form.Panel',

  alias: 'widget.initiateexitform',
  height: Constants.ViewportHeight * 0.55,
  cls: 'initiateForm-cls',
  width: Constants.ViewportWidth * 0.36,

  items: [{
    xtype: 'container',
    margin: '25 20 0 25',
    defaults: {
      labelSeparator: '',
      padding: 10,
      width: Constants.ViewportWidth * 0.3,
    },
    layout: {
      type: 'column',
      align: 'left'
    },
    items: [{
      xtype: 'combobox',
      fieldLabel: LabelsTitles.INITIATEEXIT.EMPLOYEE,
      labelAlign: 'left',
      cls: 'employeeexitcombo-cls',
      name: 'employee_id',
      reference: 'employee',
      allowBlank: false,
      msgTarget: 'side',
      queryMode: 'local',
      forceSelection: true,
      bind: {
        store: '{allResourcesStore}',
      },
      displayField: 'employee',
      valueField: 'c_bpartner_id',
      listeners: {
        beforequery: 'onEmployeeComboSearch'
      }
    }, {
      xtype: 'textarea',
      fieldLabel: LabelsTitles.INITIATEEXIT.REASON,
      allowBlank: false,
      reference: 'reason',
      cls: 'employeetext-cls',
    },
      {
        xtype: 'filefield',
        fieldLabel: LabelsTitles.INITIATEEXIT.DOCUMENTUPLOAD,
        reference: 'documentupload',
        cls: 'fileUploadBtn',
        opType: 'upload',
        name: 'appImage',
        listeners: {
          change: 'onDocumentImgChange'
        }
      },
      {
        xtype: 'button',
        text: LabelsTitles.INITIATEEXIT.SUBMIT,
        cls: 'submitbtn-cls',
        formBind: true,
        handler: 'initiateexitsubmitbtnclick'

      }
    ],
  }],
});
