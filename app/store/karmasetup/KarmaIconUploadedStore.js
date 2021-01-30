Ext.define('DDO.store.karmasetup.KarmaIconUploadedStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmaiconuploadstore',

    requires: [
        'DDO.model.karmasetup.KarmaIcon'
    ],

    autoLoad: false,

    model: 'DDO.model.karmasetup.KarmaIcon',

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.karmaicon.READ,
            update: Api.URL.karmaicon.UPDATE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT'
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});