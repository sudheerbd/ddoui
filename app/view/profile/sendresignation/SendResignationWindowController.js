 /**
 * This is controller for view 'DDO.view.profile.sendresignation.SendResignationWindow'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.resignationwindowcontroller'
 */
Ext.define('DDO.view.profile.sendresignation.SendResignationWindowController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.resignationwindowcontroller',

  /**
   * Handler resoposible for processing resignation procedures.
   */
  Onresignationok: function() {
    try {
      // debugger;
      var resignform = this.getView().down('textarea[name=reason]')
    resignform_content = resignform.getValue();
    var empId = this.getView().up('userprofile').getViewModel().getData().profiledata.about.ddo_employee_id
    var scope = this;
    Ext.Msg.confirm(
      'Confirm',
      'Do you want to continue?',
      function(btnId) {
        if (btnId === 'yes') {
          scope.getView().mask("");
          scope.postAjaxRequest(scope,resignform_content,empId);
        } else {
        }
      });
    } catch (err) {
        Utility.showToast(Messages.PROFILE.RESIGNOK, err);
    }
  },
  /**
   * The function postAjaxRequest is responsible to send the api call for sending the resignation.
   * @param {controller} 'scope' which is the current controller scope. 
   * @param {string} 'resignform_content' the content which is written in the resignation form. 
   * @param {number} 'empId' the employee_id number. 
   */
  postAjaxRequest:function(scope,resignform_content,empId){
    // debugger;
    Ext.Ajax.request({
      // scope: scope,
      url: '/employeeexitrequest',
      method: 'POST',
      params: {
        reason: resignform_content,
        empid: empId
      },
      success: function(batch, opt) {
        // debugger;
        scope.getView().unmask("");
        scope.getView().close();
        if (batch.responseText) {
          var jsonData = batch.responseText
          Ext.Msg.alert('Success', 'Successfully Sent Resignation');
          // scope.getView().unmask("");
        }
      },
      failure: function (batch) {
        scope.getView().unmask("");
        
        Ext.Msg.alert("Failed",'Failed to Sent Resignation');
    }
    })
  },
  /**
   * Handler responsible for cancelling resign process
   */
  Onresignationcancel: function() {
    var win = this.getView();
    win.close();
  }
});