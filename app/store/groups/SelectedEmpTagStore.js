Ext.define('DDO.store.groups.SelectedEmpTagStore', {
    extend: 'Ext.data.Store',
    alias: 'store.selectedemptagstore',
    fields: [
        'c_bpartner_id', 'employee_code', 'employee', 'hr_designation', 'hr_designation_id', 'image'
    ],
    proxy: {
        type: 'ajax',
        url: Api.URL.selectedemptagstore.READ,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});


