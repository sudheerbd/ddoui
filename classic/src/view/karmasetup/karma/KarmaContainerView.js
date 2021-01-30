Ext.define('DDO.view.karmasetup.karma.KarmaContainerView', {
    extend: 'Ext.form.Panel',

    layout: {
        type: 'hbox'
    },
  
    alias: 'widget.ddokarmacontainer',

    padding: '44 30',
    bbar: {
        layout: {
            type: 'hbox',
            align: 'bottom'
        },
        padding: '50 0 0 0',
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
            reference: 'savebtn',
            disabled :true,
            cls: 'karmaform-save-btn',
            listeners: {
                click: 'onFormPointsSaveClick'
            }
        }]
    }
});