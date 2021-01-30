Ext.define('DDO.view.profile.details.InterestForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'DDO.view.profile.details.InterestFormController',
        'DDO.view.profile.details.InterestFormViewModel'
    ],

    alias: 'widget.interstform',

    reference: 'interestform',

    layout: {
        type: 'vbox'
    },

    cls: 'ddo-jobs-form',

    modal: true,
    centered: false,
    hideOnMaskTap: true,
    fullscreen: true,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    controller: 'interestformviewcontroller',

    viewModel: {
        type: 'interestformviewmodel'
    },

    /**
     * @property {String} [operation="addform"]
     * Used to recognize whether the form is used to add a new rec or
     * update an existing record.
     * Takes either of these values:
     *      - addform
     *      - editform
     */
    operation: 'interestform',

    scrollable: false,

    defaults: {
        width: '100%',
        msgTarget: 'side'
    },

    itemId: 'addjobsform',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-addjobscontainer-toolbar',
        bind: {
            title: '{interstFormTitle}'
        },
        items: [{
            xtype: 'button',
            icon: 'resources/images/arrow_left.png',
            cls: 'ddo-addjobscontainer-backbtn',
            listeners: {
                tap: 'onInterestBackBtnTap'
            }
        }, {
            xtype: 'spacer'
        }, {
            xtype: 'button',
            text: 'Save',
            reference: 'savebutton',
            itemId: 'savebutton',
            ui: 'savebutton',
            formBind: true,
            cls: 'ddo-addjobscontainer-savebtn',
            listeners: {
                tap: 'onSaveBtnClick'
            }
        }]
    }, {
        xtype: 'container',
        cls:'ddo-addinterestform-cls',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            clearIcon: false,
            flex: 2,
            reference: 'addtextfield',
            cls: 'ddo-interest-textbox',
            emptyText: 'Add Your Interest'
        }/*, {
            xtype: 'button',
            cls: 'ddo-onaddinterestbutton',
            reference: 'addinterest',
            iconCls: 'x-fa fa-plus',
            bind: {
                hidden: '{editing}'
            },
            handler: 'onAddedInterest'
        }*/]
    }, {
        xtype: 'container',
        reference: 'interestswrapper',
        items: [{
            xtype: 'interestlist',
            reference: 'interestlist',
            cls: 'ddo-interest-form-list ddo-interest-container',
            bind: {
                store: '{interestData}'
            },
            listeners: {
                itemtap: 'onRemoveIconClick'
            }
        }]
    }]
});