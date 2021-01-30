Ext.define('DDO.store.karmasetup.KarmaNominateStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmanominatestore',

    requires: [
        'DDO.model.karmasetup.KarmaModel'
    ],

    model: 'DDO.model.karmasetup.KarmaModel',

    autoLoad:false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.ddokarma.READ,
            update: Api.URL.ddokarma.UPDATE,
            create: Api.URL.ddokarma.CREATE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT'
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        extraParams: {
            access: 'N'
        }
    }
});