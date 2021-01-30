Ext.define('DDO.view.profile.details.InterestFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.interestformviewmodel',

    requires: [
        'DDO.model.interests.InterestDataModel'
    ],

    data: {
        interstFormTitle: null,
        interestData: null
    },

    stores: {
        interestStore: {
            type: 'interestsstore',
            autoLoad: true
        },

        interestData: {
            source: '{interestStore}',
            filters: [{
                property: 'temp',
                value: 'true'
            }],
            autoLoad: true
        }
    }
});