Ext.define('DDO.view.karmasetup.window.KarmaProRated', {
    extend: 'Ext.form.Panel',
    alias:'widget.karmaprorated',
    cls : 'karmaprorated',
    reference : 'Karmaprorated',
    scrollable: {
        direction: 'vertical',
        directionLock: true
        },
    maxHeight : 500,
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
                click: 'onFormPointsViewSaveClickPro'
            }
        }]
    },
    items:[{
            xtype: 'fieldcontainer',
            ref:'addedItemsref',
            layout:'hbox',
            defaults:{
                // width:120,
                margin:'2 10'
            },
            items:[{
                xtype: 'hiddenfield',
                name: 'ddo_karma_id'
            }, {
                xtype: 'hiddenfield',
                name: 'ddo_karmaprorated_instnace_id'
            },{
                    xtype: 'combobox',
                    name: 'designation',
                    cls:'karmapoints-num-cls',
                    emptyText: 'Designation',
                    allowBlank : false,
                    forceSelection: true,
                    displayField : 'name',
                    valueField:'ddo_designation_id',
                    width : 180,
                    queryMode:'local',
                    enableKeyEvents:true,
                    store: Ext.create('store.designationstore'),
                    listeners: {
                        change : 'onComboCheck',
                        afterrender:function(){
                            this.getStore().load();
                        }
                    }
                },{
                    xtype: 'numberfield',
                    name: 'hours',
                    cls:'karmapoints-num-cls',
                    emptyText: 'hours',
                    hideTrigger: true,
                    minLength: 1,
                    width : 80,
                    minValue : 0,
                    enforceMinLength: true,
                    enableKeyEvents: true
                },{
                    xtype: 'combobox',
                    name: 'frequency',
                    cls:'karmapoints-num-cls',
                    emptyText: 'Frequency',
                    forceSelection: true,
                    allowBlank : false,
                    displayField : 'frequency',
                    width : 120,
                    valueField:'value',
                    store : Ext.create('store.karmaproratedinstancefrequencystore',{autoLoad:true}),
                    listeners: {
                        change : 'onComboCheckFre'
                    }
                },{
                    xtype: 'numberfield',
                    name: 'karma',
                    cls:'karmapoints-num-cls',
                    emptyText: 'Karma',
                    allowBlank : false,
                    hideTrigger: true,
                    minLength: 1,
                    minValue : 0,
                    width : 120,
                    enforceMinLength: true
                },{
           xtype:'button',
           text:'',
           iconCls:'plus-new-icon-cls',
           cls:'upload-button-cls',
           width:20,
           height:20,
           margin:'15 0 0 5',
           listeners:{
            click:'onAddItemClickPro'
           }
        }]
    }]
    
});