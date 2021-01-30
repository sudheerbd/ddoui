Ext.define('DDO.view.karmasetup.karma.KarmaViewModel', {
    extend: 'Ext.app.ViewModel',
    requires:['DDO.store.karmasetup.KarmaStore'],
    alias: 'viewmodel.karmaviewmodel',    
    data:{
        search:false
    },
     stores: {
        karmaGridStore: {
            type:'karmastore',
            autoLoad:'true'
        }
    }
});
