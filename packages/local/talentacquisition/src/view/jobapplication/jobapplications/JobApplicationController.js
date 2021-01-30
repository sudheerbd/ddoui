Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobapplicationcontroller',
    requires:[
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick:function( me, record, element, rowIndex, e, eOpts){
        var view = this.getView(),
            colaps = view.down('[name=jobapplicationviewcolps]'),
            model = colaps.getViewModel(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        setTimeout(function(){
            if(record.get('ddo_jobapplicationstatus_name') == "Joined" || record.get('ddo_jobapplicationstatus_name') == "Offer Rejected"){
                model.set('joiend',true);
            }else {
                model.set('joiend',false);
            }
        },1000);

        view.down('form').oldValues = record.data;
        view.down('form').oldValues.ddo_jobapplicationstatus_name = record.get('ddo_jobapplicationstatus_name');
        var collapsiblecontainer = this.getView().down('collapsiblecontainer'),
            eastpanel = collapsiblecontainer.down('[name=eastpanel]');
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap:function(){

    },
    eastContainerCollapse: function() {
        var view = this.getView(),
            colaps = view.down('[name=jobapplicationviewcolps]'),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if(!Ext.isEmpty(eastpanel)){
            eastpanel.toggleCollapse();
        }
        if(!Ext.isEmpty(colaps)){
            var viewmodel = colaps.getViewModel();
            viewmodel.set('portal',true);
            viewmodel.set('consultency',true);
            viewmodel.set('reffredBy',true);
            viewmodel.set('joiend',false);
        }
    },
    onFormSaveClick:function(){
        var view = this.getView(),
            colps = view.down('[name=jobapplicationviewcolps]'),
            form = view.down('form'),
            status = form.down('[name = ddo_jobapplicationstatus_id]'),
            model = colps.getViewModel(),
            values = form.getValues(),
            grid = view.down('grid'),
            oldValues = form.oldValues,
            names = status.getRawValue();
        form.reset();
            if(model.get('joiend')){
                Ext.toast('Allready Joined', false, 't');
                return;
            }
        if(Ext.isEmpty(values.ddo_jobapplications_id)){
            delete values.ddo_jobapplications_id;
        }
        values.mobilenumber = values.mobilenumber + '';
        Ext.Ajax.request({
            url: '/jobapplications',
            method: Ext.isEmpty(values.ddo_jobapplications_id)?'POST':'PUT',
            params: values,
            success: function(resp, b) {
                grid.getStore().reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
                console.log('chirag names',names);
                console.log(names == "Joined");
                if(names == "Joined"){
                    console.log('coming in side');
                  //  if(oldValues.ddo_jobapplicationstatus_name != "Joined"){
                        Ext.Ajax.request({
                            url: '/ddonominate',
                            method: 'POST',
                            params: {
                                points:20,
                                karmaId:1000035,
                                toCbpid:values.recruitedby,
                                comment:'Employee joined,                                                            ',
                                karmaCategoryId:1000000,
                                projectEmpIds:values.recruitedby,
                                selfnomi:true
                            },
                            success: function(resp, b) {

                            },
                            failure: function(resp, b) {

                            }
                        });
                        if(!Ext.isEmpty(values.referredby)){
                            setTimeout(function(){
                                Ext.Ajax.request({
                                    url: '/ddonominate',
                                    method: 'POST',
                                    params: {
                                        points:30,
                                        karmaId:1000036,
                                        toCbpid:values.referredby,
                                        comment:'New Candidate Joined - Referred Employee                                 ',
                                        karmaCategoryId:1000000,
                                        projectEmpIds:values.referredby,
                                        selfnomi:true
                                    },
                                    success: function(resp, b) {

                                    },
                                    failure: function(resp, b) {

                                    }
                                });
                            },500);
                        }
                   // }
                }else if(names == "No Show"){
                   // if(oldValues.ddo_jobapplicationstatus_name != "No Show"){
                        Ext.Ajax.request({
                            url: '/ddonominate',
                            method: 'POST',
                            params: {
                                points:-10,
                                karmaId:1000037,
                                toCbpid:values.recruitedby,
                                comment:'If the candidate did not join after accepting the offer          ',
                                karmaCategoryId:1000001,
                                projectEmpIds:values.recruitedby,
                                selfnomi:true
                            },
                            success: function(resp, b) {

                            },
                            failure: function(resp, b) {

                            }
                        });
                   // }
                }
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                if(!Ext.isEmpty(resp.responseText)){
                    var data = Ext.decode(resp.responseText);
                    Ext.toast(data.message, false, 't');
                }else{
                    Ext.toast('Failed To Perform Opertion', false, 't');
                }
            }
        });
    },
    onAScheduleInterviewBtnClick:function(btn){
        
        var record = btn.getWidgetRecord();
        var jobApplicationMain = this.getView().up('jobapplicationmainview');
        var scheduleinterviewview = jobApplicationMain.down('scheduleinterviewview');
        var collapsiblecontainer = scheduleinterviewview.down('collapsiblecontainer');
        var mainmodel = collapsiblecontainer.getViewModel();
        var model = scheduleinterviewview.getViewModel();
        var grid = jobApplicationMain.down('scheduleinterviewgrid');
        mainmodel.set('northRegion',true);
        grid.getStore().removeAll();
        if(model){
            model.set('isdone','N');
            model.set('ddo_jobapplications_id',record.get('ddo_jobapplications_id'));
            model.set('ddo_designation_id',record.get('ddo_designation_id'));
            model.set('ddo_jobopenings_id',record.get('ddo_jobopenings_id'));
            model.set('curriculumvitae',record.get('curriculumvitae'));
            model.set('recruitedby',record.get('recruitedby'));
        }
        
        Ext.Ajax.request({
            url: '/scheduleinterview/'+record.get('ddo_jobapplications_id'),
            // url: '/jobapplication/'+ 1,
            method: 'GET',
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().loadData(data.data);
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
        jobApplicationMain.setActiveItem(scheduleinterviewview);
        //scheduleinterviewview.down('button').setHidden(false);
        scheduleinterviewview.customRecord = record;
        collapsiblecontainer.down('[name=scheduleFbButton]').setHidden(false);
    },
     /**
     * This is the handler for the filefield change event.
     * for upload the icons.
     * @param filefield The filefield reference.
     * @param value :  string,The file value returned by the underlying file input field.
     * @param eOpts : Object.
     *
     */
    onCVupload: function(filefield, value, eOpts) {
        var me = this,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = value,
            reader = new FileReader(),
            format = file.type,
            form = filefield.up('form'),
            curriculumvitaeField = form.up('form').down('hiddenfield[name=curriculumvitae]');
        
        reader.onload = function() {
            
            if (format == "application/msword" ||format == "application/pdf" || format == "application/doc" || format == "application/docx" || format == "application/txt" || format == "application/wps" || format == "application/odt" || format == "application/wpd" || format == "application/rtf" ) {
                /**
                 * Docx format preventing due to stored file format issue (Storing like a zip file on server)
                 * format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                 */
                form.submit({
                    url: '/feed/feedsPostedPics',
                    waitMsg: 'Uploading your cv...',
                    success: function(res, msg) {
                        var text = Ext.JSON.decode(msg.response.responseText),
                            pathImg = text.data;
                            curriculumvitaeField.setValue(pathImg);
                            Ext.toast({
                                html: 'File uploaded successfully',
                                width: 150,
                                align: 't'
                            });
                            // iconsViewStore.add({
                            //     name: '',
                            //     imagepath: pathImg,
                            //     ddo_karmarating_id: Ext.id()
                            // });
                            // filefield.setDisabled(true);
                    },
                    failure: function(res) {
                        Ext.toast({
                            html: 'File not loaded',
                            width: 150,
                            align: 't'
                        });
                    }
                });

            } else {
                Ext.toast({
                    html: 'Invalid Format',
                    width: 150,
                    align: 't'
                });
            }
        };
        reader.readAsDataURL(file);
    }
});
