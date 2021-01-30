Ext.define('DDO.store.profile.UserTimelineStore', {
    extend: 'Ext.data.Store',
    alias: 'store.usertimeline',
    requires: [
        'DDO.model.profile.UserTimelineModel'
    ],
    
    model: 'DDO.model.profile.UserTimelineModel',
    autoLoad: false,
    method: 'GET',
    storeId: 'usertimeline',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.usertimelinestore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    
    sorters: [{
        property: 'activity_on',
        direction: 'DESC'
    }]
});