/**
 *   The file KarmaApprovalWindow.js is responsible for karma Approval  Window.
 *   @extends {Ext.window.Window}
 *   @alias widget.karmaapprovalwindow
 *   ViewController :'DDO.view.karmaapproval.KarmaApprovalController'.
 */
Ext.define('DDO.view.karmaapproval.ProjectedKarmaAcceptWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.projectedkarmaacceptwindow',
    title: 'Preview',
    width: Constants.ViewportWidth * 0.4,
    height: Constants.ViewportHeight * 0.99,
    constrain: true,
    resizable: false,
    modal: true,
    cls: 'karmarejectwin-cls',
    layout: 'fit',
    name: 'acceptwindow',
    items: [{
        xtype: 'form',
        cls: 'form-note-cls',
        reference: 'notesform',
       // scrollable: true,
        name: 'acceptform',
        width: Constants.ViewportWidth * 0.203,
        height: Constants.ViewportHeight * 0.306,
        items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                align: 'center',
                margin: '5 20 20 20',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'From',
                    name: 'fromname',
                    reference: 'employeename',
                    cls: 'ddo-rejectkarma-cls',
                    padding: '0 20 0 0',
                    editable: false,
                    labelAlign: 'top',
                    // flex: 0.3,
                    width: 140
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Karma Name',
                    name: 'karma_name',
                    labelAlign: 'top',
                    reference: 'karmaname',
                    padding: '0 20 0 0',
                    editable: false,
                    // afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
                    // emptyText: 
                    cls: 'ddo-monthyear-cls',
                    // flex: 0.3,
                    width: 140
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Submited Date',
                    name: 'submiteddate',
                    labelAlign: 'top',
                    reference: 'submiteddate',
                    padding: '0 20 0 0',
                    editable: false,
                    // afterLabelTextTpl: LabelsTitles.EMPSETUP.EMPTAB.EMP.EMPFORM.MANDATORYFIELD,
                    // emptyText: 
                    cls: 'ddo-category-cls',
                    // flex: 0.3,
                    width: 140
                }]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: 20,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Karma Units',
                    name: 'karmaunits',
                    reference: 'karmapoints',
                    labelAlign: 'top',
                    // cls: 'karma-rejectrequest-cls',
                    cls: 'ddo-rejectkarma-cls',
                    // flex: 0.3,
                    width: 140,
                    editable: false,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Month&Year',
                    name: 'nominate_month',
                    reference: 'karmaRejectDate',
                    cls: 'ddo-monthyear-cls',
                    labelAlign: 'top',
                    editable: false,
                    // padding:'20 0 0 0',
                    // flex: 0.3,
                    width: 140
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Category',
                    name: 'karmacategory_name',
                    labelAlign: 'top',
                    reference: 'CategoryRef',
                    padding: '0 20 0 0',
                    editable: false,
                    cls: 'ddo-category-cls',
                    width: 140
                    // flex: 0.3,
                    // bind: {
                    //     value: '{derivedKarma}'
                    // }
                }]
            },
             {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: 20,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Hr KarmaUnits',
                    name: 'hr_karma',
                    labelAlign: 'top',
                    reference: 'derivedKarmaRef',
                    padding: '0 20 0 0',
                    editable: false,
                    cls: 'ddo-rejectkarma-cls',
                    width: 140
                    // flex: 0.8,
                    // bind: {
                    //     value: '{derivedKarma}'
                    // }
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Finance KarmaUnits',
                    name: 'finance_karma',
                    labelAlign: 'top',
                    reference: 'financeKarmaRef',
                    padding: '0 20 0 0',
                    editable: false,
                    cls: 'ddo-financekarmaunits-cls',
                    width: 140
                    //flex: 0.8,
                    // bind: {
                    //     value: '{derivedKarma}'
                    // }
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Derived Points',
                    name: 'derived_karma_points',
                    labelAlign: 'top',
                    reference: 'derivedKarmaRef',
                    padding: '0 20 0 0',
                    editable: false,
                    cls: 'ddo-deriviedpoints-cls',
                    width: 140
                    //flex: 0.3,
                    // bind: {
                    //     value: '{derivedKarma}'
                    // }
                }]
            }
            , {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: 20,
                items: [
                
                     {
                        xtype: 'textarea',
                        fieldLabel: 'Hr Comments',
                        name: 'hrcomments',
                        labelAlign: 'top',
                        reference: 'hrcommentsref',
                        // padding:'0 20 0 0',
                        editable: false,
                       // width: Constants.ViewportWidth * 0.17,
                        height: Constants.ViewportHeight * 0.1626,
                        cls: 'ddo-hrcomments-cls',
                        flex: 0.3,
                        // bind: {
                        //     value: '{derivedKarma}'
                        // }
                    
                }, {
                 
                        xtype: 'textarea',
                        fieldLabel: 'Finance Comments',
                        name: 'financecomments',
                        labelAlign: 'top',
                        reference: 'financecomentsRef',
                        // padding:'0 20 0 0',
                        editable: false,
                       // width: Constants.ViewportWidth * 0.17,
                        height:Constants.ViewportHeight * 0.1626,
                        cls: 'ddo-financecomments-cls',
                        flex: 0.3,
                        // bind: {
                        //     value: '{derivedKarma}'
                        // }
                }]
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Comments',
                name: 'comments',
                reference: 'rejectDesc',
                margin: 20,
                // grow: true,
                // name: 'message',
                 editable: false,
                anchor: '100%',
                // labelSeparator: '',
                // allowBlank: false,
                labelAlign: "top",
                cls: 'ddo-karmacomments-cls',
                width: Constants.ViewportWidth * 0.403,
               // height: Constants.ViewportHeight * 0.25,
            },
            {
                xtype: 'toolbar',
                // height:80,
                docked: 'bottom',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        text: 'Approve',
                        //formBind: true,
                        cls: 'savebutton-cls',
                        handler: function (btn) {
                            
                            var parentRef = this.up('projectedkarmaacceptwindow').parentViewRef;
                            var rowIndex = this.up('projectedkarmaacceptwindow').rowIndex;
                            var window = btn.up('[name = acceptwindow]');
                            parentRef.clearPendingNominations(btn, true, null, null, null, null, rowIndex,window);
                        }
                    },
                    // {
                    //     xtype:'button',
                    //     text:'approve without comments',
                    //     cls: ' approvewithoutcmnf-cls'
                    // }
                ]
            },

        ]
    }]
});