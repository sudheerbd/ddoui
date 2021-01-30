Ext.define('DDO.store.jobopenings.FilterbyRole', {
    extend: 'Ext.data.Store',
    alias: 'store.filterbyRole',
    storeId: 'role',
    model: 'DDO.model.jobopenings.FilterbyRole',
    proxy:{
        type: 'ajax',
        url: Api.URL.jobOpening.filterrolecombo,
        reader:{
            type: 'json',
            rootProperty: 'filterbyRole'
        }
    }
});