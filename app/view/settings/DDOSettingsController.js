Ext.define('DDO.view.settings.DDOSettingsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ddosettings',

    onAccessDetailsSelect: function(combo, record, eOpts) {
        combo.inputEl.dom.value = '';
        combo.collapse();
    },

    onAccessDetailsDeSelect: function(combo, record, index, eOpts) {
        var viewModel = this.getViewModel();
        var goalsettingstore = Ext.getStore('settings.GoalSettings');

        if (goalsettingstore && goalsettingstore.getCount() > 0) {
            var goalsettingsroles = goalsettingstore.getData().items[0].data.roleids;
            if (!Ext.isEmpty(goalsettingsroles)) {

                if ((goalsettingsroles.split(",").indexOf(record.data.ddo_role_id.toString()) != -1)) {
                    Utility.deletedTags.push(record.data.ddo_role_id);

                }
            }
        }

        if ((Utility.addedTags.indexOf(record.data.ddo_role_id) != -1)) {
            Utility.addedTags.splice(Utility.addedTags.indexOf(record.data.ddo_role_id), 1);

        }
        if (Utility.addedTags.length > 0 || Utility.deletedTags.length > 0) {
            viewModel.set('saveBtnView', false);
        } else {
            viewModel.set('saveBtnView', true);
        }

    },
    onAccessDetailsBeforeSelect: function(combo, record, index, eOpts) {
        var viewModel = this.getViewModel();

        var goalsettingstore = Ext.getStore('settings.GoalSettings');
        viewModel.set('saveBtnView', false);
        if (goalsettingstore && goalsettingstore.getCount() > 0) {
            var goalsettingsroles = goalsettingstore.getData().items[0].data.roleids;
            if (!Ext.isEmpty(goalsettingsroles)) {

                if ((goalsettingsroles.split(",").indexOf(record.data.ddo_role_id.toString()) == -1)) {
                    Utility.addedTags.push(record.data.ddo_role_id);

                } else {
                    if ((Utility.deletedTags.indexOf(record.data.ddo_role_id) != -1)) {
                        Utility.deletedTags.splice(Utility.deletedTags.indexOf(record.data.ddo_role_id), 1);

                    }
                }
            } else {
                Utility.addedTags.push(record.data.ddo_role_id);
            }
        }else{
            Utility.addedTags.push(record.data.ddo_role_id);
        }
        if (Utility.addedTags.length > 0 || Utility.deletedTags.length > 0) {
            viewModel.set('saveBtnView', false);
        } else {
            viewModel.set('saveBtnView', true);
        }

    },

    onResetGoalBtnClick: function(btn, e) {
        var goalSettingsView, goalTagField,
            viewModel;

        viewModel = this.getViewModel();

        goalSettingsView = btn.up('goalsettings');
        goalTagField = goalSettingsView.down('tagfield');

        goalTagField.setValue(null);
    },

    onSaveGoalBtnClick: function(btn, e) {
        var roleIds;

        var goalSettingsView, goalTagField,
            viewModel, roleIds,
            existance = true;

        viewModel = this.getViewModel();

        goalSettingsView = btn.up('goalsettings');
        goalTagField = goalSettingsView.down('tagfield');
        var goalsettingstore = Ext.getStore('settings.GoalSettings');

        roleIds = goalTagField.value;

        if (Ext.isEmpty(roleIds)) {
            existance = false;
            roleIds = null;
        } else {
            roleIds = Ext.encode(roleIds);
        }

        Ext.Ajax.request({
            url: Api.URL.goalsettings.READ,
            method: 'POST',
            params: {
                roleIds: roleIds,
                existance: existance
            },
            success: function(response) {
                Ext.Msg.alert('Status', 'Saved successfully.');
                Utility.deletedTags = [];
                Utility.addedTags = [];
                goalsettingstore.load();
                viewModel.set('saveBtnView', true);
            },
            failure: function(response) {
                Ext.Msg.alert('Status', 'Save Failed.');
            }
        });

    },

    afterTagFieldRender: function(tagfield) {

        var tagfieldStore = tagfield.getStore(),
            goalSettingStore = Ext.getStore('settings.GoalSettings');
        tagfieldStore.load({
            scope: this,
            callback: function(records) {
                Utility.goalSettingStoreFn(goalSettingStore, tagfield);
            }
        })
    }
});