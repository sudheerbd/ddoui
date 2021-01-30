Ext.define('DDO.store.filter.Author', {
    extend: 'Ext.data.Store',

    alias: 'store.author',
    requires: [
        //'DDO.model.filter.Author'
    ],
    //remoteFilter: true,
    fields: [{
            name: 'id'
        }, {
            name: 'name'
        }],
    storeId: 'author',
    autoLoad: false
});