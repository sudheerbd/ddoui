Ext.define('DDO.view.profile.UserProfileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userprofileviewmodel',

    requires: [
        'DDO.model.profile.UserProfileModel'
    ],

    data: {
        headerData: null,
        nonPersonalAcccess: false,
        nominateAccess: false
    }
});
