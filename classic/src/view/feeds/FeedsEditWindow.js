Ext.define('DDO.view.feeds.FeedsEditWindow', {
  extend: 'Ext.window.Window',

  alias: 'widget.feedseditwindow',

  reference: 'feedseditwindow',

  operation: 'edit',

  requires: [
    'DDO.view.feeds.FeedsEditWindowController',
    'DDO.view.feeds.FeedsEditWindowViewModel',
    'DDO.view.feeds.FeedsToolbar'
  ],

  controller: 'feedseditwindowcontroller',
  viewModel: {
    type: "feedseditwindowviewmodel"
  },

  width: '60%',
  height: '85%',
  modal: true,
  autoShow: true,
  // closeAction:'hide',

  cls: 'feeds-edit-window',

  initComponent: function() {
    var me = this;
    if (me.config.operation == "comments") {
      me.title = "Edit Comment";
      me.items = me.addCommentItems();
      me.dockedItems = me.commentDockedItems();
    } else {
      me.title = "Edit Post",
      me.items = me.addItems();
      me.dockedItems = me.dockedItems(this.config.feedRecord);
    }
    me.callParent(arguments);
  },

  commentDockedItems: function() {
    return [{
      xtype: 'toolbar',
      dock: 'bottom',
      width: '100%',
      cls: 'feeds-post-bottom-toolbar',
      items: [{
        xtype: 'tbfill'
      }, {
        xtype: 'button',
        cls: 'form-menu-btn-cls',
        text: 'Done',
        ui: 'formbutton',
        bind: {
          disabled: '{enableSave}'
        },
        reference: 'savebutton',
        // formBind: true,
        listeners: {
          click: 'onSaveCommentClick'
        }
      }, {
        xtype: 'button',
        text: 'Cancel',
        cls: 'ddo-form-btn-cancel form-menu-btn-cls',
        reference: 'cancelbutton',
        listeners: {
          click: 'onCancelClick'
        },
        ui: 'formbutton'
      }]
    }];
  },

  dockedItems: function(existingRecord) {
    return [{
      xtype: 'toolbar',
      width: '100%',
      dock: 'bottom',
      cls: 'feeds-post-bottom-toolbar',
      items: [{
        xtype: 'form',
        cls: 'feed-form',
        items: [{
          xtype: 'filefield',
          opType: 'upload',
          name: 'feedsImage',
          cls: 'feedUploadBtn',
          width: 100,
          buttonOnly: true,
          buttonText: '',
          listeners: {
            change: 'imageUploadBtnClick'
          }
        }]
      }, {
        xtype: 'button',
        cls: 'feedGroupBtn',
        width: 40,
        height: 25,
        hidden: (existingRecord.post_type == "idea" ? false : true),
        reference: 'groupsicon',
        handler: 'feedGroupBtnClick'
      }, {
        xtype: 'checkbox',
        boxLabel: 'Shareable',
        cls: 'shareable-cls',
        hidden: (existingRecord.post_type == "idea" ? true : false),
        value: (existingRecord.post_share == "Y" ? true : false),
        name: 'sharePost',
        reference: 'sharePostRef'
      }, {
        xtype: 'tbfill'
      }, {
        xtype: 'button',
        cls: 'form-menu-btn-cls',
        text: 'Done',
        ui: 'formbutton',
        reference: 'savebutton',
        bind: {
          disabled: '{enableSave}'
        },
        //formBind: true,
        listeners: {
          click: 'onSaveClick'
        }
      }, {
        xtype: 'button',
        text: 'Cancel',
        cls: 'ddo-form-btn-cancel form-menu-btn-cls',
        reference: 'cancelbutton',
        listeners: {
          click: 'onCancelClick'
        },
        ui: 'formbutton'
      }]
    }];
  },

  listeners: {
    boxready: function() {
      var feedRecord = this.config.feedRecord,
        tagListValues = '';

      if (this.config.operation != "comments") {

        var taggedGroupList = feedRecord.tagged_group_details,
          tagfieldView = this.down('tagfield');

        if (feedRecord.post_type == "idea" && taggedGroupList && taggedGroupList.length > 0) {
          tagfieldView.show();
          for (var i = 0; i < taggedGroupList.length; i++) {
            tagListValues = tagListValues + taggedGroupList[i].tag_id;
            if (i < taggedGroupList.length - 1) {
              tagListValues = tagListValues + ',';
            }
          }
          var store = Ext.getStore('feeds.Groups');
          if (!store.isLoaded()) {
            store.load();
          }
          tagfieldView.setValue(tagListValues);
        }
        // this.controller.onFeedsPostTextEnter('INITIALRENDERING');
        this.viewModel.set('initialRender', true);
      } else {
        var commentID = this.config.commentView.comment;
        var commentObject = {};

        feedRecord.comments.forEach(function(item) {
          if (item.comment_id == commentID) {
            commentObject = item;
          }
        });
        this.commentID = commentID;
        this.down('textareafield').setValue(commentObject.comment_content);
      }
    },
    beforedestroy: function(me) {}

  },

  addCommentItems: function() {
    return [{
      xtype: 'textareafield',
      enableKeyEvents: true,
      width: '100%',
      listeners: {
        change: 'onFeedsCommentTextEnter'
      }
    }];
  },

  addItems: function() {
    var existingRecord = this.config.feedRecord;
    var imagesArray = [];
    if (existingRecord.post_images_path && existingRecord.post_images_path.length > 0) {
      existingRecord.post_images_path.forEach(function(item) {
        imagesArray.push({
          src: item.attachments_path,
          ddo_post_attachment_id: item.ddo_post_attachment_id
        });
      });
    }
    return [{
      xtype: 'htmleditor',
      cls: 'share-text-cls',
      name: 'feedTextField',
      reference: 'sharefield',
      value: existingRecord.post_content,
      enableKeyEvents: true,
      listeners: {
        change: 'onFeedsPostTextEnter'
      }
    }, {
      xtype: 'postUrlLinkView',
      width: '100%'
    }, {
      xtype: 'feedsuploadedimage',
      data: imagesArray,
      width: '100%'
    }, {
      xtype: 'shareideate',
      width: '100%'
    }];
  }
});