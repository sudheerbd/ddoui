/**
 * This view is responsible for search filter window in goals view.
 * @class 'Goals.view.goals.SearchFilterWindow'
 * @extends 'Ext.window.Window'
 * @alias 'widget.searchfilterwindow'
 * @ViewModel 'Goals.view.goals.SearchFilterWindowController'
 * @Controller 'Goals.view.goals.SearchFilterWindowViewModel'
 */
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
    width: Constants.ViewportWidth * 0.439,
    maxHeight: Constants.ViewportHeight * 0.93,
    header: true,
    closable: true,
    listeners:{
        close:function(window){
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

    items: [{
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
            items: [{
                xtype: 'label',
                cls: 'goal-dt-label-cls ',
                text: LabelsTitles.GOALS.GOALMAIN.DATE
            }, {
                xtype: 'datefield',
                width: Constants.ViewportWidth * 0.126,
                cls: 'goal-date-cls',
                editable: false,
                required: true,
                alwaysOnTop: true,
                name: 'start_date',
                disabledCls: 'notestatus-item-disabled',
                reference: 'fromDate',
                emptyText: LabelsTitles.GOALS.GOALMAIN.DATEEMPTYTEXT,
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
            }, {
                xtype: 'tbfill'
            }, {
                xtype: 'button',
                formBind: true,
                reference:'filtersearchbtn',
                width: 10,
                height: 10,
                cls: 'search-icon-field',
                listeners: {
                    click: 'onGoalsFliter'
                }
            }]
        },
        items: [{
            xtype: 'textfield',
            name: 'goal',
            required: true,
            emptyText: LabelsTitles.GOALS.GOALMAIN.GOALNAME
        }, {
            xtype: 'tagfield',
            reference: 'comboTagview',
            matchFieldWidth: false,
            name: 'people_tag',
            hideTrigger: true,
            width: '100%',
            cls: 'share-group-cls',
            forceSelection: false,
            store: 'feeds.Groups',
            emptyText: LabelsTitles.GOALS.GOALMAIN.SEARCHPEOPLE,
            displayField: 'tagName',
            valueField: 'tagId',
            disabledCls: 'mom-item-disabled',
            bind: {
                value: '{tagId}'
            },
            queryMode: 'local',
            filterPickList: true,
            listConfig: {
                cls: 'tag-view-list',
                width: Constants.ViewportWidth * 0.22
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
                select: function(combo, record, eOpts) {
                    combo.inputEl.dom.value = '';
                    combo.collapse();
                },
                beforequery: function(search){
                    search.query = new RegExp(search.query, 'i');
                    search.forceAll = true;
                }
            }
        },{
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
            items: [{
                text: LabelsTitles.GOALS.GOALMAIN.DRAFT,
                listeners: {
                    click: 'onDraft'
                }
            }, {
                text: LabelsTitles.GOALS.GOALMAIN.PENDING,
                listeners: {
                    click: 'onDraft'
                }
            }, {
                text: LabelsTitles.GOALS.GOALMAIN.INPROGRESS,
                listeners: {
                    click: 'onDraft'
                }
            }, {
                text: LabelsTitles.GOALS.GOALMAIN.COMPLETED,
                listeners: {
                    click: 'onDraft'
                }
            },{
                text: LabelsTitles.GOALS.GOALMAIN.CANCEL,
                listeners: {
                    click: 'onDraft'
                }
            },{
                text: LabelsTitles.GOALS.GOALMAIN.ACHIEVED,
                listeners: {
                    click: 'onDraft'
                }
            }]
        }]
    }]
});