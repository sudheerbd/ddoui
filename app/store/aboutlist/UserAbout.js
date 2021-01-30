Ext.define('DDO.store.aboutlist.UserAbout', {
    extend: 'Ext.data.Store',

    alias: 'store.userabout',

    requires: [
        'DDO.model.aboutlist.UserAbout'
    ],

    model: 'DDO.model.aboutlist.UserAbout',

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.about.READ
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            about: true
        },
        reader: {
            type: 'json',
            rootProperty: 'data.about[0]'
        }
    }
});