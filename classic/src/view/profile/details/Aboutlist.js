/**
 * This view is responsible for displaying user profile with the details of user.
 * @class 'DDO.view.profile.details.AboutList'
 * @extends 'Ext.view.View'
 * @alias 'aboutlist'
 * @ViewModel 'DDO.view.profile.UserProfileModel'
 * @Controller 'DDO.view.profile.UserProfileController'
 */
Ext.define('DDO.view.profile.details.AboutList', {
    extend: 'Ext.view.View',
    xtype: 'aboutlist',
    requires: [
        'DDO.store.aboutlist.AboutStore'
    ],

    store: {
        type: 'aboutstore'
    },

    cls: 'ddo-aboutlist-box',

    loadMask:false,

    /** 
     * Template for rendering all the about view details 
     */
    tpl: [
        '<tpl for=".">',

        '<div class="ddo-aboutlist-item">',
        '<div class = "ddo-aboutlist-header">',
        LabelsTitles.ABOUT,
        '</div>',
        '<div class = "ddo-aboutlist-name">{name}</div>',

        '<tpl if="this.isValid(values.role)">',
        '<div class="ddo-aboutlist-fa-wrapper"><img class="ddo-icon" src="resources/images/icons/Designation.png"/></div>',
        '<div class = "ddo-aboutlist-detail">{role}</div>',
        '</tpl>',

        '<tpl if="this.isValid(values.tempaddress)">',
        '<div class="ddo-aboutlist-fa-wrapper"><img class="ddo-icon" src="resources/images/icons/Current_Address.png"/></div>',
        '<div class = "ddo-aboutlist-detail">{[this.formatString(values.tempaddress)]}</div>',
        '</tpl>',

        '<tpl if="this.isValid(values.permanentaddress)">',
        '<div class="ddo-aboutlist-fa-wrapper"><img class="ddo-icon" src="resources/images/icons/Native_Location.png"/></div>',
        '<div class = "ddo-aboutlist-detail">{[this.formatString(values.permanentaddress)]}</div>',
        '</tpl>',

        '<tpl if="this.isValid(values.education)">',
        '<div class="ddo-aboutlist-fa-wrapper"><img class="ddo-icon" src="resources/images/icons/Education.png"/></div>',
        '<div class = "ddo-aboutlist-detail">{education}</div>',
        '</tpl>',

        '<tpl if="this.isValid(values.primaryskill)">',
        '<div class="ddo-aboutlist-fa-wrapper"><img class="ddo-icon" src="resources/images/icons/Primaray-skills.png"/></div>',
        '<div class = "ddo-aboutlist-detail">',
        LabelsTitles.PRIMARYSKILL,
        '{primaryskill}</div>',
        '</tpl>',

        '<tpl if="this.isValid(values.otherskills)">',
        '<div class="ddo-aboutlist-fa-wrapper"><img class="ddo-icon" src="resources/images/icons/Other-Skills.png"/></div>',
        '<div class = "ddo-aboutlist-detail">',
        LabelsTitles.OTHERSKILLS,
        '{[this.formatString(values.otherskills)]}</div>',
        '</div>',
        '</tpl>',

        '</tpl>',

        {
            /** 
             * Checks whether the field value exists or not.
             * 
             * @param {String} value The value of the field
             */
            isValid: function(value) {
                return !Ext.isEmpty(Ext.String.trim(value));
            },

            /**
             * Returns a formatted string with attached space after each comma.
             *
             * @param {String} str The string to be formatted.
             */
            formatString: function(str) {
                return str.split(", ").join(",").split(",").join(", ");
            }

        }
    ],
    itemSelector: 'div.ddo-aboutlist-header'
});
