/**
 * The file ResourceRequestWindowUpdate is the window which appears to update the fields in update allocation.
 * @extends {Ext.window.Window}
 * @alias 'widget.resourcerequestwindowupdate'.
 * ViewModel : 'DDO.view.projects.people.ProjectWindowViewModel'.
 * ViewController : 'DDO.view.projects.people.ResourceRequestController'
 */
Ext.define('DDO.view.projects.people.ResourceRequestWindowUpdate', {
    extend: 'Ext.window.Window',
    xtype: 'resourcerequestwindowupdate',
    requires: ['DDO.view.projects.people.ProjectWindowViewModel'],
    initComponent: function () {
        this.callParent(arguments);
        var projectRequestVM = this.getViewModel();
        var roleStore = projectRequestVM.getStore('projectRoleStore');
        if (!roleStore.isLoaded()) {
            roleStore.load();
        }
    },
    viewModel: {
        type: 'projectwindowviewmodel'
    },
    closable: true,
    autoShow: true,
    height: Constants.ViewportHeight * 0.75,
    width: Constants.ViewportWidth * 0.77,
    scrollable: 'y',
    reference: 'resourcerequestwindowupdate',
    closable: true,
    items: [{
        layout: 'hbox',
        items: [{
            xtype: 'form',
            width: '35%',
            items: [{
                    xtype: 'container',
                    padding: '20 0 0 0',
                    defaults: {
                        // width: '68%',
                        margin: '0 0 0 60',
                    },
                    items: [{
                            tbtext: '',
                            reference: 'message',
                            cls: 'message-color'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: LabelsTitles.RESOURCEREQUEST.EMPLOYEE,
                            cls: 'employeecombo-cls',
                            labelAlign: 'top',
                            reference: 'employee',
                            editable: false,
                            width:'220px',
                            height:'3px'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: LabelsTitles.RESOURCEREQUEST.STARTDATE,
                            labelAlign: 'top',
                            reference: 'startDate',
                            width:'220px',
                            height:'3px',
                            name: 'startdate',
                            submitFormat: 'd-m-Y',
                            format: 'd-m-Y',
                            maskRe: /[0-9\-\/]/,
                            cls: 'startdate-cls',
                            allowBlank: false,
                            bind: {
                                minValue: '{minValue}'
                            },
                            createPicker: function () {
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
                                        esc: function () {
                                            me.collapse();
                                        }
                                    }
                                });
                            },
                            listeners: {
                                select: 'onDateRange',
                                focusleave: "onKeyDownDate"
                            }
                        }, {
                            xtype: 'datefield',
                            fieldLabel: LabelsTitles.RESOURCEREQUEST.ENDDATE,
                            labelAlign: 'top',
                            reference: 'endDate',
                            name: 'enddate',
                            submitFormat: 'd-m-Y',
                            width:'220px',
                            height:'3px',
                            format: 'd-m-Y',
                            maskRe: /[0-9\-\/]/,
                            cls: 'enddate-cls',
                            allowBlank: false,
                            bind: {
                                minValue: '{minValue}'
                            },
                            createPicker: function () {
                                var me = this,
                                    format = Ext.String.format;
                                return Ext.create('Ext.picker.Date', {
                                    pickerField: me,
                                    ownerCt: me.ownerCt,
                                    renderTo: document.body,
                                    floating: true,
                                    hidden: true,
                                    focusOnShow: true,
                                    cls: 'ddo-create-datepicker addpeopledate',
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
                                        esc: function () {
                                            me.collapse();
                                        }
                                    }
                                });
                            },
                            listeners: {
                                select: 'onDateRange',
                                focusleave: "onKeyDownDate"
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'projectrole',
                            allowBlank: false,
                            fieldLabel: LabelsTitles.RESOURCEREQUEST.ROLE,
                            labelAlign: 'top',
                            cls: 'rolecombo-cls',
                            width:'220px',
                            height:'3px',
                            // msgTarget:'side',
                            queryMode: 'local',
                            editable: true,
                            bind: {
                                store: '{projectRoleStore}',
                            },
                            displayField: 'name',
                            valueField: 'ad_role_id',
                            listeners: {
                                beforequery: 'onEmployeeComboSearch'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: LabelsTitles.RESOURCEREQUEST.ALLOCATIONPERCENT,
                            bind: {
                                value: '{employeeData.allocationperct}'
                            },
                            reference: 'percentage',
                            name: 'allocationperct',
                            labelAlign: 'top',
                            cls: 'percent-cls',
                            width:'220px',
                            height:'3px',
                            allowBlank: false,
                            editable: false,
                            displayField: 'allocation_percent',
                            valueField: 'allocation_percent',
                            store: ['5','10','15','25', '50', '75', '100']
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: LabelsTitles.RESOURCEREQUEST.SHADOWRESOURCE,
                            cls: 'karmasetup-checkbox-cls',
                            name: 'shadow_resource',
                            reference: 'shadow_resource',
                            width:'220px',
                            height:'3px',
                            boxLabelAlign: 'before',
                            inputValue: 'Y',
                            bind: {
                                value: '{employeeData.shadow_resource}'
                            }
                        }
                    ]
                }
                , {
                    xtype: 'button',
                    text: LabelsTitles.RESOURCEREQUEST.UPDATE,
                    handler: 'onUpdateButtonClick',
                    cls: 'update-btn'
                }
            ],
            // buttons: [{
            //     text: LabelsTitles.RESOURCEREQUEST.UPDATE,
            //     handler: 'onUpdateButtonClick',
            //     cls: 'update-btn'
            // }],

        }, {
            xtype: 'projectsummarydetails',
            html:' <h2> Project Allocation Summary </h2>',
            width: '65%',
            margin :' 10px 10px 0px 0px'
        }]
    }],

    listeners: [{
        close: 'onClickCloseBtn'
    }]
});