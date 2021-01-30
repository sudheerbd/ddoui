Ext.define('DDO.view.feeds.FeedsToolbar', {
    extend: 'Ext.form.Panel',
    xtype: 'feedstoolbar',
    alias: 'widget.feedstoolbar',
    reference: 'feedstoolbar',

    layout: {
        type: 'vbox'
    },

    defaults: {
        width: '100%'
    },

    items: [{
        xtype: 'tagfield',
        reference: 'comboTagview',
        matchFieldWidth: false,
        hidden: true,
        hideTrigger: true,
        width: '100%',
        cls: 'share-group-cls',
        //autoShow: true,
        forceSelection: false,
        store: 'feeds.Groups',
       // emptyText: 'Tag People or Groups',
        displayField: 'tagName',
        valueField: 'tagId',
        queryMode: 'local',
        filterPickList: true,
        listConfig: {
            cls: 'tag-view-list',
            width: 300
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
            }
            
        }
      

    }]

});