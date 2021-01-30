Ext.define('DDO.store.setup.employeesetup.EmployeeTypeStore', {
	extend: 'Ext.data.Store',
	alias: 'store.employeetypestore',

	autoLoad: false,

	proxy: {
        type: 'ajax',
        url: '/resources/data/emplyoeetypedata.json',
        
        reader: {
            type: 'json',
            rootProperty : "data"
        }
    }
});