Ext.define('DDO.store.karmasetup.KarmaProratedInstanceFrequencyStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmaproratedinstancefrequencystore',

    requires: [
        'DDO.model.karmasetup.KarmaProratedInstanceFrequencyModel'
    ],

    model: 'DDO.model.karmasetup.KarmaProratedInstanceFrequencyModel',
    autoLoad: false,

    proxy: {
        type : 'ajax',
        url : 'resources/data/karmasetup/KarmaProratedInstanceFreuency.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});