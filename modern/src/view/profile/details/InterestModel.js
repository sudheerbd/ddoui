Ext.define('DDO.view.profile.details.InterestModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.interestmodel',

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