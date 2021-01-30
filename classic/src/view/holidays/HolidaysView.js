Ext.define('DDO.view.holidays.HolidaysView',{
    extend : 'Ext.container.Container',
    alias : 'widget.holidaysview',
    cls:'skillsview-cls',
    requires:[
         'DDO.view.holidays.HolidaysGrid',
         'DDO.view.holidays.HolidaysViewController',
         'DDO.view.holidays.HolidaysWindow',
         'DDO.view.holidays.HolidaysViewmodel',
         'DDO.view.holidays.HolidaysEditWindow',
         'DDO.store.holidays.HolidaysStore'
    ],
        controller : "holidaysviewcontroller",
        viewModel:{
         type:'holidaysviewmodel'
        },
    items:[{
        items:[
            {
                 xtype: 'toolbar',
                 cls: 'wallet-toolbar-cls',
                 width: '100%',
                height: Constants.ViewportHeight*0.11,
                 html: '<h3>Holidays</h3>',
                items: [{
                    xtype: 'tbfill'
                }, {
                    xtype: 'button',
                    text: LabelsTitles.EMPSETUP.DEPARTMENT.ADDNEW,
                    iconCls: 'rule-plus',
                    margin: 0,
                    cls: 'rule-add-btn',
                    listeners: {
                        click: 'onAddNewClick'
                    },
                    bind:{
                        hidden: '{!isHRManager}'
                    }
                    // hidden:true
                }]
            },
            // {
            //     xtype:'tbfill'
            // },
            {
                xtype:'button',
                text:'Upcoming Holidays',
                cls:'upcomingholidaysbtn-cls',
                handler:'onUpcomingHolidays',
                
            }
        ],
    }, 
    {
        xtype:'holidaysgrid'
    }],
    listeners:{
        afterRender:'onViewrender'
    }
    });