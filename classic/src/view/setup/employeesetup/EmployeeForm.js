/**
 *   This file is responsible for EmployeeForm view.
 *   @extends {Ext.form.Panel}
 *   @alias widget.employeeform
 *   ViewModel :  'DDO.view.setup.employeesetup.EmployeeFormViewModel'
 *   ViewController : 'DDO.view.setup.employeesetup.EmployeeFormController'.
 */

Ext.define('DDO.view.setup.employeesetup.EmployeeForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'DDO.view.setup.employeesetup.EmployeeFormViewModel',
        'DDO.view.setup.employeesetup.EmployeeFormController'
    ],
    alias: 'widget.employeeform',
    title: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.TITLE,
    controller: 'employeeformcontroller',
    viewModel: {
        type: 'employeeformviewmodel'
    },
    trackResetOnLoad: true,

    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 20 0',
        items: [{
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.CANCELBTN,
            cls: 'karmaform-cancel-btn',
            listeners: {
                click: 'onFormCancelClick'
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.SAVEBTN,
            cls: 'karmaform-save-btn',
            bind: {
                disabled: '{employeedetailssavebutton}'
            },
            listeners: {
                click: 'onEmployeeFormSaveClick'
            }
        }]
    },
    defaults: {
        listeners: {
            change: 'onEmployeeDetailsChange'
        },
        labelSeparator: '',
        
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'ddo_employee_id'
    }, {
        xtype: 'textfield',
        allowBlank: false,
        name: 'firstname',
        enforceMaxLength: true,
        maxLength: 30,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.FIRSTNAME,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.FIRSTNAME,
        cls: 'employee-form-cls',
        // vtype: 'alpha',
        maskRe : /([a-zA-Z\s\@\_])/
    }, {
        xtype: 'textfield',
        allowBlank: true,
        name: 'middlename',
        enforceMaxLength: true,
        maxLength: 30,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MIDDLENAME,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MIDDLENAME,
        afterLabelTextTpl: '',
        cls: 'employee-form-cls',
        vtype: 'alpha'
    },{
        xtype: 'textfield',
        allowBlank: false,
        name: 'lastname',
        enforceMaxLength: true,
        maxLength: 30,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.LASTNAME,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.LASTNAME,
        cls: 'employee-form-cls',
        // vtype: 'alpha',
        maskRe : /([a-zA-Z\s\@\_])/
    }, {
        xtype: 'textfield',
        name: 'email',
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.EMAIL,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.EMAIL,
        allowBlank: false,
        vtype: 'email',
        cls: 'employee-form-cls'
    }, {
        xtype: 'textfield',
        name: 'employee_code',
        enforceMaxLength: true,
        maxLength: 12,
        allowBlank: false,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.EMPCODE,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.EMPCODE,
        cls: 'employee-form-cls'
    }]
});