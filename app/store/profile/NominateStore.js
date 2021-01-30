Ext.define('DDO.store.profile.NominateStore', {
    extend: 'Ext.data.Store',
    alias: 'store.nominatestore',
    
    requires: [
        'DDO.model.profile.NominateModel'
    ],
    
    model: 'DDO.model.profile.NominateModel',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.nominatestore.READ,

        timeout: 100000, 
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});