Ext.define('DDO.store.jobopenings.JobRecruiter', {
    extend: 'Ext.data.Store',
    alias: 'store.jobrecruiter',

    requires: [
        'DDO.model.jobopenings.JobRecruitersModel'
    ],

    model: 'DDO.model.jobopenings.JobRecruitersModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url:  Api.URL.jobrecruiter.READ,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});