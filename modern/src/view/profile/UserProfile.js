Ext.define('DDO.view.profile.UserProfile', {
    extend: 'Ext.Container',

    xtype: 'userprofile',

    reference: 'userprofile',
    itemId: 'userprofile',

    requires: [
        'DDO.view.profile.Header',
        'DDO.view.profile.timeline.UserTimeline',
        'Ext.TabPanel',
        'DDO.view.profile.UserProfileViewController',
        'DDO.view.profile.UserProfileViewModel',
        'DDO.view.profile.details.UserDetails',
        'DDO.view.profile.nominate.NominateWindow'
    ],

    controller: 'userprofileviewcontroller',

    viewModel: {
        type: 'userprofileviewmodel'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',

    listeners: {
        /**
         * This custom event is fired to load the data for the user profile views.
         * Loads the data form proxy or manually based on the value of loadProxy
         * boolean.
         *
         * @param loadProxy:
         *      - true to load the store's proxy for each view
         *      - false to load the details from a manual request
         * @param [record] This is the selected record for which the data needs to
         *      be loaded.
         */
        loadprofiledata: 'onLoadProfileData'
    },

    items: [{
        height: 200,
        xtype: 'profileheader',
        bind: {
            data: '{headerData}'
        }
    }, {
        xtype: 'toolbar',
        border: false,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            flex: 1,
            text: 'View Profile',
            reference: 'detailedview',
            itemId: 'detailedview',
            cls: 'ddo-mobile-detailedbutton',
            handler: 'onDetailViewTap'
        }, {
            flex: 1,
            text: 'View Timeline',
            reference: 'timelineview',
            itemId: 'timelineview',
            cls: 'ddo-mobile-timelinebutton',
            handler: 'onTimelineTap'
        }]
    }, {
        xtype: 'container',
        reference: 'profiledetailswrap',
        itemId: 'detailstimeline',
        scrollable: 'y',
        flex: 1,    
        cls: 'ddo-mobile-detailed-timeline-card-container',
        layout: {
            type: 'card',
            align: 'stretch'
        },
        activeItem: 0,
        items: [{
            xtype: 'userdetails'
        }, {
            xtype: 'usertimeline'
        }]
    }]
});