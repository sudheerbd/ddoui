Ext.define('Goals.store.goals.ProjectStore', {
    extend: 'Ext.data.Store',
    alias: 'store.projectstore',
    
    requires: [
        //'DDO.model.goals.GoalsViewModel'
    ],
    
    //model: 'DDO.model.goals.GoalsViewModel',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: '/resources/data/goals/projectstore.json',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});