Ext.define('DDO.view.hr.HrViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.hrviewmodel',
    requires: ['DDO.model.hr.HrApproval'],
    data: {
        derivedKarma: null
    },
    stores:{
        //This store is used for karma approval grid.
        hrreviewstore: {
            model:'DDO.model.hr.HrApproval',
            autoLoad:true, 
            proxy: {
                type: 'ajax',
                url: Api.URL.hrapproval.READ,
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