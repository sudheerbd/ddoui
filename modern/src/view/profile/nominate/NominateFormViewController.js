Ext.define('DDO.view.profile.nominate.NominateFormViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.nominateformcontroller',

    onRatingFormCancel: function() {
        var mainviewtoolbar;

        this.getView().destroy();

        mainviewtoolbar = Ext.ComponentQuery.query('#mainvieporttoolbar')[0];
        mainviewtoolbar.show();
    },
    onTypeButtonClick: function(btn, e) {
        var ref = this.getView().getReferences(),
            ratingCombo = ref.ratingCombo,
            ratingComment = ref.ratingComment,
            actBtn = ref.actButton,
            feedBtn = ref.feedButton,
            ratingComboStore = ratingCombo.getStore(),
            ratingWindow = this.getView(),
            multiProgressBar = ratingWindow.down('multicircularprogressbar'),
            kamrmaPoints = parseInt(Utility.userAboutData.karmapoints) || 0,
            rewardPoints = parseInt(Utility.userAboutData.rewardpoints) || 0,
            param = btn.value;

        if (btn.getText() === actBtn.getText()) {
            btn.addCls('ddo-activity-press-cls');
        } else {
            actBtn.removeCls('ddo-activity-press-cls');
        }

        if (btn.getText() === feedBtn.getText()) {
            btn.addCls('ddo-activity-press-cls');
        } else {
            feedBtn.removeCls('ddo-activity-press-cls');
        }

        ratingCombo.reset();
        ratingComment.reset();

        this.getViewModel().set('ratingName', btn.getText());

        ratingComboStore.getProxy().extraParams = {
            'ratingType': param,
            'ratingId': Utility.ratingId
        };

        ratingComboStore.load();

        Ext.defer(function() {
            multiProgressBar.setValue([kamrmaPoints, rewardPoints]);
        }, 1000);
    },

    onComboValueSelect: function(combo, rec) {
        if (rec) {
            var multiProgressBar = Ext.ComponentQuery.query('multicircularprogressbar')[0],
                karmapoints = rec.data.karmapoints,
                rewardpoints = rec.data.rewardpoints,
                values;
            if (Ext.isDefined(multiProgressBar)) {
                values = [];
                values[0] = parseInt(Utility.userAboutData.karmapoints) + ((isNaN(parseInt(karmapoints))) ? 0 : parseInt(karmapoints));
                values[1] = parseInt(Utility.userAboutData.rewardpoints) + ((isNaN(parseInt(rewardpoints))) ? 0 : parseInt(rewardpoints));
                multiProgressBar.setValue(values, true);
            }
        }
    },
    onRatingFormSubmit: function(btn, e) {
        var me = this,
            ratingWindow = this.getView(),
            ratingForm = ratingWindow.down('ratingform'),
            login = Ext.getStore('login'),
            loginData = login.getData().items[0].data,
            nominateStore = Ext.getStore('profile.NominateStore'),
            ratingFormRef = ratingForm.getReferences(),
            feedbackId, activityId,
            ratingCommentvalue = ratingForm.down('textareafield').getValue(),
            ratingComboLabel = ratingForm.down('selectfield').getLabel(),
            ratingComboValue = ratingForm.down('selectfield').getValue(),
            nominatedPartnerId,
            cbpid, nominate = {},
            selectionRecord = ratingForm.down('selectfield').getSelection().data,
            rewardpoints = selectionRecord.rewardpoints,
            karmapoints = selectionRecord.karmapoints,
            userid, pass, roleId,
            nomineeType, isActivity, isFeedback, ratingType;

       Ext.Viewport.setActiveItem({xtype:'loadingmask'});

        cbpid = loginData.cbpid;
        userid = loginData.userid;
        pass = loginData.pass;
        roleId = loginData.roles[0].roleid;

        if (Utility.profileAppeared) {
            nominatedPartnerId = Utility.profileAppeared;
            nomineeType = 'OE';
        } else {
            nominatedPartnerId = cbpid;
            nomineeType = 'SL';
        }

        if (ratingComboLabel === "Activity") {
            ratingType = 'Act';
            isActivity = 'Y';
            isFeedback = 'N';
            activityId = ratingComboValue;
            feedbackId = '';
        } else {
            ratingType = 'FB';
            isFeedback = 'Y';
            isActivity = 'N';
            feedbackId = ratingComboValue;
            activityId = '';
        }

        nominate = {
            cbpartnerId: nominatedPartnerId,
            NomineeType: nomineeType,
            FeedbackActivityType: ratingType,
            WTCRatingID: ratingForm.getRatingId(),
            Comments: ratingCommentvalue,
            nominatedPartnerId: cbpid,
            ActivityID: activityId,
            FeedbackID: feedbackId,
            IsFeedback: isFeedback,
            IsActivity: isActivity,
            RewardPoints: rewardpoints,
            KarmaPoints: karmapoints,
            userid: userid,
            pass: pass,
            roleId: roleId
        };

        nominateStore.removeAll();
        nominateStore.add(nominate);

        nominateStore.sync({
            scope: this,
            success: function(batch, opt) {
                Ext.Viewport.setActiveItem(0);

                this.onRatingFormCancel();


                Ext.create('Ext.MessageBox', {
                    listeners: {
                        activate: function(me, eOpts) {
                            Utility.nominatAlert = false;
                        },
                        deactivate: function(me, eOpts) {
                            Utility.nominatAlert = true;
                        }
                    }
                }).alert('Status', 'You nominated successfully');
            },
            failure: function(batch, opt) {
                Ext.Viewport.setActiveItem(0);

                var errJsonData, errMsg;

                errJsonData = batch.operations[0].getResponse().responseText;

                errMsg = Ext.decode(errJsonData).message;

                Ext.create('Ext.MessageBox', {
                    listeners: {
                        activate: function(me, eOpts) {
                            Utility.nominatAlert = false;
                        },
                        deactivate: function(me, eOpts) {
                            Utility.nominatAlert = true;
                        }
                    }
                }).alert('Status', errMsg);
            }
        });
    }
});