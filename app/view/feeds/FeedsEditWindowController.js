Ext.define('DDO.view.feeds.FeedsEditWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.feedseditwindowcontroller',

    deletedImages: [],
    deletedTags: [],
    addedTags: [],


    imageUploadBtnClick: function(filefield, value, eOpts) {
        var file = filefield.fileInputEl.dom.files[0],
        format = file.type;
    if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
        AmazonS3.uploadFile(filefield).then(function (rec) {
        feedImgView = filefield.up('feedseditwindow').down('feedsuploadedimage');

            var feedUploadsImage = feedImgView.getData();
            feedUploadsImage.push({
                src: rec
            });

            if (feedUploadsImage.length > 0) {
                feedImgView.addCls('feed-upload-view-pad');
            }
            feedImgView.setData(feedUploadsImage);
    });
    }
// this code is commented because we are implementing S3 bucket

        // var scb = function(formPanel, action) {
        //     var text = Ext.JSON.decode(action.response.responseText),
        //         pathImg = text.data,
        //         feedImgView = filefield.up('feedseditwindow').down('feedsuploadedimage');

        //     var feedUploadsImage = feedImgView.getData();
        //     feedUploadsImage.push({
        //         src: pathImg
        //     });

        //     if (feedUploadsImage.length > 0) {
        //         feedImgView.addCls('feed-upload-view-pad');
        //     }
        //     feedImgView.setData(feedUploadsImage);
        // };

        // var fcb = function() {
        //     Utility.toastReuseFn('t', AlertMessages.imageNotCreated);
        // };

        // Utility.uploadImgFormatFn(this, filefield, Api.URL.feed.FEEDS_UPLOAD_IMAGES, scb, fcb);
    },

    onFeedUploadImagesViewRender: function(view, events) {
        this.deletedImages = [];
        view.getEl().on({
            scope: this,
            click: function(mouseevent, tempUploadedImg, events) {
                var selecImgPath = tempUploadedImg.nextSibling.getAttribute('src');
                var hostUrl = Api.URL.imageUrl;
                    if (hostUrl && selecImgPath.includes(hostUrl)) {
                        selecImgPath = selecImgPath.replace(hostUrl, "")
                    }
                    Ext.Ajax.request({
                        url: '/feeduploadimages/feedsPostedPicsUnlink',
                        scope: this,
                        params: {
                            imgPath: selecImgPath
                        },
                        success: function(conn, response) {
                            var feedUploadsImage = view.getData();
                            for (var i = feedUploadsImage.length - 1; i >= 0; i--) {
                                if (feedUploadsImage[i].src === selecImgPath) {
                                    if (feedUploadsImage[i].ddo_post_attachment_id) {
                                        this.deletedImages.push(feedUploadsImage[i].ddo_post_attachment_id);
                                    }
                                    feedUploadsImage.splice(i, 1);
                                }
                            }
                            if (feedUploadsImage.length === 0) {
                                view.removeCls('feed-upload-view-pad');
                            }
                            view.setData(feedUploadsImage);
                        },
                        failure: function(conn, response) {
                            Ext.Msg.alert('Status', 'Image not deleted');
                        }
                    });

                    //THIS CODE IS COMMENTED BECAUSE WE ARE IMPLEMENTING S3 BUCKET.

                // var feedUploadsImage = view.getData();
                // for (var i = feedUploadsImage.length - 1; i >= 0; i--) {
                //     if (feedUploadsImage[i].src === selecImgPath) {
                //         if (feedUploadsImage[i].ddo_post_attachment_id) {
                //             this.deletedImages.push(feedUploadsImage[i].ddo_post_attachment_id);
                //         }
                //         feedUploadsImage.splice(i, 1);
                //     }
                // }
                // if (feedUploadsImage.length === 0) {
                //     view.removeCls('feed-upload-view-pad');
                // }
                // view.setData(feedUploadsImage);
            },
            delegate: 'span.cross-upload-img'
        });
    },

    onTagsDeSelect: function(combo, record, eOpts) {
        Ext.GlobalEvents.fireEvent('tagsSelectRedirectEvent', combo, record);
    },

    onTagsSelect: function(combo, record, eOpts) {
        Ext.GlobalEvents.fireEvent('tagsSelectRedirectEvent', combo, record);
    },
    onFeedsPostTextEnter: function(flag, e, eOpts) {
        var me = this,
            contentView = me.getView(),
            promise;
        var contentReference = contentView.lookupReference('sharefield'),
            content = contentReference.getValue(),
            urlSplit = content.replace(/(?:\r\n|\r|\n)/g, '<br />'),
            urlreg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
            urllink = urlSplit.match(urlreg);

        if (urllink && urllink.length < 2 &&
            ((e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 86) || e.getCharCode() === 32 || e.getCharCode() === 13 || e.getCharCode() === 86) && !this.getViewModel().get('statusBoxAcc')) {

            promise = Utility.feedsUrlLinkView(urllink);
            promise.then(
                function(data) {
                    if (data.data.success && data.data.data) {
                        me.getView().down('postUrlLinkView').setData(data.data.data);
                    }
                }
            );
            this.getViewModel().set('statusBoxAcc', true);

        } else if (!urllink && this.getViewModel().get('statusBoxAcc')) {
            me.getView().down('postUrlLinkView').setData('');
            this.getViewModel().set('statusBoxAcc', false);
        }
        if(content.trim().length > 0){
           this.getViewModel().set('enableSave', false); 
       }else{
          this.getViewModel().set('enableSave', true); 
       }
    },
    onFeedsCommentTextEnter:function(textarea, e, eOpts) {
        var content = textarea.getValue();
        if(content.trim().length > 0){
           this.getViewModel().set('enableSave', false); 
       }else{
          this.getViewModel().set('enableSave', true); 
       }
    },
    onCancelClick: function(btn) {
        btn.up('window').close();
    },

    calculateAddedTags: function(recordData, tagfieldValues, tagfieldRecords) {
        var ideateTags = [],
            tagfieldRecordsLen;

        if (tagfieldValues.length > 0) {
            for (var i = 0; i < tagfieldValues.length; i++) {

                if (recordData.tagged_group_details.length > 0) {
                    var add = true;
                    recordData.tagged_group_details.forEach(function(rec) {
                        if (tagfieldValues[i] == rec.tag_id) {
                            add = false;


                        }

                    });
                    if (add == true) {
                        tagfieldRecordsLen = tagfieldRecords.length;
                        for (var j = 0; j < tagfieldRecordsLen; j++) {
                            if (tagfieldValues[i] == tagfieldRecords[j].data.tagId) {
                                ideateTags.push({
                                    isGroup: (tagfieldRecords[j].data.isGroup) ? 'Y' : 'N',
                                    tagId: tagfieldRecords[j].data.tagId
                                });

                            }
                        }
                    }
                } else {
                    tagfieldRecordsLen = tagfieldRecords.length;
                    for (var j = 0; j < tagfieldRecordsLen; j++) {
                        if (tagfieldValues[i] == tagfieldRecords[j].data.tagId) {
                            ideateTags.push({
                                isGroup: (tagfieldRecords[j].data.isGroup) ? 'Y' : 'N',
                                tagId: tagfieldRecords[j].data.tagId
                            });

                        }
                    }

                }
            }

        }


        return ideateTags;

    },
    calculateDeletedTags: function(recordData, tagfieldValues, tagfieldRecords) {
        var ideateDeletedTags = [],
            tagfieldRecordsLen;

        if (recordData.tagged_group_details.length > 0) {
            recordData.tagged_group_details.forEach(function(rec) {
                if (tagfieldValues.indexOf(rec.tag_id) == -1) {
                    ideateDeletedTags.push(rec.ddo_post_tag_id);
                }

            });

        }


        return ideateDeletedTags;

    },

    onEditFeedSaveFn: function(btn) {
        Ext.getBody().mask('');

        var me = this,
            editWindow = me.getView(),
            textareaContent = editWindow.down('htmleditor').getValue(),
            tagfieldValues = editWindow.down('tagfield').getValue(),
            tagfieldRecords = editWindow.down('tagfield').lastSelectedRecords,
            recordData = editWindow.config.feedRecord,
            tagfieldRecordsLen,
            params, shareIdeateTagvalues = [];

        editWindow.mask('');
        shareIdeateTagvalues = me.calculateAddedTags(recordData, tagfieldValues, tagfieldRecords);
        deletedTagas = me.calculateDeletedTags(recordData, tagfieldValues, tagfieldRecords);

        var imageData = editWindow.down('feedsuploadedimage').getData();
        var data = [];
        var sharable = editWindow.down('checkbox').getValue();
        if (imageData.length > 0) {
            for (var i = imageData.length - 1; i >= 0; i--) {
                if (imageData[i].src && (!imageData[i].ddo_post_attachment_id)) {
                    data.push(imageData[i].src);
                }

            }
        }

        var postLinkUrlView = Ext.ComponentQuery.query('postUrlLinkView')[1];

        var staticUrl = null;
        var metaDataContent = null;

        var stepProcess = true;

        params = {
            post_id: recordData.post_id,
            post_content: textareaContent,
            imgPath: data,
            deleteImage: this.deletedImages,
            post_share: (sharable) ? 'Y' : 'N',
            deletedTags: deletedTagas,
            addedTags: Ext.encode(shareIdeateTagvalues),
            meta_data_content: metaDataContent,
            static_url: staticUrl,
            url_exist: (editWindow.url_exist) ? true : false
        };

        if (postLinkUrlView && postLinkUrlView.data && postLinkUrlView.getEl() && postLinkUrlView.getEl().dom && postLinkUrlView.getEl().dom.innerHTML) {
            var resData = postLinkUrlView.data;
            if (resData.ogTitle || resData.ogDescription) {
                var refUrl = resData.staticUrl;

                if (!refUrl.match(/http/)) {
                    refUrl = "http://" + refUrl;
                } else {
                    refUrl = refUrl;
                }

                var metaDataContent = '<div><a class="link-ref-cls" href="' + refUrl + '" target="_blank"><table><tr>';

                metaDataContent = metaDataContent.concat('<td class="postUrlView-feed-div">');

                if (resData.ogTitle) {
                    metaDataContent = metaDataContent.concat('<span class="postUrl-title">' + resData.ogTitle + '</span><br>');
                }

                if (resData.ogDescription) {
                    metaDataContent = metaDataContent.concat('<span class="postUrl-description">' + resData.ogDescription + '</span>');
                }

                metaDataContent = metaDataContent.concat('</td>');

                metaDataContent = metaDataContent.concat('</tr></table></a></div>');

                staticUrl = (postLinkUrlView.data) ? postLinkUrlView.data.staticUrl : null;
            }

        } else {
            var post_content = textareaContent;
            console.log('post_content: ', post_content);

            var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
            var urllink = post_content.match(urlRegex);
            var promise;

            if (urllink && urllink.length > 0) {
                stepProcess = false;
                staticUrl = urllink[0];

                var linkUrl = [staticUrl];

                promise = Utility.feedsUrlLinkView(linkUrl);

                promise
                    .then(function(data) {
                        if (data.data.success && data.data.data) {
                            me.getView().down('postUrlLinkView').setData(data.data.data);
                            if (postLinkUrlView && postLinkUrlView.data && postLinkUrlView.getEl() && postLinkUrlView.getEl().dom && postLinkUrlView.getEl().dom.innerHTML) {
                                var resData = postLinkUrlView.data;
                                if (resData.ogTitle || resData.ogDescription) {
                                    var refUrl = resData.staticUrl;

                                    if (!refUrl.match(/http/)) {
                                        refUrl = "http://" + refUrl;
                                    } else {
                                        refUrl = refUrl;
                                    }
                                    var metaDataContent = '<div><a class="link-ref-cls" href="' + refUrl + '" target="_blank"><table><tr>';

                                    metaDataContent = metaDataContent.concat('<td class="postUrlView-feed-div">');

                                    if (resData.ogTitle) {
                                        metaDataContent = metaDataContent.concat('<span class="postUrl-title">' + resData.ogTitle + '</span><br>');
                                    }

                                    if (resData.ogDescription) {
                                        metaDataContent = metaDataContent.concat('<span class="postUrl-description">' + resData.ogDescription + '</span>');
                                    }

                                    metaDataContent = metaDataContent.concat('</td>');

                                    metaDataContent = metaDataContent.concat('</tr></table></a></div>');

                                    staticUrl = (postLinkUrlView.data) ? postLinkUrlView.data.staticUrl : null;
                                }

                                me.getView().down('postUrlLinkView').setData('');
                                me.getViewModel().set('statusBoxAcc', false);
                            }
                        }
                        me.updateFeedAPIcall(me, params, metaDataContent, staticUrl, editWindow);
                    });
            }
        }

        if (stepProcess) {
            me.updateFeedAPIcall(me, params, metaDataContent, staticUrl, editWindow);
        }
    },

    updateFeedAPIcall: function(me, params, metaDataContent, staticUrl, editWindow) {
        params.static_url = staticUrl;
        params.meta_data_content = metaDataContent;

        Ext.Ajax.request({
            url: '/feed/update',
            method: 'put',
            params: params,
            scope: me,
            success: function(response) {
                var feedView = me.getView().config.feedView;
                var feedRecord = Ext.JSON.decode(response.responseText).data;
                feedView.updateTagContent(feedRecord);
                feedView.updatePostContentDetails(feedRecord.post_content);
                feedView.updatePostAttachmentsAndContent(feedRecord);
                feedView.updateShareDetails(feedRecord);
                editWindow.unmask();
                editWindow.close();
                Ext.getStore('feeds').load();
                Ext.getBody().unmask();
            },
            failure: function(res, eOpts) {
                var errText;

                editWindow.unmask();
                Ext.getBody().unmask();

                errText = Ext.decode(res.responseText);

                Ext.Msg.alert('ERROR!', (errText.message) ? errText.message : 'Failed to update');
            }
        });
    },

    onSaveClick: function(btn) {
        var me, editWindow, shareEditCheckBox,
            sharable;

        me = this;
        editWindow = me.getView(),

            shareEditCheckBox = editWindow.down('checkbox');
        sharable = shareEditCheckBox.getValue();

        if (shareEditCheckBox &&
            shareEditCheckBox.dirty && sharable) {
            Ext.Msg.show({
                title: 'Confirm Social Sharing',
                message: 'You have selected "Share" option and this post will be shareable on social sites. People outside this company will be able to see these details. Do you want to proceed?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button) {
                    if (button === 'yes') {
                        me.onEditFeedSaveFn(btn);
                    } else {
                        editWindow.close();
                    }
                }
            });
        } else {
            me.onEditFeedSaveFn(btn);
        }
    },
    onTagBtnClick: function(btn) {
        var me = this,
            feedsToolbar = me.getView().down('feedstoolbar'),
            tagFieldRef = feedsToolbar.down('tagfield[reference=comboTagview]');
        if (tagFieldRef.isHidden()) {
            tagFieldRef.show();
        }
    },
    feedGroupBtnClick: function(th) {
        var view = this.getView();
        view.down('tagfield').show();
    },
    onSaveCommentClick: function() {
        var commentId = this.getView().commentID;
        var me = this,
            editWindow = me.getView(),
            textareaContent = editWindow.down('textarea').getValue(),
            feedDataItem = editWindow.config.feedView;
        recordData = editWindow.config.feedRecord;
        var hasFollowers;
        if(!Ext.isEmpty(recordData.followers)){
            hasFollowers= true;
        }else{
            hasFollowers=false;
        }

        var config = {
                url: "/feedcomment/comment/update",
                method: "POST",
                params: {
                    post_id: recordData.post_id,
                    comment_id: commentId,
                    comment_content: textareaContent,
                    followed : hasFollowers
                }
            },
            successCallback = function(data) {
                feedDataItem.updateCommentContent(data.comments);
                Ext.getStore('feeds').load();
                editWindow.close();
            },
            failureCallback = function() {
                Utility.toastReuseFn('t', AlertMessages.unableUpdateComment);
            }
        Utility.fireAjax(config, successCallback, failureCallback);
    },
    onTagsDeSelect: function(combo, record, index, eOpts) {
        this.deletedTags = [];
        var me = this,
            editWindow = me.getView(),
            recordData = editWindow.config.feedRecord,
            add = true;
        if (recordData.tagged_group_details && recordData.tagged_group_details.length > 0) {

            recordData.tagged_group_details.forEach(function(rec) {
                if (rec.ddo_post_tag_id && rec.tag_id == record.data.tagId) {
                    me.deletedTags.push(rec.ddo_post_tag_id);
                    add = false;
                }
            });
            if (add) {
                var indexNo = me.addedTags.indexOf(record.data.tagId);
                if (indexNo > 0) {
                    me.addedTags.splice(indexNo, 1);
                }
            }

        }
    },
    onTagsSelect: function(combo, record, index, eOpts) {
        combo.inputEl.dom.value = '';
        combo.collapse();
        this.addedTags = [];
        var me = this,
            editWindow = me.getView(),
            recordData = editWindow.config.feedRecord,
            add = true;
        if (recordData.tagged_group_details && recordData.tagged_group_details.length > 0) {

            recordData.tagged_group_details.forEach(function(rec) {
                if (rec.ddo_post_tag_id && rec.tag_id == record.data.tagId) {

                    var indexNo = me.deletedTags.indexOf(rec.ddo_post_tag_id);
                    if (indexNo > 0) {
                        me.deletedTags.splice(indexNo, 1);
                    }
                    add = false;
                }
            });
        }
        if (add) {
            me.addedTags.push(record.data.tagId);
        }
    }
});