Ext.define('DDO.view.projects.FeedbackWindow', {
    extend: 'DDO.view.profile.nominateview.NominateViewWindow',

    alias: 'widget.feedbackwindow',

    // cls: 'feedwindow-cls',

    requires: [
        'DDO.view.projects.FeedbackViewController',
        'DDO.view.projects.FeedbackViewModel',
        'DDO.store.projects.FeedbackComboStore',
        // 'DDO.view.nominateview.NominateViewIcons'
        'DDO.view.nominate.nominateothers.NominateOthersViewIcons'
    ],
    height: Constants.ViewportHeight * 0.935,
    width: Constants.ViewportWidth * 0.517,
    //Old Nominate window backup
    // modal: true,

    // resizable: false,
    // width: 700,
    // height: 500,
    // closeAction: 'destroy',
    // draggable: false,

    // controller: 'feedbackviewcontroller',

    // viewModel: {
    //     type: 'feedbackviewmodel'
    // },

    // bind: {
    //     title: 'Feedback - {activeProName}'
    // },

    // items: [{
    //     xtype: 'form',
    //     reference: 'feedBackForm',
    //     width: 700,
    //     height: 510,
    //     items: [{
    //         xtype: 'combobox',
    //         name: 'feedcombo',
    //         displayField: 'name',
    //         valueField: 'wtc_feedback_activity_id',
    //         emptyText: 'Choose feedback',
    //         width: 180,
    //         cls: 'feedcombo-cls',
    //         editable: false,
    //         store: 'projects.FeedbackComboStore',
    //         allowBlank: false,

    //         listConfig: {
    //             cls: 'feedback-list-cls'
    //         },
    //         tpl: [
    //             '<ul class="x-list-plain"><tpl for=".">',
    //             '<li role="option" class="x-boundlist-item">{name}',
    //             '<div class="ddo-feedback-round"><div class ="feed-score">{[this.getScore(values)]}</div></div>',
    //             '</li></tpl>',
    //             '</ul>', {
    //                 getScore: function(values) {
    //                     return values.highposivite;
    //                 }
    //             }
    //         ],
    //         listeners: {
    //             select: 'onFeedComboItemSelect'
    //         }
    //     }, {
    //         xtype: 'htmleditor',
    //         name: 'FeedDescription',
    //         cls: 'feededitor-cls',
    //         width: 700,
    //         height: 345,
    //         listeners: {
    //             change: 'onTextAreaLength'
    //         }
    //     }, {
    //         xtype: 'button',
    //         text: 'Submit',
    //         // formBind: true,
    //         cls: 'feedwindow-submit-cls',
    //         bind: {
    //             disabled: '{areaText}'
    //         },
    //         listeners: {
    //             click: 'onFeedbackSubmitClick'
    //         }
    //     }]
    // }],

    initComponent: function() {
        this.callParent(arguments);
    }
});
