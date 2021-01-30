Ext.define('DDO.store.interests.InterestsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.interestsstore',
    
    requires: [
        'DDO.model.interests.InterestDataModel'
    ],

    model: 'DDO.model.interests.InterestDataModel',
    
    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.interests.READ,
            create: Api.URL.interests.CREATE,
            // update: Api.URL.interests.UPDATE,
            destroy: Api.URL.interests.DESTROY
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            // update: 'POST',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
         writer: {
            writeAllFields: true
        }
    }
});
