  /**
 * This view is responsible for displaying tags in feeds view.
 * @class 'DDO.view.widget.LoadMoreComments'
 * @extends 'Ext.Widget'
 * @alias 'loadmorecomments'
 */
Ext.define('DDO.view.widget.LoadMoreComments', {
           extend  : 'Ext.Widget',
           xtype   : 'loadmorecomments',
           config  : {
              isMoreVisible : false,
              isMoreText    : true
           },
           updateIsMoreVisible:function(value){

                if(value){
                    // var text = this.getIsMoreText() ? 'View More comments' : 'View Less comments';
                    var text = "Comments";
                  //  this.element.setHtml('<span class = "viewMoreSpan">'+text+'</span>'); //changed for hiding the comments label in the existing comments
                    this.element.show();
                }else{
                    this.element.setHtml('');
                    this.element.hide();
                }
              },
              updateIsMoreText:function(value){
                if(this.getIsMoreVisible()){
                    // var text = value ? 'View More comments' : 'View Less comments';
                    var text = 'Comments';

                    // this.element.setHtml('<span class = "viewMoreSpan">'+text+'</span>'); //changed for hiding the comments label in the existing comments
                }
              },
              element: {
                 reference: 'element',
                //  html     : '<span class = "viewMoreSpan">comments</span>', //changed for hiding the comments label in the existing comments
                 cls      : 'viewMore-Comments-cls',
                 listeners: {
                     click: 'onClick'
                 }
              },
              onClick:function(){
                var commentColection = this.up('existingCommentcollection');
                // var hideFlag = true ;
                // if(this.getIsMoreText()){
                //     hideFlag = false;
                // }else{
                //    hideFlag = true;
                // }
                // commentColection.getViewModel().set('isMoreText',hideFlag);
                // commentColection.SHOWALLCOMMENTS = !hideFlag;
                // commentColection.createComments(commentColection.ORIGINALCOMMENTS);
                if(commentColection){
                  commentColection.setHidden(true);
                }
                // this.up('grid').updateLayout();
              }
});