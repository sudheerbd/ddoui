Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterview', {
    extend: 'Ext.container.Container',
    alias: 'widget.scheduledinterviewview',

    requires: [
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewGrid',
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewController',
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewViewModel',
        'TalentAcquisition.store.scheduledinterview.ScheduledInterviewStore',
        'Ext.window.MessageBox'
    ],
    controller: 'scheduledinterviewcontroller',
    viewModel: {
        type: 'scheduledinterviewviewmodel'
    },
    items: [{
        xtype: 'collapsiblecontainer',
        mainContainerTitle: 'Interview Request',
        name:'scheduledinterviewviewcols',
        grid: 'scheduledinterviewgrid',
        hideButton:true,
        bigForm: true,
        gridStore: Ext.create('TalentAcquisition.store.scheduledinterview.ScheduledInterviewStore'),
        form: 'scheduledinterviewform',
        fbButtonRequired: false
    }],
    listeners:{
        activate :function ( newActiveItem, me, oldActiveItem, eOpts ){
            //this.down('collapsiblecontainer').down('button[iconCls=rule-plus]').disable();
            var store = this.down('grid').getStore();
            var loggedInEmployeeId = Ext.getStore('login').data.items[0].getData().ddo_employee_id;
            store.load();
            store.setRemoteFilter(false);
            store.filter(
                {property: 'intervieweremployeeid', value: loggedInEmployeeId}
            );
            store.sort({
                property: 'ddo_scheduleinterview_id', 
                direction: 'DESC'
            });
            setTimeout(function(){
                if(store.getCount()==0){
                    Ext.Msg.alert("Alert", ' No Interview is scheduled for you ');
                }
            },1500);
        }
    }
});
