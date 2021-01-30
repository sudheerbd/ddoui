/**
 * The file KarmaCategories is the view file for karma categories in cards layout.
 * @extends {Ext.container.Container}
 * @alias widget.karmacategories.
 */
Ext.define('DDO.view.karmasetup.KarmaCategories', {
    extend: 'Ext.container.Container',

    alias: 'widget.karmacategories',

    cls: 'karmarule-cls',
    requires: [
        'DDO.view.karmasetup.grid.KarmaList',
        'DDO.view.karmasetup.toolbar.RuleToolbar',
        'DDO.view.karmasetup.KarmaCategoriesViewController',
        'DDO.view.karmasetup.KarmaCategoriesViewModel'
    ],
    controller: 'karmacategoriesviewcontroller',
    viewModel: {
        type: 'karmacategoriesviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('karmasetup.KarmaCategoriesStore');

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
        store: 'karmasetup.KarmaCategoriesStore'
    }]
});