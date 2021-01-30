/**
 * The file DDO.view.mom.Mom is the view file for MoM in the Executive Dashboard.
 * @extends {Ext.container.Container}
 * @alias widget.mom
 * ViewModel : DDO.view.mom.MomNodeViewModel.
 * ViewController : 'DDO.view.mom.MomViewController'.
 */
Ext.define('DDO.view.mom.Mom', {
    extend: 'Ext.container.Container',

    alias: 'widget.mom',

    reference :'mom',
    
    requires: [
        'DDO.view.mom.MomComponent',
        'DDO.view.mom.MomTopDockBar',
        'DDO.view.mom.MomViewController',
        // 'DDO.view.mom.MomComponentCreateWindow'
    ],
    controller: 'momviewcontroller',
  
    items: [{
        xtype: 'momtopdockbar'
    }, {
        xtype: 'momcomponent'
    }]
});