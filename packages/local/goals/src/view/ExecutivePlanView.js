/**
 * This view is responsible for all tab in goals view.
 * @class 'Goals.view.ExecutivePlanView'
 * @extends 'Ext.container.Container'
 * @alias 'widget.executiveplanview'
 * @ViewModel 'Goals.view.ExecutivePlanViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
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
        'Goals.view.RatingDetails',
        'Goals.view.ShareGoalsForm',
        'Goals.view.ManagerRatingForm',
        'Goals.view.ExecutivePlanForm',
        'Goals.view.ExecutivePlanViewModel'
    ],

    viewModel: {
        type: 'executiveplanview'
    },

    items: [{
        xtype: 'hiddenfield',
        name: 'ddo_employeegoal_id'
    }, {
        xtype: 'tabpanel',
        cls: 'goalstab-cls',
        items: [{
            title: LabelsTitles.GOALS.EXECUTIVEVIEW.MEASUREMENTCRITERIA,
            iconCls: 'goalmeasurement-icon',
            width: '100%',
            bind: {
                disabled: '{tab1}'
            },
            items: [{
                xtype: 'container',
                width: '99%',
                margin:'0 5',
                items: [{
                    xtype: 'htmleditor',
                    cls: 'goalshtmleditor-cls',
                    name: 'measurementCriteria',
                    width: '100%',
                    bind: {
                        disabled: '{editorOrGridDisable}'
                    }
                }, {
                    xtype: 'textarea',
                    width: '100%',
                    cls: 'employee-setup-txtfield-cls',
                    reference: 'commentsref',
                    emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.COMMENT,
                    bind: {
                        hidden: '{visibilityMode}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                style: {
                    "background-color": '#f6f6f6'
                },
                items: [{
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
                }, {
                    xtype: 'button',
                    reference:'approveBtnRef',
                    bind: {
                        disabled:'{apprvedisabled}',
                        text: '{approveText}',
                        hidden: '{BtnvisibilityMode}'
                    },
                    margin: '30px 10px',
                    statusId: 2,
                    cls: 'goalhtml-updatebtn-cls',
                    listeners: {
                        click: 'onExecutivePlanApproval'
                    }
                }]
            }]
        }, {
            title: LabelsTitles.GOALS.EXECUTIVEVIEW.TITLE,
            iconCls: 'financeicon-cls',
            bind: {
                disabled: '{tab2}'
            },
            items: [{
                xtype: 'executiveplanform',
                width: '100%',
                reference: 'executiveplanformRef'
            }, {
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
                items: [{
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
                }, {
                    xtype: 'button',
                    reference: 'execapprovalref',
                    bind: {
                        text: '{approveText}',
                        disabled:'{apprvedisabled}',
                        hidden: '{BtnvisibilityMode}'
                    },
                    margin: '30px 10px',
                    cls: 'goalhtml-updatebtn-cls',
                    listeners: {
                        click: 'onExecutivePlanApproval'
                    }
                }]
            }]
        }, {
            title: LabelsTitles.GOALS.EXECUTIVEVIEW.SHAREWITH,
            iconCls: 'usersicon-cls',
            bind: {
                disabled: '{tab3}'
            },
            items: [{
                xtype: 'container',
                width: '100%',
                cls: 'ratingdetailcontainer-cls',
                items: [{
                    xtype: 'sharegoalsform',
                    cls: 'sharegoalsform-cls'
                }, {
                    xtype: 'container',
                    cls: '',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },

                    items: [{
                        xtype: 'button',
                        text: LabelsTitles.GOALS.EXECUTIVEVIEW.UPDATE,
                        margin: '30px 10px',
                        listeners: {
                            click: 'onShareUpdate'
                        }
                    }]
                }]
            }]

        }, {
            title: LabelsTitles.GOALS.EXECUTIVEVIEW.RATING,
            reference: 'ratingref',
            iconCls: 'charticon-cls',
            bind: {
                disabled: '{tab4}'
            },
            items: [{
                xtype: 'container',
                layout: 'card',
                items: [{
                    xtype: 'managerratingform',
                    width: '100%'
                }, {
                    xtype: 'ratingdetails',
                    width: '100%'
                }]
            }, {
                xtype: 'radiogroup',
                width: '100%',
                bind: {
                    hidden: '{MngrVisibilityMode}'
                },
                columns: 2,
                vertical: true,
                items: [{
                    boxLabel: LabelsTitles.GOALS.EXECUTIVEVIEW.CANCELGOAL,
                    name: 'rb',
                    inputValue: '1'
                }, {
                    boxLabel: LabelsTitles.GOALS.EXECUTIVEVIEW.COMPLETE,
                    name: 'rb',
                    inputValue: '2',
                    checked:true,
                    padding:'0px 0px 0px 10px'
                }],
                listeners:{
                    change:'onradiochange'
                }
            }, {
                xtype: 'textarea',
                cls: 'employee-setup-txtfield-cls',
                width: '100%',
                hidden: true,
                reference: 'commentsratingref',
                emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.COMMENT,
                bind: {
                    hidden: '{EmpVisibilityMode}'
                }
            }, {
                xtype: 'container',
                margin: '10 0 0 0',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items: [{
                    xtype: 'button',
                    text: LabelsTitles.GOALS.EXECUTIVEVIEW.MOVEDRAFT,
                    margin: '0px 30px 0px 10px',
                    statusId: 6,
                    cls: 'ratingsavebtn',
                    scale: 'large',
                    bind: {
                        hidden: '{isUpdateNeed}'
                    },
                    handler: 'onDraftsBtnClick'
                }, {
                    xtype: 'button',
                    text: LabelsTitles.GOALS.EXECUTIVEVIEW.MOVEDRAFT,
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
                }, {
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
                }]
            }]
        }, {
            title: LabelsTitles.GOALS.EXECUTIVEVIEW.NOTESTXT,
            bind: {
                disabled: '{tab5}'
            },
            width:'100%',
            items: [{
                xtype: 'container',
                width:'100%',
                items: [{
                    xtype: 'tbfill',
                    width: Constants.ViewportWidth * 0.11
                }, {
                    xtype: 'notes',
                    width: '100%'
                },{
                    xtype: 'button',
                    text:LabelsTitles.GOALS.EXECUTIVEVIEW.ADDICON,
                   cls:'fab-button',
                    listeners: {
                        click: 'onAddNewClick'
                    }
                }]
            }]
        }]
    }]
});
