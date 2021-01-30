/**
 * This view is responsible for displaying feed share and it's related operations.
 * @class 'DDO.view.feeds.ShareUpdate'
 * @extends 'Ext.container.Container'
 * @alias 'shareupdate'
 * @ViewModel 'DDO.view.feeds.FeedsModel'
 * @Controller 'DDO.view.feeds.FeedsController'
 */
Ext.define('DDO.view.feeds.ShareUpdate', {
  extend: 'Ext.container.Container',
  xtype: 'shareupdate',
  requires: [
    'Ext.toolbar.Spacer',
    'DDO.view.feeds.ShareHeader',
    'DDO.view.feeds.FeedsUploadedImage',
    'DDO.view.feeds.PostUrlLinkView',
    'DDO.view.feeds.ShareIdeate',
    'DDO.view.filter.AddFilter'
  ],
  cls: 'share-container',
  layout: {
    type: 'vbox',
    pack: 'center'
  },
  maxWidth: Constants.ViewportWidth * 0.542,
  frame: true,
  items: [{
      xtype: 'container',
      width: "100%",
      layout: "hbox",
      items: [{
        xtype: 'shareheader'
      }, {
        xtype: 'addfilter'
      }]
    }, {
      xtype: 'component',
      width: '83%',
      cls: 'border-hr',
      html: '<hr>'
    },
    {
      xtype: 'container',
      cls: 'shareupdate-cont',
      width: "99.5%",

      items: [
        {
          width: '100%',
          cls: 'share-textarea-cls share-space-align htmleditor-cls',
          xtype: 'htmleditor',
          //enableColors: false,
          enableAlignments: false,
          scrollable: 'x',
          name: 'feedTextField',
          reference: 'sharefield',
          //minHeight:50,
          padding: '10 0 0 0',

          enableKeyEvents: true,
          bind: {
            value: '{postContent}'
          },

          listeners: {
            keyup: 'onFeedsPostTextEnter',
            initialize: function(field) {
              var body = field.getEditorBody();
              body.style.overflow = 'hidden';
              Ext.DomHelper.applyStyles(body, {
                'word-wrap': 'break-word'
              });
            },
            change: function(field) {
              var body = field.getEditorBody();
              field.setHeight(body.offsetHeight);
            }
          },
          setEmptyText: function() {
            var emptyText;
            emptyText = Ext.String.format(this.emptyTextTpl, this.emptyText);
            this.setValue(Ext.String.format(this.emptyTextTpl, this.emptyText))
          }
        },
        {
          xtype: 'postUrlLinkView',
          width: '100%'
        }, {
          xtype: 'feedsuploadedimage',
          // hidden: true,
          width: '100%'
        }, {
          xtype: 'shareideate',
          reference: 'shareideateRef',
          cls: 'shareideate-cls',
          width: '100%'
        }, {
          xtype: 'toolbar',
          width: '100%',
          cls: 'feeds-post-bottom-toolbar',
          items: [{
            xtype: 'button',
            iconCls: 'x-fa fa-paperclip',
            cls: 'attechment-cls',
            hidden: true,
            handler: 'attachmentBtnClick'
          },
            {
              xtype: 'form',
              cls: 'feed-form',
              width: 130,
              items: [{
                xtype: 'filefield',
                opType: 'upload',
                name: 'feedsImage',
                cls: 'feedUploadBtn',
                buttonOnly: true,
                buttonConfig: {
                  iconCls: 'x-fa fa-paperclip',
                },
                buttonText: LabelsTitles.HOME.FEEDS.ATTACHFILE,
                width: 50,
                listeners: {
                  change: 'imageUploadBtnClick'
                }
              }]
            },
            {
              xtype: 'checkbox',
              boxLabel: LabelsTitles.HOME.FEEDS.SHAREABLE,
              cls: 'shareable-cls-box',
              hidden: false,
              name: 'sharePost',
              reference: 'sharePostRef'
            },{
              xtype: 'checkbox',
              boxLabel: LabelsTitles.HOME.FEEDS.TAGPEOPLEGROUP,
              cls: 'shareable-cls-box',
              hidden: false,
              width: '200px',
              name: 'tagPeople',
              reference: 'tagPeopleRef',
              listeners:{
                change: 'onCheckChange'
              }
            }, '->', {
              xtype: 'button',
              text: LabelsTitles.HOME.FEEDS.POST,
              cls: 'share-toolbar-btn',
              iconCls: 'share-toolbar-icon-btn',
              handler: "onPostButtonClick"
            }]
        }]
    },
  ]
});