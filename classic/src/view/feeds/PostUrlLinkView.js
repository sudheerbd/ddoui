/**
 * This view is responsible for displaying feed via url link and it's related operations.
 * @class 'DDO.view.feeds.PostUrlLinkView'
 * @extends 'Ext.view.View'
 * @alias 'postUrlLinkView'
 * @ViewModel 'DDO.view.feeds.FeedsModel'
 * @Controller 'DDO.view.feeds.FeedsController'
 */
Ext.define('DDO.view.feeds.PostUrlLinkView', {
    extend: 'Ext.view.View',

    xtype: 'postUrlLinkView',

    tpl: [
        '<tpl for=".">',
            '<div class="url-img-view-wrap">',
                '<a class="link-ref-cls" href="{[this.getUrlLink(values)]}" target="_blank">',
                    '<table >',
                        '<tr>',
                            '<td>',
                                '{[this.getUrlImage(values)]}',
                            '</td>',
                            '<td class="postUrlView-feed-div">',
                                '{[this.getUrlTitle(values)]}',
                                '<br>',
                                '{[this.getUrlDesc(values)]}',
                            '</td>',
                        '</tr>',
                    '</table>',
                '</a>',
            '</div>',
        '</tpl>', {
            getUrlImage: function(values) {
                if (values.ogImage) {
                    var imgUrl;
                    
                    if(values.ogImage.url.match('http') || values.ogImage.url.match('https')) {
                        imgUrl = values.ogImage.url;
                    } else {
                        imgUrl = values.staticUrl.match('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www.)?([^:\/\n]+)')[0] + values.ogImage.url;
                    }

                    return '<img class="postUrl-img postUrl-imgBefore" src="' + imgUrl + '" >';
                }
            },

            getUrlTitle: function(values) {
                if (values.ogTitle) {
                    return '<span class="postUrl-title">' + values.ogTitle + '</span>';
                }
            },

            getUrlDesc: function(values) {
                if (values.ogDescription) {
                    return '<span class="postUrl-description">' + values.ogDescription + '</span>';
                }
            },
                
            getUrlLink: function(values) {
                if (values.staticUrl) {
                     if(!values.staticUrl.match(/http/)) {
                        return "http://" + values.staticUrl;
                    } else {
                        return values.staticUrl;
                    }
                }
            }
        }
    ],

    itemSelector: 'span.cross-upload-img'
});