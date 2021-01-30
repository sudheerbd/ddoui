Ext.define('DDO.store.karmasetup.KarmaRangeInstanceStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmarangeinstancestore',

    requires: [
        'DDO.model.karmasetup.KarmaRangeInstanceModel'
    ],

    model: 'DDO.model.karmasetup.KarmaRangeInstanceModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
           read: Api.URL.karmarangeinstance.READ,
           update: Api.URL.karmarangeinstance.UPDATE,
           create: Api.URL.karmarangeinstance.CREATE,
           destroy: Api.URL.karmarangeinstance.DELETE
       },
       actionMethods: {
           read: 'GET',
           create: 'POST',
           update: 'PUT',
           destroy: 'DELETE'
       },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        writer: {
           writeAllFields: true
      }
    }
});