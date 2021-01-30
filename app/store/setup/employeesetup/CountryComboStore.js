Ext.define('DDO.store.setup.employeesetup.CountryComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.countrycombostore',

    requires: [
       'DDO.model.setup.employeesetup.CountryComboModel'
    ],

    autoLoad:false,

    model: 'DDO.model.setup.employeesetup.CountryComboModel',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.countrycombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
     sorters: [{
        property: "country_name",
        direction: "ASC"
    }]
});