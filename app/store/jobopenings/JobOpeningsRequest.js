Ext.define('DDO.store.jobopenings.JobOpeningsRequest', {
    extend: 'Ext.data.Store',
    alias: 'store.jobopeningsrequest',
    storeId: 'jobopeningsstore',
    model: 'DDO.model.jobopenings.JobOpeningsRequest',
    // autoLoad : true,
    proxy:{
        type: 'ajax',
        url: Api.URL.jobOpening.filterdatecombo,
        reader:{
            type: 'json',
            rootProperty: 'filterbyDate'
        }
    }
});