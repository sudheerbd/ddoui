/**
 * The file EducationModel is the view model for DDO.view.profile.details.Education.
 * @extends {Ext.app.ViewModel}.
 * @alias 'viewmodel.educationmodel'.
 */
Ext.define('DDO.view.education.EducationModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.educationmodel',

    data: {
        editing: true,
        nonPersonalAcccess: false
    },
    stores: {
        educationdatastore: {
            type: 'educationdatastore',
            autoLoad: false
        }
    }
});