/**
 *   This file is responsible for TechnologiesView.
 *   @extends {Ext.container.Container}
 *   @alias widget.technologiesview
 *   ViewModel :'DDO.view.projects.TechnologiesViewModel'.
 *   ViewController :'DDO.view.projects.TechnologiesViewController.
 */
Ext.define('DDO.view.projects.TechnologiesView', {
    extend: 'Ext.container.Container',
    alias: 'widget.technologiesview',
    cls:'technologies-css',
    requires: [
        'DDO.view.projects.TechnologiesViewController',
        'DDO.view.projects.TechnologiesViewModel',
        'DDO.view.projects.TechnologiesToolbar',
        'DDO.view.projects.TechnologiesDataView'
    ],
    controller: 'technologiesviewcontroller',
    viewModel: {
        type: 'technologiesviewmodel'
    },
    padding: '0 21',
    items: [{
        xtype: 'technologiestoolbar'
    }, {
        xtype: 'technologiesdataview'

    }],
    listeners: {
        activate : 'setingProjectId'
    }
});