/**
 * The file GroupsWindowViewController is the controller for the 'DDO.view.groups.GroupsWindow'.
 * @extends {Ext.app.ViewController}
 * @alias controller.groupswindowviewcontroller
 */
Ext.define('DDO.view.groups.GroupsWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.groupswindowviewcontroller',
    /** 
     * This is the handler for window outer tap.
     * It will close the window when click on outside of the window.
     * @param event - The click event.    
     * @param target - dom area.    
     */
    onWindowOutsideTap: function (event, target) {
        var view = this;
        Utility.onWindowOutterTap(event, target, view);
    },

    /**
     * The function onCheckBoxSelect will perform when the  'change' event of the filefield is fired in the  GRoupSearchForm.js file.
     * If we will checked the combo butten in GroupWindow then this event fired and it will select all the people in GroupWindow view. 
     * @param { Ext.form.field.Field} 'field'which is the form field.
     * @param {object} 'newValue' which takes the new value.
     * @param {object} 'oldVal' which takes the old value.
     * @param {object} 'eOpts' which is the object.
     */
    onCheckBoxSelect: function (field, newValue, oldValue, eOpts) {
        try {
            var ref = this.getReferences(),
                empgroupstore = ref.groupssearchview.getStore(),
                view = ref.groupssearchview;
            if (field.checked) {
                view.getSelectionModel().selectAll(true);
                this.getViewModel().set('addGroupBtnDisable', false);
                this.getViewModel().set('emloyeeSelectedCount', empgroupstore.getCount());
            } else {
                view.getSelectionModel().deselectAll();
                this.getViewModel().set('addGroupBtnDisable', true);
                this.getViewModel().set('emloyeeSelectedCount', 0);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.CHECKBOXSELECT, err);
        }
    },
    /**
     * The function onCloseIconClick will perform when the 'click' event  of the 'button' is fired in the GroupSearchForm.js.
     * This function will set the groupSearchFieldValue null and display all employees name.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param { Object}'e' click event.
     * @param {Object} 'eOpts'.
     */
    onCloseIconClick: function (btn, e, eOpts) {
        try {
            var viewModel = this.getViewModel(),
                empgroupstore = Ext.getStore('empgroupstore');
            viewModel.set('groupSearchFieldValue', null);
            if (empgroupstore) {
                empgroupstore.filter({
                    property: 'employee',
                    value: '',
                    anyMatch: true,
                    caseSensitive: false
                });
                this.getViewModel().set('emloyeeTotalCount', empgroupstore.getCount());
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.SEARCHFLDNULL, err);
        }
    },
    /**
     * The function onAddToGroupBtnClick will perform when the 'click' event  of the 'button' is fired in the GroupSearchForm.js.
     * This function will add the people to the group.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param { Object}'e' click event.
     * @param {Object} 'eOpts'.
     */
    onAddToGroupBtnClick: function (btn, e, eOpts) {
        try {
            var me = this,
                win = btn.up('window'),
                grpCombo = this.getView().parentViewRef.down('groupscombo'),
                grpView = this.getView().parentViewRef,
                groupArrExist = [],
                empArr = [],
                refObj = {};
            refObj.view = this.getView().down('groupssearchview');
            refObj.ref = this.getReferences();
            refObj.viewModel = grpView.getViewModel();
            refObj.selectedRecords = refObj.view.getSelection();
            refObj.label = grpCombo.down('label[reference = labelref]');
            refObj.grpName = grpCombo.down('combobox[reference = groupname]').rawValue;
            refObj.addToGroupView = grpView.lookupReference('addpeopletogroupcnt');
            refObj.empgroupstore = refObj.ref.groupssearchview.getStore();
            refObj.selectedRecords.forEach(function (record) {
                record.data.added = true;
                empArr.push(record.data.c_bpartner_id);
            });
            me.addNewPeoplefun(refObj, groupArrExist);
            me.loadPeoplestore(refObj, me, win, empArr);
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.ADDTOGRPBTN, err);
        }
    },
    /**
     * This function will not show selected people again in the list .
     * @param 'refObj' it is an objest.
     * @param 'empArr' which is an empty array.
     */
    addNewPeoplefun: function (refObj, groupArrExist) {
        refObj.addToGroupView.getStore().add(refObj.selectedRecords);
        refObj.addToGroupView.getStore().each(function (rec) {
            if (rec.data.added) {
                groupArrExist.push(rec);
                rec.data.added = false;
            }
        }, this);
        refObj.viewModel.set('nonEditSelections', true);
        refObj.addToGroupView.refresh();
        refObj.ref.groupssearchview.refresh();
        refObj.view.getStore().clearFilter(true);
        refObj.view.getStore().filterBy(function (rec) {
            var exist;
            for (var i = 0, len = groupArrExist.length; i < len; i++) {
                if (rec.data.c_bpartner_id === groupArrExist[i].data.c_bpartner_id) {
                    exist = true;
                }
            }
            if (!exist) {
                return true;
            }
        });
    },
    /**
     * This function will show selected people list .
     * @param 'refObj' it is an objest.
     * @param 'empArr' which is an empty array.
     * @param 'win' window referance.
     */
    loadPeoplestore: function (refObj, me, win, empArr) {
        if (refObj.viewModel.get('groupSearchFieldValue')) {
            refObj.view.getStore().filter({
                property: 'employee',
                value: refObj.viewModel.get('groupSearchFieldValue'),
                anyMatch: true,
                caseSensitive: false
            });
        }
        refObj.view.getStore().load();
        if (refObj.addToGroupView.getStore().getCount() === 0) {
            refObj.label.setData(refObj.grpName);
        } else {
            refObj.label.setData(refObj.grpName + ' (' + refObj.addToGroupView.getStore().getCount() + ')');
        }
        refObj.ref.groupsSearchForm.down('checkbox').reset();
        refObj.addToGroupView.refresh();
        refObj.viewModel.set('addGroupBtnDisable', true);
        refObj.viewModel.set('emloyeeTotalCount', refObj.empgroupstore.getCount());
        Utility.saveGroup(refObj.addToGroupView.getStore(), me, win, empArr);
    },


    /**
     * The function onSelectionModelChange will perform when the 'selectionchange' event is fired in the  GroupSearchView.js file.
     * It will make add to group butten enable if selected employee is more then zero.
     * @param {Ext.form.field.File} 'field' which is the form field.
     * @param e - The click event
     * @param eOpts -Object 
     */
    onSelectionModelChange: function (model, selected, eOpts) {
        try {
            var viewModel = this.getViewModel();
            viewModel.set('emloyeeSelectedCount', selected.length);
            if (selected.length > 0) {
                viewModel.set('addGroupBtnDisable', false);
            } else {
                viewModel.set('addGroupBtnDisable', true);
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.ADDTOGRP, err);
        }
    },
    /**
     * The function onKeyupGroupSearchBy will perform when the  'keyup' event of the textfield is fired in the  GroupSearchForm.js file.
     * It will search  people name.
     * @param {Ext.form.field.File} 'field' which is the form field.
     * @param e - The click event
     * @param eOpts -Object 
     */
    onKeyupGroupSearchBy: function (textfield, e, eOpts) {
        try {
            var store = Ext.getStore('empgroupstore'),
                grpView = grpView = this.getView().parentViewRef,
                searchString = textfield.getValue();
            if (store) {
                store.filter({
                    property: 'employee',
                    value: searchString,
                    anyMatch: true,
                    caseSensitive: false
                });
                grpView.getViewModel().set('emloyeeTotalCount', store.getCount());
            }
        } catch (err) {
            Utility.showToast(Messages.EMPLOYEEDASHBOARD.GROUPS.SEARCHBTN, err);
        }
    }
});