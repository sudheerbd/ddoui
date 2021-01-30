Ext.define('DDO.store.education.EducationDataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.educationdatastore',
    requires: [
        'DDO.model.education.EducationDataModel'
    ],
    model: 'DDO.model.education.EducationDataModel',

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.education.READ,
            create: Api.URL.education.CREATE,
            update: Api.URL.education.UPDATE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT'
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            writeAllFields: true
        }
    }
});