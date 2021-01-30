Ext.define('DDO.view.setup.employeesetup.EmployeeSkills', {
    extend: 'Ext.form.Panel',

    requires: [
        'DDO.view.profile.details.ProfileSkills',
        'DDO.view.setup.employeesetup.EmployeeSkillsController',
        'DDO.view.setup.employeesetup.EmployeeSkillsViewModel',
    ],

    beforeRender: function() {
        var me = this;
        this.callParent(arguments);
        // var skillview = Ext.ComponentQuery.query('profileskills')[0];
        // skillview.getReferences().profileskillsadded.getStore().reload();
        var vm = this.up('employeesetupwindow').getViewModel();
        var skillview = Ext.ComponentQuery.query('profileskills')[0];
        var store = skillview.getReferences().profileskillsadded.getStore();
        store.getProxy().extraParams = {
            employeeid: vm.get('ddo_employee_id')
        }
        store.reload();
    },
    controller: 'employeeskillscontroller',
    viewModel: {
        type: 'employeeskillsviewmodel'
    },
    referance: 'employeeskillview',
    scrollable: 'y',
    alias: 'widget.employeeskills',
    title: ' Skills',
    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 20 0',
        items: [{
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.CANCEL,
            cls: 'karmaform-cancel-btn',
            listeners: {
                click: 'onFormCancelClick'
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.SAVECONTINUE,
            cls: 'workdetails-save-btn',
            bind: {
                disabled: '{employeeskillssavebutton}'
            },
            listeners: {
                click: 'onFormSaveClick'
            }
        }]
    },
  
    items:[{
        xtype: 'profileskills', 

    }
    ]

});
