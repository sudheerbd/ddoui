Ext.define('DDO.store.filter.AddFilter', {
    extend: 'Ext.data.Store',

    alias: 'store.addfilter',

    requires: [
        'DDO.model.filter.AddFilter'
    ],

    model: 'DDO.model.filter.AddFilter',

    proxy: {
        type: 'ajax',
        url: 'resources/data/filter/addfilter.json',
        reader: {
            type: 'json'
        }
    },

    filter: function(filters, value) {
        Ext.data.Store.prototype.filter.apply(this, [
            filters,
            value ? new RegExp(Ext.String.escapeRegex(value), 'i') : value
        ]);
    }
});