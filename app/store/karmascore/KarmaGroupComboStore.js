Ext.define('DDO.store.karmascore.KarmaGroupComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmagroupcombostore',

    requires: [
        'DDO.model.karmascore.KarmaGroup'
    ],

    model: 'DDO.model.karmascore.KarmaGroup',
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/karmascoreview/groups.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});