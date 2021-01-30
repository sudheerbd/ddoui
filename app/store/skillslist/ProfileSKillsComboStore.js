Ext.define('DDO.store.skillslist.ProfileSkillsComboStore', {
    extend: 'Ext.data.Store',
    alias: 'store.profileskillscombo',

  //  storeId: 'profileskillscombo',

    //autoLoad: true,
    autoLoad:false,

    requires: [
        'DDO.model.skillslist.ProfileSkillsCombo'
    ],

    model: 'DDO.model.skillslist.ProfileSkillsCombo',

    proxy: {
        type: 'ajax',
        api:{
            read: Api.URL.profileskillscombostore.READ,
            update: Api.URL.profileskillscombostore.UPDATE,
            create: Api.URL.profileskillscombostore.CREATE,
            delete: Api.URL.profileskillscombostore.DELETE
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
    }

    /*sorters: [{
        property: 'skill_name',
        direction: 'ASC'
    }]*/
});