/**
 * This file is the view model for 'DDO.view.profile.details.Interest'.
 * @extends {Ext.app.ViewModel}.
 * @alias 'viewmodel.interestmodel'
 */
Ext.define('DDO.view.interests.InterestModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.interestmodel',

    data: {
        "headerData": {
            "labelName": "Interests",
            "buttonName": "Add Interest"
        },
        // used to hide the add button in editing mode
        editing: true,
        nonPersonalAcccess: false 
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
        interestStore: {
            autoLoad: false,
            type: 'interestsstore'
        }
    }
});