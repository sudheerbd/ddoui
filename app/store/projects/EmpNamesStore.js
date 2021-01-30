Ext.define('DDO.store.projects.EmpNamesStore', {
    extend: 'Ext.data.Store',

    alias: 'store.empnamesstore',

    requires: [
        'DDO.model.projects.EmpNamesModel'
    ],

    model: 'DDO.model.projects.EmpNamesModel',
       
    //autoLoad: true,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.empnamestore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        extraParams: {
            isGroup: "false"
        }
    },

    sorters: [{
        property: "name",
        direction: "ASC"
    }]
});