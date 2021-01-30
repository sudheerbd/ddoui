Ext.define('Redeem.category.CategoryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.categorygrid',
    requires: [
        'Ext.grid.column.Check'
    ],
    width: '100%',
    scrollable: 'y',
    header: false,
    rowLines: false,
    hideHeaders: true,
    columnLines: false,
    columns: [
        {
            xtype: 'checkcolumn',
            dataIndex: 'selected',
            align: 'right',
            flex: 0.07,
            listeners: {
                checkchange: 'onSelectionChange'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            flex: 0.93
        }
    ],
    listeners: {
        afterrender: 'onCategoryGridRender'
    }
});

Ext.define('Redeem.category.CategoryView', {
    extend: 'Ext.container.Container',
    alias: 'widget.categoryview',
    requires: [
        'Redeem.category.CategoryGrid'
    ],
    layout: {
        type: 'vbox'
    },
    cls: 'redeem-category-view',
    items: [
        {
            xtype: 'displayfield',
            value: 'Category',
            cls: 'redeem-category-field',
            height: 36,
            margin: '0 0 0 15'
        },
        {
            xtype: 'categorygrid',
            reference: 'categorygrid',
            cls: 'category-grid',
            bind: {
                store: '{categorystore}'
            }
        }
    ]
});

Ext.define('Redeem.order.attribute.AttributeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.attributegrid',
    cls: 'karmalist-cls',
    plugins: 'gridfilters',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Code',
            dataIndex: 'code',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_productattribute_id: rec.data.ddo_productattribute_id
                        };
                        Ext.Ajax.request({
                            url: '/productattribute',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                            },
                            failure: function(resp, b) {
                                var responseTextData = Ext.decode(resp.responseText),
                                    errDetail = responseTextData.data,
                                    errDetailFormat, errorMsg;
                                if (errDetail && errDetail.detail) {
                                    errDetailFormat = errDetail.detail.split('=');
                                    errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
                                    var errRef = errorMsg.match("still referenced");
                                    if (errRef) {
                                        Ext.Msg.alert('Failed', "Already this attribute is mapped to products");
                                    } else {
                                        Ext.Msg.alert('Failed', errorMsg);
                                    }
                                }
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('Redeem.order.attribute.AttributeToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.attributetoolbar',
    items: [
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'button',
            text: 'Add New',
            iconCls: 'rule-plus',
            margin: 0,
            cls: 'rule-add-btn',
            listeners: {
                click: 'onAddNewClick'
            }
        }
    ]
});

Ext.define('Redeem.order.attribute.AttributeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributeviewcontroller',
    /**
     * This is the handler for the click event of the Add categories.
     * It will open the form panel then we can add record.
     * @param button - The add button reference.    
     * @param e - The click event
     * @param eOpts -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        var attributeWindow = Ext.ComponentQuery.query('attributewindow')[0] || Ext.create('Redeem.order.attribute.AttributeWindow'),
            form = attributeWindow.down('form');
        this.onFormLoadTrue(form);
        form.reset();
        attributeWindow.down('[name=savebtn]').disable();
        attributeWindow.show();
        attributeWindow.edit = false;
    },
    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param grid - The grid list reference.
     * @param record - The grid selected record.
     * @param tr - The TR element for the cell. 
     * @param rowIndex - Number(row index number).   
     * @param e - The click event
     * @param eOpts -Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        var attributeWindow = Ext.ComponentQuery.query('attributewindow')[0] || Ext.create('Redeem.order.attribute.AttributeWindow'),
            form = attributeWindow.down('form');
        this.onFormLoadDirtyFalse(form, record);
        form.reset();
        form.loadRecord(record);
        attributeWindow.edit = true;
        attributeWindow.show();
        Ext.defer(function() {
            attributeWindow.down('[name=savebtn]').disable();
        }, 200);
    },
    onFormLoadDirtyFalse: function(form, record) {
        form.items.items.forEach(function(rec) {
            rec.originalValue = record.get(rec.name);
        });
    },
    onFormLoadTrue: function(form) {
        var formValues = form.getValues();
        var items = form.getForm().getFields().items,
            i = 0,
            len = items.length;
        for (; i < len; i++) {
            var formField = items[i];
            formField.value = '';
            if (formField.mixins && formField.mixins.field && typeof formField.mixins.field['initValue'] == 'function') {
                formField.mixins.field.initValue.apply(formField);
                formField.wasDirty = false;
            }
        }
    }
});

Ext.define('Redeem.order.attribute.AttributeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attributeviewmodel'
});

Ext.define('Redeem.order.attribute.AttributeWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributewindowcontroller',
    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onSetUpWinOutterTap(event, target, view);
    },
    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var departmentWindow, form;
        departmentWindow = btn.up('window');
        form = departmentWindow.down('form');
        form.reset();
        departmentWindow.close();
    },
    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param btn - The Save button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        var gridStore, attributeWindow, form, formRec, params, name, valueMatch;
        gridStore = Ext.getStore('Redeem.store.AttributeStore');
        attributeWindow = btn.up('window');
        form = attributeWindow.down('form');
        formRec = form.getValues();
        name = Ext.String.trim(formRec.name);
        valueMatch = gridStore.findRecord('name', name, 0, false, false, true);
        if (attributeWindow.edit) {
            editRec = gridStore.findRecord('ddo_productattribute_id', formRec.ddo_productattribute_id);
            if (valueMatch && editRec && editRec.get('name').toLowerCase() == valueMatch.get('name').toLowerCase()) {
                valueMatch = null;
            }
        }
        if (!valueMatch) {
            if (form.isDirty()) {
                if (attributeWindow.edit) {
                    form.updateRecord();
                    gridStore.sync({
                        callback: function() {
                            gridStore.clearFilter(true);
                            gridStore.load();
                        }
                    });
                } else {
                    gridStore.add(form.getValues());
                    gridStore.sync({
                        callback: function() {
                            gridStore.clearFilter(true);
                            gridStore.load();
                        }
                    });
                }
                form.reset();
                attributeWindow.close();
            } else {
                gridStore.clearFilter(true);
                gridStore.load();
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
            }
        } else {
            Ext.Msg.alert('Warning', "Current attribute Already added. Please select other one");
            gridStore.clearFilter(true);
            gridStore.load();
        }
    },
    onEmployeeClick: function(combo) {
        var attributeWindow = combo.up('window');
        if (attributeWindow.edit) {
            attributeWindow.down('[name=savebtn]').enable();
        }
    },
    onCodeChange: function(txtfld) {
        var attributeWindow = txtfld.up('window');
        if (attributeWindow.edit) {
            attributeWindow.down('[name=savebtn]').enable();
        }
    }
});

Ext.define('Redeem.order.attribute.AttributeWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attributewindowviewmodel'
});

Ext.define('Redeem.order.attribute.AttributeWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Redeem.order.attribute.AttributeWindowController',
        'Redeem.order.attribute.AttributeWindowViewModel'
    ],
    alias: 'widget.attributewindow',
    title: 'Attribute',
    controller: 'attributewindowcontroller',
    viewModel: {
        type: 'attributewindowviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeJsonStore');
        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
        }
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    cls: 'attributevalue-win-cls',
    modal: true,
    width: 600,
    height: 280,
    closable: false,
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 20 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'karmaform-cancel-btn',
                        listeners: {
                            click: 'onFormCancelClick'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        name: 'savebtn',
                        cls: 'karmaform-save-btn',
                        // //formBind: true,
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            height: 230,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_productattribute_id'
                },
                {
                    xtype: 'combobox',
                    name: 'name',
                    allowBlank: false,
                    reference: 'selectEmployee',
                    displayField: 'name',
                    valueField: 'value',
                    typeAhead: true,
                    forceSelection: true,
                    minChars: 1,
                    emptyText: 'Attribute',
                    cls: 'rule-name-cls',
                    queryMode: 'local',
                    lastQuery: '',
                    store: 'Redeem.store.AttributeJsonStore',
                    listeners: {
                        change: 'onEmployeeClick'
                    }
                },
                /*{
                       xtype: 'textfield',
                       allowBlank: false,
                       name: 'name',
                       emptyText: 'Name',
                       required: true,
                       cls: 'rule-name-cls'
                   }, */
                {
                    xtype: 'textfield',
                    name: 'code',
                    emptyText: 'Code',
                    allowBlank: false,
                    cls: 'rule-name-cls',
                    listeners: {
                        change: 'onCodeChange'
                    }
                }
            ]
        }
    ]
});

Ext.define('Redeem.order.attribute.Attribute', {
    extend: 'Ext.container.Container',
    alias: 'widget.attribute',
    requires: [
        'Redeem.order.attribute.AttributeGrid',
        'Redeem.order.attribute.AttributeToolbar',
        'Redeem.order.attribute.AttributeViewController',
        'Redeem.order.attribute.AttributeViewModel',
        'Redeem.order.attribute.AttributeWindow'
    ],
    scrollable: false,
    controller: 'attributeviewcontroller',
    viewModel: {
        type: 'attributeviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('Redeem.store.AttributeStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
        }
    },
    //store.load();
    items: [
        {
            xtype: 'attributetoolbar',
            cls: 'wallet-toolbar-cls',
            width: '100%',
            height: 70,
            html: '<h3>Attribute</h3>'
        },
        {
            xtype: 'attributegrid',
            store: 'Redeem.store.AttributeStore'
        }
    ]
});

Ext.define('Redeem.order.attributevalue.AttributeValueGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.attributevaluegrid',
    cls: 'karmalist-cls',
    plugins: 'gridfilters',
    height: 500,
    margin: '0 0 0 10',
    viewConfig: {
        loadMask: false
    },
    columns: [
        {
            text: 'Attribute',
            dataIndex: 'productattribute',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Attribute Value',
            dataIndex: 'productattributevalue',
            flex: 0.4
        },
        {
            text: 'Code',
            dataIndex: 'code',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_productattributevalue_id: rec.data.ddo_productattribute_value_id
                        };
                        Ext.Ajax.request({
                            url: '/productattributevalues',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                            },
                            failure: function(resp, b) {
                                var responseTextData = Ext.decode(resp.responseText),
                                    errDetail = responseTextData.data,
                                    errDetailFormat, errorMsg;
                                if (errDetail && errDetail.detail) {
                                    errDetailFormat = errDetail.detail.split('=');
                                    errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
                                    var errRef = errorMsg.match("still referenced");
                                    if (errRef) {
                                        Ext.Msg.alert('Failed', "Already this attribute values is mapped to products");
                                    } else {
                                        Ext.Msg.alert('Failed', errorMsg);
                                    }
                                }
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('Redeem.order.attributevalue.AttributeValueToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.attributevaluetoolbar',
    items: [
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'button',
            text: 'Add New',
            iconCls: 'rule-plus',
            margin: 0,
            cls: 'rule-add-btn',
            listeners: {
                click: 'onAddNewClick'
            }
        }
    ]
});

Ext.define('Redeem.order.attributevalue.AttributeValueViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributevalueviewcontroller',
    /**
     * This is the handler for the click event of the Add categories.
     * It will open the form panel then we can add record.
     * @param button - The add button reference.    
     * @param e - The click event
     * @param eOpts -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        var attributevalueWindow = Ext.ComponentQuery.query('attributevaluewindow')[0] || Ext.create('Redeem.order.attributevalue.AttributeValueWindow'),
            form = attributevalueWindow.down('form');
        this.onFormLoadTrue(form);
        form.reset();
        attributevalueWindow.show();
        attributevalueWindow.edit = false;
    },
    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param grid - The grid list reference.
     * @param record - The grid selected record.
     * @param tr - The TR element for the cell. 
     * @param rowIndex - Number(row index number).   
     * @param e - The click event
     * @param eOpts -Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        var attributevalueWindow = Ext.ComponentQuery.query('attributevaluewindow')[0] || Ext.create('Redeem.order.attributevalue.AttributeValueWindow'),
            form = attributevalueWindow.down('form');
        this.onFormLoadDirtyFalse(form, record);
        form.reset();
        form.loadRecord(record);
        attributevalueWindow.show();
        attributevalueWindow.edit = true;
    },
    onFormLoadDirtyFalse: function(form, record) {
        form.items.items.forEach(function(rec) {
            rec.originalValue = record.get(rec.name);
        });
    },
    onFormLoadTrue: function(form) {
        var formValues = form.getValues();
        var items = form.getForm().getFields().items,
            i = 0,
            len = items.length;
        for (; i < len; i++) {
            var formField = items[i];
            formField.value = '';
            if (formField.mixins && formField.mixins.field && typeof formField.mixins.field['initValue'] == 'function') {
                formField.mixins.field.initValue.apply(formField);
                formField.wasDirty = false;
            }
        }
    }
});

Ext.define('Redeem.order.attributevalue.AttributeValueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attributevalueviewmodel'
});

Ext.define('Redeem.order.attributevalue.AttributeValueWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributevaluewindowcontroller',
    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onSetUpWinOutterTap(event, target, view);
    },
    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var attributevalueWindow, form;
        attributevalueWindow = btn.up('window');
        form = attributevalueWindow.down('form');
        form.reset();
        attributevalueWindow.close();
    },
    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param btn - The Save button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        var gridStore, attributevalueWindow, form, formRec, params, name,
            valueMatch = false,
            attributeValMatch = false,
            codeMatch = false;
        gridStore = Ext.getStore('Redeem.store.AttributeValueStore');
        attributevalueWindow = btn.up('window');
        form = attributevalueWindow.down('form');
        formRec = form.getValues();
        formRec.productattributevalue = Ext.String.trim(formRec.productattributevalue);
        formRec.code = Ext.String.trim(formRec.code);
        name = formRec.name;
        if (!attributevalueWindow.edit) {
            gridStore.each(function(rec) {
                if (((rec.data.ddo_productattribute_id == formRec.ddo_productattribute_id) && (rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase())) || (rec.data.code.toLowerCase() == formRec.code.toLowerCase())) {
                    valueMatch = true;
                }
                if (rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase()) {
                    attributeValMatch = true;
                } else if (rec.data.code.toLowerCase() == formRec.code.toLowerCase()) {
                    codeMatch = true;
                }
            });
        } else {
            gridStore.each(function(rec) {
                if ((rec.data.ddo_productattribute_value_id != formRec.ddo_productattribute_value_id) && (((rec.data.ddo_productattribute_id == formRec.ddo_productattribute_id) && (rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase())) || (rec.data.code.toLowerCase() == formRec.code.toLowerCase()))) {
                    valueMatch = true;
                }
                if ((rec.data.ddo_productattribute_value_id != formRec.ddo_productattribute_value_id) && (rec.data.productattributevalue.toLowerCase() == formRec.productattributevalue.toLowerCase())) {
                    attributeValMatch = true;
                } else if ((rec.data.ddo_productattribute_id == formRec.ddo_productattribute_id) && (rec.data.code.toLowerCase() == formRec.code.toLowerCase())) {
                    codeMatch = true;
                }
            });
        }
        if (!valueMatch) {
            if (form.isDirty()) {
                if (attributevalueWindow.edit) {
                    form.updateRecord();
                    gridStore.sync({
                        callback: function() {
                            gridStore.load();
                        }
                    });
                } else {
                    gridStore.add(form.getValues());
                    gridStore.sync({
                        callback: function() {
                            gridStore.load();
                        }
                    });
                }
                form.reset();
                attributevalueWindow.close();
            } else {
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
            }
        } else {
            if (attributeValMatch) {
                Ext.Msg.alert('Warning', "Current attribute value Already added. Please select other one");
            } else if (codeMatch) {
                Ext.Msg.alert('Warning', "Current attribute code Already added. Please select other one");
            }
        }
    }
});

Ext.define('Redeem.order.attributevalue.AttributeValueWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attributevaluewindowviewmodel'
});

Ext.define('Redeem.order.attributevalue.AttributeValueWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Redeem.order.attributevalue.AttributeValueWindowController',
        'Redeem.order.attributevalue.AttributeValueWindowViewModel'
    ],
    alias: 'widget.attributevaluewindow',
    title: 'Attribute Value',
    controller: 'attributevaluewindowcontroller',
    viewModel: {
        type: 'attributevaluewindowviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeStore');
        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
        }
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    closable: false,
    cls: 'attributevalue-win-cls',
    modal: true,
    width: 600,
    height: 280,
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 20 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'karmaform-cancel-btn',
                        listeners: {
                            click: 'onFormCancelClick'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'karmaform-save-btn',
                        formBind: true,
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            height: 250,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_productattribute_value_id'
                },
                {
                    xtype: 'combobox',
                    allowBlank: false,
                    name: 'ddo_productattribute_id',
                    reference: 'selectEmployee',
                    displayField: 'name',
                    valueField: 'ddo_productattribute_id',
                    typeAhead: true,
                    forceSelection: true,
                    minChars: 1,
                    emptyText: 'Attribute',
                    cls: 'rule-name-cls',
                    queryMode: 'local',
                    lastQuery: '',
                    store: 'Redeem.store.AttributeStore'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'productattributevalue',
                    emptyText: 'Attribute Value',
                    required: true,
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    allowBlank: false,
                    emptyText: 'Code',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('Redeem.order.attributevalue.AttributeValue', {
    extend: 'Ext.container.Container',
    alias: 'widget.attributevalue',
    requires: [
        'Redeem.order.attributevalue.AttributeValueGrid',
        'Redeem.order.attributevalue.AttributeValueToolbar',
        'Redeem.order.attributevalue.AttributeValueViewController',
        'Redeem.order.attributevalue.AttributeValueViewModel',
        'Redeem.order.attributevalue.AttributeValueWindow'
    ],
    scrollable: false,
    controller: 'attributevalueviewcontroller',
    viewModel: {
        type: 'attributevalueviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('Redeem.store.AttributeValueStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
        }
    },
    //store.load();
    items: [
        {
            xtype: 'attributevaluetoolbar',
            cls: 'wallet-toolbar-cls',
            width: '100%',
            height: 70,
            html: '<h3>Attribute Value</h3>'
        },
        {
            xtype: 'attributevaluegrid',
            store: 'Redeem.store.AttributeValueStore'
        }
    ]
});

Ext.define('Redeem.order.category.CategoryValueGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.categoryvaluegrid',
    cls: 'karmalist-cls',
    plugins: 'gridfilters',
    height: 500,
    // width: '100%',
    viewConfig: {
        loadMask: false
    },
    margin: '0 0 0 10',
    columns: [
        {
            text: 'Name',
            dataIndex: 'productcategoryname',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Code',
            dataIndex: 'code',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            categoryId: rec.data.ddo_productcategory_id
                        };
                        Ext.Ajax.request({
                            url: '/productcategory',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                            },
                            failure: function(resp, b) {
                                var responseTextData = Ext.decode(resp.responseText),
                                    errDetail = responseTextData.data,
                                    errDetailFormat, errorMsg;
                                if (errDetail && errDetail.detail) {
                                    errDetailFormat = errDetail.detail.split('=');
                                    errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
                                    var errRef = errorMsg.match("still referenced");
                                    if (errRef) {
                                        Ext.Msg.alert('Failed', "Already this category is mapped to products");
                                    } else {
                                        Ext.Msg.alert('Failed', errorMsg);
                                    }
                                }
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('Redeem.order.category.CategoryValueToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.categoryvaluetoolbar',
    //cls: 'rule-tb-cls',
    items: [
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'button',
            text: 'Add New',
            iconCls: 'rule-plus',
            margin: 0,
            cls: 'rule-add-btn',
            listeners: {
                click: 'onAddNewClick'
            }
        }
    ]
});

Ext.define('Redeem.order.category.CategoryValueViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.categoryvalueviewcontroller',
    /**
     * This is the handler for the click event of the Add categories.
     * It will open the form panel then we can add record.
     * @param button - The add button reference.    
     * @param e - The click event
     * @param eOpts -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        var attributevalueWindow = Ext.ComponentQuery.query('categoryvaluewindow')[0] || Ext.create('Redeem.order.category.CategoryValueWindow'),
            form = attributevalueWindow.down('form');
        this.onFormLoadTrue(form);
        form.reset();
        attributevalueWindow.show();
        attributevalueWindow.edit = false;
    },
    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param grid - The grid list reference.
     * @param record - The grid selected record.
     * @param tr - The TR element for the cell. 
     * @param rowIndex - Number(row index number).   
     * @param e - The click event
     * @param eOpts -Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        var attributevalueWindow = Ext.ComponentQuery.query('categoryvaluewindow')[0] || Ext.create('Redeem.order.category.CategoryValueWindow'),
            form = attributevalueWindow.down('form');
        this.onFormLoadDirtyFalse(form, record);
        form.reset();
        form.loadRecord(record);
        attributevalueWindow.show();
        attributevalueWindow.edit = true;
    },
    onFormLoadDirtyFalse: function(form, record) {
        form.items.items.forEach(function(rec) {
            rec.originalValue = record.get(rec.name);
        });
    },
    onFormLoadTrue: function(form) {
        var formValues = form.getValues();
        var items = form.getForm().getFields().items,
            i = 0,
            len = items.length;
        for (; i < len; i++) {
            var formField = items[i];
            formField.value = '';
            if (formField.mixins && formField.mixins.field && typeof formField.mixins.field['initValue'] == 'function') {
                formField.mixins.field.initValue.apply(formField);
                formField.wasDirty = false;
            }
        }
    }
});

Ext.define('Redeem.order.category.CategoryValueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.categoryvalueviewmodel'
});

Ext.define('Redeem.order.category.CategoryValueWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.categoryvaluewindowcontroller',
    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onSetUpWinOutterTap(event, target, view);
    },
    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var categoryvalueWindow, form;
        categoryvalueWindow = btn.up('window');
        form = categoryvalueWindow.down('form');
        form.reset();
        categoryvalueWindow.close();
    },
    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param btn - The Save button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        var gridStore, categoryvalueWindow, form, formRec, params, name, valueMatch;
        gridStore = Ext.getStore('Redeem.store.CategoryValueStore');
        categoryvalueWindow = btn.up('window');
        form = categoryvalueWindow.down('form');
        formRec = form.getValues();
        name = Ext.String.trim(formRec.productcategoryname);
        valueMatch = gridStore.findRecord('productcategoryname', name, 0, false, false, true);
        if (categoryvalueWindow.edit) {
            editRec = gridStore.findRecord('ddo_productcategory_id', formRec.ddo_productcategory_id);
            if (valueMatch && editRec && editRec.get('productcategoryname').toLowerCase() == valueMatch.get('productcategoryname').toLowerCase()) {
                valueMatch = null;
            }
        }
        if (!valueMatch) {
            if (form.isDirty()) {
                if (categoryvalueWindow.edit) {
                    form.updateRecord();
                    gridStore.sync({
                        callback: function() {
                            gridStore.clearFilter(true);
                            gridStore.load();
                        }
                    });
                } else {
                    gridStore.add(form.getValues());
                    gridStore.sync({
                        callback: function() {
                            gridStore.clearFilter(true);
                            gridStore.load();
                        }
                    });
                }
                form.reset();
                categoryvalueWindow.close();
            } else {
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
                gridStore.clearFilter(true);
                gridStore.load();
                
            }
        } else {
            Ext.Msg.alert('Warning', "Current Category value Already added. Please select other one");
            gridStore.clearFilter(true);
            gridStore.load();
        }
    }
});

Ext.define('Redeem.order.category.CategoryValueWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.categoryvaluewindowviewmodel'
});

Ext.define('Redeem.order.category.CategoryValueWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Redeem.order.category.CategoryValueWindowController',
        'Redeem.order.category.CategoryValueWindowViewModel'
    ],
    alias: 'widget.categoryvaluewindow',
    title: 'Category',
    controller: 'categoryvaluewindowcontroller',
    viewModel: {
        type: 'categoryvaluewindowviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    closable: false,
    cls: 'attributevalue-win-cls',
    modal: true,
    width: 600,
    height: 280,
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 20 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'karmaform-cancel-btn',
                        listeners: {
                            click: 'onFormCancelClick'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'karmaform-save-btn',
                        formBind: true,
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            height: 230,
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_productcategory_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'productcategoryname',
                    emptyText: ' Category Name',
                    required: true,
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    maxLength: 10,
                    enforceMaxLength: true,
                    emptyText: 'Code',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('Redeem.order.category.CategoryValue', {
    extend: 'Ext.container.Container',
    alias: 'widget.categoryvalue',
    requires: [
        'Redeem.order.category.CategoryValueGrid',
        'Redeem.order.category.CategoryValueToolbar',
        'Redeem.order.category.CategoryValueViewController',
        'Redeem.order.category.CategoryValueViewModel',
        'Redeem.order.category.CategoryValueWindow'
    ],
    scrollable: false,
    controller: 'categoryvalueviewcontroller',
    viewModel: {
        type: 'categoryvalueviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('Redeem.store.CategoryValueStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
        }
    },
    //store.load();
    items: [
        {
            xtype: 'categoryvaluetoolbar',
            cls: 'wallet-toolbar-cls',
            width: '100%',
            height: 70,
            html: '<h3>Category</h3>'
        },
        {
            xtype: 'categoryvaluegrid',
            store: 'Redeem.store.CategoryValueStore'
        }
    ]
});

Ext.define('Redeem.order.product.ProductValueGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.productvaluegrid',
    cls: 'karmalist-cls',
    plugins: 'gridfilters',
    height: 500,
    reference: 'productvaluegrid',
    viewConfig: {
        loadMask: false
    },
    margin: '0 0 0 10',
    columns: [
        {
            text: 'Name',
            dataIndex: 'productname',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Category',
            dataIndex: 'categoryname',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Price',
            dataIndex: 'price',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Quantity',
            dataIndex: 'quantity',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Code',
            dataIndex: 'code',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_product_id: rec.data.ddo_product_id
                        };
                        Ext.Ajax.request({
                            url: '/product',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                            },
                            failure: function(resp, b) {
                                var responseTextData = Ext.decode(resp.responseText),
                                    errDetail = responseTextData.message;
                                Ext.Msg.alert('Failed', errDetail);
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('Redeem.order.product.ProductValueToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.productvaluetoolbar',
    items: [
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'button',
            text: 'Add New',
            iconCls: 'rule-plus',
            margin: 0,
            cls: 'rule-add-btn',
            listeners: {
                click: 'onAddNewClick'
            }
        }
    ]
});

Ext.define('Redeem.order.product.ProductValueViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productvalueviewcontroller',
    /**
     * This is the handler for the click event of the Add Product.
     * It will open the form panel then we can add record.
     * @param button - The add button reference.    
     * @param e - The click event
     * @param eOpts -Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        var productvalueWindow = Ext.ComponentQuery.query('setattributewindow')[0] || Ext.create('Redeem.order.product.SetAttributeWindow'),
            form = productvalueWindow.down('form'),
            viewModel = productvalueWindow.getViewModel(),
            tabpanel = productvalueWindow.down('tabpanel');
        tabpanel.setActiveTab(0);
        this.onFormLoadTrue(form);
        form.reset();
        viewModel.set('product_id', "");
        productvalueWindow.show();
        productvalueWindow.edit = false;
    },
    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param grid - The grid list reference.
     * @param record - The grid selected record.
     * @param tr - The TR element for the cell. 
     * @param rowIndex - Number(row index number).   
     * @param e - The click event
     * @param eOpts -Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        var productvalueWindow = Ext.ComponentQuery.query('setattributewindow')[0] || Ext.create('Redeem.order.product.SetAttributeWindow'),
            form = productvalueWindow.down('form'),
            viewModel = productvalueWindow.getViewModel(),
            paramsData,
            setAttributeStore = Ext.getStore('Redeem.store.SetAttributeStore'),
            productImgStore = Ext.getStore('Redeem.store.ProductImagesStore');
        tabpanel = productvalueWindow.down('tabpanel');
        tabpanel.setActiveTab(0);
        this.onFormLoadDirtyFalse(form, record);
        form.reset();
        form.loadRecord(record);
        viewModel.set('product_id', record.data.ddo_product_id);
        viewModel.set('product_name', record.data.productname);
        paramsData = {
            ddo_product_id: record.data.ddo_product_id
        };
        Ext.apply(setAttributeStore.getProxy().extraParams, paramsData);
        Ext.apply(productImgStore.getProxy().extraParams, paramsData);
        setAttributeStore.load();
        productImgStore.load();
        productvalueWindow.show();
        productvalueWindow.edit = true;
    },
    onFormLoadDirtyFalse: function(form, record) {
        form.items.items.forEach(function(rec) {
            rec.originalValue = record.get(rec.name);
        });
    },
    onFormLoadTrue: function(form) {
        var formValues = form.getValues();
        var items = form.getForm().getFields().items,
            i = 0,
            len = items.length;
        for (; i < len; i++) {
            var formField = items[i];
            formField.value = '';
            if (formField.mixins && formField.mixins.field && typeof formField.mixins.field['initValue'] == 'function') {
                formField.mixins.field.initValue.apply(formField);
                formField.wasDirty = false;
            }
        }
    },
    // on grid row click assign set attribute button enables and product id  setting in viewmodel
    onRowClick: function(view, record, tr, rowIndex, e, eOpts) {
        var viewModel = this.getViewModel();
        viewModel.set('setAttributeBtn', false);
    }
});

Ext.define('Redeem.order.product.ProductValueViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productvalueviewmodel',
    data: {
        setAttributeBtn: true
    }
});

Ext.define('Redeem.order.product.SetAttributeWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.setattributewindowcontroller',
    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        if (Utility.nominatAlert) {
            var view = this;
            Utility.onSetUpWinOutterTap(event, target, view);
        }
    },
    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var productvalueWindow, form;
        productvalueWindow = btn.up('window');
        form = productvalueWindow.down('form');
        form.reset();
        productvalueWindow.close();
    },
    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param btn - The Save button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        var gridStore, productvalueWindow, form, formRec, params, tabpanel, setAttributesTab, name, valueMatch, viewmodel, activeView;
        productvalueWindow = btn.up('window');
        form = productvalueWindow.down('form') , viewmodel = productvalueWindow.getViewModel();
        tabpanel = productvalueWindow.down('tabpanel');
        activeView = tabpanel.getActiveTab() , setAttributesTab = productvalueWindow.down('setproductimagestab');
        formRec = form.getValues();
        var setAttributesArray = [],
            imagesArray = [];
        var gridStore = productvalueWindow.down('grid').getStore();
        var productValueStore = Ext.getStore('Redeem.store.ProductValueStore');
        var imagesDataview = productvalueWindow.down('setproductimages');
        var imagesStore = imagesDataview.getStore();
        if (activeView.xtype == "setproductimagestab") {
            imagesStore.sync({
                success: function(batch, opt) {
                    gridStore.load();
                    tabpanel.setActiveItem(setAttributesTab);
                    productvalueWindow.close();
                    productValueStore.load();
                }
            });
        } else {
            gridStore.sync({
                success: function(batch, opt) {
                    gridStore.load();
                    tabpanel.setActiveItem(setAttributesTab);
                    productValueStore.load();
                }
            });
        }
    },
    onAttributeComboSelect: function(combo, record, eOpts) {
        var comboRefs = this.getReferences(),
            attributeValueRef, store, comboValue;
        attributeValueRef = comboRefs.attributevalueref;
        store = attributeValueRef.getStore();
        comboValue = combo.getValue();
        store.clearFilter(true);
        store.filterBy(function(rec) {
            if (rec.data.ddo_productattribute_id == comboValue) {
                return true;
            }
        });
        if (store.getCount() == 0) {
            attributeValueRef.setReadOnly(true);
        } else {
            attributeValueRef.setReadOnly(false);
        }
    },
    onAddItemClick: function(btn, e, eOpts) {
        var windowViewModel = btn.up('window').getViewModel();
        var product_id = windowViewModel.get('product_id');
        var form = btn.up('form'),
            comboRefs = this.getReferences(),
            setAttributeStore = Ext.getStore('Redeem.store.SetAttributeStore'),
            attributeValueStore = Ext.getStore('Redeem.store.AttributeValueStore'),
            attributeref = comboRefs.attributeref,
            attributevalueref = comboRefs.attributevalueref,
            rec = form.getValues(),
            attributeRec = false;
        var attribute_code = "";
        var attribute_ids = "";
        var attribute_value_ids = "";
        form.items.items.forEach(function(rec) {
            if (rec.value) {
                if (rec.xtype == "combobox") {
                    var record = attributeValueStore.findRecord('ddo_productattribute_value_id', rec.value);
                    attribute_code = attribute_code + "-" + record.data.code;
                    attribute_value_ids = attribute_value_ids + "," + record.data.ddo_productattribute_value_id;
                    attribute_ids = attribute_ids + "," + record.data.ddo_productattribute_id;
                }
            }
        }, this);
        var code = attribute_code.substring(1);
        var codeArray = code.split("-");
        setAttributeStore.each(function(rec) {
            var recCodeArray = rec.data.attribute_code.split("-");
            var diffArray = Ext.Array.difference(recCodeArray, codeArray);
            if (diffArray.length == 0) {
                attributeRec = true;
            }
        });
        if (attributeRec) {
            Ext.Msg.alert('Alert', "already attribute added");
        } else {
            setAttributeStore.add({
                ddo_product_id: product_id,
                attribute_code: attribute_code.substring(1),
                attribute_ids: attribute_ids.substring(1),
                attribute_value_ids: attribute_value_ids.substring(1),
                quantity: rec.quantity
            });
        }
        form.reset();
    },
    onImgUpload: function(filefield, value, eOpts) {
        var me = this,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = filefield.value,
            reader = new FileReader(),
            format = file.type,
            iconsView = filefield.up('setproductimagestab').down('setproductimages'),
            iconsViewStore = iconsView.getStore(),
            product_id = filefield.up('window').getViewModel().get('product_id'),
            isdefault = false,
            imgCount = iconsViewStore.getCount();
        if (imgCount <= 4) {
            reader.onload = function() {
                if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
                    filefield.up('form').submit({
                        url: "/feed/feedsPostedPics",
                        success: function() {
                            var text = Ext.JSON.decode(arguments[1].response.responseText),
                                pathImg = text.data;
                            if (iconsViewStore.getCount() == 0) {
                                isdefault = true;
                            }
                            iconsViewStore.add({
                                imagepath: pathImg,
                                isdefault: isdefault,
                                ddo_product_id: product_id
                            });
                            if (isdefault) {
                                iconsView.getSelectionModel().select(0);
                            }
                        },
                        failure: function() {
                            Ext.toast({
                                html: 'Image not added',
                                width: 150,
                                align: 't'
                            });
                        }
                    });
                } else {
                    Ext.toast({
                        html: 'Invalid Format',
                        width: 150,
                        align: 't'
                    });
                }
            };
            reader.readAsDataURL(file);
        } else {
            Utility.topAlertMessage("Alert", "You can't add more than 5 images");
        }
    },
    productSetupItemClick: function(dataview, record, item, index, evt, eOpts) {
        var me = this,
            targetDom = evt.getTarget(),
            targetEl = Ext.get(targetDom),
            store = dataview.getStore();
        if (targetEl.hasCls('ddo-product-icon-delete')) {
            store.remove(record);
        } else {
            if (record) {
                dataview.getSelectionModel().select(record);
            }
            var rec = store.findRecord('isdefault', true);
            if (rec) {
                rec.set('isdefault', false);
            }
            record.set('isdefault', true);
        }
    },
    SetProductImagesRender: function(productimageview) {
        var store = productimageview.getStore();
        productimageview.getSelectionModel().select(store.findRecord('isdefault', true));
    },
    onBeforeTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var product_id = this.getViewModel().get('product_id');
        if (Ext.isEmpty(product_id)) {
            Utility.topAlertMessage('Alert', "please add and save product first");
            return false;
        }
        if (newCard.xtype == "setproductimagestab") {
            var imagesDataview = newCard.down('dataview'),
                imagesStore = newCard.down('dataview').getStore();
            record = imagesStore.findRecord('isdefault', true);
            if (record) {
                imagesDataview.getSelectionModel().select(record);
            }
        }
    },
    onSetAttributesGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {}
});

Ext.define('Redeem.order.product.SetAttributeWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.setattributewindowviewmodel',
    data: {
        product_id: "",
        product_name: ""
    }
});

Ext.define('Redeem.order.product.SetAttributesTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.setattributes',
    title: 'Attributes',
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeStore'),
            attributeValueComboStore = Ext.getStore('Redeem.store.AttributeValueStore');
        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
            attributeValueComboStore.load();
        }
    },
    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 20 0',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            },
            {
                xtype: 'button',
                text: 'Save and Continue',
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    },
    items: [
        {
            xtype: 'form',
            layout: 'column',
            width: 600
        },
        {
            xtype: 'grid',
            bind: {
                title: '{product_name} Attributes'
            },
            maxHeight: 200,
            margin: 5,
            columnLines: true,
            rowLines: false,
            store: 'Redeem.store.SetAttributeStore',
            cls: 'redeemhistoryitems-grid-view',
            columns: [
                {
                    text: 'Attribute Code',
                    dataIndex: 'attribute_code',
                    flex: 1
                },
                {
                    text: 'Qty',
                    dataIndex: 'quantity',
                    flex: 0.5
                },
                {
                    xtype: 'actioncolumn',
                    //width: 50,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'delete-plus',
                            tooltip: 'Delete',
                            handler: function(grid, rowIndex, colIndex) {
                                var gridStore = grid.getStore(),
                                    rec = gridStore.getAt(rowIndex);
                                gridStore.remove(rec);
                            }
                        }
                    ]
                }
            ],
            listeners: {
                rowdblclick: 'onSetAttributesGridRowClick',
                afterrender: function(me, e, eOpts) {
                    var attributeValueComboStore = Ext.getStore('Redeem.store.AttributeValueStore');
                    Utility.addAttributes(attributeValueComboStore);
                }
            }
        }
    ]
});

Ext.define('Redeem.order.product.SetProductImages', {
    extend: 'Ext.view.View',
    alias: 'widget.setproductimages',
    loadMask: false,
    selectedItemCls: 'imgselected-cls',
    selectionModel: {
        mode: 'SINGLE',
        allowDeslect: true
    },
    store: 'Redeem.store.ProductImagesStore',
    emptyText: '<div class = "ddo-product-emptytext">No Images Added</div>',
    tpl: [
        '<tpl for=".">',
        '<div class="product-main-cls" {[this.validEllipsesQtip(values.iddefault)]}>',
        '<span class="product-nonselec-cls"></span>',
        '<div class = "ddo-product-uploadicon">',
        '<img src="{imagepath}" class="ddo-product-icon" wrap-td="image_url">',
        '</div>',
        '<div class="ddo-product-icon-delete" data-action="deleteIcon"></div>',
        '</div>',
        '</tpl>',
        {
            validEllipsesQtip: function(value) {
                var str = "Default product image";
                var qtip = " data-qtip= '" + str + "'";
                return (value) ? qtip : '';
            }
        }
    ],
    itemSelector: 'div.product-main-cls',
    listeners: {
        itemclick: 'productSetupItemClick'
    }
});

Ext.define('Redeem.order.product.SetProductImagesTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.setproductimagestab',
    title: 'Images',
    requires: [
        'Redeem.order.product.SetProductImages'
    ],
    layout: {
        type: 'hbox'
    },
    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 20 0',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    },
    items: [
        {
            xtype: 'setproductimages'
        },
        {
            xtype: 'form',
            cls: 'karmasetup-feed-form',
            items: [
                {
                    xtype: 'filefield',
                    opType: 'upload',
                    name: 'feedsImage',
                    reference: "karmaUploadIcon",
                    itemId: "karmaUploadIcon",
                    accept: 'image',
                    buttonOnly: true,
                    buttonConfig: {
                        iconCls: 'plus-upload-icon-cls',
                        cls: 'upload-button-cls',
                        width: 65,
                        height: 65,
                        margin: '40 0 0 12'
                    },
                    width: 80,
                    buttonText: '',
                    listeners: {
                        change: 'onImgUpload'
                    }
                }
            ]
        }
    ]
});

Ext.define('Redeem.order.product.ProductValueFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productvalueformcontroller',
    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param btn - The cancel button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        var productvalueWindow, form;
        productvalueWindow = btn.up('window');
        form = productvalueWindow.down('form');
        form.reset();
        productvalueWindow.close();
    },
    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param btn - The Save button reference.
     * @param e - The click event.    
     * @param eOpts - Object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        var gridStore, productvalueWindow, form, formRec, params, name, valueMatch, tabpanel, setAttributesTab, viewModel, setAttributeStore, productImgStore, paramsData;
        gridStore = Ext.getStore('Redeem.store.ProductValueStore');
        productvalueWindow = btn.up('window');
        tabpanel = productvalueWindow.down('tabpanel');
        setAttributesTab = productvalueWindow.down('setattributes');
        setAttributeStore = Ext.getStore('Redeem.store.SetAttributeStore');
        productImgStore = Ext.getStore('Redeem.store.ProductImagesStore');
        form = productvalueWindow.down('form');
        formRec = form.getValues();
        viewModel = productvalueWindow.getViewModel();
        name = Ext.String.trim(formRec.productname);
        valueMatch = gridStore.findRecord('productname', name, 0, false, false, true);
        if (productvalueWindow.edit) {
            editRec = gridStore.findRecord('ddo_product_id', formRec.ddo_product_id);
            if (valueMatch && editRec && editRec.get('productname').toLowerCase() == valueMatch.get('productname').toLowerCase() && editRec.get('ddo_productcategory_id') == valueMatch.get('ddo_productcategory_id')) {
                valueMatch = null;
            }
        }
        if (!valueMatch) {
            if (form.isDirty()) {
                if (productvalueWindow.edit) {
                    form.updateRecord();
                    gridStore.sync({
                        callback: function() {
                            gridStore.clearFilter(true);
                            gridStore.load();
                            tabpanel.setActiveItem(setAttributesTab);
                        }
                    });
                } else {
                    gridStore.add(form.getValues());
                    gridStore.sync({
                        success: function(batch) {
                            if (batch.operations[0].getResponse()) {
                                var jsonData = batch.operations[0].getResponse().responseText,
                                    product_id = Ext.decode(jsonData).product_id;
                                viewModel.set('product_id', product_id);
                                viewModel.set('product_name', formRec.productname);
                                paramsData = {
                                    ddo_product_id: product_id
                                };
                                Ext.apply(setAttributeStore.getProxy().extraParams, paramsData);
                                Ext.apply(productImgStore.getProxy().extraParams, paramsData);
                                setAttributeStore.load();
                                productImgStore.load();
                            }
                            gridStore.clearFilter(true);
                            tabpanel.setActiveItem(setAttributesTab);
                            gridStore.load();
                        },
                        failure: function(batch) {
                            var error = batch.operations[0].getError(),
                                response = batch.operations[0].error.response,
                                errorMsg;
                            if (Ext.isObject(error)) {
                                if (error.status && error.statusText) {
                                    var responseTextData = Ext.decode(response.responseText),
                                        errDetail = responseTextData.data,
                                        errDetailFormat, errorMsg;
                                    if (errDetail) {
                                        errDetailFormat = errDetail.detail.split('=');
                                        errorMsg = errDetailFormat[1].replace(/\(/g, "").replace(/\)/g, "");
                                        Ext.Msg.alert('Failed', errorMsg);
                                    }
                                }
                            }
                            gridStore.load();
                            form.reset();
                        }
                    });
                }
            } else //form.reset();
            // productvalueWindow.close();
            {
                gridStore.clearFilter(true);
                gridStore.load();
                Utility.topAlertMessage('WARNING', "Record Already Exists!!");
            }
        } else {
            gridStore.clearFilter(true);
            gridStore.load();
            Ext.Msg.alert('Warning', "Current Product value Already added. Please select other one");
        }
    }
});

Ext.define('Redeem.order.product.ProductValueFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productvalueformviewmodel'
});

Ext.define('Redeem.order.product.ProductValueForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'Redeem.order.product.ProductValueFormController',
        'Redeem.order.product.ProductValueFormViewModel'
    ],
    alias: 'widget.productvalueform',
    title: 'Product',
    controller: 'productvalueformcontroller',
    viewModel: {
        type: 'productvalueformviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.CategoryValueStore');
        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
        }
        var controller = this.getController();
    },
    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 20 0',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            },
            {
                xtype: 'button',
                text: 'Save and Continue',
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'ddo_product_id'
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            name: 'productname',
            emptyText: 'Product Name',
            required: true,
            cls: 'rule-name-cls'
        },
        {
            xtype: 'combobox',
            name: 'ddo_productcategory_id',
            reference: 'selectEmployee',
            displayField: 'productcategoryname',
            valueField: 'ddo_productcategory_id',
            typeAhead: true,
            forceSelection: true,
            minChars: 1,
            emptyText: 'Category',
            cls: 'rule-name-cls',
            queryMode: 'local',
            allowBlank: false,
            lastQuery: '',
            store: 'Redeem.store.CategoryValueStore'
        },
        {
            xtype: 'textfield',
            maskRe: /[0-9]/,
            allowBlank: false,
            name: 'price',
            emptyText: 'Price',
            required: true,
            cls: 'rule-name-cls'
        },
        {
            xtype: 'textfield',
            maskRe: /[0-9]/,
            allowBlank: false,
            name: 'quantity',
            emptyText: 'Quantity',
            required: true,
            cls: 'rule-name-cls'
        },
        {
            xtype: 'textfield',
            name: 'code',
            emptyText: 'Code',
            enforceMaxLength: true,
            maxLength: 10,
            allowBlank: false,
            cls: 'rule-name-cls'
        }
    ]
});

Ext.define('Redeem.order.product.SetAttributeWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Redeem.order.product.SetAttributeWindowController',
        'Redeem.order.product.SetAttributeWindowViewModel',
        'Redeem.order.product.SetAttributesTab',
        'Redeem.order.product.SetProductImagesTab',
        'Redeem.order.product.ProductValueForm'
    ],
    header: false,
    alias: 'widget.setattributewindow',
    controller: 'setattributewindowcontroller',
    viewModel: {
        type: 'setattributewindowviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Redeem.store.AttributeStore'),
            attributeValueComboStore = Ext.getStore('Redeem.store.AttributeValueStore');
        if (comboStore && !comboStore.isLoaded()) {
            comboStore.load();
            attributeValueComboStore.load();
        }
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    closable: false,
    cls: 'attributevalue-win-cls',
    modal: true,
    width: 600,
    constrain: true,
    layout: 'fit',
    resizable: false,
    items: [
        {
            xtype: 'tabpanel',
            padding: '20 0 0 0',
            cls: 'wallethistorytab-cls',
            tabBar: {
                layout: {
                    pack: 'center'
                },
                height: 70
            },
            items: [
                {
                    xtype: 'productvalueform'
                },
                {
                    xtype: 'setattributes'
                },
                {
                    xtype: 'setproductimagestab'
                }
            ],
            listeners: {
                beforetabchange: 'onBeforeTabChange'
            }
        }
    ]
});

Ext.define('Redeem.order.product.ProductValue', {
    extend: 'Ext.container.Container',
    alias: 'widget.productvalue',
    requires: [
        'Redeem.order.product.ProductValueGrid',
        'Redeem.order.product.ProductValueToolbar',
        'Redeem.order.product.ProductValueViewController',
        'Redeem.order.product.ProductValueViewModel',
        'Redeem.order.product.SetAttributeWindow'
    ],
    scrollable: false,
    controller: 'productvalueviewcontroller',
    viewModel: {
        type: 'productvalueviewmodel'
    },
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('Redeem.store.ProductValueStore');
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
        }
        // store.load();
        var attributeStore = Ext.getStore('Redeem.store.AttributeStore'),
            attributeValueStore = Ext.getStore('Redeem.store.AttributeValueStore');
        if (!attributeStore.isLoaded()) {
            attributeStore.load();
            attributeValueStore.load();
        }
    },
    items: [
        {
            xtype: 'productvaluetoolbar',
            cls: 'wallet-toolbar-cls',
            width: '100%',
            height: 70,
            html: '<h3>Product</h3>'
        },
        {
            xtype: 'productvaluegrid',
            store: 'Redeem.store.ProductValueStore'
        }
    ]
});

Ext.define('Redeem.product.Checkout', {
    extend: 'Ext.view.View',
    alias: 'widget.checkout',
    cls: 'redeem-checkout',
    // tpl: [
    // 	'<tpl for=".">',
    // 		'<div class="checkout-wrap">',				
    // 			'<div class="checkout-img">',					
    // 				'<img src="{[this.getImage(values)]}" class = "product-img" />',
    // 				'<span class="redeem-name">{[this.getNames(values)]}</span>',
    // 				'<span class="exactPointPCls">P</span><span class="exactPointsCls">{exactPoints}</span>',
    // 			'</div>',
    // 			'<div class="checkout-options">',
    // 				// '<div class="product-size">',
    // 				// 	'<tpl for="attributes.size">',
    // 				// 		'<div class="size {selected}">{dispVal}</div>',
    // 				// 	'</tpl>',
    // 				// '</div>',
    // 				'<div class="product-quantity">',
    // 					'<input type="number" value="{qty}" id="{[this.getIds(values)]}" class="txtField"/>',
    // 				'</div>',
    // 				// '<div class="product-color">',
    // 				// 	'<tpl for="attributes.color">',
    // 				// 		'<div class="color {selected}" style ="border-color:{val};"></div>',
    // 				// 	'</tpl>',
    // 				// '</div>', 
    // 			'</div>',
    // 			'<div class="product-value">',
    // 				'<div class="value">{points}</div>',
    // 				'<span class="x-fa fa-trash-o delete"></span>',
    // 			'</div>',
    // 		'</div>',
    // 	'</tpl>',{
    // 		getIds:function(values){
    // 			return values.id
    // 		},
    // 		getNames:function(values){
    // 			return values.name
    // 		},
    // 		getImage:function(values){
    // 			if(Ext.isEmpty(values.img)){
    // 				return "resources/images/redeem/comingsoon.jpg"
    // 			}
    // 			return values.img
    // 		}
    // 	}
    // ],
    tpl: [
        '<tpl for=".">',
        '<div class="checkout-wrap">',
        '<div class="div-one">',
        '<img src="{[this.getImage(values)]}" class="checkout-image"/>',
        '</div>',
        '<div class="div-two" {[this.validEllipsesQtip(values.name, 16)]}>{[this.getEllipseText(values.name, 16)]}</div>',
        '<div class="div-three">',
        '<span class="exactPointPCls">P</span>',
        '<span class="exactPointsCls">{exactPoints}</span>',
        '</div>',
        '<div class="div-four">',
        '</div>',
        '<div class="div-five">',
        '<span><input class="txtField"  id="{[this.getIds(values)]}" style="width:50px" type="number" value="{qty}" min="1"/></span>',
        '<span class="x-fa fa-trash-o delete"></span>',
        '</div>',
        '</div>',
        '</tpl>',
        {
            getIds: function(values) {
                return values.id;
            },
            getEllipseText: function(string, limit) {
                if (Ext.isEmpty(string)) {
                    string = "";
                }
                return Ext.String.ellipsis(string, limit);
            },
            validEllipsesQtip: function(value, limit) {
                if (Ext.isEmpty(value)) {
                    value = "";
                }
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            },
            getImage: function(values) {
                if (Ext.isEmpty(values.img)) {
                    return "resources/images/redeem/comingsoon.jpg";
                }
                return values.img;
            }
        }
    ],
    itemSelector: 'div.checkout-wrap',
    emptyText: 'No products available',
    listeners: {
        itemclick: 'onCheckoutItemClick',
        change: {
            element: 'el',
            delegate: 'input.txtField',
            fn: 'onchange'
        }
    }
});

Ext.define('Redeem.product.CheckoutWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.checkoutwindow',
    // config: {
    // 	toastMsg: Ext.create('Ext.window.Toast', {
    // 		width: 200,
    // 		closeAction: 'hide',
    // 		align: 't'
    // 	})
    // },
    /**
     * @event itemclick fire when checkout item is clicked 
     * Fires when an item is clicked.
     * @cmp :  {Ext.view.View} this view.
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @item :  {HTMLElement} The item's element.
     * @index :  { Number} The item's index.
     * @e :  {Ext.event.Event} The raw event object.
     * @eOpts :  { Object} The options object passed to Ext.util.Observable.addListener.
     */
    onCheckoutItemClick: function(cmp, record, item, index, e, eOpts) {
        var classList = e.target.classList,
            vm = Ext.first('redeem-view').getViewModel(),
            view = this.getView(),
            valuepoints = view.down('#valuepoints'),
            orignalvalue = view.down('#orignalvalue');
        if (Ext.Array.contains(classList, 'delete')) {
            cmp.getStore().remove(record);
            if (cmp.getStore().getCount() === 0) {
                Ext.first('#Checkout_button').setDisabled(true);
                vm.set('badgeText', ' ');
                vm.set('selectedItems', []);
                valuepoints.setText('Redeemed ' + 0);
                orignalvalue.setText('Available ' + (orignalvalue.prize + record.get('points')));
            } else {
                var array = vm.get('selectedItems');
                array.pop(record.getData());
                vm.set('selectedItems', array);
                valuepoints.prize = (valuepoints.prize - record.get('points'));
                vm.set('badgeText', '<div class="btn-badge">' + cmp.getStore().getCount() + '</div>');
                valuepoints.setText('Redeemed ' + valuepoints.prize);
                orignalvalue.prize = (orignalvalue.prize + record.get('points'));
                orignalvalue.setText('Available ' + orignalvalue.prize);
            }
        } else if (Ext.Array.contains(classList, 'size')) {
            this.onClickSize(record, e, item.childNodes[1].childNodes[0]);
        } else if (Ext.Array.contains(classList, 'color')) {
            this.onClickColor(record, e, item.childNodes[1].childNodes[2]);
        }
    },
    /* this method is called to select a size 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     */
    onClickSize: function(record, e, sizes) {
        var target = e.getTarget(),
            childNodes = sizes.childNodes,
            view = this.getView().down('checkout'),
            store = view.getStore(),
            size;
        Ext.Array.each(childNodes, function(childNode, index, allitems) {
            if (Ext.Array.contains(childNode.classList, 'selected')) {
                childNode.className = "size";
                return false;
            }
        });
        size = target.innerHTML;
        target.className = target.className + " selected";
        for (x in record.data.attributeOptions.size) {
            if (record.data.attributeOptions.size[x].dispVal == size) {
                record.data.attributeOptions.size[x].selected = " selected";
            } else {
                record.data.attributeOptions.size[x].selected = "";
            }
        }
    },
    /* this method is called to select a color 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     */
    onClickColor: function(record, e, color) {
        var target = e.getTarget(),
            childNodes = color.childNodes,
            view = this.getView().down('checkout'),
            store = view.getStore();
        Ext.Array.each(childNodes, function(childNode, index, allitems) {
            if (Ext.Array.contains(childNode.classList, 'selected')) {
                childNode.className = "color";
                return false;
            }
        });
        var str = target.outerHTML;
        index1 = target.outerHTML.indexOf(':') + 1;
        index2 = target.outerHTML.indexOf(';');
        index3 = index2 - index1;
        cstr = str.substr(index1, index3);
        target.className = target.className + " selected";
        for (x in record.data.attributeOptions.color) {
            if (record.data.attributeOptions.color[x].val == cstr) {
                record.data.attributeOptions.color[x].selected = " selected";
            } else {
                record.data.attributeOptions.color[x].selected = "";
            }
        }
    },
    /**
     * @event click fire when checkout button is clicked 
     * @btn :  { Ext.button.Button} this Button
     */
    onConfirmBtnClick: function(btn, eOpts) {
        var checkoutwindow = this.getView(),
            checkout, store,
            salesOrderLineObj = [],
            color, size,
            toastMsg = Ext.create('Ext.window.Toast', {
                width: 300,
                height: 200,
                closeAction: 'hide',
                html: 'Success !',
                align: 't'
            });
        var total_order_price = "";
        var attributeStore = Ext.getStore('Redeem.store.AttributeStore');
        var attributeValueStore = Ext.getStore('Redeem.store.AttributeValueStore');
        checkoutwindow.setLoading(true);
        if (!Ext.isEmpty(checkoutwindow)) {
            checkout = checkoutwindow.down('checkout');
            if (!Ext.isEmpty(checkout)) {
                store = checkout.getStore();
                for (i = 0; i < store.getCount(); i++) {
                    var rec = store.getAt(i),
                        data = rec.getData();
                    for (j = 0; j < data.attributeOptions.color.length; j++) {
                        if (data.attributeOptions.color[j].selected === " selected") {
                            color = data.attributeOptions.color[j].val;
                        }
                    }
                    for (j = 0; j < data.attributeOptions.size.length; j++) {
                        if (data.attributeOptions.size[j].selected === " selected") {
                            size = data.attributeOptions.size[j].dispVal;
                        }
                    }
                    total_order_price = total_order_price + data.points;
                    salesOrderLineObj.push({
                        ddo_product_id: data.pid,
                        PriceEntered: data.points,
                        totalprice: data.points,
                        lineprice: data.points,
                        unitprice: (data.points / data.qty),
                        quantity: data.qty,
                        QtyOrdered: data.qty,
                        Description: 'Size: ' + size + ' , ' + ' color: ' + color
                    });
                }
                var param = Ext.JSON.encode(salesOrderLineObj);
                Ext.Ajax.request({
                    url: '/productredeem',
                    method: 'POST',
                    scope: this,
                    params: {
                        productListArr: param,
                        total_order_price: total_order_price
                    },
                    success: function(response, opts) {
                        var obj, redeemView, loginStore;
                        obj = Ext.decode(response.responseText);
                        console.log('obj: ', obj);
                        if (obj.success) {
                            redeemView = Ext.ComponentQuery.query('redeem-view')[0];
                            loginStore = Ext.getStore('login');
                            toastMsg.update('Success !');
                            toastMsg.show();
                            Ext.getStore('Redeem.store.ProductValueStore').load();
                            Ext.getStore('redeem.RedeemGridStore').load();
                            redeemView.getViewModel().getStore('productstore').load();
                            redeemView.getViewModel().set('rewardPoints', obj.reward_points);
                            loginStore.getAt(0).get('score').rewardpoints = obj.reward_points;
                            this.getView().close();
                            redeemView.close();
                        } else {
                            toastMsg.update(obj.message);
                            toastMsg.show();
                        }
                        checkoutwindow.setLoading(false);
                    },
                    failure: function(response, opts) {
                        checkoutwindow.setLoading(false);
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
        }
    },
    /**
     * @event change fire when number fileds value changed
     * @me : dom element
     * @inputfield : number field
     */
    onchange: function(me, inputfield) {
        var val = parseInt(inputfield.value);
        if (val < 1) {
            inputfield.value = 1;
        } else {
            var id = inputfield.id,
                value = inputfield.value,
                view = this.getView().down('checkout'),
                totalPrize = 0,
                parentView = view.up('checkoutwindow'),
                valueLabel = parentView.down('#valuepoints'),
                valueOrignal = parentView.down('#orignalvalue'),
                store = view.getStore(),
                redeem = parseInt(Ext.getStore('login').getAt(0).getData().score.rewardpoints),
                prize = 0,
                data,
                toastMsg = Ext.create('Ext.window.Toast', {
                    width: 300,
                    height: 200,
                    closeAction: 'hide',
                    html: 'Success !',
                    align: 't'
                }),
                score = parseInt(Ext.getStore('login').getAt(0).getData().score.rewardpoints),
                record = store.findRecord('id', id);
            if (store) {
                for (i = 0; i < store.getCount(); i++) {
                    data = store.getAt(i).getData();
                    prize += parseInt(data.points);
                }
                prize -= parseInt(record.get('exactPoints')) * parseInt(record.get('qty'));
                prize = prize + (parseInt(record.get('exactPoints')) * parseInt(value));
                if (score < prize) {
                    toastMsg.update('Points are less');
                    toastMsg.show();
                    inputfield.value = record.get('qty');
                    return;
                }
            }
            if (parseInt(record.get('orignalqty')) < parseInt(value)) {
                toastMsg.update('Out Of Stock');
                toastMsg.show();
                inputfield.value = record.get('qty');
                return;
            }
            record.set('qty', value);
            record.set('points', (parseInt(value) * parseFloat(record.get('exactPoints'))));
            for (j = 0; j < store.getCount(); j++) {
                totalPrize += parseInt(store.getAt(j).getData().points);
            }
            valueLabel.setText('Redeemed ' + totalPrize);
            valueLabel.prize = totalPrize;
            valueOrignal.setText('Available ' + (redeem - totalPrize));
            valueOrignal.prize = redeem - totalPrize;
        }
    }
});

Ext.define('Redeem.product.CheckoutWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.checkoutwindow',
    requires: [
        'Redeem.product.Checkout',
        'Redeem.product.CheckoutWindowController'
    ],
    width: '50%',
    height: '50%',
    // header  : false,
    autoShow: true,
    scrollable: true,
    resizable: false,
    maskClickAction: 'hide',
    modal: true,
    title: 'Checkout',
    titleAlign: 'center',
    cls: 'checkoutwindow',
    controller: 'checkoutwindow',
    initComponent: function() {
        var me = this;
        this.dockedItems = this.buildTbar();
        this.bbar = this.buildBbar();
        this.items = this.buildItems();
        this.callParent(arguments);
        me.mon(Ext.getBody(), 'click', function(el, e) {
            me.close(me.closeAction);
        }, me, {
            delegate: '.x-mask'
        });
    },
    buildTbar: function() {
        return [
            {
                xtype: 'toolbar',
                dock: 'top',
                layout: {
                    pack: 'center'
                },
                items: [
                    /*{
				xtype: 'label',
				cls: 'lbl-checkout',
				text: 'Checkout'
			}*/
                    {
                        xtype: 'label',
                        cls: 'lbl-redeemed',
                        itemId: 'valuepoints',
                        text: 'Redeemed ' + this.currentVal,
                        prize: this.currentVal
                    },
                    {
                        xtype: 'label',
                        cls: 'lbl-available',
                        itemId: 'orignalvalue',
                        text: 'Available ' + this.balanceVal,
                        prize: this.balanceVal
                    }
                ]
            }
        ];
    },
    buildBbar: function() {
        return [
            '->',
            {
                text: 'Cancel',
                cls: 'btn-cancel',
                handler: function() {
                    this.up('checkoutwindow').close();
                }
            },
            {
                text: 'Confirm',
                cls: 'btn-confirm',
                handler: 'onConfirmBtnClick'
            }
        ];
    },
    buildItems: function() {
        return [
            {
                xtype: 'checkout',
                store: this.store
            }
        ];
    }
});

Ext.define('Redeem.product.Product', {
    extend: 'Ext.view.View',
    alias: 'widget.product',
    cls: 'redeem-product',
    emptyText: 'No products available',
    tpl: [
        '<tpl for=".">',
        '<div class="product-wrap">',
        '<div class="product-name">{[this.getNames(values)]}</div>',
        '<img src="{[this.getImage(values)]}" class = "product-img" />',
        '<div class="product-color">',
        '<tpl for="attributeOptions.color">',
        '<div class="color" style ="box-shadow: 1px 3px 10px #aeaeae; border-color:{.};"></div>',
        '</tpl>',
        '</div>',
        '<div class="product-size">',
        '<tpl for="attributeOptions.size">',
        '<div class="size">{.}</div>',
        '</tpl>',
        '</div>',
        '<div class="product-value">',
        '<div class="value"><span class = "pointscls">P</span>{[this.getPoints(values)]}</div>',
        '<div class="buy-btn">Buy</div>',
        '</div>',
        '</div>',
        '</tpl>',
        {
            getImage: function(values) {
                if (Ext.isEmpty(values.image_url)) {
                    return "resources/images/redeem/comingsoon.jpg";
                }
                return values.image_url;
            },
            getPoints: function(values) {
                console.log('values: ', values);
                return parseInt(values.points);
            },
            getNames: function(values) {
                return values.name;
            }
        }
    ],
    itemSelector: 'div.product-wrap',
    listeners: {
        itemclick: 'onItemClick'
    }
});

Ext.define('Redeem.product.ProductView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.productview',
    requires: [
        'Redeem.product.Product',
        'Redeem.product.CheckoutWindow'
    ],
    cls: 'redeem-product-view',
    bodyPadding: 20,
    scrollable: true,
    height: 550,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'tbspacer',
                    width: 30
                },
                {
                    xtype: 'button',
                    text: '',
                    iconCls: 'x-fa fa-google-wallet',
                    cls: 'redeem-wallet',
                    disabled: true,
                    bind: {
                        text: '{rewardPoints}'
                    }
                },
                '->',
                {
                    bind: {
                        text: 'Checkout {badgeText}'
                    },
                    iconCls: 'x-fa fa-shopping-cart',
                    width: 130,
                    cls: 'redeem-checkout',
                    itemId: 'Checkout_button',
                    handler: 'onClickCheckOut',
                    disabled: true
                },
                {
                    xtype: 'tbspacer',
                    width: 27
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'product',
            reference: 'product',
            bind: {
                store: '{productstore}'
            }
        }
    ]
});

Ext.define('Redeem.store.AttributeJsonStore', {
    extend: 'Ext.data.Store',
    alias: 'store.attributejsonstore',
    autoLoad: false,
    fields: [
        'name',
        'value'
    ],
    proxy: {
        type: 'ajax',
        url: 'resources/data/redeem/attributes.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});

Ext.define('Redeem.store.AttributeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.attributestore',
    autoLoad: false,
    fields: [
        'name',
        'attribute_values',
        'ddo_productattribute_id',
        'code'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/productattribute',
            create: '/productattribute',
            update: '/productattribute',
            destroy: '/productattribute'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        }
    }
});

Ext.define('Redeem.store.AttributeValueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.attributevaluestore',
    autoLoad: false,
    fields: [
        'ddo_productattribute_value_id',
        'description',
        'ddo_productattribute_id',
        'productattribute',
        'productattributevalue',
        'code'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/productattributevalues',
            create: '/productattributevalues',
            update: '/productattributevalues',
            destroy: '/productattributevalues'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        }
    },
    groupField: 'productattribute'
});

Ext.define('Redeem.store.CategoryValueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.categoryevaluestore',
    autoLoad: false,
    fields: [
        'ddo_productcategory_id',
        'description',
        'productcategoryname',
        'code'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/productcategory',
            create: '/productcategory',
            update: '/productcategory',
            destroy: '/productcategory'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        }
    }
});

Ext.define('Redeem.store.ProductImagesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.productimagesstore',
    autoLoad: false,
    idProperty: 'ddo_product_images_id',
    fields: [
        'imagepath',
        'isdefault',
        'ddo_product_images_id',
        'ddo_product_id'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/productimage',
            create: '/productimage',
            update: '/productimage',
            destroy: '/productimage'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        }
    }
});

Ext.define('Redeem.store.ProductValueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.productvaluestore',
    autoLoad: false,
    fields: [
        'ddo_product_id',
        'categoryname',
        'ddo_productcategory_id',
        'price',
        'quantity',
        'code',
        'productname'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/product',
            create: '/product',
            update: '/product',
            destroy: '/product'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        }
    }
});

Ext.define('Redeem.store.SetAttributeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.setattributestore',
    autoLoad: false,
    fields: [
        'ddo_product_id',
        'attribute_code',
        'attribute_ids',
        'attribute_value_ids',
        'quantity',
        'ddo_productattribute_id',
        'ddo_productattributes_set_id',
        'ddo_productattribute_instance_id'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/setproductattributes',
            create: '/setproductattributes',
            update: '/setproductattributes',
            destroy: '/setproductattributes'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        }
    }
});

/*var toastMsg = Ext.create('Ext.window.Toast', {
            width: 200,
            closeAction: 'hide',
            align: 't'
});*/
Ext.define('Redeem.view.RedeemViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.redeemview',
    // config:{
    // 	toastMsg:Ext.create('Ext.window.Toast', {
    //            width: 200,
    //            closeAction: 'hide',
    //            align: 't'
    // 	})
    // },
    /**
     * @event checkchange
     * Fires when the UI has successfully changed the checked state of a row.
     * @checkbox {Ext.grid.column.Check} this CheckColumn.
     * @rowIndex {Number} rowIndex The row index.
     * @checked {Boolean} checked `true` if the box is now checked.
     * @eOpts {Ext.event.Event} e The underlying event which caused the check change.
     */
    onSelectionChange: function(checkbox, rowIndex, checked, eOpts) {
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            grid = refs.categorygrid,
            store = grid.getStore(),
            rec,
            categoryId = [];
        rec = store.getAt(rowIndex);
        if (!checked) {
            rec.set('selected', true);
        }
        store.each(function(record) {
            if (rec.get('id') == record.get('id')) {
                categoryId.push(record.get('id'));
            } else {
                record.set('selected', false);
            }
        });
        me.filterProduct(categoryId);
    },
    /*
     * Fires when the grid column ia checked to filter the store
     * @categoryId {Array} this Array.
     */
    filterProduct: function(categoryId) {
        var me = this,
            vm = me.getViewModel(),
            productstore = vm.get('productstore');
        if (categoryId.length == 1 && categoryId[0] == 0) {
            productstore.clearFilter(true);
            productstore.load();
            return;
        }
        if (categoryId.length != 0 && !Ext.Array.contains(categoryId, 1)) {
            productstore.clearFilter(true);
            productstore.filterBy(function(record) {
                return Ext.Array.contains(categoryId, record.get('categoryId'));
            });
        } else {
            productstore.clearFilter(true);
            productstore.load();
        }
    },
    /**
     * @event itemclick fire when product item is clicked 
     * Fires when an item is clicked.
     * @cmp :  {Ext.view.View} this view.
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @item :  {HTMLElement} The item's element.
     * @index :  { Number} The item's index.
     * @e :  {Ext.event.Event} The raw event object.
     * @eOpts :  { Object} The options object passed to Ext.util.Observable.addListener.
     */
    onItemClick: function(cmp, record, item, index, e, eOpts) {
        var className = e.getTarget().className;
        if (className == "size") {
            this.size = {
                record: record,
                e: e,
                item: item.childNodes[3]
            };
            this.onClickSize(record, e, item.childNodes[3]);
        } else if (className == "color") {
            this.color = {
                record: record,
                e: e,
                item: item.childNodes[2]
            };
            this.onClickColor(record, e, item.childNodes[2]);
        } else if (className == "buy-btn") {
            this.onClickBuy(record, e, item.childNodes[3], item.childNodes[2]);
        }
    },
    /**
     * this method is called to select a size 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     */
    onClickSize: function(record, e, sizes) {
        var target = e.getTarget(),
            childNodes = sizes.childNodes;
        Ext.Array.each(childNodes, function(childNode, index, allitems) {
            if (Ext.Array.contains(childNode.classList, 'selected')) {
                childNode.className = "size";
                return false;
            }
        });
        this.customSize = target.innerHTML;
        target.className = target.className + " selected";
    },
    /**
     * this method is called to select a color 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @color :  {HTMLElement} The item's element.
     */
    onClickColor: function(record, e, color) {
        var target = e.getTarget(),
            childNodes = color.childNodes;
        Ext.Array.each(childNodes, function(childNode, index, allitems) {
            if (Ext.Array.contains(childNode.classList, 'selected')) {
                childNode.className = "color";
                return false;
            }
        });
        var str = target.outerHTML;
        index1 = target.outerHTML.indexOf(':') + 1;
        index2 = target.outerHTML.indexOf(';');
        index3 = index2 - index1;
        cstr = str.substr(index1, index3);
        this.customColor = cstr;
        target.className = target.className + " selected";
    },
    /**
     * this method is called to buy the items
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     *@color :  {HTMLElement} The item's element.
     */
    onClickBuy: function(record, e, sizes, color) {
        var viewModel = this.getViewModel(),
            me = this,
            selectedItems = viewModel.get('selectedItems'),
            childNodes = sizes.childNodes,
            colorNodes = color.childNodes,
            sizeSelected = false,
            colorSelected = false,
            flag = true,
            exist = false,
            q = 0;
        Ext.Array.each(childNodes, function(childNode, index, allitems) {
            if (Ext.Array.contains(childNode.classList, 'selected')) {
                sizeSelected = true;
                size = childNode.textContent;
            }
        });
        Ext.Array.each(colorNodes, function(colorNodes, index, allitems) {
            if (Ext.Array.contains(colorNodes.classList, 'selected')) {
                colorSelected = true;
            }
        });
        var toastMsg = Ext.create('Ext.window.Toast', {
                width: 200,
                closeAction: 'hide',
                align: 't'
            });
        if (parseInt(record.data.quantity) === 0) {
            flag = false;
            toastMsg.update('Out of Stock');
            toastMsg.show();
            return;
        }
        if (record.data.attributeOptions.size.length === 0 || record.data.attributeOptions.color.length === 0) {
            sizeSelected = true;
            colorSelected = true;
        }
        if (sizeSelected && colorSelected) {
            var newRecord = {
                    'attributeOptions': {
                        'size': this.buildSize(record.data.attributeOptions.size),
                        'color': this.buildColor(record.data.attributeOptions.color)
                    },
                    'img': record.data.image_url,
                    'name': record.data.name,
                    'categoryId': record.data.categoryId,
                    'itemId': record.data.itemId,
                    'pid': record.data.id,
                    'points': parseInt(record.data.points),
                    'qty': 1,
                    'exactPoints': parseInt(record.data.points),
                    'orignalqty': record.data.quantity
                };
            newRecord.attributeOptions.size.forEach(function(item) {
                if (!Ext.isEmpty(item.dispVal) && item.dispVal === me.customSize) {
                    item.selected = " selected";
                } else {
                    item.selected = "";
                }
            });
            newRecord.attributeOptions.color.forEach(function(item) {
                if (!Ext.isEmpty(item.val) && item.val === me.customColor) {
                    item.selected = " selected";
                } else {
                    item.selected = "";
                }
            });
            var points = parseInt(this.getViewModel().get('rewardPoints')),
                totalPoints = 0;
            for (i = 0; i < selectedItems.length; i++) {
                totalPoints = totalPoints + parseFloat(selectedItems[i].points);
            }
            if (selectedItems.length >= 1) {
                totalPoints = totalPoints + parseFloat(newRecord.points);
            }
            if (selectedItems.length == 0) {
                totalPoints = totalPoints + parseFloat(newRecord.points);
            }
            if (totalPoints <= points) {
                if (selectedItems.length == 0) {
                    flag = false;
                    selectedItems.push(newRecord);
                } else {
                    for (i = 0; i < selectedItems.length; i++) {
                        if (newRecord.pid === selectedItems[i].pid) {
                            exist = true;
                            for (j = 0; j < newRecord.attributeOptions.size.length; j++) {
                                if (selectedItems[i].attributeOptions.size[j].dispVal === newRecord.attributeOptions.size[j].dispVal && (selectedItems[i].attributeOptions.size[j].selected === " selected" && newRecord.attributeOptions.size[j].selected === " selected")) {
                                    var qty = selectedItems[i].qty + 1;
                                    if (parseInt(record.data.quantity) < qty) {
                                        flag = false;
                                        toastMsg.update('Out of Stock');
                                        toastMsg.show();
                                        return;
                                    }
                                    selectedItems[i].qty = qty;
                                    selectedItems[i].points = parseFloat(record.data.points) * qty;
                                    flag = false;
                                }
                            }
                        } else {
                            flag = false;
                        }
                    }
                    if (!exist) {
                        selectedItems.push(newRecord);
                    }
                }
                if (flag) {
                    selectedItems.push(newRecord);
                }
                viewModel.set('selectedItems', selectedItems);
                viewModel.set('itemsCount', selectedItems.length);
                viewModel.set('badgeText', '<div class="btn-badge">' + selectedItems.length + '</div>');
                toastMsg.update('Added to your cart');
                toastMsg.show();
                var CheckoutButton = this.getView().down('#Checkout_button');
                if (CheckoutButton) {
                    CheckoutButton.setDisabled(false);
                }
            } else {
                toastMsg.update('Ponts is less');
                toastMsg.show();
            }
            if (!Ext.isEmpty(this.size)) {
                var childNodes = this.size.item.childNodes;
                Ext.Array.each(childNodes, function(childNode, index, allitems) {
                    if (Ext.Array.contains(childNode.classList, 'selected')) {
                        childNode.className = "size";
                        return false;
                    }
                });
                this.size = null;
            }
            if (!Ext.isEmpty(this.color)) {
                var childNodes = this.color.item.childNodes;
                Ext.Array.each(childNodes, function(childNode, index, allitems) {
                    if (Ext.Array.contains(childNode.classList, 'selected')) {
                        childNode.className = "color";
                        return false;
                    }
                });
                this.color = null;
            }
        } else {
            toastMsg.update('Please select the size and color');
            toastMsg.show();
        }
    },
    /**
     * this method is called to build size array for check out window
     * @size :  {Array} this Array.
     */
    buildSize: function(size) {
        var sizeArr = [];
        size.forEach(function(item, index) {
            sizeArr.push({
                dispVal: item
            });
        });
        //available: item.available
        return sizeArr;
    },
    /**
     * this method is called to build color array for check out window
     * @size :  {Array} this Array.
     */
    buildColor: function(color) {
        var colorArr = [];
        color.forEach(function(item, index) {
            colorArr.push({
                val: item
            });
        });
        //available: item.available
        return colorArr;
    },
    /**
     * @event click fire when checkout button is clicked 
     * @btn :  { Ext.button.Button} this Button
     */
    onClickCheckOut: function(btn) {
        var viewModel = this.getViewModel(),
            redeemedPoints = 0,
            selectedItems = viewModel.get('selectedItems'),
            store = Ext.create('Ext.data.Store', {
                data: selectedItems
            }),
            points = parseInt(this.getViewModel().get('rewardPoints'));
        selectedItems.forEach(function(item) {
            redeemedPoints += parseFloat(item.points);
        });
        Ext.create('Redeem.product.CheckoutWindow', {
            currentVal: redeemedPoints,
            balanceVal: (points - parseFloat(redeemedPoints)),
            store: store
        });
    },
    /**
     * Allows additional behavior after rendering is complete. At this stage, the 
     * {@link Ext.Component Component's} {@link Ext.Component#getEl Element} will have 
     * been styled according to the configuration, will have had any configured CSS 
     * class names added, and will be in the configured visibility and configured enable 
     * state.
     * 
     * **Note:** If the Component has a {@link Ext.Component#controller ViewController} 
     * and the controller has an {@link Ext.app.ViewController#afterRender afterRender} 
     * method it will be called passing the Component as the single param.
     *
     * @template
     * @protected
     */
    onCategoryGridRender: function(grid, eOPts) {
        var viewModel, categoryStore;
        viewModel = this.getViewModel();
        categoryStore = viewModel.getStore('categorystore');
        categoryStore.load({
            scope: this,
            callback: function(records, options, success) {
                categoryStore.getAt(0).set('selected', true);
            }
        });
    }
});

Ext.define('Redeem.view.RedeemViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.redeemview',
    data: {
        badgeText: null,
        currentVal: null,
        itemsCount: null,
        balanceVal: null,
        selectedItems: [],
        selectedSize: null,
        selectedColor: null
    },
    stores: {
        categorystore: {
            proxy: {
                type: 'ajax',
                url: '/productcategories',
                reader: {
                    type: 'json',
                    rootProperty: 'category'
                }
            }
        },
        productstore: {
            proxy: {
                type: 'ajax',
                url: '/products',
                method: 'POST',
                extraParams: {
                    productCategoryId: 0
                },
                reader: {
                    type: 'json',
                    rootProperty: 'products'
                }
            },
            autoLoad: true
        }
    }
});

Ext.define('Redeem.view.RedeemView', {
    extend: 'Ext.window.Window',
    alias: 'widget.redeem-view',
    requires: [
        'Redeem.category.CategoryView',
        'Redeem.product.ProductView',
        'Redeem.product.CheckoutWindow',
        'Redeem.view.RedeemViewController',
        'Redeem.view.RedeemViewModel'
    ],
    controller: 'redeemview',
    viewModel: {
        type: 'redeemview'
    },
    width: '90%',
    height: 580,
    modal: true,
    draggable: false,
    resizable: false,
    cls: 'redeem-view',
    items: [
        {
            xtype: 'container',
            width: '100%',
            height: '100%',
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'categoryview',
                    flex: 0.17
                },
                {
                    xtype: 'productview',
                    flex: 0.83
                }
            ]
        }
    ],
    /*
		this method is called at the time of initialization of view 
	*/
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.mon(Ext.getBody(), 'click', function(el, e) {
            me.close(me.closeAction);
        }, me, {
            delegate: '.x-mask'
        });
    }
});

