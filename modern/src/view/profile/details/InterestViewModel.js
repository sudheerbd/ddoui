Ext.define('DDO.view.profile.details.InterestViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.interestviewmodel',

    data: {
        // // used to hide the add button in editing mode
        editing: false,
        nonPersonalAcccess: false
    },

    stores: {
        interestStore: {
            storeId: 'interestdata',
            autoLoad: true,
            type: 'interestsstore'
        }
    }
});