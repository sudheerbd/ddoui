/**
 * This view is responsible for displaying karma score as widget in home page.
 * @class 'DDO.view.widget.karmscore.KarmaScore'
 * @extends 'Ext.container.Container'
 * @alias 'widget.karmascore'
 * @ViewModel 'DDO.view.widget.karmascore.KarmaScoreModel'
 * @Controller 'DDO.view.widget.karmascore.KarmaScoreController'
 */
Ext.define('DDO.view.widget.karmscore.KarmaScore', {
    extend: 'Ext.Container',
    alias: 'widget.karmascore',

    requires: [
        'DDO.view.widget.karmascore.KarmaScoreList',
        'DDO.view.widget.karmascore.KarmaScoreSearch',
        'DDO.view.widget.karmascore.KarmaScoreController',
        'DDO.view.widget.karmascore.KarmaScoreModel',
        'DDO.view.karmascore.DesignationPotentialHeaderView',
        'Ext.toolbar.Fill'
    ],

    controller: 'karmascore',
    viewModel: {
        type: 'karmascore'
    },

    width: '100%',
    margin: '20 20 20 20',
    items: [{
        xtype: 'toolbar',
        items: [
            {
                xtype: 'container',
                cls: 'karmascore-title',
                bind: {
                    html: '{title}'
                }

            }, {
                xtype: 'tbfill'
            }, {
                xtype: 'label',
                cls:'karmaScore-viewall',
                html: LabelsTitles.HOME.KARMASCORE.VIEWALL,
                listeners: {
                    render: function (c) {
                        c.getEl().on({
                            click: 'onDetailClick'
                        });
                    },
                    afterrender: function (c) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: c.getEl(),
                            html: LabelsTitles.HOME.KARMASCORE.SHOWDETAILS
                        });
                    }
                }
            }
        ],
        cls: 'score-title'
    }, {
        xtype: 'container',
        cls:'label-hr',
        items:[{
            xtype:'label',
            html: '<hr>'
        }]
    }, {
        xtype: 'container',
        cls: 'score-title-cmb',
        items: [{
            xtype: 'designationpotentialheaderview'
        }]
    }, {
        xtype: 'karmascorelist',
        bind: {
            store: '{scoredetails}'
        }
    }]
});