/**
 * This view is responsible for executive plan tab in goals view.
 * @class 'Goals.view.ExecutivePlanMain'
 * @extends 'Ext.container.Container'
 * @alias 'widget.executiveplanmainview'
 * @ViewModel 'Goals.view.ExecutivePlanMainViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
Ext.define('Goals.view.ExecutivePlanMain', {
    extend: 'Ext.container.Container',

    alias: 'widget.executiveplanmainview',

    requires: [
        'Goals.view.ExecutivePlanView',
        'Goals.view.ExecutivePlanHeader',
        'Goals.view.ExecutivePlanMainViewModel',
        'Goals.view.ExecutivePlanMainController'
    ],

    cls: 'exe-plan-mainview-cls',

    height: "100%",
    width: "100%",

    controller:'executiveplanmaincontroller',
    viewModel: {
        type: 'executiveplanmainview'
    },

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        cls: 'exe-plan-toolbar',

        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'button',
            scale: 'large',
            iconCls:'goalsbackbtn-cls',
            cls: 'back-btn-cls',
            handler: 'onBackButtonClick'

        }, '->', {
            xtype: 'button',
            scale: 'large',
            bind: {
                text: '{goalStatus}',
                iconCls: '{goalStatusIconCls}'
            },
            cls: 'achieved-btn-cls'
        }]
    }, {
        xtype: 'executiveplanheader',
        reference:'executiveplanheaderref'
    }, {
        xtype: 'executiveplanview',
         reference:'executiveplanviewref'
    }]
});