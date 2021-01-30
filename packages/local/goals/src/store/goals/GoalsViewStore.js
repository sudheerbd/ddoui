Ext.define('Goals.store.goals.GoalsViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.goalsviewstore',
    
    requires: [
        'Goals.model.GoalsViewModel'
    ],
    
    model: 'Goals.model.GoalsViewModel',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url:'/goal/allgoals',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    },
    listeners:{
        load:function(){
            Utility.goalsArray =[];
        }
    }
});
