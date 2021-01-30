Ext.define('DDO.store.setup.department.DepartmentComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.departmentcombostore',

    requires: [
        'DDO.model.setup.department.DepartmentComboModel'
    ],

    model: 'DDO.model.setup.department.DepartmentComboModel',

    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Api.URL.departmentcombo.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
     sorters: [{
        property: "department_name",
        direction: "ASC",
    },{
        property: "name",
        direction: "ASC"
    
    }]
});