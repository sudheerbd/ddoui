Ext.define('DDO.store.progressbar.ProgressbarStore', {
    extend: 'Ext.data.Store',
    alias: 'store.progressbarstore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Api.URL.progressbarstore.READ,

        reader: {
            type: 'json'
            // rootProperty : 'data'
        }
    }
});
