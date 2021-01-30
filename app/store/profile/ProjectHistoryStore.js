Ext.define('DDO.store.profile.ProjectHistoryStore',{
    extend: 'Ext.data.Store',
    alias: 'store.projecthistorystore',
    requires:[
        'DDO.model.profile.ProjectHistoryModel'
    ],
    model: 'DDO.model.profile.ProjectHistoryModel',
    autoLoad: false,
    method: 'GET',
    storeId: 'projecthistorystore',
    proxy:{
        type: 'ajax',
        url: Api.URL.projecthistorystore.READ,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

})