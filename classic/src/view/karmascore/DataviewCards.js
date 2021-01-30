/**
 *   This file  is responsible for DataviewCards.
 *   @extends {Ext.container.Container}
 *   @alias widget.dataviewcards.
 *   ViewModel: 'DDO.view.karmascore.KarmaScoreViewModel'.
 *   ViewController :'DDO.view.karmascore.KarmaScoreViewController'.
 */
Ext.define('DDO.view.karmascore.DataviewCards', {
    extend: 'Ext.container.Container',
    alias: 'widget.dataviewcards',
    cls: 'projecttabs-detailview-cls',
    requires: [
        'DDO.view.karmascore.KarmaScoreDataView',
        'DDO.view.karmascore.KarmaDesginationDataView',
        'DDO.view.karmascore.KarmaSuperVisorDataView'
    ],
    layout: {
        type: 'card'
    },
    items: [{
        xtype: 'karmascoredataview',
        scrollable: true,
        bind: {
            store: '{allkarmascores}'
        },
        listeners: {
            itemclick: 'onKarmaScoreItemClick'
        }
    }, {
        xtype: 'karmadesginationdataview',
        reference: 'designation',
        scrollable: true,
        bind: {
            store: '{allkarmascores}'
        }
    }, {
        xtype: 'karmasupervisordataview',
        reference: 'supervisor',
        scrollable: true,
        bind: {
            store: '{allkarmascores}'
        }
    }]
});