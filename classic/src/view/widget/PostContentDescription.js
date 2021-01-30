  /**
 * This view is responsible for displaying post content description in feeds view.
 * @class 'DDO.view.widget.PostContentDescription'
 * @extends 'Ext.Widget'
 * @alias 'postcontentdescription'
 */
Ext.define('DDO.view.widget.PostContentDescription', {
    extend: 'Ext.Widget',

    xtype: 'postcontentdescription',

    //cls     : 'url-img-view-wrap',

    config: {
        postContentDescription: null,
        postId: null
    },

    element: {
        reference: 'element',
        // cls : 'url-img-view-wrap',
        children: [{
            reference: 'contentEl',
            class: "url-img-view-wrap"
        }]
    },

    updatePostContentDescription: function(url_meta_content) {
        if (url_meta_content) {
            // var postId = this.getPostId();
            // this.contentEl.dom.id = "post_id_" + postId;
            this.contentEl.setHtml(url_meta_content);
            //this.contentEl.setHtml((this.getPostURLContent(postContent, postId)));
            // Utility.metaUrlReplaceStatus(postContent, postId, false);
        } else {
            this.contentEl.setHtml('');
        }
    }
});