Ext.define('TalentAcquisition.store.jobeducation.JobEducationStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobeducationstore',

    requires: [
        'TalentAcquisition.model.jobeducation.JobEducation'
    ],
    model: 'TalentAcquisition.model.jobeducation.JobEducation',
    autoLoad:'true',
    storeId:'jobeducationstore',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobeducation',
            update: '/jobeducation',
            create: '/jobeducation',
            destroy: '/jobeducation'
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
