/**
 * The file OrgChart is the view file for organization chart in the employee dashboard.
 * @extends {Ext.container.Container}
 * @alias 'widget.orgchart'.
 */
Ext.define('DDO.view.organization.OrgChart', {
    extend: 'Ext.container.Container',
    alias: 'widget.orgchart',

    requires: [
        'DDO.view.organization.OrgChartView',
        'DDO.view.organization.OrgChartSearch',
        'DDO.view.organization.OrgChartController',
        'DDO.view.organization.OrgChartViewModel'
    ],

    controller: 'orgchartcontroller',

    viewModel: {
        type: 'orgchartviewmodel'
    },

    scrollable: true,

    items: [{
        xtype: 'orgchartsearch',
        cls: 'ddo-org-chart-search',
        reference: 'orgchartsearch'
    }, {
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },

        defaults: {
            margin: 10
        },

        items: [{
            xtype: 'orgchartview',
            reference: 'orgchartview',
            width: '100%',
            height:Constants.ViewportHeight*1.16
        }]
    }]
});