/**
 * The file AccessDetailsController is the ViewController for 'DDO.view.setup.employeesetup.AccessDetails'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.accessdetailscontroller'.
 */
Ext.define('DDO.view.setup.employeesetup.AccessDetailsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.accessdetailscontroller',
/**
 * The function onFormSaveClick is responsible for ajax requests by clicking on the save button.
 * @param {Ext.button.Button} 'btn' which is a button.
 */
    onFormSaveClick: function(btn) {
       try{
        var form = btn.up('form'),
            formValues = form.getValues(),
            employeesetupWindow = btn.up('window'),
            viewModel = employeesetupWindow.getViewModel(),
            employeeId = viewModel.get('ddo_employee_id'),
            store = Ext.getStore('setup.employeesetup.EmployeeStore'),
            employeeLoading;
            employeeLoading = new Ext.LoadMask({
            msg: '',
            target: employeesetupWindow
        });
         employeeLoading.show();
        if (employeesetupWindow.edit) {
           this.createAjaxRequest(formValues,employeeLoading,store,employeeId);
        } else {
                    viewModel.set('istags', false);
                    viewModel.set('istags', false);
            this.elseCreateAjaxRequest(formValues,viewModel,employeeLoading);     
        }
    }catch(err){
        Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ACCESSDETAILS.SAVECLICK, err);
    }
    },
    /**
     * The function createAjaxRequest is responsible for creating ajax request by clicking on the save button.
     * @param {object} 'formValues' which takes the form values.
     * @param {Ext.LoadMask} 'employeeLoading' which apply load mask on the component.
     * @param {setup.employeesetup.EmployeeStore} 'store' which holds the employee store.
     * @param {employeeid} 'employeeId' which holds the employee id.
     */
    createAjaxRequest:function(formValues,employeeLoading,store,employeeId){
        Ext.Ajax.request({
            scope: this,
            url: 'role/addroles',
            method: 'POST',
            params: {
                employeeId: employeeId,
                role: Ext.encode(formValues.roleid)
            },
            success: function() {
                employeeLoading.hide();
                Ext.Msg.alert('Success', 'Successfully updated Employee Roles');
                store.load();
            },
            failure: function() {
                employeeLoading.hide();
                Ext.Msg.alert('Failed', 'Failed to update Employee Roles');
            }
        });
    },
    /**
     * The function elseCreateAjaxRequest is responsible for creating ajax request in the else condition by clicking on the save button.
     * @param {object} 'formValues' which takes the form values.
     * @param {Ext.app.ViewModel} 'viewModel' employeesetupwindowviewmodel is the viewModel
     * @param {Ext.LoadMask} 'employeeLoading' which apply load mask on the component.
     */
    elseCreateAjaxRequest:function (formValues,viewModel,employeeLoading){
        var me = this;
        var promiseFrequency = new Promise(function(resolve,reject){     
        Ext.Ajax.request({      
            url: 'role/addroles',
            method: 'POST',
            scope: me,
            params: {
                employeeId: formValues.ddo_employee_id,
                role: Ext.encode(formValues.roleid)
            },
            success: function(response) {
                var resolveObj = {};
                resolveObj.response = response;
                resolveObj.viewModel = viewModel;
                resolveObj.employeeLoading = employeeLoading;
                resolve(resolveObj);
            },
            failure: function(resp) {
                  var rejectObj = {};
                 rejectObj.resp = resp;
                // rejectObj.employeeLoading = employeeLoading;
                reject(rejectObj);    
            }
        });
    });
    promiseFrequency.then(function(resolveObj){
        var store = Ext.getStore('setup.employeesetup.EmployeeStore'),
        view = me.getView(),
        tabPanel = view.up('tabpanel');
        resolveObj.employeeLoading.hide();
    tabPanel.down('employeeform').reset();
    tabPanel.down('workdetails').reset();
    tabPanel.down('personaldetailstab').reset();
    tabPanel.down('employeeaddress').reset();
    resolveObj.viewModel.set('istags', false);
    me.getView().reset();
    me.getView().up('window').destroy();
    store.load();
 
    me.getView().up('window').close();
    }).catch(function(rejectObj){
        employeeLoading.hide();
        Ext.Msg.alert('ERROR!', 'Failed to add the roles');
    })
    },
    /**
     * The function onFormCancelClick will close the window by calling employeesetupwindow controller in which functionality is written.
     * @param {Ext.button.Button} 'btn' which is a button.
     * @param {Event.target} 'e' where the event needs to fire.
     */
    onFormCancelClick: function(btn, e, eOpts) {
        try{
        var empWindow = this.getView().up('employeesetupwindow'),
            empWinController = empWindow.getController();
        empWinController.onFormCancelClick(btn, e, eOpts);
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ACCESSDETAILS.CANCELCLICK, err);
        }
    },
   /**
    * The function onAccessDetailsBeforeSelect fires before the deselected item is removed from the collection.
    * @param { Ext.form.field.ComboBox} 'combo' which holds the combobox.
    * @param { Ext.data.Model} 'record' deselected record.
    * @param {Number} 'index' the index of the deselected record.
    * @param {object} 'eOpts' the options object passed.
    */
    onAccessDetailsBeforeSelect: function(combo, record, index, eOpts) {
        try{
        var tabpanel = combo.up('tabpanel'),
            loginData = Ext.getStore('login').getData().items[0].data,
            isadmin = false,
            loginemployeeId = loginData.ddo_employee_id,
            viewmodel = combo.up('window').getViewModel(),
            ddo_employee_id = combo.up('window').getViewModel().get('ddo_employee_id'),
            deleteAdmin = false;
        var roles = Ext.getStore('login').getData().items[0].data.roles;
        for (var i = 0, length = roles.length; i < length; i++) {
            if (roles[i].rolename == "Admin") {
                isadmin = true;
            }
        }
        if ((tabpanel.getActiveTab().xtype == "accessdetails") && viewmodel.get('istags')){
             if(isadmin && (loginemployeeId == ddo_employee_id)){
                 deleteAdmin = true;
            }
            if (record.data.name == "Employee" || (deleteAdmin && (record.data.name == "Admin"))) {
                Utility.topAlertMessage("Warning", "You can't delete this role");
                return false;
            }
        }
    }catch(err){
        Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ACCESSDETAILS.BEFORESELECT, err);
    }
    },
    /**
     * The function onAccessDetailsSelect is responsible for collapse of combo atleast one item is slected.
     * @param {Ext.form.field.ComboBox} 'combo' which is a combobox.
     * @param {Ext.data.Model} 'record' which is the selected record.
     * @param {object} 'eOpts' the options object passed.
     */ 
    onAccessDetailsSelect: function(combo, record, eOpts) {
        try{
        var vm = this.getViewModel();
        combo.inputEl.dom.value = '';
        combo.collapse();
        vm.set('accesssavebutton', false);
        }catch(err){
            Utility.showToast(Messages.EMPLOYEESETUP.EMPTAB.EMPLOYEE.ACCESSDETAILS.SELECTCOMBO, err);
        }
    }
});