Ext.define('DDO.store.feeds.Share', {
    extend: 'Ext.data.Store',
    requires: [
        'DDO.model.feeds.Share'
    ],
    
    alias: 'store.share',
    fields: ['share', 'id', 'selected'],
    storeId: 'Share',
    autoLoad: false,
    
    data: [{
        'share-header-label': 'What\'s on your mind',
        'id': 'standard',
        selected: true,
        'css': 'share-icon',
        'width': '80%',
        'share-container-cls': 'share-container-cls',
        'name': 'what',
    // }, {
    //     'share-header-label': 'Ideation',
    //     'id': 'idea',
    //     selected: false,
    //     'css': 'ideate-icon',
    //     'img': '/resources/images/feeds/icon_ideation.svg',
    //     'width': '60%',
    //     'share-container-cls': 'share-container-cls',
    //     'name': 'idea'
    }]
});