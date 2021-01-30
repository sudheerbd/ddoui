Ext.define('Goals.overrides.form.field.Tag', {
    override: 'Ext.form.field.Tag',
    
   // emptyText fix
    fieldSubTpl: [
        '<div id="{cmpId}-listWrapper" style="min-height: 4px;" data-ref="listWrapper" class="' + Ext.baseCSSPrefix + 'tagfield {fieldCls} {typeCls} {typeCls}-{ui}">',
            '<ul id="{cmpId}-itemList" data-ref="itemList" class="' + Ext.baseCSSPrefix + 'tagfield-list">',
                '<li id="{cmpId}-inputElCt" data-ref="inputElCt" style="margin: 1px 4px 0 0;" class="' + Ext.baseCSSPrefix + 'tagfield-input">',
                    '<div id="{cmpId}-emptyEl" data-ref="emptyEl" class="{emptyCls}" style="padding-top: 0px; padding-left: 3px; color: rgb(172, 172, 172);">{emptyText}</div>',
                    '<input id="{cmpId}-inputEl" data-ref="inputEl" type="{type}" ',
                    '<tpl if="name">name="{name}" </tpl>',
                    '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
                    '<tpl if="size">size="{size}" </tpl>',
                    '<tpl if="tabIdx != null">tabIndex="{tabIdx}" </tpl>',
                    '<tpl if="disabled"> disabled="disabled"</tpl>',
                    'class="' + Ext.baseCSSPrefix + 'tagfield-input-field {inputElCls}" autocomplete="off">',
                '</li>',
            '</ul>',
        '</div>',
        {
            disableFormats: true
        }
    ],
    onItemListClick: function(e) {
        var me = this,
            selectionModel = me.selectionModel,
            itemEl = e.getTarget(me.tagItemSelector),
            closeEl = itemEl ? e.getTarget(me.tagItemCloseSelector) : false;

        if (me.readOnly || me.disabled) {
            return;
        }

        e.stopPropagation();

        if (itemEl) {
            if (closeEl) {
                me.removeByListItemNode(itemEl);
                if (me.valueStore.getCount() > 0) {
                    me.fireEvent('select', me, me.valueStore.getRange());
                }
            } else {
                me.toggleSelectionByListItemNode(itemEl, e.shiftKey);
            }
            // If not using touch interactions, focus the input
            if (!Ext.supports.TouchEvents) {
                me.inputEl.focus();
            }
        } else {
            if (selectionModel.getCount() > 0) {
                selectionModel.deselectAll();
            }


            /* fix */
            me.emptyEl.addCls("x-form-empty-field");
            me.inputEl.removeCls("x-tagfield-emptyinput");


            me.inputEl.focus();
           // me.autoSize();
            if (me.triggerOnClick) {
              //  me.onTriggerClick();
            }
        }
    },
    constructor: function() {
        this.callParent(arguments);
        /* hide emptyText, on load value from server */
        this.on('change', function() {
            this.applyEmptyText();
        });
    }
});