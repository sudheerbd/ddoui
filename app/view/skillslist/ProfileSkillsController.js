/**
 * The file ProfileSkillsController is the controller for profile skills.
 */
Ext.define('DDO.view.skillslist.ProfileSkillsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profileskills',

    /**
     * Dynamically Adding skills form when user required to fill skills.
     * @param:{string} btn contains The current component always passed as the button reference.
     * If form exists disable the button.
     */
    onAddSkills: function(btn, isEdit, data) {
        try{
            // debugger;
         var skills = this.getView().lookupReference('profileskillsadded');
        if (Utility.isFormDirty) {
            var hash = location.hash;
            // if( hash === '#employee'){
                var monthstore = Ext.getStore('monthstore');
            if (!monthstore.isLoaded()) {
                monthstore.load();
            }
            Utility.isFormDirty = true;
            this.getView().add({
               xtype: 'profileskillsform'
            });
            this.getViewModel().set('editing', true);
            this.getViewModel().set('skillsediting', true);
        //     }else{
        //      Ext.Msg.alert('INFO', 'Please close the other form before you want to Add New Skill Details');
        // }
            } else {
            var monthstore = Ext.getStore('monthstore');
            if (!monthstore.isLoaded()) {
                monthstore.load();
            }
            Utility.isFormDirty = true;
            // skills.hide();
            // var form = this.getReferences().profileskillsform;
            // form.loadRecord(data);
            this.getView().add({
               xtype: 'profileskillsform'
            });
            this.getViewModel().set('editing', true);
            this.getViewModel().set('skillsediting', true);
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.PROFILESKILLS.ADDSKILL, err);
    }
    },

    onSkillCheckChange:function(field, rowIdx, checked, eOpts){
    
        var view = this.getView(),
        primaryCheck = view.down('[reference = primarycheck]');
        if(checked == true){
            primaryCheck == 'Y'
        }else{
            primaryCheck == 'N'
        }
    },
    onSaveClicks: function(btn,grid,rowIndex,colIndex,EmpId){
        // var me = this;
        var hash = location.hash;
        if( hash === '#employee'){
        var vm = this.getViewModel();
        vm.set('isDelete', true);
        this.onSaveClick(btn,grid,rowIndex,colIndex,EmpId);
        }
        else{
            this.OnDeleteButton(btn,grid,rowIndex,colIndex,EmpId);
        }
    },

    /** Getting form details,adding to view model binded store and sync store.
     * Once details save showing skills views and add skill button enables.
     * @param {Ext.button.Button} 'btn' which is the save button.
     */

    onSaveClick: function(btn,grid,rowIndex,colIndex,EmpId) {
        try{
            // debugger;
            var view = Ext.create('DDO.view.setup.employeesetup.EmployeeSkills');
            var EmpVM = view.getViewModel();
            EmpVM.set('employeeskillssavebutton', false);
              
           var me = this;
           var vm = this.getViewModel();
         
            var view = this.getView();
            var form = btn.up('form');
           var values = form.getValues();
           var skillGridView = Ext.create('DDO.view.setup.skills.SkillsGrid');
         
        
        //    var skillGridView = Ext.ComponentQuery.query('skillsgrid')[0];
      
           var gridStore = skillGridView.getStore('skillslist.ProfileSkillsComboStore');
            // vm = me.getViewModel();
          
       
            var SkillsWindow = Ext.create('DDO.view.setup.skills.SkillsWindow');
             var skillsForm = SkillsWindow.down('form');
            var formRec = skillsForm.getValues();
            var  skillName = Ext.String.trim(formRec.name);
            var valueMatch = gridStore.findRecord('name',skillName, 0, false, false, true);
            var skillStore =  vm.getStore('profileskillsstore');
            var form = this.getReferences().profileskillsform;
            var addedView = this.getReferences().profileskillsadded;
            
            var params = {};
            // params.ddo_employee_id = EmpId;
         
           
            var hash = location.hash;
            params.fromemployeesetup = false
        if( hash === '#employee'){
            var EmpWinRef = btn.up('employeesetupwindow');
            var EmpId = EmpWinRef.getViewModel().get('ddo_employee_id');
            params.ddo_employee_id = EmpId;
            params.fromemployeesetup = true 
        }
       

        if(!vm.getData().isDelete){
            var Skillname = btn.up('form').down('combobox').getSelection().data.name;
            var values = this.getReferences().profileskillsform.getValues();
            params.ddo_empskill_id = vm.getData().ddoEmpSkillsId;
            params.skillid = values.skillid;
            params.rating = values.rating;
            params.primaryskill = values.primarycheck;
            params.skillname = Skillname;
        // var me = this,
        //     form = btn.up('form'),
        //     values = form.getValues()
            // vm = me.getViewModel();
        //    var skillname = btn.up('form').down('combobox').getSelection().data.name;
            // store = Ext.getStore('skillslist.ProfileSkillsStore');
        // values.skillname = skillname;
        //     debugger;
        // var me = this,
        //     form = btn.up('form'),
        //     values = form.getValues()
        //     vm = me.getViewModel();
        //    var skillname = btn.up('form').down('combobox').getSelection().data.name,
        //     store = Ext.getStore('skillslist.ProfileSkillsStore');
        // values.skillname = skillname;
        if(!vm.getData().isEdit){
            if(!valueMatch){
        // if(values.primarycheck){
        //         primarycheck == 'Y';
        //         return primarycheck;
        // }else{
        //     primarycheck== 'N';
        //     return primarycheck;
        // }
        // store.add(values);
          
        Ext.Ajax.request({
        
            url: Api.URL.skills.UPDATE,
            method: 'Post',
            params: params,
            success: function(response,request){
                var responseJSON = JSON.parse(response.responseText);
                var resolveObj = {};
                resolveObj.response = response;
                    resolveObj.store = skillStore;
                    resolveObj.view = view;
                    resolveObj.vm = vm;
                    resolveObj.form = form;
                    if(location.hash === '#employee'){
                        skillStore.getProxy().extraParams = {
                            employeeid: request.params.ddo_employee_id

                        }
                     
                        skillStore.reload({
                        
                            callback: function(data){
                                // skillsStore = Ext.getStore('skillslist.ProfileSkillsStore');
    
                              
                                // skillsStore.getProxy().extraParams = {
                                //     employeeid: record.data.empId
                                // }
                                // console.log("DASDASDASDAS=");
                                //  if(record.data.empId = resolveObj.ddo_employee_id ){
                                 addedView.getStore().setData(data);
                                 
                               vm.set('adding', true);
                            vm.set('skillsadding', false);
                            form.destroy();
                            Ext.Msg.alert("Success", "Succesfully added!");
                            }
                        }
                        )
                    
                    }
                    else{
                        skillStore.reload({
                            callback: function(data){
                                // skillsStore = Ext.getStore('skillslist.ProfileSkillsStore');
    
                              
                                // skillsStore.getProxy().extraParams = {
                                //     employeeid: record.data.empId
                                // }
                                // console.log("DASDASDASDAS=");
                                //  if(record.data.empId = resolveObj.ddo_employee_id ){
                                 addedView.getStore().setData(data);
                                 
                               vm.set('adding', true);
                            vm.set('skillsadding', false);
                            form.destroy();
                            Ext.Msg.alert("Success", "Succesfully added!");
                            }
                        });
                    }
                    // resolveObj.ddo_employee_id = params.ddo_employee_id;
                    // skillStore.reload({
                        // ddo_employee_id:params.ddo_employee_id ,
                       
                        // scope: me,
                        // if(resolveObj.store == null){

                       
                        // }
                    // })
            },
            failure: function(err) {
                vm.set('adding', true);
                        vm.set('skillsadding', false);
                        form.destroy();
                        Ext.Msg.alert("Failure", "Something went Wrong on adding!");
            }
        });
            }
            else{
                Ext.Msg.alert('Warning', AlertMessages.existSkill); 
            }
        }
        // store.sync({
        //     success: function(batch, options) {
        //         var alreadyExist = false;
        //         if (batch.operations.length > 0) {
        //             var responseText = Ext.decode(batch.operations[0].getResponse().responseText);
        //             if (responseText.exist) {
        //                 alreadyExist = true;
        //             }
        //         }
        //         store.load();
        //         btn.up('form').reset();
        //         Utility.isFormDirty = false;
        //         me.getView().lookupReference('profileskillsform').destroy();
        //         me.getViewModel().set('editing', true);
        //         me.getViewModel().set('skillsediting', false);
        //         if (alreadyExist) {
        //             var errAlertMsg = "<span class='err-toast'>" + responseText.message + "</span>";
        //             Utility.toastReuseFn('t', errAlertMsg);
        //         }else{
        //             aboutList = Ext.ComponentQuery.query('aboutlist')[0];
        //         if (Ext.isDefined(aboutList)) {
        //             aboutListStore = aboutList.getStore();
        //             aboutListStore.load();
        //         }
        //         }
        //     }
        // });
    
     else {
        vm.set('isEdit', false);
        me.onSaveEdit(EmpId);
    }
}
    else if(vm.getData().isDelete) {
        vm.set('isDelete', false);
        me.OnDeleteButton(btn,grid,rowIndex,colIndex,EmpId);
    
}
// debugger;
    // var view = Ext.create('DDO.view.setup.employeesetup.EmployeeSkills');
    // var vm = view.getViewModel();
    // vm.set('employeeskillssavebutton', false);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.PROFILESKILLS.SAVECLICK, err);
    }
    },

    /** Canceling and reseting form. Once cancel add skill button enables
     * @param {Ext.button.Button} 'btn' which is the cancel button.
     */
    onCancelClick: function(btn) {
        try{
        var skills = this.getView().lookupReference('profileskillsadded'),
            view = this.getView();
        btn.up('form').reset();
        Utility.isFormDirty = false;
        this.getViewModel().set('editing', true);
        this.getViewModel().set('skillsediting', false);
        view.lookupReference('profileskillsform').destroy();
        var view = Ext.create('DDO.view.setup.employeesetup.EmployeeSkills');
    // var EmpSkillView = Ext.ComponentQuery.query('employeeskills')[0];
    view.getViewModel().set('employeeskillssavebutton', false);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.PROFILESKILLS.CANCELCLICK, err);
    }
    },

    /** 
     * This method is used set the month field to current month when year field
     * points to the current year and the month selected is greater than the current month.
     * @param {String} 'yearfield' The year field data
     */
    onStartYearEnter: function(yearfield) {
        var monthfield = this.getView().lookupReference('startmonth');
        Utility.validateMonth(yearfield, monthfield);
    },

    /** 
     * This method is used set the month field to current month when year field
     * points to the current year and the month selected is greater than the current month.
     * @param {String} The year field data
     */
    onEndYearEnter: function(yearfield) {
        var monthfield = this.getView().lookupReference('endmonth');
        Utility.validateMonth(yearfield, monthfield);
    },
    /**
     * The function onSkillsComboChange isresponsible to filter the store based on the value selected.
     * @param {Ext.form.Field.Combobox} 'combo' combobox of profiles skill store. 
     * @param {string} 'newVal' the new value which is selected. 
     * @param {string} 'oldVal' the old value. 
     * @param {object} 'eOpts' the options object passed. 
     */
    onSkillsComboChange: function(combo, newVal, oldVal, eOpts) {
        try{
        var vm = this.getViewModel(),
            skillsStore = vm.get('profileskillsstore'),
            records = skillsStore.getData().items;
        this.filterStore(combo.getStore(), records);
        }catch(err){
            Utility.showToast(Messages.USERPROFILE.PROFILESKILLS.COMBOCHANGE, err);
        }
    },

     filterStore: function(store, records) {
     },

    /**
     * onStartYearChange Fn verifies the from and to year numberfield values
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'startyearfield' This numberfield
     */
    onStartYearChange: function(startyearfield) {
        var me = this;
        Utility.StartYearChange(startyearfield, me);

    },

    /**
     * onEndYearChange Fn verifies the from and to year numberfield values
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'endyearfield' This numberfield
     */
    onEndYearChange: function(endyearfield) {
        var me = this;
        Utility.EndYearChange(endyearfield, me);
    },
    /**
     * onEndMonthChange Fn verifies the from and to year numberfield values
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'endmonthfield' This numberfield
     */
    onEndMonthChange: function(endmonthfield) {
        var me = this;
        Utility.EndMonthChange(endmonthfield, me);
    },
    /**
     * onStartMonthChange Fn verifies the from and to year numberfield values
     * @event focusleave
     * Fires when focus leaves from the numberfield
     * @param {Ext.form.field.Number} 'startmonthfield' This numberfield
     */
    onStartMonthChange: function(startmonthfield) {
        var me = this;
        Utility.StartMonthChange(startmonthfield, me);
    },
    /**
     * The function onViewRender is responsible for editing the based on the length of the skills added.
     * @param {profileskillsview} 'view' which holds profileskillsview. 
     */
    onViewRender: function(view) {
        try{
            // debugger;
            this.getViewModel().set('editing', true);
            var Profileview = this.getView(), 
            vm = Profileview.getViewModel(),

                 skillStore =  vm.getStore('profileskillsstore');
                // if(!skillStore.isLoaded()){
                    skillStore.load();
                // }
                var SkillsAdded = view.down('profileskillsadded');
                // var skl = Ext.ComponentQuery.query('profileskillsadded')[0] ;
                var btnRef = SkillsAdded.down('[reference=Action]');
                var hash = location.hash;
                if( hash === '#profile/user'){
                btnRef.setHidden(false);
               }
               else {
                btnRef.setHidden(true);  
               }
                SkillsAdded.getStore().setData(skillStore.getData());
        Ext.defer(function() {
            var store = this.getView().lookupReference('profileskillsadded').getStore(),
                length = store.getCount(),
                button = this.getView().lookupReference('addskills'),
                viewModel = this.getViewModel(),
                nonPersonal = viewModel.get('nonPersonalAcccess');
            if (nonPersonal == false) {
                if (length > 0) {
                    viewModel.set('editing', true);
                }
            } else {
                viewModel.set('editing', true);
            }
        }, 700, this);
        view.el.on('mouseover', 'onSkillsContainerMouseOver');
        view.el.on('mouseleave', 'onSkillsContainerMouseLeave');
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.PROFILESKILLS.RENDER, err);
    }
    },
   
    onEditButton: function(btn, rowIndex, colIndex, grid, grid1,  record){

        var me = this;
        // var isEdit = true;
        var data = record.data;
        // var form = this.getView().getReferences().profileskillsform;
        // form.loadRecord(record);
        this.getView().add({
            xtype: 'profileskillsform'
         });
         var form = this.getView().getReferences().profileskillsform;
         var skillIdRef = form.down('[reference= skillidRef]');
         var primaryRef = form.down('[reference= primarycheck]');
         var ratingRef = form.down('[reference= ratingRef]');
         var vm = this.getViewModel()
         var skillStore =  vm.getStore('profileskillsstore');
         skillStore.load({
             scope: me,
            callback: function () {
                skillIdRef.setValue(data.skillid);
                if(data.primaryskill === 'Y'){
                    primaryRef.setValue(true);
                }
                ratingRef.setValue(data.rating);
            }
         });
        //  vm.set('isEdit', true);
         vm.set('skillsediting', true);
         vm.set('isEdit', true);
         vm.set('ddoEmpSkillsId', data.ddo_empskills_id);
         vm.set('skillname', data.skillname);

        // this.onAddSkills(btn, isEdit, record);
    },
    onSaveEdit: function(EmpId){
     
        var me = this;
        var vm = this.getViewModel();
        var view = this.getView();
        var values = this.getReferences().profileskillsform.getValues();
        var params = {};
        var skillStore =  vm.getStore('profileskillsstore');
        params.ddo_empskill_id = vm.getData().ddoEmpSkillsId;
        params.skillid = values.skillid;
        params.rating = values.rating;
        params.primaryskill = values.primarycheck;
        params.skillname = vm.getData().skillname;
        var form = this.getReferences().profileskillsform;
        var addedView = this.getReferences().profileskillsadded;
        var hash = location.hash;
        if( hash === '#employee'){
          
            // var EmpWinRef =Ext.create('DDO.view.setup.employeesetup.EmployeeSetupWindow');
            // var EmpId = EmpWinRef.getViewModel().get('ddo_employee_id');
            params.ddo_employee_id = EmpId;
            params.fromemployeesetup = true
        }
        // vm.set('isEdit', true);
        Ext.Ajax.request({
            url: Api.URL.skills.UPDATE,
            method: 'PUT',
            params: params,
            success: function(response,request){
             
                var responseJSON = JSON.parse(response.responseText);
                var resolveObj = {};
                resolveObj.response = response;
                    resolveObj.store = skillStore;
                    resolveObj.view = view;
                    resolveObj.vm = vm;
                    resolveObj.form = form;
                    if(location.hash === '#employee'){
                    
                        skillStore.getProxy().extraParams = {
                            employeeid: request.params.ddo_employee_id

                        }
                    skillStore.reload({
                        scope: me,
                        callback: function(data){
                         
                            // console.log("DASDASDASDAS=");
                            addedView.getStore().setData(data);
                           vm.set('editing', true);
                        vm.set('skillsediting', false);
                        form.destroy();
                        Ext.Msg.alert("Success", "Succesfully Updated!");
                        }
                        
                    })
                }
                else{
                    skillStore.reload({
                        scope: me,
                        callback: function(data){
                         
                            // console.log("DASDASDASDAS=");
                            addedView.getStore().setData(data);
                           vm.set('editing', true);
                        vm.set('skillsediting', false);
                        form.destroy();
                        Ext.Msg.alert("Success", "Succesfully Updated!");
                        }
                        
                    })
                }
            },
            failure: function(err) {
                vm.set('editing', true);
                        vm.set('skillsediting', false);
                        form.destroy();
                        Ext.Msg.alert("Failure", "Something went Wrong on Update!");
            }
        });
    },
    OnDeleteButton: function(btn,grid,rowIndex,colIndex,EmpId) {
      
        var gridStore = btn.getStore(),
         rec = gridStore.getAt(grid),
          vm = this.getViewModel(),
           params = {};

            var hash = location.hash;
            if( hash === '#employee'){
                // var EmpWinRef =Ext.create('DDO.view.setup.employeesetup.EmployeeSetupWindow');
                // var EmpId = EmpWinRef.getViewModel().get('ddo_employee_id');
                params.ddo_employee_id = EmpId;
                params.fromemployeesetup = true
            }

        params.ddo_empskills_id = rec.data.ddo_empskills_id;
    
        Ext.Ajax.request({
            url: '/skill',
            scope: this,
            method: 'delete',
            params: params,
            success: function(resp, request) {
                gridStore.removeAt(rowIndex);
                if(location.hash === '#employee'){
                
                         gridStore.getProxy().extraParams = {
                        employeeid: request.params.ddo_employee_id

                    }
                gridStore.reload();
                aboutList = Ext.ComponentQuery.query('aboutlist')[0];
                if (Ext.isDefined(aboutList)) {
                    aboutListStore = aboutList.getStore();
                    aboutListStore.load();
                }
                Ext.getBody().unmask();
                Ext.Msg.alert("Success", "Succesfully Deleted!");
            }
            else{
                gridStore.reload();
                aboutList = Ext.ComponentQuery.query('aboutlist')[0];
                if (Ext.isDefined(aboutList)) {
                    aboutListStore = aboutList.getStore();
                    aboutListStore.load();
                }
                Ext.getBody().unmask();
                Ext.Msg.alert("Success", "Succesfully Deleted!");
            }
            },
            failure: function(resp,request) {
                Ext.getBody().unmask();
                Ext.Msg.alert("Failure", "Something went Wrong on Delete!");

            }
        });
        vm.set('isDelete', false);
    
    }
    ,
    // OnDeleteButton: function(grid, rowIndex, colIndex) {
    //     var gridStore = grid.getStore(),
    //         rec = gridStore.getAt(rowIndex),
    //         params;
    //     params = {
    //         ddo_empskills_id: rec.data.ddo_empskills_id
    //     };
    //     Ext.Ajax.request({
    //         url: '/skill',
    //         scope: this,
    //         method: 'delete',
    //         params: params,
    //         success: function(resp, b) {
    //             gridStore.removeAt(rowIndex)
    //             gridStore.reload();
    //             Ext.getBody().unmask();
    //         },
    //         failure: function(resp, b) {
    //             Ext.getBody().unmask();

    //         }
    //     });
    // }
});