Ext.define('DDO.view.karmasetup.karma.Karma', {
    extend: 'Ext.container.Container',

    alias: 'widget.karma',

    cls: 'karmarule-cls',

    requires: [
        'DDO.view.karmasetup.karma.KarmaGrid',
        'DDO.view.karmasetup.toolbar.RuleToolbar',
        'DDO.view.karmasetup.karma.KarmaViewController',
        'DDO.view.karmasetup.karma.KarmaViewModel',
        'DDO.view.karmasetup.window.KarmaWindow'
    ],

    controller: 'karmaviewcontroller',
    viewModel: {
        type: 'karmaviewmodel'
    },

    initComponent: function() {
        Ext.getStore('karmasetup.KarmaStore').load();
        this.callParent(arguments);
    },

    items: [{
        xtype: 'ruletoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: 70
        // html: '<h3>Karma</h3>'
    },{
        xtype: 'karmagrid',
        // store: 'karmasetup.KarmaStore'
        bind:{
            store:'{karmaGridStore}'
        }
    }]
});