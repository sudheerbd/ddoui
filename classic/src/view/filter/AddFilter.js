/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DDO.view.filter.AddFilter', {
    extend: 'Ext.container.Container',

    xtype: 'addfilter',

    requires: [
        'DDO.store.feeds.Share',
        'DDO.view.filter.FilterWindowController',
        'DDO.view.filter.FilterWindowViewModel',
        'DDO.view.filter.FilterWindow'
    ],

    controller: 'filterwindowcontroller',
    viewModel: {
        type: 'filterwindowviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        Ext.getStore('filter.FilterButton').load();
    },

    width: '37%',
    // height: 70,

    layout:{
        type:'hbox',
        align:'center'
    },

    items: [{
            xtype: 'label', 
            html: '<img src =  "/resources/images/feeds/clear_filter.png" width="20" height="22">',
            // text: LabelsTitles.HOME.FEEDS.CLEARFILTER,
            name:'goallabelfilter', 
            reference: 'clearfilterRef',
            cls: 'postclearfilter-cls',
            hidden:true,
             listeners: {
                afterrender: 'onFilterCancelClick'
            }
        },{
        xtype:'tbfill'
    },{
        xtype: "dataview",
        emptyText: LabelsTitles.HOME.FEEDS.NOFILTERDATA,
        itemId: "badgeView",

        store: 'filter.FilterButton',

        tpl: [
            '<tpl for=".">',
                '<div class="filter-container-cls">',                    
                    '<div class="ddo-filter-badge-value"></div>',
                    '<button class="ddo-addfilter-btn" id="badgeButton"><img src={img} style = "margin-right: 7px;">Filters</button>',
                '</div>',
            '</tpl>'
        ],

        itemSelector: 'div.filter-container-cls',

        listeners: {
            itemclick: 'onAddFilterBtnClick'
        }
    }]
});