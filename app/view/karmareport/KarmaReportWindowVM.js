
Ext.define('DDO.view.karmareport.KarmaReportWindowVM', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.karmareportwindowvm',

	data: {
        searchbtn:true,
		isSearchClick : false
	},
    stores: {
        
            employeedesinationstore: {
                  autoLoad: true,
                      proxy: {
                          type: 'ajax',
                          url: Api.URL.profile.EMPDESIGNATION,
                          reader: {
                              type: 'json',
                              rootProperty:'data'
                          } 
                      }
                  },
    }
});