Ext.define('DDO.store.setup.designation.DesignationStore', {
    extend: 'Ext.data.Store',

    alias: 'store.designationstore',
    requires: [
       'DDO.model.setup.designation.DesignationModel'
    ],

    autoLoad:false,

    model:'DDO.model.setup.designation.DesignationModel',
    
     proxy: {
        type: 'ajax',
        api: {
            read: Api.URL.designation.READ,
            create: Api.URL.designation.CREATE,
            update: Api.URL.designation.UPDATE
        },
        reader: {
            type: 'json',
            rootProperty: "data"
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT'
        }
    },
    filters: [{
        property: 'ddo_dup_designation_id',
        value: true
    }],
    sorters: [{
            property: "name",
            direction: "ASC"
        }
    //     {
    //     property: "ddo_designation_id",
    //     direction: "ASC"
    // },
    // {
    //     transform: function(item) {
    //         if(item)            
    //         return item.toLowerCase();
    //     },
    //     property: "acronym",
    //     direction: "ASC"
    // }
]
});