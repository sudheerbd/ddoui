/**
 * The file EducationController is the controller for DDO.view.profile.details.Education.
 * @extends {Ext.app.ViewController}.
 * @alias 'controller.educationcontroller'
 */
Ext.define('DDO.view.education.EducationController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.educationcontroller',
  /**
   * The function onAddEducationBtnClick is responsible to open the education details form by clicking on the add education button.
   * @param {Ext.button.Button} 'btn' thich is the add education button. 
   */
    onAddEducationBtnClick: function(btn) {
        try{
        if (Utility.isFormDirty) {
            Ext.Msg.alert('INFO', 'Please close the other form before you want to Add New Education Details');
        } else {
            var comboyearstore = Ext.getStore('comboyearstore');
            if (!comboyearstore.isLoaded()) {
                comboyearstore.load();
            }
            Utility.isFormDirty = true;
            this.getView().add(1, {
                xtype: 'educationadddetails'
            });
            this.getViewModel().set('editing', true);
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.ADDBUTTON, err);
    }
    },
    /**
     * The function onEditBtnClick is responsible to open the form and to save by clicking on the edit icon.
     * @param { Ext.view.View} 'view' which is the education view. 
     * @param {Ext.data.Model} 'record' The record that belongs to the item. 
     * @param {HTMLElement} 'img' the items element. 
     * @param {Number} 'index' the items index. 
     * @param {Ext.event.Event} 'e' the click event. 
     * @param {object} 'eOpts' the events object passed. 
     */
    onEditBtnClick: function(view, record, img, index, e, eOpts) {
        try{
        var loc = [(index + 1) * 3] - 1,
            formNode = e.currentTarget.childNodes[loc],
            educationDataNode = e.currentTarget.childNodes[loc - 1],
            form;
        if (e.target.className === "ddo-education-edit-img") {
            if (record) {
                if (Utility.isFormDirty) {
                    Ext.Msg.alert('INFO', 'Please close the other form before you want to Edit Education Details');
                } else {
                    this.openEditForm(view,educationDataNode,form,formNode,record);
                }
            }
        } else {
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.EDITCLICK, err);
    }
    },
    /**
     * The function openEditForm is responsible to open the editor and to update the layout.
     * @param {educationdata} 'view' which holds the view.
     * @param {element} 'educationDataNode' current clicked item 
     * @param {undefined} 'form' the declared variable. 
     * @param {element} 'formNode' 
     * @param {Ext.data.Model} 'record' The record that belongs to the item. 
     */
    openEditForm:function(view,educationDataNode,form,formNode,record){
        var comboyearstore = Ext.getStore('comboyearstore');
                    if (!comboyearstore.isLoaded()) {
                        comboyearstore.load();
                    }
                    Utility.isFormDirty = true;
                    // suspend the layout to add the form
                    view.suspendLayout = true;
                    educationDataNode.style.display = "none";
                    form = Ext.create('DDO.view.profile.details.AddEducationDetails', {
                        renderTo: formNode,
                        operation: 'editform', // edit operation
                        /* below are needed to restore the state of dataview item after 
                        the update */
                        educationDataNode: educationDataNode, // selected dataview data node
                        formNode: formNode // selected dataview form node
                    });
                    // resume and update the layout after form add
                    view.suspendLayout = false;
                    view.updateLayout();
                    form.loadRecord(record);
                    this.getViewModel().set('editing', true);
    },
    /**
     * This is the handler for the before refresh event of the education dataview.
     * Checks whether the records are editable or not.
     * @param {view} 'view' The dataview reference
     */
    onViewRender: function(view) {
        try{
        Ext.defer(function() {
            var store = this.getView().lookupReference('educationData').getStore(),
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
        view.el.on('mouseover', 'onEducationContainerMouseOver');
        view.el.on('mouseleave', 'onEducationContainerMouseLeave');
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.RENDER, err);
    }
    },

    /**
     * The function onItemMouseEnter is responsible to show the edit icon when mouse hover on the data item.
     * @param {Ext.view.View} 'view' the current view. 
     * @param {Ext.data.Model} 'obj' the item on which mouse hover. 
     * @param {HTMLElement} 'dom' the items element. 
     */
    onItemMouseEnter: function(view, obj, dom) {
        try{
        var editImage = dom.getElementsByClassName('ddo-education-edit-img'),
            viewModel = this.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal == false) {
            editImage[0].style.display = "block";
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.MOUSEHOVER, err);
    }
    },
     /**
     * The function onItemMouseLeave is responsible to hide the edit icon when mouse hover leave on the data item.
     * @param {Ext.view.View} 'view' the current view. 
     * @param {Ext.data.Model} 'obj' the item on which mouse hover. 
     * @param {HTMLElement} 'dom' the items element. 
     */
    onItemMouseLeave: function(view, obj, dom) {
        try{
        var editImage = dom.getElementsByClassName('ddo-education-edit-img'),
            viewModel = this.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal == false) {
            editImage[0].style.display = "none";
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATIONFORM.MOUSEHOVER, err);
    }
    }
});