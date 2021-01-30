/**
 * This view is responsible for executive plan header in goals view.
 * @class 'Goals.view.ExecutivePlanHeader'
 * @extends 'Ext.form.Panel'
 * @alias 'widget.executiveplanheader'
 * @ViewModel 'Goals.view.ExecutivePlanMainViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
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

    items: [{
        layout: 'vbox',
        defaults: {
            width: Constants.ViewportWidth*0.476,
            labelSeparator: ''
        },
        items: [{
            xtype: 'textfield',
            cls: 'header-fields-design',
            fieldLabel: LabelsTitles.GOALS.EXECUTIVEVIEW.GOALNAME,
            name: 'goalname',
            emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.GOALNAME
        }, {
            xtype: 'combo',
            reference: 'parentgoalref',
            fieldLabel: LabelsTitles.GOALS.EXECUTIVEVIEW.PARENTGOAL,
            emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.PARENTGOAL,
            cls: 'header-combo-fields-design',
            store: 'Goals.store.goals.GoalsParentComboStore',
            valueField: 'goalid',
            displayField: 'goalname',
            triggerAction: 'all',
            editable: false,
            triggers: {
                clear: {
                    cls:'ddo-trigger-clear x-form-clear-trigger',
                    type: 'cleartrigger',
                    weight:-1,
                    hideWhenEmpty: true
                }
            },
            bind: {
                readOnly: '{goalFieldReadyOnly}'
            },
            listeners:{
                change:function(combo, newVal, oldValue, opts) {
                    if(newVal){
                        combo.setValue(newVal);
                    }                    
                }
            }
        }]
    }, {
        layout: 'vbox',
        defaults: {
            labelSeparator: '',
            cls: 'header-fields'
        },
        items: [{
            layout: 'hbox',
            items: [{
                html: LabelsTitles.GOALS.EXECUTIVEVIEW.PROGRESS,
                width: Constants.ViewportWidth*0.073
            }, {
                xtype: 'panel',
                width: Constants.ViewportWidth*0.095,
                margin: '0 2 8 0',
                items: [{
                    xtype: 'progressbar',
                    ui: 'goalprogressbar',
                    value: 0
                }]
            }, {
                xtype: 'label',
                margin: '0 0 0 10',
                cls: 'progress-header',
                html: '0%',
                listeners: {
                    render: 'setProgressBarValue'
                }
            }]
        }, {
            xtype: 'datefield',
            name: 'targetDate',
            width: Constants.ViewportWidth*0.19,
            minValue: new Date(),
            fieldLabel: LabelsTitles.GOALS.EXECUTIVEVIEW.TARGETDATE,
            format: 'd-m-Y',
            formatText:null,
            maskRe: /[0-9\-\/]/,
            bind: {
                readOnly: '{goalFieldReadyOnly}'
            },
            listeners: {
                change: 'onTargetDateChange',   
                focusleave:function(dateField, e, eOpts){
                    Utility.onDateField (dateField, e, eOpts)
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
        }]
    }]
});
