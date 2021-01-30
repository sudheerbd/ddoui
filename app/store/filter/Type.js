Ext.define('DDO.store.filter.Type', {
    extend: 'Ext.data.Store',

    alias: 'store.feedtype',
    requires: [
        //'DDO.model.filter.Type'
    ],
    fields: [{
            name: 'name'
        }, {
            name: 'value'
        }],
    storeId: 'feedtype',
    autoLoad: true,
    data: [{
        "name": "Post",
        "value": "post"
    }, {
        "name": "Ideate",
        "value": "ideate"
    }]
});