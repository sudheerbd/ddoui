Ext.define( 'DDO.store.karmascore.PrimarySkillsComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.primaryskills',

    requires: [
        'DDO.model.karmascore.PrimarySkills'
    ],

    model: 'DDO.model.karmascore.PrimarySkills',

    proxy: {
        type: 'ajax',
        url: Api.URL.primaryskillscombostore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: "primaryskill_name",
        direction: "ASC"
    }]

});