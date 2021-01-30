 Ext.define('DDO.view.karmasetup.window.KarmaPoints', {
    extend: 'Ext.form.Panel',
    alias:'widget.karmapoints',
    width: '100%',
    layout: {
            type: 'vbox',
            pack:'center',
            align:'center'

    },
    padding:'20 0',
     bbar:{
        layout: {
            type: 'hbox'
        },
        padding:20,
        items: [{
            xtype: 'button',
            text: 'Back',
            cls: 'karmaform-cancel-btn',
            listeners: {
                click: 'onFormPointsBaclClick'
            }
        }, {
            xtype: 'button',
            text: 'Save',
            cls: 'karmaform-save-btn',
            formBind: true,
            listeners: {
                click: 'onFormPointsViewSaveClick'
            }
        }]
    },
    items:[{
            xtype: 'fieldcontainer',
            ref:'addedItemsref',
            layout:'hbox',
            defaults:{
                width:120,
                margin:'2 10'
            },
            items:[{
                    xtype: 'numberfield',
                    name: 'startrange',
                    cls:'karmapoints-num-cls',
                    emptyText: 'Start Range',
                    hideTrigger: true,
                    minLength: 1,
                    value:1,
                    readOnly:true,
                    enforceMinLength: true,
                    enableKeyEvents: true
                },{
                    xtype: 'numberfield',
                    name: 'endrange',
                    cls:'karmapoints-num-cls',
                    emptyText: 'End Range',
                    hideTrigger: true,
                    minLength: 1,
                    enforceMinLength: true,
                    enableKeyEvents: true
                },{
                    xtype: 'numberfield',
                    name: 'factor',
                    cls:'karmapoints-num-cls',
                    emptyText: 'Factor',
                    hideTrigger: true,
                    stripCharsRe: /\./,
                    minLength: 1,
                    enforceMinLength: true//,
                    // enableKeyEvents: true
                },{
           xtype:'button',
           text:'',
           iconCls:'plus-new-icon-cls',
           cls:'upload-button-cls',
           width:20,
           height:20,
           margin:'15 0 0 5',
           listeners:{
            click:'onAddItemClick'
           }
        }]
    }]

});