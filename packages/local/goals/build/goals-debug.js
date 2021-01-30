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
            if (me.triggerOnClick) {}
        }
    },
    //  me.onTriggerClick();
    constructor: function() {
        this.callParent(arguments);
        /* hide emptyText, on load value from server */
        this.on('change', function() {
            this.applyEmptyText();
        });
    }
});

Ext.define('Goals.overrides.form.trigger.ClearTrigger', {
    extend: 'Ext.form.trigger.Trigger',
    alias: 'trigger.cleartrigger',
    cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    /**
     * @cfg {Boolean} Hides the clear trigger when the field is empty (has no value)
     *      (default: true).
     */
    hideWhenEmpty: true,
    /**
     * @cfg {Boolean} Hides the clear trigger until the mouse hovers over the field
     *      (default: false).
     */
    hideWhenMouseOut: false,
    /**
     * @cfg {Boolean} Clears the textfield/combobox when the escape (ESC) key is pressed
     */
    clearOnEscape: false,
    destroy: function() {
        this.clearListeners();
        this.callParent();
    },
    initEvents: function() {
        this.updateTriggerVisibility();
        this.callParent();
        var cmp = this.field;
        if (this.hideWhenEmpty) {
            this.addManagedListener(cmp, 'change', this.updateTriggerVisibility, this);
        }
        if (this.hideWhenMouseOut) {
            var bodyEl = cmp.bodyEl;
            this.addManagedListener(bodyEl, 'mouseover', function() {
                this.mouseover = true;
                this.updateTriggerVisibility();
            }, this);
            this.addManagedListener(bodyEl, 'mouseout', function() {
                this.mouseover = false;
                this.updateTriggerVisibility();
            }, this);
        }
        if (this.clearOnEscape) {
            this.addManagedListener(cmp.inputEl, 'keydown', function(e) {
                if (e.getKey() === Ext.event.Event.ESC) {
                    if (cmp.isExpanded) {
                        return;
                    }
                    this.handler(cmp);
                    e.stopEvent();
                }
            }, this);
        }
    },
    updateTriggerVisibility: function() {
        if (this.isTriggerVisible()) {
            if (!this.isVisible()) {
                this.show();
            }
        } else {
            if (this.isVisible()) {
                this.hide();
            }
        }
    },
    handler: function(cmp) {
        if (Ext.isFunction(cmp.clearValue)) {
            cmp.clearValue();
        } else {
            cmp.setValue('');
        }
    },
    isTriggerVisible: function() {
        if (!this.field || !this.rendered || this.isDestroyed) {
            return false;
        }
        if (this.hideWhenEmpty && Ext.isEmpty(this.field.getValue())) {
            return false;
        }
        if (this.hideWhenMouseOut && !this.mouseover) {
            return false;
        }
        return true;
    }
});

Ext.define('Goals.model.ExecutiveGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'targetDate',
        'duration',
        'taskId'
    ]
});

Ext.define('Goals.model.ExecutiveModel', {
    extend: 'Ext.data.Model',
    fields: [
        'description',
        {
            name: 'targetdate',
            convert: function(value) {
                if (value) {
                    return new Date(value);
                } else {
                    return "";
                }
            }
        },
        'taskcompleted',
        'taskid',
        'timerequired'
    ]
});

Ext.define('Goals.model.GoalsParentComboModel', {
    extend: 'Ext.data.Model',
    alias: 'model.goalparentcombo',
    fields: [
        'goalname',
        'goalid'
    ]
});

Ext.define('Goals.model.GoalsStatusComboModel', {
    extend: 'Ext.data.Model',
    alias: 'model.goalstatuscombo',
    fields: [
        'statusname',
        'statusid'
    ]
});

Ext.define('Goals.model.GoalsViewModel', {
    extend: 'Ext.data.Model',
    alias: 'model.goalviewmodel',
    fields: [
        {
            name: 'name'
        },
        {
            name: 'title'
        },
        {
            name: 'targetdate'
        },
        {
            name: 'goalstatus'
        },
        {
            name: 'goalType'
        },
        {
            name: 'goalAllView',
            convert: function(value, record) {
                if (value) {
                    return value;
                } else {
                    if (Utility.goalsArray.indexOf(record.data.goalid) == -1) {
                        Utility.goalsArray.push(record.data.goalid);
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    ]
});

Ext.define('Goals.model.NotesModel', {
    extend: 'Ext.data.Model',
    fields: [
        'details',
        'ddo_goalnote_id',
        'goalid',
        'notetype',
        'targetdate'
    ]
});

Ext.define('Goals.model.Rating', {
    extend: 'Ext.data.Model',
    alias: 'model.rating',
    fields: [
        'imagepath',
        'name',
        'rating'
    ]
});

Ext.define('Goals.model.ShareGroup', {
    extend: 'Ext.data.Model',
    alias: 'model.sharegroup',
    fields: [
        {
            name: 'employeeid'
        },
        {
            name: 'name'
        },
        {
            name: 'shareid'
        },
        {
            name: 'userprofilepic'
        }
    ]
});

Ext.define('Goals.store.ExecutiveGridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.executivegridstore',
    //storeId: 'helpmenustore',
    requires: [
        'Goals.model.ExecutiveGridModel'
    ],
    model: 'Goals.model.ExecutiveGridModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        /*    api: {
            read:   Api.URL.goaltask.READ,
            create: Api.URL.goaltask.CREATE,
            update: Api.URL.goaltask.UPDATE,
            delete: Api.URL.goaltask.DELETE
        },*/
        url: '/resources/data/griddata.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
/*,

        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        }*/

Ext.define('Goals.store.ExecutiveStore', {
    extend: 'Ext.data.Store',
    alias: 'store.executivestore',
    //storeId: 'helpmenustore',
    requires: [
        'Goals.model.ExecutiveModel'
    ],
    model: 'Goals.model.ExecutiveModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/goal/detail',
        reader: {
            type: 'json',
            rootProperty: 'data.executionPlanData'
        },
        actionMethods: {
            read: 'GET'
        }
    }
});

Ext.define('Goals.store.GoalsNotesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.goalsnotesstore',
    //storeId: 'helpmenustore',
    requires: [
        'Goals.model.NotesModel'
    ],
    model: 'Goals.model.NotesModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/goalnote',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('Goals.store.RatingStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ratingstore',
    requires: [
        'Goals.model.Rating'
    ],
    autoLoad: true,
    model: 'Goals.model.Rating',
    proxy: {
        type: 'ajax',
        url: '/resources/data/goalrating.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('Goals.store.ShareGroups', {
    extend: 'Ext.data.Store',
    alias: 'store.sharegroups',
    requires: [
        'Goals.model.ShareGroup'
    ],
    //storeId: 'ShareGroups',
    autoLoad: false,
    model: 'Goals.model.ShareGroup',
    proxy: {
        type: 'ajax',
        url: '/sharegoal',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('Goals.store.goals.GoalsParentComboStore', {
    extend: 'Ext.data.Store',
    alias: 'store.goalsparentcombo',
    requires: [
        'Goals.model.GoalsParentComboModel'
    ],
    model: 'Goals.model.GoalsParentComboModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/sharegoal',
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET'
        }
    }
});

Ext.define('Goals.store.goals.GoalsStatusComboStore', {
    extend: 'Ext.data.Store',
    alias: 'store.goalsstatuscombo',
    requires: [
        'Goals.model.GoalsStatusComboModel'
    ],
    model: 'Goals.model.GoalsStatusComboModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/goalstatus',
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET'
        }
    }
});

Ext.define('Goals.store.goals.GoalsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.goalsstore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/resources/data/goals/goalsstore.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});

Ext.define('Goals.store.goals.GoalsViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.goalsviewstore',
    requires: [
        'Goals.model.GoalsViewModel'
    ],
    model: 'Goals.model.GoalsViewModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/goal/allgoals',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    listeners: {
        load: function() {
            Utility.goalsArray = [];
        }
    }
});

Ext.define('Goals.store.goals.ProjectStore', {
    extend: 'Ext.data.Store',
    alias: 'store.projectstore',
    requires: [],
    //'DDO.model.goals.GoalsViewModel'
    //model: 'DDO.model.goals.GoalsViewModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '/resources/data/goals/projectstore.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});

Ext.define('Goals.view.ExecutivePlanForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.executiveplanform',
    layout: {
        type: 'fit'
    },
    maxHeight: 250,
    requires: [
        'Goals.store.ExecutiveStore'
    ],
    items: [
        {
            xtype: 'grid',
            bind: {
                disabled: '{GridDisable}'
            },
            disabledCls: 'goal-gridcls',
            maxHeight: 239,
            columnLines: true,
            viewConfig: {
                stripeRows: false
            },
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1,
                autoCancel: false,
                listeners: {
                    edit: function(editor, context, eOpts) {
                        var view = Ext.widget('executiveplanview'),
                            viewModel = view.getViewModel(),
                            dateValue = viewModel.get('goaldate') || Ext.ComponentQuery.query('#targetdateid')[0];
                        /**Added this block to identify if the value in datefield is null, 
                     as the data is being picked up from global variable everytime the current date row is null**/
                        if ((dateValue && dateValue.rawValue != "") || null) {
                            context.record.set('date', Utility.goaldate);
                        }
                    }
                }
            },
            bbar: [
                {
                    xtype: 'button',
                    text: 'Add New Task',
                    cls: 'goalsaddbtn-cls',
                    bind: {
                        hidden: '{addTaskDisable}'
                    },
                    iconCls: 'x-fa fa-plus',
                    handler: 'onAddTaskClick'
                }
            ],
            cls: 'goalsgrid-cls',
            store: 'Goals.store.ExecutiveStore',
            columns: [
                {
                    xtype: 'checkcolumn',
                    menuDisabled: true,
                    sortable: false,
                    dataIndex: 'taskcompleted',
                    bind: {
                        hidden: '{!istodoDelete}'
                    },
                    listeners: {
                        checkchange: 'oncheckchange'
                    },
                    flex: 0.2
                },
                {
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    bind: {
                        hidden: '{istodoDelete}'
                    },
                    flex: 0.1,
                    items: [
                        {
                            icon: '../resources/images/goals/delete.png',
                            margin: 10,
                            tooltip: 'Delete',
                            cls: 'goaldelete-cls',
                            handler: function(grid, rowIndex, colIndex) {
                                var store = Ext.getStore('Goals.store.ExecutiveStore'),
                                    execview = Ext.ComponentQuery.query('executiveplanview')[0],
                                    execPlanViewModel = execview.getViewModel(),
                                    record = store.getAt(rowIndex),
                                    params;
                                params = {
                                    taskIds: record.data.taskid
                                };
                                if (record && record.data.taskid) {
                                    Ext.Ajax.request({
                                        url: Api.URL.goaltask.DELETE,
                                        method: 'DELETE',
                                        params: params,
                                        success: function(resp, b) {
                                            store.removeAt(rowIndex);
                                            store.load({
                                                params: {
                                                    goalId: execPlanViewModel.get('ddo_employeegoal_id')
                                                }
                                            });
                                            var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                                                execPlanView = execPlan.lookupReference('executiveplanviewref'),
                                                approvalBtnRef = execPlanView.lookupReference('execapprovalref'),
                                                execPlanForm = execPlanView.lookupReference('executiveplanformRef'),
                                                grid = execPlanForm.down('grid'),
                                                str = grid.getStore();
                                            if (str.getCount() <= 0) {
                                                approvalBtnRef.setDisabled(true);
                                            }
                                            Ext.getBody().unmask();
                                        },
                                        failure: function(resp, b) {
                                            Ext.getBody().unmask();
                                        }
                                    });
                                } else {
                                    store.remove(record);
                                }
                            },
                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                // hide this action if row data flag indicates it is not deletable
                                if (r.data.deletable == false) {
                                    return "hideDisplay";
                                } else if (r.data.deletable) {
                                    return "showDisplay";
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Task',
                    emptyText: 'Task Name',
                    editor: {
                        xtype: 'textarea',
                        allowBlank: false,
                        height: 50,
                        width: 470
                    },
                    dataIndex: 'description',
                    flex: 1,
                    renderer: function(val) {
                        if (val === null || val === undefined || val == "") {
                            return '<div style="color:lightgrey;text-align:left;margin-top:10px;">Create Task</div>';
                            return val;
                        } else {
                            return '<div style="text-align:left;">' + val + '</div>';
                        }
                    }
                },
                {
                    xtype: 'widgetcolumn',
                    text: 'Target Date',
                    dataIndex: 'targetdate',
                    flex: 0.6,
                    widget: {
                        xtype: 'datefield',
                        allowBlank: false,
                        cls: 'goalsdate-cls',
                        itemId: 'goaldtfieldref',
                        readOnly: true,
                        //fieldStyle: 'font-family: FontAwesome',
                        emptyText: 'Date',
                        format: 'd-m-Y',
                        fieldCls: 'goaldateicon-cls'
                    },
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        editable: false,
                        emptyText: 'Date',
                        itemId: 'targetdateid',
                        minValue: new Date(),
                        format: 'd-m-Y',
                        bind: {
                            maxValue: '{targetDate}'
                        },
                        listeners: {
                            select: function(field) {
                                var view = Ext.ComponentQuery.query('executiveplanview')[0],
                                    viewModel = view.getViewModel();
                                Utility.goaldate = field.rawValue;
                            }
                        },
                        createPicker: function() {
                            var me = this,
                                format = Ext.String.format;
                            return Ext.create('Ext.picker.Date', {
                                pickerField: me,
                                ownerCt: me.ownerCt,
                                renderTo: document.body,
                                floating: true,
                                hidden: true,
                                focusOnShow: true,
                                cls: 'ddo-create-datepicker',
                                minDate: me.minValue,
                                maxDate: me.maxValue,
                                disabledDatesRE: me.disabledDatesRE,
                                disabledDatesText: me.disabledDatesText,
                                disabledDays: me.disabledDays,
                                disabledDaysText: me.disabledDaysText,
                                format: me.format,
                                showToday: me.showToday,
                                startDay: me.startDay,
                                minText: format(me.minText, me.formatDate(me.minValue)),
                                maxText: format(me.maxText, me.formatDate(me.maxValue)),
                                listeners: {
                                    scope: me,
                                    select: me.onSelect
                                },
                                keyNavConfig: {
                                    esc: function() {
                                        me.collapse();
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'widgetcolumn',
                    text: 'Duration',
                    dataIndex: 'timerequired',
                    flex: 0.4,
                    widget: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        cls: 'goalsdate-cls',
                        fieldCls: 'goalhoursicon-cls',
                        emptyText: 'Hrs',
                        readOnly: true
                    },
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        emptyText: 'Hrs',
                        fieldCls: 'goalhoursicon-cls',
                        hideTrigger: true
                    }
                }
            ],
            width: 400
        }
    ]
});

Ext.define('Goals.view.ExecutivePlanHeader', {
    extend: 'Ext.form.Panel',
    alias: 'widget.executiveplanheader',
    requires: [
        'Ext.form.trigger.Trigger',
        'Goals.overrides.form.trigger.ClearTrigger'
    ],
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    defaults: {
        margin: 10
    },
    items: [
        {
            layout: 'vbox',
            defaults: {
                width: 650,
                labelSeparator: ''
            },
            items: [
                {
                    xtype: 'textfield',
                    cls: 'header-fields-design',
                    fieldLabel: 'Goal Name',
                    name: 'goalname',
                    emptyText: 'Goal Name'
                },
                //            bind: {
                //                readOnly: '{goalFieldReadyOnly}'
                //            }
                {
                    xtype: 'combo',
                    reference: 'parentgoalref',
                    fieldLabel: 'Parent Goal',
                    emptyText: 'Parent Goal',
                    cls: 'header-combo-fields-design',
                    store: 'Goals.store.goals.GoalsParentComboStore',
                    valueField: 'goalid',
                    displayField: 'goalname',
                    triggerAction: 'all',
                    editable: false,
                    triggers: {
                        clear: {
                            cls: 'ddo-trigger-clear x-form-clear-trigger',
                            type: 'cleartrigger',
                            weight: -1,
                            hideWhenEmpty: true
                        }
                    },
                    bind: {
                        readOnly: '{goalFieldReadyOnly}'
                    },
                    listeners: {
                        change: function(combo, newVal, oldValue, opts) {
                            if (newVal) {
                                combo.setValue(newVal);
                            }
                        }
                    }
                }
            ]
        },
        {
            layout: 'vbox',
            defaults: {
                labelSeparator: '',
                cls: 'header-fields'
            },
            items: [
                {
                    layout: 'hbox',
                    items: [
                        {
                            html: 'Progress',
                            width: 100
                        },
                        {
                            xtype: 'panel',
                            width: 130,
                            margin: '0 2 8 0',
                            items: [
                                {
                                    xtype: 'progressbar',
                                    ui: 'goalprogressbar',
                                    value: 0
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            margin: '0 0 0 10',
                            cls: 'progress-header',
                            html: '0%',
                            listeners: {
                                render: 'setProgressBarValue'
                            }
                        }
                    ]
                },
                {
                    xtype: 'datefield',
                    name: 'targetDate',
                    width: 260,
                    minValue: new Date(),
                    fieldLabel: 'Target Date',
                    format: 'd-m-Y',
                    formatText: null,
                    editable: false,
                    bind: {
                        readOnly: '{goalFieldReadyOnly}'
                    },
                    listeners: {
                        change: function(field) {
                            var dateValue, value, executivePlanView;
                            dateValue = field.rawValue;
                            executivePlanView = Ext.ComponentQuery.query('executiveplanview')[0];
                            if (executivePlanView && dateValue) {
                                executivePlanView.getViewModel().set('targetDate', field.getValue());
                            }
                        }
                    },
                    createPicker: function() {
                        var me = this,
                            format = Ext.String.format;
                        return Ext.create('Ext.picker.Date', {
                            pickerField: me,
                            ownerCt: me.ownerCt,
                            renderTo: document.body,
                            floating: true,
                            hidden: true,
                            focusOnShow: true,
                            cls: 'ddo-create-datepicker',
                            minDate: me.minValue,
                            maxDate: me.maxValue,
                            disabledDatesRE: me.disabledDatesRE,
                            disabledDatesText: me.disabledDatesText,
                            disabledDays: me.disabledDays,
                            disabledDaysText: me.disabledDaysText,
                            format: me.format,
                            showToday: me.showToday,
                            startDay: me.startDay,
                            minText: format(me.minText, me.formatDate(me.minValue)),
                            maxText: format(me.maxText, me.formatDate(me.maxValue)),
                            listeners: {
                                scope: me,
                                select: me.onSelect
                            },
                            keyNavConfig: {
                                esc: function() {
                                    me.collapse();
                                }
                            }
                        });
                    }
                }
            ]
        }
    ]
});

Ext.define('Goals.view.goals.GoalsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.goalscontroller',
    onGoalClick: function(view, record, item, idx, evt, opts) {
        var me = this,
            targetDom = evt.getTarget(),
            targetEl = Ext.get(targetDom),
            menu;
        if (targetEl.hasCls("create-goal-cls") || targetEl.getParent().hasCls("create-goal-plus-icon") || targetEl.hasCls("create-goal-text")) {
            this.onGoalWindowView(view, record, item, idx, evt, opts);
        } else if (targetEl.hasCls("goal-status-cls") || targetEl.getParent().hasCls("goals-dashboard-cls") || targetEl.hasCls("goals-dashboard-cls") || targetEl.getParent().hasCls("goals-header-cls") || targetEl.getParent().hasCls("goals-title-cls") || targetEl.getParent().hasCls("goals-karmascore-cls") || targetEl.getParent().hasCls("goals-user-name") || targetEl.getParent().hasCls("goals-target-date-cls") || targetEl.hasCls("goals-status-icon") || targetEl.hasCls("goal-status-text")) {
            this.onGoalViewLoad(view, record, item, idx, evt, opts);
        }
    },
    onGoalWindowView: function(view, record, item, idx, evt, opts) {
        var goalsmainview = Ext.ComponentQuery.query('goalsmainview')[0],
            goalcard = goalsmainview.up().getLayout(),
            execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlanViewTabPanel = execPlanView.down('tabpanel');
        this.onClearingGoalsWindow();
        execPlanViewTabPanel.setActiveTab(0);
        goalcard.setActiveItem(0);
    },
    onGoalViewLoad: function(view, record, item, idx, evt, opts) {
        this.onClearingGoalsWindow();
        var goalsmainview = Ext.ComponentQuery.query('goalsmainview')[0],
            goalcard = goalsmainview.up().getLayout();
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            shareGoalView = Ext.ComponentQuery.query('sharegoalsform')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
            execPlanView = execPlan.lookupReference('executiveplanviewref'),
            cmmntRef = execPlanView.down('textarea[reference = commentsratingref]'),
            execPlanViewTabPanel = execPlanView.down('tabpanel'),
            execPlanViewModel = execPlanView.getViewModel(),
            //loginEmployee id
            loginData = Ext.getStore('login').getData(),
            login_emp_id = loginData.items[0].data.ddo_employee_id,
            goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
            parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
            measuremntCriteriaRef = execPlanView.down('container[name=measurementCriteria]'),
            measurementCriteriaCmntRef = execPlanView.down('textarea[reference=commentsref]'),
            targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
            managerView = record.data.isManager;
        execPlanViewModel.set('tab2', false);
        execPlanViewModel.set('ddo_employeegoal_id', record.data.goalid);
        execPlanViewModel.set('ddo_employeegoal_userid', record.data.goalUser.employeeId);
        execPlanViewModel.set('empkarmaPoints', record.data.karmapoints);
        execPlanViewModel.set('selectedKarmapoints', record.data.karmapoints);
        if (managerView) {
            if (record.data.goalUser.employeeId == login_emp_id) {
                execPlanViewModel.set('BtnText', 'Save');
                execPlanViewModel.set('approveText', 'Request Approval');
            } else {
                execPlanViewModel.set('BtnText', 'Move To Drafts');
                execPlanViewModel.set('approveText', 'Approve');
            }
        }
        //making comments null in rating
        cmmntRef.setValue(null);
        Ext.Ajax.request({
            url: '/goal/detail',
            method: 'GET',
            params: {
                goalId: record.data.goalid
            },
            success: function(resp, b) {
                console.log('resp', resp);
                var response = Ext.decode(resp.responseText),
                    notes = Ext.ComponentQuery.query('notes')[0],
                    notesGrid = notes.down('grid'),
                    notesData = response.data.notes,
                    notesGridStre = notesGrid.getStore(),
                    executiveplanformRef = execPlanView.lookupReference('executiveplanformRef'),
                    addnewtaskref = executiveplanformRef.down('button[text=Add New Task]'),
                    execGrid = executiveplanformRef.down('grid'),
                    executivegridstre = execGrid.getStore(),
                    executivePlanGridData = response.data.executionPlanData,
                    targetDt;
                var managerratingform = execPlanViewTabPanel.down('managerratingform'),
                    goalKarmaPointsfield = managerratingform.down('numberfield[reference=goalKarmaPoints]'),
                    valueSuberb = managerratingform.down('numberfield[reference=valuesuperb]'),
                    valueGood = managerratingform.down('numberfield[reference=valuegood]');
                goalKarmaPointsfield.setValue(null);
                valueSuberb.setValue(null);
                valueGood.setValue(null);
                var ratingRef = execPlanViewTabPanel.down('container[reference=ratingref]'),
                    DneBtnRef = ratingRef.down('button[reference=dnebtnref]'),
                    ratingcard = ratingRef.down().getLayout();
                ratingcard.setActiveItem(0);
                var clsName = response.data.goalstatusname.replace(/ /, '-').toLowerCase().trim().concat('-icon-cls');
                execPlan.getViewModel().set('goalStatus', response.data.goalstatusname);
                execPlan.getViewModel().set('goalStatusIconCls', clsName);
                goalnameRef.setValue(response.data.goaltitle);
                targetDt = response.data.targetdate;
                var parentComboStore = parentComboRef.getStore(),
                    parentComboRecord = parentComboStore.findRecord('goalid', response.data.parentgoalid);
                if (record.data.goalUser.employeeId == login_emp_id) {
                    if (parentComboRecord) {
                        parentComboRef.setValue(response.data.parentgoalid);
                    }
                } else {
                    parentComboRef.setValue(response.data.parentgoalname);
                }
                targetDtRef.setValue(Ext.Date.format(new Date(targetDt), 'Y-m-d'));
                measuremntCriteriaRef.setValue(response.data.measurementcriteria);
                var taskcompletedcount = 0,
                    totoltaskhourscount = 0,
                    taskcompletedpercent = 0;
                for (var i = 0; i < executivePlanGridData.length; i++) {
                    var obj = {
                            taskid: executivePlanGridData[i].taskid,
                            description: executivePlanGridData[i].description,
                            targetdate: executivePlanGridData[i].targetdate,
                            timerequired: executivePlanGridData[i].timerequired,
                            taskcompleted: executivePlanGridData[i].taskcompleted
                        };
                    executivegridstre.add(obj);
                    if (executivePlanGridData[i].taskcompleted) {
                        taskcompletedcount = taskcompletedcount + executivePlanGridData[i].timerequired;
                    }
                    totoltaskhourscount = totoltaskhourscount + executivePlanGridData[i].timerequired;
                }
                //progressbar start
                var len = executivePlanGridData.length;
                if (len > 0) {
                    var taskcompletedpercent = (taskcompletedcount / totoltaskhourscount);
                }
                var progressBar = execPlanHeader.down('progressbar');
                var progressPercentage = execPlanHeader.down('label');
                progressBar.setValue(taskcompletedpercent);
                progressPercentage.setHtml(Math.round((taskcompletedpercent * 100), 2) + '%');
                if (taskcompletedpercent == 1) {
                    execPlanViewModel.set('isdoneBtnEnable', false);
                } else {
                    execPlanViewModel.set('isdoneBtnEnable', true);
                }
                for (var i = 0; i < notesData.length; i++) {
                    var notesobj = {
                            details: notesData[i].details,
                            ddo_goalnote_id: notesData[i].noteid,
                            notetype: notesData[i].type,
                            targetdate: new Date(notesData[i].notetargetdate)
                        };
                    notesGridStre.add(notesobj);
                }
                var taggedList = [],
                    tags = shareGoalView.down('tagfield');
                response.data.shareData.forEach(function(rec) {
                    var tagListData = rec.employeeid;
                    taggedList.push(tagListData);
                    Utility.goalsharetaggedList.push(tagListData);
                });
                var tagfieldStore = tags.getStore();
                tagfieldStore.clearFilter(true);
                tagfieldStore.load({
                    scope: this,
                    callback: function() {
                        tags.setValue(taggedList);
                        tagfieldStore.filterBy(function(rec) {
                            if (taggedList.indexOf(rec.data.employeeid) == -1) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                    }
                });
                if (response.data.goalstatusname == "Pending") {
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true);
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', false);
                    execPlanViewModel.set('dneBtn', true);
                    notesGrid.setDisabled(true);
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });
                    if (record.data.goalUser.employeeId != login_emp_id) {
                        execPlanViewModel.set('tab4', false);
                        execPlanViewModel.set('MngrVisibilityMode', true);
                        execPlanViewModel.set('EmpVisibilityMode', true);
                        execPlanViewModel.set('visibilityMode', false);
                        execPlanViewModel.set('BtnvisibilityMode', false);
                        execPlanViewModel.set('ratingIconsEnable', true);
                        execPlanViewModel.set('readOnlyKarmafield', false);
                        execPlanViewModel.set('amziconDisabled', false);
                        measurementCriteriaCmntRef.setValue('');
                        cmmntRef.setValue('');
                    }
                } else if (response.data.goalstatusname == "Re-Open") {
                    execPlanViewModel.set('apprvedisabled', false);
                } else if (response.data.goalstatusname == "In Progress") {
                    execPlanViewModel.set('tab3', false);
                    execPlanViewModel.set('tab4', false);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('GridDisable', false);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    execPlanViewModel.set('addTaskDisable', true);
                    execPlanViewModel.set('doneText', "Complete");
                    //rating
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', false);
                    execPlanViewModel.set('istodoDelete', true);
                    cmmntRef.setEmptyText("Self Comments");
                    execPlanViewModel.set('EmpVisibilityMode', false);
                    execPlanViewModel.set('MngrVisibilityMode', true);
                    goalKarmaPointsfield.setValue(response.data.goalkarmapoints);
                    if (!Ext.isEmpty(response.data.goalkarmapoints)) {
                        var valueAmazing = response.data.goalkarmapoints;
                        valueSuberb.setValue(valueAmazing * 2 / 3);
                        valueGood.setValue(valueAmazing * 1 / 3);
                    }
                    if ((record.data.goalUser.employeeId != login_emp_id)) {
                        execPlanViewModel.set('dneBtn', true);
                        execPlanViewModel.set('GridDisable', true);
                        execPlanViewModel.set('tab4', false);
                        execPlanViewModel.set('tab3', true);
                        execPlanViewModel.set('EmpVisibilityMode', true);
                        execPlanViewModel.set('visibilityMode', true);
                        execPlanViewModel.set('BtnvisibilityMode', true);
                        notesGrid.setDisabled(true);
                    } else if (execPlanViewModel.get('isManager')) {
                        //rating
                        execPlanViewModel.set('isUpdateNeed', true);
                        execPlanViewModel.set('dneBtn', false);
                        execPlanViewModel.set('EmpVisibilityMode', false);
                        execPlanViewModel.set('MngrVisibilityMode', false);
                        execPlanViewModel.set('doneText', "Done");
                    }
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });
                } else if (response.data.goalstatusname == "Completed") {
                    execPlanViewModel.set('tab3', false);
                    execPlanViewModel.set('tab4', false);
                    var managerratingform = execPlanViewTabPanel.down('managerratingform'),
                        goalKarmaPointsfield = managerratingform.down('numberfield[reference=goalKarmaPoints]');
                    goalKarmaPointsfield.setValue(response.data.goalkarmapoints);
                    if (!Ext.isEmpty(response.data.goalkarmapoints)) {
                        var valueSuberb = managerratingform.down('numberfield[reference=valuesuperb]');
                        var valueGood = managerratingform.down('numberfield[reference=valuegood]');
                        var valueAmazing = response.data.goalkarmapoints;
                        valueSuberb.setValue(valueAmazing * 2 / 3);
                        valueGood.setValue(valueAmazing * 1 / 3);
                    }
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true);
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', true);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    execPlanViewModel.set('EmpVisibilityMode', true);
                    //manager completed view.
                    if (record.data.goalUser.employeeId != login_emp_id) {
                        execPlanViewModel.set('tab3', true);
                        execPlan.getViewModel().set('goalFieldReadyOnly', true);
                        execPlanViewModel.set('editorOrGridDisable', true);
                        execPlanViewModel.set('GridDisable', true);
                        execPlanViewModel.set('isUpdateNeed', true);
                        execPlanViewModel.set('dneBtn', true);
                        execPlanViewModel.set('MngrVisibilityMode', false);
                        execPlanViewModel.set('EmpVisibilityMode', false);
                        execPlanViewModel.set('BtnvisibilityMode', true);
                        execPlanViewModel.set('isUpdateNeed', true);
                        execPlanViewModel.set('dneBtn', false);
                        execPlanViewModel.set('ratingIconsEnable', true);
                        execPlanViewModel.set('doneText', "Done");
                        cmmntRef.setValue('');
                    }
                } else if (response.data.goalstatusname == "Achieved") {
                    var ratingArr = response.data.rating;
                    execPlanViewModel.set('tab1', false);
                    execPlanViewModel.set('tab2', false);
                    execPlanViewModel.set('tab3', false);
                    execPlanViewModel.set('tab4', false);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true);
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', true);
                    execPlanViewModel.set('MngrVisibilityMode', true);
                    execPlanViewModel.set('EmpVisibilityMode', true);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    if (ratingArr.length > 0) {
                        execPlanViewModel.set('achievedKarmaPoints', ratingArr[0].earnedpoints);
                        execPlanViewModel.set('achievedratingText', ratingArr[0].ratingtext);
                        ratingRef.down('dataview[reference =selfcommentsref]').setData(ratingArr);
                    }
                    var ratingdataview = ratingRef.down('ratingdetails').down('dataview');
                    ratingcard.setActiveItem(1);
                    if (execPlanViewModel.get('isManager')) {
                        execPlanViewModel.set('tab4', true);
                    }
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', false);
                    });
                    if (record.data.goalUser.employeeId != login_emp_id) {
                        execPlanViewModel.set('tab3', true);
                    }
                } else if (response.data.goalstatusname == "Cancel") {
                    var ratingArr = response.data.rating;
                    execPlanViewModel.set('tab1', false);
                    execPlanViewModel.set('tab2', false);
                    execPlanViewModel.set('tab3', true);
                    execPlanViewModel.set('tab4', false);
                    execPlanViewModel.set('shareReadOnly', true);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', true);
                    execPlanViewModel.set('addTaskDisable', true);
                    execPlanViewModel.set('GridDisable', true);
                    execPlanViewModel.set('isUpdateNeed', true);
                    execPlanViewModel.set('dneBtn', true);
                    execPlanViewModel.set('MngrVisibilityMode', true);
                    execPlanViewModel.set('EmpVisibilityMode', true);
                    execPlanViewModel.set('BtnvisibilityMode', true);
                    if (ratingArr.length > 0) {
                        execPlanViewModel.set('achievedKarmaPoints', ratingArr[0].earnedpoints);
                        execPlanViewModel.set('achievedratingText', ratingArr[0].ratingtext);
                        ratingRef.down('dataview[reference =selfcommentsref]').setData(ratingArr);
                    }
                }
                /* var ratingdataview = ratingRef.down('ratingdetails').down('dataview');
                    ratingcard.setActiveItem(0);
                    */
                else if (response.data.goalstatusname == "Draft") {
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', false);
                    execPlanViewModel.set('GridDisable', false);
                    notesGrid.setDisabled(false);
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', true);
                    });
                    execPlanViewModel.set('isUpdateNeed', false);
                    execPlanViewModel.set('istodoDelete', false);
                    execPlanViewModel.set('addTaskDisable', false);
                    execPlanViewModel.set('BtnText', 'Save');
                    if (execPlanViewModel.get('isManager')) {
                        execPlanViewModel.set('approveText', 'Start');
                        execPlanViewModel.set('addTaskDisable', false);
                    }
                } else {
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanViewModel.set('editorOrGridDisable', false);
                    execPlanViewModel.set('addTaskDisable', false);
                    execPlanViewModel.set('GridDisable', false);
                    notesGrid.setDisabled(false);
                    executivegridstre.each(function(rec) {
                        rec.set('deletable', true);
                    });
                    execPlanViewModel.set('isUpdateNeed', false);
                    execPlanViewModel.set('istodoDelete', false);
                    execPlanViewModel.set('BtnText', 'Save');
                }
                execPlanViewTabPanel.setActiveTab(0);
                goalcard.setActiveItem(0);
            },
            failure: function(resp, b) {}
        });
    },
    onClearingGoalsWindow: function() {
        var goalsmainview = Ext.ComponentQuery.query('goalsmainview')[0],
            goalcard = goalsmainview.up().getLayout(),
            loginStoreData = Ext.getStore('login').getData(),
            loginData = loginStoreData.items[0].data,
            execapprveBtn;
        // var goalsettingstore = Ext.getStore('settings.GoalSettings'),
        isManager = false;
        loginData.reportingto = (loginData.reportingto == 0) ? null : loginData.reportingto;
        if (Ext.isEmpty(loginData.reportingto)) {
            isManager = true;
        } else {
            isManager = false;
        }
        /*
        if (goalsettingstore && goalsettingstore.getCount()>0) {
            var goalsettingsroles = goalsettingstore.getData().items[0].data.roleids;
            if (!Ext.isEmpty(goalsettingsroles)) {

                loginData.roles.forEach(function(rec) {
                    if ((goalsettingsroles.split(",").indexOf(rec.roleid.toString()) != -1)) {
                        isManager = true;
                    }

                });
            }

        }*/
        Utility.goalsharetaggedList = [];
        var header = Ext.ComponentQuery.query('executiveplanheader')[0];
        var execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanViewModel = execPlanView.getViewModel(),
            execvm = execPlan.getViewModel(),
            execPlanViewTabPanel = execPlanView.down('tabpanel');
        header.getForm().reset();
        var progressBar = header.down('progressbar');
        var progressPercentage = header.down('label');
        progressBar.setValue(0);
        progressPercentage.setHtml('0%');
        execPlanViewTabPanel.down('htmleditor[name=measurementCriteria]').reset();
        execPlanViewTabPanel.down('executiveplanform').down('grid').getStore().removeAll();
        execPlanViewTabPanel.down('executiveplanform').down('grid');
        execPlanViewTabPanel.down('sharegoalsform').down('tagfield').reset();
        execPlanViewTabPanel.down('notes').down('grid').getStore().removeAll();
        execPlanViewModel.set('tab2', true);
        execPlanViewModel.set('tab3', true);
        execPlanViewModel.set('tab4', true);
        execPlanViewModel.set('tab5', false);
        execPlanViewModel.set('editorOrGridDisable', false);
        execPlanViewModel.set('addTaskDisable', false);
        execPlanViewModel.set('GridDisable', false);
        execPlanViewModel.set('visibilityMode', true);
        execPlanViewModel.set('BtnvisibilityMode', false);
        execPlanViewModel.set('istodoDelete', false);
        execPlanViewModel.set('apprvedisabled', true);
        execPlanViewModel.set('ratingIconsEnable', false);
        execPlanViewModel.set('BtnText', 'Save');
        execPlanViewModel.set('ddo_employeegoal_id', null);
        execPlanViewModel.set('selectedKarmapoints', null);
        execPlanViewModel.set('readOnlyKarmafield', true);
        execPlanViewModel.set('amziconDisabled', true);
        execPlanViewModel.set('empkarmaPoints', null);
        execPlanViewModel.set('seletcedRatingText', null);
        execPlanViewModel.set('achievedKarmaPoints', null);
        execPlanViewModel.set('achievedratingText', "");
        execPlanViewModel.set('approveText', 'Request Approval');
        execPlanViewModel.set('isManager', false);
        execvm.set('goalFieldReadyOnly', false);
        execPlanViewModel.set('achievedkarma', null);
        if (isManager == true) {
            execPlanViewModel.set('approveText', 'Start');
            execPlanViewModel.set('isManager', true);
        }
        approvalBtn = execPlanView.down('button[reference = approveBtnRef]');
        execapprveBtn = execPlanView.down('button[reference = execapprovalref]');
        //observed for manager create goal request approval is not getting disabled after approval(IN INPROGRESS) of emp goal.
        if (!approvalBtn.isDisabled() || !execapprveBtn.isDisabled()) {
            approvalBtn.setDisabled(true);
            execapprveBtn.setDisabled(true);
        }
        execvm.set('goalStatusIconCls', "draft-icon-cls");
        execvm.set('goalStatus', "Draft");
    }
});

Ext.define('Goals.view.goals.SearchGoalViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchgoalviewcontroller',
    onSearchGoalFliter: function(btn, e, eOpts) {
        var searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0] || Ext.create('Goals.view.goals.SearchFilterWindow');
        searchfilterWin.show();
    },
    onLabelFocus: function(lbl, e, eOpts) {
        lbl.getEl().on("click", function(labeltxt, e, eOpts) {
            var searchGoalFilterRef = Ext.ComponentQuery.query('goalsheader')[0],
                comboRef = searchGoalFilterRef.down('combobox[reference = comboref]'),
                comboRecord = comboRef.getStore().findRecord('value', comboRef.getValue()),
                goalsViewStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
                loginData = Ext.getStore('login').getData(),
                logEmpId = loginData.items[0].data.ddo_employee_id,
                comboRefVal;
            if (comboRecord == null) {
                comboRefVal = Ext.ComponentQuery.query('combobox[name=goaltypecombo]')[1];
                comboRecord = comboRef.getStore().findRecord('value', comboRefVal.getValue());
            }
            
            if (goalsViewStore) {
                goalsViewStore.clearFilter(true);
                goalsViewStore.filterBy(function(rec) {
                    var goaltype = false,
                        comboData = comboRecord.data;
                    if (rec.data.goalType == comboData.key) {
                        if ((comboData.key == "Shared") && (rec.data.goalUser.employeeId == logEmpId)) {
                            goaltype = false;
                        } else {
                            goaltype = true;
                        }
                    } else if ((comboData.key == "All") && rec.data.goalAllView) {
                        goaltype = true;
                    } else if (rec.data.goalType == comboData.key == "Team") {
                        goaltype = true;
                    } else if (rec.data.goalType == "Shared") {
                        if ((comboData.key == "Personal") && (rec.data.goalUser.employeeId == logEmpId)) {
                            goaltype = true;
                        } else {
                            goaltype = false;
                        }
                    }
                    return goaltype;
                }, this);
            }
            var searchGoalFilterRef = Ext.ComponentQuery.query('goalsheader')[0],
                searchGoalFilterIcon = searchGoalFilterRef.down('button[reference=searchfiltericon]'),
                labelRef = searchGoalFilterRef.down('label[reference=clearfilterRef]');
            var searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0] || Ext.create('Goals.view.goals.SearchFilterWindow'),
                btnGrpRef = searchfilterWin.down('buttongroup[reference=btnGrpRef]'),
                datefldRef = searchfilterWin.down('datefield[reference=fromDate]'),
                form;
            searchfilterWin.getViewModel().set('filterView', false);
            if (searchGoalFilterIcon.el && searchGoalFilterIcon.el.hasCls("searchgoal-selected-icon-field")) {
                searchGoalFilterIcon.el.removeCls("searchgoal-selected-icon-field");
                searchGoalFilterIcon.el.addCls("searchgoal-icon-field");
            }
            btnGrpRef.items.items.forEach(function(rec) {
                if (rec.pressed) {
                    rec.pressed = false;
                    rec.addCls('goals-btn-cls');
                    rec.removeCls('pressedBtnCls');
                }
            });
            form = searchfilterWin.down('form');
            form.reset();
            datefldRef.setValue('');
            if (!labelRef.hasCls('x-hidden')) {
                labelRef.addCls('x-hidden');
            }
        });
    },
    oncomborender: function(combo, eOpts) {
        var combostre = combo.getStore(),
            streRecord = combostre.getAt(0);
        combo.setValue(streRecord);
    },
    onComboSelect: function(combo, e, eOpts) {
        var comboSelection = combo.selection,
            comboData = comboSelection.data,
            goalview = Ext.widget('goalsview'),
            goalViewStore = goalview.getStore(),
            filterVal = false;
        var searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0],
            loginData = Ext.getStore('login').getData(),
            logEmpId = loginData.items[0].data.ddo_employee_id;
        if (searchfilterWin) {
            filterVal = searchfilterWin.getViewModel().get('filterView');
        }
        if (filterVal) {
            var searchGoalFilterIcon = searchfilterWin.down('button[reference=filtersearchbtn]');
            searchfilterWin.getController().onGoalsFliter(searchGoalFilterIcon, null, null, true);
        } else {
            goalViewStore.clearFilter(true);
            goalViewStore.filterBy(function(rec) {
                if (rec.data.goalType == comboData.key) {
                    if ((comboData.key == "Shared") && (rec.data.goalUser.employeeId == logEmpId)) {
                        return false;
                    } else {
                        return true;
                    }
                } else if ((comboData.key == "All") && rec.data.goalAllView) {
                    return true;
                } else if (rec.data.goalType == comboData.key == "Team") {
                    return true;
                } else if (rec.data.goalType == "Shared") {
                    if ((comboData.key == "Personal") && (rec.data.goalUser.employeeId == logEmpId)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
        }
    }
});

Ext.define('Goals.view.goals.GoalsView', {
    extend: 'Ext.view.View',
    alias: 'widget.goalsview',
    requires: [
        'Goals.view.goals.GoalsController',
        'Goals.view.goals.SearchGoalViewController'
    ],
    cls: 'goals-dashboard-view-cls noscrollbar',
    scrollable: 'y',
    initComponent: function() {
        Ext.getStore('Goals.store.goals.GoalsViewStore').load();
        Ext.getStore('Goals.store.goals.GoalsParentComboStore').load();
        var goalsettingstore = Ext.getStore('settings.GoalSettings');
        if (!goalsettingstore.isLoaded()) {
            goalsettingstore.load();
        }
        this.callParent(arguments);
    },
    loadMask: false,
    controller: 'goalscontroller',
    store: 'Goals.store.goals.GoalsViewStore',
    tpl: [
        '<tpl if="this.getGoals(values)">',
        '<div class="create-goal-cls" id="{[this.setId(values)]}">',
        '<div class="create-goal-plus-icon"><span class="plus-icon"></span></div>',
        '<div class="create-goal-text">Create Goal</div>',
        '</div>',
        '<tpl else>',
        '<tpl for=".">',
        '<span class="goals-dashboard-main-cls">',
        '<tpl if="xindex === 1">',
        '<div class="create-goal-cls">',
        '<div class="create-goal-plus-icon"><span class="plus-icon"></span></div>',
        '<div class="create-goal-text">Create Goal</div>',
        '</div>',
        '</tpl>',
        '<div class="goals-dashboard-cls">',
        '<div class="goals-header-cls">',
        '<div class="goals-dash-img-cls">',
        '<img class="goals-dash-user-icon" src={[this.getUserPic(values)]}>',
        '</div>',
        '<div class="goals-user-name">',
        '<span>{goalUser.name}</span>',
        '</div>',
        '<div class="goals-target-date-cls">',
        '<span>Target Date:</span>',
        '<br/>',
        '<span>{[this.getTargetDateFormat(values)]}</span>',
        '</div>',
        '</div>',
        '<div class="goals-title-cls">',
        '<span>{title}</span>',
        '</div>',
        '<div class="goal-status-cls">',
        '<span><img class="goals-status-icon" src="{[this.getStatusIcon(values)]}" width="80px" height="80px"></span>',
        '<br />',
        '<span class="goal-status-text">{goalstatus}</span>',
        '</div>',
        '<tpl if="this.getStatusName(values)">',
        '<div class="goals-progress-cls">',
        '<meter class="goals-progress-meter-cls" value={[this.getStatusPerIcon(values)]} min=0 max=100></meter>',
        '<span class="goals-progress-meter-value">{[this.getStatusPerIcon(values)]}%</span>',
        '</div>',
        '</tpl>',
        '<div class="goals-karmascore-cls">',
        '<tpl if="this.getKarma(values)">',
        '<span class="karma-score-icon"></span>',
        '<span class="goals-kamra-score">{karmapoints}</span>',
        '</tpl>',
        '</div>',
        '</div>',
        '</div>',
        //'</tpl>',
        '</div>',
        '</span>',
        '</tpl>',
        '</tpl>',
        {
            setId: function(values) {
                var itemId;
                itemId = 'input_goals_id';
                Ext.Function.defer(this.addListener, 2, this, [
                    itemId,
                    values
                ]);
                return itemId;
            },
            addListener: function(id, values) {
                if (!Ext.isEmpty(Ext.get(id)) && !Ext.get(id).hasListener('blur')) {
                    Ext.get(id).on('click', function(e, opt) {
                        var c = Ext.ComponentQuery.query('goalsview')[0];
                        c.getController().onGoalWindowView();
                    }, this);
                }
            },
            getTargetDateFormat: function(values) {
                var dt = values.targetdate,
                    dtFormat = Ext.Date.format(new Date(dt), 'm-d-Y');
                return dtFormat;
            },
            getStatusIcon: function(values) {
                if (values.goalstatus == "In Progress") {
                    return "resources/images/goals/inprogress.png";
                } else if (values.goalstatus == "Draft") {
                    return "resources/images/goals/drafted.png";
                } else if (values.goalstatus == "Completed") {
                    return "resources/images/goals/complete.jpg";
                } else if (values.goalstatus == "Pending") {
                    return "resources/images/goals/pending.jpg";
                } else if (values.goalstatus == "Cancel") {
                    return "resources/images/goals/close_green.png";
                } else {
                    return "resources/images/goals/amazing.png";
                }
            },
            getStatusPerIcon: function(values) {
                var percentage = values.percentage;
                return percentage;
            },
            getStatusName: function(values) {
                var statusName = values.goalstatus;
                if (statusName == "In Progress") {
                    return true;
                }
            },
            getGoals: function(values) {
                return Ext.isEmpty(values);
            },
            getUserPic: function(values) {
                var pics = values.goalUser.userProfilePic;
                if (!Ext.isEmpty(pics)) {
                    return pics;
                }
            },
            getKarma: function(values) {
                var points = values.karmapoints,
                    status = values.goalstatus;
                if (points != null && status == 'Achieved') {
                    return true;
                }
            }
        }
    ],
    itemSelector: '.goals-dashboard-main-cls',
    listeners: {
        itemclick: 'onGoalClick'
    }
});

Ext.define('Goals.view.Notes', {
    extend: 'Ext.form.Panel',
    alias: 'widget.notes',
    //cls: 'executiveplanview-cls',
    layout: {
        type: 'fit'
    },
    requires: [
        'Goals.store.GoalsNotesStore'
    ],
    items: [
        {
            xtype: 'grid',
            disabledCls: 'goal-gridcls',
            maxHeight: 400,
            height: 400,
            columnLines: true,
            viewConfig: {
                stripeRows: false
            },
            emptytext: "No Records Found",
            cls: 'notesgrid-cls',
            store: 'Goals.store.GoalsNotesStore',
            columns: [
                {
                    xtype: 'gridcolumn',
                    text: 'Note Type',
                    cls: 'notetype-cls',
                    dataIndex: 'notetype',
                    flex: 0.5,
                    renderer: function(data) {
                        if (data == "Standard") {
                            var image = "resources/images/goals/standard.png";
                            return '<span><img width = "20px" height= "20px" src="' + image + '" /></span>' + ' ' + '<span>' + data + '</span>';
                        } else if (data == "Re-Open") {
                            var image = "resources/images/goals/undo.png";
                            return '<span><img width = "20px" height= "20px" src="' + image + '" /></span>' + ' ' + '<span>' + data + '</span>';
                        } else if (data == "Cancel") {
                            var image = "resources/images/goals/close.png";
                            return '<span><img width = "20px" height= "20px" src="' + image + '" /></span>' + ' ' + '<span>' + data + '</span>';
                        } else {
                            var image = "resources/images/goals/goalstats.png";
                            return '<span><img width = "20px" height= "20px" src="' + image + '" /></span>' + ' ' + '<span>' + data + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Comment',
                    emptyText: 'Comment',
                    value: 'Lorem Ipsum',
                    dataIndex: 'details',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Created Date',
                    dataIndex: 'targetdate',
                    flex: 0.6,
                    renderer: function(data) {
                        if (data) {
                            var value = Ext.Date.format(new Date(data), 'd-M-Y');
                            return value;
                        } else {
                            return "";
                        }
                    }
                }
            ],
            width: 400
        }
    ]
});

Ext.define('Goals.view.RatingForm', {
    extend: 'Ext.view.View',
    alias: 'widget.goalratingform',
    margin: 50,
    // loadMask: false,
    //width:520,
    // height:250,
    store: 'Goals.store.RatingStore',
    emptyText: '<div class = "ddo-karmasetup-emptytext">No Icons Added</div>',
    // tpl:[
    //     '<div>Test</div>'
    // ],
    tpl: [
        '<span style="position:relative;bottom: 150px;font-size:16px;color:grey">Assigned Karma:</span>',
        '<tpl for=".">',
        '<div class="karmasetup-main-cls">',
        '<div style="background: #fff;text-align: center;padding-top: 10%;border-radius: 4px;box-shadow: 2px 2px 2px 0px #c9c7c8;width:100px;height:100px;">',
        '<img src="{imagepath}" class="ddo-karmasetup-icon" wrap-td="image_url">',
        '</div>',
        //'<div class="ddo-karmasetup-icon-delete" data-action="deleteIcon"></div>',
        '<div style="text-align:center;color: #c6c6c6;width: 100px;padding: 18px 0px 10px 0px;border: none;background: transparent;border-bottom: 1px solid #afafaf;font-size: 16px;">{name}</div>',
        '<div style="text-align:center;color: #c6c6c6;width: 100px;padding: 12px 0px 0px 0px;border: none;background: transparent;font-size: 16px;">{rating}</div>',
        '</div>',
        '</tpl>'
    ],
    itemSelector: 'karmasetup-main-cls',
    listeners: {
        itemclick: 'karmaSetupItemClick',
        itemkeyup: 'onKarmaIconItemKeyUp'
    }
});

Ext.define('Goals.view.ShareGoalsForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.sharegoalsform',
    requires: [
        //'DDO.store.feeds.Groups',
        'Goals.store.ShareGroups',
        'Goals.overrides.form.field.Tag'
    ],
    layout: {
        type: 'hbox'
    },
    initComponent: function() {
        var store = Ext.getStore('Goals.store.ShareGroups');
        if (!store.isLoaded()) {
            store.load();
        }
        this.callParent(arguments);
    },
    width: '100%',
    items: [
        {
            xtype: 'tagfield',
            width: '100%',
            margin: 20,
            cls: 'sharegroup-cls',
            //fieldCls: 'goalsearchicon-cls',
            reference: 'tagscomboview',
            anyMatch: true,
            editable: true,
            matchFieldWidth: false,
            // /hidden: true,
            hideTrigger: true,
            //autoShow: true,
            forceSelection: false,
            store: 'karmasetup.wallet.EmployeeComboStore',
            emptyText: 'select employee',
            displayField: 'empname',
            valueField: 'empid',
            queryMode: 'local',
            filterPickList: true,
            listConfig: {
                cls: 'tag-view-list',
                width: 300
            },
            tpl: [
                '<ul class="x-list-plain"><tpl for=".">',
                '<li role="option" class="x-boundlist-item">',
                '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
                '<div class="ddo-tag-Name">{empname}</div></li>',
                '</tpl>',
                '</ul>',
                {
                    getTags: function(values) {
                        if (typeof (values) === "object") {
                            if (values.profilepic) {
                                return '<img class="tagUrl-img"  src="' + values.profilepic + '" >';
                            }
                        }
                    }
                }
            ],
            listeners: {
                select: function(combo, record, eOpts) {
                    combo.inputEl.dom.value = '';
                    combo.collapse();
                }
            }
        }
    ]
});

Ext.define('Goals.view.ManagerRatingForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.managerratingform',
    xtype: 'managerratingform',
    cls: 'manager-rating-form',
    width: '100%',
    height: '100%',
    bodyPadding: 40,
    layout: {
        type: 'hbox'
    },
    items: [
        {
            html: 'Assigned Karma:',
            width: 120
        },
        {
            xtype: 'container',
            margin: '0 20 0 0',
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'karmastatusPic',
                    bind: {
                        disabled: '{amziconDisabled}'
                    },
                    height: 120,
                    width: 120,
                    padding: '0 0 0 2',
                    value: "Amazing",
                    bind: {
                        style: {
                            'background': 'url("/resources/images/goals/amazing.png")',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-color': 'white'
                        }
                    },
                    layout: {
                        type: 'vbox'
                    },
                    listeners: {
                        render: 'onGoalsIconRender'
                    }
                },
                {
                    html: 'Amazing',
                    bind: {
                        disabled: '{amziconDisabled}'
                    },
                    reference: 'activeRatingText',
                    margin: '10 0 10 0'
                },
                {
                    xtype: 'numberfield',
                    width: 120,
                    bind: {
                        disabled: '{amziconDisabled}',
                        readOnly: '{readOnlyKarmafield}'
                    },
                    cls: 'header-fields-design',
                    hideTrigger: true,
                    reference: 'goalKarmaPoints',
                    listeners: {
                        blur: 'calculateKarma'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            margin: '0 20 0 0',
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'container',
                    cls: 'karmastatusPic',
                    bind: {
                        disabled: '{supiconDisabled}'
                    },
                    height: 120,
                    width: 120,
                    padding: '0 0 0 2',
                    value: "Superb",
                    listeners: {
                        render: 'onGoalsIconRender'
                    },
                    bind: {
                        style: {
                            'background': 'url("/resources/images/goals/superb.png")',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-color': 'white'
                        }
                    },
                    layout: {
                        type: 'vbox'
                    }
                },
                {
                    html: 'Superb',
                    bind: {
                        disabled: '{supiconDisabled}'
                    },
                    margin: '10 0 10 0'
                },
                {
                    xtype: 'numberfield',
                    reference: 'valuesuperb',
                    readOnly: true,
                    bind: {
                        disabled: '{supiconDisabled}'
                    },
                    allowDecimals: false,
                    cls: 'header-fields-design',
                    hideTrigger: true,
                    width: 120
                }
            ]
        },
        {
            xtype: 'container',
            margin: '0 20 0 0',
            //disabled: true,
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'container',
                    bind: {
                        disabled: '{goodiconDisabled}'
                    },
                    cls: 'karmastatusPic',
                    height: 120,
                    width: 120,
                    value: "Good",
                    padding: '0 0 0 2',
                    bind: {
                        style: {
                            'background': 'url("/resources/images/goals/good.png")',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-color': 'white'
                        }
                    },
                    layout: {
                        type: 'vbox'
                    },
                    listeners: {
                        render: 'onGoalsIconRender'
                    }
                },
                {
                    html: 'Good',
                    bind: {
                        disabled: '{goodiconDisabled}'
                    },
                    margin: '10 0 10 0'
                },
                {
                    xtype: 'numberfield',
                    readOnly: true,
                    bind: {
                        disabled: '{goodiconDisabled}'
                    },
                    allowDecimals: false,
                    reference: 'valuegood',
                    cls: 'header-fields-design',
                    hideTrigger: true,
                    width: 120
                }
            ]
        }
    ]
});

Ext.define('Goals.view.ExecutivePlanViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.executiveplanview',
    data: {
        tab2: true,
        tab3: true,
        tab4: true,
        tab5: true,
        tab1: false,
        shareReadOnly: false,
        isUpdateNeed: false,
        ddo_employeegoal_id: null,
        ddo_employeegoal_userid: null,
        empkarmaPoints: null,
        editorOrGridDisable: false,
        GridDisable: false,
        visibilityMode: true,
        BtnvisibilityMode: false,
        EmpVisibilityMode: true,
        BtnText: null,
        doneText: null,
        approveText: null,
        isdoneBtnEnable: false,
        istodoDelete: false,
        MngrVisibilityMode: true,
        dneBtn: true,
        apprvedisabled: true,
        amziconDisabled: true,
        supiconDisabled: true,
        goodiconDisabled: true,
        targetDate: null,
        isManager: false,
        ratingIconsEnable: false,
        readOnlyKarmafield: true,
        selectedKarmapoints: null,
        achievedkarma: null,
        seletcedRatingText: null,
        achievedKarmaPoints: null,
        achievedratingText: "",
        addTaskDisable: false,
        loginEmpId: null
    }
});

Ext.define('Goals.view.ExecutivePlanViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.executiveplanview',
    onAddTaskClick: function(btn) {
        var grid = btn.up('grid'),
            store = grid.getStore(),
            record = {
                description: '',
                targetdate: '',
                timerequired: '',
                deletable: true
            },
            length = store.getCount(),
            deleteRec;
        store.each(function(rec) {
            deleteRec = rec;
            deleteRec.set('deletable', true);
        });
        store.add(record);
    },
    onBackButtonClick: function() {
        Ext.getStore('Goals.store.goals.GoalsViewStore').load();
        this.getView().up().getLayout().setActiveItem(1);
    },
    onMeasurementSave: function(btn, e, eOpts) {
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
            execPlanView = execPlan.lookupReference('executiveplanviewref'),
            execPlanViewModel = execPlanView.getViewModel(),
            execPlanViewTabPanel = execPlanView.down('tabpanel'),
            goalidRef = execPlanView.down('hiddenfield'),
            goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
            measuremntCriteriaRef = execPlanView.down('container[name=measurementCriteria]'),
            measurementCriteriaCmntRef = execPlanView.down('textarea[reference=commentsref]'),
            targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
            parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
            combovalue = parentComboRef.getValue(),
            targetDt = targetDtRef.getValue(),
            targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
            goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
            goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
            measuremntCriteria = measuremntCriteriaRef.getValue(),
            goalname = goalnameRef.getValue(),
            goalid = execPlanViewModel.get('ddo_employeegoal_id'),
            data = [],
            cmmntValue = measurementCriteriaCmntRef.getValue();
        goalStore.each(function(rec) {
            data = rec.data.isManager;
        });
        if (btn.text == "Move To Drafts") {
            statusId = 6;
            //ReOpen Status.
            this.onMovetoDraftTxt(btn, goaldetailstore, statusId, goalid, cmmntValue);
        } else {
            if (Ext.isEmpty(targetDt)) {
                Ext.Msg.alert('Warning', 'Please fill target date');
                return false;
            }
            if (Ext.isEmpty(measuremntCriteria)) {
                Ext.Msg.alert('Warning', 'Please fill measurement criteria');
                return false;
            }
            if (Ext.isEmpty(goalname)) {
                Ext.Msg.alert('Warning', 'Please fill goal name');
                return false;
            }
            params = {
                parentGoalId: combovalue,
                goalname: goalname,
                targetDate: targetDtVal,
                measurementCriteria: measuremntCriteria
            };
            if (execPlanViewModel.get('ddo_employeegoal_id')) {
                params.empGoalId = execPlanViewModel.get('ddo_employeegoal_id');
                Ext.Ajax.request({
                    url: Api.URL.goal.UPDATE,
                    method: 'PUT',
                    params: params,
                    scope: this,
                    success: function(resp, b) {
                        execPlanViewModel.set('tab2', false);
                        execPlanViewModel.set('apprvedisabled', true);
                        Ext.defer(function() {
                            execPlanViewTabPanel.setActiveTab(1);
                        }, 500);
                        goalStore.load();
                    },
                    failure: function(resp, b) {}
                });
            } else {
                Ext.Ajax.request({
                    url: Api.URL.goal.CREATE,
                    method: 'POST',
                    params: params,
                    scope: this,
                    success: function(resp, b) {
                        var response = Ext.decode(resp.responseText);
                        execPlanViewModel.set('ddo_employeegoal_id', response.ddo_employeegoal_id);
                        execPlanViewModel.set('ddo_employeegoal_userid', response.ddo_employee_id);
                        execPlanViewModel.set('tab2', false);
                        Ext.defer(function() {
                            execPlanViewTabPanel.setActiveTab(1);
                        }, 500);
                        goalStore.load();
                    },
                    failure: function(resp, b) {}
                });
            }
        }
    },
    onMovetoDraftTxt: function(btn, goaldetailstore, statusId, goalid, cmmntValue) {
        if (Ext.isEmpty(cmmntValue)) {
            Ext.Msg.alert('Warning', 'Please fill comments');
            return false;
        }
        var execPlan = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlanMain = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execvm = execPlan.getViewModel(),
            execmainvm = execPlanMain.getViewModel(),
            params = {
                goalId: goalid,
                statusId: statusId,
                noteDetails: cmmntValue
            };
        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            params: params,
            scope: this,
            success: function(resp, b) {
                execmainvm.set('goalStatus', "Re-Open");
                execmainvm.set('goalStatusIconCls', "draft-icon-cls");
                execvm.set('visibilityMode', true);
                execvm.set('BtnvisibilityMode', true);
                execvm.set('isUpdateNeed', true);
                execvm.set('dneBtn', true);
                Ext.Msg.alert('Success', 'Goal is re-opened');
                goaldetailstore.load({
                    params: {
                        goalid: goalid
                    }
                });
            },
            failure: function(resp, b) {}
        });
    },
    onExecutivePlanSave: function(btn, e, eOpts) {
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
            execPlanView = execPlan.lookupReference('executiveplanviewref'),
            approvalBtnRef = execPlanView.lookupReference('execapprovalref'),
            parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
            execPlanViewModel = execPlanView.getViewModel(),
            combovalue = parentComboRef.getValue(),
            execPlanForm = execPlanView.lookupReference('executiveplanformRef'),
            grid = execPlanForm.down('grid'),
            stre = grid.getStore(),
            goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
            goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
            //execplanheaderRefs
            targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
            targetDt = targetDtRef.getValue(),
            targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
            goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
            goalname = goalnameRef.getValue(),
            goalid = execPlanViewModel.get('ddo_employeegoal_id'),
            goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
            goalname = goalnameRef.getValue(),
            measuremntCriteriaRef = execPlanView.down('container[name=measurementCriteria]'),
            measurementCriteriaCmntRef = execPlanView.down('textarea[reference=commentsref]'),
            measuremntCriteria = measuremntCriteriaRef.getValue(),
            goalDetailStre = Ext.getStore('Goals.store.ExecutiveStore'),
            cmmntValue = measurementCriteriaCmntRef.getValue(),
            targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
            targetDt = targetDtRef.getValue(),
            targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
            gridData,
            taskDataArray = [];
        if (btn.text == "Move To Drafts") {
            statusId = 6;
            //ReOpen Status.
            this.onMovetoDraftTxt(btn, goaldetailstore, statusId, goalid, cmmntValue);
        } else {
            if (Ext.isEmpty(goalname)) {
                Ext.Msg.alert('Warning', 'Please fill goal name');
                return false;
            } else if (stre.getCount() > 0) {
                gridData = stre.data.items;
                gridData.forEach(function(rec) {
                    if (!Ext.isEmpty(rec.get('timerequired')) && !Ext.isEmpty(rec.get('description')) && !Ext.isEmpty(rec.get('targetdate'))) {
                        taskItems = {
                            name: rec.get('description'),
                            targetDate: Ext.Date.format((rec.get('date')), 'Y-m-d') || Ext.Date.format((rec.get('targetdate')), 'Y-m-d'),
                            duration: rec.get('timerequired'),
                            goalId: goalid,
                            taskId: rec.get('taskid')
                        };
                        taskDataArray.push(taskItems);
                    }
                });
                if (taskDataArray.length > 0) {
                    Ext.Ajax.request({
                        url: Api.URL.goaltask.CREATE,
                        method: 'POST',
                        params: {
                            goalTask: Ext.encode(taskDataArray),
                            empGoalId: goalid,
                            goalname: goalname,
                            parentGoalId: combovalue,
                            targetDate: targetDtVal
                        },
                        success: function(resp, b) {
                            Ext.Msg.alert('Status', 'Your execution plans saved successfully');
                            approvalBtnRef.setDisabled(false);
                            goalDetailStre.load({
                                params: {
                                    goalId: execPlanViewModel.get('ddo_employeegoal_id')
                                }
                            });
                            goalStore.reload();
                        },
                        failure: function(resp, b) {}
                    });
                } else {
                    Ext.Msg.alert('Alert', 'Please enter all mandatory fields');
                }
            } else {
                Ext.Msg.alert('Alert', 'Please add task');
            }
        }
    },
    onShareUpdate: function(btn, e, eOpts) {
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
            execPlanView = execPlan.lookupReference('executiveplanviewref'),
            execPlanViewModel = execPlanView.getViewModel(),
            goalid = execPlanViewModel.get('ddo_employeegoal_id'),
            //execplanheaderRefs
            targetDtRef = execPlanHeader.down('datefield[name=targetDate]'),
            targetDt = targetDtRef.getValue(),
            targetDtVal = Ext.Date.format(targetDt, 'Y-m-d'),
            goalnameRef = execPlanHeader.down('textfield[name=goalname]'),
            goalname = goalnameRef.getValue(),
            parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]'),
            combovalue = parentComboRef.getValue(),
            sharegoalview = Ext.ComponentQuery.query('sharegoalsform')[0],
            tagsView = sharegoalview.down('tagfield[reference=tagscomboview]'),
            tagsStore = tagsView.getStore(),
            tagData = tagsView.getValueRecords(),
            tagsDataArray = [];
        if (!Ext.isEmpty(Utility.goalsharetaggedList) || tagData.length > 0) {
            if (tagData.length > 0) {
                tagData.forEach(function(rec) {
                    tagIds = {
                        employeeId: rec.data.empid,
                        goalId: goalid
                    };
                    tagsDataArray.push(tagIds);
                });
            }
            Ext.Ajax.request({
                url: '/sharegoal',
                method: 'POST',
                params: {
                    empGoalId: goalid,
                    goalname: goalname,
                    parentGoalId: combovalue,
                    targetDate: targetDtVal,
                    shareData: Ext.encode(tagsDataArray) || Ext.encode(Utility.goalsharetaggedList)
                },
                success: function(resp, b) {
                    if (tagData.length > 0) {
                        Ext.Msg.alert('Success', 'Goal shared to selected members');
                        Ext.getStore('Goals.store.goals.GoalsParentComboStore').load();
                        Utility.goalsharetaggedList.push(tagData);
                    } else {
                        Ext.Msg.alert('Success', 'Successfully Goal share updated');
                        Ext.getStore('Goals.store.goals.GoalsParentComboStore').load();
                        Utility.goalsharetaggedList = [];
                    }
                },
                failure: function(resp, b) {}
            });
        } else {
            Ext.Msg.alert('Warning', 'Please select employee to share.');
        }
    },
    onAddNewClick: function(btn, e, eOpts) {
        var noteWindow = Ext.ComponentQuery.query('goalsnotewindow')[0] || Ext.create('Goals.view.goals.GoalsNoteWindow'),
            form = noteWindow.down('form');
        form.reset();
        noteWindow.show();
    },
    calculateKarma: function(val) {
        var valueSuberb = this.getView().down('numberfield[reference=valuesuperb]');
        var valueGood = this.getView().down('numberfield[reference=valuegood]');
        var mainViewModel = Ext.ComponentQuery.query('executiveplanview')[0].getViewModel();
        var valueAmazing = val.value;
        mainViewModel.set('selectedKarmapoints', valueAmazing);
        var approveButton = this.getView().down('button[text=Approve]');
        valueSuberb.setValue(valueAmazing * 2 / 3);
        valueGood.setValue(valueAmazing * 1 / 3);
        approveButton.enable();
        if (val.value == null || 0) {
            approveButton.disable();
        }
    },
    onApproveBtnClick: function(btn, e) {
        var statusId, goalId, viewModel, view, viewRef, ratingText, karmaPoints;
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlanViewTabPanel = execPlanView.down('tabpanel'),
            ratingRef = execPlanViewTabPanel.down('container[reference=ratingref]'),
            DneBtnRef = ratingRef.down('button[reference=dnebtnref]');
        statusId = btn.statusId;
        view = this.getView();
        viewRef = view.getReferences();
        viewModel = this.getViewModel();
        goalId = viewModel.get('ddo_employeegoal_id');
        ratingText = viewRef.activeRatingText.config.html;
        karmaPoints = viewRef.goalKarmaPoints.getValue();
        if (karmaPoints) {
            Ext.Ajax.request({
                url: '/goalstatus',
                method: 'PUT',
                params: {
                    goalId: goalId,
                    statusId: statusId,
                    ratingText: ratingText,
                    karmaPoints: karmaPoints
                },
                success: function(response, eOpts) {
                    Ext.Msg.alert('Success', ' Successfully Goal approved');
                    execPlan.getViewModel().set('goalStatus', "In Progress");
                    execPlan.getViewModel().set('goalStatusIconCls', "in-progress-icon-cls");
                    execPlan.getViewModel().set('isUpdateNeed', true);
                    execPlan.getViewModel().set('dneBtn', false);
                    execPlanView.getViewModel().set('BtnvisibilityMode', true);
                    execPlanView.getViewModel().set('visibilityMode', true);
                },
                failure: function(response, eOpts) {
                    var msg = Ext.decode(response.responseText).message;
                    Ext.Msg.alert('Error!', msg);
                }
            });
        } else {
            Ext.Msg.alert('Error!', 'Please fill the karma points');
        }
    },
    onDraftsBtnClick: function(btn, e) {
        var statusId, goalId, viewModel,
            goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
            goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
            execPlan = Ext.ComponentQuery.query('executiveplanview')[0],
            execmainPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execmainvm = execmainPlan.getViewModel(),
            execvm = execPlan.getViewModel(),
            measurementCriteriaCmntRef = execPlan.down('textarea[reference=commentsref]'),
            cmmntValue = measurementCriteriaCmntRef.getValue();
        statusId = btn.statusId;
        viewModel = this.getViewModel();
        goalId = viewModel.get('ddo_employeegoal_id');
        if (Ext.isEmpty(cmmntValue)) {
            Ext.Msg.alert('Warning', 'Please fill comments');
            return false;
        }
        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            params: {
                goalId: goalId,
                statusId: statusId,
                noteDetails: cmmntValue
            },
            success: function(response, eOpts) {
                execmainvm.set('goalStatus', "Re-Open");
                execmainvm.set('goalStatusIconCls', "draft-icon-cls");
                execvm.set('visibilityMode', true);
                execvm.set('BtnvisibilityMode', true);
                execvm.set('isUpdateNeed', true);
                execvm.set('dneBtn', true);
                Ext.Msg.alert('Success', 'Goal is re-Opened');
                goaldetailstore.load({
                    params: {
                        goalid: goalId
                    }
                });
            },
            failure: function(response, eOpts) {
                Ext.Msg.alert('Error!', 'Failed to update the goal status!');
            }
        });
    },
    onCompleteBtnClick: function(btn, e) {
        var statusId, goalId, viewModel, selfComment;
        statusId = btn.statusId;
        viewModel = this.getViewModel();
        goalId = viewModel.get('ddo_employeegoal_id') , goalOwner = viewModel.get('ddo_employeegoal_userid') , karmapoints = viewModel.get('empkarmaPoints') , ratingText = viewModel.get('seletcedRatingText') , isManager = viewModel.get('isManager') , loginStoreData = Ext.getStore('login').getData() , loginData = loginStoreData.items[0].data;
        if (loginData.ddo_employee_id != goalOwner) {
            isManager = false;
        }
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanView = execPlan.lookupReference('executiveplanviewref'),
            cmmntRef = execPlanView.down('textarea[reference = commentsratingref]'),
            goalStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
            radiogrpRef = execPlanView.down('radiogroup'),
            radiogrp = radiogrpRef.getValue(),
            radiogrpVal = radiogrp.rb,
            cmmntValue = cmmntRef.getValue();
        if (btn.text == "Done") {
            statusId = 5;
            //Achieved Status.
            karmapoints = viewModel.get('selectedKarmapoints');
            this.onAchievedStatus(btn, goalOwner, karmapoints, goalStore, statusId, goalId, cmmntValue, radiogrp, isManager, ratingText);
        } else {
            if (Ext.isEmpty(cmmntValue)) {
                Ext.Msg.alert('Warning', 'Please fill comments');
                return false;
            }
            Ext.Ajax.request({
                url: '/goalstatus',
                method: 'PUT',
                params: {
                    goalId: goalId,
                    statusId: statusId,
                    selfComment: cmmntValue
                },
                success: function(response, eOpts) {
                    execPlan.getViewModel().set('goalStatus', "Completed");
                    execPlan.getViewModel().set('goalStatusIconCls', "completed-icon-cls");
                    execPlanView.getViewModel().set('isdoneBtnEnable', true);
                    execPlanView.getViewModel().set('EmpVisibilityMode', true);
                    execPlanView.getViewModel().set('dneBtn', true);
                    execPlan.getViewModel().set('goalFieldReadyOnly', true);
                    execPlanView.getViewModel().set('editorOrGridDisable', true);
                    execPlanView.getViewModel().set('GridDisable', true);
                    Ext.Msg.alert('Success', 'Successfully Goal completed');
                },
                failure: function(response, eOpts) {
                    Ext.Msg.alert('Error', 'Failed to update the goal status!');
                }
            });
        }
    },
    onAchievedStatus: function(btn, goalOwner, karmapoints, goalStore, statusId, goalid, cmmntValue, radiogrp, isManager, ratingText) {
        if (Ext.isEmpty(cmmntValue)) {
            Ext.Msg.alert('Warning', 'Please fill comments');
            return false;
        }
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execvm = execPlan.getViewModel(),
            execPlanViewModel = Ext.ComponentQuery.query('executiveplanview')[0].getViewModel(),
            params,
            goaldetailstore = Ext.getStore('Goals.store.GoalsNotesStore'),
            loginData = Ext.getStore('login').getAt(0),
            managerComment, cancelReason;
        if (radiogrp) {
            if (radiogrp.rb == 2) {
                var managerComment = cmmntValue;
                statusId = 5;
            } else if (radiogrp.rb == 1) {
                var cancelReason = cmmntValue;
                statusId = 7;
            }
        }
        params = {
            goalId: goalid,
            statusId: statusId,
            managerComment: managerComment,
            cancelReason: cancelReason,
            ratingText: ratingText,
            karmaPoints: karmapoints,
            noteDetails: cmmntValue,
            goalOwner: goalOwner,
            ismanager: isManager
        };
        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            params: params,
            scope: this,
            success: function(resp, b) {
                if (!Ext.isEmpty(cancelReason)) {
                    execvm.set('goalStatus', "Cancel");
                    execvm.set('goalStatusIconCls', "achieved-icon-cls");
                    Ext.Msg.alert('Status', 'Goal cancelled');
                } else if (!Ext.isEmpty(managerComment)) {
                    execvm.set('goalStatus', "Achieved");
                    execvm.set('goalStatusIconCls', "achieved-icon-cls");
                    Ext.Msg.alert('Success', 'Successfully Goal achieved');
                }
                goalStore.load();
                goaldetailstore.load({
                    params: {
                        goalid: goalid
                    }
                });
                execPlan.getViewModel().set('goalFieldReadyOnly', true);
                execPlanViewModel.set('editorOrGridDisable', true);
                execPlanViewModel.set('GridDisable', true);
                execPlanViewModel.set('isUpdateNeed', true);
                execPlanViewModel.set('dneBtn', true);
                execPlanViewModel.set('MngrVisibilityMode', true);
                execPlanViewModel.set('EmpVisibilityMode', true);
                execPlanViewModel.set('BtnvisibilityMode', true);
            },
            failure: function(resp, b) {
                var responseTextData = Ext.decode(resp.responseText),
                    errorMsg = responseTextData.message;
                Ext.Msg.alert('Failed', errorMsg);
            }
        });
    },
    onExecutivePlanApproval: function(btn, e) {
        var statusId, goalId, viewModel, selfComment, Pending,
            execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
            execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            executiveplanform = Ext.ComponentQuery.query('executiveplanform')[0],
            execgrid = executiveplanform.down('grid'),
            addnewtaskref = executiveplanform.down('button[text=Add New Task]'),
            execstore;
        statusId = 2;
        Pending = Pending;
        //execheaderrefs
        goalnameRef = execPlanHeader.down('textfield[name=goalname]') , targetDtRef = execPlanHeader.down('datefield[name=targetDate]') , parentComboRef = execPlanHeader.down('combo[reference=parentgoalref]') , viewModel = this.getViewModel();
        execvm = execPlan.getViewModel();
        execstore = Ext.getStore('Goals.store.ExecutiveStore');
        goalId = viewModel.get('ddo_employeegoal_id');
        if (viewModel.get('isManager')) {
            statusId = 3;
        }
        Ext.Ajax.request({
            url: '/goalstatus',
            method: 'PUT',
            scope: this,
            params: {
                goalId: goalId,
                statusId: statusId,
                selfComment: 'Who am I?',
                ismanager: viewModel.get('isManager')
            },
            success: function(response, eOpts) {
                var reportingTo = Ext.decode(response.responseText).reportingto;
                if (viewModel.get('isManager')) {
                    var empComboStore = Ext.getStore('karmasetup.wallet.EmployeeComboStore');
                    empComboStore.load();
                    Ext.Msg.alert('Success', 'Successfully Goal approved');
                    execPlan.getViewModel().set('goalStatus', "In Progress");
                    execPlan.getViewModel().set('goalStatusIconCls', "in-progress-icon-cls");
                    execPlanView.getViewModel().set('tab3', false);
                    execPlanView.getViewModel().set('tab4', false);
                    execPlanView.getViewModel().set('GridDisable', false);
                    execPlanView.getViewModel().set('isUpdateNeed', true);
                    execPlanView.getViewModel().set('dneBtn', false);
                    execPlanView.getViewModel().set('isdoneBtnEnable', true);
                    execPlanView.getViewModel().set('EmpVisibilityMode', false);
                    execPlanView.getViewModel().set('MngrVisibilityMode', false);
                    execPlanView.getViewModel().set('istodoDelete', true);
                    execPlanView.getViewModel().set('doneText', "Done");
                    Ext.getStore('widget.todo.TodoStore').load();
                } else {
                    if (reportingTo) {
                        Ext.Msg.alert('Success', 'Goal sent for manager approval');
                    } else {
                        Ext.Msg.alert('Success', 'Your role and reporting-to is not set, please contact Admin');
                    }
                    execvm.set('goalStatus', "Pending");
                    execvm.set('goalStatusIconCls', "pending-icon-cls");
                    execPlanView.getViewModel().set('GridDisable', true);
                }
                btn.setDisabled(true);
                execPlanView.getViewModel().set('apprvedisabled', true);
                execPlanView.getViewModel().set('BtnvisibilityMode', true);
                execvm.set('goalFieldReadyOnly', true);
                execPlanView.getViewModel().set('editorOrGridDisable', true);
                execPlanView.getViewModel().set('addTaskDisable', true);
                execstore.each(function(rec) {
                    rec.set('deletable', false);
                });
            },
            failure: function(response, eOpts) {
                Ext.Msg.alert('Error!', 'Failed to update the goal status!');
            }
        });
    },
    oncheckchange: function(me, rowIndex, checked, record, e, eOpts) {
        var store = me.up('grid').getStore(),
            storeRecord = store.getAt(rowIndex),
            viewModel = this.getViewModel(),
            goalId = viewModel.get('ddo_employeegoal_id'),
            params;
        params = {
            taskId: storeRecord.data.taskid,
            iscompleted: (storeRecord.data.taskcompleted == true) ? 'Y' : 'N',
            empGoalId: goalId
        };
        Ext.Ajax.request({
            url: '/goaltask/completetask',
            method: 'PUT',
            scope: this,
            params: params,
            success: function(resp, b) {
                var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
                    execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
                    execPlanHeader = execPlan.lookupReference('executiveplanheaderref'),
                    taskcompletedcount = 0,
                    totoltaskhourscount = 0;
                store.each(function(rec) {
                    if (rec.data.taskcompleted) {
                        taskcompletedcount = taskcompletedcount + rec.data.timerequired;
                    }
                    totoltaskhourscount = totoltaskhourscount + rec.data.timerequired;
                });
                var taskcompletedpercent = (taskcompletedcount / totoltaskhourscount);
                var progressBar = execPlanHeader.down('progressbar');
                var progressPercentage = execPlanHeader.down('label');
                progressBar.setValue(taskcompletedpercent);
                progressPercentage.setHtml(Math.round((taskcompletedpercent * 100), 2) + '%');
                Ext.getBody().unmask();
                if (taskcompletedpercent == 1) {
                    execPlanView.getViewModel().set('isdoneBtnEnable', false);
                } else {
                    execPlanView.getViewModel().set('isdoneBtnEnable', true);
                }
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
            }
        });
    },
    setProgressBarValue: function() {
        var executiveHeaderContainer = this.getView().down('executiveplanheader');
        var progressBarValue = executiveHeaderContainer.down('progressbar').value;
        var progressPercentage = executiveHeaderContainer.down('label');
        if (!progressBarValue) {
            progressBarValue = 0;
        }
        progressPercentage.setHtml(Math.round((progressBarValue * 100), 2) + '%');
    },
    onGoalsIconRender: function(c) {
        var me = this;
        c.getEl().on({
            click: Ext.bind(me.onGoalsIconClick, me, [
                c
            ])
        });
    },
    onGoalsIconClick: function(cmp) {
        var mainViewModel = Ext.ComponentQuery.query('executiveplanview')[0].getViewModel(),
            selectedKarmaPoints = cmp.up('container').down('numberfield').getValue();
        if (mainViewModel.get('ratingIconsEnable')) {
            mainViewModel.set('selectedKarmapoints', selectedKarmaPoints);
            mainViewModel.set('seletcedRatingText', cmp.value);
            if (cmp.value == "Amazing") {
                mainViewModel.set('amziconDisabled', false);
                mainViewModel.set('supiconDisabled', true);
                mainViewModel.set('goodiconDisabled', true);
            }
            if (cmp.value == "Superb") {
                mainViewModel.set('amziconDisabled', true);
                mainViewModel.set('supiconDisabled', false);
                mainViewModel.set('goodiconDisabled', true);
            }
            if (cmp.value == "Good") {
                mainViewModel.set('amziconDisabled', true);
                mainViewModel.set('supiconDisabled', true);
                mainViewModel.set('goodiconDisabled', false);
            }
        }
    },
    onradiochange: function(radiogrp, newVal, oldVal, eOpts) {
        var execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlanViewModel = execPlanView.getViewModel();
        var execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanHeader = execPlan.lookupReference('executiveplanheaderref');
        if (newVal.rb == 1) {
            execPlanViewModel.set('isdoneBtnEnable', false);
        } else if (newVal.rb == 2) {
            var execGrid = Ext.getStore('Goals.store.ExecutiveStore'),
                executivePlanGridData = execGrid.getData();
            var taskcompletedcount = 0,
                totoltaskhourscount = 0;
            for (var i = 0; i < executivePlanGridData.length; i++) {
                if (executivePlanGridData.items[i].data.taskcompleted) {
                    taskcompletedcount = taskcompletedcount + executivePlanGridData.items[i].data.timerequired;
                }
                totoltaskhourscount = totoltaskhourscount + executivePlanGridData.items[i].data.timerequired;
            }
            //progressbar start
            var len = executivePlanGridData.length;
            if (len > 0) {
                var taskcompletedpercent = (taskcompletedcount / totoltaskhourscount);
            }
            var progressBar = execPlanHeader.down('progressbar');
            var progressPercentage = execPlanHeader.down('label');
            progressBar.setValue(taskcompletedpercent);
            progressPercentage.setHtml(Math.round((taskcompletedpercent * 100), 2) + '%');
            if (taskcompletedpercent == 1) {
                execPlanViewModel.set('isdoneBtnEnable', false);
            } else {
                execPlanViewModel.set('isdoneBtnEnable', true);
            }
        }
    }
});

Ext.define('Goals.view.ExecutivePlanView', {
    extend: 'Ext.container.Container',
    alias: 'widget.executiveplanview',
    cls: 'executiveplanview-cls',
    layout: {
        type: 'fit'
    },
    requires: [
        'Goals.view.Notes',
        'Goals.view.RatingForm',
        'Goals.store.RatingStore',
        'Goals.view.ShareGoalsForm',
        'Goals.view.ManagerRatingForm',
        'Goals.view.ExecutivePlanForm',
        'Goals.view.ExecutivePlanViewModel',
        'Goals.view.ExecutivePlanViewController'
    ],
    controller: 'executiveplanview',
    viewModel: {
        type: 'executiveplanview'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'ddo_employeegoal_id'
        },
        {
            xtype: 'tabpanel',
            cls: 'goalstab-cls',
            items: [
                {
                    title: 'Measurement Criteria',
                    iconCls: 'goalmeasurement-icon',
                    width: '100%',
                    bind: {
                        disabled: '{tab1}'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: '99%',
                            margin: '0 5',
                            items: [
                                {
                                    xtype: 'htmleditor',
                                    cls: 'goalshtmleditor-cls',
                                    name: 'measurementCriteria',
                                    width: '100%',
                                    bind: {
                                        disabled: '{editorOrGridDisable}'
                                    }
                                },
                                {
                                    xtype: 'textarea',
                                    width: '100%',
                                    cls: 'employee-setup-txtfield-cls',
                                    reference: 'commentsref',
                                    emptyText: 'Comments',
                                    bind: {
                                        hidden: '{visibilityMode}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            style: {
                                "background-color": '#f6f6f6'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    bind: {
                                        text: '{BtnText}',
                                        hidden: '{BtnvisibilityMode}'
                                    },
                                    margin: '30px 10px',
                                    cls: 'goalhtml-savebtn-cls',
                                    listeners: {
                                        click: 'onMeasurementSave'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    reference: 'approveBtnRef',
                                    bind: {
                                        disabled: '{apprvedisabled}',
                                        text: '{approveText}',
                                        hidden: '{BtnvisibilityMode}'
                                    },
                                    margin: '30px 10px',
                                    statusId: 2,
                                    cls: 'goalhtml-updatebtn-cls',
                                    listeners: {
                                        click: 'onExecutivePlanApproval'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Execution Plan',
                    iconCls: 'financeicon-cls',
                    bind: {
                        disabled: '{tab2}'
                    },
                    items: [
                        {
                            xtype: 'executiveplanform',
                            width: '100%',
                            reference: 'executiveplanformRef'
                        },
                        {
                            xtype: 'container',
                            margin: '20 0 0 0',
                            cls: '',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            style: {
                                "background-color": '#f6f6f6'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    bind: {
                                        text: '{BtnText}',
                                        hidden: '{BtnvisibilityMode}'
                                    },
                                    margin: '30px 10px',
                                    reference: 'execsavebtnref',
                                    cls: 'goalhtml-savebtn-cls',
                                    listeners: {
                                        click: 'onExecutivePlanSave'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    reference: 'execapprovalref',
                                    bind: {
                                        text: '{approveText}',
                                        disabled: '{apprvedisabled}',
                                        hidden: '{BtnvisibilityMode}'
                                    },
                                    margin: '30px 10px',
                                    cls: 'goalhtml-updatebtn-cls',
                                    listeners: {
                                        click: 'onExecutivePlanApproval'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Share with',
                    iconCls: 'usersicon-cls',
                    bind: {
                        disabled: '{tab3}'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: '100%',
                            cls: 'ratingdetailcontainer-cls',
                            items: [
                                {
                                    xtype: 'sharegoalsform',
                                    cls: 'sharegoalsform-cls'
                                },
                                {
                                    xtype: 'container',
                                    cls: '',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Update',
                                            margin: '30px 10px',
                                            listeners: {
                                                click: 'onShareUpdate'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Rating',
                    reference: 'ratingref',
                    iconCls: 'charticon-cls',
                    bind: {
                        disabled: '{tab4}'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'card',
                            items: [
                                {
                                    xtype: 'managerratingform',
                                    width: '100%'
                                },
                                {
                                    xtype: 'ratingdetails',
                                    width: '100%'
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            width: '100%',
                            bind: {
                                hidden: '{MngrVisibilityMode}'
                            },
                            columns: 2,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: 'Cancel Goal',
                                    name: 'rb',
                                    inputValue: '1'
                                },
                                {
                                    boxLabel: 'Complete',
                                    name: 'rb',
                                    inputValue: '2',
                                    checked: true,
                                    padding: '0px 0px 0px 10px'
                                }
                            ],
                            listeners: {
                                change: 'onradiochange'
                            }
                        },
                        {
                            xtype: 'textarea',
                            cls: 'employee-setup-txtfield-cls',
                            width: '100%',
                            hidden: true,
                            reference: 'commentsratingref',
                            emptyText: 'Comments',
                            bind: {
                                hidden: '{EmpVisibilityMode}'
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 0',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Move to Drafts',
                                    margin: '0px 30px 0px 10px',
                                    statusId: 6,
                                    cls: 'ratingsavebtn',
                                    scale: 'large',
                                    bind: {
                                        hidden: '{isUpdateNeed}'
                                    },
                                    handler: 'onDraftsBtnClick'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Approve',
                                    scale: 'large',
                                    statusId: 3,
                                    cls: 'ratingsavebtn',
                                    bind: {
                                        hidden: '{isUpdateNeed}'
                                    },
                                    style: {
                                        "background-color": '#f6f6f6'
                                    },
                                    margin: '0px 20px 0px 5px',
                                    handler: 'onApproveBtnClick'
                                },
                                {
                                    xtype: 'button',
                                    reference: 'dnebtnref',
                                    scale: 'large',
                                    statusId: 4,
                                    bind: {
                                        text: '{doneText}',
                                        hidden: '{dneBtn}',
                                        disabled: '{isdoneBtnEnable}'
                                    },
                                    margin: '0px 30px 0px 10px',
                                    cls: 'goalhtml-savebtn-cls',
                                    handler: 'onCompleteBtnClick'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Notes',
                    bind: {
                        disabled: '{tab5}'
                    },
                    width: '100%',
                    items: [
                        {
                            xtype: 'container',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'tbfill',
                                    width: 150
                                },
                                {
                                    xtype: 'notes',
                                    width: '100%'
                                },
                                {
                                    xtype: 'button',
                                    text: '&#x271B',
                                    cls: 'fab-button',
                                    listeners: {
                                        click: 'onAddNewClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('Goals.view.ExecutivePlanMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.executiveplanmainview',
    data: {
        goalStatus: null,
        goalStatusIconCls: null,
        goalFieldReadyOnly: false
    }
});

Ext.define('Goals.view.ExecutivePlanMain', {
    extend: 'Ext.container.Container',
    alias: 'widget.executiveplanmainview',
    requires: [
        'Goals.view.goals.GoalsView',
        'Goals.view.ExecutivePlanView',
        'Goals.view.ExecutivePlanHeader',
        'Goals.view.ExecutivePlanMainViewModel'
    ],
    cls: 'exe-plan-mainview-cls',
    // margin: '0 10 0 20',
    height: "100%",
    width: "100%",
    controller: 'executiveplanview',
    viewModel: {
        type: 'executiveplanmainview'
    },
    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'exe-plan-toolbar',
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    scale: 'large',
                    iconCls: 'goalsbackbtn-cls',
                    cls: 'back-btn-cls',
                    handler: 'onBackButtonClick'
                },
                '->',
                {
                    xtype: 'button',
                    scale: 'large',
                    bind: {
                        text: '{goalStatus}',
                        iconCls: '{goalStatusIconCls}'
                    },
                    cls: 'achieved-btn-cls'
                }
            ]
        },
        {
            xtype: 'executiveplanheader',
            reference: 'executiveplanheaderref'
        },
        {
            xtype: 'executiveplanview',
            reference: 'executiveplanviewref'
        }
    ]
});

Ext.define('Goals.view.RatingDetails', {
    extend: 'Ext.container.Container',
    alias: 'widget.ratingdetails',
    items: [
        {
            xtype: 'container',
            width: '100%',
            height: 150,
            cls: 'ratingdetails-cls',
            style: {
                backgroundSize: '100% 100% !important',
                background: 'url("/resources/images/goals/Achieved_Banner.png") 0/cover no-repeat !important'
            }
        },
        {
            xtype: 'container',
            padding: 15,
            style: {
                'transform': 'translate(0px, -68px)'
            },
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'image',
                    style: {
                        'background': '#fff',
                        'border-radius': '9px',
                        'box-shadow': '1px 3px 7px 3px #dfdfe0'
                    },
                    padding: 10,
                    src: 'resources/images/goals/amazing.png'
                },
                {
                    padding: 10,
                    bind: {
                        html: '<div><span style="color:#aeaeae;font-size:12px;">{achievedratingText} |</span> <b><span class="karma-score-icon"></span> {achievedKarmaPoints}</b></div>'
                    }
                }
            ]
        },
        {
            xtype: 'dataview',
            reference: 'selfcommentsref',
            tpl: [
                '<div style="width:100%;background-color:#FFFF;">',
                '<tpl for=".">',
                '<div style = "color:#fab82e;font-weight:600;font-size:14;">Self Comments: </div></br>',
                '<div>{selfcomment}</div></br>',
                '<div style = "color:#fab82e;font-weight:600;font-size:14;">Manager Comments: </div></br>',
                '<div>{managercomment}</div></br>',
                '</tpl>',
                '<div>'
            ],
            itemSelector: ''
        }
    ]
});

Ext.define('Goals.view.Test', {
    extend: 'Ext.window.Window',
    alias: 'widget.goals-test',
    width: '90%',
    height: 580,
    modal: true,
    draggable: false,
    resizable: false,
    cls: 'redeem-view',
    title: "Test",
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
                    xtype: 'button',
                    text: "Testing View"
                }
            ]
        }
    ]
});

Ext.define('Goals.view.goals.CreateGoalHeader', {
    extend: 'Ext.form.Panel',
    alias: 'widget.creategoalheader',
    initComponent: function() {
        Ext.getStore('Goals.store.goals.ProjectStore').load();
        this.callParent(arguments);
    },
    cls: 'goals-detail-headerview-cls',
    width: "100%",
    height: "100%",
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            cls: 'goals-details-headerview-top',
            defaults: {
                margin: '0 0 5 0'
            },
            items: [
                {
                    xtype: 'button',
                    cls: 'goals-back-btn-cls',
                    iconCls: 'goals-back-icon'
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Draft',
                    cls: 'goals-status-button',
                    iconCls: 'x-fa fa-pencil-square-o'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'column',
            defaults: {
                margin: '10 20 0 0',
                labelSeparator: ''
            },
            items: [
                {
                    xtype: 'textfield',
                    emptyText: 'Design Ui/Ux for DDO Mobile',
                    columnWidth: '0.7'
                },
                {
                    xtype: 'label',
                    html: 'Progress',
                    columnWidth: '0.07',
                    margin: '20 0 0 0'
                },
                {
                    xtype: 'progressbar',
                    columnWidth: 0.2,
                    height: 14,
                    value: '0.2',
                    ui: 'progressui',
                    margin: '20 0 0 0'
                },
                {
                    xtype: 'label',
                    html: '20%',
                    columnWidth: '0.03',
                    margin: '20 0 0 0'
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Project',
                    columnWidth: '0.7',
                    store: 'Goals.store.goals.ProjectStore',
                    displayField: 'name',
                    valueField: 'value',
                    cls: 'select-project-cls'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Target Date',
                    name: 'from_date',
                    value: new Date(),
                    format: 'd-m-Y',
                    columnWidth: '0.25'
                }
            ]
        }
    ]
});

Ext.define('Goals.view.goals.GoalsAccountView', {
    extend: 'Ext.view.View',
    alias: 'widget.goalsaccountview',
    requires: [
        'Goals.view.goals.SearchGoalViewController'
    ],
    initComponent: function() {
        Ext.getStore('Goals.store.goals.GoalsViewStore').load();
        this.callParent(arguments);
    },
    loadMask: false,
    controller: 'goalscontroller',
    store: 'Goals.store.goals.GoalsViewStore',
    tpl: [
        '<tpl for=".">',
        '<tpl if="xindex === 1">',
        '<div class="create-goal-cls">',
        '<div class="create-goal-plus-icon"><span class="plus-icon"></span></div>',
        '<div class="create-goal-text">Create Goal</div>',
        '</div>',
        '</tpl>',
        '</tpl>'
    ],
    itemSelector: '.create-goal-cls'
});

Ext.define('Goals.view.goals.GoalsDetailView', {
    extend: 'Ext.container.Container',
    alias: 'widget.goalsdetailview',
    requires: [
        'Goals.view.goals.CreateGoalHeader'
    ],
    cls: 'goals-dashboard-detailview-cls',
    height: "100%",
    width: "100%",
    items: [
        {
            xtype: 'creategoalheader'
        },
        {
            xtype: 'executiveplanview'
        }
    ]
});

Ext.define('Goals.view.goals.SearchFilterWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchfilterwindowcontroller',
    onWindowOutsideTap: function(event, target) {
        var view = this,
            searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0] || Ext.create('Goals.view.goals.SearchFilterWindow'),
            form = searchfilterWin.down('form');
        if (!form.isDirty()) {
            if (Utility.nominatAlert) {
                Utility.onWindowOutterTap(event, target, view);
            }
        }
    },
    onGoalsFliter: function(btn, e, eOpts, isComboSelect) {
        var form = btn.up('window').down('form'),
            formValues = form.getValues(),
            vm = this.getViewModel(),
            datefieldValue = btn.up('window').down('datefield').getValue(),
            goalsViewStore = Ext.getStore('Goals.store.goals.GoalsViewStore'),
            buttongroup = btn.up('window').down('buttongroup');
        var goalsHeader = Ext.ComponentQuery.query('goalsheader')[0],
            comboRef = goalsHeader.down('combobox[reference = comboref]'),
            comboRecord = comboRef.getStore().findRecord('value', comboRef.getValue()),
            comboRefVal;
        if (comboRecord == null) {
            comboRefVal = Ext.ComponentQuery.query('combobox[name=goaltypecombo]')[1];
            comboRecord = comboRef.getStore().findRecord('value', comboRefVal.getValue());
        }
        var loginData = Ext.getStore('login').getData(),
            logEmpId = loginData.items[0].data.ddo_employee_id;
        var buttongroupArr = [];
        buttongroup.items.items.forEach(function(rec) {
            if (rec.pressed) {
                buttongroupArr.push(rec.text);
            }
        });
        vm.set('filterView', true);
        if (goalsViewStore) {
            goalsViewStore.clearFilter(true);
            goalsViewStore.filterBy(function(record) {
                var mom_agendaValue = false,
                    people_tagValue = false,
                    goaltype = false,
                    goalstatus = false,
                    dateValue = false;
                if (Ext.isEmpty(formValues.people_tag) || (formValues.people_tag.indexOf(record.data.goalUser.employeeId) != -1)) {
                    mom_agendaValue = true;
                }
                if (Ext.isEmpty(buttongroupArr) || (buttongroupArr.indexOf(record.data.goalstatus) != -1)) {
                    goalstatus = true;
                }
                var result = record.data.title.search(new RegExp(formValues.goal, 'gi'));
                if (Ext.isEmpty(comboRecord) || (comboRecord.data.key == record.data.goalType)) {
                    if ((comboRecord.data.key == "Shared") && (record.data.goalUser.employeeId == logEmpId)) {
                        goaltype = false;
                    } else {
                        goaltype = true;
                    }
                } else if ((comboRecord.data.key == "All") && record.data.goalAllView) {
                    goaltype = true;
                } else if (record.data.goalType == "Shared") {
                    if ((comboRecord.data.key == "Personal") && (record.data.goalUser.employeeId == logEmpId)) {
                        goaltype = true;
                    } else {
                        goaltype = false;
                    }
                }
                if (Ext.isEmpty(datefieldValue) || (Ext.Date.diff((new Date(record.data.targetdate)), datefieldValue, Ext.Date.DAY) >= 0)) {
                    dateValue = true;
                }
                return result >= 0 && mom_agendaValue && goalstatus && goaltype && dateValue;
            }, this);
        }
        if (!isComboSelect) {
            var searchfilterWin = btn.up('window'),
                form = searchfilterWin.down('form'),
                searchFilterIcon = goalsHeader.down('button[reference=searchfiltericon]'),
                labelRef = goalsHeader.down('label[reference=clearfilterRef]');
            //labelRef.setVisible(true);
            if (form.isDirty() || !Ext.isEmpty(buttongroupArr)) {
                if (labelRef.hasCls('x-hidden')) {
                    labelRef.removeCls('x-hidden');
                }
                searchfilterWin.hide();
            } else {
                if (!labelRef.hasCls('x-hidden')) {
                    labelRef.addCls('x-hidden');
                }
                Ext.Msg.alert("Error", "Atleast one parameter should be selected for filtering.");
            }
        }
    },
    onDraft: function(btn, e, eOpts) {
        //for this if condition to work, enableToggle has to be true in the buttons
        if (btn.pressed) {
            btn.removeCls('goals-btn-cls');
            btn.addCls('pressedBtnCls');
        } else {
            btn.removeCls('pressedBtnCls');
            btn.addCls('goals-btn-cls');
        }
    }
});

Ext.define('Goals.view.goals.SearchFilterWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.searchfilterwindowviewmodel',
    data: {
        filterView: false
    }
});

Ext.define('Goals.view.goals.SearchFilterWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.searchfilterwindow',
    requires: [
        'Goals.view.goals.SearchFilterWindowController',
        'Goals.view.goals.SearchFilterWindowViewModel',
        'Ext.form.field.Date',
        'Ext.container.ButtonGroup'
    ],
    controller: 'searchfilterwindowcontroller',
    viewModel: {
        type: 'searchfilterwindowviewmodel'
    },
    cls: 'momwindow-cls',
    modal: true,
    resizable: false,
    width: 600,
    maxHeight: 600,
    header: true,
    closable: true,
    listeners: {
        close: function(window) {
            window.down('form').reset();
        }
    },
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('feeds.Groups');
        if (!store.isLoaded()) {
            store.load();
        }
        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    items: [
        {
            xtype: 'form',
            width: '100%',
            height: '100%',
            bodyPadding: '10 10',
            layout: {
                type: 'vbox'
            },
            bbar: {
                cls: 'goal-bbar-cls ',
                height: 60,
                items: [
                    {
                        xtype: 'label',
                        cls: 'goal-dt-label-cls ',
                        text: 'Date : '
                    },
                    {
                        xtype: 'datefield',
                        width: 172,
                        cls: 'goal-date-cls',
                        editable: false,
                        required: true,
                        alwaysOnTop: true,
                        name: 'start_date',
                        disabledCls: 'notestatus-item-disabled',
                        reference: 'fromDate',
                        emptyText: 'YYYY-MM-DD',
                        format: 'Y-m-d',
                        createPicker: function() {
                            var me = this,
                                format = Ext.String.format;
                            return Ext.create('Ext.picker.Date', {
                                pickerField: me,
                                ownerCt: me.ownerCt,
                                renderTo: document.body,
                                floating: true,
                                hidden: true,
                                focusOnShow: true,
                                cls: 'ddo-create-datepicker',
                                minDate: me.minValue,
                                maxDate: me.maxValue,
                                disabledDatesRE: me.disabledDatesRE,
                                disabledDatesText: me.disabledDatesText,
                                disabledDays: me.disabledDays,
                                disabledDaysText: me.disabledDaysText,
                                format: me.format,
                                showToday: me.showToday,
                                startDay: me.startDay,
                                minText: format(me.minText, me.formatDate(me.minValue)),
                                maxText: format(me.maxText, me.formatDate(me.maxValue)),
                                listeners: {
                                    scope: me,
                                    select: me.onSelect
                                },
                                keyNavConfig: {
                                    esc: function() {
                                        me.collapse();
                                    }
                                }
                            });
                        }
                    },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        formBind: true,
                        reference: 'filtersearchbtn',
                        width: 10,
                        height: 10,
                        cls: 'search-icon-field',
                        listeners: {
                            click: 'onGoalsFliter'
                        }
                    }
                ]
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'goal',
                    required: true,
                    emptyText: 'Goal Name'
                },
                {
                    xtype: 'tagfield',
                    reference: 'comboTagview',
                    matchFieldWidth: false,
                    name: 'people_tag',
                    hideTrigger: true,
                    width: '100%',
                    // height: 40,
                    cls: 'share-group-cls',
                    forceSelection: false,
                    store: 'feeds.Groups',
                    emptyText: 'Search People',
                    displayField: 'tagName',
                    valueField: 'tagId',
                    disabledCls: 'mom-item-disabled',
                    bind: {
                        //    disabled: '{nonEditablePermit}',
                        value: '{tagId}'
                    },
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
                        '</ul>',
                        {
                            getGroupTags: function(values) {
                                if (typeof (values) === "object") {
                                    if (values.isGroup) {
                                        return values.tagName[0];
                                    }
                                }
                            },
                            getTags: function(values) {
                                if (typeof (values) === "object") {
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
                        select: function(combo, record, eOpts) {
                            combo.inputEl.dom.value = '';
                            combo.collapse();
                        }
                    }
                },
                {
                    xtype: 'buttongroup',
                    reference: 'btnGrpRef',
                    columns: 6,
                    cls: 'btn-grp-cls',
                    bodyPadding: '10 0 3 0',
                    defaults: {
                        cls: 'goals-btn-cls',
                        // pressedCls: 'goalschkd-btn-cls',
                        enableToggle: true,
                        width: 88,
                        height: 35,
                        margin: 4
                    },
                    items: [
                        {
                            text: 'Draft',
                            listeners: {
                                click: 'onDraft'
                            }
                        },
                        {
                            text: 'Pending',
                            listeners: {
                                click: 'onDraft'
                            }
                        },
                        {
                            text: 'In Progress',
                            listeners: {
                                click: 'onDraft'
                            }
                        },
                        {
                            text: 'Completed',
                            listeners: {
                                click: 'onDraft'
                            }
                        },
                        {
                            text: 'Cancel',
                            listeners: {
                                click: 'onDraft'
                            }
                        },
                        {
                            text: 'Achieved',
                            listeners: {
                                click: 'onDraft'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('Goals.view.goals.GoalsHeader', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.goalsheader',
    requires: [
        'Goals.store.goals.GoalsStore',
        'Goals.view.goals.SearchFilterWindow'
    ],
    initComponent: function() {
        Ext.getStore('Goals.store.goals.GoalsViewStore').load();
        Ext.getStore('Goals.store.goals.GoalsStore').load();
        this.callParent(arguments);
    },
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    defaultButton: 'search',
    cls: 'goals-headerview-cls',
    defaults: {
        margin: '0 0 20 0'
    },
    items: [
        {
            xtype: 'button',
            width: 6,
            cls: 'goals-search-icon',
            height: 6
        },
        {
            xtype: 'textfield',
            cls: 'search-field-cls',
            width: '40%',
            emptyText: 'Search Goals',
            handleMouseEvents: true,
            listeners: {
                'render': function(cmp) {
                    cmp.getEl().on('click', 'onSearchGoalFliter');
                }
            }
        },
        {
            xtype: 'button',
            cls: 'goals-search-btn-cls ',
            iconCls: 'goals-search-btn-icon',
            reference: 'searchfiltericon',
            listeners: {
                click: 'onSearchGoalFliter'
            }
        },
        {
            xtype: 'label',
            html: 'Clear Filters',
            name: 'goallabelfilter',
            reference: 'clearfilterRef',
            cls: 'clearfilter-cls x-hidden',
            listeners: {
                afterrender: 'onLabelFocus'
            }
        },
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'combobox',
            store: 'Goals.store.goals.GoalsStore',
            displayField: 'name',
            name: 'goaltypecombo',
            valueField: 'value',
            editable: false,
            reference: 'comboref',
            cls: 'select-goals-cls',
            listeners: {
                afterrender: 'oncomborender',
                change: 'onComboSelect'
            }
        }
    ]
});

Ext.define('Goals.view.goals.GoalsMainView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.goalsmainview',
    requires: [
        'Goals.view.RatingDetails',
        'Goals.view.goals.GoalsView',
        'Goals.view.goals.GoalsHeader'
    ],
    controller: 'searchgoalviewcontroller',
    cls: 'goals-dashboard-mainview-cls',
    width: "100%",
    height: "100%",
    layout: {
        type: 'fit'
    },
    tbar: {
        xtype: 'goalsheader'
    },
    items: [
        {
            xtype: 'goalsview'
        }
    ]
});

Ext.define('Goals.view.goals.GoalsNoteWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.goalsnotewindowcontroller',
    onWindowOutsideTap: function(event, target) {
        var view = this,
            searchfilterWin = Ext.ComponentQuery.query('searchfilterwindow')[0] || Ext.create('Goals.view.goals.SearchFilterWindow'),
            form = searchfilterWin.down('form');
        if (!form.isDirty()) {
            if (Utility.nominatAlert) {
                Utility.onWindowOutterTap(event, target, view);
            }
        }
    },
    onFormCancelClick: function(btn, e, eOpts) {
        var noteWindow, form;
        noteWindow = btn.up('window');
        form = noteWindow.down('form');
        form.reset();
        noteWindow.close();
    },
    onFormSaveClick: function(btn, e, eOpts) {
        var win = btn.up('window'),
            form = win.down('form'),
            gridStre = Ext.getStore('Goals.store.GoalsNotesStore'),
            formRec = form.getValues(),
            execPlanView = Ext.ComponentQuery.query('executiveplanview')[0],
            execPlan = Ext.ComponentQuery.query('executiveplanmainview')[0],
            execPlanViewModel = execPlanView.getViewModel(),
            goalid = execPlanViewModel.get('ddo_employeegoal_id');
        params = {
            goalid: goalid,
            type: "Standard",
            details: formRec.details
        };
        var notesobj = {
                details: formRec.details,
                notetype: "Standard",
                targetdate: new Date()
            };
        Ext.Ajax.request({
            url: '/goalnote',
            method: 'POST',
            params: params,
            success: function(resp, b) {
                Ext.getBody().unmask();
                gridStre.add(notesobj);
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
            }
        });
        win.close();
    }
});

Ext.define('Goals.view.goals.GoalsNoteWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.goalsnotewindowviewmodel'
});

Ext.define('Goals.view.goals.GoalsNoteWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Goals.view.goals.GoalsNoteWindowController',
        'Goals.view.goals.GoalsNoteWindowViewModel'
    ],
    alias: 'widget.goalsnotewindow',
    title: 'Add Notes',
    controller: 'goalsnotewindowcontroller',
    viewModel: {
        type: 'goalsnotewindowviewmodel'
    },
    modal: true,
    initComponent: function() {
        this.callParent(arguments);
        var comboStore = Ext.getStore('Goals.store.goals.GoalsStatusComboStore');
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
    width: 600,
    height: 300,
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 21 0',
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
                    xtype: 'textarea',
                    name: 'details',
                    emptyText: 'Details',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('Goals.view.goals.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.goals-main',
    requires: [
        'Goals.view.goals.GoalsView',
        'Goals.view.ExecutivePlanMain',
        'Goals.view.ExecutivePlanView',
        'Goals.view.goals.GoalsMainView'
    ],
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            layout: 'card',
            activeItem: 1,
            height: 700,
            items: [
                {
                    xtype: "executiveplanmainview"
                },
                {
                    xtype: "goalsmainview"
                }
            ]
        });
        me.callParent(arguments);
    }
});

Ext.define('Goals.view.goals.SearchGoalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.searchgoalviewmodel'
});

