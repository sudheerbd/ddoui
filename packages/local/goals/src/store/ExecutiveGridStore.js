Ext.define('Goals.store.ExecutiveGridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.executivegridstore',

    //storeId: 'helpmenustore',

    requires: [
        'Goals.model.ExecutiveGridModel'
    ],

     model: 'Goals.model.ExecutiveGridModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
    /*    api: {
            read:   Api.URL.goaltask.READ,
            create: Api.URL.goaltask.CREATE,
            update: Api.URL.goaltask.UPDATE,
            delete: Api.URL.goaltask.DELETE
        },*/

        url: '/resources/data/griddata.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }/*,

        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        }*/
    }
});

