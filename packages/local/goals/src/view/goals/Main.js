/**
 * This view is main container for all goal related view and functionality.
 * @class 'Goals.view.goals.Main'.
 * @extends 'Ext.container.Container'
 */
Ext.define('Goals.view.goals.Main', {
    extend: 'Ext.container.Container',

    alias: 'widget.goals-main',
    requires: [
        'Goals.view.ExecutivePlanMain',
        'Goals.view.goals.GoalsMainView',
        'Goals.util.LabelsTitles',
        'Goals.util.Messages',
        'Goals.util.Constants'
    ],

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            layout: 'card',
            activeItem: 1,
            height: Constants.ViewportHeight, //700 previously mentioned.
            items: [{
                xtype: "executiveplanmainview"
            }, {
                xtype: "goalsmainview"
            }]
        });
        me.callParent(arguments);
    }
});