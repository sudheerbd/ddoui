Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployee', {
    extend: 'Ext.container.Container',
    alias: 'widget.referredemployeeview',

    requires: [
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeForm',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeGrid',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeController',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeViewModel',
        'TalentAcquisition.store.employeereferral.EmployeeReferralStore',
        'TalentAcquisition.view.referemployee.referredemployee.ConvertToApplication'
    ],
    controller: 'referredemployeecontroller',
    viewModel: {
        type: 'referredemployeeviewmodel'
    },
    layout:{
        type:"card",
        activeItem:0
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Referred Employees',
        name: 'referredEmployeeCollCon',
        grid: 'referredemployeegrid',
        gridStore: Ext.create('TalentAcquisition.store.employeereferral.EmployeeReferralStore'),
        form: 'referredemployeeform',
        bigForm: true,
        fbButtonRequired: false
    }, {
        xtype:"converttoapplication"
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('referredemployeegrid').getStore().load();
        }
    }
});