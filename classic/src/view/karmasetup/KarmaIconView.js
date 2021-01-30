/**
 * This is Karma rating view in karma setup section responsible for adding new rating items.
 * @class 'DDO.view.karmasetup.KarmaIconView'
 * @extends 'Ext.container.Container'
 * @alias 'widget.karmaiconview'
 * @requires 'DDO.view.karmasetup.KarmaUploadedIcon'
 */
Ext.define('DDO.view.karmasetup.KarmaIconView', {
    extend: 'Ext.container.Container',

    alias: 'widget.karmaiconview',

    cls: 'karmasetupview-cls',

    minHeight: Constants.ViewportHeight * 0.62,
    
    layout: {
        type: 'vbox',
        align: 'center'
    },

    requires: [
        'DDO.view.karmasetup.KarmaUploadedIcon'
    ],

    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('karmasetup.KarmaIconUploadedStore');

        if (!store.isLoaded()) {
            store.load();
        }
    },

    items: [{
        xtype: 'toolbar',
        cls: 'karmasetup-toolbar-cls',
        width: '100%',
        height: 70
    }, {
        xtype: 'container',
        margin: '10 0',
        layout: {
            type: 'hbox'
        },
        defaults:{
          padding: 10
        },
        items: [{
            xtype: 'karmauploadedicon',
            cls: 'karmauploadedicon-cls'
        },{
            xtype: 'form',
            cls: 'karmasetup-feed-form',
            items: [{
                xtype: 'filefield',
                opType: 'upload',
                name: 'feedsImage',
                reference: "karmaUploadIcon",
                itemId: "karmaUploadIcon",
                accept: 'image',
                buttonOnly: true,
                buttonConfig: {
                    iconCls: 'plus-upload-icon-cls',
                    cls: 'upload-button-cls',
                    width: 65,
                    height: 65,
                    margin: '15 0 0 5'
                },
                width: 70,
                buttonText: '',
                listeners: {
                    change: 'onImgUpload'
                }

            }]
        }]

    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASETUP.KARMARATING.SAVE,
        bind: {
            disabled: '{saveBtnVisible}'
        },
        width: Constants.ViewportWidth * 0.11,
        height: 40,
        listeners: {
            click: 'onIconsSaveClick'
        },
        cls: 'karmicon-save-cls'
    }]
});