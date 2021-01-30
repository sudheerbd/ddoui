Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterview', {
    extend: 'Ext.container.Container',
    alias: 'widget.scheduleinterviewview',    
    requires: [
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewGrid',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewController',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewViewModel',
        'TalentAcquisition.store.scheduleinterview.ScheduleInterviewStore'
    ],
    controller: 'scheduleinterviewcontroller',
    viewModel: {
        type: 'scheduleinterviewviewmodel'
    },
    mainContainerTitle: 'Schedule Interview',
    layout:'card',
    activeItem:0,
    items:[{
        xtype:'panel',
        cls: 'ta-header',
        title: 'Schedule Interview',
        //bodyCls:'scheduleinterviewview-grid-cls',
        tools:[{
            xtype: 'button',
            iconCls: 'goalsbackbtn-cls',
            scale:'medium',
            cls: 'back-btn-cls',
            style:{
                    border: 0
                },
            listeners:{
                click:'onBackButtonClick'
            }
        },{
            xtype: 'button',
            margin: '0 0 0 10',
            style:{
                    border: 0
                },
            scale:'medium',
            text:'Interview Details',
            cls: 'back-btn-cls',
            listeners:{
                click:'onInterviewDetailsClick'
            }
        }],
        items: [{
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Schedule Interview',
            grid: 'scheduleinterviewgrid',
            gridStore: Ext.create('TalentAcquisition.store.scheduleinterview.ScheduleInterviewStore'),
            form: 'scheduleinterviewform',
            bigForm: true,
            fbButtonRequired: true,
            scheduleFbButton : true
        }],
        lbar:{
            width:30,
            height:'100%',
            layout: {
                type: 'vbox'
            },
            items: [{
                xtype:'tbfill'
            },{
                xtype: 'button', 
                iconCls: 'rule-plus',
                focusable:false,
                floating: true,
                shadow: false,
                autoShow: true,
                tooltip: 'Add New',
                cls: 'ta-float-btn x-floating',                        
                handler: 'onFabBtnClick'
            }]
        }
    },{
        xtype:'panel',
        //bodyCls:'scheduleinterviewview-grid-cls',
        title: 'Schedule Interview',
        tools:[{
            xtype: 'button',
            iconCls: 'goalsbackbtn-cls',
            scale:'medium',
            cls: 'back-btn-cls',
            style:{
                    border: 0
                },
            listeners:{
                click:'onBackButtonClick'
            }
        },{
            xtype: 'button',
            margin: '0 0 0 10',
            style:{
                    border: 0
                },
            scale:'medium',
            text:'Interview Details',
            cls: 'back-btn-cls',
            listeners:{
                click:'onInterviewDetailsClick'
            }
        }],
        xtype:"scheduleinterviewform",
        name:'scheduleinterview'
    }]
    
});
