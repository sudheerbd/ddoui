/**
 * The file AddProjectWindowController is the View Controller for the 'DDO.view.projects.AddProjectWindow'.
 * @extends  {Ext.app.ViewController}.
 * @alias controller.addprojectwindowcontroller
 */
Ext.define('DDO.view.projects.AddProjectWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addprojectwindowcontroller',
    /**
     * The function onProjectImgChange is responsiblr to upload the image of the project.
     * @param { Ext.form.field.File} 'filefield' the file field. 
     * @param {String} 'value' The file value returned by the underlying file input field 
     * @param {object} 'eOpts' The options object passed to Ext.util.Observable.addListener. 
     */
    onProjectImgChange: function(filefield, value, eOpts) {
        try{
        var me = this;
        // AmazonS3.uploadFile(field,accViewModel);
        var dom = Ext.getDom(filefield.fileInputEl);
        var file = dom.files[0];
        var fileType = dom.files[0].type;
        var fileName = dom.files[0].name;
        var projectViewModel = me.getViewModel();
        var reader = new FileReader();
        reader.onload = function (e) {
            projectViewModel.set('appImg', e.target.result);
            projectViewModel.set('filefield', filefield);
        }
        reader.readAsDataURL(dom.files[0]);
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.ADDPROJCTWINDOW.IMAGEUPLOAD, err);
    }
    },
    /**
     * The function onFormCancelClick is responsible to close the window by clicking on the cancel button.
     * @param {Ext.button.Button} 'btn' the cancel button. 
     * @param {Event} 'e' the click event. 
     * @param {object} 'eOpts' the options object passed. 
     */
    onFormCancelClick: function(btn, e, eOpts) {
        try{
        var projectWindow, form;
        projectWindow = this.getView();
        projectWindow.getViewModel().set('projectLogoUrl', "");
        form = projectWindow.down('form');
        form.reset();
        projectWindow.down('[name = salesRepresentativeId]').setHidden(false);
        projectWindow.setTitle('<span class="nom-name-cls">Add Project</span>');
        projectWindow.editMode = false;
        projectWindow.down('[reference = imageUploadForm]').setHidden(false);
        projectWindow.projectIDValue = null;
        projectWindow.close();
        }catch(err){
            Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.ADDPROJCTWINDOW.CANCELCLICK, err);
        }
    },
    /**
     * The function onFormSaveClick is responsible to do the ajax calls by clicking on the save button.
     * @param {Ext.button.Button} 'btn' the cancel button. 
     * @param {Event} 'e' the click event. 
     * @param {object} 'eOpts' the options object passed. 
     */
    onFormSaveClick: function(btn, e, eOpts) {
        try{
        var form = btn.up('form'),
            projectWindow = this.getView(),
            me = this,
            imgurl = projectWindow.getViewModel().get('projectLogoUrl'),
            filefield = projectWindow.getViewModel().get('filefield'),
            projectName = form.getValues().projectName,
            formValues = form.getValues(),
            store = Ext.getStore('projects.ProjectDashboardStore'),
            rec = store.findRecord("name", projectName),
            projectNameField = form.down('[name=projectName]'),
            submitValues;
        me.updateAjaxRequest(me, submitValues, formValues, form, projectWindow);
        submitValues = formValues;
        submitValues.status = Constants.STATUS.PRESALE;
        if (filefield) {
            AmazonS3.uploadFile(filefield).then(function (img) {
                submitValues.imgurl = img;
                insertdata(rec);
            })
        } else {
            insertdata(rec);
        }
        function insertdata(rec) {
            if (rec) {
                projectNameField.reset();
                Ext.Msg.alert('Failure', "Project Already Exists with the same name");
            } else {
                me.getAjaxRequest(me, submitValues, form, projectWindow);
            }
        }
    }catch(err){
        Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.ADDPROJCTWINDOW.SAVECLICK, err);
    }
    },
    /**
     * The function updateAjaxRequest is responsible to perform the ajax request to update the values by clicking on the save button.
     * @param {scope} 'me' the scope of this controller file. 
     * @param {undefined} 'submitValues' the declared variable. 
     * @param {object} 'formValues' the entered form values. 
     * @param {form} 'form' which is the window form. 
     * @param {window} 'projectWindow' which holds the window. 
     */
    updateAjaxRequest:function(me,submitValues,formValues,form,projectWindow){
        if (projectWindow.editMode) {
            submitValues = formValues;
            submitValues.projectId = projectWindow.projectIDValue;
            Ext.getBody().mask('Loading...');
            Ext.Ajax.request({
                url: '/project/updateDetails',
                method: 'PUT',
                scope: me,
                params: submitValues,
                success: function (response, opts) {
                    Ext.getStore('projects.ProjectDashboardStore').load();
                    form.reset();
                    projectWindow.close();
                    Ext.getBody().unmask();
                },
                failure: function (response, opts) {
                    var errorMsg = JSON.parse(response.responseText).message;
                    Ext.Msg.alert('Failure', errorMsg);
                    Ext.getBody().unmask();
                }
            });
            return '';
        }
    },
    /**
     * The function getAjaxRequest is responsible to get the response by clicking on the save button.
     * @param {scope} 'me' the scope of this controller file. 
     * @param {undefined} 'submitValues' the declared variable. 
     * @param {form} 'form' which is the window form. 
     * @param {window} 'projectWindow' which holds the window. 
     */
    getAjaxRequest:function(me,submitValues,form,projectWindow){
        Ext.Ajax.request({
            url: '/project/add',
            scope: me,
            params: submitValues,
            success: function (response, opts) {
                Ext.getStore('projects.ProjectDashboardStore').load();
                var vm = this.getView().getViewModel();
                vm.getStore('projectListStore').load();
                form.reset();
                projectWindow.close();
            },
            failure: function (response, opts) {
                var errorMsg = JSON.parse(response.responseText).message;
                Ext.Msg.alert('Failure', errorMsg);
            }
        },me);
    }
});
