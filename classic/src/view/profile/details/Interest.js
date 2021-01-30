/**
 * The file Interest is the view filr for the user interests in the profile view.
 * @extends {Ext.container.Container}.
 * @alias 'widget.interestsview'.
 * @model : 'DDO.view.interests.InterestModel'.
 * @controller : 'DDO.view.interests.InterestController'.
 */
Ext.define('DDO.view.profile.details.Interest', {
    extend: 'Ext.container.Container',
    xtype: 'interestsview',

    requires: [
        'DDO.view.profile.details.InterestsAdded',
        'DDO.view.interests.InterestModel',
        'DDO.view.interests.InterestController'
    ],
    controller: 'interestcontroller',
    viewModel: {
        type: 'interestmodel'
    },

    cls: 'ddo-profile-add-details-container',

    listeners: {
        render: 'onViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'ddo-profile-header-toolbar',
        items: [{
            xtype: 'label',
            cls: 'ddo-profile-header-label',
            bind: {
                text: '{headerData.labelName}'
            }
        }, '->', {
            xtype: 'button',
            reference: 'addinterest',
            margin: '5 0 10 0',
            cls: 'addbutton-cls',
            iconCls: 'x-fa fa fa-plus',
            ui: 'roundedbutton',
            bind: {
                text: '{headerData.buttonName}',
                hidden: '{!editable}'
            },
            handler: 'onAddClick'
        }]
    }, {
        xtype: 'textfield',
        reference: 'addtextfield',
        cls: 'ddo-interest-textfield',
        emptyText: LabelsTitles.PROFILE.INTERTESTS.EMPTYTEXT,
        hidden: true,
        enableKeyEvents: true,
        listeners: {
            specialkey: 'onAddedInterest',
            blur: 'onBlur'
        }
    }, {
        xtype: 'container',
        reference: 'interestswrapper',
        items: [{
            xtype: 'interestsadded',
            reference:'interestsadded',
            cls: 'ddo-interests-list',
            bind: {
                store: '{interestStore}'
            },
            listeners: {
                itemclick: 'onRemoveIconClick'
            }
        }]
    }]
});