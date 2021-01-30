

Ext.define('DDO.view.holidays.HolidaysWindow',{
    extend:'DDO.ux.window.FormPanel',
    requires:['DDO.ux.window.FormPanel',
            'DDO.view.holidays.HolidaysWindowController'
        ],
    alias:'widget.holidayswindow',
    controller:'holidayswindowcontroller',
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
            // xtype: 'hiddenfield',
            // name: 'ddo_skills_id'
        },{
            xtype:'datefield',
            allowBlank:false,
            name:'name',
            emptyText:'date',
            required:true,
            cls: 'rule-name-cls'
        },{
            xtype:'textfield',
            allowBlank:false,
            name:'description',
            emptyText:'Description',
            required:true,
            cls: 'rule-name-cls'
        },{
            xtype: 'checkbox',
              boxLabel: 'Optional',
              //cls: 'shareable-cls-box',
              hidden: false,
              name: 'optional',
              reference: 'optionalRef',
            cls: 'rule-name-cls'
        }
    ]
    }]
});