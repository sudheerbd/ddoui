Ext.define('DDO.store.groups.EmpGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.empgroupstore',
    storeId: 'empgroupstore',
    fields: [
        'c_bpartner_id', 'employee_code', 'employee', 'hr_designation', 'hr_designation_id', 'image'
    ],
    proxy: {
        type: 'ajax',
        url: Api.URL.profile.EMPDETAILS,
        extraParams: {
            all: true
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});