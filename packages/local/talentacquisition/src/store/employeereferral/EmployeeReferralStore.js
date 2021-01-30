Ext.define('TalentAcquisition.store.employeereferral.EmployeeReferralStore', {
    extend: 'Ext.data.Store',

    alias: 'store.employeereferralstore',

    requires: [
        'TalentAcquisition.model.employeereferral.EmployeeReferral'
    ],
    storeId:'employeereferralstore',
    model: 'TalentAcquisition.model.employeereferral.EmployeeReferral',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/employeereferral',
            update: '/employeereferral',
            create: '/employeereferral',
            destroy: '/employeereferral'
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
