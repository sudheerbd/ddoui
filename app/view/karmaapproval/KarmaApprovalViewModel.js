/**
 * The file KarmaApprovalViewModel is the viewmodel for the KarmaApproval view class.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.karmaapprovalviewmodel'.
 */
Ext.define('DDO.view.karmaapproval.KarmaApprovalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmaapprovalviewmodel',
    requires: ['DDO.model.karmaapproval.KarmaApproval'],
    data: {
        derivedKarma: null,
        // itemsSelected:null,
        updateValue:null,
        submitDate:false
    },
    stores:{
        //This store is used for karma approval grid.
        karmaapprovalstore: {
            model:'DDO.model.karmaapproval.KarmaApproval',
            autoLoad:true, 
            pageSize:2,
            proxy: {
                type: 'ajax',
                url: Api.URL.karmaapproval.READ,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            sorters: [{
                property: "ddo_nomination_id",
                direction: "ASC"
            }]
        }
    }
});