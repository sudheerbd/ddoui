/**
 * The file OrgChartController is the controller for 'DDO.view.organization.OrgChart'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.orgchartcontroller'
 */
Ext.define('DDO.view.organization.OrgChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgchartcontroller',
    /**
     * The function resetViewModelData is responsible to reset the viewmodel values.
     * @param {viewmodel.orgchartviewmodel} 'viewModel' which contains view model. 
     */
    resetViewModelData: function(viewModel) {
        viewModel.set('locName', null);
        viewModel.set('locBtnText', '');
        viewModel.set('rootAccessName', {});
        viewModel.set('childAccessName', {});
        viewModel.set('employee_name', null);        
        viewModel.set('childAnimate', false);
        viewModel.set('department_name', null);
        viewModel.set('department_code', null);
        viewModel.set('rootLimitAccess', false);
        viewModel.set('childEmptyAccess', false);
    },

    // init: function() {
    //     var me = this;
    // },
    /**
     * Reloading the Org Chart store when the orgChartUpdated event got emitted from socket.
     */
     reloadOrgChartStore: function(){
        var orgChart = this.getView(),
            orgChartView = orgChart.lookupReference('orgchartview') || orgChart.down('orgchartview'),
            orgChartStore = orgChartView.getStore();
        orgChartStore.reload();
    },
    /**
     * The function reInstanceOfViewFn  is responsible to fade out and fade in the animation based on duration.
     * and clearing the store filter.
     * @param {orgchartcontroller} 'scope' which holds organization chart controller. 
     * @param {orgchartview} 'orgChartView' which holds the view. 
     * @param {viewmodel.orgchartviewmodel} 'viewModel' which contains view model.
     * @param {store} 'orgChartStore' which holds the store. 
     */
    reInstanceOfViewFn: function(scope, orgChartView, viewModel, orgChartStore) {
        scope.resetViewModelData(viewModel);
        orgChartStore.clearFilter(true);
        orgChartView.getEl().fadeOut({
            opacity: 0,
            easing: 'easeOut',
            duration: 500,
            remove: false,
            useDisplay: false
        });
        orgChartStore.reload();
        orgChartView.getEl().fadeIn({
            opacity: 1,
            easing: 'easeOut',
            duration: 500
        });
        var view = this.getView(), departmentCombo = view.lookupReference("departmentname"), employeeCombo = view.lookupReference("employeename");
        departmentCombo.reset();
        employeeCombo.getStore().clearFilter();
    },
   /**
    * The function nonSelecChildNodes is responsible to filter the store records and to sset data in the view model.
    * @param {array} 'child' which is an array. 
    * @param {store} 'orgChartStore' which is organization chart store. 
    * @param {view} 'orgChartView' orgchart view file. 
    * @param {undefined} 'locName' viewmodel data.
    * @param {combobox} 'combo' which holds department combobox. 
    * @param {number} 'departmentCode' the code of the department which is selected.
    * @param {undefined} 'locfn' 
    */
    nonSelecChildNodes: function(child, orgChartStore, orgChartView, locName, combo, departmentCode, locfn) {
        orgChartStore.clearFilter(true);
        orgChartStore.filterBy(function(record) {
            if (!locfn) {
                if (locName) {
                    if ((record.data.location === ((locName === 'LLC') ? 'USA' : locName)) && (record.data.ddo_department_id === departmentCode)) {
                        child.push(record.data);
                    }    
                } else {
                    if (record.data.ddo_department_id === departmentCode) {
                       child.push(record.data);      
                    }
            }
            } else {
                if (departmentCode) {
                    if ((record.data.location === ((combo.value === 'LLC') ? 'USA' : combo.value)) && (record.data.ddo_department_id === departmentCode)) {
                        child.push(record.data); 
                    }
                } else {
                    if (record.data.location === ((combo.value === 'LLC') ? 'USA' : combo.value)) {   
                        child.push(record.data);
                    }
                }
            }      
        }, this);
        var count=0;
        child.forEach(function(rec){
            if(rec.testCount==undefined){
                count+=0;
            }else{
            count+=rec.testCount;
        }
        if(rec.parentId== "root"){
            rec.testCount=0
            }
            })
            orgChartView.up("orgchart").getViewModel().set('rootHeadCount',(child.length));
        orgChartView.setData(child);
    },
    /**
     * The file onOrgChartViewRender is fires when we click on any user.
     * @param {orgchartview} 'view' which is orgchartview. 
     * @param {object} 'eOpts' the options object passed. 
     */
    onOrgChartViewRender: function(view, eOpts) {
        //When click on any user image
        this.getView().getEl().on({
            scope: view,
            click: this.onProfileImageClick,
            delegate: 'img.profileImg-cls'
        });
        //When click on root node(WTC) image
        this.getView().getEl().on({
            scope: view,
            click: this.onRootImageClick,
            delegate: 'img.rootImg-cls'
        });
        //When click on any user name, redirects to Selected User Profile
        this.getView().getEl().on({
            scope: view,
            click: this.onProfileNameClick,
            delegate: 'span.org-emp-name-cls'
        });
    },
    /**
     * The function onOrgEmpComboSelect is responsible to set data as per the selected record of the combobox.
     * @param {Ext.form.field.ComboBox} 'combo' wihch is a combobox. 
     * @param {Ext.data.Model} 'record' the record which is selected.
     * @param {object} 'eOpts' the options object passed. 
     */
    onOrgEmpComboSelect: function(combo, record, eOpts) {
        var orgChart = this.getView(),
            orgChartView = orgChart.lookupReference('orgchartview'),
            viewModel = this.getViewModel(),
            departmentCode = viewModel.get('department_code'),
            locName = viewModel.get('locName'),
            orgChartStore = orgChartView.getStore(),
            orgChartSearch = orgChart.lookupReference('orgchartsearch'),
            root = {},
            child = {},
            rec, selecRootRec, userProfileUrl, rootImageUrl, comboValue, depSubChilds = [];
            viewModel.set('childEmptyAccess', false);
        locName = (locName === 'LLC') ? 'USA' : locName;
        if (!Ext.isEmpty(Ext.String.trim(combo.getRawValue()))) {
            rec = orgChartStore.findNode('employee_code', combo.value);
            if (rec) {
                rec.cascadeBy(function(record){record.set('testCount', orgChart.controller.calcCascadeCount(record))});
                viewModel.set('childAnimate', false);
                viewModel.set('rootLimitAccess', true);
                userProfileUrl = Utility.imageCheck(rec.data.user_profile_pic_url);
                root = {
                    employee_code: rec.data.employee_code,
                    emp_id: rec.data.emp_id,
                    employee_name: rec.data.employee_name,
                    employee_designation: rec.data.employee_designation,
                    employee_emailid: rec.data.employee_emailid,
                    user_profile_pic_url: userProfileUrl,
                    location: rec.data.location,
                    testCount:rec.data.testCount
                };
                viewModel.set('childAccessName', root);
                if (rec.data.supervisor_name) {
                    selecRootRec = orgChartStore.findNode('employee_code', rec.data.supervisor_code);
                    if (selecRootRec) {
                        rootImageUrl = Utility.imageCheck(selecRootRec.data.user_profile_pic_url);
                        child = {
                            employee_code: selecRootRec.data.employee_code,
                            emp_id: selecRootRec.data.emp_id,
                            employee_name: selecRootRec.data.employee_name,
                            employee_designation: selecRootRec.data.employee_designation,
                            employee_emailid: selecRootRec.data.employee_emailid,
                            user_profile_pic_url: rootImageUrl,
                            location: selecRootRec.data.location,
                            testCount:selecRootRec.data.testCount
                        };
                        viewModel.set('rootAccessName', child);
                    } else {
                        viewModel.set('rootAccessName', {});
                    }
                } else {
                    viewModel.set('rootAccessName', {});
                }
                if (departmentCode && locName) {
                    if (rec.data.children) {
                        for (var i = 0, len = rec.data.children.length; i < len; i++) {
                            if ((rec.data.children[i].ddo_department_id === departmentCode) && (rec.data.children[i].location === locName)) {
                                depSubChilds.push(rec.data.children[i]);
                            }
                        }
                    }
                    orgChartView.setData(depSubChilds);
                } else if (departmentCode) {
                    if (rec.data.children) {
                        for (var i = 0, len = rec.data.children.length; i < len; i++) {
                            if (rec.data.children[i].ddo_department_id === departmentCode) {
                                depSubChilds.push(rec.data.children[i]);
                            }
                        }
                    }
                    orgChartView.setData(depSubChilds);
                } else if (locName) {
                    if (rec.data.children) {
                        for (var i = 0, len = rec.data.children.length; i < len; i++) {
                            if (rec.data.children[i].location === locName) {
                                depSubChilds.push(rec.data.children[i]);
                            }
                        }
                    }
                    orgChartView.setData(depSubChilds);
                } else {
                    orgChartView.setData(rec.data.children);
                }
            }
        } else {
            this.reInstanceOfViewFn(this, orgChartView, viewModel, orgChartStore);
        }
    },
    /**
     * The function onOrgEmpComboEmptyText is responsible to do animation based on the employee selected. 
     * @param { Ext.form.field.Text} 'field' the text field. 
     * @param {Event} 'e' the click event 
     * @param {object} 'eOpts' the options object passed. 
     */
    onOrgEmpComboEmptyText: function(field, e, eOpts) {
        if (!field.getValue() || Ext.isEmpty(field.getRawValue().trim())) {
            var orgChart = this.getView(),
                viewModel = orgChart.getViewModel(),
                childAccessName = viewModel.get('childAccessName'),
                orgChartSearch, orgChartView, locBtn;
            viewModel.set('childEmptyAccess', false);
            if (!Ext.Object.isEmpty(childAccessName)) {
                orgChartSearch = orgChart.lookupReference('orgchartsearch');
                orgChartView = orgChart.lookupReference('orgchartview');
                locBtn = orgChartSearch.down('button');
                locName = viewModel.get('locName');
                this.reInstanceOfViewFn(this, orgChartView, viewModel, orgChartView.getStore());
            }
        }
    },
    /**
     * The function onOrgEmpComboEmptyEnter is responsible when any key related to navigation (arrows, tab, enter, esc, etc.) is pressed
     * fires when the enter button is pressed to show the record on the view page.
     * @param {Ext.form.field.Base} 'field' which is the form field. 
     * @param {Event} 'e' the click event. 
     */
    onOrgEmpComboEmptyEnter: function(field, e) {
        if ((e.getKey() == e.ENTER) && (Ext.isEmpty(field.value))) {
            var orgChart = this.getView(),
                viewModel = orgChart.getViewModel(),
                childAccessName = viewModel.get('childAccessName'),
                orgChartSearch, orgChartView;
            viewModel.set('childEmptyAccess', false);
            if (!Ext.Object.isEmpty(childAccessName)) {
                orgChartSearch = orgChart.lookupReference('orgchartsearch');
                orgChartView = orgChart.lookupReference('orgchartview');
                locName = viewModel.get('locName');
                this.reInstanceOfViewFn(this, orgChartView, viewModel, orgChartView.getStore());
            }
        }
    },
    /**
     * The function onOrgComboSelect is responsible to set the viewmodel and to show the view page based on the department selected.
     * @param {Ext.form.field.ComboBox} 'combo' wihch is a combobox. 
     * @param {Ext.data.Model} 'record' the record which is selected.
     * @param {object} 'eOpts' the options object passed. 
     */
    onOrgComboSelect: function(combo, record, eOpts) {
        var orgChartView = this.getView().lookupReference('orgchartview'),
            viewModel = this.getViewModel(),
            childAccessName = viewModel.get('childAccessName'),
            locName = viewModel.get('locName'),
            empName = viewModel.get('employee_name'),
            orgChartStore = orgChartView.getStore() || Ext.getStore('orgchartstore'),
            selecChildRec, storeItems, depSubChilds = [],
            comboValue
            child = [];
        locName = (locName === 'LLC') ? 'USA' : locName;
        viewModel.set('department_name', record.get('name'));
        viewModel.set('department_code', record.get('ddo_department_id'));
        comboValue = viewModel.get('department_code');
        var employeeCombo=this.getView().lookupReference('employeename');   
        if(employeeCombo && comboValue){
            if(employeeCombo.getSelection()){
                var empComboDept=employeeCombo.getSelection().data.department;
                if(empComboDept!=comboValue){
                    childAccessName={};
                }
               }
               employeeCombo.getStore().filter('department',comboValue);   
        }
        if (!Ext.isEmpty(orgChartView.getData())) {
            if (!Ext.Object.isEmpty(childAccessName)) {
                selecChildRec = orgChartStore.findNode('employee_code', childAccessName.employee_code);
                if (selecChildRec && selecChildRec.data.children) {
                    for (var i = 0, len = selecChildRec.data.children.length; i < len; i++) {
                        if (locName) {
                            if ((selecChildRec.data.children[i].ddo_department_id === comboValue) && (selecChildRec.data.children[i].location === locName)) {     
                                depSubChilds.push(selecChildRec.data.children[i]);
                            }
                        } else {
                            if (selecChildRec.data.children[i].ddo_department_id === comboValue) {
                                depSubChilds.push(selecChildRec.data.children[i]);
                            }
                        }
                    }
                }
                if(depSubChilds.length <= 0){
                    selecChildRec.set("testCount", 0)
                   }else{
                    selecChildRec.set("testCount",depSubChilds.length)
                   }
                orgChartView.setData(depSubChilds);
            } else {
                viewModel.set('childEmptyAccess', true);
                this.nonSelecChildNodes(child, orgChartStore, orgChartView, locName, combo, comboValue);
            }
        } else {
            if (!Ext.Object.isEmpty(childAccessName)) {
                selecChildRec = orgChartStore.findNode('employee_code', childAccessName.employee_code);
                if (selecChildRec) {
                    if (locName) {
                        if (selecChildRec && selecChildRec.data.children) {
                            for (var i = 0, len = selecChildRec.data.children.length; i < len; i++) {
                                if ((selecChildRec.data.children[i].location === locName) && (selecChildRec.data.children[i].ddo_department_id === comboValue)) {          
                                    depSubChilds.push(selecChildRec.data.children[i]);
                                }
                            }
                        }
                    } else {
                        if (selecChildRec && selecChildRec.data.children) {
                            for (var i = 0, len = selecChildRec.data.children.length; i < len; i++) {
                                if (selecChildRec.data.children[i].ddo_department_id === comboValue) {
                                    depSubChilds.push(selecChildRec.data.children[i]);
                                }              
                            }
                        }
                    }
                }
               if(depSubChilds.length <= 0){
                if(selecChildRec){
                    selecChildRec.set("testCount", 0)
    }
               }else{
                selecChildRec.set("testCount",depSubChilds.length)
               }
                orgChartView.setData(depSubChilds);
            } else {
                viewModel.set('childEmptyAccess', true);
                this.nonSelecChildNodes(child, orgChartStore, orgChartView, locName, combo, comboValue);
            }
        }
    },

    // onOrgComboLocSelect: function(combo, record, eOpts) {
    //     var orgChartView = this.getView().lookupReference('orgchartview'),
    //         orgChartSearch = this.getView().lookupReference('orgchartsearch'),
    //         locBtn = orgChartSearch.down('button'),
    //         viewModel = this.getViewModel(),
    //         childAccessName = viewModel.get('childAccessName'),
    //         departmentCode = viewModel.get('department_code'),
    //         empName = viewModel.get('employee_name'),
    //         orgChartStore = orgChartView.getStore() || Ext.getStore('orgchartstore'),
    //         selecChildRec, storeItems, newCls, depSubChilds = [],
    //         child = [];

    //     newCls = (combo.value === 'LLC') ? 'usa' : combo.value.substr(0, 3).toLowerCase();

    //     combo.value = (combo.value === 'LLC') ? 'USA' : combo.value;

    //     viewModel.set('locBtnText', (combo.value[0] === 'L') ? 'U' : combo.value[0]);
    //     if (!Ext.isEmpty(orgChartView.getData())) {
    //         if (!Ext.Object.isEmpty(childAccessName)) {
    //             selecChildRec = orgChartStore.findNode('employee_code', childAccessName.employee_code);
    //             if (selecChildRec && selecChildRec.data.children) {
    //                 for (var i = 0, len = selecChildRec.data.children.length; i < len; i++) {
    //                     if (departmentCode) {
    //                         if ((selecChildRec.data.children[i].location === combo.value) && (selecChildRec.data.children[i].ddo_department_id === departmentCode)) {
    //                             depSubChilds.push(selecChildRec.data.children[i]);
    //                         }
    //                     } else {
    //                         if (selecChildRec.data.children[i].location === combo.value) {
    //                             depSubChilds.push(selecChildRec.data.children[i]);
    //                         }
    //                     }
    //                 }
    //             }
    //             orgChartView.setData(depSubChilds);
    //         } else {
    //             viewModel.set('childEmptyAccess', true);
    //             this.nonSelecChildNodes(child, orgChartStore, orgChartView, false, combo, departmentCode, true);
    //         }

    //     } else {
    //         if (!Ext.Object.isEmpty(childAccessName)) {
    //             selecChildRec = orgChartStore.findNode('employee_code', childAccessName.employee_code);
    //             if (selecChildRec) {
    //                 if (departmentCode) {
    //                     if (selecChildRec && selecChildRec.data.children) {
    //                         for (var i = 0, len = selecChildRec.data.children.length; i < len; i++) {
    //                             if ((selecChildRec.data.children[i].ddo_department_id === departmentCode) && (selecChildRec.data.children[i].location === combo.value)) {
    //                                 depSubChilds.push(selecChildRec.data.children[i]);
    //                             }
    //                         }
    //                     }
    //                 } else {
    //                     if (selecChildRec && selecChildRec.data.children) {
    //                         for (var i = 0, len = selecChildRec.data.children.length; i < len; i++) {
    //                             if (selecChildRec.data.children[i].location === combo.value) {
    //                                 depSubChilds.push(selecChildRec.data.children[i]);
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             orgChartView.setData(depSubChilds);
    //         } else {
    //             viewModel.set('childEmptyAccess', true);
    //             this.nonSelecChildNodes(child, orgChartStore, orgChartView, false, combo, departmentCode, true);
    //         }
    //     }
    // },
   /**
    * The function onRootImageClick is responsible to show the record when clicked on the root image in the org chart.
    * @param {click} 'mouseevent' the click event. 
    * @param {image} 'orgblock' the image block. 
    * @param {object} 'events' 
    */
    onRootImageClick: function(mouseevent, orgblock, events) {
        var orgChart = this.up('orgchart'),
            viewModel = orgChart.getViewModel(),
            orgChartSearch, locBtn, locName,
            childAccessName = viewModel.get('childAccessName');
        if (!Ext.Object.isEmpty(childAccessName)) {
            orgChartSearch = orgChart.lookupReference('orgchartsearch');
            locBtn = orgChartSearch.down('button');
            locName = viewModel.get('locName');
            orgChart.getController().reInstanceOfViewFn(orgChart.getController(), this, viewModel, this.getStore());
        }
    },
    /**
     * The function onProfileImageClick is responsible when the user image is clicked in the orgchart.
    * @param {click} 'mouseevent' the click event. 
    * @param {image} 'orgblock' the image block. 
    * @param {object} 'events' 
     */
    onProfileImageClick: function(mouseevent, orgblock, events) {
        var orgChart = this.up('orgchart'),
            viewModel = orgChart.getViewModel(),
            locName = viewModel.get('locName'),
            store = Ext.getStore('orgchartstore'),
            orgChartSearch = orgChart.lookupReference('orgchartsearch'),
            selecRec = store.findNode('employee_code', orgblock.getAttribute('org-emp-code')),
            selecRootRec, dataDelay = false,
            root = {},
            child = {},
            comboValue, childImageUrl, imageUrl, depSubChilds = [],depSubChildConstructor=[];
            store.each(function (recod) {
                depSubChildConstructor.push(recod)
            })
            console.log(depSubChildConstructor)
            if(selecRec && selecRec.data.children){
            selecRec.cascadeBy(function(record){record.set('testCount', orgChart.controller.calcCascadeCount(record))});
        }
          if(selecRec){
            var parentRecCode=selecRec.parentNode.data.employee_code;
            }
            if(parentRecCode){
                var parentNode=store.findNode('employee_code', parentRecCode);
            parentNode.cascadeBy(function(record){var orgCount=orgChart.controller.calcCascadeCount(record);record.set('testCount',orgCount)});
        }
        viewModel.set('childEmptyAccess', false);
        locName = (locName === 'LLC') ? 'USA' : locName;
            if (selecRec) {
                imageUrl = Utility.imageCheck(selecRec.data.user_profile_pic_url);      
            if (!viewModel.get('childAnimate') && selecRec.data.depth < 2) {
                viewModel.set('childAnimate', true);
                this.refreshNode();
                dataDelay = true;
            }
            viewModel.set('rootLimitAccess', true);
            root = {
                employee_code: selecRec.data.employee_code,
                emp_id: selecRec.data.emp_id,
                employee_name: selecRec.data.employee_name,
                employee_designation: selecRec.data.employee_designation,
                employee_emailid: selecRec.data.employee_emailid,
                user_profile_pic_url: imageUrl,
                location: selecRec.data.location,
                testCount:selecRec.data.testCount
            };
            viewModel.set('childAccessName', root);
            viewModel.set('employee_name', selecRec.data.employee_code);
            if (selecRec.data.supervisor_name) {
                this.getEl().fadeOut({
                    opacity: 0,
                    easing: 'easeOut',
                    duration: 500,
                    remove: false,
                    useDisplay: false
                });
                selecRootRec = store.findNode('employee_code', selecRec.data.supervisor_code);
                if (selecRootRec) {
                    childImageUrl = Utility.imageCheck(selecRootRec.data.user_profile_pic_url);
                    child = {
                        employee_code: selecRootRec.data.employee_code,
                        emp_id: selecRootRec.data.emp_id,
                        employee_name: selecRootRec.data.employee_name,
                        employee_designation: selecRootRec.data.employee_designation,
                        employee_emailid: selecRootRec.data.employee_emailid,
                        user_profile_pic_url: childImageUrl,
                        location: selecRootRec.data.location,
                        testCount:selecRootRec.data.testCount
                    };
                    viewModel.set('rootAccessName', child);
                } else {
                    viewModel.set('rootAccessName', {});
                }
            }
            if (orgblock.getAttribute('org-emp-code') && selecRec.data.children) {
                if (dataDelay) {
                    Ext.defer(function() {
                        this.getEl().fadeIn({
                            opacity: 1,
                            easing: 'easeOut',
                            duration: 500
                        });
                        if (viewModel.get('department_code') && locName) {
                            comboValue = viewModel.get('department_code');
                            for (var i = 0, len = selecRec.data.children.length; i < len; i++) {
                               if ((selecRec.data.children[i].ddo_department_id === comboValue) && (selecRec.data.children[i].location === locName)) {
                                    depSubChilds.push(selecRec.data.children[i]);
                                }
                            }                     
                            var count=0;
                            depSubChilds.forEach(function(rec){
                                if(rec.testCount==undefined){                              
                                    count+=0;
                                }else{
                                count+=rec.testCount;
                            }
                                })
                                this.up("orgchart").getViewModel().set('rootHeadCount',(depSubChilds.length+1+count));                     
                            this.setData(depSubChilds);
                        } else if (viewModel.get('department_code')) {
                            comboValue = viewModel.get('department_code');
                            for (var i = 0, len = selecRec.data.children.length; i < len; i++) {
                                if (selecRec.data.children[i].ddo_department_id === comboValue) {
                                    depSubChilds.push(selecRec.data.children[i]);
                                }
                            }              
                            var count=0;
                            depSubChilds.forEach(function(rec){
                                if(rec.testCount==undefined){                          
                                    count+=0;
                                }else{
                                count+=rec.testCount;
                            }
                                })
                            this.up("orgchart").getViewModel().set('rootHeadCount',(depSubChilds.length+1+count));                          
                            this.setData(depSubChilds);
                        } else if (locName) {
                            comboValue = locName;
                            for (var i = 0, len = selecRec.data.children.length; i < len; i++) {
                                if (selecRec.data.children[i].location === comboValue) {
                                    depSubChilds.push(selecRec.data.children[i]);
                                }
                            }
                            var count=0;
                            depSubChilds.forEach(function(rec){
                                if(rec.testCount==undefined){                              
                                    count+=0;
                                }else{
                                count+=rec.testCount;
                            }
                                })
                                this.up("orgchart").getViewModel().set('rootHeadCount',(depSubChilds.length+1+count));                        
                            this.setData(depSubChilds);
                        } else {
                            this.setData(selecRec.data.children);
                        }              
                    }.bind(this), 1500);
                } else {
                    Ext.defer(function() {
                        this.getEl().fadeIn({
                            opacity: 1,
                            easing: 'easeOut',
                            duration: 500
                        });
                        if (viewModel.get('department_code') && locName) {
                            comboValue = viewModel.get('department_code');
                            for (var i = 0, len = selecRec.data.children.length; i < len; i++) {
                                if ((selecRec.data.children[i].ddo_department_id === comboValue) && (selecRec.data.children[i].location === locName)) {
                                    depSubChilds.push(selecRec.data.children[i]);
                                }
                            }
                            var count=0;
                            depSubChilds.forEach(function(rec){
                                if(rec.testCount==undefined){
                                    count+=0;
                                }else{
                                count+=rec.testCount;
                            }
                                })
                                this.up("orgchart").getViewModel().set('rootHeadCount',(depSubChilds.length+1+count));
                            this.setData(depSubChilds);
                        } else if (viewModel.get('department_code')) {
                            comboValue = viewModel.get('department_code');

                            for (var i = 0, len = selecRec.data.children.length; i < len; i++) {

                                if (selecRec.data.children[i].ddo_department_id === comboValue) {
                                    depSubChilds.push(selecRec.data.children[i]);
                                }
                            }
                            var count = 0;
                            depSubChilds.forEach(function (rec) {
                                if (rec.testCount == undefined) {
                                    count += 0;
                                } else {
                                    count += rec.testCount;
                                }
                            })
                            this.up("orgchart").getViewModel().set('rootHeadCount', (depSubChilds.length + 1 + count));
                            this.setData(depSubChilds);
                        } else if (locName) {
                            comboValue = locName;
                            for (var i = 0, len = selecRec.data.children.length; i < len; i++) {
                                if (selecRec.data.children[i].location === comboValue) {
                                    depSubChilds.push(selecRec.data.children[i]);
                                }
                            }
                            var count=0;
                            depSubChilds.forEach(function(rec){
                                if(rec.testCount==undefined){
                                    count+=0;
                                }else{
                                count+=rec.testCount;
                            }
                                })
                            this.up("orgchart").getViewModel().set('rootHeadCount',(depSubChilds.length+1+count));
                                
                            this.setData(depSubChilds);
                        } else {
                            this.setData(selecRec.data.children);
                        }
                    }.bind(this), 500);
                }
            } else {
                this.getEl().fadeIn({
                    opacity: 1,
                    easing: 'easeOut',
                    duration: 500
                });
                this.setData(null);
            }
        }
    },
    /**
     * The function onProfileNameClick is responsible to redirects to Selected User Profile when clicked on any user name.
    * @param {click} 'mouseevent' the click event. 
    * @param {name} 'orgblock' the name selected. 
    * @param {object} 'events' 
     */
    onProfileNameClick: function(mouseevent, orgblock, events) {
        var empCode = orgblock.getAttribute('org-emp-id');

        this.up('orgchart').getController().redirectTo('profile/' + empCode);
        var profileView = Ext.ComponentQuery.query('profileskillsadded')[0] ,
        // ||  Ext.create('DDO.view.profile.details.ProfileSkillsAdded'),
         btnRef = profileView.down('[reference=Action]');
        // btnRef.setHidden(true);
        var hash = location.hash;
        if( hash === '#profile/' + empCode){
        btnRef.setHidden(true);
        }
        else if( hash === '#profile/user'){
            btnRef.setHidden(false);
           }
    },
    /**
     * The function calcCount is responsible to set count in the view model before the view is refreshed.
     */
    calcCount: function () {
        store = Ext.getStore('orgchartstore');
        var count = 0;
        store.each(function (recod) {
            var innerCount=this.calcCascadeCount(recod);
            recod.set('testCount', innerCount);
            count += innerCount+1;
            this.getViewModel().set('rootHeadCount',count);
        },this);
    },
    /**
     * The function calcCascadeCount is responsible to calculate the count of the childnodes in record.
     * @param {storerecord} 'record' the record where the action performs. 
     */
    calcCascadeCount: function (record) {
        count = 0;
        record.cascadeBy(function (records) {
            if (records.data.children) {
                count += records.childNodes.length;
            }
        });
        return count;
    },
    /**
     * The function onResetBtnClick is responsible to clear the filter of employee combo and department combo.
     * @param {Ext.button.Button} 'button' the reset button. 
     */
    onResetBtnClick:function(button){
        var view = this.getView(), 
        departmentCombo = view.lookupReference("departmentname"),
         employeeCombo = view.lookupReference("employeename");
        departmentCombo.reset();
        employeeCombo.getStore().clearFilter();
        orgChartSearch = view.lookupReference('orgchartsearch');
        orgChartView = view.lookupReference('orgchartview');
        this.reInstanceOfViewFn(this, orgChartView, this.getViewModel(), orgChartView.getStore());
        employeeCombo.reset();
    },
    /**
     * The function onOrgEmpComboSearch fires before all queries are processed.
     * @param {Object} 'search' An object containing details about the query to be executed. 
     */
    onOrgEmpComboSearch: function(search){
        search.query = new RegExp(search.query, 'i');
		search.forceAll = true;
    }
});