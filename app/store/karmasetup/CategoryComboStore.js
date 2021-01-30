Ext.define('DDO.store.karmasetup.CategoryComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.categorycombostore',

    requires: [
        'DDO.model.karmasetup.CategoryComboModel'
    ],

    model: 'DDO.model.karmasetup.CategoryComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: 'resources/data/karmasetup/categorycombo.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});