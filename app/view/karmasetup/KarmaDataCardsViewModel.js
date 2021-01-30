/**
 * This is viewmodel file for 'DDO.view.karmasetup.KarmaDataviewCards'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.karmadatacardsviewmodel'
 */
Ext.define('DDO.view.karmasetup.KarmaDataCardsViewModel',{
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmadatacardsviewmodel',
    requires: [
        'DDO.model.karmasetup.KarmaRuleModel'
    ],

    // stores : {
        // karmarulestore : {
        //     model: 'DDO.model.karmasetup.KarmaRuleModel',
        //     autoLoad: true,
        //     proxy: {
        //         type: 'ajax',
        //         api: {
        //             read: Api.URL.karmarule.READ,
        //             update: Api.URL.karmarule.UPDATE,
        //             create: Api.URL.karmarule.CREATE,
        //             delete: Api.URL.karmarule.DELETE
        //         },
        //         actionMethods: {
        //             read: 'GET',
        //             create: 'POST',
        //             update: 'PUT',
        //             delete: 'DELETE'
        //         },
        //         reader: {
        //             type: 'json',
        //             rootProperty: "data"
        //         }
        //     }
        // }
    // }

    
});