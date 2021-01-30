Ext.define('DDO.view.vendoraccessapp.FindApplication', {
    extend: 'Ext.container.Container',
    //alias: 'widget.findapplication',
    xtype:'findapplication',
    requires: [
        'DDO.view.vendoraccessapp.FindApplicationController',
        'DDO.view.vendoraccessapp.FindApplicationViewModel',
        'DDO.view.vendoraccessapp.FindAppForm'
    ],

    cls: 'findappview-cls',
    reference: 'findapplication',
    controller: 'findapplicationcontroller',
    viewModel:{
        type:'findapplicationviewmodel'
    },
   
    layout: {
        type: 'vbox',
        align: 'center'
       // pack: 'center'
    },

   width:'100%',

    initComponent: function() {
       
        this.callParent();
        this.add({
            xtype: 'findappform',
            plugins: 'responsive'    
        });
    }   

});