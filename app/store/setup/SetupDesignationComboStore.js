Ext.define('DDO.store.setup.SetupDesignationComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.setupdesignation',

    requires: [
        'DDO.model.setup.SetupDesignation'
    ],

    model: 'DDO.model.setup.SetupDesignation',

    //autoLoad: true,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.setupdesignationcombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        transform: function(item) {
            if(item)          
            return item.toLowerCase();
        },
        property: "name",
        direction: "ASC"
    }]
});
