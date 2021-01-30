Ext.define('DDO.store.karmascore.DesignationComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.designation',

    requires: [
        'DDO.model.karmascore.Designation'
    ],

    model: 'DDO.model.karmascore.Designation',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.designationcombostore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: "designation_name",
        direction: "ASC"
    }]
});