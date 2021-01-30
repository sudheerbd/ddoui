/**
 * This view is responsible for rating tab in goals view.
 * @class 'Goals.view.RatingForm'
 * @extends 'Ext.view.View'
 * @alias 'widget.goalratingform',
 * @ViewModel 'Goals.view.ExecutivePlanViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
Ext.define('Goals.view.RatingForm', {
    extend: 'Ext.view.View',

    alias: 'widget.goalratingform',
    margin: 50,
    
    bind: {
        store: '{ratingIconStore}'
    },

    emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.RATINGNOICON,
    tpl: [
        '<span style="position:relative;bottom: 150px;font-size:16px;color:grey">Assigned Karma:</span>',
        '<tpl for=".">',
            '<div class="karmasetup-main-cls">',
                '<div style="background: #fff;text-align: center;padding-top: 10%;border-radius: 4px;box-shadow: 2px 2px 2px 0px #c9c7c8;width:100px;height:100px;">',
                    '<img src="{imagepath}" class="ddo-karmasetup-icon" wrap-td="image_url">',
                '</div>',
                '<div style="text-align:center;color: #c6c6c6;width: 100px;padding: 18px 0px 10px 0px;border: none;background: transparent;border-bottom: 1px solid #afafaf;font-size: 16px;">{name}</div>',
                '<div style="text-align:center;color: #c6c6c6;width: 100px;padding: 12px 0px 0px 0px;border: none;background: transparent;font-size: 16px;">{rating}</div>',
            '</div>',
        '</tpl>'
    ],

    itemSelector: 'karmasetup-main-cls',

    listeners: {
        itemclick: 'karmaSetupItemClick',
        itemkeyup: 'onKarmaIconItemKeyUp'

    }
});