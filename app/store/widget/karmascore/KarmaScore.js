Ext.define('DDO.store.widget.karmascore.KarmaScore', {
    extend: 'Ext.data.Store',
    alias: 'store.scoredetails',
    storeId:"scoredetails",
    requires: [
        'Ext.data.proxy.JsonP',
        'DDO.model.widget.karmascore.KarmaScore'
    ],

    model: 'DDO.model.widget.karmascore.KarmaScore',

    //This proxy is used when we are loading data from remote APIs
    proxy: {
        type: 'ajax',
        timeout: 100000,
        url: Api.URL.karma.READ,
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'designationPotential'
        }
    },

    sorters: [{
        property: 'karmapoints',
        direction: 'DESC'
    }]
});