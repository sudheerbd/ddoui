Ext.define('Goals.store.goals.GoalsParentComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.goalsparentcombo',

    requires: [
        'Goals.model.GoalsParentComboModel'
    ],

    model: 'Goals.model.GoalsParentComboModel',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/sharegoal',
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET'
        }
    }
})