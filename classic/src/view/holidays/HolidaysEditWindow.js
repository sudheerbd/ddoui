


Ext.define('DDO.view.holidays.HolidaysEditWindow',{
    extend:'DDO.ux.window.FormPanel',
    requires:['DDO.ux.window.FormPanel',
            'DDO.view.holidays.HolidaysEditWindowController'
        ],
    alias:'widget.holidayseditwindow',
    controller:'holidayseditwindowcontroller',
    title:'HoliDays',
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    width:Constants.ViewportWidth*0.44,
    height: Constants.ViewportHeight*0.5,

    items:[{
        xtype:'form',
        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: 'CANCEL',
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: 'SAVE',
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        items:[{
            xtype: 'hiddenfield',
            name: 'ddo_holiday_id'
        },{
            xtype:'datefield',
            allowBlank:false,
            name:'date',
            //emptyText:'client name',
            required:true,
            cls: 'rule-name-cls',
            emptyText: 'Date'
        },{
            xtype:'textfield',
            allowBlank:false,
            name:'description',
            emptyText:'Description',
            required:true,
            cls: 'rule-name-cls'
        },
        {
            xtype: 'checkbox',
              boxLabel: 'Optional',
              hidden: false,
              name: 'optional',
              reference: 'optionalRef',
            //   checked:true,
              cls: 'rule-name-cls',
        }
    ]
    }]
});