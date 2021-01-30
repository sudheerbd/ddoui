Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetails', {
    extend: 'Ext.container.Container',
    alias: 'widget.applicationdetailsview',

    requires: [
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsGrid',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsController',
        'TalentAcquisition.store.jobopenings.ApplicationDetailsStore'
    ],
    controller: 'applicationdetailscontroller',
    items: [{
        xtype: 'collapsiblecontainer',
        name:'applicationdetailsviewcolps',
        mainContainerTitle: 'Application Details',
        grid: 'applicationdetailsgrid',
        gridStore: Ext.create('TalentAcquisition.store.jobopenings.ApplicationDetailsStore'),
        form: 'applicationdetailsform',
        bigForm: true,
        filterData:[{
            name:"status",
            value:"ddo_jobapplicationstatus_name"
        }],
        fbButtonRequired: false
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            this.down('applicationdetailsgrid').getStore().load();
            this.down('applicationdetailsgrid').getStore().sort({
                property: 'ddo_jobapplications_id',
                direction: 'DESC'
            });
        }
    }
});