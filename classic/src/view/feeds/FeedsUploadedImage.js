/**
 * This view is responsible for displaying feed share upload image and it's related operations.
 * @class 'DDO.view.feeds.FeedsUploadedImage'
 * @extends 'Ext.view.View'
 * @alias 'feedsuploadedimage'
 * @ViewModel 'DDO.view.feeds.FeedsModel'
 * @Controller 'DDO.view.feeds.FeedsController'
 */
Ext.define('DDO.view.feeds.FeedsUploadedImage', {
    extend: 'Ext.view.View',

    xtype: 'feedsuploadedimage',

    cls: 'temp-uploaded-img-view',
    scrollable:'y',

    tpl: [
        '<tpl if="values.length !== 0">',
            '<div class="upload-feed-div">',
                '<tpl for=".">',
                    '<div class="upload-img-wrap">',
                        '<span class="cross-upload-img">&times;</span>',
                        '<img class="upload-img" src= {[this.beforepostFeedImage(values)]} cross-action="removeImage" width="90px" height="90px">',
                        '<img class="upload-thumb-img" src="resources/images/feeds/Image_thumb.png" width="90px" height="90px">',
                    '</div>',
                '</tpl>',
            '</div>',
        '</tpl>',{
         beforepostFeedImage: function(values) {
        return Api.URL.imageUrl+values.src;
      },

        }
    ],

    itemSelector: 'span.cross-upload-img',

    listeners: {
        render: 'onFeedUploadImagesViewRender'
    }
});