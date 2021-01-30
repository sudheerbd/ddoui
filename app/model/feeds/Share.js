Ext.define('DDO.model.feeds.Share', {
    extend: 'Ext.data.Model',
    alias: 'model.share',
    fields: [{
        name: 'share',
        type: 'string'
    }, {
        name: 'id',
        type: 'string'
    }, {
        name: 'selected',
        type: 'boolean'
    }]
});