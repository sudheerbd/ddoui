Ext.define('DDO.view.profile.details.Interest', {
    extend: 'Ext.container.Container',
    xtype: 'interest',

    requires: [
        'DDO.view.profile.details.InterestViewModel',
        'DDO.view.profile.details.InterestViewController',
        'DDO.view.profile.details.InterestList'
    ],

    controller: 'interestviewcontroller',

    viewModel: {
        type: 'interestviewmodel'
    },

    cls: 'ddo-profileinterests-maincontainer',

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-interest-header-toolbar',
        items: [{
            xtype: 'label',
            html: 'Interests',
            cls: 'ddo-interest-header-label'
        }, '->', {
            cls: 'ddo-onaddeducation',
            reference: 'addinterest',
            iconCls: 'x-fa fa-plus',
            bind: {
                hidden: '{editing}'
            },
            handler: 'onAddClick'
        }]
    }, {
        xtype: 'container',
        reference: 'interestswrapper',
        items: [{
            xtype: 'interestlist',
            reference: 'interestlist',
            //closeImg: 'none',
            cls: 'ddo-interests-list',
            bind: {
                store: '{interestStore}'
            },
            listeners: {
                itemtap: 'onRemoveIconClick'
            }
        }]
    }]
});