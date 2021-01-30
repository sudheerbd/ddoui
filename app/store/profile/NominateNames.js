Ext.define('DDO.store.profile.NominateNames', {
    extend: 'Ext.data.Store',
    alias: 'store.nominatenamesstore',

    requires: [
        'DDO.model.profile.NominateNamesModel'
    ],

    model: 'DDO.model.profile.NominateNamesModel',

    proxy: {
        type: 'ajax',
        url: Api.URL.nominatenames.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});