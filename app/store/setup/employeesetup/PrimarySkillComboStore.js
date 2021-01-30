Ext.define('DDO.store.setup.employeesetup.PrimarySkillComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.primaryskillcombostore',

    requires: [
        'DDO.model.setup.employeesetup.PrimarySkillComboModel'
    ],

    autoLoad:false,

    model: 'DDO.model.setup.employeesetup.PrimarySkillComboModel',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.primaryskillcombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: "primaryskill_name",
        direction: "ASC"
    }]
});