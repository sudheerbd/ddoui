Ext.define('DDO.store.profile.ProvitionToCnfmStore', {
    extend: 'Ext.data.Store',

    alias: 'store.ProvitionToCnfmStore',

    requires:['DDO.model.profile.ProvitionToCnfmModel'],

    model:'DDO.model.profile.ProvitionToCnfmModel',
    autoLoad:false,
  
    proxy: {
        type: 'ajax',
        api: {
           read: Api.URL.probationtocnfm.READ,
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
         reader: {
             type: 'json',
             rootProperty: "data"
         },
         writer: {
            writeAllFields: true
       }
    },
    sorters: [{
        property: 'duedate',
        direction: 'ASC'
        }]
   
});