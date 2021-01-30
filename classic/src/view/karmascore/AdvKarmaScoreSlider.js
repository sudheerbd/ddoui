/**
 *   This file  is responsible for AdvKarmaScoreSlider.
 *   @extends {Ext.container.Container}
 *   @alias widget.advkarmascoreslider.
 *   ViewController :'DDO.view.karmascore.KarmaScoreViewController'.
 */
Ext.define('DDO.view.karmascore.AdvKarmaScoreSlider', {
    extend: 'Ext.container.Container',
    alias: 'widget.advkarmascoreslider',
    cls: 'adv-custom-scroller-container-cls',
    requires: [
        'DDO.store.karmascore.AdvKarmaScoreSlider'
    ],
    loadMask:false,
    items: [{
        xtype: 'dataview',
        store: 'karmascore.AdvKarmaScoreSlider',
        tpl: [
            '<div class="adv-mainDiv" width="100%">',
            '<tpl for=".">',
            '<span class="adv-ddo-karma-endrange-start-value">0</span>',
            '<div style="width:{[this.getWidth(values)]}%;" class="adv-sliderDivs">',
            '<span class="adv-ddo-karma-endrange-value">{[this.endRangeConvert(values.endRange)]}</span></div>',
            '<tpl if="xindex === xcount">',
            '{[this.getEndRange(values.endRange)]}',
            '</tpl>',
            '</tpl>',
            '</div>', {
                getColor: function(values) {
                    return values.color;
                },
                getWidth: function(values) {
                    var rangeWidth = values.endRange - values.startRange;
                    return rangeWidth;
                },
                getEndRange: function(endrange) {
                    Utility.sliderEndRangeValue = endrange;
                },
                endRangeConvert: function(endrange) {
                    var value = endrange;
                    if (endrange > 1000) {
                        value = (endrange / 1000) + 'k';
                    }
                    return value;
                }
            }
        ],
        itemSelector: 'div.adv-mainDiv'
    },{
        xtype: 'multislider',
        cls: 'adv-slider-cls',
        width: '96%',
        name: 'advKarmaScoreRange',
        reference: 'advKarmaScoreRange',
        values: ['0', '6000'],
        minValue: 0,
        maxValue: 6000,
        listeners: {
            changecomplete: 'onAdvRangeChange'
        }
    }]
});