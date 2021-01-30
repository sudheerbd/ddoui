/**
 *   This file  is responsible for SearchFormView.
 *   @extends {Ext.form.Panel}
 *   @alias widget.searchformview.
 *   ViewModel: 'DDO.view.karmascore.KarmaScoreViewModel'.
 *   ViewController :'DDO.view.karmascore.KarmaScoreViewController'.
 */
Ext.define('DDO.view.karmascore.SearchFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchformview',
    requires: [
        'DDO.store.karmascore.KarmaGroupComboStore',
        'DDO.view.nominate.nominateothers.NominateOthersWindow'
    ],
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    defaultButton: 'search',
    cls: 'ddo-adv-karma-search-form',
    items: [{
        xtype: 'button',
        width: Constants.ViewportWidth * 0.005,
        cls: 'karmascore-search-icon-field',
        height: Constants.ViewportHeight * 0.01
    }, {
        xtype: 'textfield',
        name: 'employee',
        margin:'10 10 10 0',
        bind: {
            emptyText: '{searchByNameText}'
        },
        cls: 'karmascore-search-field',
        width: '35%',
        reference: 'searchbynameref',
        enableKeyEvents: true,
        listeners: {
            keyup: 'onKeyupSearchBy'
        }
    }, {
        xtype: 'button',
        width: Constants.ViewportWidth * 0.113,
        bind: {
            text: '{karmaScorePercentage}'
        },
        iconCls: 'karma-score-search-icon-cls',
        cls: 'karmascore-icon-field'
    }, {
        xtype: 'tbfill'
    },{
        xtype: 'button',
        width: Constants.ViewportWidth * 0.075,
        name:'downloadKarmaBtn',
        text:LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.DOWNLOAD,
        cls: 'download-btn',
        bind: {
            hidden: '{downloadBtn}'
        },
        listeners:{
            click:'onDownloadBtnclick'
        }
    },{
        xtype: 'combobox',
        cls: 'groupby-cls',
        emptyCls: 'groupby-empty-cls',
        emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.GROUPBY,       
        reference: 'groupby',
        width: Constants.ViewportWidth * 0.096,
        listConfig: {
            cls: 'karmascore-list-cls'
        },
        displayField: 'group_name',
        valueField: 'group_value',
        editable: false,
        store: 'karmascore.KarmaGroupComboStore',
        listeners: {
            select: 'onGroupItemSelect'
        }
    }]
});