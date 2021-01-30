Ext.define('DDO.view.setup.employeesetup.WorkExpContainerController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.workexpcontainercontroller',

    onAddJobClick: function(btn) {
        try{
         var employeeView = this.getView();
         var store = Ext.getStore('monthstore');
         if(!store.isLoaded()){
             store.load();
         }
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
                xtype: 'workexpform'
            });
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOBBUTTON.ADDBUTTON, err);
    }
    },
    onViewRender:function(view){
    // debugger;
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
},
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
                form = Ext.create('DDO.view.setup.employeesetup.WorkExpForm', {
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

});