Ext.define('DDO.view.setup.skills.SkillsWindowController',{
    extend:'Ext.app.ViewController',

    alias :'controller.skillswindowcontroller',

    onFormCancelClick:function(btn){
        var skillsWindow, form;
        skillsWindow = btn.up('window');
        form = skillsWindow.down('form');
        form.reset();
        skillsWindow.close();
    },
    onFormSaveClick:function(btn,e ,eOpts){
       var me = this,
       view = me.getView(),
       parentRef = view.parentViewRef,
       skillsgrid = parentRef.down('skillsgrid'),
       gridStore = skillsgrid.getStore('skillslist.ProfileSkillsComboStore'),
       skillsWindow = btn.up('window'),
       skillsForm = skillsWindow.down('form'),
       formRec = skillsForm.getValues(),
       skillName = Ext.String.trim(formRec.name),
       valueMatch = gridStore.findRecord('name', skillName, 0, false, false, true);
       if (skillsWindow.edit) {
        editRec = gridStore.findRecord('ddo_skills_id', formRec.ddo_skills_id);

        if (valueMatch && editRec && editRec.get('name').toLowerCase() == valueMatch.get('name').toLowerCase()) {
            valueMatch = null;
        }
    }
    if (!valueMatch) {
        if (skillsForm.isDirty()) {
            if (skillsWindow.edit) {
                skillsForm.updateRecord();
                params = {
                    ddo_skills_id: formRec.ddo_skills_id,
                    name: formRec.name
                };
             me.updateAjax(params,gridStore);
               } else {
                params = {
                    name: formRec.name
                };
                Ext.Ajax.request({
                    url: Api.URL.profileskillscombostore.CREATE,
                    method: 'POST',
                    params: params, 
                    success: function(resp, b) {
                         gridStore.reload();
                        Ext.getBody().unmask();
        
                    },
                    failure: function(resp, b) {
                        Ext.getBody().unmask();
        
                    }
                });
            }
            skillsForm.reset();
            skillsWindow.close();
        } else {
            skillsForm.reset();
            skillsWindow.close();
        }
    } else {
        Ext.Msg.alert('Warning', AlertMessages.existSkill);
    }
    },
    updateAjax: function(params,gridStore){
        Ext.Ajax.request({
            url: Api.URL.profileskillscombostore.UPDATE,
            method: 'PUT',
            params: params,
            success: function(resp, b) {
                 gridStore.reload();
                Ext.getBody().unmask();

            },
            failure: function(resp, b) {
                Ext.getBody().unmask();

            }
        });
    }
});