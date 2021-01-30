Ext.define('DDO.store.karmasetup.KarmaCategoriesStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmacategoriesstore',

    requires: [
        'DDO.model.karmasetup.KarmaCategoriesModel'
    ],

    model: 'DDO.model.karmasetup.KarmaCategoriesModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.karmacategory.READ,
            update: Api.URL.karmacategory.UPDATE,
            create: Api.URL.karmacategory.CREATE,
            delete: Api.URL.karmacategory.DELETE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            delete: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});
