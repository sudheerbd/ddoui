/**
 *   The file ProjectApprovalRejectReasonWindow.js is responsible for Project Approval Reject Reason Window.
 *   @extends {Ext.window.Window}
 *   @alias widget.rejectreasonwindow
 *   ViewController :'DDO.view.projectapproval.ProjectApprovalController'.
 */
Ext.define('DDO.view.projectapproval.ProjectApprovalRejectReasonWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.rejectreasonwindow',
    title: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.REASON,
    width: Constants.ViewportWidth * 0.403,
    height:  Constants.ViewportHeight * 0.386,
    constrain: true,
    resizable: false,
    modal: true,
    layout: 'fit',
    name: 'rejectwindow',
    items: [{
        xtype: 'form',
        cls: 'form-note-cls',
        reference: 'notesform',
        name: 'rejectform',
        width: Constants.ViewportWidth * 0.367,
        height:  Constants.ViewportHeight * 0.386,
        items: [{
            xtype: 'textareafield',
            name: 'reject_description',
            reference: 'rejectDesc',
            cls: 'noteditor-cls rejecteditor-cls',
            grow: true,
            name: 'message',
            anchor: '100%',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.EMPTYTEXT,
            enforceMaxLength: true,
            minLength: 20,
            maxLength: 400,
            width: Constants.ViewportWidth * 0.403,
            height:  Constants.ViewportHeight * 0.247,
        }, {
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.SUBMIT,
            formBind: true,
            cls: 'rejectbutton submit-cls',
            margin:'0 0 0 40',
            handler: function (button,btn) {
                var message = button.up("form[name=rejectform]").down('textareafield').getValue();
                var btn=this.up('rejectreasonwindow').rejectBtn;
                 var rowIndexRecord = this.up('rejectreasonwindow').rowIdx
                button.up("window[name=rejectwindow]").hide();
                var parentRef = this.up('rejectreasonwindow').parentViewRef;
                parentRef.clearPendingNominations(btn,false, message,rowIndexRecord);
            }
        }]
    }]
});
