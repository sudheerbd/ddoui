Ext.define('DDO.view.skillslist.ProfileSkillsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profileskills',

    data: {
        editing: true,
        skillsediting: false,
        nonPersonalAcccess: false,
        isPrimaryChecked:false,
        skillId: null,
        rating: null,
        isEdit: false,
        isDelete: false
    },

    formulas: {
        editable: function(get) {
            var nonPersonal = get('nonPersonalAcccess'),
                editing = get('editing');
            
            // if nonPersonal access then the profile page is not editable
            return (nonPersonal) ? false : !editing;
        }
    },

    stores: {
        profileskillsstore: {
            type: 'profileskillsstore',
            autoLoad: false
        },
        profilemonthstore: {
            type: 'profilemonthstore'
        },
        profileskillscombo: {
            type: 'profileskillscombo',
            autoLoad: true
        }
    }
});
