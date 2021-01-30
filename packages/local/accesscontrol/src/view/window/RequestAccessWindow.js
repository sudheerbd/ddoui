Ext.define('ACCTRL.view.window.RequestAccessWindow', {
    extend: 'Ext.window.Window',

    xtype: 'requestaccesswindow',
    requires: [
        'ACCTRL.view.window.RequestAccessWindowController'
    ],
    cls: 'appwindow-cls',
    bodyPadding: 20,
    modal: true,
    width: 700,
    height: 400,
    appRecord : null,
    title: 'Request Access',
    titleAlign: 'center',
    controller: 'requestaccesswindowcontroller',
    defaultImgPath: 'resources/images/user-profile/12.png',
    viewModel: {
        data: {
            appImg: 'resources/images/user-profile/12.png'
        }
    },
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
        show: function(reqAccessWindow, opts) {
            reqAccessWindow.center();

            var appRecord = reqAccessWindow.appRecord,
                fromDate = reqAccessWindow.down('datefield[name=fromdate]'),
                toDate = reqAccessWindow.down('datefield[name=enddate]');

            fromDate.setMinValue(new Date());
            fromDate.setMaxValue(false);
            toDate.setMinValue(new Date());
            toDate.setMaxValue(false);

            if(appRecord){
                var activeAccessAllowed = appRecord.get('accessallowedusers');
                var activeUsers = appRecord.get('activeusers');
                var appName = appRecord.get('appname');
                var appLogo = appRecord.get('applogopath');

                reqAccessWindow.down('textfield[name=appName]').setValue(appName);
                reqAccessWindow.down('textfield[name=accessAllowedUsers]').setValue(''+ activeUsers + '/' + activeAccessAllowed);
                if(appLogo){
                    reqAccessWindow.getViewModel().set('appImg', appLogo);
                } else {
                    reqAccessWindow.getViewModel().set('appImg', reqAccessWindow.defaultImgPath);
                }
            }
        }
    },
    items: [{
        xtype: 'form',
        layout: 'hbox',
        bbar: {
            items: [{
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'onFormCancelClick'
            }, {
                xtype: 'button',
                text: 'Request',
                formBind: true,
                cls: 'app-window-save-btn',
                listeners: {
                    click: 'onFormSaveClick'
                }
            }]
        },
        items: [{
            xtype: 'container',
            width: '40%',
            padding: '40 40 10 40',
            items: [{
                xtype: 'component',
                cls: 'requestAppIcon',
                height: 70,
                width: 70,
                bind: {
                    style: {
                        background: 'url("{appImg}")'
                    }
                }
            }, {
                xtype: 'textfield',
                name: 'appName',
                margin: 10,
                width: 160,
                allowBlank: false,
                cls: 'app-window-fields',
                emptyText: 'App Name',
                disabled: true
            }, {
                xtype: 'menuseparator' 
            }, {
                xtype: 'label',
                margin: 10,
                html: 'Active Access Allowed'
            }, {
                xtype: 'textfield',
                name: 'accessAllowedUsers',
                hideTrigger: true,
                cls: 'activeaccess-display',
                width: 70,
                disabled: true
            }]
        }, {
            width: '60%',
            items: [{
                defaults: {
                    labelAlign: 'top',
                    labelSeparator: '',
                    allowBlank: false,
                    width: '50%',
                    cls: 'app-window-fields'
                },
                layout: 'hbox',
                padding: '20 20 0 0',
                items: [{
                        xtype: 'datefield',
                       // margin: '29 0 0 0',
                        fieldLabel: 'Access Period',
                        beforeLabelTextTpl: '<span class="mandatory-astric-cls">*</span>',
                        name: 'fromdate',
                        emptyText: 'From',
                        vtype: 'daterange',
                        endDateField : 'enddate',
                        emptyText: 'DD-MM-YYYY',
                        format: 'd-m-Y',
                        submitFormat:'Y-m-d',
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
                                    esc: function() {
                                        me.collapse();
                                    }
                                }
                            });
                        },listeners: {
                            focusleave:"onKeyDownDate"
                        }
                    }, {
                        xtype: 'datefield',
                        margin: '29 0 0 20',
                        name: 'enddate',
                        emptyText: 'To',
                        vtype: 'daterange',
                        emptyText: 'DD-MM-YYYY',
                        format: 'd-m-Y',
                        submitFormat:'Y-m-d',
                        maskRe: /[0-9\-\/]/,
                        startDateField: 'fromdate',
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
                    },listeners: {
                        focusleave:"onKeyDownDate"
                    }
                            }]
            }, {
                xtype: 'textarea',
                beforeLabelTextTpl: '<span class="mandatory-astric-cls">*</span>',
                width: '95%',
                labelAlign: 'top',
                labelSeparator: '',
                cls: 'app-window-fields',
                allowBlank: false,
                fieldLabel: 'Reason',
                name: 'requestreason',
                emptyText: 'Write'
            }]
        }]
    }]
});