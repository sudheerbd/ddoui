Ext.define('DDO.store.profile.ProfileMonthStore', {
    extend: 'Ext.data.Store',
    alias: 'store.profilemonthstore',
    requires: [
        'DDO.model.profile.ProfileMonthModel'
    ],
    model: 'DDO.model.profile.ProfileMonthModel',
    storeId: 'profilemonthstore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'resources/data/profile/months.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});