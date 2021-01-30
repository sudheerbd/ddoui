Ext.define('TalentAcquisition.store.ReportingsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.reportingsstore',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/utility/getempbasiclist',

        reader: {
            type: 'json',
            rootProperty : "data"
        }
    }
});