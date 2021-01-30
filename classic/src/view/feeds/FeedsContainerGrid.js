/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DDO.view.feeds.FeedsContainerGrid', {
    extend: 'Ext.container.Container',

    alias: 'widget.feedscontainergrid',

    requires: [
        'DDO.store.feeds.Feeds',

        'DDO.view.feeds.likes.FeedsLikeWindow',
        'DDO.view.feeds.FeedsIndividualImages',
        'DDO.view.feeds.components.FeedsDataItem'
    ],

    viewModel: {
        data: {
            ownerView: '',
            ownerLikesView: ''
        }
    },

    initComponent: function() {
        this.callParent(arguments);

        //Disabling the user arrow navigation
        this.down('grid').getNavigationModel().disable();

        Ext.Ajax.request({
            url: 'resources/data/share.json',
            method: 'GET',
            scope: this,
            success: function(response) {
                var data = Ext.decode(response.responseText);
                this.getViewModel().set('ownerView', data);
            }
        });

        Ext.Ajax.request({
            url: 'resources/data/likes.json',
            method: 'GET',
            scope: this,
            success: function(response) {
                var data = Ext.decode(response.responseText);
                this.getViewModel().set('ownerLikesView', data.data);
            }
        });
    },

    items: [{
        xtype: 'grid',

        width: '100%',

        header: false,
        rowLines: false,
        minHeight: 1000,
        loadMask: false,
        scrollable: true,
        hideHeaders: true,
        columnLines: false,

        cls: 'feedGrid noscrollbar',
        reference: "feedsdataview",

        viewConfig: {
            deferEmptyText: false,
            markDirty: false,
            stripeRows: false,
            loadMask: false,
            enableTextSelection: true
        },

        store: {
            type: 'feeds'
        },

        listeners: {
            beforecellmousedown: function() {
                return false;
            },
            beforecellmouseup: function() {
                return false;
            }
        },

        itemSelector: 'div.comment-container-cls',

        deferEmptyText: false,

        emptyText: LabelsTitles.HOME.FEEDS.NOFEED,

        columns: [{
            xtype: 'widgetcolumn',
            flex: 1,
            maxWidth: Constants.ViewportWidth * 0.53,
            cellFocusable: false,
            padding: 0,
            widget: {
                xtype: 'feedsdataitem'
            },
            onWidgetAttach: function(col, widget, record) {
                if (widget.items.length <= 0) {
                    if (record.get('post_type') != "progressloader") {
                        widget.add(widget.addItems());
                        widget.isProgressIndicator = false;
                    } else {
                        widget.add(widget.addLoadIndicator());
                        widget.isProgressIndicator = true;
                    }
                } else {
                    if (record.get('post_type') != "progressloader" && widget.isProgressIndicator) {
                        widget.removeAll(true);
                        widget.add(widget.addItems());
                        widget.isProgressIndicator = false;
                    } else if (record.get('post_type') == "progressloader" && !widget.isProgressIndicator) {
                        widget.removeAll(true);
                        widget.add(widget.addLoadIndicator());
                        widget.isProgressIndicator = true;
                    }
                }
                widget.getViewModel().set('record', record.data);
                if (record.get('post_type') != "progressloader") {
                    widget.updateWidgetValues(record.data);
                }
            }
        }]
    }]
});