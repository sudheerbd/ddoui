Ext.define('DDO.store.settings.GoalSettings', {
    extend: 'Ext.data.Store',

    alias: 'store.goalsettings',

    requires: [
        'DDO.model.settings.GoalSettings'
    ],

    model: 'DDO.model.settings.GoalSettings',

    proxy: {
        type: 'ajax',
        url: Api.URL.goalsettings.READ,
        
        actionMethods: {
            read: 'GET'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});