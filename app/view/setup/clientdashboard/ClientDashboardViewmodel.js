Ext.define('DDO.view.setup.clientdashboard.ClientDashboardViewmodel', {
	extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.clientdashboardviewmodel',
    stores:{
        projectclientstore:{
           type:'clientdashboardStore'
        }
    }
    
});