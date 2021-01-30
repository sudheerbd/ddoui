Ext.define('DDO.view.profile.Header', {
    extend: 'Ext.Container',

    cls: 'ddo-mobile-profile-container',
    ui: 'headerpanel',

    xtype: 'profileheader',

    layout: {
        type: 'fit'
    },

    width: '100%',
    height: '100%',

    itemId: 'profileHeaderId',
    reference: 'profileheader',

    initialize: function() {
        this.callParent(arguments);

        var userProfile = Ext.ComponentQuery.query('userprofile')[0];

        if (userProfile) {
            Ext.getBody().on({
                scope: this,
                click: userProfile.getController().ratingLogosRenderFn,
                delegate: 'img.ddo-mobile-ratingImg-cls'
            });
        }
    },
    tpl: [
        '<tpl for=".">',
        '<div class="ddo-mobile-profile-head-wraper" style="background-image:url(\'{[this.getFieldValues(values,\'user_cover_pic_url\')]}\')">',
        '<div class="ddo-mobile-profile-head-main-div">',
        '<div class="ddo-mobile-profile-head-bg-loader">',
        '<tpl if="this.getAccessPermission(values)">',
        '<img class="ddo-mobile-cover-picture ddo-mobile-cover-img-listener" src="resources/images/icons/Change_Picture.png" width="35px;">',
        '</tpl>',
        '</div>',
        '<div class="ddo-mobile-profile-head-middle">',
        '<div class="ddo-mobile-profile-head-pic" id="profile_picture">',
        '<img class="ddo-mobile-profile-picture ddo-mobile-profile-img-listener" src="{[this.getFieldValues(values, \'user_profile_pic_url\')]}">',
        '<div class="ddo-mobile-profile-head-pic-loader">',
        '<tpl if="this.getAccessPermission(values)">',
        '<img class="ddo-mobile-profile-picture ddo-mobile-profile-img-listener"  src="resources/images/icons/Change_Picture.png" width="12px;">',
        '</tpl>',
        '</div>',
        '</div>',
        '<div class="ddo-mobile-profile-head-desc">',
        '{name} | {role} ',
        '<tpl if="this.getNominatePermission(values)">',
        '<div class="ddo-mobile-ratingDiv-cls">',
        '<tpl for="ratingdetails">',
        '<img class="ddo-mobile-ratingImg-cls" rating-id="{ratingId}" name="{name}" value="{value}" src="{imgurl}" > ',
        '</tpl>',
        '</div>',
        '</tpl>',
        '<br/>',
        '<div class="ddo-mobile-profile-head-bg-bottom">',
        '<div class="ddo-mobile-profile-head-wallet-div">',
        '<span>{[this.getFieldValues(values, \'walletpoints\')]}</span>',
        '<br><span>Wallet</span>',
        '</div>',
        '<div class="ddo-mobile-profile-head-project-div">',
        '<span>{[this.getFieldValues(values, \'projectcount\')]}</span>',
        '<br><span>Projects</span>',
        '</div>',
        '<div class="ddo-mobile-profile-head-reward-div">',
        '<span>{[this.getFieldValues(values, \'rewardpoints\')]}</span>',
        '<br><span>Rewards</span>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</tpl>', {
            getNominatePermission: function(values) {
                var userProfile = Ext.ComponentQuery.query('userprofile')[0];
                if (userProfile) {
                    var nominateAccess = userProfile.getViewModel().getData().nominateAccess;
                    return nominateAccess;
                }
            },
            getStars: function(values) {
                var html = [],
                    i = 1,
                    rating = parseFloat(values.profileRating),
                    tpl = "";
                for (var len = Math.floor(rating); i < 6; i = i + 1) {
                    if (i <= len) {
                        html.push(tpl.replace("", "<img src='resources/images/profile/Rated.png' class='ddo-mobile-profile-head-rating-img'>"));
                    } else if (rating % 1 !== 0 && i === (len + 1)) {
                        html.push(tpl.replace("", "<img src='resources/images/profile/halfRated.png' class='ddo-mobile-profile-head-rating-img'>"));
                    } else {
                        html.push(tpl.replace("", "<img src='resources/images/profile/Unrated.png' class='ddo-mobile-profile-head-rating-img'>"));
                    }
                }
                return (html.join(" "));
            },
            /**
             * To set the profile page header details
             *
             * @param data The user details for the profile header
             */
            getFieldValues: function(values, field) {
                if (!Ext.Object.getKeys(values).length) {
                    return '';
                }
                var typeMap = {
                        name: 'number',
                        role: 'string',
                        user_cover_pic_url: 'profileBgUrl',
                        user_profile_pic_url: 'profileImg',
                        walletpoints: 'number',
                        projectcount: 'number',
                        rewardpoints: 'number'
                    },

                    defaultVal = {
                        number: 0,
                        string: '',
                        profileImg: Utility.gravatarImageUrl(values.user_emilid),
                        profileBgUrl: Constants.DEFAULT_PROFILE_BG_URL
                    },
                    type, value;

                value = values[field];
                type = typeMap[field];
                value = value || defaultVal[type];
                return (value.toString && value.toString()) || '';
            },

            getAccessPermission: function(values) {
                var loginStore = Ext.getStore('login'),
                    loginUserDetails;

                if (loginStore.getCount() > 0) {
                    loginUserDetails = loginStore.getData().items[0].data;
                    if (loginUserDetails && (values.c_bpartner_id === loginUserDetails.cbpid)) {
                        return true;
                    }
                }

                return false;
            }
        }
    ],
    listeners: [{
        tap: function(view, dom, eOpt) {
            var userProfileView = Ext.ComponentQuery.query('userprofile')[0],
                profileViewModel = userProfileView.getViewModel().getData().nonPersonalAcccess;
            if (!profileViewModel) {
                if (Ext.dom.Element.get(view.currentTarget).hasCls('ddo-mobile-profile-picture')) {
                    DDO.util.Utility.isProfileImage = true;
                    userProfileView.getController().onFileLoaderView(view);
                }
            }
        },
        element: 'element',
        delegate: '.ddo-mobile-profile-img-listener'
    }, {
        tap: function(view, dom, eOpt) {
            var userProfileView = Ext.ComponentQuery.query('userprofile')[0],
                profileViewModel = userProfileView.getViewModel().getData().nonPersonalAcccess;
            if (!profileViewModel) {
                if (Ext.dom.Element.get(view.currentTarget).hasCls('ddo-mobile-cover-picture')) {
                    DDO.util.Utility.isProfileImage = false;
                    userProfileView.getController().onFileLoaderView(view);
                }
            }
        },
        element: 'element',
        delegate: '.ddo-mobile-cover-img-listener'
    }]

});