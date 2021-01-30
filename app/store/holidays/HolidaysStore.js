Ext.define('DDO.store.holidays.HolidaysStore', {
    extend: 'Ext.data.Store',
    alias: 'store.holidaysstore',

  //  storeId: 'profileskillscombo',
    //autoLoad: true,
    //autoLoad:true,
    requires: [
        'DDO.model.holidays.HolidaysModel'
    ],
    model: 'DDO.model.holidays.HolidaysModel',

    proxy: {
        type: 'ajax',
        api:{
            read: Api.URL.holidays.READ,
            update: Api.URL.holidays.UPDATE,
             create: Api.URL.holidays.CREATE,
        },
        // url: Api.URL.holidays.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
        }
    },
    // listeners:{
    //     load:function(store,rec){
    //         debugger;
    //     }
    // }

    /*sorters: [{
        property: 'skill_name',
        direction: 'ASC'
    }]*/
});