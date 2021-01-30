Ext.define('DDO.view.setup.role.RoleWindowViewModel',{
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rolewindowviewmodel',
    requires : ['DDO.model.rolessecurity.RolesViewModel',
                 'DDO.model.rolessecurity.RolesModel'],
    data: {
        applyEnable:true,
        ddo_role_id:''
    },
    stores : {
            //This store is used for role grid.
            rolesGridStore: {
                model:'DDO.model.rolessecurity.RolesViewModel',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: Api.URL.rolesviewstore.READ,
                    reader: {
                        type: 'json',
                        rootProperty:'data'
                    }
                }
            },
            // roles combo store
            rolesstore: {
                model:'DDO.model.rolessecurity.RolesModel',
                autoLoad:true, 
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