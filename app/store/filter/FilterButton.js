Ext.define('DDO.store.filter.FilterButton', {
    extend: 'Ext.data.Store',

    alias: 'store.filterbuttton',

    fields: ['share', 'id', 'selected'],

    data: [{
        'id': 'filter',
        'css': 'filter-container-cls',
        'img': '/resources/images/feeds/filters.svg'
    }]
});