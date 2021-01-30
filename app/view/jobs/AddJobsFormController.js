/**
 * The file AddJobsFormController is the controller for DDO.view.profile.details.AddJobsForm.
 * @extends {DDO.view.jobs.AddJobsFormController}.
 * @alias 'controller.addjobsformcontroller'.
 */
Ext.define('DDO.view.jobs.AddJobsFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addjobsformcontroller',
    /**
     * The function onCancelClick is responsible to update the layout and destroy the form.
     * @param {Ext.button.Button} 'btn' which is the cancel button.
     */
    onCancelClick: function(btn) {
        try{
        var jobscontainer = Ext.ComponentQuery.query('jobscontainer')[0],
            dataview = jobscontainer.lookupReference('jobdetailsview'),
            form = btn.up('form'),
            formNode, dataNode;
        if (form.operation == "editform") {
            formNode = form.formNode;
            formNode.style.display = "none";
            dataNode = form.dataNode;
            dataNode.style.display = "block";
            jobscontainer.getViewModel().set('editing', false);
        } else {
            jobscontainer.getViewModel().set('editing', false);
        }
        Utility.isFormDirty = false;
        form.destroy();
        // wait till editable is calculated
        Ext.defer(function() {
            if (dataview) {
                dataview.refresh();
                jobscontainer.updateLayout();
            }
        }, 500);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.CANCELCLICK, err);
    }
    },
    /**
     * The function onSaveClick is responsible to insert the form data in the table.
     * @param {Ext.button.Button} 'btn' which is the save button. 
     */
    onSaveClick: function(btn) {
        try{
        var jobscontainer = this.getView().up('jobscontainer') || Ext.ComponentQuery.query('jobscontainer')[0],
            dataview = jobscontainer.lookupReference('jobdetailsview'),
            jobsStore = dataview.getStore(),
            form = btn.up('addjobsform'),
            endmonthfield = this.getView().lookupReference('endmonth'),
            endyearfield = this.getView().lookupReference('endyear'),
            currentlyworking,
            record, dataNode, formNode;
        endmonthfield.enable();
        endyearfield.enable();
         record = form.getValues();
        currentlyworking = record.currentlyworking;
        if (Ext.isEmpty(Ext.String.trim(record.company)) || Ext.isEmpty(Ext.String.trim(record.designation))) {
            Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
        } else if ((Ext.isEmpty(record.frommonth)) || (Ext.isEmpty(record.fromyear)) || (Ext.isEmpty(record.tomonth)) || (Ext.isEmpty(record.toyear))) {
            Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
        } else {
   this.getCurrentlyWorking(currentlyworking,record);
    //  this.putAjaxRequest(form,jobscontainer,record,jobsStore,dataview);
    if (form.operation == "editform") {
        //form.updateRecord();
        jobscontainer.getViewModel().set('editing', false);
        formNode = form.formNode;
        formNode.style.display = "none";
        dataNode = form.dataNode;
        dataNode.style.display = "block";
        Utility.isFormDirty = false;
        form.destroy();
        Ext.Ajax.request({
            url: Api.URL.jobs.UPDATE,
            method:'PUT',
            params: record,
            success: function() {
                jobsStore.load();
                Ext.defer(function() {
                    if (dataview) {
                        dataview.refresh();
                        jobscontainer.updateLayout();
                        Ext.getBody().unmask();
                    }
                }, 500);
            },
            failure: function() {
                Ext.getBody().unmask();
            }
        });
    } else {
        jobsStore.add(record);
        jobscontainer.getViewModel().set('editing', false);
    }
            Utility.isFormDirty = false;
            form.destroy();
            jobsStore.sync({
                callback: function() {
                    jobsStore.load();
                }
            });
            // wait till editable is calculated
            Ext.defer(function() {
                if (dataview) {
                    dataview.refresh();
                    jobscontainer.updateLayout();
                }
                Ext.getBody().unmask();
            }, 500);
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.SAVECLICK, err);
    }
    },
    /**
     * The function getCurrentlyWorking is responsible to check whether the checkbox is checked or not.
     * @param {string} 'currentlyworking' which holds the string value. 
     * @param {object} 'record' which is the form record. 
     */
     getCurrentlyWorking:function(currentlyworking,record){
        if (currentlyworking && (
            currentlyworking === "on" ||
            (currentlyworking.toLowerCase && currentlyworking.toLowerCase() === "y")
        )) {
        record.tomonth = "";
        record.toyear = "";
    }
    Ext.getBody().mask('');
    var login = Ext.getStore('login'),
        loginData = login.getData().items[0].data,
        cbpid = loginData.cbpid,
        userid = loginData.userid,
        pass = loginData.pass,
        roleId = loginData.roles[0].roleid;
    record.cbpid = cbpid;
    record.userid = userid;
    record.pass = pass;
    record.roleId = roleId;
    if (Ext.isEmpty(record.currentlyworking)) {
        record.currentlyworking = 'N';
    }
  },
  /**
   * The function putAjaxRequest is responsible to insert the form data in the table.
   * @param {form.Panel} 'form' addjobs form. 
   * @param {view} 'jobscontainer' which contains the view. 
   * @param {object} 'record' which is the form record.
   * @param {Ext.data.Store} 'jobsStore' the jobs store. 
   * @param {view} 'dataview' job details view. 
   */
    //  putAjaxRequest:function(form,jobscontainer,record,jobsStore,dataview){
      
    //  },
    /** 
     * This method is used set the month field to current month when year field
     * points to the current year and the month selected is greater than the current month.
     * @param {String} The year field data
     */
    onStartYearEnter: function(yearfield) {
        try{
        var monthfield = this.getView().lookupReference('startmonth');
        Utility.validateMonth(yearfield, monthfield);
        }catch(err){
            Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.YEAR, err);
        }
    },
    /** 
     * This method is used set the month field to current month when year field
     * points to the current year and the month selected is greater than the current month.
     * @param {String} The year field data
     */
    onEndYearEnter: function(yearfield) {
        try{
        var monthfield = this.getView().lookupReference('endmonth');
        Utility.validateMonth(yearfield, monthfield);
        }catch(err){
            Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.YEAR, err);
        }
    },

    /**
     * onStartYearChange Fn verifies the form and to year numberfield values.
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'startyearfield' This numberfield
     */

    onStartYearChange: function(startyearfield) {
        try{
        var me = this;
        Utility.StartYearChange(startyearfield, me);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.YEAR, err);
    }
    },

    /**
     * onEndYearChange Fn verifies the form and to year numberfield values.
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'endyearfield' This numberfield
     */

    onEndYearChange: function(endyearfield) {
        try{
        var me = this;
        Utility.EndYearChange(endyearfield, me);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.YEAR, err);
    }
    },

    /**
     * onChangeCheckbox Fn verifies the job added to be
     * the current job or not and sets the to date accordingly.
     * @event change
     * Fires when checkbox value changes.
     * @param {} 'checkbox' The checkbox reference
     */
    onChangeCheckbox: function(checkbox) {
        try{
        var currentyear = new Date().getFullYear(),
            currentmonth = Ext.Date.format(new Date(), 'm'),
            endmonthfield = this.getView().lookupReference('endmonth'),
            endyearfield = this.getView().lookupReference('endyear');
        if (checkbox.value) {
            endmonthfield.setValue(currentmonth);
            endyearfield.setValue(currentyear);
            endmonthfield.disable();
            endyearfield.disable();
        } else {
            endmonthfield.enable();
            endyearfield.enable();
            endmonthfield.reset();
            endyearfield.reset();
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.CHECKBOX, err);
    }
    },
 /**
     * onEndMonthChange Fn verifies the form and to year numberfield values.
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'endmonthfield' This numberfield
     */
    onEndMonthChange: function(endmonthfield) {
        try{
        var me = this;
        Utility.EndMonthChange(endmonthfield, me);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.MONTH, err);
    }

    },
 /**
     * onStartMonthChange Fn verifies the form and to year numberfield values.
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'startmonthfield' This numberfield
     */
    onStartMonthChange: function(startmonthfield) {
        try{
        var me = this;
        Utility.StartMonthChange(startmonthfield, me);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.MONTH, err);
    }
    }
});