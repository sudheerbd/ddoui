Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scheduleinterviewcontroller',
    requires:[
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick:function( me, record, element, rowIndex, e, eOpts){
        var view = this.getView(),
            model = view.getViewModel(),
            form = view.down('form').getForm();
        view.down('[iconCls=rule-plus]').setHidden(true);
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap:function(){

    },
    onFeedbackSubmitClick: function(btn, e, eOpts) {

        var feedbackWindow = Ext.ComponentQuery.query('jobinterviewfeedback')[0] ||
            Ext.create('TalentAcquisition.view.jobapplication.scheduleinterview.JobInterviewFeedback');
        feedbackWindow.show();

    },
    eastContainerCollapse: function() {
        var view = this.getView();
        // view.setActiveItem(0);
        if(view.down('scheduleinterviewform') && view.down('scheduleinterviewform').isNewForm){
            view.down('scheduleinterviewform').isNewForm = false;
            view.setActiveItem(0);
        }else{
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
            view.down('[iconCls=rule-plus]').setHidden(false);
            view.down('form').reset();
            if(!Ext.isEmpty(eastpanel)){
                eastpanel.toggleCollapse();
            }
            
        }
    },
    onInterviewDetailsClick:function(btn){
        var view = this.getView(),
            main = view.up('jobapplicationmainview'),
            jobapplicationgrid = main.down('interviewdetailsgrid'),
            form = main.down('interviewdetailsform'),
            interviewdetailsview = main.down('interviewdetailsview');
        jobapplicationgrid.getStore().removeAll();
        interviewdetailsview.getViewModel().set('customReadOnly',false);
            form.getForm().setValues(view.customRecord.getData());
        interviewdetailsview.getViewModel().set('customReadOnly',true);
        main.setActiveItem(interviewdetailsview);
        interviewdetailsview.down('button').setHidden(false);
        Ext.Ajax.request({
            url: '/jobinterviewdetails/'+view.customRecord.get('ddo_jobapplications_id'),
            method: 'GET',
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                jobapplicationgrid.getStore().loadData(data.data);
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast('Unable to save data',false,'t');
                Ext.toast(data.message, false, 't');
            }
        });

    },
    onFabBtnClick: function(btn){
        var view = this.getView();
        view.setActiveItem(1);
        view.down('scheduleinterviewform').isNewForm = true;
    },
    onBackButtonClick:function(btn){
        var view = this.getView(),
            main = view.up('jobapplicationmainview'),
            jobapplication = main.down('jobapplicationview'),
            mainView = jobapplication.down('collapsiblecontainer'),
            mainmodel = mainView.getViewModel();
        mainmodel.set('northRegion',false);
        main.setActiveItem(jobapplication);
    },
    onFormSaveClick:function(){
        var view = this.getView(),
            model = view.getViewModel(),
            form = view.down('[name = scheduleinterview]'),
            values = form.getValues(),
            grid = view.down('grid'),
            recruitedby = model.get('recruitedby');
            form.reset();
        if(Ext.isEmpty(values.ddo_scheduleinterview_id)){
            delete values.ddo_scheduleinterview_id;
            values.ddo_jobopenings_id= model.get('ddo_jobopenings_id');
            values.ddo_jobapplications_id = model.get('ddo_jobapplications_id');
            values.ddo_designation_id = model.get('ddo_designation_id');
            values.isdone= model.get('isdone');
        }
            Ext.Ajax.request({
                url: '/scheduleinterview',
                method: Ext.isEmpty(values.ddo_scheduleinterview_id)?'POST':'PUT',
                params: values,
                success: function(resp, b) {
                    grid.getStore().removeAll();
                    Ext.Ajax.request({
                        url: '/scheduleinterview/'+model.get('ddo_jobapplications_id'),
                        method: 'GET',
                        success: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            grid.getStore().loadData(data.data);
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                            if(!Ext.isEmpty(recruitedby) && Ext.isEmpty(values.ddo_scheduleinterview_id)){
                                Ext.Ajax.request({
                                    url: '/ddonominate',
                                    method: 'POST',
                                    params: {
                                        points:1,
                                        karmaId:1000038,
                                        toCbpid:recruitedby,
                                        comment:'Interview Scheduled,                                                            ',
                                        karmaCategoryId:1000000,
                                        projectEmpIds:recruitedby,
                                        selfnomi:true
                                    },
                                    success: function(resp, b) {

                                    },
                                    failure: function(resp, b) {

                                    }
                                });
                            }
                        },
                        failure: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        }
                    });
                    var data = Ext.decode(resp.responseText);
                    Ext.toast(data.message, false, 't');
                },
                failure: function(resp, b) {
                    Ext.getBody().unmask();
                    var data = Ext.decode(resp.responseText);
                    Ext.toast(data.message, false, 't');
                }
            });
    }
});
