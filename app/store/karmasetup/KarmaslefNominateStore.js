Ext.define('DDO.store.karmasetup.KarmaSelfNominateStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmaselfnominatestore',

    requires:['DDO.model.karmasetup.SelfNominateKarmaModel'],

    model:'DDO.model.karmasetup.SelfNominateKarmaModel',
    
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