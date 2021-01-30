/**
 * This view is responsible for manager rating form under rating view in goals view.
 * @class 'Goals.view.ManagerRatingForm'
 * @extends 'Ext.form.Panel'
 * @alias 'widget.managerratingform'
 * @ViewModel 'Goals.view.ExecutivePlanViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
Ext.define('Goals.view.ManagerRatingForm', {
    extend: 'Ext.form.Panel',

    xtype: 'managerratingform',

    cls: 'manager-rating-form',
    width: '100%',
    height: '100%',
    bodyPadding: 40,
    layout: {
        type: 'hbox'
    },
    items: [{
        html: LabelsTitles.GOALS.EXECUTIVEVIEW.ASSIGNKARMA,
        width: Constants.ViewportWidth*0.088
    }, {
        xtype: 'container',
        margin: '0 20 0 0',
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [{
            xtype: 'container',
            cls: 'karmastatusPic',
            bind: {
                disabled: '{amziconDisabled}'
            },
            height: Constants.ViewportHeight * 0.187,
            width: Constants.ViewportWidth*0.088,
            padding: '0 0 0 2',
            value: LabelsTitles.GOALS.EXECUTIVEVIEW.AMAZING,
            bind: {
                style: {
                    'background': 'url("/resources/images/goals/amazing.png")',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'background-color': 'white'
                }
            },
            layout: {
                type: 'vbox'
            },
            listeners: {
                render: 'onGoalsIconRender'
            }
        }, {
            html: LabelsTitles.GOALS.EXECUTIVEVIEW.AMAZING,
            bind: {
                disabled: '{amziconDisabled}'
            },
            reference: 'activeRatingText',
            margin: '10 0 10 0'
        }, {
            xtype: 'numberfield',
            width: Constants.ViewportWidth*0.088,
            bind: {
                disabled: '{amziconDisabled}',
                readOnly:'{readOnlyKarmafield}'
            },
            cls: 'header-fields-design',
            hideTrigger: true,
            reference: 'goalKarmaPoints',
            listeners: {
                blur: 'calculateKarma'
            }
        }]
    }, {
        xtype: 'container',
        margin: '0 20 0 0',
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [{
            xtype: 'container',
            cls: 'karmastatusPic',
            bind: {
                disabled: '{supiconDisabled}'
            },
            height: Constants.ViewportHeight * 0.187,
            width: Constants.ViewportWidth*0.088,
            padding: '0 0 0 2',
            value: LabelsTitles.GOALS.EXECUTIVEVIEW.SUPERB,
            listeners: {
                render: 'onGoalsIconRender'
            },
            bind: {
                style: {
                    'background': 'url("/resources/images/goals/superb.png")',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'background-color': 'white'

                }
            },
            layout: {
                type: 'vbox'
            }
        }, {
            html: LabelsTitles.GOALS.EXECUTIVEVIEW.SUPERB,
            bind: {
                disabled: '{supiconDisabled}'
            },
            margin: '10 0 10 0'
        }, {
            xtype: 'numberfield',
            reference: 'valuesuperb',
            readOnly:true,
            bind: {
                disabled: '{supiconDisabled}'
            },
            allowDecimals: false,
            cls: 'header-fields-design',
            hideTrigger: true,
            width: Constants.ViewportWidth*0.088
        }]
    }, {
        xtype: 'container',
        margin: '0 20 0 0',
        //disabled: true,
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [

            {
                xtype: 'container',
                bind: {
                    disabled: '{goodiconDisabled}'
                },
                cls: 'karmastatusPic',
                height: Constants.ViewportHeight * 0.187,
                width: Constants.ViewportWidth*0.088,
                value: LabelsTitles.GOALS.EXECUTIVEVIEW.GOOD,
                padding: '0 0 0 2',
                bind: {
                    style: {
                        'background': 'url("/resources/images/goals/good.png")',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center',
                        'background-color': 'white'
                    }
                },
                layout: {
                    type: 'vbox'
                },
                listeners: {
                    render: 'onGoalsIconRender'
                }
            }, {
                html: LabelsTitles.GOALS.EXECUTIVEVIEW.GOOD,
                bind: {
                    disabled: '{goodiconDisabled}'
                },
                margin: '10 0 10 0'
            }, {
                xtype: 'numberfield',
                readOnly:true,
                bind: {
                    disabled: '{goodiconDisabled}'
                },
                allowDecimals: false,
                reference: 'valuegood',
                cls: 'header-fields-design',
                hideTrigger: true,
                width: Constants.ViewportWidth*0.088
            }
        ]
    }]
});