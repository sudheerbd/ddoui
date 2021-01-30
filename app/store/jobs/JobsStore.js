Ext.define('DDO.store.jobs.JobsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobsstore',
    requires: [
        'DDO.model.jobs.JobModel'
    ],

    model: 'DDO.model.jobs.JobModel',
    
    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.jobs.READ,
            create: Api.URL.jobs.CREATE,
            update: Api.URL.jobs.UPDATE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'POST'
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
        
    },
    sorters: [{
        property: 'role_order_date',
        direction: 'DESC'
    }]
});
