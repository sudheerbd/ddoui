 /**
 * This view is responsible for displaying tag menu image in feeds view.
 * @class 'DDO.view.feeds.TagsMenuView'
 * @extends 'Ext.view.View'
 * @alias 'tagsMenuView'
 */
Ext.define('DDO.view.feeds.TagsMenuView', {
    extend: 'Ext.view.View',

    xtype: 'tagsMenuView',

    tpl: [
        '<ul class="feeds-tag-ul-list">',
            '<tpl for=".">',
                '<tpl if="values.id.is_group">',
                    '<li class="feeds-li-grouptag-list"><span class="ddo-groupTag-round">{[this.getGroupTags(values.id)]}</span>',
                    '<span {[this.validEllipsesQtip(values.id.tag_name, 15)]}>{[this.getEllipseText(values.id.tag_name, 15)]}</span></li>',
                '<tpl else>',
                    '<li class="feeds-li-tag-list"><img class="feeds-li-tag-img" src="{[this.getTags(values.id)]}" width="24px" height="24px">',
                    '<span {[this.validEllipsesQtip(values.id.tag_name, 15)]}>{[this.getEllipseText(values.id.tag_name, 15)]}</span></li>',
                '</tpl>',
            '</tpl>',
        '</ul>', {

            getGroupTags: function(values) {
                if (typeof(values) === "object") {
                    if (values.is_group) {
                        return values.tag_name[0];
                    }
                }
            },
            getTags: function(values) {
                if (typeof(values) === "object") {
                    if (!values.is_group) {
                        if (values.tag_pic_url) {
                            return values.tag_pic_url;
                        }
                    }
                }
            },
            getEllipseText: function(string, limit) {
                return Ext.String.ellipsis(string, limit);
            },
            validEllipsesQtip: function(value, limit) {
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            }
        }
    ],

    itemSelector: '.feeds-li-tag-list'
});