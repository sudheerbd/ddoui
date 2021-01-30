Ext.define('DDO.store.profile.SelfNominateStore', {
    extend: 'Ext.data.Store',
    alias: 'store.selfnominatestore',
    
    requires: [
        'DDO.model.profile.SelfNominateModel'
    ],
    
    model:'DDO.model.profile.SelfNominateModel',
    
    proxy: {
        type: 'ajax',
        url: 'http://localhost:3300/auth/userdetails?_dc=1543908802478',
        
        reader: {
            type: 'json',
            rootProperty: 'data.fullname'
        }
    }
});