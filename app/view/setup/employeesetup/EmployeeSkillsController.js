Ext.define('DDO.view.setup.employeesetup.EmployeeSkillsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employeeskillscontroller',

       /**
     * This handler is responsible for cancelling work details form progress.
     * @param {btn} Object, contain reference of click button.
     * @param {e} Object, event object
     * @param {eOpts} Object, event related details like target, sourceElements.
     */
    onFormCancelClick: function (btn, e, eOpts) {
        try {
            var empWindow = this.getView().up('employeesetupwindow'),
                empWinController = empWindow.getController();
            empWinController.onFormCancelClick(btn, e, eOpts);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.CANCELCLICK, err);
        }
    },
   
    onSkillsContainerMouseOver: function() {
        // try{
        
        // var userProfileContainer = this.getView().up();
        // var skillscontainer = userProfileContainer.down('profileskills'),
       var skillscontainer = Ext.ComponentQuery.query('profileskills')[0],
            skillsButton = skillscontainer.lookupReference('addskills'),
            // skillsform = userProfileContainer.down('profileskillsform'),
            skillsform = Ext.ComponentQuery.query('addskills')[0],
            viewModel = skillscontainer.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            if (skillsform) {
                viewModel.set('editing', true);
            } else {
                viewModel.set('editing', false);
            }
        }
    // }catch(err){
    //     Utility.showToast(Messages.USERPROFILE.ADDSKILLS, err);
    // }
    },

    onSkillsContainerMouseLeave: function() {
        var skillscontainer = Ext.ComponentQuery.query('profileskills')[0],
            skillsButton = skillscontainer.lookupReference('addskills'),
            viewModel = skillscontainer.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            viewModel.set('editing', true);
        }
    },
    onFormSaveClick: function (btn) {
                var win = Ext.ComponentQuery.query('employeeworkexperience')[0] ;
                win.show();
            
        //     var form = btn.up('form'),
        //         formValues = form.getValues();
        //         if(form.isValid()){
        //     if (Ext.isEmpty(formValues.departmentname) && Ext.isEmpty(formValues.designationname) && Ext.isEmpty(formValues.empstatus) && Ext.isEmpty(formValues.pskill) && Ext.isEmpty(formValues.reportingto)) {
        //         //do nothing
        //     } else {
        //         this.processFormData(btn, form, formValues);
        //     }
        // } else {
        //     Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.INVALID);
        // }
        // } catch (err) {
        //     Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.WORKS.SAVECLICK, err);
        // }
    },
    /**
     * This handler is responsible for process save operation for work details form data.
     * @param {btn} Object, contain reference of click button.
     * @param {form} Object, contain reference of work details form.
     * @param {formValues} Object, contain values of work details form.
     */
    processFormData: function(btn, form, formValues){
        var empSetupWindow = btn.up('employeesetupwindow'),
            employeeSetupView = empSetupWindow.parentViewRef,
            emploueeSetupTabpanel = empSetupWindow.down('tabpanel'),
            viewModel = empSetupWindow.getViewModel(),
            employeeId = viewModel.get('ddo_employee_id'),
            store = employeeSetupView.down('employeesetupgrid').getStore(),
            emptab = employeeSetupView.up('employeetab'),
            emptabViewModel = emptab.getViewModel(),
            employeeGroupStore = emptabViewModel.get('empGroupStore'),
            greyHrErrMsg = 'GreytHR id should not be duplicate';
        var vc = this, vm = vc.getViewModel();
        var record = {};
        record = vc.prepareRecord(record, employeeId, formValues);
        var objArgs = {};
        objArgs.btn = btn;
        objArgs.vc = vc;
        objArgs.vm = vm;
        objArgs.record = record;
        objArgs.form = form;
        objArgs.empSetupWindow = empSetupWindow;
        objArgs.emploueeSetupTabpanel = emploueeSetupTabpanel;
        objArgs.store = store;
        objArgs.employeeGroupStore = employeeGroupStore;
        objArgs.greyHrErrMsg = greyHrErrMsg;
        objArgs.record.isManagerChanged = false;
        if (Utility.currentReportingManager && Utility.currentReportingManager != formValues.reportingto && formValues.reportingto != '' && formValues.reportingto != null) {
            vm.set('valueResetted', true);
        } else {
            vc.reportingChange(objArgs);
        }
        valueResetted = vm.get('valueResetted');
        if (valueResetted) {
            objArgs.record.isManagerChanged =  true;
            vc.reportingChangeWindow(objArgs);
        }
    },
    /**
     * This handler is responsible for rendering reporting manager change window.
     * @param {objArgs} Object, Contains the references of viewModel, Records, forms and views.
     */
    reportingChangeWindow: function(objArgs){
        var win = Ext.ComponentQuery.query('reportmanagerchangewindow')[0] || Ext.create('DDO.view.setup.employeesetup.ReportManagerChangeWindow',{
            objArgs: objArgs
        });
        win.show();
    },
    /**
     * This handler is responsible for preparing record object from form data for further operations.
     * @param {record} Object, Empty Object
     * @param {employeeId} Object, contains employeeId.
     * @param {formValues} Object, contains values of work details form.
     * @return {record} , contains data of work details form.
     */
    prepareRecord: function(record, employeeId, formValues){
        record = {
            employeeId: employeeId,
            reportingto: formValues.reportingto,
            designation: formValues.designationname,
            department: formValues.departmentname,
            empstatus: formValues.empstatus,
            joiningdate: formValues.joiningdate,
            confirmdate: formValues.confirmdate,
            separateddate: formValues.separateddate,
            pskill: formValues.pskill,
            notice: formValues.notice,
            grey_hr_id: formValues.grey_hr_id || null
        };
        return record;
    },
});
