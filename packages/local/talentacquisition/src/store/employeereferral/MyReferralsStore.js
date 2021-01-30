Ext.define('TalentAcquisition.store.employeereferral.MyReferralsStore', {
    extend: 'Ext.data.Store',

    alias: 'store.myreferralsstore',

    requires: [
        'TalentAcquisition.model.employeereferral.EmployeeReferral'
    ],
    storeId:'myreferralsstore',
    model: 'TalentAcquisition.model.employeereferral.EmployeeReferral',
    proxy: {
        type: 'ajax',
        api: {
            read: '/employeereferral'
        },
        actionMethods: {
            read: 'GET'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
