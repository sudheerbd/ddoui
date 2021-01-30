/**
 * This view is responsible for displaying feed filter and it's related operations.
 * @class 'DDO.view.filter.FilterWindow'
 * @extends 'Ext.window.Window'
 * @alias 'widget.filterwindow'
 * @ViewModel 'DDO.view.filter.FilterWindowViewModel'
 * @Controller 'DDO.view.filter.FilterWindowController'
 */
Ext.define('DDO.view.filter.FilterWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.filterwindow',

    reference: 'filterwindow',

    requires: [
        'DDO.view.filter.FilterWindowController',
        'DDO.view.filter.FilterWindowViewModel',
        'DDO.view.filter.FilterForm'
    ],

    layout: {
        type: 'fit'
    },

    controller: 'filterwindowcontroller',
    viewModel: {
        type: 'filterwindowviewmodel'
    },

    closeAction: 'hide',

    resizable: false,
    modal: true,
    draggable: false,

    cls: 'ddo-filter-window',

    height: Constants.ViewportHeight * 0.513,
    width: Constants.ViewportWidth * 0.44,

    title: LabelsTitles.HOME.FEEDS.ADDFILTER,

    items: [{
        xtype: 'filterform'
    }],

    listeners: {
        afterrender: "renderFilterWindow"
    }
});