Ext.define('DDO.view.setup.employeesetup.WorkExpForm',{
    extend:'Ext.form.Panel',
    requires:['DDO.view.setup.employeesetup.WorkExpFormController'],
    alias:'widget.workexpform',
    
    cls: 'ddo-adddetails-formpanel',
    
    layout: {
        type: 'vbox'
    },
    controller:'workexpformcontroller',
   autoScroll:true,
trackResetOnLoad: true,
maxHeight: Constants.ViewportHeight * 0.83,
bodyPadding:20,
//    scrollable:true,
    /**
     * @property {String} [operation="addform"]
     * Used to recognize whether the form is used to add a new rec or
     * update an existing record.
     * Takes either of these values:
     *      - addform
     *      - editform
     */
    operation: 'addform',

    defaults: {
        width: '100%',
        msgTarget: 'side'
    },
    items: [{
        xtype: 'textfield',
        labelSeparator: '',
        name: 'designation',
        emptyText:LabelsTitles.PROFILE.ADDJOB.DESIGNATION,
        cls: 'ddo-adddetails-txtfield',
        enforceMaxLength: true,
        maxLength: 40,
        allowBlank:false
    }, {
        xtype: 'textfield',
        labelSeparator: '',
        name: 'company',
        emptyText:LabelsTitles.PROFILE.ADDJOB.COMPANY,
        cls: 'ddo-adddetails-txtfield',
        enforceMaxLength: true,
        maxLength: 80,
        allowBlank:false
    }, {
        xtype: 'hiddenfield',
        name: 'ddo_empworkexperience_id'
    }, {
        xtype: 'textfield',
        labelSeparator: '',
        name: 'location',
        emptyText: LabelsTitles.PROFILE.ADDJOB.LOCATION,
        cls: 'ddo-adddetails-txtfield',
        enforceMaxLength: true,
        maxLength: 100,
        allowBlank:false
    }, {
        xtype: 'label',
        text: LabelsTitles.PROFILE.ADDJOB.TIMEPERIOD,
        cls: 'ddo-adddetails-timeperiod'
    }, {
        xtype: 'container',
        cls: 'ddo-adddetails-fieldcontainer',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%',
            msgTarget: 'side'
        },
        items: [{
            xtype: 'combobox',
            allowBlank:false,
            cls: 'ddo-adddetails-combo',
            reference: 'startmonth',
            emptyText:LabelsTitles.PROFILE.ADDJOB.MONTH,
            name: 'frommonth',
            store: 'monthstore',
            queryMode: 'local',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            flex: 0.27,
            listConfig: {
                cls: 'ddo-theme-dropdown-combo'
            },
            tpl: [
                '<ul class="x-list-plain"><tpl for=".">',
                '<li role="option" class="x-boundlist-item  {[this.disableCls(values)]}">{name}</li>',
                '</tpl></ul>', {
                    disableCls: function(values) {
                        var startYear = this.field.up('form').getValues().from_year,
                            startYearValue = parseInt(startYear),
                            currentYear = new Date().getFullYear(),
                            currentMonth = new Date().getMonth(),
                            currentMonthIndex = Ext.Date.getMonthNumber(values.name);
                        if (startYearValue === currentYear && (currentMonth < currentMonthIndex)) {
                            return "x-item-disabled ddo-combo-item-disabled";
                        }
                    }
                }
            ],
            listeners: {
                focusleave: 'onStartMonthChange'
            }
        }, {
            xtype: 'tbspacer',
            width: 5
        }, {
            xtype: 'numberfield',
            allowBlank:false,
            name: 'fromyear',
            reference: 'startyear',
            cls: 'ddo-adddetails-textbox',
            minValue: 1970,
            hideTrigger: true,
            maxValue: 2050,
            minLength: 4,
            enableKeyEvents: true,
            emptyText: LabelsTitles.PROFILE.ADDJOB.YEAR,
            blankText: LabelsTitles.PROFILE.ADDJOB.MANDATORY,
            flex: 0.15,
            listeners: {
                keyup: 'onStartYearEnter',
                focusleave: 'onStartYearChange'
            },
            enforceMaxLength: true,
            maxLength: 4
        }, {
            xtype: 'tbspacer',
            flex: 0.05

        }, {
            xtype: 'label',
            text: LabelsTitles.PROFILE.ADDJOB.TO,
            cls: 'ddo-adddetails-label',
            flex: 0.1
        }, {
            xtype: 'tbspacer',
            flex: 0.05

        }, {
            xtype: 'combobox',
            allowBlank:false,
            cls: 'ddo-adddetails-combo',
            emptyText: LabelsTitles.PROFILE.ADDJOB.MONTH ,
            reference: 'endmonth',
            name: 'tomonth',
            store: 'monthstore',
            queryMode: 'local',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            flex: 0.27,
            listConfig: {
                cls: 'ddo-theme-dropdown-combo'
            },
            /**
                overrided combobox tpl for providing validations.
                It check current month in current year. 
                If month is greaterthan present month and present year disables.
            */
            tpl: [
                '<ul class="x-list-plain"><tpl for=".">',
                '<li role="option" class="x-boundlist-item  {[this.disableCls(values)]}">{name}</li>',
                '</tpl></ul>', {
                    disableCls: function(values) {
                        var endyearvalue = this.field.up('form').getValues().to_year,
                            endvalue = parseInt(endyearvalue),
                            currentyear = new Date().getFullYear(),
                            currentmonth = new Date().getMonth(),
                            currentmonthIndex = Ext.Date.getMonthNumber(values.name);

                        if (endvalue === currentyear && (currentmonth < currentmonthIndex)) {
                            return "x-item-disabled ddo-combo-item-disabled";
                        }

                    }

                }
            ],
            listeners: {
                focusleave: 'onEndMonthChange'
            }
        }, {
            xtype: 'tbspacer'
        }, {
            xtype: 'numberfield',
            allowBlank:false,
            name: 'toyear',
            reference: 'endyear',
            // vtype: 'year',
            hideTrigger: true,
            cls: 'ddo-adddetails-textbox',
            minValue: 1970,
            maxValue: 2050,
            minLength: 4,
            flex: 0.15,
            emptyText: LabelsTitles.PROFILE.ADDJOB.YEAR,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onEndYearEnter',
                focusleave: 'onEndYearChange'
            },
            enforceMaxLength: true,
            maxLength: 4
        }, {
            xtype: 'tbspacer',
            flex: 0.2
        }]
    }, 
    // {
    //     xtype: 'checkboxfield',
    //     reference: 'iscurrentjob',
    //     boxLabel: 'Currently Working Here',
    //     labelWidth: 150,
    //     cls: 'ddo-adddetails-checkboxfield',
    //     name: 'currentlyworking',
    //     inputValue:'Y',
    //     listeners: {
    //         change: 'onChangeCheckbox'
    //     }
    // },
     {
        xtype: 'htmleditor',
        width: '100%',
        height: 200,
        name: 'description',
        fieldLabel: LabelsTitles.PROFILE.ADDJOB.DESCRIPTION,
        labelAlign: 'top',
        labelSeparator: '',
        cls: 'ddo-adddetails-htmleditor',
        listeners: {
            change: function(editor, newValue, oldValue) {
                Utility.validateDescription(editor, newValue, oldValue);
            }
        }
    }, {
        xtype: 'toolbar',
        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'middle'
        },
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: LabelsTitles.PROFILE.ADDJOB.SAVE,
            ui: 'formbutton',
            reference: 'savebutton',
            formBind: true,
            listeners: {
                click: 'onSaveClick'
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.PROFILE.ADDJOB.CANCEL,
            cls: 'ddo-form-btn-cancel',
            reference: 'cancelbutton',
            listeners: {
                click: 'onCancelClick'
            },
            ui: 'formbutton'
        }]
    }]
})