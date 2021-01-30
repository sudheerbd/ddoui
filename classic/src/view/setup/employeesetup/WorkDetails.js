/**
 * The file WorkDetails is the view file of the work details form.
 * @extends {Ext.form.Panel}
 * @alias 'widget.workdetails'.
 * ViewModel : 'DDO.view.setup.employeesetup.WorkDetailsViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.WorkDetailsController'.
 */
Ext.define('DDO.view.setup.employeesetup.WorkDetails', {
    extend: 'Ext.form.Panel',

    requires: [
        'DDO.view.setup.employeesetup.WorkDetailsController',
        'DDO.view.setup.employeesetup.WorkDetailsViewModel',
        'DDO.view.setup.employeesetup.ReportManagerChangeWindow',
        'Ext.form.trigger.Trigger',
        'DDO.ux.form.trigger.Clear'
    ],

    alias: 'widget.workdetails',

    title: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.TITLE,
    maxHeight: Constants.ViewportHeight * 0.93,
    scrollable: true,

    trackResetOnLoad: true,

    controller: 'workdetailscontroller',
    viewModel: {
        type: 'workdetailsviewmodel'
    },

    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 20 0',
        items: [{
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.CANCEL,
            cls: 'karmaform-cancel-btn',
            listeners: {
                click: 'onFormCancelClick'
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.SAVECONTINUE,
            cls: 'workdetails-save-btn',
            bind: {
                disabled: '{workdetailssavebutton}'
            },
            listeners: {
                click: 'onFormSaveClick'
            }
        }]
    },

    defaults: {
        listeners: {
            change: 'onChangeWorkDetails'
        },
        labelSeparator: '',
        cls: 'employee-form-cls'
    },

    items: [{
        xtype: 'hiddenfield',
        name: 'ddo_empworkdetails_id'
    }, {
        xtype: 'combo',
        name: 'reportingto',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.REPORTINGTO,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.REPORTINGTO,
        editable: true,
        forceSelection: true,
        store: 'setup.employeesetup.ReportingStore',
        width: '100%',
        cls: 'employee-form-cls',
    valueField: 'empid',
        displayField: 'empname',
        typeAhead: true,
        queryMode: 'local',
        lastQuery: '',
        autoLoad : true,
        triggers: {
            clear: {
                type: 'clear',
                weight: -1,
                hideWhenEmpty: true,
                handler: function(cmp) {
                    if (Ext.isFunction(cmp.clearValue)) {
                        cmp.clearValue();
                    } else {
                        cmp.setValue('');
                    }
                    this.up('form').getViewModel().set('workdetailssavebutton', false);
                }
            }
        },
        listConfig: {
            cls: 'ddo-theme-dropdown-combo'
        },
        listeners: {
            select: 'onReportingToSelect',
            render: function (store) {
                var store = Ext.getStore('setup.employeesetup.ReportingStore');
                if (!store.isLoaded()) {
                    store.load();
                }
            },
            change: 'onChangeWorkDetails'
        }
    }, {
        xtype: 'combobox',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.DESIGNATION,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.DESIGNATION,
        name: 'designationname',
        reference: 'designationRef',
        displayField: 'name',
        valueField: 'ddo_designation_id',
        typeAhead: true,
        forceSelection: true,
        autoLoad: true,
        minChars: 1,
        //fieldLabel: 'Designation',
        //cls: 'employee-setup-cls',
        queryMode: 'local',
        lastQuery: '',
        cls: 'employee-form-cls',
        //allowBlank: false,
        store: 'setup.SetupDesignationComboStore',
        listConfig: {
            cls: 'ddo-theme-dropdown-combo'
        }
    }, {
        xtype: 'combobox',
        name: 'departmentname',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.DEPARTMENT,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.DEPARTMENT,
        reference: 'deparmentRef',
        displayField: 'name',
        valueField: 'ddo_department_id',
        typeAhead: true,
        forceSelection: true,
        minChars: 1,
        cls: 'employee-form-cls',
        //fieldLabel: 'Department',
        //cls: 'employee-setup-cls',
        queryMode: 'local',
        lastQuery: '',
        store: 'setup.department.DepartmentComboStore',
        listConfig: {
            cls: 'ddo-theme-dropdown-combo'
        }
    }, {
        xtype: 'combo',
        name: 'pskill',
        hidden: true,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.PSKILL,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.PSKILL,
        editable: true,
        cls: 'employee-form-cls',
        //autoLoad:true,
        forceSelection: true,
        typeAhead: true,
        queryMode: 'local',
        lastQuery: '',
        autoLoad : true,
        store: 'skillslist.ProfileSkillsComboStore',
        width: '100%',
        //cls: 'employee-setup-cls',
        valueField: 'ddo_skills_id',
        displayField: 'name',
        listConfig: {
            cls: 'ddo-theme-dropdown-combo'
        }
    }, {
        xtype: 'combo',
        name: 'empstatus',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.STATUS,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.STATUS,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        allowBlank: false,
        editable: false,
        forceSelection: true,
        store: 'setup.employeesetup.StatusStore',
        width: '100%',
        cls: 'employee-form-cls',
        // value: '',
        valueField: 'name',
        displayField: 'name',
        listConfig: {
            cls: 'ddo-theme-dropdown-combo'
        },
        listeners: {
            select: 'onStatusSelect',
            // render: 'onStatusRender',
            change: 'onChangeWorkDetails'
        }
    },
    {
        xtype: 'combo',
        name: 'jobtype',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.JOBTYPE,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.JOBTYPE,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        editable: false,
        forceSelection: true,
        bind:{
            store: '{jobTypeStore}',
        },
        width: '100%',
        cls: 'employee-form-cls',
        allowBlank: false,
        valueField: 'name',
        displayField: 'name',
        listConfig: {
            cls: 'ddo-theme-dropdown-combo'
        },
        queryMode: 'local',
    }, {
        xtype: 'datefield',
        name: 'joiningdate',
        //disabled: true,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.JDATE,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.JDATE,
        afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
        allowBlank: false,
        width: '100%',
        cls: 'employee-form-cls',
        //cls: 'employee-setup-cls',
        format: 'd-m-Y',
        submitFormat: 'Y-m-d',
        maskRe: /[0-9\-\/]/,
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
                    esc: function () {
                        me.collapse();
                    }
                }
            });
        }
    }, {
        xtype: 'datefield',
        name: 'confirmdate',
        //disabled: true,
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.CDATE,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.CDATE,
        width: '100%',
        cls: 'employee-form-cls',
        //cls: 'employee-setup-cls',
        format: 'd-m-Y',
        submitFormat: 'Y-m-d',
        maskRe: /[0-9\-\/]/,
        bind:{
            hidden:'{confirm}'
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
                    esc: function() {
                        me.collapse();
                    }
                }
            });
        }
    },
    // {
    //     xtype: 'datefield',
    //     name: 'separateddate',
    //     //disabled: true,
    //     emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.SDATE,
    //     fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.SDATE,
    //     width: '100%',
    //     cls: 'employee-form-cls',
    //     //cls: 'employee-setup-cls',
    //     format: 'd-m-Y',
    //     submitFormat: 'Y-m-d',
    //     maskRe: /[0-9\-\/]/,
    //         bind: {
    //             hidden: '{separated}'
    //         },
    //         createPicker: function () {
    //             var me = this,
    //                 format = Ext.String.format;

    //             return Ext.create('Ext.picker.Date', {
    //                 pickerField: me,
    //                 ownerCt: me.ownerCt,
    //                 renderTo: document.body,
    //                 floating: true,
    //                 hidden: true,
    //                 focusOnShow: true,
    //                 cls: 'ddo-create-datepicker',
    //                 minDate: me.minValue,
    //                 maxDate: me.maxValue,
    //                 disabledDatesRE: me.disabledDatesRE,
    //                 disabledDatesText: me.disabledDatesText,
    //                 disabledDays: me.disabledDays,
    //                 disabledDaysText: me.disabledDaysText,
    //                 format: me.format,
    //                 showToday: me.showToday,
    //                 startDay: me.startDay,
    //                 minText: format(me.minText, me.formatDate(me.minValue)),
    //                 maxText: format(me.maxText, me.formatDate(me.maxValue)),
    //                 listeners: {
    //                     scope: me,
    //                     select: me.onSelect

    //                 },
    //                 keyNavConfig: {
    //                     esc: function () {
    //                         me.collapse();
    //                     }
    //                 }
    //             });
    //         }
    //     },
        {
            xtype: 'datefield',
            name: 'notice',
            emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.NDATE,
            fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.NDATE,
            width: '100%',
            cls: 'employee-form-cls',
            format: 'd-m-Y',
            bind: {
                hidden: '{notice}'
            },
            submitFormat: 'Y-m-d',
            maskRe: /[0-9\-\/]/,
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
                    esc: function () {
                        me.collapse();
                    }
                }
            });
        }
        
    },{
        xtype: 'textfield',
        allowBlank: false,
        name: 'grey_hr_id',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.GREYHR,
        minValue:0,
        allowDecimals: false,
        fieldLabel: LabelsTitles.EMPSETUP.EMPTAB.EMP.WORKFORM.GREYHR,
        cls: 'employee-form-cls',
        editable : false
    }]

});