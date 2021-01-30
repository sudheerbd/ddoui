Ext.define('DDO.store.karmascore.SupervisorComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.supervisor',

    requires: [
        'DDO.model.karmascore.Supervisor'
    ],

    model: 'DDO.model.karmascore.Supervisor',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.supervisorcombostore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: "reportingempname",
        direction: "ASC"
    }]
});