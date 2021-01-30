/**
 * This view is responsible for provide karma score search operation in home page.
 * @class 'DDO.view.widget.karmascore.KarmaScoreSlider'
 * @extends 'Ext.container.Container'
 * @alias 'widget.karmascoreslider'
 * @ViewModel 'DDO.view.widget.karmascore.KarmaScoreSearchModel'
 * @Controller 'DDO.view.widget.karmascore.KarmaScoreSearchController'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreSlider', {
    extend: 'Ext.container.Container',
    alias: 'widget.karmascoreslider',
    cls: 'custom-scroller-container-cls',
    requires: [
        'DDO.store.widget.karmascore.KarmaScoreSlider',
        'DDO.view.widget.karmascore.KarmaScoreSearchController'
    ],

    controller: 'karmascoresearch',

    items: [{
        xtype: 'dataview',
        store: 'karmascoreslider',
        tpl: [
            '<div class="mainDiv" width="100%">',
            '<tpl for=".">',
            '<div style="background-color:{[this.getColor(values)]};width:{[this.getWidth(values)]}%;" class="sliderDivs">',
            '<span class="ddo-karma-endrange-value">{[this.endRangeConvert(values.endRange)]}</span></div>',
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
        itemSelector: 'div.mainDiv',
        listeners: {
            boxready: 'sliderValueFn'
        }
    }, {
        xtype: 'multislider',
        cls: 'slider-cls',
        width: '102%',
        name: 'karmaScoreRange',
        reference: 'karmaScoreRange',
        values: ['0', '6000'],
        minValue: 0,
        maxValue: 6000,
        listeners: {
            changecomplete: 'onRangeChange'
        }
    }]
});