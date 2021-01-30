 /**
 * This view is responsible for displaying post attachment in feeds view.
 * @class 'DDO.view.widget.PostAttachments'
 * @extends 'Ext.Widget'
 * @alias 'postattachments'
 */
Ext.define('DDO.view.widget.PostAttachments', {
           extend  : 'Ext.Widget',
           xtype   : 'postattachments',
           config  : {
               postAttachment : null,
               postId : null
           },
           element: {
               reference   : 'element',

               children    : [{
                   reference   : 'attachmentEl',
                   class : "feed-uploaded-multi-img",
                  
               }],
               listeners : {
                  click : {
                    fn: 'onClickImage', 
                    scope: this,
                    delegate: '.feeds-nontemp-upload-img'
                    
                  }     
               }
           },
           onClickImage:function(){
              this.fireEvent('onclickattachedimage');
           },
           updatePostAttachment : function(PostAttachment){
               this.attachmentEl.setHtml('');
               if(PostAttachment){
                   for(var i=0; i<PostAttachment.length; i++){
                       if(i<3){
                           var imageUrl = Api.URL.imageUrl + PostAttachment[i].attachments_path;
                           this.attachmentEl.insertHtml('beforeEnd','<img class="feeds-nontemp-upload-img" action-post-id="'+this.getPostId()+'" src="'+ imageUrl +'" width="210px" height="210px" onerror='+Utility.defaultPostImg+'>');
                       } else if(i===3){
                           this.attachmentEl.insertHtml('beforeEnd','<span class="feeds-nontemp-upload-img feed-uploaded-extra-images" action-post-id="'+this.getPostId()+'">&#43; '+(PostAttachment.length-i)+'</span>');
                       }
                   }
               }
           }
       });