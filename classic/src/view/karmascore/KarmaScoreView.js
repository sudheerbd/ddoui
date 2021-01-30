/**
 *   This file  is responsible for KarmaScoreView.
 *   @extends {Ext.container.Container}
 *   @alias widget.karmascoreview
 *   ViewModel: 'DDO.view.karmascore.KarmaScoreViewModel'.
 *   ViewController :'DDO.view.karmascore.KarmaScoreViewController'.
 */
Ext.define('DDO.view.karmascore.KarmaScoreView', {
    extend: 'Ext.container.Container',
    alias: 'widget.karmascoreview',
    cls: 'karmaScoreview-cls',
    layout: {
        type: 'hbox'
    },
    margin:'5 0 0 5',
    requires: [
        'DDO.view.karmascore.KarmaScoreViewController',
        'DDO.view.karmascore.KarmaScoreViewModel',
        'DDO.view.karmascore.KarmaScoreAdvancedSearchView',
        'DDO.view.karmascore.KarmaScoreFilterView'
    ],
    controller: 'karmascoreview',
    viewModel: {
        type: 'karmascoreview'
    },
    initComponent:function(){
        this.callParent(arguments);
         Ext.getBody().mask('');
    },
    items: [{
        xtype: 'container',
        flex:0.78,
        items: [{
            xtype: 'karmascoreadvancedsearchview'
        }]
    }, {
        xtype: 'karmascorefilterview',
         bind:{
           hidden:'{showkarmascorefilters}' //defind in MainView model
       },
        flex:0.22
    }]
});