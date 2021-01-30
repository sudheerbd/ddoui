/**
 *   This file is responsible for EmployeeAddress view.
 *   @extends {Ext.form.Panel}
 *   @alias widget.employeeaddress
 *   ViewModel :  'DDO.view.setup.employeesetup.EmployeeAddressViewModel'
 *   ViewController : 'DDO.view.setup.employeesetup.EmployeeAddressController'.
 */

Ext.define('DDO.view.setup.employeesetup.EmployeeAddress', {
    extend: 'Ext.form.Panel',
    requires: [
        'DDO.view.setup.employeesetup.EmployeeAddressController',
        'DDO.view.setup.employeesetup.EmployeeAddressViewModel',
        'Ext.form.FieldSet'
    ],
    alias: 'widget.employeeaddress',
    title: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.TITLE,
    scrollable: true,
    height: Constants.ViewportHeight * 0.93,
    bodyPadding: 10,
    trackResetOnLoad: true,
    controller: 'empaddresscontroller',
    viewModel: {
        type: 'empaddressviewmodel'
    },
    bbar: {
        padding: '25 0 20 0',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.CANCEL,
            cls: 'karmaform-cancel-btn',
            listeners: {
                click: 'onFormCancelClick'
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.SAVE,
            cls: 'workdetails-save-btn',
            bind: {
                disabled: '{addresssavebutton}'
            },
            listeners: {
                click: 'onFormSaveClick'
            }
        }]
    },
    items: [{
        xtype: 'fieldset',
        title: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.CADDRESS,
        reference: 'currentaddrRef',
        cls: 'employeesetup-fieldset-cls',
        collapsible: true,
        defaults: {
            anchor: '90%',
            listeners: {
                change: 'onAddressChange'
            },
            labelSeparator: ''
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_employee_cur_address_id'
        }, {
            xtype: 'textarea',
            enforceMaxLength: true,
            maxLength: 160,
            name: 'currentdetails',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.DETAILS,
            maskRe: /[^!\"\'\$\@\#\%\^\&\*\(\)\_\+\=\{\}\]\[\?\:\;\<\>\%\|\\\`\~\+^]/,
            cls: 'employee-setup-txtfield-cls'
        }, {
            xtype: 'textfield',
            name: 'currentcountryid',
            reference: 'countryComboRef',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.COUNTRY,
            cls: 'employeesetup-combo-cls'
        }, {
            xtype: 'textfield',
            reference: 'stateComboRef',
            name: 'currentregionid',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.STATE,
            cls: 'employeesetup-combo-cls'
        }, {
            xtype: 'textfield',
            name: 'currentcityid',
            reference: 'cityComboRef',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.CITY,
            cls: 'employeesetup-combo-cls'
        }, {
            xtype: 'numberfield',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.ZIP,
            name: 'zipcode',
            reference: 'zipcode',
            hideTrigger: true,
            cls: 'employeesetup-combo-cls'
        }]
    }, {
        xtype: 'fieldset',
        title: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.PADDRESS,
        cls: 'employeesetup-fieldset-cls',
        reference: 'permanentaddrRef',
        collapsible: true,
        defaults: {
            anchor: '90%',
            listeners: {
                change: 'onAddressChange'
            },
            labelSeparator: ''
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_employee_per_address_id'
        }, {
            xtype: 'checkbox',
            boxLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.CHECKADDRESS,
            cls: 'employeesetup-chkbox-cls',
            name: 'ischecked',
            reference: 'checkbxRef',
            listeners: {
                change: 'onChangeChechbox'
            }
        }, {
            xtype: 'textarea',
            enforceMaxLength: true,
            maxLength: 160,
            readOnly: false,
            name: 'permanentdetails',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.DETAILS,
            cls: 'employee-setup-txtfield-cls'
        }, {
            xtype: 'textfield',
            name: 'permanentcountryid',
            reference: 'countryPermanentRef',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.COUNTRY,
            readOnly: false,
            cls: 'employeesetup-combo-cls'
        }, {
            xtype: 'textfield',
            name: 'permanentregionid',
            reference: 'statePermanentRef',
            readOnly: false,
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.STATE,
            cls: 'employeesetup-combo-cls'
        }, {
            xtype: 'textfield',
            name: 'permanentcityid',
            reference: 'cityPermanentRef',
            readOnly: false,
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.CITY,
            cls: 'employeesetup-combo-cls'
        }, {
            xtype: 'numberfield',
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ADDRESSFORM.ZIP,
            name: 'permanentzipcode',
            reference: 'permanentzipcode',
            hideTrigger: true,
            readOnly: false,
            cls: 'employeesetup-combo-cls'
        }]
    }]
});