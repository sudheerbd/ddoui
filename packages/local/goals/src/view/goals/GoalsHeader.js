/**
 * This view is responsible for search goal view in goals view.
 * @class 'Goals.view.goals.GoalsHeader'
 * @extends 'Ext.panel.Panel'
 * @alias 'widget.goalsheader'
 * @ViewModel 'Goals.view.goals.GoalMainViewModel'
 * @Controller 'Goals.view.goals.GoalMainViewController'
 */
Ext.define('Goals.view.goals.GoalsHeader', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.goalsheader',

    requires: [
        'Goals.view.goals.SearchFilterWindow'
    ],

    initComponent: function() {
        Ext.getStore('Goals.store.goals.GoalsViewStore').load();
        this.callParent(arguments);
    },

    layout: {
        type: 'hbox',
        align: 'middle'
    },

    defaultButton: 'search',

    cls: 'goals-headerview-cls',
    defaults: {
        margin: '0 0 20 0'
    },

    items: [{
        xtype: 'button',
        width: 6,
        cls: 'goals-search-icon',
        height: 6
    }, {
        xtype: 'textfield',
        cls: 'search-field-cls',
        width: '40%',
        emptyText: LabelsTitles.GOALS.GOALMAIN.SEARCHGOAL,
        handleMouseEvents: true,
        listeners: {
            'render': function(cmp) {
                cmp.getEl().on('click', 'onSearchGoalFliter');
            }
        }
    }, {
        xtype: 'button',
        cls: 'goals-search-btn-cls ',
        iconCls: 'goals-search-btn-icon',
        reference: 'searchfiltericon',
        listeners: {
            click: 'onSearchGoalFliter'
        }
    }, {
        xtype: 'label',
        html: LabelsTitles.GOALS.GOALMAIN.CFILTER,
        name:'goallabelfilter', 
        reference: 'clearfilterRef',
        cls: 'clearfilter-cls x-hidden',
        listeners: {
            afterrender: 'onLabelFocus'
        }
    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'combobox',
        // saveDelay: 200,
        bind: {
            store: '{goalTypeStore}'
        },
        displayField: 'name',
        name:'goaltypecombo',
        valueField: 'value',
        editable: false,
        queryMode: 'local',
        reference: 'comboref',
        cls: 'select-goals-cls',
        listeners: {
            change: 'onComboSelect'
        }
    }]
});