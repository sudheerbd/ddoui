Ext.define('DDO.view.feeds.FeedsMenuController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.feedsmenucontroller',

    onEditClick: function() {
        var view = this.getView();

        var record = view.record;

        var feedEditWindowView = Ext.create('DDO.view.feeds.FeedsEditWindow', {
           feedView: view.item,
           feedRecord: record,
           operation: view.operation,
           commentView: view.comment,
           url_exist: record ? record.static_url:''
       });
    
        if(record.static_url) {
            var urlLinks = [record.static_url];
            promise = Utility.feedsUrlLinkView(urlLinks);
            promise.then(
                function(data) {
                    if (data.data.success && data.data.data) {
                        feedEditWindowView.down('postUrlLinkView').setData(data.data.data);
                    }
                }
            );
            feedEditWindowView.getViewModel().set('statusBoxAcc', true);            
        }
    },

    onDeleteClick: function() {
        var me = this,
            isComment = false,
            menu = this.getView(),
            data = menu.record,
            params = {},
            url;

        if (menu.operation === "comments") {
            isComment = true;
            url = "/feedcomment/comment/delete";
            params = {
                post_id: data.post_id,
                comment_id: menu.comment.comment
            };
        } else {
            url = '/feed/delete',
                params = {
                    post_id: data.post_id
                };
            if (!Ext.isEmpty(data.post_attachments)) {
                var img_path = [],
                    pushImgPath = function(loopVar) {
                        for (var i = loopVar.length - 1; i >= 0; i--) {
                            img_path.push(loopVar[i]);
                        }
                    };

                img_path.push(data.post_attachments);
                params.imgPath = img_path;
            }
        }
        var callback = function(btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('');
                var feedsStore = Ext.getStore('feeds');
                Ext.Ajax.request({
                    url: url,
                    method: 'delete',
                    params: params,
                    scope: me,
                    success: function(response) {
                        if (isComment) {
                            var comments = data.comments,
                                newComments = [];

                            comments.forEach(function(item) {
                                if (item.comment_id != params.comment_id) {
                                    newComments.push(item);
                                }
                            });
                            menu.item.updateCommentContent(newComments);
                        } else {
                            feedsStore.remove(feedsStore.getById(data.id));
                        }
                        Ext.getBody().unmask();
                    },
                    failure: function(res, eOpts) {
                        var errText;
                        Ext.getBody().unmask();

                        errText = Ext.decode(res.responseText);

                        if(errText.deletion &&
                                errText.deletion == 'N') {
                            Utility.toastReuseFn('t', "<span class='err-toast'>" + errText.message + "</span>");
                        }
                    }
                });

            } else if (btn === 'no') {
                //do nothing
            }
        };
        
        Utility.confirmMessage("Are you sure you want to delete?", "Confirm message", callback);
    }
});