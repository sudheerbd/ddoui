Ext.define('DDO.view.setup.financialyear.FinancialYearWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.view.setup.financialyear.FinancialYearWindowController'
    ],

    alias: 'widget.financialyearwindow',

    title: LabelsTitles.EMPSETUP.FINANCIALYEAR.FTITLE,

    controller: 'financialyearwindowcontroller',  

    initComponent: function() {
        this.callParent(arguments);

        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    width: Constants.ViewportWidth * 0.44,    
    height: Constants.ViewportHeight * 0.47,   
    items: [{
        xtype: 'form',
        bbar: {
            layout: {
                type: 'hbox'
            },
            padding: '25 0 21 0',
            items: [{
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.FINANCIALYEAR.CANCEL,
                cls: 'karmaform-cancel-btn',
                listeners: {
                    click: 'onFormCancelClick'
                }
            }, {
                xtype: 'button',
                text: LabelsTitles.EMPSETUP.FINANCIALYEAR.SAVE,
                cls: 'karmaform-save-btn',
                formBind: true,
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
    
        items: [{
            xtype: 'hiddenfield',
            name: 'ddo_fyear_id'
        }, {
            xtype: 'datefield',
            allowBlank: false,
            name: 'startdate',
            emptyText: LabelsTitles.EMPSETUP.FINANCIALYEAR.STARTDATE,
            required: true,
           cls: 'rule-name-cls',
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
            xtype: 'datefield',
            name: 'enddate',
            emptyText: LabelsTitles.EMPSETUP.FINANCIALYEAR.ENDDATE,
            cls: 'rule-name-cls',
            validator: function(val) {

                if (this.value < this.up().down('datefield[name=startdate]').value) {
                    return 'To Date cannot be before From Date';
                } else {
                    return true;
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
