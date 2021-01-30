Ext.define('DDO.view.setup.employeesetup.WorkExperience',{
    extend:'Ext.form.Panel',
   
    requires:[
        'DDO.view.setup.employeesetup.WorkExpContainer',
    // 'DDO.view.setup.employeesetup.WorkExpDetailsView',
    // 'DDO.view.setup.employeesetup.WorkExpForm',
    // 'DDO.view.profile.details.JobsContainer',
    'DDO.view.setup.employeesetup.WorkExpController',
    'DDO.view.setup.employeesetup.WorkExpViewModel',
    
    // 'DDO.view.setup.employeesetup.WorkExpContainerModel'
],

beforeRender: function() {
    
    var me = this;
    this.callParent(arguments);
    var vm = me.up('employeesetupwindow').getViewModel();
    var workExpContainer = me.down('workexpcontainer');
    var store = workExpContainer.getViewModel().getStore('jobsdatastore');
    store.getProxy().extraParams = {
        new_ddo_employee_id: vm.get('ddo_employee_id')
    }
    store.reload();
},
    controller : 'workexpcontroller',
    viewModel: {
        type: 'workexpviewmodel'
    },
   
    scrollable: 'y',
    alias:'widget.employeeworkexperience',
    // layout: {
    //     type: 'fit'
    // },
    reference: 'employeeexpref',
    // itemId: 'employeeworkexperienceid',
    title:' Work Experience',
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
            // bind: {
            //     disabled: '{employeeskillssavebutton}'
            // },
            listeners: {
                click: 'onFormSaveClick'
            }
        }]
    },
    items: [{
        xtype: 'workexpcontainer',
        reference: 'workexpcontainer'
    }]
    // items: [{
    //     xtype: 'jobscontainer',
    //     reference: 'jobscontainer'
    // }]
});