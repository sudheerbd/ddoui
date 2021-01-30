Ext.define('ACCTRL.store.allapps.HistoryGridStore', {
    extend: 'Ext.data.Store',

    alias: 'store.accessapphistorystore',

    storeId: 'accessapphistorystore',
    fields: [
        {
            name: 'created', 
            type: 'date',
            convert: function(value, record) {
                value = (value) ? Ext.Date.format(new Date(value), 'd-m-Y') : value;
                return value;
            }
        },
        {
            name: 'request_start_date', 
            type: 'date',
            convert: function(value, record) {
                value = (value) ? Ext.Date.format(new Date(value), 'd-m-Y') : value;
                return value;
            }
        },
        {
            name: 'request_end_date', 
            type: 'date',
            convert: function(value, record) {
                value = (value) ? Ext.Date.format(new Date(value), 'd-m-Y') : value;
                return value;
            }
        },
        {name: 'appUser'},
        {name: 'status'}
    ],
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/accessapphistory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    sorters : [{
        direction: 'DESC',
        sorterFn: function(record1, record2) {
            var date1 = new Date(record1.data.creaed),
                date2 = new Date(record2.data.creaed);

            return date1 > date2 ? 1 : (date1 === date2) ? 0 : -1;
        }
    }]
});