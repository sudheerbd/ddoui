Ext.define('DDO.overrides.form.field.Tag', {
    override: 'Ext.form.field.Tag',
    
   // emptyText fix
    fieldSubTpl: [
        '<div id="{cmpId}-listWrapper" style="min-height: 4px;position:relative;" data-ref="listWrapper" class="' + Ext.baseCSSPrefix + 'tagfield {fieldCls} {typeCls} {typeCls}-{ui}">',
            '<div id="{cmpId}-emptyEl" data-ref="emptyEl" class="{emptyCls}" style="position:absolute;padding-top: 0px; padding-left: 3px; color: rgb(172, 172, 172);">{emptyText}</div>',
            '<ul id="{cmpId}-itemList" data-ref="itemList" class="' + Ext.baseCSSPrefix + 'tagfield-list">',
                '<li id="{cmpId}-inputElCt" data-ref="inputElCt" style="margin: 1px 4px 0 0;" class="' + Ext.baseCSSPrefix + 'tagfield-input">',
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

     onDestroy: function() {
        this.valueStore =null;
        this.setStore(null);

        this.callParent();
    },
    clearOnBackspace: true,
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
            this.applyEmptyText();
           // me.autoSize();
            if (me.triggerOnClick) {
              //  me.onTriggerClick();
            }
        }
    },
    // Added me.clearOnBackspace condition in event. 6.0.1 not supported clearOn Backspace so I have added.
      onKeyDown: function(e) {
        var me = this,
            key = e.getKey(),
            inputEl = me.inputEl,
            rawValue = inputEl.dom.value,
            valueCollection = me.valueCollection,
            selModel = me.selectionModel,
            stopEvent = false,
            lastSelectionIndex;
 
        if (me.readOnly || me.disabled || !me.editable || !me.clearOnBackspace) {
            return;
        }
        this.applyEmptyText();
        if (valueCollection.getCount() > 0 && (rawValue === '' || (me.getCursorPosition() === 0 && !me.hasSelectedText()))) {
            // Keyboard navigation of current values 
            lastSelectionIndex = (selModel.getCount() > 0) ? valueCollection.indexOf(selModel.getLastSelected()) : -1;
        
            if (key === e.BACKSPACE || key === e.DELETE) {
                // Delete token 
                if (lastSelectionIndex > -1) {
                    if (selModel.getCount() > 1) {
                        lastSelectionIndex = -1;
                    }
                    valueCollection.remove(selModel.getSelection());
                } else {
                    valueCollection.remove(valueCollection.last());
                }
                selModel.clearSelections();
                if (lastSelectionIndex > 0) {
                    selModel.select(lastSelectionIndex - 1);
                } else if (valueCollection.getCount()) {
                    selModel.select(valueCollection.last());
                }
                stopEvent = true;
            } else if (key === e.RIGHT || key === e.LEFT) {
                // Navigate and select tokens 
                if (lastSelectionIndex === -1 && key === e.LEFT) {
                    selModel.select(valueCollection.last());
                    stopEvent = true;
                } else if (lastSelectionIndex > -1) {
                    if (key === e.RIGHT) {
                        if (lastSelectionIndex < (valueCollection.getCount() - 1)) {
                            selModel.select(lastSelectionIndex + 1, e.shiftKey);
                            stopEvent = true;
                        } else if (!e.shiftKey) {
                            selModel.deselectAll();
                            stopEvent = true;
                        }
                    } else if (key === e.LEFT && (lastSelectionIndex > 0)) {
                        selModel.select(lastSelectionIndex - 1, e.shiftKey);
                        stopEvent = true;
                    }
                }
            } else if (key === e.A && e.ctrlKey) {
                // Select all tokens 
                selModel.selectAll();
                stopEvent = e.A;
            }
        }
 
        if (stopEvent) {
            me.preventKeyUpEvent = stopEvent;
            e.stopEvent();
            return;
        }
 
        // Prevent key up processing for enter if it is being handled by the picker 
        if (me.isExpanded && key === e.ENTER && me.picker.highlightedItem) {
            me.preventKeyUpEvent = true;
        }
 
        if (me.enableKeyEvents) {
            me.callParent(arguments);
        }
 
        if (!e.isSpecialKey() && !e.hasModifier()) {
            selModel.deselectAll();
        }
    },
    constructor: function() {
        this.callParent(arguments);
        /* hide emptyText, on load value from server */
        this.on('change', function() {
            this.applyEmptyText();
        });
    },
   getMultiSelectItemMarkup: function() {
        var me = this,
            childElCls = (me._getChildElCls && me._getChildElCls()) || '';
        // hook for rtl cls
        if (!me.multiSelectItemTpl) {
            if (!me.labelTpl) {
                me.labelTpl = '{' + me.displayField + '}';
            }
            me.labelTpl = me.getTpl('labelTpl');
            if (me.tipTpl) {
                me.tipTpl = me.getTpl('tipTpl');
            }
            me.multiSelectItemTpl = new Ext.XTemplate([
                '<tpl for=".">',
                '<li data-selectionIndex="{[xindex - 1]}" data-recordId="{internalId}" class="' + me.tagItemCls + childElCls,
                '<tpl if="this.isSelected(values)">',
                ' ' + me.tagSelectedCls,
                '</tpl>',
                '{%',
                'values = values.data;',
                '%}',
                me.tipTpl ? '" data-qtip="{[this.getTip(values)]}">' : '">',
                '<div class = {[this.getOwnerCls(values)]} >',
                '<div class="' + me.tagItemTextCls + '">{[this.getItemLabel(values)]}</div>',
                '<div class="' + me.tagItemCloseCls + childElCls + '"></div>',
                '</div>',
                '</li>',
                '</tpl>',
                {
                    getOwnerCls : function(rec){
                        var ownerClassCls = "";
                        if(me.tagCustomiseMom){
                            var ownerId = me.tagMomOwnerId;
                            if(ownerId == rec.tagId){
                                ownerClassCls = "Owner";
                            }
                        }
                        return ownerClassCls;
                    },
                    isSelected: function(rec) {
                        return me.selectionModel.isSelected(rec);
                    },
                    getItemLabel: function(values) {
                        return Ext.String.htmlEncode(me.labelTpl.apply(values));
                    },
                    getTip: function(values) {
                        return Ext.String.htmlEncode(me.tipTpl.apply(values));
                    },
                    strict: true
                }
            ]);
        }
        if (!me.multiSelectItemTpl.isTemplate) {
            me.multiSelectItemTpl = this.getTpl('multiSelectItemTpl');
        }
        return me.multiSelectItemTpl.apply(me.valueCollection.getRange());
    }
});