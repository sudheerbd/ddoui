Ext.define('DDO.store.aboutlist.AboutStore', {
    extend: 'Ext.data.Store',
    alias: 'store.aboutstore',
    storeId: 'aboutstore',
    requires: [
        'DDO.model.aboutlist.AboutlistModel'
    ],
    model: 'DDO.model.aboutlist.AboutlistModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        // url: 'resources/data/profile/aboutlist.json',
        api: {
            read: Api.URL.about.READ
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.about[0]'    
        }
    }
});
