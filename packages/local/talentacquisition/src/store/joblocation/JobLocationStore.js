Ext.define('TalentAcquisition.store.joblocation.JobLocationStore', {
    extend: 'Ext.data.Store',

    alias: 'store.joblocationstore',

    requires: [
        'TalentAcquisition.model.joblocation.JobLocation'
    ],
    storeId:'joblocationstores',
    model: 'TalentAcquisition.model.joblocation.JobLocation',
    proxy: {
        type: 'ajax',
        api: {
            read: '/joblocation',
            update: '/joblocation',
            create: '/joblocation',
            destroy: '/joblocation'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
