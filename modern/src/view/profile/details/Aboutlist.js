/**
 * The file AboutList is the view file for the about user which will be having overview of the details.
 * @extends {Ext.dataview.DataView}.
 * @alias 'widget.aboutlist'
 */
Ext.define('DDO.view.profile.details.AboutList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'aboutlist',

    requires: [
        'DDO.store.aboutlist.AboutStore'
    ],

    scrollable: false,

    cls: 'ddo-aboutlist-box',

    /** 
     * Template for rendering all the about view details
     */
    itemTpl: [
        '<tpl for=".">',

        '<div class="ddo-aboutlist-item">',
        '<div class = "ddo-aboutlist-header">',
        LabelsTitles.ABOUT,
        '</div>',

        '<tpl if="this.isValid(values.role)">',
        '<div class="ddo-aboutlist-fa-wrapper role-img-cls"><img class="ddo-icon" src="resources/images/icons/Designation.png"/></div>',
        '<div class = "ddo-aboutlist-detail role-cls">{role}</div>',
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
        '{[this.formatString(values.primaryskill)]}</div>',
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

    itemSelector: 'div.ddo-aboutlist-header',

    store: {
        type: 'aboutstore'
    }
});