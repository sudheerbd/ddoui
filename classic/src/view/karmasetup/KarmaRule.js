/**
 * The file KarmaRule is the view file for karma rule in karma setup.
 * @extends {Ext.container.Container}.
 * @alias 'widget.karmarule'.
 * ViewModel : 'DDO.view.karmasetup.KarmaRuleViewModel',
 * ViewController : 'DDO.view.karmasetup.KarmaRuleViewController'.
 */
Ext.define('DDO.view.karmasetup.KarmaRule', {
    extend: 'Ext.container.Container',

    alias: 'widget.karmarule',

    width: '100%',

    cls: 'karmarule-cls',

    requires: [
        'DDO.view.karmasetup.grid.KarmaList',
        'DDO.view.karmasetup.toolbar.RuleToolbar',
        'DDO.view.karmasetup.KarmaRuleViewController',
        'DDO.view.karmasetup.KarmaRuleViewModel',
        'DDO.view.karmasetup.window.RuleWindow'
    ],

    controller: 'karmaruleviewcontroller',
    viewModel: {
        type: 'karmaruleviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var cardsView = this.up('karmadataviewcards'),
            //  store =cardsView.getViewModel().getStore('karmarulestore');
            store = Ext.getStore('karmasetup.KarmaRuleStore');
        if (!store.isLoaded()) {
            store.load();
        }
    },

    items: [{
        xtype: 'ruletoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height:Constants.ViewportHeight*0.11
    },{
        xtype: 'karmalist',
        // bind : {
        store : 'karmasetup.KarmaRuleStore'
        // }
    }]
});