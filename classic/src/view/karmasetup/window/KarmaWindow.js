Ext.define('DDO.view.karmasetup.window.KarmaWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.view.karmasetup.window.KarmaPoints',
        'DDO.view.karmasetup.karma.KarmaForm',
        'DDO.view.karmasetup.karma.KarmaContainerView',
        'DDO.view.karmasetup.karma.KarmaWindowViewsController',
        'DDO.view.karmasetup.karma.KarmaWindowViewsModel',
        'DDO.view.karmasetup.window.KarmaProRated'
    ],

    //cls:'rule-window-cls',
    
    alias: 'widget.karmawindow',
    //width:500,
    width : 650,

    controller: 'karmawindowviewscontroller',
    viewModel: {
        type: 'karmawindowviewsmodel'
    },

    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController(),
        walletComboStore = Ext.getStore('karmasetup.wallet.WalletComboStore');
        if(!walletComboStore.isLoaded()){
            walletComboStore.load();
        }

        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },


    items: [{
         xtype:'container',
         reference:'karmaRatingCardRef',
         layout:{
            type:'card'
        },
        items:[{
            xtype:'karmaform'
        },{
            xtype:'ddokarmacontainer',
            autoScroll:true
        },{
             xtype:'karmapoints'
        },{
            xtype : 'karmaprorated'
        }]
    }]
   
});