/**
 *   The file KarmaApprovalWindow.js is responsible for karma Approval  Window.
 *   @extends {Ext.window.Window}
 *   @alias widget.karmaapprovalwindow
 *   ViewController :'DDO.view.karmaapproval.KarmaApprovalController'.
 */
Ext.define('DDO.view.karmaapproval.KarmaApprovalWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.karmaapprovalwindow',
    title: 'Type a reason for rejection or change the karma score',
    width: Constants.ViewportWidth * 0.4,
    height: Constants.ViewportHeight * 0.99,
    constrain: true,
    resizable: false,
    modal: true,
    cls: 'karmarejectwin-cls',
    layout: 'fit',
    name: 'rejectwindow',
    items: [{
        xtype: 'form',
        cls: 'form-note-cls',
        reference: 'notesform',
        name: 'rejectform',
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
                
                    xtype:'textfield',
                    fieldLabel:'Karma Units',
                    name:'karmaunits',
                    reference:'karmapoints',
                    labelAlign:'top',
                    cls:'karma-rejectrequest-cls',
                    //flex:0.3,
                    width:140,
                    listeners: {
                        change: function(txtFiled, newValue){
                            var form = this.up('[reference = notesform]');
                            var parentRef = this.up('karmaapprovalwindow').parentViewRef;
                            var rowIndex = this.up('karmaapprovalwindow').rowIndex;
                            parentRef.onKarmaUnitsChange(rowIndex, newValue, form);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Month&Year',
                    name: 'nominate_month',
                    reference: 'monthyearref',
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
                    reference: 'financeRef',
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
                    reference: 'financeRef',
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
                    fieldLabel: 'Projected Karma',
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
                        reference: 'hrcoments',
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
                        reference: 'financecomments',
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
                fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.REASON,
                name: 'reject_description',
                reference: 'rejectDesc',
                margin: 20,
                grow: true,
                name: 'message',
                // editable: false,
                anchor: '100%',
                 labelSeparator: '',
                 allowBlank: false,
                labelAlign: "top",
                 enableKeyEvents: true,
                 emptyText: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.EMPTEXT,
                enforceMaxLength: true,
                 minLength: 25,
                 maxLength: 400,
                // cls: 'karma-rejectrequest-cls',
                cls: 'ddo-reasoncomments-cls',
                width: Constants.ViewportWidth * 0.403,
               // height: Constants.ViewportHeight * 0.25,
            },
            {
                xtype:'toolbar',
                // height:80,
                docked:'bottom',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items:[{
                   xtype:'button',
                   text:'discard',
                   cls:'rejectbutton-cls',
                   handler:function(btn){
                    var window= this.up('karmaapprovalwindow');
                    window.close();
                   }
                },
                {
                    xtype: 'button',
                    text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.SUBMIT,
                     formBind: true,
                     cls: 'savebutton-cls',
                    handler: function (butten) {
                        var rejectButten = butten.up("form[name=rejectform]"),
                        message = rejectButten.down('textareafield').getValue(),
                        alteredPoints = rejectButten.down('[reference=karmapoints]').getValue();
                        alteredDerivedPoints = rejectButten.down('[reference=derivedKarmaRef]').getValue();
                        window =butten.up("window[name=rejectwindow]");
                        butten.up("window[name=rejectwindow]").hide();
                        var btn=this.up('karmaapprovalwindow').rejectBtn;
                        var parentRef = this.up('karmaapprovalwindow').parentViewRef;
                        var rowIndex = this.up('karmaapprovalwindow').rowIndex;
                        parentRef.clearPendingNominations(btn, false, message, btn.name, alteredPoints, alteredDerivedPoints, rowIndex,window);
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