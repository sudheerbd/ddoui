/**
 * This view is responsible for provide karma score search operation in home page.
 * @class 'DDO.view.widget.karmascore.KarmaScoreSearch'
 * @extends 'Ext.window.Window'
 * @alias 'widget.karmascoresearch'
 * @ViewModel 'DDO.view.widget.karmascore.KarmaScoreSearchModel'
 * @Controller 'DDO.view.widget.karmascore.KarmaScoreSearchController'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreSearch', {
    extend: 'Ext.window.Window',
    alias: 'widget.karmascoresearch',

    requires: [
        'DDO.view.widget.karmascore.KarmaScoreSearchController',
        'DDO.view.widget.karmascore.KarmaScoreSearchModel',
        'DDO.view.widget.karmascore.KarmaScoreSearchView',
        'DDO.view.widget.karmascore.SearchForm',
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.toolbar.Paging'
    ],
    routeId:'karmascoresearch',
    closeAction:'hide',
    controller: 'karmascoresearch',
    viewModel: {
        type: 'karmascoresearch'
    },

    cls: 'ddo-karma-search-container',

    layout: {
        type: 'fit'
    },

    bind: {
        title: '{title} {karmaScorePercentage}'
    },
    resizable: false,
    modal: true,

    tbar: {
        xtype: 'karmascore-searchform'
    },

    items: [{
        xtype: 'karmascoresearchview',
        scrollable: true,
        bind: {
            store: '{allkarmascores}'
        },
        listeners: {
            itemclick: 'onKarmaScoreItemClick'
        }
    }],
    listeners:{
            close:'onKarmaSearchClose'
    },
    minHeight: Constants.ViewportHeight * 0.775,
    minWidth: Constants.ViewportWidth * 0.585,
    width: Constants.ViewportWidth * 0.89,
    height: '90%'
});