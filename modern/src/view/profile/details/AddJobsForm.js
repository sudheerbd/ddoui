/**
 * The file AddJobsForm is the view file for the form view for add jobs button.
 * @ViewModel : 'DDO.view.profile.details.AddJobsFormViewModel'
 * @ViewController : 'DDO.view.profile.details.AddJobsFormViewController'.
 */
Ext.define('DDO.view.profile.details.AddJobsForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'DDO.view.profile.details.AddJobsFormViewController',
        'DDO.view.profile.details.AddJobsFormViewModel',
        'Ext.field.Field'
    ],

    alias: 'widget.addjobsform',

    reference: 'addjobsform',

    layout: {
        type: 'vbox'
    },

    cls: 'ddo-jobs-form',

    modal: true,
    centered: false,
    hideOnMaskTap: true,
    fullscreen: true,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    controller: 'addjobsformviewcontroller',

    viewModel: {
        type: 'addjobsformviewmodel'
    },

    /**
     * @property {String} [operation="addform"]
     * Used to recognize whether the form is used to add a new rec or
     * update an existing record.
     * Takes either of these values:
     *      - addform
     *      - editform
     */
    operation: 'addform',

    scrollable: false,

    defaults: {
        width: '100%',
        msgTarget: 'side'
    },

    itemId: 'addjobsform',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-addjobscontainer-toolbar',
        bind: {
            title: '{jobsFormTitle}'
        },
        items: [{
            xtype: 'button',
            icon: 'resources/images/arrow_left.png',
            cls: 'ddo-addjobscontainer-backbtn',
            listeners: {
                tap: 'onEditExperienceBackBtnTap'
            }
        }, {
            xtype: 'spacer'
        }, {
            xtype: 'button',
            text: 'Save',
            reference: 'savebutton',
            itemId: 'savebutton',
            ui: 'savebutton',
            disabled: true,
            cls: 'ddo-addjobscontainer-savebtn',

            listeners: {
                tap: 'onSaveBtnClick'
            }
        }]
    }, {
        xtype: 'container',
        padding: '20px 10px 10px',
        items: [{
            xtype: 'textfield',
            clearIcon: false,
            labelAlign: 'top',
            labelSeparator: '',
            placeHolder: 'Designation',
            name: 'designation_when_left',
            emptyText: 'Designation',
            cls: 'ddo-mobile-textfield-cls',
            itemId: 'titleId',
            required: true,
            listeners: {
                keyup: 'onTextEnter'
            }
        }, {
            xtype: 'hiddenfield',
            name: 'hr_employee_workex_id'
        }, {
            xtype: 'textfield',
            clearIcon: false,
            padding: '5px 0px 0px 0px',
            labelAlign: 'top',
            labelSeparator: '',
            placeHolder: 'Company',
            name: 'company',
            emptyText: 'Company',
            cls: 'ddo-mobile-textfield-cls',
            required: true,
            listeners: {
                keyup: 'onTextEnter'
            }
        }, {
            xtype: 'textfield',
            clearIcon: false,
            padding: '5px 0px 0px 0px',
            labelAlign: 'top',
            labelSeparator: '',
            name: 'cityname',
            placeHolder: 'Location',
            emptyText: 'Location',
            cls: 'ddo-mobile-textfield-cls',
            itemId: 'locationId',
            required: true,
            listeners: {
                keyup: 'onTextEnter'
            }
        }, {
            xtype: 'label',
            html: 'Time Period',
            cls: 'ddo-timeperiod-label'
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                    xtype: 'datepickerfield',
                    reference: 'jobsFormStartDate',
                    required: true,
                    placeHolder: 'Start date',
                    cls: 'ddo-startdate-datepickerfield ddo-mobile-textfield-cls',
                    width: '47%',
                    labelAlign: 'top',
                    dateFormat: 'F Y',
                    picker: {
                        xtype: 'datepicker',
                        slotOrder: ["month", "year"],
                        value: (new Date()), // use this if you DON'T want/have a value in the actual input
                        yearFrom: (new Date()).getFullYear(),
                        yearTo: 1970
                    },
                    listeners: {
                        change: 'StartDate'
                    }

                }, {
                    xtype: 'hiddenfield',
                    name: 'from_month',
                    reference: 'from_month'
                }, {
                    xtype: 'hiddenfield',
                    name: 'from_year',
                    reference: 'from_year'
                },

                {
                    xtype: 'spacer',
                    width: '6%',
                    cls: 'ddo-date-spacer'
                }, {
                    xtype: 'datepickerfield',
                    required: true,
                    placeHolder: 'End date',
                    reference: 'jobsFormEndDate',
                    cls: 'ddo-enddate-datepickerfield ddo-mobile-textfield-cls',
                    width: '47%',
                    labelAlign: 'top',
                    dateFormat: 'F Y',
                    picker: {
                        xtype: 'datepicker',
                        slotOrder: ["month", "year"],
                        value: (new Date()), // use this if you DON'T want/have a value in the actual input
                        yearFrom: (new Date()).getFullYear(),
                        yearTo: 1970
                    },

                    listeners: {
                        change: 'EndDate'
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'to_month',
                    reference: 'to_month'
                }, {
                    xtype: 'hiddenfield',
                    name: 'to_year',
                    reference: 'to_year'
                }
            ]
        }, {
            xtype: 'togglefield',
            reference: 'iscurrentlyworkingtoglefield',
            label: 'I Currently Work Here',
            labelWidth: '75%',
            cls: 'ddo-adddetails-togglefield',
            listeners: {
                change: 'onChangeCurrentJob'
            }
        }, {
            xtype: 'hiddenfield',
            reference: 'iscurrentlyworking',
            name: 'iscurrentlyworking'
        }, {
            xtype: 'textareafield',
            clearIcon: false,
            width: '100%',
            name: 'remark',
            fieldLabel: 'Description',
            labelAlign: 'top',
            labelSeparator: '',
            cls: 'ddo-mobile-textfield-cls',
            itemId: 'descriptionId',
            placeHolder: 'Description',
            listeners: {
                change: function(editor, newValue, oldValue) {
                    Utility.validateDescription(editor, newValue, oldValue);
                }
            }
        }]
    }]
});