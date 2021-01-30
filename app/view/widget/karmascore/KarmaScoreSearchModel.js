 /**
 * This is viewmodel for view 'DDO.view.widget.karmascore.KarmaScoreSearch'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.karmascoresearch'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreSearchModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.karmascoresearch',

    data: {
        'title': 'Karma Score Details',
        'karmaScorePercentage': '',
        'nameText': 'Employee',
        'karmascoreText': 'Karma Points',
        'designationText': 'Designation',
        'slNo': 'S.No',
        'searchByNameText': 'Search By Employee Name',
        'searchByKarmaPointRangeText': 'Karma Points Range',
        'karmaFromText': 'min',
        'karmaToText': 'max',
        'searchBtnIcon': 'x-fa fa-search'
    },

    stores: {
        allkarmascores: {
            type: 'scoredetails',
            proxy: {
                extraParams: {
                    // loading all the records
                    all: true
                }
            },
            // pageSize: 50,
            autoLoad: true,
            scope: this,
            listeners: {
                load: 'onKarmaScoreLoad'
            }
        }
    }
});