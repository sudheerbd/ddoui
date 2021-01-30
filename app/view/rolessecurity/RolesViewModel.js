/**
 * The file RolesViewModel is the ViewModel of the 'DDO.view.rolessecurity.RolesView'.
 */
Ext.define('DDO.view.rolessecurity.RolesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rolessecurity-rolesview',
    requires: ['DDO.model.rolessecurity.RolesModel',
            'DDO.model.rolessecurity.RolesViewModel'],
    data: {
        applyEnable:true
    },
    stores:{
        //This store is used for role combobox.
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
        }
    }

});
