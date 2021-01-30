Ext.define('DDO.store.karmascore.DepartmentComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.department',

    requires: [
        'DDO.model.karmascore.Department'
    ],

    model: 'DDO.model.karmascore.Department',

    autoload:false,
    
    proxy: {
        type: 'ajax',
        url: Api.URL.departmentcombostore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
     sorters: [{
        property: "department_name",
        direction: "ASC"
    }]
});