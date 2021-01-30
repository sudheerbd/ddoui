Ext.define('DDO.store.karmasetup.KarmaRuleStore', {
    extend: 'Ext.data.Store',

    alias: 'store.karmarulestore',

    requires: [
        'DDO.model.karmasetup.KarmaRuleModel'
    ],

    model: 'DDO.model.karmasetup.KarmaRuleModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.karmarule.READ,
            update: Api.URL.karmarule.UPDATE,
            create: Api.URL.karmarule.CREATE,
            delete: Api.URL.karmarule.DELETE
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            delete: 'DELETE'
        },
        // url: 'resources/data/karmasetup/rule.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
}); 