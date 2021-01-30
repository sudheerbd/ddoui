Ext.define('DDO.view.projects.FeedbackViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.feedbackviewcontroller',

    onFeedbackSubmitClick: function(btn, e, eOpts) {
       var projectId = this.getViewModel().get('activeProId'),
           formValues = btn.up('form').getValues(),
           projectName = this.getViewModel().get('activeProName'),
           FeedDescription = formValues.FeedDescription,
           wtc_feedback_activity_id = formValues.feedcombo,

            successCallback = function(data) {
                 btn.up('window').unmask();
                 btn.up('feedbackwindow').hide();
                 btn.up('form').reset();
                 Ext.Msg.alert('SUCCESS', "Employees credited with karma score successfully");

            },
            failureCallback = function(data) {
                Ext.Msg.alert('ERROR', "Fail to credit karma score");
            },
            callback = function() {},
            config = {
                    url: "/KarmascoreCredit",
                    method: 'POST',
                    params: {
                        projectId: projectId,
                        projectName: projectName,
                        FeedDescription: FeedDescription,
                        wtc_feedback_activity_id:wtc_feedback_activity_id
                    }
            };
            btn.up('window').mask('');
            Utility.fireAjax(config, successCallback, failureCallback, callback);        
    },

    onTextAreaLength: function(textarea, e, eOpts) {
        var noLineBreakValue = textarea.value.replace(/(\r\n|\n|\r)/gm, " "),
            trimValue = noLineBreakValue.replace(/\s\s+/g, ' ').trim(),
            len = trimValue.length;

        if ((trimValue && len > 139) &&
            !(Ext.isEmpty(this.getView().down('form').getValues().FeedDescription)) &&
            !(Ext.isEmpty(this.getView().down('form').getValues().feedcombo))) {
            this.getViewModel().set('areaText', false);
        } else {
            this.getViewModel().set('areaText', true);
        }
    },
    
    onFeedComboItemSelect: function(combo, record, eOpts) {
        var feedDesc = this.getView().down('form').getValues().FeedDescription;

        if (!Ext.isEmpty(feedDesc) && feedDesc.length) {
            this.getViewModel().set('areaText', false);
        } else {
            this.getViewModel().set('areaText', true);
        }
    },

    onWindowOutsideTap: function(event, target) {
        var view = this;
        Utility.onWindowOutterTap(event, target, view);
    },

    onFeedWinClose: function(panel, eOpts) {
        this.getView().down('form').reset();
    }
});