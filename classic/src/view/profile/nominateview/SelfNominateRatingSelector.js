Ext.define('DDO.view.profile.nominateview.SelfNominateRatingSelector', {
    extend: 'Ext.container.Container',

    alias: 'widget.selfnominateratingselectorref',

    padding: '13 0 0 32',
   reference:"selfnominateratingselectorref",
    requires: [
        'Ext.container.ButtonGroup',
        'DDO.store.karmasetup.SelfKarmaCategoriesStore'
    ],   
initComponent: function() {
    this.callParent(arguments);
    var karmaCategoryViewStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
    if(karmaCategoryViewStore.isLoaded()){
        // Utility.addSelfKarmaCategories(karmaCategoryViewStore, this);
        Utility.addKarmaCategories(karmaCategoryViewStore, this);
        Utility.isRendered = true;
    }else{
    karmaCategoryViewStore.load({
        scope:this,
        callback:function(argument) {
            Utility.addKarmaCategories(karmaCategoryViewStore, this);
        Utility.isRendered = true;
        }
    })
        
    }
},
listeners: {
    afterrender: function(me, e, eOpts) {
        var karmaCategoryViewStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
            if (Utility.isRendered) {
                Utility.isRendered = false;
            } else {
                Utility.addKarmaCategories(karmaCategoryViewStore, me);
            }
    }
}

   
});