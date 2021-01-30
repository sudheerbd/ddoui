/**
 *   This file  is responsible for KarmaScoreAdvancedSearchView.
 *   @extends {Ext.container.Container}
 *   @alias widget.karmascoreadvancedsearchview.
 */
Ext.define('DDO.view.karmascore.KarmaScoreAdvancedSearchView', {
    extend: 'Ext.container.Container',
    alias: 'widget.karmascoreadvancedsearchview',
    requires: [
        'DDO.view.karmascore.DataviewCards',
        'DDO.view.karmascore.SearchFormView'
    ],
    items: [{
        xtype: 'searchformview',
        reference: 'searchFormView'
    }, {
        xtype: 'dataviewcards',
        reference: 'dataViewCards'
    }]
});