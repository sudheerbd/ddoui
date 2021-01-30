Ext.define('Goals.store.ExecutiveStore', {
    extend: 'Ext.data.Store',
    alias: 'store.executivestore',

    //storeId: 'helpmenustore',

    requires: [
        'Goals.model.ExecutiveModel'
    ],

     model: 'Goals.model.ExecutiveModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/goal/detail',
        reader: {
            type: 'json',
            rootProperty: 'data.executionPlanData'
        },

        actionMethods: {
            read: 'GET'
        }
    }
});