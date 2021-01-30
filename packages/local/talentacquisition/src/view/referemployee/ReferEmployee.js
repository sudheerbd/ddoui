Ext.define('TalentAcquisition.view.referemployee.ReferEmployee', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.referemployeeview',

    requires: [
        'TalentAcquisition.view.referemployee.ReferEmployeeForm',
        'TalentAcquisition.view.referemployee.ReferEmployeeGrid',
        'TalentAcquisition.view.referemployee.ReferEmployeeController',
        'TalentAcquisition.view.referemployee.ReferEmployeeViewModel'
        //'TalentAcquisition.store.referemployee.ReferEmployeeStore'
    ],
   // title: 'Refer a Friend',
    controller: 'referemployeecontroller',
    viewModel: {
        type: 'referemployeeviewmodel'
    },
    layout:{
        type:"card",
        activeItem:0
    },    
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Job Openings',
        grid: 'referemployeegrid',
        gridStore: Ext.create('TalentAcquisition.store.jobopenings.JobOpeningsStore')  ,
        filterData:[{
            name:"Job Name",
            value:"name"
        },{
            name:"Location",
            value:"ddo_joblocation_name"
        },{
            name:"Designation",
            value:"ddo_designation_name"
        },{
            name:"skills",
            value:"primaryskills"
        },{
            name:"status",
            value:"jobstatus"
        }],
        fbButtonRequired: false
    },{
        xtype:"referemployeeform"
    }],
    listeners:{activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('[name=filterColumn]').reset();
            this.down('referemployeegrid').getStore().load();
        }}
});