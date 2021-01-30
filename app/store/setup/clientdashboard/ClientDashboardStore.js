Ext.define('DDO.store.clientdashboard.ClientDashboardStore', {
    extend: 'Ext.data.Store',
    alias: 'store.clientdashboardStore',

  //  storeId: 'profileskillscombo',

    //autoLoad: true,
    //autoLoad:true,

    // requires: [
    //     'DDO.model.skillslist.ProfileSkillsCombo'
    // ],

    model: 'Ext.data.Model',

    proxy: {
        type: 'ajax',
        api:{
            read: Api.URL.projectclients.READ,
            update: Api.URL.projectclients.UPDATE,
             create: Api.URL.projectclients.CREATE,
             delete: Api.URL.projectclients.DELETE
        },
        // url: Api.URL.profileskillscombostore.READ,

        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
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