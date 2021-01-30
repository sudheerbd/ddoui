/**
 *   This file is responsible for Account Detail View Form of 'DDO.view.setup.Account'.
 *   @extends {Ext.form.FormPanel}
 *   @alias widget.accountdetail
 *   ViewModel : 'DDO.view.setup.AccountViewModel'
 *    ViewController : 'DDO.view.setup.AccountViewController'
 */
Ext.define('DDO.view.setup.AccountDetail', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.accountdetail',
    defaults: {
        labelSeparator: '',
        width: Constants.ViewportWidth * 0.64,
    },
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch',
    },
    items: [{
        xtype: 'container',
        defaults: {
            labelSeparator: '',
            flex: 0.5,
            padding: 10,
            afterLabelTextTpl: LabelsTitles.EMPSETUP.ACCOUNT.MANDATORYFIELD
        },
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.NAME,
            name: 'name',
            readOnly: true,
            allowBlank:false,
            inputType: 'text',
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.CMPNAME,
            blankText: 'Company name is required'
        }, {
            xtype: 'textfield',
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.EMAIL,
            name: 'requestemail',
            readOnly: true,
            allowBlank:false,
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.EMAIL,
            vtype: 'email'
        }]
    }, {
        xtype: 'container',
        defaults: {
            labelSeparator: '',
            width: '50%',
            padding: 10,
        },
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'textarea',
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.OVERVIEW,
            name: 'description',
            padding: 10,
            inputType: 'text',
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.OVERVIEWPLACEHOLDER
        }]
    }, {
        xtype: 'container',
        defaults: {
            labelSeparator: '',
            padding: 10,
        },
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.ADDRESS,
            name: 'address',
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.ADDRESS,
            flex: 0.5
        }, {
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.PHONENO,
            xtype: 'numberfield',
            name: 'phonenumber',
            hideTrigger: true,
            allowBlank: false,
            regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            regexText:  LabelsTitles.EMPSETUP.ACCOUNT.REGPHONENO,
            enforceMaxLength: true,
            maxLength: 10,
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.PHONENO,
            afterLabelTextTpl: LabelsTitles.EMPSETUP.ACCOUNT.MANDATORYFIELD,
            msgTarget: 'side',
            flex: 0.5
        }]
    }, {
        xtype: 'container',
        defaults: {
            labelSeparator: '',
            padding: 10,
            msgTarget: 'side',
        },
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.COUNTRY,
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.COUNTRY,
            reference: 'countryref',
            vtype:'alpha',
            name: 'country',
            flex: 0.5
        }, {
            xtype: 'textfield',
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.STATE,
            reference: 'stateref',
            vtype:'alpha',
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.STATE,
            name: 'state',
            flex: 0.5
        }]
    }, {
        xtype: 'container',
        defaults: {
            labelSeparator: '',
            padding: 10,
            msgTarget: 'side',
        },

        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.CITY,
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.CITY,
            reference: 'cityref',
            vtype:'alpha',
            name: 'city',
            flex: 0.5
        }, {
            xtype: 'numberfield',
            hideTrigger: true,
            enforceMaxLength: true,
            maxLength: 6,
            fieldLabel: LabelsTitles.EMPSETUP.ACCOUNT.POSTALCODE,
            allowBlank:false,
            name: 'zipcode',
            emptyText: LabelsTitles.EMPSETUP.ACCOUNT.POSTALCODE,
            flex: 0.5
        }]
    }, {
        xtype: 'toolbar',
        items: [{
            text: LabelsTitles.EMPSETUP.ACCOUNT.RESET,
            hidden: true,
            name: 'reset',
            cls: 'karmaform-cancel-btn',
            handler: 'accountFormReset'
        }, {
            text: LabelsTitles.EMPSETUP.ACCOUNT.UPDATE,
            name: 'submit',
            formBind: true,
            left: 0,
            cls: 'karmaform-save-btn karmaform-save',
            handler: 'accountFormSubmit'
        }]
    }]
});