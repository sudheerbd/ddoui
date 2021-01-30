/**
 * The file AddJobsFormViewController is the controller for 'DDO.view.profile.details.AddJobsForm'.
 */
Ext.define('DDO.view.profile.details.AddJobsFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addjobsformviewcontroller',
    /* Experience form methods - Add Jobs form*/

    //form back button functionality
    onEditExperienceBackBtnTap: function (btn) {
        try{
        var experienceView = this.getView(),
                jobsDetailView = Ext.ComponentQuery.query('jobdetailsview')[0];
        if (experienceView.operation === 'editform') {
            experienceView.destroy();
        } else {
            experienceView.setHidden(true);
        }
        Ext.defer(function () {
            if (jobsDetailView) {
                jobsDetailView.refresh();
                experienceView.updateLayout();
            }
        }, 500);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.BACKCLICK, err);
    }
    },
    //form save button functionality
    onSaveBtnClick: function (btn) {
        try{
        var jobsDetailView = Ext.ComponentQuery.query('jobdetailsview')[0],
                jobsStore = jobsDetailView.getStore(),
                rec, form = btn.up('addjobsform'),
                startDateField = form.lookupReference('jobsFormStartDate'),
                endDateField = form.lookupReference('jobsFormEndDate'),
                record = form.getValues(),
                fromMonth, toMonth, fromYear, toYear,
                login = Ext.getStore('login'),
                loginData = login.getData().items[0].data,
                cbpid = loginData.cbpid,
                userid = loginData.userid,
                pass = loginData.pass,
                roleId = loginData.roles[0].roleid;
        Ext.Viewport.setActiveItem(1);
        if (Ext.isEmpty(Ext.String.trim(record.company)) || Ext.isEmpty(Ext.String.trim(record.designation_when_left)) || Ext.isEmpty(Ext.String.trim(record.cityname))) {
            Ext.Viewport.setActiveItem(0);
            Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
        } else if ((Ext.isEmpty(record.from_month)) || (Ext.isEmpty(record.from_year)) || (Ext.isEmpty(record.to_month)) || (Ext.isEmpty(record.to_year))) {
            Ext.Viewport.setActiveItem(0);
            Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
        } else {
            fromMonth = Ext.Date.format(new Date(startDateField.getValue()), 'm');
            toMonth = Ext.Date.format(new Date(endDateField.getValue()), 'm');
            fromYear = Ext.Date.format(new Date(startDateField.getValue()), 'Y');
            toYear = Ext.Date.format(new Date(endDateField.getValue()), 'Y');
            record.to_month = toMonth;
            record.from_month = fromMonth;
            record.from_year = fromYear;
            record.to_year = toYear;
            record.cbpid = cbpid;
            record.userid = userid;
            record.pass = pass;
            record.roleId = roleId;
             if(record.iscurrentlyworking){
               record.to_month = "";
               record.to_year = "";
           }
            if (record.iscurrentlyworking == 'on' || record.iscurrentlyworking) {
                record.iscurrentlyworking = 'Y';
            }
            if (Ext.isEmpty(record.iscurrentlyworking) || !record.iscurrentlyworking) {
                record.iscurrentlyworking = 'N';
            }
            if (form.operation === "editform") {
                rec = jobsStore.data.items[form.index];
                Ext.Ajax.request({
                    url: '/profile/jobs/update',
                    params: record,
                    success: function () {
                        jobsStore.load();
                        Ext.defer(function () {
                            if (jobsDetailView) {
                                jobsDetailView.refresh();
                                jobsDetailView.updateLayout();
                                Ext.Viewport.setActiveItem(0);
                                Ext.Msg.alert('Status', 'Record updated!');
                            }
                        }, 500);
                    },
                    failure: function () {
                        Ext.Msg.alert("ERROR", "Record not updated!");
                    }
                });
            } else {
                record.cbpid = cbpid;
                record.userid = userid;
                record.pass = pass;
                record.roleId = roleId;
                var designationRec = jobsStore.findRecord('cbpid', cbpid);
                jobsStore.add(record);
                if (designationRec) {
                    designationRec.data.designation_when_left = record.designation_when_left;
                }
                form.setHidden(true);
            }
            form.destroy();
            jobsStore.sync({
                callback: function (operation, eOpts) {
                    if (operation.operations[0].success) {
                        Ext.Msg.alert('Status', 'Record created!');
                        jobsStore.load();
                        // wait till editable is calculated
                        Ext.defer(function () {
                            if (jobsDetailView) {
                                Ext.Viewport.setActiveItem(0);
                                jobsDetailView.refresh();
                                jobsDetailView.updateLayout();
                            }
                        }, 1500);
                    } else {
                        Ext.Viewport.setActiveItem(0);
                        Ext.Msg.alert('Status', 'Record not created!');
                    }
                }
            });
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.FORMSAVE, err);
    }
    },
    // experience start date validation 
    StartDate: function (cmp, newDate, oldDate, eOpts) {
        try{
        var me = this,
                endDateReference = this.lookupReference('jobsFormEndDate'),
                endDateValue = endDateReference.getValue(),
                currentyear = parseInt(new Date().getFullYear()),
                currentmonth = parseInt(Ext.Date.format(new Date(), 'm')),
                startMonth = parseInt(Ext.Date.format(newDate, 'm')),
                startYear = parseInt(Ext.Date.format(newDate, 'Y')),
                endMonth = parseInt(Ext.Date.format(endDateValue, 'm')),
                endYear = parseInt(Ext.Date.format(endDateValue, 'Y'));
        if (newDate != null && endDateValue != null) {
            if (startYear < endYear) {
                this.lookupReference('from_year').setValue(newDate.getFullYear());
                this.lookupReference('from_month').setValue(startMonth);
            } else if (startYear === endYear) {
                if (startMonth <= endMonth) {
                    this.lookupReference('from_year').setValue(newDate.getFullYear());
                    this.lookupReference('from_month').setValue(startMonth);
                } else {
                    Ext.Msg.alert('ERROR', "Start date should be less than or equal to End date");
                    this.lookupReference('from_year').setValue(null);
                    this.lookupReference('from_month').setValue(null);
                    cmp.reset(true);
                }
            } else {
                Ext.Msg.alert('ERROR', "Start date should be less than  or equal to End date");
                this.lookupReference('from_year').setValue(null);
                this.lookupReference('from_month').setValue(null);
                cmp.reset(true);
            }
        } else if (newDate) {
            if (currentyear === startYear) {
                if (currentmonth >= startMonth) {
                    this.lookupReference('from_year').setValue(newDate.getFullYear());
                    this.lookupReference('from_month').setValue(startMonth);
                } else {
                    Ext.Msg.alert('ERROR', "Start month should be less than or equal to currentmonth");
                    cmp.reset(true);
                }
            } else {
                this.lookupReference('from_year').setValue(newDate.getFullYear());
                this.lookupReference('from_month').setValue(startMonth);
            }
        }
        me.onTextEnter(cmp, eOpts);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.STARTDATEVALIDATION, err);
    }
    },
    // experience end date validation 
    EndDate: function (cmp, newDate, oldDate, eOpts) {
        try{
        var me = this,
                startDateReference = this.lookupReference('jobsFormStartDate'),
                startDateValue = startDateReference.getValue(),
                endMonth = parseInt(Ext.Date.format(newDate, 'm')),
                currentyear = parseInt(new Date().getFullYear()),
                currentmonth = parseInt(Ext.Date.format(new Date(), 'm')),
                endYear = parseInt(Ext.Date.format(newDate, 'Y')),
                startMonth = parseInt(Ext.Date.format(startDateValue, 'm')),
                startYear = parseInt(Ext.Date.format(startDateValue, 'Y'));
        if (newDate != null && startDateValue != null) {
            if (startYear < endYear) {
                    this.lookupReference('to_year').setValue(newDate.getFullYear());
                    this.lookupReference('to_month').setValue(endMonth);
            } else if (currentyear === endYear) {
                if (currentmonth >= endMonth) {
                    this.lookupReference('to_year').setValue(newDate.getFullYear());
                    this.lookupReference('to_month').setValue(endMonth);
                } else {
                    Ext.Msg.alert('ERROR', "End month should be less than or equal to currentmonth");
                    cmp.reset(true);
                }
            } else if (startYear === endYear) {
                if (startMonth <= endMonth) {
                    this.lookupReference('to_year').setValue(newDate.getFullYear());
                    this.lookupReference('to_month').setValue(endMonth);
                } else {
                    Ext.Msg.alert('ERROR', "End month should be less than or equal to currentmonth");
                    cmp.reset(true);
                }
            } else {
                Ext.Msg.alert('ERROR', "End date should be less than  or equal to current date");
                this.lookupReference('to_year').setValue(null);
                this.lookupReference('to_month').setValue(null);
                cmp.reset(true);
            }
        } else if (newDate) {
            if (currentyear === endYear) {
                if (currentmonth >= endMonth) {
                    this.lookupReference('to_year').setValue(newDate.getFullYear());
                    this.lookupReference('to_month').setValue(endMonth);
                } else {
                    Ext.Msg.alert('ERROR', "End month should be less than or equal to currentmonth");
                    cmp.reset(true);
                }
            } else {
                this.lookupReference('to_year').setValue(newDate.getFullYear());
                this.lookupReference('to_month').setValue(endMonth);
            }
        }
        me.onTextEnter(cmp, eOpts);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.ENDDATEVALIDATION, err);
    }
    },
    // on changing job
    onChangeCurrentJob: function (field, newValue, oldValue) {
        try{
        var val = (newValue === true ? 'Y' : 'N'),
                enddatepickerfield = this.getView().lookupReference('jobsFormEndDate');
        if (val === 'Y') {
            var date = new Date();
            var currentyear = new Date().getFullYear();
            currentmonth = Ext.Date.format(new Date(), 'F');
            date.setFullYear(date.getFullYear());
            date.setMonth(date.getMonth());
            enddatepickerfield.setValue(date);
            this.lookupReference('iscurrentlyworking').setValue(true);
            enddatepickerfield.disable();
        } else {
            enddatepickerfield.enable();
            this.lookupReference('iscurrentlyworking').setValue(false);
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.JOBCHANGE, err);
    }
    },
    onTextEnter: function (field, eOpts) {
        var form = field.up('addjobsform'),
                record = form.getValues(),
                saveButton = form.lookupReference('savebutton');
        if (Ext.isEmpty(Ext.String.trim(record.company)) || Ext.isEmpty(Ext.String.trim(record.designation_when_left))
                || Ext.isEmpty(Ext.String.trim(record.cityname)) || (Ext.isEmpty(record.from_month))
                || (Ext.isEmpty(record.from_year)) || (Ext.isEmpty(record.to_month)) || (Ext.isEmpty(record.to_year))) {
            saveButton.setDisabled(true);
        } else {
            saveButton.setDisabled(false);
        }
    }
});