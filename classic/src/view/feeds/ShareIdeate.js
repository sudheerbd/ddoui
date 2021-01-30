/**
 * This view is responsible for displaying feed share ideate and it's related operations.
 * @class 'DDO.view.feeds.ShareIdeate'
 * @extends 'Ext.container.Container'
 * @alias 'shareideate'
 * @ViewModel 'DDO.view.feeds.FeedsModel'
 * @Controller 'DDO.view.feeds.FeedsController'
 */
Ext.define('DDO.view.feeds.ShareIdeate', {
    extend: 'Ext.container.Container',
    xtype: 'shareideate',

    requires: [
        'DDO.store.feeds.Groups',
        'DDO.overrides.form.field.Tag'
    ],

    layout: {
        type: 'hbox'
    },

    initComponent: function() {
        this.callParent(arguments);

        var store = Ext.getStore('feeds.Groups');

        if (!store.isLoaded()) {
            store.load();
        }
    },

    items: [{
        xtype: 'tagfield',
        cls: 'share-group-cls tagfield-scroll',
        scrollable: 'y',
        height: 40,
        reference: 'comboview',
        matchFieldWidth: false,
        border:0,
        // hidden: true,
        hideTrigger: true,
        width: '100%',
        autoShow: true,
        forceSelection: false,
        store: 'feeds.Groups',
        emptyText: LabelsTitles.HOME.FEEDS.TAGPEOPLEGROUP,
        displayField: 'tagName',
        valueField: 'tagId',
        queryMode: 'local',
        filterPickList: true,
        listConfig: {
            cls: 'tag-view-list',
            width: Constants.ViewportWidth * 0.22
        },
        bind:{
            hidden: '{!peopleChecked}'
        },
        tpl: [
            '<ul class="x-list-plain"><tpl for=".">',
            '<li role="option" class="x-boundlist-item">',
            '<tpl if="values.isGroup">',
            '<span class="ddo-groupTag-round">{[this.getGroupTags(values)]}</span>',
            '{tagName}</tpl>',
            '<tpl else if="!values.isGroup">',
            '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
            '<div class="ddo-tag-Name">{tagName}</div></tpl></li></tpl>',
            '</ul>', {

                getGroupTags: function(values) {
                    if (typeof(values) === "object") {
                        if (values.isGroup) {
                            return values.tagName[0];
                        }
                    }

                },
                getTags: function(values) {
                    if (typeof(values) === "object") {
                        if (!values.isGroup) {
                            if (values.tagPic) {
                                return '<img class="tagUrl-img"  src="' + values.tagPic + '" >';
                            }
                        }
                    }
                }
            }
        ],
        listeners: {
             select: function( combo , record , eOpts )  {
                 combo.inputEl.dom.value = '';
                 combo.collapse();            
            },
            beforeselect: 'onTagsSelect',
            beforedeselect:'onTagsDeSelect',
            afterrender: function(){
                var store = Ext.getStore('feeds.Groups');

                if (!store.isLoaded()) {
                    store.load();
                }
            }
            
        }


    }]
});