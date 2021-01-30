Ext.define('DDO.store.projects.people.SelectedEmployeeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.selectedemployeestore',
   // storeId:'selectedemployeestore',
    fields: [
        'c_bpartner_id', 'employee_code', 'employee', 'hr_designation', 'hr_designation_id', 'image'
    ],
    
    proxy: {
        type: 'ajax',
        url: Api.URL.selectedemployeestore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});