/**
 * This view is responsible for provide karma score search form in home page.
 * @class 'DDO.view.widget.karmascore.SearchForm'
 * @extends 'Ext.form.Panel'
 * @alias 'widget.karmascore-searchform'
 * @ViewModel 'DDO.view.widget.karmascore.KarmaScoreSearchModel'
 * @Controller 'DDO.view.widget.karmascore.KarmaScoreSearchController'
 */
Ext.define('DDO.view.widget.karmascore.SearchForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.karmascore-searchform',

    requires: [
        'Ext.toolbar.Spacer',
        'DDO.view.widget.karmascore.KarmaScoreSlider'
    ],

    layout: {
        type: 'hbox',
        align: 'middle'
    },

    defaultButton: 'search',

    cls: 'ddo-karma-search-form',

    items: [{
        xtype: 'tbspacer',
        flex: 0.1
    }, {
        xtype: 'textfield',
        name: 'employee',
        bind: {
            emptyText: '{searchByNameText}'
        },
        width: '25%',
        reference: 'searchbyname',
        enableKeyEvents: true,
        listeners: {
            keyup: 'onKeyupSearchBy'
        }
    }, {
        xtype: 'tbspacer',
        width: '32%'
    }, {
        xtype: 'slider',
        width: Constants.ViewportWidth * 0.22,
        name: 'karmaScoreRangeSlider',
        increment: 10,
        value: 2000,
        cls: 'ddo-karma-range-slider',
        minValue: 0,
        maxValue: 2000,
        hidden: true,
        listeners: {
            changecomplete: 'onRangeChange'
        }
    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'karmascoreslider',
        hidden: false
    }]
});