Ext.define('DDO.store.profile.Details', {
    extend: 'Ext.data.Store',

    alias: 'store.profiledetails',
    requires: ['DDO.model.profile.Details'],
    model: 'DDO.model.profile.Details',
    storeId: 'profiledetails',
    proxy: {
        type: 'ajax',
        url: Api.URL.details.READ,
        
        reader: {
            type: 'json',
            rootProperty : "data"
        }
    }
});
