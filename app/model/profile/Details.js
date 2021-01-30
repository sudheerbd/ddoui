Ext.define('DDO.model.profile.Details', {
    extend: 'Ext.data.Model',
    requires: [
        'DDO.util.Utility'
    ],

    fields: [{
        name: 'user_profile_picture',
        convert: function(value, data) {
            if (Ext.isEmpty(value)) {
                return Utility.profileImg();
            }
            return data.data.user_profile_picture;
        }
    }, {
        name: 'user_profile_cover',
        convert: function(value, data) {
            if (Ext.isEmpty(value)) {
                return "resources/images/user-bg/10-bg.png";
            }
            return data.data.user_profile_cover;

        }
    }]


});