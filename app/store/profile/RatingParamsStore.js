Ext.define('DDO.store.profile.RatingParamsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ratingparamsstore',

    requires: [
        'DDO.model.profile.RatingParamsModel'
    ],

    model: 'DDO.model.profile.RatingParamsModel',

    storeId: 'ratingparamsstore',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: 'resources/data/ratingparams.json',
        reader: {
            type: 'json',
            rootProperty: 'ratingdetails'
        }
    },

    sorters: [{
        property: 'orderSeq',
        direction: 'DESC'
    }]
});