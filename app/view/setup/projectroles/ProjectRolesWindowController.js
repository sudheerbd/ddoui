Ext.define('DDO.view.setup.projectroles.ProjectRolesWindowController',{

    extend:'Ext.app.ViewController',

    alias :'controller.projectroleswindowcontroller',

    onFormCancelClick:function(btn){
        var ProjectRolesWindow, form;
        ProjectRolesWindow = btn.up('window');
        form = ProjectRolesWindow.down('form');
        form.reset();
        ProjectRolesWindow.close();
    },

    onFormSaveClick:function(btn,e ,eOpts){
        // debugger;
        var me = this,
        view = me.getView(),
        parentRef = view.parentViewRef,
        projectRolesGrid = parentRef.down('projectrolesgrid'),
        gridStore = projectRolesGrid.getStore('projects.people.ProjectRole'),
        projectRolesWindow = btn.up('window'),
        projectRolesForm = projectRolesWindow.down('form'),
        formRec = projectRolesForm.getValues(),
        roleName = Ext.String.trim(formRec.name),
        valueMatch = gridStore.findRecord('name', roleName, 0, false, false, true);
        if (projectRolesWindow.edit) {
         editRec = gridStore.findRecord('ad_role_id', formRec.ad_role_id);
         if (valueMatch && editRec && editRec.get('name').toLowerCase() == valueMatch.get('name').toLowerCase()
         &&( editRec.get('description') || editRec.get('description') != formRec.description)) {
             valueMatch = null;
         }
     }
     if (!valueMatch) {
         if (projectRolesForm.isDirty()) {
             if (projectRolesWindow.edit) {
                projectRolesForm.updateRecord();
                 params = {
                     project_role_id: formRec.ad_role_id,
                     name: formRec.name,
                     description:formRec.description
                 };
              me.updateAjax(params,gridStore);
                } else {
                 params = {
                     name: formRec.name,
                     description:formRec.description
                 };
                 Ext.Ajax.request({
                     url: Api.URL.projects.ROLECREATE,
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
             projectRolesForm.reset();
             projectRolesWindow.close();
         } else {
            projectRolesForm.reset();
             projectRolesWindow.close();
         }
     } else {
         Ext.Msg.alert('Warning', AlertMessages.existProjectRole);
     }
     },
     updateAjax: function(params,gridStore){
         Ext.Ajax.request({
             url: Api.URL.projects.ROLEUPDATE,
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