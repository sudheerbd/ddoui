/**
 * The file GroupsViewController is the controller for the 'DDO.view.groups.GroupsView'.
 * @extends {Ext.app.ViewController}
 * @alias controller.groupsviewcontroller
 */
Ext.define('DDO.view.groups.GroupsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.groupsviewcontroller',
    /**
     * The function onAddBtnClick will perform when the 'click' event of the 'button' is fired in the groupCombo.js.
     * This function will create the new project and is if the project name is already exist then it will show warning.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param { Object}'e' click event.
     * @param {Object} 'eOpts'.
     */
    onAddBtnClick: function (btn, e, eOpts) {
        try {
            var me = this,
                grpStoreRec, i, exist, items,
                viewModel = me.getViewModel(),
                ref = me.getReferences();
            grpWindow = Ext.ComponentQuery.query('groupswindow')[0] || Ext.create('DDO.view.groups.GroupsWindow'),
                referanceObj = {};
            referanceObj.exist = exist;
            referanceObj.groupSearchView = grpWindow.lookupReference('groupsearchview');
            referanceObj.groupsSearchForm = grpWindow.lookupReference('groupsSearchForm');
            referanceObj.grpName = viewModel.get('groupName');
            referanceObj.addpeopleBTn = ref.addPeopleBtn;
            referanceObj.grpStore = Ext.getStore('groups.GroupsComboStore');
            // referanceObj.grpStore = this.getView().down('groupscombo').down('[reference = groupname]').getStore();
            referanceObj.grpCombo = ref.groupname;
            referanceObj.textField = ref.textfd;
            referanceObj.selecEmpStore = Ext.getStore('groups.SelectedEmpStore');
            referanceObj.label = ref.labelref;
            referanceObj.userBtn = ref.usersref;
            items = referanceObj.grpStore.data.items;
            for (i = 0; i < items.length; i++) {
                if (items[i].data.group_name.toLowerCase() === referanceObj.textField.value.toLowerCase()) {
                    Ext.Msg.alert('Warning', Messages.EMPLOYEEDASHBOARD.GROUPS.EXISTGROUP);
                    exist = true;
                    referanceObj.textField.setValue("");
                    return exist;
                }
            }
            me.createNewProject(referanceObj, viewModel, me);
            me.buttonSettingFun(referanceObj, viewModel, ref);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.ADDPROJECT, err);
        }
    },
    /**
     * The function createNewProject will create new project.
     *  @param {Object} 'referanceObj'- which is the object.
     *  @param {Ext.app.ViewModel} 'viewModel'-it is containg the viewModel Of GroupView.
     */
    createNewProject: function (referanceObj, viewModel, me) {
        if (!Ext.isEmpty(referanceObj.textField.value) && (!referanceObj.exist)) {
            referanceObj.grpStore.add({
                group_name: referanceObj.grpName
            });
            referanceObj.grpStore.sync({
                scope: me,
                callback: function (batch, options) {
                    referanceObj.grpStore.load({
                        scope: me,
                        callback: function (records, operations, eOPts) {
                            var textfieldVal = me.getReferences().textfd.value;
                            var id;
                            for (var l = 0; l < records.length; l++) {
                                if (records[l].data.group_name == textfieldVal) {
                                    id = records[l].data.group_id;
                                }
                            }
                            me.getViewModel().set('comboGroupName', id);
                            me.getReferences().textfd.setValue("");
                        }
                    });
                }
            });
            if (referanceObj.userBtn) {
                referanceObj.userBtn.removeCls('userIcon-cls');
            }
            me.NewProjecVMset(referanceObj, viewModel, me);
        }
    },
    /**
     * The function NewProjecVMset will create new project.
     *  @param {Object} 'referanceObj'- which is the object.
     *  @param {Ext.app.ViewModel} 'viewModel'-it is containg the viewModel Of GroupView.
     */
    NewProjecVMset: function (referanceObj, viewModel, me) {
        referanceObj.userBtn.setData(referanceObj.grpName[0].toUpperCase());
        referanceObj.label.setData(referanceObj.grpName);
        referanceObj.selecEmpStore.removeAll();
        viewModel.set('addPeopleVisibility', false);
        viewModel.set('searchForm', true);
        referanceObj.grpCombo.setDisabled(false);
        referanceObj.userBtn.setDisabled(false);
        viewModel.set('addPeopleLabel', true);
        viewModel.set('editOrSaveButtonText', 'Edit');
        viewModel.set('empListVisibility', true);
        viewModel.set('editOrSaveBtnDisable', true);
    },
    /**
     * The function buttonSettingFun will set the button through viewModel.
     *  @param {Object} 'referanceObj'- which is the object.
     *  @param {Ext.app.ViewModel} 'viewModel'-it is containg the viewModel Of GroupView.
     */
    buttonSettingFun: function (referanceObj, viewModel, ref) {
        if (viewModel.get('disableFormFields') || viewModel.get('nonEditSelections')) {
            viewModel.set('disableFormFields', true);
            viewModel.set('nonEditSelections', true);
            viewModel.set('editOrSaveButtonText', 'Edit');
            viewModel.set('editOrSaveBtnDisable', true);
            referanceObj.groupsSearchForm.down('checkbox').reset();
            ref.addpeopletogroupcnt.refresh();
        }
    },
    /**
     * The function onGroupComboItemSelect will perform when the 'select' event of the comboBox is fired in the GroupCombo View.
     * This function is filtering the store and showing the data related to selected item in combo.
     * The event will fire when the value of the field is selecte.
     * @param { Ext.form.field.Field} 'combo' which is the form field.
     * @param { String}'record' which is the selected record.
     * @param {Object} 'eOpts'.
     */
    onGroupComboItemSelect: function (combo, record, eOpts) {
        try {
            var ref = this.getReferences(),
                label = this.lookupReference('labelref'),
                userBtn = this.lookupReference('usersref'),
                viewModel = this.getViewModel(),
                grpWindow = Ext.ComponentQuery.query('groupswindow')[0] ||
                Ext.create('DDO.view.groups.GroupsWindow'),
                empgroupstore = grpWindow.lookupReference('groupssearchview').getStore(),
                view = ref.addpeopletogroupcnt,
                store = Ext.getStore('groups.SelectedEmpStore'),
                grpName = record.data.group_name,
                groupId = record.data.group_id,
                addpeopleBTn = ref.addPeopleBtn;
            userBtn.setData(grpName[0].toUpperCase());
            if (userBtn) {
                userBtn.removeCls('userIcon-cls');
            }
            this.setingValueThroughVM(viewModel);
            store.getProxy().extraParams = {
                'group_id': record.data.group_id
            };
            this.storeLoadFunction(store, empgroupstore, view, label, grpName);
            view.getStore().removeAll();
            if (view.getStore().getCount() === 0) {
                label.setData(grpName);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.ITEMSELECT, err);
        }
    },
    /**
     * The function setingValueThroughVM will set the value through viewModel.
     * @param { Ext.app.ViewModel }'viewModel' which is containing the viewModel.
     */
    setingValueThroughVM: function (viewModel) {
        viewModel.set('addPeopleVisibility', false);
        viewModel.set('searchForm', true);
        viewModel.set('empListVisibility', true);
        viewModel.set('addPeopleLabel', true);
        viewModel.set('editOrSaveButtonText', 'Edit');
        viewModel.set('editOrSaveBtnDisable', true);
        viewModel.set('nonEditSelections', true);
        viewModel.set('nonEditEmpSelect', false);
    },
    /**
     * The function storeLoadFunction will load the store according to the select item  in the comboBox in the GroupCombo View.
     * @param { String}'store' which is containing SelectedEmpStore.
     */
    storeLoadFunction: function (store, empgroupstore, view, label, grpName) {
        try {
            store.load({
                scope: this,
                callback: function (records, operation, success) {
                    if (records) {
                        empgroupstore.filterBy(function (rec) {
                            var exist;
                            for (var i = 0, len = records.length; i < len; i++) {
                                if (rec.data.c_bpartner_id === records[i].data.c_bpartner_id) {
                                    exist = true;
                                }
                            }
                            if (exist) {
                                return false;
                            } else {
                                return true;
                            }
                        });
                        if (view.getStore().getCount() === 0) {
                            label.setData(grpName);
                        } else {
                            label.setData(grpName + ' (' + store.getCount() + ')');
                        }
                    } else {
                        empgroupstore.clearFilter(true);
                        label.setData(grpName);
                    }
                }
            });
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.STORELOAD, err);
        }
    },
    /**
     * The function onGroupTextEnterClick will perform when the 'keydown' event  is fired in the GroupCombo View.
     * This function is call the onAddBtnClick function.
     * @param { Ext.form.field.Field} 'fd' which is the form field.
     * @param { Object}'e' click event.
     * @param {Object} 'eOpts'.
     */
    onGroupTextEnterClick: function (fd, e, eOpts) {
        try {
            if (e.keyCode === 13 || e.getCharCode() === 13) {
                this.onAddBtnClick(fd, e, eOpts);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.GROUPNAME, err);
        }
    },
    /**
     * The function groupedUnlinkRec will perform when the 'itemclick' event  is fired in the selectedgroupsView.
     * This function will delete the employees those who are selected in a group.
     * @param {Ext.view.view} "view" - which is containing the view.
     * @param { String} 'record' which is a selected record.
     * @param { Number} 'index' which is a selected record index number.
     * @param { Object}'e' click event.
     * @param {Object} 'eOpts'.
     */
    groupedUnlinkRec: function (view, record, item, index, e, eOpts) {
        try {
            var me = this,
                ref = this.getReferences(),
                viewModel = this.getViewModel(),
                groupArrExist = [],
                groupLoading,
                isDelete = true,
                referenObj = {};
            referenObj.label = ref.labelref;
            referenObj.grpName = ref.groupname.rawValue;
            var params = {
                ddo_group_id: record.data.ddo_group_id,
                member_id: record.data.c_bpartner_id
            };
            view.getStore().remove(record);
            view.refresh();
            groupLoading = new Ext.LoadMask({
                msg: '',
                target: view
            });
            groupLoading.show();
            this.deleteAjaxRequest(params, referenObj, view, groupLoading);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.DELETERECORD, err);
        }
    },
    /**
     * The function deleteAjaxRequest will make a Ajax call to delete the group people in selectedgroupsView.
     * @param {Ext.view.View} 'view' whict is containing the main view.
     * @param {Object} 'params' require parameters for ajax call.
     * @param {Object} 'referenObj'.
     */
    deleteAjaxRequest: function (params, referenObj, view, groupLoading) {
        if (view.getStore().getCount() == 0) {
            referenObj.label.setData(referenObj.grpName);
        } else {
            referenObj.label.setData(referenObj.grpName + ' (' + view.getStore().getCount() + ')');
        }
        var me = this;
        Ext.Ajax.request({
            url: '/groupmembers',
            method: 'DELETE',
            scope: me,
            params: params,
            success: function (response, opts) {
                groupLoading.hide();
                Utility.toastReuseFn('t', AlertMessages.empDeletedSuccess);
            },
            failure: function () {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    /**
     * The function onClickAddPeopleFn will perform when the 'handler' event of the 'button' is fired in the GroupCombo.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param { Object}'e' click event.
     * @param {Object} 'eOpts'.
     */
    onClickAddPeopleFn: function (btn, e, eOpts) {
        try {
            grpWindow = Ext.ComponentQuery.query('groupswindow')[0] || Ext.create('DDO.view.groups.GroupsWindow');
            var ref = grpWindow.getReferences(),
                grpViewRefs = this.getReferences(),
                viewModel = this.getViewModel(),
                grpWinViewModel = grpWindow.getViewModel(),
                selectEmpStore = Ext.getStore('groups.SelectedEmpStore'),
                selectEmpData = selectEmpStore.getData().items,
                empgroupstore = ref.groupssearchview.getStore();
            viewModel.set('nonEditSelections', true);
            viewModel.set('searchForm', false);
            viewModel.set('addPeopleLabel', false);
            viewModel.set('empListVisibility', false);
            viewModel.set('nonEditEmpSelect', false);
            grpWinViewModel.set('emloyeeSelectedCount', 0);
            ref.groupssearchview.refresh();
            ref.groupsSearchForm.down('checkbox').reset();
            ref.groupsSearchForm.down('textfield[reference=searchname]').setValue('');
            if (viewModel.get('disableFormFields') || viewModel.get('nonEditSelections')) {
                viewModel.set('disableFormFields', false);
                viewModel.set('nonEditSelections', true);
                ref.groupsSearchForm.down('checkbox').reset();
                grpViewRefs.addpeopletogroupcnt.refresh();
                ref.groupssearchview.refresh();
            }
            this.StoreLoadFunction(empgroupstore, grpWindow, grpWinViewModel, selectEmpStore, selectEmpData);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.ADDPEOPLE, err);
        }
    },
    /**
     * The function  StoreLoadFunction will load the employee group store.
     * @param 'grpWindow' -which is a group window referamce.
     * @param 'empgroupstore'- which is a store.
     */
    StoreLoadFunction: function (empgroupstore, grpWindow, grpWinViewModel, selectEmpStore, selectEmpData) {
        empgroupstore.load({
            scope: this,
            callback: function (records, operation, success) {
                if (records) {
                    grpWinViewModel.set('emloyeeTotalCount', records.length - selectEmpStore.getCount());
                }
                empgroupstore.clearFilter(true);
                empgroupstore.filterBy(function (rec) {
                    var add = true;
                    for (var i in selectEmpData) {
                        if (parseInt(selectEmpData[i].data.c_bpartner_id) === parseInt(rec.data.c_bpartner_id)) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        return add;
                    }
                });
            }
        });
        grpWindow.show();
    },
    /**
     * The function onGroupdeleteBtnClick will perform when the 'handler' of the 'button' is fired in the groupCombo.js.
     * This function will delete the  group .
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param { Object}'e' click event.
     * @param {Object} 'eOpts'.
     */
    onGroupdeleteBtnClick: function (btn, e, eOpts) {
        try {
            Ext.Msg.confirm("Confirmation", Messages.EMPLOYEEDASHBOARD.GROUPS.DELETE, function (btnText) {
                if (btnText === "no") { //do nothing
                } else if (btnText === "yes") {
                    var combo = btn.up('groupscombo').down('container').down('combobox'),
                        comboStore, comboSelecId;
                    comboStore = combo.getStore();
                    comboSelecId = combo.valueCollection.items[0].get('group_id');
                    this.deleteGroupAjaxCall(combo, comboStore, comboSelecId);
                    var refObj = {};
                    var ref = this.getReferences(),
                        empGroupStore = Ext.getStore('groups.EmpGroupStore'),
                        addpeopleBTn = ref.addPeopleBtn;
                    refObj.view = this.lookupReference('addpeopletogroupcnt');
                    refObj.grpCombo = Ext.ComponentQuery.query('combobox')[0];
                    refObj.userBtn = ref.usersref;
                    refObj.label = ref.labelref;
                    refObj.store = Ext.getStore('groups.SelectedEmpStore');
                    refObj.grpName = ref.groupname.rawValue;
                    this.goupStoreCount(refObj);
                }
            }, this);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.GROUPDELETE, err);
        }
    },
    /**
     * this function will remove the deleted group name .
     * @param { Object} 'refObj' this object is containing the parameters like view,userBtn ,grpCombo,etc.
     */
    goupStoreCount: function (refObj) {
        refObj.view.getStore().removeAll();
        refObj.label.setData('');
        refObj.grpCombo.setValue('');
        refObj.grpCombo.getStore().clearFilter(true);
        if (refObj.store.getCount() === 0) {
            refObj.label.setData(refObj.grpName);
        } else {
            refObj.label.setData(refObj.grpName + ' (' + refObj.store.getCount() + ')');
        }
        refObj.userBtn.setData('');
        this.getViewModel().set('searchForm', true);
        this.getViewModel().set('addPeopleLabel', true);
        this.getViewModel().set('empListVisibility', true);
    },
    /**
     * this function is making an ajax call for deleteing the group.
     * @param'comboSelecId' which is containing the group_id.
     * @param'comboStore' which is containing the comboStore.
     * @param { Ext.form.field.Field} 'combo'which is the form field.
     */
    deleteGroupAjaxCall: function (combo, comboStore, comboSelecId) {
        Ext.Ajax.request({
            url: '/groups',
            scope: this,
            method: 'delete',
            params: {
                group_id: comboSelecId
            },
            success: function (response, opts) {
                var refObject = {};
                var ref = this.getReferences(),
                    addpeopleBTn = ref.addPeopleBtn;
                refObject.viewModel = this.getViewModel();
                refObject.label = ref.labelref;
                refObject.grpName = ref.groupname.rawValue;
                refObject.store = Ext.getStore('groups.SelectedEmpStore');
                refObject.userBtn = ref.usersref;
                refObject.res = Ext.decode(response.responseText);
                this.loadGroupStore(combo, comboStore, refObject);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    /**
     * this function is checking that group is deleted or not.
     * @param'comboSelecId' which is containing the require parameters.
     * @param'comboStore' which is containing the comboStore.
     * @param { Ext.form.field.Field} 'combo'which is the form field.
     */
    loadGroupStore: function (combo, comboStore, refObject) {
        comboStore.load({
            scope: this,
            callback: function (records, operation, success) {
                if (combo.store.getCount() === 0) {
                    combo.setDisabled(true);
                    this.getReferences().usersref.setDisabled(true);
                }
            }
        });
        combo.setValue(null);
        if (refObject.userBtn) {
            refObject.userBtn.addCls('userIcon-cls');
        }
        refObject.viewModel.set('addPeopleVisibility', true);
        refObject.viewModel.set('nonEditSelections', false);
        refObject.viewModel.set('disableFormFields', true);
        if (refObject.store.getCount() === 0) {
            refObject.label.setData(refObject.grpName);
        } else {
            refObject.label.setData(refObject.grpName + ' (' + refObject.store.getCount() + ')');
        }
        this.getView().lookupReference('addpeopletogroupcnt').refresh();

        if (refObject.res.message === "Group Cann't be deleted as it is Tagged with Post!!") {
            Ext.Msg.alert('Status', Messages.EMPLOYEEDASHBOARD.GROUPS.NOTDELETE);
        } else {
            Ext.Msg.alert('Status', Messages.EMPLOYEEDASHBOARD.GROUPS.DELETESUCCESS);
        }
    },

    /**
     * The function groupOnRender will perform after the rendering of GroupsView.js file.
     * This function is filtering the store and showing the data related to selected item in combo.
     * The event will fire when the value of the field is selecte.
     * @param { Ext.form.field.Field} 'combo' which is the form field.
     * @param {Object} - eOpts.
     */
    groupOnRender: function (combo, eOpts) {

        try {
            var me = this,
                ref = me.getReferences(),
                grpCombo = ref.groupname;
            Ext.getBody().mask('');
            // debugger;
            // var groupStore = this.getViewModel().getStore('groupcombostore');
            // groupStore.load({
            Ext.getStore('groups.GroupsComboStore').load({
                scope: this,
                callback: function (records, operation, success) {
                    Ext.getBody().unmask();
                    var groupComboRecord = grpCombo.store.getAt(0),
                        groupComboName;
                    if (grpCombo.store.getCount() === 0) {
                        grpCombo.setDisabled(true);
                        this.getReferences().usersref.setDisabled(true);
                    }
                    if (groupComboRecord != null) {
                        groupComboName = groupComboRecord.data.group_id;
                        grpCombo.setValue(groupComboName);

                        Utility.groupInitialLoad(grpCombo, groupComboRecord, eOpts);
                    }
                }
            });
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.SHOWPEOPLE, err);
        }
    }
});