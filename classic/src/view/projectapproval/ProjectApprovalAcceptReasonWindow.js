/**
 *   The file ProjectApprovalAcceptReasonWindow.js is responsible for Project Approval Accept Reason Window.
 *   @extends {Ext.window.Window}
 *   @alias widget.acceptreasonwindow
 *   ViewController :'DDO.view.projectapproval.ProjectApprovalController'.
 */
Ext.define('DDO.view.projectapproval.ProjectApprovalAcceptReasonWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.acceptreasonwindow',
    title: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.REASON,
    width: Constants.ViewportWidth * 0.403,
    height:  Constants.ViewportHeight * 0.386,
    constrain: true,
    resizable: false,
    modal: true,
    layout: 'fit',
    name: 'acceptwindow',
    items: [{
        xtype: 'form',
        cls: 'form-note-cls',
        reference: 'notesform',
        name: 'acceptform',
        width: Constants.ViewportWidth * 0.367,
        height:  Constants.ViewportHeight * 0.386,
        items: [{
            xtype: 'textareafield',
            name: 'accept_description',
            reference: 'acceptDesc',
            cls: 'noteditor-cls rejecteditor-cls',
            grow: true,
            name: 'message',
            anchor: '100%',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText: "Please enter the reason for accepting...",
            enforceMaxLength: true,
            minLength: 20,
            maxLength: 400,
            width: Constants.ViewportWidth * 0.403,
            height:  Constants.ViewportHeight * 0.22,
        },{
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.WITHOUTREASON,
            // formBind: true,
            // cls: 'withoutreason-cls',
            padding: '10px',
            // cls: 'rejectbutton submit-cls',
            margin:'0 0 20 65',
            height: '35px',
            width: '180px',
            handler: function (button,btn) {
                var message = button.up("form[name=acceptform]").down('textareafield').getValue();
                if(message == null){
                    message = 'accepted';
                }
                var btn=this.up('acceptreasonwindow').acceptBtn;
                var rowIndexRecord = this.up('acceptreasonwindow').rowIdx;
                button.up("window[name=acceptwindow]").hide();
                var parentRef = this.up('acceptreasonwindow').parentViewRef;
                parentRef.clearPendingNominations(btn,true,message,rowIndexRecord);
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.RESOURCEAPPROVAL.SUBMIT,
            formBind: true,
            padding: '10px',
            width: '180px',
            height: '35px',
            // cls: 'rejectbutton submit-cls',
            
            margin:'0 0 20 40',
            handler: function (button,btn) {
                var message = button.up("form[name=acceptform]").down('textareafield').getValue();
                var btn=this.up('acceptreasonwindow').acceptBtn;
                var rowIndexRecord = this.up('acceptreasonwindow').rowIdx;
                button.up("window[name=acceptwindow]").hide();
                var parentRef = this.up('acceptreasonwindow').parentViewRef;
                parentRef.clearPendingNominations(btn,true, message,rowIndexRecord);
            }
        },]
    }]
});
