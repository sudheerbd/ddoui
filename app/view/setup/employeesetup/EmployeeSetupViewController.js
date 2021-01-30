/**
 * The file employeesetupviewcontroller is the viewController file of the Employee Setup View.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.employeesetupviewcontroller'.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeSetupViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.employeesetupviewcontroller',

    /**
     * This is the handler for the click event of the Add New Employee.
     * It will open the sets of tabs containing forms by which we can add employee.
     * @param {btn} - The 'Add New' button reference.    
     * @param {e} - The click event
     * @param {eOpts} -Event Object    
     */
    onAddNewClick: function(btn, e, eOpts) {
        try {
            var employeeSetupWindow, employeeSetupTabpanel, windowViewModel,
                me = this, formsObj = {}, view = me.getView();
            me.onStoresLoad(false);
            employeeSetupWindow = Ext.ComponentQuery.query('employeesetupwindow')[0] 
            || Ext.create('DDO.view.setup.employeesetup.EmployeeSetupWindow',{
                parentViewRef : view
            });
            employeeSetupTabpanel = employeeSetupWindow.down('tabpanel');
            formsObj = me.getFormsReference(employeeSetupTabpanel);
            windowViewModel = employeeSetupWindow.getViewModel();
            windowViewModel.set('tab3', true);
            windowViewModel.set('tab4', true);
            windowViewModel.set('tab5', true);
            windowViewModel.set('tab6', true);
            windowViewModel.set('tab7', true);
            me.onResetForm(formsObj);
            employeeSetupTabpanel.setActiveItem(0);
            me.setFormsDefaultStatus(formsObj);
            employeeSetupWindow.show();
            employeeSetupWindow.edit = false;
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.NEWEMPLOYEE, err);
        }
    },

    /**
     * This is the handler is called for getting all form References.
     * Forms like Personal, Work details, Address, Employee and Access role.
     * @param {employeeSetupTabpanel} - View Reference tabpanel inside 'EmployeeSetupWindow'.    
     * @return {temp} - object, contains all form references.    
     */
    getFormsReference:  function(employeeSetupTabpanel){
        var temp = {};
        temp.employeeformTab = employeeSetupTabpanel.down('employeeform');
        temp.workDetailsTab = employeeSetupTabpanel.down('workdetails');
        temp.personaldetailsTab = employeeSetupTabpanel.down('personaldetailstab');
        temp.employeeaddressTab = employeeSetupTabpanel.down('employeeaddress');
        temp.accessdetailsTab = employeeSetupTabpanel.down('accessdetails');
        temp.employeeskillsTab = employeeSetupTabpanel.down('employeeskills');
        temp.empworkexperienceTab = employeeSetupTabpanel.down('employeeworkexperience');
        return temp;
    },

    /**
     * This is the handler is called for resetting all form data.
     * Forms like Personal, Work details, Address, Employee and Access role.
     * @param {formsObj} - object, contains all form references.    
     */
    onResetForm: function (formsObj) {
        // debugger;
        var empFormFieldItems;
        for (var key in formsObj) {
            var formPanel = formsObj[key];
            if (formPanel) {
                empFormFieldItems = formPanel.getForm().getFields().items;
                for (i = 0, len = empFormFieldItems.length; i < len; i++) {
                    var c = empFormFieldItems[i];
                    c.value = '';
                    if (c.mixins && c.mixins.field && typeof c.mixins.field['initValue'] == 'function') {
                        c.mixins.field.initValue.apply(c);
                        c.wasDirty = false;
                    }
                }
            }
            formPanel = null;
        }
    },

    /**
     * This is the handler is called for setting all form default rendering status.
     * Forms like Personal, Work details, Address, Employee and Access role.
     * @param {formsObj} - object, contains all form references.    
     */
    setFormsDefaultStatus: function(formsObj){
        var annivesaryDt = formsObj.personaldetailsTab.down('datefield[name=anniversarydate]');
        formsObj.employeeformTab.getViewModel().set('employeedetailssavebutton',true);
        formsObj.workDetailsTab.getViewModel().set('workdetailssavebutton',true);
        formsObj.personaldetailsTab.getViewModel().set('personaldetailssavebutton',true);
        formsObj.employeeaddressTab.getViewModel().set('addresssavebutton',true);
        formsObj.accessdetailsTab.getViewModel().set('accesssavebutton',true);
        formsObj.employeeskillsTab.getViewModel().set('employeeskillssavebutton',false);
        formsObj.empworkexperienceTab.getViewModel().set('employeeexpsavebutton',false);
        annivesaryDt.setReadOnly(false);
        formsObj.workDetailsTab.setDisabled(true);
    },

    /**
     * This is the handler for the row double click event for display propmpted data in form.
     * It will open the form panel with selected record data.
     * @param {row} - The grid list reference.
     * @param {record} - The grid selected record.
     * @param {tr} - The TR element for the cell. 
     * @param {rowIndex} - Number(row index number).   
     * @param {e} - The click event
     * @param {eOpts} -Object    
     */
    onGridRowClick: function(row, record, tr, rowIndex, e, eOpts) {
        // debugger;
        // try {
            var me = this, argsObj = {},
                formsObj = {},
                view = me.getView();
            var employeeSetupWindow = Ext.ComponentQuery.query('employeesetupwindow')[0] || Ext.create('DDO.view.setup.employeesetup.EmployeeSetupWindow', {
                parentViewRef: view
            });
            // debugger
            if (employeeSetupWindow) {
                var employeeSetupTabpanel = employeeSetupWindow.down('tabpanel');
                // debugger;
                formsObj = me.getFormsReference(employeeSetupTabpanel);
                this.onResetForm(formsObj);
            }
            // debugger;
            argsObj.employeeSetupWindow = employeeSetupWindow;
            argsObj.formsObj = formsObj;
            argsObj.me = me;
            Utility.currentReportingManager = record.data.workdetails.reportingto;
            this.getViewModel().set('ddo_employee_id', record.data.empId);
            me.onStoresLoad(true, record);
            me.doFormRenderProcess(argsObj, record);
        // } catch (err) {
        //     Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.UPDATEEMPLOYEE, err);
        // }  
    },

    /**
     * This is the handler is called for initiating default form render process.
     * Displays window, load form tabs and setting default rendering status.
     * @param {argsObj} - object, contains References for forms, Employee Setup Window and Scope.
     * @param {record} - object, contains record data for selected row on grid.    
     */
    doFormRenderProcess: function (argsObj, record){
        Ext.defer(function() {
            var employeeSetupWindow = this.employeeSetupWindow,
                formsObj = this.formsObj,
                me = this.me,
                accessRolesForm, winViewModel, personalDetailsData;
            
            employeeSetupTabpanel = employeeSetupWindow.down('tabpanel');
            personalDetailsData = record.data.personaldetails;
            winViewModel = employeeSetupWindow.getViewModel();
            me.setViewModelProperties(winViewModel, record);
            employeeSetupTabpanel.setActiveItem(0);
            personalDetailsData.dob = personalDetailsData.dob ? Ext.Date.format(new Date(personalDetailsData.dob), 'Y-m-d') : null;
            personalDetailsData.anniversarydate = personalDetailsData.anniversarydate ? Ext.Date.format(new Date(personalDetailsData.anniversarydate), 'Y-m-d') : null;
            me.setPersonalDetailsFormValue(formsObj.personaldetailsTab, personalDetailsData);
            formsObj.employeeformTab.getForm().setValues(record.data.basic);
            formsObj.workDetailsTab.getForm().setValues(record.data.workdetails);
            me.setAccessRolesFormValue(formsObj.accessdetailsTab, record, me);
            var addressValues = record.data.addresses,
                workDetails = record.data.workdetails;
            if (workDetails) {
                me.setWorkDetailsFormValue(formsObj.workDetailsTab, workDetails, record);
            }
            me.setEmployeeWorkStatus(formsObj.workDetailsTab, record, me);
            me.setAddressFormValues(addressValues, formsObj.employeeaddressTab, me);
            me.setFormsViewModelProperties(formsObj);
            employeeSetupWindow.setTitle('Employee Setup');
            employeeSetupWindow.show();
            employeeSetupWindow.edit = true;
        }, 400, argsObj);
    },

    /**
     * This is the handler is called for setting address form data.
     * @param {addressValues} - object, contains values of address form.
     * @param {addressForm} - object, contains reference of address form panel.
     * @param {me} - object, contains scope of this controller.
     */
    setAddressFormValues: function (addressValues, addressForm, me) {
        if (addressValues.length > 0) {
            if (addressValues[0].type == "same") {
                me.setCurrentAddress(addressForm, addressValues, 0, true);
            } else {
                for (var i = 0; i < addressValues.length; i++) {
                    if (addressValues[i].type == "temp") {
                        me.setCurrentAddress(addressForm, addressValues, i, false);
                    }
                    if (addressValues[i].type == "perm") {
                        me.setParmanentAddress(addressForm, addressValues, i);
                    }
                }
            }
        }
        if (addressValues && addressValues.isChecked == "same") {
            var checkbox = addressForm.down('[name=ischecked]');
            checkbox.setValue(true);
        } else {
            //need to set permanent address details
        }
    },

    /**
     * This is the handler is called for setting window default properties via viewmodel.
     * @param {winViewModel} - object, contains store reference which is being used in Employee list grid.
     * @param {record} - object, selected row record from grid.
     */
    setViewModelProperties: function(winViewModel, record){
        winViewModel.set('tab2', false);
        winViewModel.set('tab3', false);
        winViewModel.set('tab4', false);
        winViewModel.set('tab5', false);
        winViewModel.set('tab6', false);
        winViewModel.set('tab7', false);
        winViewModel.set('istags', false);

        winViewModel.set('ddo_employee_id', record.data.basic.ddo_employee_id);
    },

    /**
     * This is the handler is called for setting all forms default properties via viewmodel.
     * @param {formsObj} - object, contains references of all forms like personal, work, address, access role.
     */
    setFormsViewModelProperties: function(formsObj){
        formsObj.employeeformTab.getViewModel().set('employeedetailssavebutton',true);
        formsObj.workDetailsTab.getViewModel().set('isDateSelected',true);
        formsObj.workDetailsTab.getViewModel().set('workdetailssavebutton',true);
        formsObj.personaldetailsTab.getViewModel().set('personaldetailssavebutton',true);
        formsObj.employeeaddressTab.getViewModel().set('addresssavebutton',true);
        formsObj.accessdetailsTab.getViewModel().set('accesssavebutton',true);
        formsObj.employeeskillsTab.getViewModel().set('employeeskillssavebutton',false);
        formsObj.empworkexperienceTab.getViewModel().set('employeeexpsavebutton',false);
    },

    /**
     * This is the handler is called for setting current address in address form.
     * @param {addressForm} - object, contains references of address forms.
     * @param {addressValues} - object, contains value of address forms.
     * @param {i} - Integer, array index for address array. 
     */
    setCurrentAddress: function(addressForm, addressValues, i, isChecked){
        addressForm.getForm().setValues({
            currentcityid: addressValues[i].city || null,
            currentcountryid: addressValues[i].country || null,
            currentdetails: addressValues[i].details || null,
            currentregionid: addressValues[i].state || null,
            zipcode: addressValues[i].zipcode || null,
            ddo_employee_cur_address_id: addressValues[i].ddo_empaddress_id,
            ischecked: isChecked
        });
    },

    /**
     * This is the handler is called for setting parmanent address in address form.
     * @param {addressForm} - object, contains references of address forms.
     * @param {addressValues} - object, contains value of address forms.
     * @param {i} - Integer, array index for address array. 
     */
    setParmanentAddress: function(addressForm, addressValues, i){
        addressForm.getForm().setValues({
            permanentcityid: addressValues[i].city || null,
            permanentcountryid: addressValues[i].country || null,
            permanentdetails: addressValues[i].details || null,
            permanentregionid: addressValues[i].state || null,
            permanentzipcode: addressValues[i].zipcode || null,
            ddo_employee_per_address_id: addressValues[i].ddo_empaddress_id
        });
    },

    /**
     * This is the handler is called for setting role access form data.
     * @param {accessRolesForm} - object, contains values of role access form.
     * @param {record} - object, contains reference of selected row record from grid.
     * @param {me} - object, contains scope of this controller.
     */
    setAccessRolesFormValue: function(accessRolesForm, record, me){
        var taggedAccessList = [],
            accessList = accessRolesForm.down('tagfield');
        record.data.access.forEach(function(rec) {
            var tagListData = rec.roleid;
            taggedAccessList.push(tagListData);
        });        
        var tagfieldStore = accessRolesForm.down('tagfield').getStore();
        tagfieldStore.clearFilter(true);
        tagfieldStore.load({
            scope: me,
            callback: function() {
                accessList.setValue(taggedAccessList);
            }
        });
        accessRolesForm.getForm().setValues(record.data.access);
    },

    /**
     * This is the handler is called for setting work details form status.
     * @param {workDetailsForm} - object, contains values of work details form status.
     * @param {record} - object, contains reference of selected row record from grid.
     * @param {me} - object, contains scope of this controller.
     */
    setEmployeeWorkStatus: function(workDetailsForm, record, me){
        var empStatus = workDetailsForm.getForm().findField("empstatus").getValue(),
            joiningDt = workDetailsForm.getForm().findField("joiningdate"),
            confirmedDt = workDetailsForm.getForm().findField("confirmdate"),
            // separatedDt = workDetailsForm.getForm().findField("separateddate"),
            noticeDt = workDetailsForm.getForm().findField("notice");
        
        workDetailsForm.down('[name=reportingto]').getStore().load();
        if (!(empStatus == null)) {
            if (record && record.data.workdetails.joiningdate) {
                joiningDtValue = Ext.Date.format(new Date(record.data.workdetails.joiningdate), 'Y-m-d');
                joiningDt.setValue(joiningDtValue);
            }
            if (empStatus == "Probation") {
                me.doProbationProcess(workDetailsForm, confirmedDt,noticeDt);
            } else if (empStatus == "Confirmed") {
                me.doConfimedProcess(workDetailsForm, confirmedDt,noticeDt, record);
            } 
            // else if (empStatus == "Separated") {
            //     me.doSeparatedProcess(workDetailsForm, confirmedDt,noticeDt, record);
            // }
            else if (empStatus == "Notice") {
                me.doNoticeProcess(workDetailsForm, confirmedDt,noticeDt, record);
            }
        }
    },

    /**
     * This is the handler is called for processing probation related activity.
     * @param {workDetailsForm} - object, contains reference of work details form.
     * @param {confirmedDt} - object, contains reference of confirm date field inside work details form.
     * @param {separatedDt} - object, contains reference of Separated date field inside work details form.
     * @param {noticeDt} - object, contains reference of Notice date field inside work details form.
     */
    doProbationProcess: function(workDetailsForm, confirmedDt,noticeDt){
        workDetailsForm.getViewModel().set('confirm', true);
        workDetailsForm.getViewModel().set('notice', true);
        // workDetailsForm.getViewModel().set('separated', true);
        confirmedDt.setValue(null);
        // separatedDt.setValue(null)
        noticeDt.setValue(null);
    },

    /**
     * This is the handler is called for processing confirmation related activity.
     * @param {workDetailsForm} - object, contains reference of work details form.
     * @param {confirmedDt} - object, contains reference of confirm date field inside work details form.
     * @param {separatedDt} - object, contains reference of Separated date field inside work details form.
     * @param {noticeDt} - object, contains reference of Notice date field inside work details form.
     * @param {record} - object, contains reference of selected row record from grid.
     */
    doConfimedProcess: function(workDetailsForm, confirmedDt,noticeDt, record){
        workDetailsForm.getViewModel().set('confirm', false);
        // workDetailsForm.getViewModel().set('separated', true);
        workDetailsForm.getViewModel().set('notice', true);
        // separatedDt.setValue(null);
        noticeDt.setValue(null);
        if (record && record.data.workdetails.confirmdate) {
            confirmedDtValue = Ext.Date.format(new Date(record.data.workdetails.confirmdate), 'Y-m-d');
            confirmedDt.setValue(confirmedDtValue);
        }
    },

    /**
     * This is the handler is called for processing separtation related activity.
     * @param {workDetailsForm} - object, contains reference of work details form.
     * @param {confirmedDt} - object, contains reference of confirm date field inside work details form.
     * @param {separatedDt} - object, contains reference of Separated date field inside work details form.
     * @param {noticeDt} - object, contains reference of Notice date field inside work details form.
     * @param {record} - object, contains reference of selected row record from grid.
     */
    // doSeparatedProcess: function(workDetailsForm, confirmedDt, separatedDt, noticeDt, record){
    //     workDetailsForm.getViewModel().set('separated', false);
    //     workDetailsForm.getViewModel().set('confirm', false);
    //     workDetailsForm.getViewModel().set('notice', true);
    //     noticeDt.setValue(null);
    //     if (record && record.data.workdetails.confirmdate) {
    //         confirmedDtValue = Ext.Date.format(new Date(record.data.workdetails.confirmdate), 'Y-m-d');
    //         confirmedDt.setValue(confirmedDtValue);
    //     }
    //     if (record && record.data.workdetails.separateddate) {
    //         separatedDtValue = Ext.Date.format(new Date(record.data.workdetails.separateddate), 'Y-m-d');
    //         separatedDt.setValue(separatedDtValue);
    //     }
    // },

    /**
     * This is the handler is called for processing notice related activity.
     * @param {workDetailsForm} - object, contains reference of work details form.
     * @param {confirmedDt} - object, contains reference of confirm date field inside work details form.
     * @param {separatedDt} - object, contains reference of Separated date field inside work details form.
     * @param {noticeDt} - object, contains reference of Notice date field inside work details form.
     * @param {record} - object, contains reference of selected row record from grid.
     */
    doNoticeProcess: function(workDetailsForm, confirmedDt,noticeDt, record){
        workDetailsForm.getViewModel().set('notice', false);
        workDetailsForm.getViewModel().set('confirm', false);
        // workDetailsForm.getViewModel().set('separated', true);
        // separatedDt.setValue(null);
        if (record && record.data.workdetails.confirmdate) {
            confirmedDtValue = Ext.Date.format(new Date(record.data.workdetails.confirmdate), 'Y-m-d');
            confirmedDt.setValue(confirmedDtValue);
        }
        if (record && record.data.workdetails.notice) {
            noticeDtValue = Ext.Date.format(new Date(record.data.workdetails.notice), 'Y-m-d');
            noticeDt.setValue(noticeDtValue);
        }
    },

    /**
     * This is the handler is called for setting work details form data.
     * @param {workDetailsForm} - object, contains reference of work details form.
     * @param {workDetails} - object, contains values of work details form.
     * @param {record} - object, contains reference of selected row record from grid.
     */
    setWorkDetailsFormValue: function(workDetailsForm, workDetails, record){
        workDetailsForm.getForm().setValues({
            ddo_empworkdetails_id:workDetails.ddo_empworkdetails_id || null,
            reportingto: workDetails.reportingto || null,
            designationname: workDetails.designation || null,
            departmentname: workDetails.department || null,
            pskill: workDetails.primarySkill_id || null,
            empstatus: workDetails.empstatus || null,
            isbillable: workDetails.isbillable || null,
            grey_hr_id: workDetails.grey_hr_id || record.data.basic.employee_code,
            notice:workDetails.notice || record.data.basic.notice || null
        });
    },

    /**
     * This is the handler is called for setting personal details form data.
     * @param {personalDetailsForm} - object, contains reference of personal details form.
     * @param {personalDetailsData} - object, contains values of personal details form.
     */
    setPersonalDetailsFormValue: function(personalDetailsForm, personalDetailsData) {
        personalDetailsForm.getForm().setValues({
            ddo_emppersonaldetails_id:personalDetailsData.ddo_emppersonaldetails_id || null,
            aadharno: personalDetailsData.aadharno || null,
            bloodgroup: personalDetailsData.bloodgroup || null,
            dob: personalDetailsData.dob || null,
            maritalstatus: personalDetailsData.maritalstatus || null,
            panno: personalDetailsData.panno || null,
            phoneno: personalDetailsData.phoneno || null,
            emergencyphoneno: personalDetailsData.emergencyphoneno || null,
            gender: personalDetailsData.gender || null,
            anniversarydate:personalDetailsData.anniversarydate || null
        });
        maritalstatus = personalDetailsForm.getForm().findField('maritalstatus').getValue();
        annivesaryDt = personalDetailsForm.getForm().findField('anniversarydate');
        personalDetailsForm.down('[name=gender]').setValue({
            "gender": personalDetailsData.gender
        });
        if(maritalstatus == "single"){
            annivesaryDt.setReadOnly(true);
            annivesaryDt.setValue(null);
        }else{
            annivesaryDt.setReadOnly(false);
        }
    },

    /** on grid row click assign role button enables and employee code setting in viewmodel.
    * @param {view} - The grid list reference.
    * @param {record} - The grid selected record.
    * @param {tr} - The TR element for the cell. 
    * @param {rowIndex} - Number(row index number).   
    * @param {e} - The click event
    * @param {eOpts} -Object  
    */
    onRowClick: function(view, record, tr, rowIndex, e, eOpts) {
        try {
            var viewModel = this.getViewModel();
            viewModel.set('addAssignRoleBtn', false);
            if(record.get('employee_code')){
                viewModel.set('employeeCode', record.get('employee_code'));
            }
            if(record.get('empId')){
                viewModel.set('ddo_employee_id', record.get('empId'));
            }
        } catch (err){
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ROWCLICKEMPCODE, err);
        }
    },

    /**
     * This is the handler is called for loading certain stores.
     * @param {edit} - boolean, represent mode of action.
     * @param {record} - object, grid selected row record.
     */
    onStoresLoad: function(edit, record) {
        var me = this;
        var departmentComboStore = Ext.getStore('setup.department.DepartmentComboStore'),
            setupDesignationComboStore = Ext.getStore('setup.SetupDesignationComboStore'),
            setupSupervisorComboStore = Ext.getStore('setup.SetupSupervisorComboStore'),
            skillsCombostore = Ext.getStore('skillslist.ProfileSkillsComboStore'),
            employeeStatusComboStore = Ext.getStore('setup.employeesetup.EmployeeStatusComboStore'),
            skillsStore = Ext.getStore('skillslist.ProfileSkillsStore');
            // jobsStore = Ext.getStore('jobs.JobsStore');
            
        departmentComboStore.load();
        setupDesignationComboStore.load();
         if(edit){
        skillsStore.getProxy().extraParams = {
            employeeid: record.data.empId
        }
        me.getView().mask();
        skillsStore.load({
            callback: function(records){
                me.getView().unmask();
            },
            scope: me
        });
    }
      if(edit){
        //   debugger;
        workExpContainer = Ext.ComponentQuery.query('workexpcontainer'),
        jobsStore = workExpContainer[0].getViewModel().getStore('jobsdatastore');
        jobsStore.getProxy().extraParams = {
            new_ddo_employee_id: record.data.empId
        }
        me.getView().mask();
        jobsStore.load({
            callback: function(records){
                me.getView().unmask();
            },
            scope: me
        });
        if(jobsStore.getCount() == 0){
            jobsStore.load();
        }
      }
        if (setupSupervisorComboStore.getCount() == 0) {
            setupSupervisorComboStore.load();
        }
        if (employeeStatusComboStore.getCount() == 0) {
            employeeStatusComboStore.load();
        }
        if(skillsCombostore.getCount() == 0){
            skillsCombostore.load();
        }
       
    },

    /**
     * This is the handler is called for formatting dates.
     * @param {value} - object, contains date object.
     * @param {format} - string, contains date format which need to be applicable.
     * @return - date with specified format.
     */
    getDateFormatData: function(value, format) {
        if (value) {
            return Ext.Date.format(new Date(value), format)
        } else {
            return "";
        }
    },

    /**
     * This is the handler is called for downloading data in form of excel sheets.
     * @param {btn} - object, reference of clicked button.
     * @param {evt} - object, contains event object.
     * @return - boolean, will return false after completeion of function execution.
     */
    onDownloadExcelBtnClick:function(btn,evt){
        try {
            evt.stopEvent();
            var grid = btn.up('employeesetupview').down('grid');
            var xml = grid.getPlugin('exporter').getDocumentData({
                title: 'All Employees'
                // xtype: "employeesetupgrid"
            }); //getExcelData(false, true);
            var blob = new Blob([xml], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            // using thrid-party FileSaver.js to save it as xlsx
            saveAs(blob, 'Employee.xls');
            return false;
        } catch (err){
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ROWCLICKEMPCODE, err);
        }
    },

    /**
     * This is the handler is called for initiating search operation in employee grid.
     * @param {searchField} - object, reference of search field.
     * @param {searchValue} - object, contains value of search field.
     */
    onEmployeeSearch: function (searchField, searchValue) {
        try {
            var allEmployeeBtnPressed = this.getView().up('employeetab').getReferences().allemployeebtn.pressed;
            var EmployeesetupGridStore = this.getView().down('employeesetupgrid').getStore();
            if (searchValue != '') {
                searchField.getTrigger('clear').setHidden(false);

                if (EmployeesetupGridStore) {
                    this.processSearchOperation(EmployeesetupGridStore, searchValue, allEmployeeBtnPressed);
                }
            } else {
                if(EmployeesetupGridStore && allEmployeeBtnPressed){
                    EmployeesetupGridStore.clearFilter();
                } else {
                    EmployeesetupGridStore.filterBy(function (record) {
                        var empstatus = record.getData().workdetails.empstatus;
                        if (empstatus != 'Separated') {
                          return record;
                       }
                    })
                }    
                searchField.getTrigger('clear').setHidden(true);
            }
        } catch (err){
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.EMPSEARCHOPERATION, err);
        }
    },

    /**
     * This is the handler is called for process search operation in employee grid.
     * @param {EmployeesetupGridStore} - object, contains store reference which is being used in Employee list grid.
     * @param {searchValue} - object, contains value of search field.
     */
    processSearchOperation: function(EmployeesetupGridStore, searchValue, allEmployeeBtnPressed){

        EmployeesetupGridStore.clearFilter(true);
        EmployeesetupGridStore.filterBy(function (record) {
            if (record.get('basic') && record.get('basic').firstname) {
                var firstName = record.get('basic').firstname.toLowerCase();
            }
            if (record.get('basic') && record.get('basic').lastname) {
                var lastName = record.get('basic').lastname.toLowerCase();
            }
            searchValue = searchValue.toLowerCase();
            if(!allEmployeeBtnPressed){
                var empstatus = record.getData().workdetails ? record.getData().workdetails.empstatus : '';
                if (firstName || lastName) {
                    if ((firstName.indexOf(searchValue) > -1 || lastName.indexOf(searchValue) > -1) && (empstatus != 'Separated')){
                        return record;
                    }
                } else {
                    return;
                }
                
            } else {
            if (firstName || lastName) {
                if (firstName.indexOf(searchValue) > -1 || lastName.indexOf(searchValue) > -1) {
                    return record;
                }
            } else {
                return;
            }
        }
        });
    },

    /**
     * This is the handler is called for clear search text in employee grid filter search field.
     * @param {clearIcon} - object, contains icon reference which is being used in grid filter search field.
     */
    onClearIcon: function (clearIcon) {
        try {
            clearIcon.setValue('');
            clearIcon.getTrigger('clear').setHidden(true);
            var employeesetupGrid = this.getView().down('employeesetupgrid');
            if (employeesetupGrid) {
                employeesetupGrid.getStore().clearFilter();
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.CLEARTRIGGER, err);
        }
    },
});