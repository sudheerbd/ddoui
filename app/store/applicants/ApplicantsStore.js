Ext.define('DDO.store.applicants.ApplicantsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.applicantsstore',
    //storeId:'applicantsstore',
    requires: [
        'DDO.model.applicants.ApplicantModel'
    ],

    model: 'DDO.model.applicants.ApplicantModel',
    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.jobApplicants.READ,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    sorters: [{
        property: "last_updated_on",
        direction: "DESC"
    }]
});
