Ext.define( 'DDO.store.karmascore.ProjectComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.project',

    requires: [
        'DDO.model.karmascore.Project'
    ],

    model: 'DDO.model.karmascore.Project',
    
    proxy: {
        type: 'ajax',
        url: Api.URL.projectcombostore.READ,
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    sorters: [{
        property: "name",
        direction: "ASC"
    }]
});