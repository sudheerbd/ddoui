Ext.define('DDO.view.hr.HrKarmaWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.hrkarmawindow',
    title: LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMAREVIEW,
    width: Constants.ViewportWidth * 0.34,
    height: Constants.ViewportHeight * 0.9,
    constrain: true,
    resizable: false,
    modal: true,
    //layout: 'fit',
    scrollable: 'y',
    bbar: {
        items: [{
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.HR.SUBMIT,
            formBind: true,
            cls: 'karma-submit-hr',
            margin: '0 0 0 20',
            handler: function (button, btn) {
                var hrWindow = this.up('window');
                var formValues = hrWindow.down('form').getValues();
                var btn = hrWindow.acceptBtn;
                var rowIndexRecord = hrWindow.rowIndex;
                hrWindow.hide();
                var parentRef = hrWindow.parentRefView;
                parentRef.clearPendingNominations(hrWindow, btn, formValues, rowIndexRecord);
            }
        }]
    },
    items: [{
        xtype: 'form',
        reference: 'hrkarmaform',
        name: 'hrkarmaform',
        defaults: {
            labelSeparator: ''
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
                        {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-hr',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMAUNITS,
                            labelAlign: 'top',
                            name:'karmaunits',
                           // name: 'hrprojectedkarma',
                            editable: false,
                            width: Constants.ViewportWidth * 0.157,
                        }, {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-hr',
                            fieldLabel:  LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMAMONTH,
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
                            cls: 'karmascore-cls-hr',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.FROM,
                            labelAlign: 'top',
                            name: 'fromname',
                            width: Constants.ViewportWidth * 0.157,
                            editable: false,
                        },
                        {
                           
                            xtype: 'textfield',
                            cls: 'karmascore-cls-hr',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.SUBMITEDDATE,
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
                            cls: 'karmascore-cls-hr',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.CATEGORY,
                            labelAlign: 'top',
                            name: 'karmacategory_name',
                            width: Constants.ViewportWidth * 0.157,
                            editable: false,
                        },
                         {
                            xtype: 'textfield',
                            cls: 'karmascore-cls-hr',
                            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.KARMANAME,
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
                cls: 'karmascore-cls-hrreview',
                fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.HRREVIEWPOINTS,
                labelAlign: 'top',
                name: 'hrprojectedkarma',
                width: Constants.ViewportWidth * 0.157,
                  },{
                    xtype: 'textfield',
                    cls: 'karmascore-cls-hr',
                    fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.DERIVEDPOINTS,
                    labelAlign: 'top',
                    name: 'derived_karma_points',
                    width: Constants.ViewportWidth * 0.157,
                    editable: false,
                  }]
              },{
                xtype: 'textarea',
                fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.HR.USERCOMMENTS,
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
                    xtype: 'label',
                    text: LabelsTitles.EXECUTIVEDASHBOARD.HR.COMMENTS,
                    margin: '0 0 0 15',
                    cls:'hr-lable-cls'
                },
                {
                    xtype: 'textareafield',
                    labelAlign: 'top',
                    name: 'hr_accept_description',
                    reference: 'hr_accept_description',
                    cls: 'karma-comments-hr',
                    grow: true,
                    // anchor: '100%',
                    allowBlank: false,
                    enableKeyEvents: true,
                    emptyText: "Please enter the reason",
                    enforceMaxLength: true,
                    minLength: 20,
                    maxLength: 400,
                    width: Constants.ViewportWidth * 0.3,
                    height: Constants.ViewportHeight * 0.247,
                }]

        }],

    }]
});