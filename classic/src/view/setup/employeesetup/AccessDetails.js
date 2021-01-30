/**
 * The file 'DDO.view.setup.employeesetup.AccessDetails' is the view file for accessdetails.
 * @extends {Ext.form.Panel}
 * @alias 'widget.accessdetails'.
 * ViewModel : 'DDO.view.setup.employeesetup.AccessDetailsViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.AccessDetailsController'
 */
Ext.define('DDO.view.setup.employeesetup.AccessDetails', {
    extend: 'Ext.form.Panel',

    requires: [
        'DDO.view.setup.employeesetup.AccessDetailsViewModel',
        'DDO.view.setup.employeesetup.AccessDetailsController',
         'DDO.overrides.form.field.Tag'
    ],

    alias: 'widget.accessdetails',

    title: LabelsTitles.EMPSETUP.EMPTAB.EMP.ACCESSFORM.TITLE,

    controller: 'accessdetailscontroller',
    viewModel: {
        type: 'accessdetailsviewmodel'
    },

    bbar: {
        padding: '25 0 20 0',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.ACCESSFORM.CANCEL,
            cls: 'karmaform-cancel-btn',
            listeners: {
                click: 'onFormCancelClick'
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.ACCESSFORM.SAVE,
            // bind:{
            //     disabled:'{accesssavebutton}'
            // },
            cls: 'workdetails-save-btn',
            listeners: {
                click: 'onFormSaveClick'
            }
        }]
    },

    items: [{
        xtype: 'hiddenfield',
        name: 'ddo_employee_id',
        bind: {
            value: '{ddo_employee_id}'
        }
    }, {
        xtype: 'tagfield',
        name: 'roleid',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.ACCESSFORM.ROLE,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.ACCESSFORM.ROLE,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        // Added clearOnBackspace config in event. 6.0.1 not supported clearOnBackspace so I have ovverided.
        clearOnBackspace: false,
        editable: true,
        store: 'setup.role.RoleStore',
        width: '100%',
        //cls: 'employee-setup-cls',
        cls: 'employee-form-cls',
        valueField: 'ddo_role_id',
        displayField: 'name',
        labelSeparator: '',
        queryMode: 'local',
        filterPickList: true,
        listConfig: {
            cls: 'tag-view-list'
        },
        listeners: {
            select:'onAccessDetailsSelect',
            beforedeselect:'onAccessDetailsBeforeSelect'
        }
    }]
});