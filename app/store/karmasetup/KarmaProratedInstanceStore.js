Ext.define('DDO.store.karmasetup.KarmaProratedInstanceStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmaproratedinstancestore',

    requires: [
        'DDO.model.karmasetup.KarmaProratedInstanceModel'
    ],

    model: 'DDO.model.karmasetup.KarmaProratedInstanceModel',
    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.karmaprorated.READ,
            update: Api.URL.karmaprorated.UPDATE,
            create: Api.URL.karmaprorated.CREATE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            delete: 'DELETE'
        },
        
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});