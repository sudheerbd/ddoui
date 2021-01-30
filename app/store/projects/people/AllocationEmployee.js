Ext.define('DDO.store.projects.people.AllocationEmployee', {
    extend: 'Ext.data.Store',

    alias: 'store.allocationemployee',

    requires: [
        'DDO.model.projects.people.AllocationEmployee'
    ],

    model: 'DDO.model.projects.people.AllocationEmployee',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: '/utility/getempbasiclist',
        url: Api.URL.allocationemployee.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    sorters: [{
        property: 'name',
        direction: 'ASC'
    }]
});