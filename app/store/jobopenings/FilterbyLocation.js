Ext.define('DDO.store.jobopenings.FilterbyLocation', {
    extend: 'Ext.data.Store',
    alias: 'store.filterbyLocation',
    storeId: 'location',
    model: 'DDO.model.jobopenings.FilterbyLocation',
    proxy:{
        type: 'ajax',
        url: Api.URL.jobOpening.filterlocationcombo,
        reader:{
            type: 'json',
            rootProperty: 'filterbyLocation'
        }
    }
});