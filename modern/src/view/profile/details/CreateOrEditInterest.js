Ext.define('DDO.view.profile.details.CreateOrEditInterest', {
    extend: 'Ext.panel.Panel',
    xtype: 'createoreditinterest',

    requires: [
        'DDO.view.profile.details.InterestList'
    ],

    width: '100%',
    height: '100%',

    layout: {
        type: 'vbox',
        align: 'stretchmax'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'interestToolbar-cls',
        flex: 0.4,
        items: [{
            xtype: 'button',
            iconCls: 'x-fa fa-arrow-left',
            cls: 'backBtn-cls'
        }, {
            xtype: 'label',
            html: 'Add Interests',
            cls: 'addInterestLbl-cls'
        }, '->', {
            cls: 'saveTxt-cls',
            text: 'Save'
        }]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox'
        },
        cls: 'addContainer-cls',
        flex: 0.3,
        items: [{
            xtype: 'textfield',
            placeHolder: 'Write your interests',
            flex: 0.9,
            clearIcon: false
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            cls: 'addBtn-cls',
            flex: 0.1
        }]
    }, {
        xtype: 'interestlist',
        closeImg: 'initial',
        flex: 4.3
    }]
});