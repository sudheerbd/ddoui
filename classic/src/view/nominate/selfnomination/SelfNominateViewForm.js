
/**
 *   This file is responsible for Self Nominate View Form.
 *   parent: 'DDO.view.profile.nominateview.SelfNominationPage' is the parent file.
 *   ViewModel : 'DDO.view.profile.nominateview.SelfNominateViewFormModel'
*   ViewController : 'DDO.view.nominate.SelfNominateWindowController'
 */
Ext.define('DDO.view.nominate.selfnomination.SelfNominateViewForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.selfnominateviewform',
    requires: [
        'DDO.model.karmasetup.KarmaCategoriesModel',
        'DDO.store.karmasetup.KarmaCategoriesStore'
    ],
    cls: "ddo-rating-form",
    layout: {
        type: 'hbox'
    },
    reference: "selfnominateviewform",
    items: [{
            xtype: 'fieldcontainer',
            layout: 'vbox',
            width:550,
            items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    // width: Constants.ViewportWidth * 0.34,
                    width: 196,
                    height: 60,
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'karmaGivenDate',
                            reference: 'karmaGivenDate',
                            format: 'F,Y',
                            emptyText: LabelsTitles.NOMINATION.SELECTEMPTYTEXT,
                            fieldLabel: LabelsTitles.NOMINATION.MONTH,
                            labelAlign: "top",
                            margin: '0 0 0 10',
                            labelStyle: "height:25px",
                            flex: 1,
                            allowPrevMonthCount: 1,
                            selectMonth: null,
                            cls: 'employeeexitcombo-cls',
                            editable: false,
                            enableKeyEvents: true,
                            createPicker: function () {
                                var me = this,
                                    format = Ext.String.format;
                                return Ext.create('Ext.picker.Month', {
                                    pickerField: me,
                                    ownerCt: me.ownerCt,
                                    renderTo: document.body,
                                    floating: true,
                                    cls: 'self-nominate-month-picker',
                                    hidden: true,
                                    focusOnShow: true,
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
                                    allowPrevMonthCount: me.allowPrevMonthCount,
                                    listeners: {
                                        select: 'onDateSelect',
                                        monthdblclick: 'onDateOKClick',
                                        yeardblclick: 'onDateOKClick',
                                        OkClick: 'onDateOKClick',
                                        CancelClick: 'onDateCancelClick',
                                        activate: 'onActiveDateField'
                                    },
                                    keyNavConfig: {
                                        esc: function () {
                                            me.collapse();
                                        }
                                    }
                                });
                            },
                            listeners: {
                                collapse: 'onDateFieldCollapse'
                            }
                        },
                        // {
                        //     xtype: 'tbspacer',
                        //     width: 330
                        // },
                        // {
                        //     xtype: 'container',
                        //     region: "west",
                        //     cls: 'nominate-karmascore-cls',
                        //     name: 'visitor_score',
                        //     reference:'visitorscore',
                        //     width: Constants.ViewportWidth * 0.09,
                        //     height: Constants.ViewportHeight * 0.33,
                          
                        //     bind: {
                        //         html: '<div class="karmascoreval-cls">{points}</div></div><div class="nominate-cls-text-above-icon">Karma Projected </div>'
                        //     },
                            
                        // },

                    ]
                },
                {
                    layout: 'hbox',

                    items: [ {
                            xtype: 'combobox',
                            name: 'categories',
                            editable: false,
                            forceSelection: true,
                            reference: 'karmacategory',
                            // flex: 0.15,
                            width: 190,
                            margin: '0 0 10 10',
                            padding: '5 0 10 32',
                            emptyText: LabelsTitles.NOMINATION.CATEGORY,
                            fieldLabel: LabelsTitles.NOMINATION.CATEGORYEMPTYTEXT,
                            labelAlign: "top",
                            labelStyle: "height:25px",
                            cls: 'employeeexitcombo-cls',
                            displayField: 'name',
                            valueField: 'ddo_karmacategory_id',
                            enableKeyEvents: true,
                            minChars: 3,
                            labelSeparator: '',
                            queryMode: 'local',
                            autoLoad: true,
                            store: "karmasetup.KarmaCategoriesStore",
                            listeners: {
                                change: 'onCategorySelect'
                            }
                        },
                        {
                        xtype: 'combobox',
                        reference: 'selfnominateempcombo',
                        name: 'emp_id_combo',
                        width: Constants.ViewportWidth * 0.14,
                        editable: true,
                        forceSelection: true,
                        margin: '0 0 0 10',
                        emptyText: 'Select',
                        fieldLabel: "Employee",
                        labelAlign: "top",
                        labelStyle: "height:25px",
                        cls: 'employeeexitcombo-cls',
                        displayField: 'user_full_name',
                        valueField: 'user_id',
                        enableKeyEvents: true,
                        minChars: 3,
                        hidden: true,
                        labelSeparator: '',
                        typeAhead: true,
                        queryMode: 'local',
                        autoLoad: true,
                        store: "projects.EmpNamesStore",
                        listeners: {
                            change: 'onEmpComboSelect'
                        }
                    
                }, {
                    // xtype: 'fieldcontainer',
                    // layout: 'hbox',
                    // flex:0.56,    
                    // width: Constants.ViewportWidth * 0.41,
                    // margin: '5 0 0 0',
                    // items: [{
                            xtype: 'combobox',
                            reference: 'selfnominatekarmacombo',
                            name: 'karmacombo',
                            forceSelection: true,
                            editable: false,
                            margin: '0 0 0 20',
                            width: 190,
                            emptyText: LabelsTitles.NOMINATION.SELECTEMPTYTEXT,
                            fieldLabel: LabelsTitles.NOMINATION.KARMA,
                            labelAlign: "top",
                            labelStyle: "height:25px",
                            cls: 'employeeexitcombo-cls',
                            labelSeparator: '',
                            bind: {
                                value: '{karmaComboValue}'
                            },
                            store: 'karmasetup.KarmaNominateStore',
                            displayField: 'name',
                            valueField: 'ddo_karma_id',
                            allowBlank: false,
                            listeners: {
                                change: 'onKarmaComboChange'
                            }
                        },
                         {
                            xtype: 'combobox',
                            width: 120,
                            reference: 'selfnominatefreqcombo',
                            name: 'freqcombo',
                            forceSelection: true,
                            editable: false,
                            emptyText: LabelsTitles.NOMINATION.SELECTEMPTYTEXT,
                            fieldLabel: LabelsTitles.NOMINATION.SELECTFREQUENCY,
                            labelStyle: "height:25px",
                            labelSeparator: '',
                            labelAlign: "top",
                            hidden: true,
                            margin: '0 0 0 10',
                            cls: 'ddo-adddetails-combo',
                            displayField: 'name',
                            allowBlank: false,
                            valueField: 'value',
                            bind: {
                                store: '{SelfNominationFrequencyComboStore}',
                                disabled: '{isFreqComboDisabled}'
                            },
                            listeners: {
                                change: 'OnFrequencySelect'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Achievement',
                            margin: '0 0 0 20',
                            emptyText: LabelsTitles.NOMINATION.ACHIEVEMENTEMPTYTEXT,
                            cls: 'num-field',
                            cls: 'employeeexitcombo-cls',
                            name: 'karmaunits',
                            reference: "karmaUnits",
                            labelSeparator: '',
                            labelStyle: "height:25px",
                            labelAlign: 'top',
                            blankText: 'Value should be 1 or more!',
                            emptyText: '00',
                            width: 93,
                            minValue: 1,
                            allowBlank: false,
                            hideTrigger: true,
                            enableKeyEvents: true,
                            bind: {
                                value: '{karmaUnits}'
                            },
                            listeners: {
                                change: 'onRuleFocusLeave'
                            }
                        },
                        
                       
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    // width: Constants.ViewportWidth * 0.41,
                    width: 680,
                    // height:60,
                    // margin: '5 10 0 0',
                    items: [{
                        width: 513,
                        // cls: 'textareaBorder htmledit-lable',
                        xtype: 'textarea',
                        name: 'comments',
                        emptyText:'Remarks',
                        // padding: '5px',
                        allowBlank: false,
                        cls:'x-form-textarea-nominate',
                        // Cls: 'html-no-border',
                        enableAlignments: false,
                        enableKeyEvents: true,
                        scrollable: 'x',
                        // grow: true,
                        bind: {
                            fieldLabel: 'Comment should be minimum of {minChars} characters'
                        },
                        reference: 'selfratingcomment',
                        
                        labelSeparator: '',
                        // cls: 'cls-for-textarea',
                        margin: '14 0 0 10',
                        // width: Constants.ViewportWidth * 0.40,
                        
                        height:60,
                        labelAlign: 'top',
                        listeners: {
                            keyup: 'onTextAreaLength',
                           
                        }
                        //     change: function(field) {
                        //         var body = field.getEditorBody();
                        //         field.setHeight(body.offsetHeight);
                        //       },
                        //     render: function (editor) {
                        //         editor.getToolbar().hide();
                        //     },
                        //     initialize: function(field) {
                        //         var body = field.getEditorBody();
                        //         body.style.overflow = 'hidden';
                        //         Ext.DomHelper.applyStyles(body, {
                        //           'word-wrap': 'break-word'
                        //         });
                        //       },
                        // },
                        // setEmptyText: function() {
                        //     var emptyText;
                        //     emptyText = Ext.String.format(this.emptyTextTpl, this.emptyText);
                        //     this.setValue(Ext.String.format(this.emptyTextTpl, this.emptyText))
                        //   }
                    }, 
                    // {
                    //     xtype: 'button',
                    //     text: 'Add',
                    //     // margin: '20px 0px 0px 0px',
                    //     bind: {
                    //         disabled: '{addButton}'
                    //     },
                    //     reference: 'addBtn',
                    //     handler: 'onAddBtn',
                    //     cls: 'add-btn-self-nominate',
                    //     width: 115
                    // },
                ]
                }
            ]
        },
        {
            xtype: 'fieldcontainer',
            layout: 'fit',
            cls: 'nominate-karmascore-container-cls',
            items: [
                {
                    xtype: 'container',
                    region: "west",
                    cls: 'nominate-karmascore-cls',
                    name: 'visitor_score',
                    reference:'visitorscore',

                    width: Constants.ViewportWidth * 0.09,
                    height: Constants.ViewportHeight * 0.33,
                  
                    bind: {
                        html: '<div class="karmascoreval-cls">{points}</div></div><div class="nominate-cls-text-above-icon">Karma Projected </div>'
                    },
                    
                },
                
                {
                    xtype: 'button',
                    text: 'Add',
                    // margin: '20px 0px 0px 0px',
                    bind: {
                        disabled: '{addButton}'
                    },
                    reference: 'addBtn',
                    handler: 'onAddBtn',
                    cls: 'add-btn-self-nominate',
                    width: 115,
                    height: '36px'
                },
                // {
                //     xtype: 'button',
                //     text: 'Add',
                //     margin: '20px 0px 0px 0px',
                //     bind: {
                //         disabled: '{addButton}'
                //     },
                //     reference: 'addBtn',
                //     handler: 'onAddBtn',
                //     cls: 'add-btn-self-nominate',
                //     width: 110
                // }, 
                // {
                //     xtype: 'fieldcontainer',
                //     layout: 'hbox',
                //     items: [{
                //             html: 'SentBack',
                //             margin: '22 0 0 24',
                //         }, {
                //             xtype: 'container',
                //             region: "west",
                //             tooltip: 'SentBackNominations',
                //             name: 'visitor_score',
                //             width: 30,
                //             bind: {
                //                 html: '<div style= "background: #0277a3 !important;cursor:pointer;color:#fff;margin:21px 5px 0 5px;text-align: center;padding:5.5% 0% 0% 0%;border-radius:30%">{sentBackNomCount}</div>'
                //             },
                //             listeners: {
                //                 element: 'el',
                //                 click: function () {
                //                     Ext.ComponentQuery.query('selfnominatewindow')[0].down('tabpanel').setActiveTab(1);
                //                 },

                //             }
                //         }

                //     ]
                // }
            ]
        }
    ]
});

