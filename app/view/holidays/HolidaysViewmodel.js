Ext.define('DDO.view.holidays.HolidaysViewmodel', {
	extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.holidaysviewmodel',
    data: {
        isHRManager: false
    },
    stores:{
        holidaysstore:{
           type:'holidaysstore'
        },
        rolesstore: {
            model:'DDO.model.rolessecurity.RolesModel',
           // autoLoad:true, 
            proxy: {
                type: 'ajax',
                url: Api.URL.rolesstore.READ,
                reader: {
                    type: 'json',
                    rootProperty:'data'
                }
            }
        },
    }
});