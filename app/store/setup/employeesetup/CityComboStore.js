Ext.define('DDO.store.setup.employeesetup.CityComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.citycombostore',

    requires: [
        'DDO.model.setup.employeesetup.CityComboModel'
    ],

    autoLoad:false,

    model: 'DDO.model.setup.employeesetup.CityComboModel',
    
   proxy: {
        type: 'ajax',
        url: Api.URL.citycombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: "cityname",
        direction: "ASC"
    }]
});