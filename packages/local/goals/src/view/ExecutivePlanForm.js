/**
 * This view is responsible for Executive plan form in goals view.
 * @class 'Goals.view.ExecutivePlanForm'
 * @extends 'Ext.form.Panel'
 * @alias 'widget.executiveplanform'
 * @ViewModel 'Goals.view.ExecutivePlanViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
Ext.define('Goals.view.ExecutivePlanForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.executiveplanform',
    layout: {
        type: 'fit'
    },
    maxHeight: Constants.ViewportHeight * 0.388,
    requires: [
        'Goals.store.ExecutiveStore'
    ],
    items: [{
        xtype: 'grid',
        bind: {
            disabled: '{GridDisable}'
        },
        disabledCls: 'goal-gridcls',
        maxHeight: Constants.ViewportHeight * 0.37,
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
        bbar: [{
            xtype: 'button',
            // text: LabelsTitles.GOALS.EXECUTIVEVIEW.ADDNEWTASK,
            text: 'Add New Task',
            cls: 'goalsaddbtn-cls',
            bind: {
                hidden: '{addTaskDisable}'
            },
            iconCls: 'x-fa fa-plus',
            handler: 'onAddTaskClick'
        }],
        cls: 'goalsgrid-cls',
        store: 'Goals.store.ExecutiveStore',
        columns: [{
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
        }, {
            xtype: 'actioncolumn',
            menuDisabled: true,
            bind: {
                hidden: '{istodoDelete}'
            },
            flex: 0.1,
            items: [{
                icon: '../resources/images/goals/delete.png',
                margin: 10,
                tooltip: LabelsTitles.GOALS.EXECUTIVEVIEW.DEL,
                cls: 'goaldelete-cls',
                handler: 'onTodoDeleteClick',
                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                    // hide this action if row data flag indicates it is not deletable
                    if (r.data.deletable == false) {
                        return "hideDisplay";
                    } else if (r.data.deletable) {
                        return "showDisplay";
                    }
                }
            }]
        }, {
            xtype: 'gridcolumn',
            text: LabelsTitles.GOALS.EXECUTIVEVIEW.TASK,
            emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.TASKNAME,
            editor: {
                xtype: 'textarea',
                allowBlank: false,
                height: 50,
                width: Constants.ViewportWidth*0.344
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
        }, {
            xtype: 'widgetcolumn',
            text: LabelsTitles.GOALS.EXECUTIVEVIEW.TARGETDATE,
            dataIndex: 'targetdate',
            flex: 0.6,
            widget: {
                xtype: 'datefield',
                allowBlank: false,
                cls: 'goalsdate-cls',
                itemId: 'goaldtfieldref',
                readOnly: true,
                emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.DATE,
                format: 'd-m-Y',
                fieldCls: 'goaldateicon-cls'
            },
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                editable: false,
                emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.DATE,
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
        }, {
            xtype: 'widgetcolumn',
            text: LabelsTitles.GOALS.EXECUTIVEVIEW.DURATION,
            dataIndex: 'timerequired',
            flex: 0.4,
            widget: {
                xtype: 'numberfield',
                allowBlank: false,
                cls: 'goalsdate-cls',
                fieldCls: 'goalhoursicon-cls',
                emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.HOURS,
                readOnly: true
            },
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.HOURS,
                fieldCls: 'goalhoursicon-cls',
                hideTrigger: true
            }
        }],
        width: Constants.ViewportWidth*0.293
    }]
});
