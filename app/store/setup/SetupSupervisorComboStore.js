Ext.define('DDO.store.setup.SetupSupervisorComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.setupsupervisor',

    requires: [
        'DDO.model.setup.SetupSupervisor'
    ],

    model: 'DDO.model.setup.SetupSupervisor',

    autoLoad:false,

    proxy: {
        type: 'ajax',
        url: Api.URL.setupsupervisorcombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: "reportingEmpName",
        direction: "ASC"
    }]
})