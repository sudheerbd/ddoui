/**
 * This view is responsible for displaying profile header in user profile view.
 * @class 'DDO.view.profile.Header'
 * @extends 'Ext.form.Panel'
 * @alias 'profileheader'
 * @ViewModel 'DDO.view.profile.UserProfileModel'
 * @Controller 'DDO.view.profile.UserProfileController'
 */
Ext.define('DDO.view.profile.Header', {
    extend: 'Ext.form.Panel',

    ui: 'headerpanel',
    xtype: 'profileheader',

    requires: [
        'Ext.draw.sprite.Line',
        'Ext.draw.Container',
        'Ext.ux.rating.Picker',
        'Ext.form.Label',
        'Ext.form.field.File',
        'DDO.view.widget.wallethistory.WalletAndKarmascoreHistory',
        'DDO.view.widget.wallethistory.WalletDescriptionWindow'
    ],

    cls: 'userProfile-container',
    width: '100%',
    height: '100%',
    bodyPadding: 0,

    layout: {
        type: 'vbox',
        align: 'middle'
    },

    items: [{
        xtype: 'container',
        width: '100%',
        margin: 15,
        height: 25,
        layout: {
            type: 'hbox',
            align: 'right'
        },
        items: [{
            flex: 1
        }, {
            xtype: 'filefield',
            opType: 'upload',
            name: 'coverImage',
            cls: 'userProfileBtn',
            buttonOnly: true,
            buttonText: '',
            width: 50,
            listeners: {
                change: 'onCoverPicChange'
            }
        }]

    }, {
        xtype: 'container',
        cls: 'userProfilePic',
        height: Constants.ViewportHeight * 0.187,
        width: Constants.ViewportWidth * 0.088,
        padding: '0 0 0 2',
        bind: {
            style: {
                background: 'url("{profileImg}"),url('+Utility.defaultImg+')'
            }
        },
        layout: {
            type: 'vbox'
        },
        items: [{
            flex: 1
        }, {
            xtype: 'filefield',
            opType: 'upload',
            name: 'profileImage',
            cls: 'userProfileBtn profileCamera-cls',
            buttonOnly: true,
            buttonText: '',
            margin: '10 0 0 0',
            height: 30,
            width: 50,
            listeners: {
                change: 'onCoverPicChange'/* we implemented amazonS3 bucket for uploading images.so we are using onCoverPicChange function instead of onProfilePic change function for eliminating duplicate code*/ 
            }
        }]

    },
    //to bind the user profile name
    {
        xtype: 'label',
        cls: 'userProfileName',
        bind: {
            html: '{name}'
        }
    }, {
        xtype: 'draw',
        width: Constants.ViewportWidth * 0.22,
        height: 2,
        sprites: [{
            type: 'line',
            fromX: 20,
            fromY: 0,
            toX: 120,
            toY: 0,
            strokeStyle: '#ffff',
            lineWidth: 3
        }]
    },
    // to bind the user designation.
    {
        xtype: 'label',
        cls: 'userProfileDesc',
        bind: {
            html: '{designation}'
        }
    },
     {
        xtype: 'toolbar',
        cls: 'widget-follower-toolbar2',
        margin: '0 0 50 0',
        defaults: {
            xtype: 'displayfield',
            padding:10,
            labelAlign: 'top'
        },
        items: [{
            bind: {
                value: '<div class="label" >{walletAmount}<br/>Wallet</div>'
            },
            listeners: {
                afterrender: 'afterWalletRender'
            }

        }, {
            bind: {
                value: '<div class="label labelborder" >{rewardsPoint}<br/>KarmaScore</div>'
            },
            listeners: {
                afterrender: 'afterKarmaScoreRender'
            }
        }]
    }]
});
