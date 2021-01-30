Ext.define('DDO.view.feeds.ShareHeader', {
    extend: 'Ext.dataview.DataView',
    xtype: 'shareheader',

    requires: [
        'DDO.store.feeds.Share'
    ],
    store: Ext.create('DDO.store.feeds.Share'),
    id: 'shareHeader',
    scrollable: false,
    hidden:true,
    cls: 'share-header-container',
    itemTpl: [
        '<tpl for=".">',
                '<div class="share-container-cls">',
                    '<div class = "share-cls">',
                        '<button class={css} id={id}><span class={font}></button>',
                        '<span class="share-label-cls">{share-header-label}</span>',
                        '<tpl if="selected">',
                            '<span class="share-anchor-icon"></sapn>',
                        '</tpl>',
                    '</div>',
                '</div>',
            '</tpl>'
    ],
    itemSelector: 'div.share-container-cls',
    emptyText: 'No data available',
    listeners: {
        itemtap: "onShareTypeTap"
    }

});
