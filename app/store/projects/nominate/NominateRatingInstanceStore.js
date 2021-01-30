Ext.define('DDO.store.projects.nominate.NominateRatingInstanceStore', {
    extend: 'Ext.data.Store',

    alias: 'store.nominateratinginstancestore',

    requires: [
        'DDO.model.karmasetup.KarmaRatingInstanceModel'
    ],

    model: 'DDO.model.karmasetup.KarmaRatingInstanceModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.karmaratinginstance.READ
        },
        actionMethods: {
            read: 'GET'
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});
