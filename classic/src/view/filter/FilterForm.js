/**
 * This view is responsible for displaying feed filter form and it's related operations.
 * @class 'DDO.view.filter.FilterForm'
 * @extends 'Ext.form.Panel'
 * @alias 'widget.filterform'
 * @ViewModel 'DDO.view.filter.FilterWindowViewModel'
 * @Controller 'DDO.view.filter.FilterWindowController'
 */
Ext.define('DDO.view.filter.FilterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.filterform',

    requires: [
        'DDO.view.filter.FilterWindowController',
        'DDO.view.filter.FilterWindowViewModel',
        'DDO.ux.DateRangeField'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    cls: 'DDO-filterForm-cls',

    controller: 'filterwindowcontroller',
    viewModel: {
        type: 'filterwindowviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        Ext.getStore('projects.EmpNamesStore').load();
    },
    
    items: [{
            xtype: 'container',
            defaults: {
                margin: '10 10'
            },
            layout: {
                type: 'vbox'
            },
            items: [{
                xtype: 'container',
                width: "100%",
                defaults: {
                    margin: '20 20'
                },
                layout: {
                    type: 'hbox'
                },
                items: [{
                        xtype: 'combobox',
                        width: "50%",
                        margin: '10 20',
                        fieldLabel: LabelsTitles.HOME.FEEDS.AUTHOR,
                        name: "author",
                        emptyText: LabelsTitles.HOME.FEEDS.AUTHORNAME,
                        reference: 'addFilterCombo',
                        forceSelection: true,
                        cls: 'ddoo-addfilter-combo',
                        store: "projects.EmpNamesStore",
                        displayField: 'user_full_name',
                        valueField: 'user_id',
                        queryMode: 'local',
                        typeAhead: true,
                        minChars: 3,
                        enableKeyEvents: true,
                        hideTrigger: true,
                        labelAlign: 'top',
                        bind: {
                            value: '{employee_name}'
                        },
                        listeners: {
                            change: "onComboBoxChange"
                        },
                        triggers: {
                            clear: {
                              type: 'clear',
                              weight: -1,
                              hideWhenMouseOut: true,
                              hideWhenEmpty: true,
                              handler: function(cmp) {
                                if (Ext.isFunction(cmp.clearValue)) {
                                  cmp.clearValue();
                                } else {
                                  cmp.setValue('');
                                }
                
                              }
                            }
                          }
                    },
                    {
                        xtype: "daterangefield",
                        fieldLabel: LabelsTitles.HOME.FEEDS.DATERANGE,
                        cls: 'ddoo-addfilter-combo',
                        emptyText: LabelsTitles.HOME.FEEDS.SELECTRANGE,
                        width: "50%",
                        margin: '10 20 10 5',
                        name: 'dateRange',
                        labelAlign: 'top',
                        listeners: {
                            change: 'onDateRangeFieldChange'
                        }
                    }
                ]
            }, {
                xtype: 'label',
                margin: '5 30',
                text: LabelsTitles.HOME.FEEDS.POSTTYPE,
                cls: 'posttype-text-cls'
            }]

        },
        {
            xtype: 'buttongroup',
            cls: 'filterbtn-grp-cls',
            width: 100,
            margin: '10 30',
            columns: 3,
            allowBlank: true,
            items: [{
                    text: LabelsTitles.HOME.FEEDS.UPDATE,
                    value: 'standard',
                    listeners: {
                        click: "onBtnSelect"
                    }
                },
                {
                    text: LabelsTitles.HOME.FEEDS.IDEATE,
                    value: 'idea',

                    listeners: {
                        click: "onBtnSelect"
                    }
                },
                {
                    text: LabelsTitles.HOME.FEEDS.BOTH,
                    listeners: {
                        click: "onBtnSelect"
                    },
                    value: 'Both'
                }
            ],
            defaults: {
                cls: 'filterwin-btn-cls',
                width: 130,
                height: 35
            }

        },
        {
            xtype: 'hiddenfield',
            name: 'filter',
            value: true
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        width: '100%',
        margin: '0 0 30 0',
        dock: "bottom",
        fixed: true,
        items: [{
            xtype: "tbfill"
        }, {
            xtype: 'button',
            reference:"applybtn",
            text: LabelsTitles.HOME.FEEDS.APPLY,
            width: 150,
             bind: {
                 disabled: '{gobutton}'
             },
            ui: 'roundedbutton',
            cls: 'filter-submit-btn',
            handler: 'onGoButtonClick'
        }, {
            xtype: "tbfill"
        }]
    }]
});