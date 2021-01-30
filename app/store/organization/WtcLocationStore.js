Ext.define('DDO.store.organization.WtcLocationStore', {
    extend: 'Ext.data.Store',
    alias: 'store.wtclocationstore',

    storeId: 'wtclocationstore',

    requires: [
        'DDO.model.organization.WtcLocationModel'
    ],

    model: 'DDO.model.organization.WtcLocationModel',

    proxy: {
        type: 'ajax',
        url: 'resources/data/wtclocation.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});