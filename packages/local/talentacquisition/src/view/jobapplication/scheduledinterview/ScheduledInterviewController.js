Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scheduledinterviewcontroller',
    requires: [
        'TalentAcquisition.view.jobapplication.scheduledinterview.JobInterviewFeedback',
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick:function( me, record, element, rowIndex, e, eOpts){
        var view = this.getView(),
            model = view.down('[name=scheduledinterviewviewcols]').getViewModel(),
            collapsiblecontainer = view.down('collapsiblecontainer'),
            eastpanel = collapsiblecontainer.down('[name=eastpanel]'),
            form = view.down('form').getForm();
        form.setValues(record.data);
        if(record.get('isconfirmed') == 'Y'){
            model.set('buttontext','Feedback');
        }else {
            model.set('buttontext', 'Confirm');
        }

        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
        collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(true);
    },
    onWindowOutsideTap: function(event, target) {
        var view = this.getView();
        //Utility.onSetUpWinOutterTap(event, target, view);
    },
    onFeedbackSubmitClick: function(btn, e, eOpts) {
        var values = this.getView().down('form').getValues();
        if(btn.getText() == "Confirm"){
            values.isconfirmed = 'Y';
            delete values.ddo_designation_name;
            delete values.ddo_jobopenings_name;
            delete values.curriculumvitae;
            delete values.intervieweename;
            Ext.Ajax.request({
                url: '/scheduleinterview',
                method: 'PUT',
                params: values,
                success: function(resp, b) {

                },
                failure: function(resp, b) {

                }
            });
            btn.setText("Feedback");
        }else{
            if(values.isdone == 'Y'){
                Ext.Msg.alert("Alert", 'You have allready given feedback');
                return ;
            }
            var aapstore = Ext.ComponentQuery.query('jobapplicationgrid')[0] ? Ext.ComponentQuery.query('jobapplicationgrid')[0].getStore():'';
            var apprec;
            var feedbackWindow = Ext.ComponentQuery.query('jobinterviewfeedback')[0] ||
                Ext.create('TalentAcquisition.view.jobapplication.scheduledinterview.JobInterviewFeedback',{
                    customview : this.getView()
                });
            if(!Ext.isEmpty(aapstore)){
                apprec = aapstore.findRecord('ddo_jobapplications_id',parseInt(values.ddo_jobapplications_id));
                if(!Ext.isEmpty(apprec)){
                    feedbackWindow.apprec = apprec;
                }
            }
            feedbackWindow.customData = values;
            feedbackWindow.show();
        }
    },
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
    },

    onFormSaveClick:function(){
        var view = this.getView(),
            me=this,
            custom = view.customview,
            button = custom.down('scheduledinterviewform').down('[text=Cancel]'),
            record = view.customData,
            apprec = view.apprec,
            grid = custom.down('grid');
        record.ddo_jobinterviewrating_id = view.down('combobox').getValue();
        record.feedback = view.down('textarea').getValue();
        button.fireEvent('click',button);
       var params={
           feedback: record.feedback,
           ddo_jobinterviewrating_id:record.ddo_jobinterviewrating_id,
           ddo_jobopenings_id:record.ddo_jobopenings_id,
           ddo_scheduleinterview_id:record.ddo_scheduleinterview_id,
           ddo_jobapplications_id:record.ddo_jobapplications_id
        };
        Ext.Ajax.request({
            url:'/jobinterviewfeedback',
            method: 'POST',
            params: params,
            success: function(resp, b) {
                view.hide();
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
                grid.getStore().load();
                Ext.Ajax.request({
                    url: '/ddonominate',
                    method: 'POST',
                    params: {
                        points:5,
                        karmaId:1000040,
                        toCbpid:record.intervieweremployeeid,
                        comment:'Feed back is Done                                                          ',
                        karmaCategoryId:1000000,
                        projectEmpIds:record.intervieweremployeeid,
                        selfnomi:true
                    },
                    success: function(resp, b) {

                    },
                    failure: function(resp, b) {

                    }
                });
                if(!Ext.isEmpty(apprec)){
                    setTimeout(function(){
                        Ext.Ajax.request({
                            url: '/ddonominate',
                            method: 'POST',
                            params: {
                                points:2,
                                karmaId:1000040,
                                toCbpid:apprec.get('recruitedby'),
                                comment:'Feed back is Done                                                          ',
                                karmaCategoryId:1000000,
                                projectEmpIds:apprec.get('recruitedby'),
                                selfnomi:true
                            },
                            success: function(resp, b) {

                            },
                            failure: function(resp, b) {

                            }
                        });
                    },100);
                }
            },
            failure: function(resp, b) {
            }
        });
    },
    onFormCancelClick:function(){
        var feedbackForm = this.getView();
        feedbackForm.down('form').getForm().reset();
        feedbackForm.hide();
        
    },
    onViewCVBtnClick: function(btn) {
        var me = this,
            view = me.getView(),
            cvpath = view.lookupReference('cvpath').getValue(),
            interviewername = view.lookupReference('intervieweename').getValue(),
             downloadablePath = window.location.origin +'/'+ cvpath;
        if(Ext.isEmpty(cvpath)){
            Ext.toast('CV does not exits', false, 't');
        }else{
            window.open(downloadablePath);
        }
        // var pom = document.createElement('a');
        //     pom.setAttribute('href', downloadablePath);
        //     pom.setAttribute('download');
        //    pom.click();
        //    var downloadFrame = document.createElement("iframe"); 
        //         downloadFrame.setAttribute('src',downloadablePath);
        //         downloadFrame.setAttribute('class',"screenReaderText"); 
        //         document.body.appendChild(downloadFrame); 
        // window.open(downloadablePath, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
        // window.focus();
        // document.body.removeChild(downloadFrame);
    }
});
