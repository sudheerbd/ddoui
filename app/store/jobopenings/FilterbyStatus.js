Ext.define('DDO.store.jobopenings.FilterbyStatus', {
    extend: 'Ext.data.Store',
    alias: 'store.filterbyStatus',
    storeId: 'status',
    model: 'DDO.model.jobopenings.FilterbyStatus',
    proxy:{
        type: 'ajax',
        url: Api.URL.jobOpening.filterstatuscombo,
        reader:{
            type: 'json',
            rootProperty: 'filterbyStatus'
        }
    }
});