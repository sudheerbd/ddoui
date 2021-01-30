Ext.define('DDO.store.karmasetup.KarmaRatingInstanceStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmaratinginstancestore',

    requires: [
        'DDO.model.karmasetup.KarmaRatingInstanceModel'
    ],

    model: 'DDO.model.karmasetup.KarmaRatingInstanceModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
           read: Api.URL.karmaratinginstance.READ,
           update: Api.URL.karmaratinginstance.UPDATE,
           create: Api.URL.karmaratinginstance.CREATE
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
        writer: {
           writeAllFields: true
      }
    }
});