/**
 * The file ReportManagerChangeWindow is the view file of popup. 
 * it's ask for reason for reporting manager change.
 * @extends {Ext.window.Window}
 * @alias 'reportmanagerchangewindow'.
 */
Ext.define('DDO.view.setup.employeesetup.ReportManagerChangeWindow', {
    extend: 'Ext.window.Window',
    xtype: 'reportmanagerchangewindow',
    
    minHeight: Constants.ViewportHeight * 0.31,
    width: Constants.ViewportWidth * 0.337,
    // objArgs: objArgs,
    name: "reportwindow",
    title: LabelsTitles.EMPSETUP.EMPTAB.REPORTINGWIN.TITLE,
    items: [{
        xtype: 'textareafield',
        allowBlank: false,
        padding: '10px 0 0 0',
        width: '100%',
        emptyText: LabelsTitles.EMPSETUP.EMPTAB.REPORTINGWIN.COMMENT
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        cls: 'reason-wind-cls',
        items: [{
            xtype: 'button',
            cls: 'header-right-nominate-button',
            text: LabelsTitles.EMPSETUP.EMPTAB.REPORTINGWIN.OK,
            padding: '0 25px',
            minWidth: '75px',
            margin: '0 10 0 150px ',
            handler: function () {
                var wind = this.up('window');
                var vm = wind.objArgs.vm,
                    vc = wind.objArgs.vc;
                if (!Ext.isEmpty(wind.down('textareafield').getValue())) {
                    Utility.reportingManagerChanged = wind.down('textareafield').getValue();
                    var result = vc.reportingChange(wind.objArgs);
                    if (result) {
                        wind.close()
                    } else {
                        Ext.Msg.alert(LabelsTitles.EMPSETUP.EMPTAB.REPORTINGWIN.RESALERT);
                    }
                    return;
                } else {
                    Utility.reportingManagerChanged = null;
                    vm.set('valueResetted', true);
                }
            },
        }, {
            xtype: 'button',
            text: LabelsTitles.EMPSETUP.EMPTAB.REPORTINGWIN.CANCEL,
            minWidth: '75px',
            cls: 'header-right-nominate-button',
            handler: function () {
                var wind = this.up('window');
                wind.objArgs.vm.set('valueResetted', true);
                wind.close();
            }
        }]
    }],
    listeners: {
        focusleave: function (cmp) {
            cmp.close();
        }
    },
});