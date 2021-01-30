Ext.define('DDO.store.karmasetup.SelfKarmaCategoriesStore', {
    extend: 'Ext.data.Store',

    alias: 'store.selfkarmacategoriesstore',

    requires: [
        'DDO.model.karmasetup.SelfkarmaCategoriesModel'
    ],

    model:'DDO.model.karmasetup.SelfkarmaCategoriesModel',

    autoLoad: true,
    storeId:'selfkarmacategoriesstore',
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
