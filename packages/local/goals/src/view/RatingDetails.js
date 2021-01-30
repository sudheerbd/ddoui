/**
 * This view is responsible for Rating Details in goals view.
 * @class 'Goals.view.RatingDetails'
 * @extends 'Ext.container.Container'
 * @alias 'widget.ratingdetails'
 * @ViewModel 'Goals.view.ExecutivePlanViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
Ext.define('Goals.view.RatingDetails', {
    extend: 'Ext.container.Container',

    alias: 'widget.ratingdetails',

    items: [{
        xtype: 'container',
        width: '100%',
        height: 150,
        cls: 'ratingdetails-cls',
        style: {
            backgroundSize: '100% 100% !important',
            background: 'url("/resources/images/goals/Achieved_Banner.png") 0/cover no-repeat !important'
        }
    }, {
        xtype: 'container',
        padding: 15,
        style: {
            'transform': 'translate(0px, -68px)'
        },
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'middle'
        },
        items: [{
            xtype: 'image',
            style: {
                'background': '#fff',
                'border-radius': '9px',
                'box-shadow': '1px 3px 7px 3px #dfdfe0'
            },
            padding: 10,
            src: 'resources/images/goals/amazing.png'
        }, {
            padding: 10,
            bind: {
                html: '<div><span style="color:#aeaeae;font-size:12px;">{achievedratingText} |</span> <b><span class="karma-score-icon"></span> {achievedKarmaPoints}</b></div>'
            }
        }]
    }, {
        xtype: 'dataview',
        reference:'selfcommentsref',
        tpl: [
            '<div style="width:100%;background-color:#FFFF;">',
            '<tpl for=".">',
            '<div style = "color:#fab82e;font-weight:600;font-size:14;">Self Comments: </div></br>',
            '<div>{selfcomment}</div></br>',
            '<div style = "color:#fab82e;font-weight:600;font-size:14;">Manager Comments: </div></br>',
            '<div>{managercomment}</div></br>',
            '</tpl>',
            '<div>'
        ],
        itemSelector: ''

    }]
});
 