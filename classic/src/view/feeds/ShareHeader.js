/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DDO.view.feeds.ShareHeader', {
    extend: 'Ext.view.View',
    xtype: 'shareheader',

    requires: [
        'DDO.store.feeds.Share'
    ],
    store:Ext.create('DDO.store.feeds.Share'),
    width:'62%',
    id:'shareHeader',
        tpl: [
            '<tpl for=".">',
                '<div class="{share-container-cls}">',
                    '<div style"text-align:center">',
                        '<span class = {css}><img src={img}></span>',
                        '<span class="share-label-cls" width={width}>{share-header-label}</span>',
                    '</div>',
                '</div>',
            '</tpl>'
        ],
        itemSelector:'div.share-container-cls',
        selectedItemCls:'share-ideate-cls',
        emptyText: LabelsTitles.HOME.FEEDS.NOSHAREDATA,
        // listeners: {
        //     itemclick: "onShareTypeSelect"
        // },
        initComponent: function(){
            this.callParent(arguments);
            this.setSelection(this.getStore().getAt(0))
        }
});
