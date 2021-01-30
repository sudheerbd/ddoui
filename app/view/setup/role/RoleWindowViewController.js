Ext.define('DDO.view.setup.role.RoleWindowViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rolewindowviewcontroller',

    /**
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param {event} - The click event.    
     * @param {target} - dom area.    
     */
    onWindowOutsideTap: function(event, target) {
        try {
            var view = this;
            Utility.onWindowOutterTap(event, target, view);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.ROLE.WINDOWOUTSIDECLICK, err);
        }
    },
  
    /**
     * This is the handler for cancel button click.
     * It will close the window when click on this button and reset the form.
     * @param {btn} - The cancel button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Event object.    
     */
    onFormCancelClick: function(btn, e, eOpts) {
        try {
            var roleWindow, form;
            roleWindow = btn.up('window');
            form = roleWindow.down('form');
            form.reset();
            roleWindow.close();
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.ROLE.CANCELCLICK, err);
        }
    },
    /**
     * The function onFormSaveClickFunction is responsible to check whether which functionality of save buttton to perform.
     * @param {Ext.button,Button} 'btn' the save button. 
     * @param {Event} 'e' the click event. 
     * @param {object} 'eOpts' the events object passed. 
     */
    onFormSaveClickFunction:function(btn,e,eOpts){
        var windowView = this.getView(),
           checkBox = windowView.down('[reference = rolecheckbox]').getValue();
           if(checkBox==true){
            this.onFormSaveClick(btn, e, eOpts);
           
            // this.onApplyClick(btn);
        // this.onFormSaveClick(btn, e, eOpts);
        
           }else{
            this.onFormSaveClick(btn, e, eOpts);
           }
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

    /**
     * This is the handler for save button click.
     * It will save the data to the grid which is entered in form.
     * It add the record to the store,if it is modified record then it will update the record.
     * After that it close the window and reset the form.
     * @param {btn} - The Save button reference.
     * @param {e} - The click event.    
     * @param {eOpts} - Event object.    
     */
    onFormSaveClick: function(btn, e, eOpts) {
        try {
            
            var store, roleWindow, form,rec,
                recObj, karmaUrl, karmaGridStore,
                name, valueMatch, me = this,
                view = me.getView(),
                parentRef = view.parentViewRef,
                roleGrid = parentRef.down('rolegrid');
            store = roleGrid.getStore('setup.role.RoleStore');
            roleWindow = me.getView();
            form = roleWindow.down('form');
            rec = form.getValues();
            name = Ext.String.trim(rec.name);
            valueMatch = this.identifyModeProcess(roleWindow, store, rec, name);
            name = rec.name.replace(/ +(?= )/g,'');
            if (!valueMatch) {
                if (form.isDirty()) {
                    this.doModeProcess(roleWindow, form, rec, store);
                    // form.reset();
                    roleWindow.close();
                } else {
                    // form.reset();
                    roleWindow.close();
                }
            } else {
                Ext.Msg.alert('Warning', AlertMessages.existRole);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEESETUP.ROLE.SAVECLICK, err);
        }
    },
    
    /**
     * It will either update or create record based on current mode(add, edit).
     * @param {roleWindow} - role add/edit window references.    
     * @param {form} - roles add/edit form references.
     * @param {rec} - selected rec from grid.
     * @param {store} - roles store references.
     */
    doModeProcess: function(roleWindow, form, rec, store){
    
        if (roleWindow.edit) {
        
            form.updateRecord();
            this.callUpdateServices(rec, store);
        } else {
         
            var me =this;
            var windowVm = me.getViewModel(),
            role_id; 
            store.add(form.getValues());
            store.sync({
                callback: function() {
                    store.load({
                        callback:function(req,resp){
                            //  debugger;
                            req.find(function(element){
                                // debugger;
                                
                              if((element.data.name).match(rec.name)){
                                //   debugger;
                                  console.log(element);
                                    role_id = element.data.ddo_role_id;
                                    // if(windowVm.data.ddo_role_id){
                                      windowVm.set('ddo_role_id',role_id);
                                      me.onApplyClick();
                                    // } 
                              }
                              
                                
                            //   debugger;
                           
                             
                            });
                         
                        },
                        failure:function(req,resp){
                        //    debugger;
                        }
                    });
                    
                }
            });
        }
    },

    /**
     * This method is resonsible for indentify the current mode by finding record from store.
     * @param {roleWindow} - role add/edit window references    
     * @param {store} - roles store references.
     * @param {rec} - selected rec from grid.   
     * @param {name} - name of roles rec.
     * @returns {valueMatch} - boolean, represents 
     */
    identifyModeProcess: function(roleWindow, store, rec, name){
        var valueMatch;
        if (roleWindow.edit) {
            valueMatch = store.findRecord('name', name, 0, false, false, true);
            editRec = store.findRecord('ddo_role_id', rec.ddo_role_id);
            if (valueMatch && editRec && editRec.get('name').toLowerCase() == valueMatch.get('name').toLowerCase()) {
                valueMatch = null;
            }
        } else {
            store.each(function(rec) {
                if(rec.data.name.toLowerCase() == name.toLowerCase()){
                    valueMatch = true;
                }
            })
        }
        return valueMatch;
    },

    /**
     * This will call services for update roles record. 
     * @param {rec} - selected rec from grid.    
     * @param {store} - roles store references.    
     */
    callUpdateServices: function(rec, store){
        // debugger;
       
        // debugger;
        var params = {
            ddo_role_id: rec.ddo_role_id,
            name: rec.name,
            description: rec.description
        };
        Ext.Ajax.request({
            url: Api.URL.role.UPDATE,
            method: 'PUT',
            params: params,
            success: function(resp, b) {
                store.reload();
                Ext.getBody().unmask();
            },
            failure: function(resp, b) {
                store.reload();
                Ext.getBody().unmask();
            }
        });
    },
    /**
     * The function OnCheckChange is responsible to hide and enable the form fields in the window.
     * @param {Ext.field.Checkbox} 'field' the checkbox field.
     * @param {Boolean} 'rowIndex'
     * @param {Boolean} 'checked' checks whether the field is checked or not.
     * @param {object} 'eOpts' the events object selected.
     */
    OnCheckChange:function( field, rowIdx, checked, eOpts){
        var windowView = this.getView(),
            girdView = windowView.down('[reference = gridhiddenview]');
            comboView = windowView.down('[reference = hiddencombo]');
        if(checked==false){
            girdView .show();
            comboView.show();
        }
        else{
           girdView.hide();
           comboView.hide();
        }
    },
   /**
	 * The function onApplyClick will initate the process of updating role access for selected role.
	 * @param {Ext.button.Button} 'btn' when button is being clicked.
	 */
    onApplyClick:function(){
      var view = this.getView(),
         selectedRoleId = view.down('[reference= hiddencombo]').getValue(),
         roleGrid = view.down(' rolewindowgrid'),
         viewsData = roleGrid.getStore().data.items,
         viewAccessData = [],
         roleWindow = this.getView(),
         form = roleWindow.down('form'),
         rec = form.getValues(),
        // isDirtyRec = false;
          vm = this.getViewModel(),
         createdRoleId = vm.data.ddo_role_id;
         Ext.each(viewsData, function(obj) {
         
            
			//  if (obj.dirty) {
				// isDirtyRec = true;
				// readCheck = obj.get('isRead');
				// if (!readCheck) {
				// 	obj.data.isWrite = false;
				// } else {
				// 	obj.data.isWrite = true;
                // }
                // readcheck = obj.get('isRead');
                // writecheck = obj.get('isWrite');
                // if(readcheck==false&&writecheck == true){
                //     writecheck==false;
                //     return writecheck;
                // }
                //  if(readcheck==true){
                //     viewAccessData.push(obj.data);
                //     return viewAccessData;
                // }
                // if(readcheck){
                //     viewAccessData.push(obj.data);
                //     return viewAccessData;
                // }
                // if(!readcheck==false)
                // if(readcheck==true){
                //     viewAccessData.push(obj.data);
                //     return viewAccessData;
                // }
                // viewAccessData.push(obj.data);
                // if (obj.dirty) {
                 //   isDirtyRec = true;
             
                    readCheck = obj.get('isRead');
                   if(!readCheck==false){
                    viewAccessData.push(obj.data);
                    return viewAccessData;
                 }
                   // viewAccessData.push(obj.data);
                    obj.commit();
                // }
				//obj.commit();
			//  }
		});
        //  if (isDirtyRec) {
            this.doFireAjaxProcess(createdRoleId, viewAccessData);
        // } else {
        //     Utility.toastReuseFn('t', Messages.COPYROLE.ROLEMODIFICATION);
        // }
    },
    // /**
	//  * The function getReadCheckData is responsiable for checking any modified access record.
	//  * @param {Array} 'viewsData' Contains all record for roles access.
	//  * @param {Array} 'viewAccessData' is empty array.
	//  */
    // getReadCheckData: function (viewsData, viewAccessData) {
	// 	var readCheck,
	// 		isDirtyRec = false;
	// 	Ext.each(viewsData, function (obj) {
	// 		if (obj.dirty) {
	// 			isDirtyRec = true;
	// 			readCheck = obj.get('isRead');
	// 			if (!readCheck) {
	// 				obj.data.isWrite = false;
	// 			} else {
	// 				obj.data.isWrite = true;
	// 			}
	// 			viewAccessData.push(obj.data);
	// 			obj.commit();
	// 		}
	// 	});
	// 	return isDirtyRec;
    // },
    /**
	 * The function doFireAjaxProcess is responsiable for checking any modified access record.
	 * @param {Array} 'selectedRoleId' contains id of selected role.
	 * @param {Array} 'viewAccessData' contains modified role record.
	 */
    doFireAjaxProcess: function (createdRoleId, viewAccessData) {
		try {
			var config = {
				url: Api.URL.role.ADDORUPDATE,
                method: 'POST',
				params: {
					roleId: parseInt(createdRoleId),
					access: JSON.stringify(viewAccessData)
				}
			}
			var successCallback = function (data) {
				Utility.toastReuseFn('t', Messages.COPYROLE.ROLEUPDATE);
			}
			var failureCallback = function () {
				Ext.Msg.alert('Status', Messages.COPYROLE.ROLEACCESS);
			}
			var callback = function () {}
			Utility.fireAjax(config, successCallback, failureCallback, callback);
		} catch (err) {
			Utility.showToast(Messages.ROLE.TOAST.DOSERVICECALL, err);
		}
    },
    /**
	 * The function onRoleComboChange is responsiable for checking any modified access record.
	 * @param {Object} 'combo' represents Ext.form.field.Field.
	 * @param {Number} 'newValue' it can be Object or Number. it's depend on latest selected value.
	 * @param {Object} 'oldValue' it can be Object or Number. it's depend on previous selected value
	 * @param {Object} 'eOpts' The options object passed to Ext.util.Observable.addListener.
	 */
    onRoleComboChange: function (combo, newValue, oldValue, eOpts) {
        var view = this.getView(),
            viewModel = view.getViewModel(),
            roleGrid = view.down(' rolewindowgrid'),
            data = [];
        if (viewModel.data.applyEnable) {
            viewModel.set('applyEnable', false);
        } else if (newValue == null) {
            viewModel.set('applyEnable', true);
        }
        var girdStore = roleGrid.getStore();
        girdStore.each(function (rec) {
            if (rec.data.isWrite) {
                rec.data.isWrite = false;
            }
            if (rec.data.isRead) {
                rec.data.isRead = false;
            }
            data.push(rec.data);
        });
        if (newValue) {
            var rolesConfig = {
                url: Api.URL.role.ROLEVIEWACCESS + "/" + newValue
            }
            var roleSuccessCallback = function (data1, dataP, roleGrid) {
                if (Ext.isEmpty(data1)) {
                    roleGrid.getStore().loadData(data, false);
                }
                if (!Ext.isEmpty(data) && !Ext.isEmpty(data1)) {
                    var rolesAccess = data1.access;
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < rolesAccess.length; j++) {
                            if (data[i].viewId == rolesAccess[j].viewId) {
                                data[i].isWrite = rolesAccess[j].isWrite || false;
                                data[i].isRead = rolesAccess[j].isRead || false;
                            }
                        }
                    }
                    roleGrid.getStore().loadData(data, false);
                }
            }
            var roleFailureCallback = function (data1) { }
            var roleCallback = function () { }
            Utility.fireAjax(rolesConfig, roleSuccessCallback, roleFailureCallback, roleCallback, roleGrid);
        }
    }
});
