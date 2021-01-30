/**
 * The file JobsContainerController is the controller for DDO.view.profile.details.JobsContainer.
 * @extends {Ext.app.ViewController}.
 * @alias 'controller.jobscontainer'.
 */
Ext.define('DDO.view.jobs.JobsContainerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobscontainer',
    /**
     * The function onAddJobClick is responsible to open the jobs form by clicking on the add button.
     * @param {Ext.button.Button} 'btn' add jobs button.
     */
    onAddJobClick: function(btn) {
        try{
         var employeeView = this.getView();
        if (Utility.isFormDirty) {
            Ext.Msg.alert('INFO', 'Please close the other form before you want to Add New Job Details');
        } else {
            var store = Ext.getStore('monthstore');
            if(!store.isLoaded()){
                store.load();
            }
            Utility.isFormDirty = true;
            this.getViewModel().set('editing', true);
            employeeView.add(1, {
                xtype: 'addjobsform'
            });
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.ADDBUTTON, err);
    }
    },
    /**
     * The function onItemClick is responsible to restore the data view of the item selected.
     * @param {jobdetailsview} 'view' which is the job details view.
     * @param {user details} 'record' 
     * @param {item} 'item' the item which is selected. 
     * @param {number} 'index' the index of the item user selected 
     * @param {Event} 'e' the click event. 
     * @param {object} 'eOpts' the options object passed. 
     */
    onItemClick: function(view, record, item, index, e, eOpts) {
        try{
        var loc = index * 2,
            dataView = e.currentTarget.childNodes[loc],
            formView = e.currentTarget.childNodes[loc + 1],
            form;
        if (e.target.className === "ddo-edit-img") {
            if (record) {
                if (Utility.isFormDirty) {
                    Ext.Msg.alert('INFO', 'Please close the other form before you want to Edit Job Details');
                } else {
                    var store = Ext.getStore('monthstore');
                    if (!store.isLoaded()) {
                        store.load();
                    }
                    Utility.isFormDirty = true;
                    this.getViewModel().set('editing', true);
                    // suspending the layout to add the form
                    view.suspendLayout = true;
                    dataView.style.display = "none";
                    form = Ext.create('DDO.view.profile.details.AddJobsForm', {
                        renderTo: formView,
                        operation: 'editform', // edit operation
                        /* below are needed to restore the state of dataview item after 
                        the update */
                        dataNode: dataView, // selected dataview data node
                        formNode: formView // selected dataview form node
                    });
                    form.loadRecord(record);
                    // resuming the layout after form add
                    view.suspendLayout = false;
                    view.updateLayout();
                }
            }
        } else {}
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.ITEMCLICK, err);
    }
    },

    /**
     * This is the handler for the before refresh event of the jobs dataview.
     * Checks whether the records are editable or not.
     * @param 'view' The dataview reference
     */
    onJobsBeforeRefresh: function(view) {
        try{
        var vm = view.up('jobscontainer').getViewModel(),
            editable = vm.get('editable');
        view.tpl.editable = editable;
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.EDITABLE, err);
    }
    },
    /**
     * The function onViewRender is responsible to set the view model values while rendering the view.
     * @param {jobscontainer} 'view'. 
     */
    onViewRender: function(view) {
        try{
        Ext.defer(function() {
            var store = this.getView().lookupReference('jobdetailsview').getStore(),
                length = store.getCount(),
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
        view.el.on('mouseover', 'onJobsContainerMouseOver');
        view.el.on('mouseleave', 'onJobsContainerMouseLeave');
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.RENDER, err);
    }
    },
  /**
   * The function onItemMouseEnter is responsible to show the edit image by mouse hovering.
   * @param {jobdetailsview} 'view'  
   * @param {form details} 'obj' 
   * @param {Element} 'dom' the mousehover element. 
   */
    onItemMouseEnter: function(view, obj, dom) {
        try{
        var editImage = dom.getElementsByClassName('ddo-edit-img'),
            viewModel = this.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal == false) {
            editImage[0].style.display = "block";
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.MOUSEHOVER, err);
    }
    },
  /**
   * The function onItemMouseLeave is responsible to remove the edit image when mouse hover leave.
   * @param {jobdetailsview} 'view'  
   * @param {form details} 'obj' 
   * @param {Element} 'dom' the mousehover element. 
   */
    onItemMouseLeave: function(view, obj, dom) {
        try{
        var editImage = dom.getElementsByClassName('ddo-edit-img'),
            viewModel = this.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal == false) {
            editImage[0].style.display = "none";
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.MOUSEHOVER, err);
    }
    }
});