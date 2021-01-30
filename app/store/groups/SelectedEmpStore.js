Ext.define('DDO.store.groups.SelectedEmpStore', {
    extend: 'Ext.data.Store',
    alias: 'store.selectedempstore',
    fields: [
        'c_bpartner_id', 'employee_code', 'employee', 'hr_designation', 'hr_designation_id', 'image'
    ],
    
    proxy: {
        type: 'ajax',
        url: Api.URL.selectedempstore.READ,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});