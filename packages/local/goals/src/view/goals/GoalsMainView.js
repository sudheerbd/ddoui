/**
 * This view is responsible for search goal view in goals view.
 * @class 'Goals.view.goals.GoalsMainView'
 * @extends 'Ext.panel.Panel'
 * @alias 'widget.goalsmainview'
 * @ViewModel 'Goals.view.goals.GoalMainViewModel'
 * @Controller 'Goals.view.goals.GoalMainViewController'
 */
Ext.define('Goals.view.goals.GoalsMainView', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.goalsmainview',

    requires: [
        'Goals.view.goals.GoalsView',
        'Goals.view.goals.GoalsHeader',
        'Goals.view.goals.GoalMainViewModel',
        'Goals.view.goals.GoalMainViewController'
    ],
    controller: 'goalmainviewcontroller',
    viewModel: {
        type: 'goalmainviewmodel'
    },

    cls: 'goals-dashboard-mainview-cls',

    width: "100%",
    height: "100%",

    layout: {
        type: 'fit'
    },
    
    tbar: {
        xtype: 'goalsheader'
    },
    items: [{
        xtype: 'goalsview'
    }]
});