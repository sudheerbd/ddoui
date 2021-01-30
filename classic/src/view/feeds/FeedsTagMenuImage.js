 /**
 * This view is responsible for displaying tag menu image in feeds view.
 * @class 'DDO.view.feeds.FeedsTagMenuImage'
 * @extends 'Ext.menu.Menu'
 * @alias 'widget.feedstagmenuimage'
 */
Ext.define('DDO.view.feeds.FeedsTagMenuImage', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.feedstagmenuimage',

    requires: [
        'DDO.view.feeds.TagsMenuView'
    ],

    cls: 'feeds-tagMenu-cls',

    width: Constants.ViewportWidth * 0.11,

    autoShow: true,

    items: [{
        plain: true,
        xtype: 'tagsMenuView'
    }]
});