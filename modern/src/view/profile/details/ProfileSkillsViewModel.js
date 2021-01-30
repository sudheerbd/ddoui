Ext.define('DDO.view.profile.details.ProfileSkillsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profileskillsviewmodel',

    data: {
        editing: false
    },

    stores: {
        profileskillsstore: {
            type: 'profileskillsstore'
        },
        profilemonthstore: {
            type: 'profilemonthstore'
        }
    }
});