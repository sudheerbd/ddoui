Ext.define('DDO.store.jobs.MonthStore', {
    extend: 'Ext.data.Store',
    alias: 'store.monthstore',
    storeId:'monthstore',
    
    requires: ['DDO.model.jobs.MonthModel'],
    model: 'DDO.model.jobs.MonthModel',

    proxy: {
        type: 'ajax',
        url: 'resources/data/profile/months.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});