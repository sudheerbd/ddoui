Ext.define('DDO.view.finance.FinanceKarmaWindow', {
        extend:'Ext.window.Window',
        alias:'widget.financekarmawindow',
        title:LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.KARMAREVIEW,
        width: Constants.ViewportWidth * 0.34,
        height:  Constants.ViewportHeight*0.9,
        constrain: true,
        resizable: false,
        modal: true,
        //layout: 'fit',
        scrollable: 'y',
        bbar:{
            items:[{
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.SUBMIT,
            formBind: true,
            cls: 'karma-submit-finance',
            margin:'0 0 0 20',
            handler: function (button,btn) {
                var financeWindow = this.up('window');
                var formValues =financeWindow.down('form').getValues();
                var btn=financeWindow.acceptBtn;
                var rowIndexRecord = financeWindow.rowIndex;
                financeWindow.hide();
                var parentRef = financeWindow.parentRefView;
                parentRef.clearPendingNominations(financeWindow,btn, formValues,rowIndexRecord);
            }
        }]
        },
    items: [{
        xtype:'form',
        reference:'financekarmaform',
        name:'financekarmaform',
            defaults:{
            labelSeparator:''
            },
        items: [{
            xtype: 'fieldcontainer',
            layout: 'vbox',
            margin: 10,
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        //      {
                        //     xtype:'label',
                        //     text:LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMAUNITS,
                        //     //margin:'0 0 0 15'
                        // },
                        {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-finance',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.KARMAUNITS,
                            labelAlign: 'top',
                            name:'karmaunits',
                            editable: false,
                            width: Constants.ViewportWidth * 0.157,
                        }, {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-finance',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.KARMAMONTH,
                            labelAlign: 'top',
                            name: 'nominate_month',
                            width: Constants.ViewportWidth * 0.157,
                            editable: false,
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-finance',
                            fieldLabel:  LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.FROM,
                            labelAlign: 'top',
                            name: 'fromname',
                            width: Constants.ViewportWidth * 0.157,
                            editable: false,
                        },
                        {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-finance',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.SUBMITEDDATE,
                            labelAlign: 'top',
                             name: 'submiteddate',
                            width: Constants.ViewportWidth * 0.157,
                            editable: false
                        },

                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-finance',
                            fieldLabel:  LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.CATEGORY,
                            labelAlign: 'top',
                            name: 'karmacategory_name',
                            width: Constants.ViewportWidth * 0.157,
                            editable: false,
                        },
                         {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-finance',
                            fieldLabel:LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.KARMANAME,
                            labelAlign: 'top',
                            name: 'karma_name',
                            width: Constants.ViewportWidth * 0.157,
                            editable: false,
                        },
                    ]
                },
            {
                xtype: 'container',
                layout: 'hbox',
                items:[{
                    xtype: 'textfield',
                    cls: 'karmascore-cls-financereview',
                    fieldLabel:LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.FINANCEREVIEWPOINTS,
                    labelAlign: 'top',
                    name:'financeprojectedkarma',
                    width: Constants.ViewportWidth * 0.157,
                },{
                    xtype: 'textfield',
                    cls: 'karmascore-cls-finance',
                    fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.DERIVEDPOINTS,
                    labelAlign: 'top',
                    name: 'derived_karma_points',
                    width: Constants.ViewportWidth * 0.157,
                    editable: false,
                }]
               
            },{
                xtype: 'textarea',
                fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.USERCOMMENTS,
                name: 'comments',
                labelAlign: 'top',
                reference: 'usercomments',
                // padding:'0 20 0 0',
                editable: false,
               // width: Constants.ViewportWidth * 0.3,
                height:Constants.ViewportHeight * 0.1226,
                cls: 'ddo-usercomments-cls',
                flex: 0.3,
              },
                {
                    xtype:'label',
                    text: LabelsTitles.EXECUTIVEDASHBOARD.FINANCE.COMMENTS,
                    margin:'0 0 0 15',
                    cls:'finance-lable-cls'
                },
                {
                    
            xtype: 'textareafield',
            name: 'finance_accept_description',
            reference: 'finance_accept_description',
            cls: 'karma-comments-finance',
            grow: true,
            allowBlank: false,
            enableKeyEvents: true,
            emptyText: "Please enter the reason",
            enforceMaxLength: true,
            minLength: 20,
            maxLength: 400,
            width: Constants.ViewportWidth * 0.3,
            height:  Constants.ViewportHeight * 0.247,
                }]

        }],

    }]
});