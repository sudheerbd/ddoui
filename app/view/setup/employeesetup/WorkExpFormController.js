Ext.define('DDO.view.setup.employeesetup.WorkExpFormController',{
    extend:'Ext.app.ViewController',
    alias:'controller.workexpformcontroller',
    onCancelClick: function(btn) {
        try{
           
        // var jobscontainer = Ext.ComponentQuery.query('jobscontainer')[0],
        //     dataview = jobscontainer.lookupReference('jobdetailsview'),
           var form = btn.up('form');
            // formNode, dataNode;
        // if (form.operation == "editform") {
        //     formNode = form.formNode;
        //     formNode.style.display = "none";
        //     dataNode = form.dataNode;
        //     dataNode.style.display = "block";
        //     jobscontainer.getViewModel().set('editing', false);
        // } else {
        //     jobscontainer.getViewModel().set('editing', false);
        // }
        Utility.isFormDirty = false;
        form.destroy();
        // wait till editable is calculated
        // Ext.defer(function() {
        //     if (dataview) {
        //         dataview.refresh();
        //         jobscontainer.updateLayout();
        //     }
        // }, 500);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.CANCELCLICK, err);
    }
    },
    onSaveClick:function(btn,event){

var workExpContainer = this.getView().up('workexpcontainer') || Ext.ComponentQuery.query('workexpcontainer')[0];
 var form = btn.up('form'),
    record = form.getValues(),
    empsetupwindow  = workExpContainer.up('employeesetupwindow');
    var ddo_employee_id = empsetupwindow.getViewModel().get('ddo_employee_id');
    record.new_ddo_employee_id = ddo_employee_id;
    
    var dataview = workExpContainer.down('jobdetailsview');
    var store = workExpContainer.getViewModel().getStore('jobsdatastore'),
    endmonthfield = this.getView().lookupReference('endmonth'),
    endyearfield = this.getView().lookupReference('endyear'),
    // currentlyworking,
      dataNode, formNode;
    //  currentlyworking = record.currentlyworking;
if (Ext.isEmpty(Ext.String.trim(record.company)) || Ext.isEmpty(Ext.String.trim(record.designation))) {
    Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
} else if ((Ext.isEmpty(record.frommonth)) || (Ext.isEmpty(record.fromyear)) || (Ext.isEmpty(record.tomonth)) || (Ext.isEmpty(record.toyear))) {
    Ext.Msg.alert('ERROR', 'Please provide the Mandatory Fields');
} else {
    // this.getCurrentlyWorking(currentlyworking,record);
    if (form.operation == "editform") {
        // debugger;
        //form.updateRecord();
        workExpContainer.getViewModel().set('editing', false);
        formNode = form.formNode;
        formNode.style.display = "none";
        dataNode = form.dataNode;
        dataNode.style.display = "block";
        Utility.isFormDirty = false;
        form.destroy();
        record.currentlyworking = 'N';
        Ext.Ajax.request({
            url: Api.URL.jobs.UPDATE,
            method:'PUT',
            params: record,
            success: function() {
                store.load();
                Ext.defer(function() {
                    if (dataview) {
                        dataview.refresh();
                        workExpContainer.updateLayout();
                        Ext.getBody().unmask();
                    }
                }, 500);
            },
            failure: function() {
                Ext.getBody().unmask();
            }
        });
    } 
    else {
        store.add(record);
        workExpContainer.getViewModel().set('editing', false);
    }
    Utility.isFormDirty = false;
    form.destroy();
    store.sync({
        callback: function() {
            store.load();
        }
    });
    Ext.defer(function() {
        if (dataview) {
            dataview.refresh();
            workExpContainer.updateLayout();
        }
        Ext.getBody().unmask();
    }, 500);
}
    },

//     getCurrentlyWorking:function(currentlyworking,record){
//         if (currentlyworking && (
//             currentlyworking === "on" ||
//             (currentlyworking.toLowerCase && currentlyworking.toLowerCase() === "y")
//         )) {
//         record.tomonth = "";
//         record.toyear = "";
//     }
//     Ext.getBody().mask('');
//     var login = Ext.getStore('login'),
//         loginData = login.getData().items[0].data,
//         cbpid = loginData.cbpid,
//         userid = loginData.userid,
//         pass = loginData.pass,
//         roleId = loginData.roles[0].roleid;
//     record.cbpid = cbpid;
//     record.userid = userid;
//     record.pass = pass;
//     record.roleId = roleId;
//     if (Ext.isEmpty(record.currentlyworking)) {
//         record.currentlyworking = 'N';
//     }
//   },
    onStartMonthChange: function(startmonthfield) {
        try{
        var me = this;
        Utility.StartMonthChange(startmonthfield, me);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.MONTH, err);
    }
    },
    onEndMonthChange: function(endmonthfield) {
        try{
        var me = this;
        Utility.EndMonthChange(endmonthfield, me);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.MONTH, err);
    }

    },
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
})