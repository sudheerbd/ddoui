/**
 * This is controller file for 'DDO.view.initiateexit.InitiateExitView'
 * @extends 'Ext.app.ViewController'
 * @alias 'viewmodel.initiateexitcontroller'
 */
Ext.define('DDO.view.initiateexit.InitiateExitController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.initiateexitcontroller',

  /**
   * This handler is responsible for action before option loads.
   * @param {search} object, containing details about the query to be executed.
   */
  onEmployeeComboSearch: function(search) {
    try {
      search.query = new RegExp(search.query, 'i');
      search.forceAll = true;
    } catch (err) {
      Utility.showToast(Messages.INITIATEEXIT.TOAST.SEARCH, err);
    }
  },

  /**
   * This handler is responsible for action after data is filled in form and user process to submit.
   */
  initiateexitsubmitbtnclick: function () {
    try {
      var me = this,
        mainView = me.getView();
      var empid = mainView.down('[reference=employee]').getValue();
      var reason = mainView.down('[reference=reason]').getValue();
      mainView.up('mainviewport').mask('Loading...');
      var imageurl = Utility.imageurl,
        promiseSubmit = me.preparePromise(me, reason, empid, imageurl);
      promiseSubmit.then(function (resolveObj) {
        var result = JSON.parse(resolveObj.response.responseText);
        Ext.Msg.alert('Success', result.message);
        resolveObj.me.getView().down().reset();
        resolveObj.me.getView().up('mainviewport').unmask("");
      }).catch(function (rejectObj) {
        var result = JSON.parse(rejectObj.response.responseText);
        Ext.Msg.alert('Failure', result.message);
        rejectObj.me.getView().down().reset();
        rejectObj.me.getView().up('mainviewport').unmask("");
      })
    } catch (err) {
      Utility.showToast(Messages.INITIATEEXIT.TOAST.SUBMITEXIT, err);
    }
  },

  /**
   * This handler is responsible for returning promise for exit request service.
   * @param {me} Object, contains reference of scope.
   * @param {reason} String, contains value of textfield named 'reason'.
   * @param {empid} Number, employee id of selected employee in form.
   * @param {imageurl} String, contains value of image path in string format.
   * @return {tempPromise} Promises, returning prepared promises.
   */
  preparePromise: function(me, reason, empid, imageurl){
    var tempPromise = new Promise(function(resolve, reject) {
      Ext.Ajax.request({
        scope: me,
        url: '/employeeexitrequest',
        method: 'POST',
        params: {
          reason: reason,
          empid: empid,
          imageurl: imageurl
        },
        success: function(response, data) {
          var resolveObj = {};
          resolveObj.response = response;
          resolveObj.data = data;
          resolveObj.me = me;
          resolve(resolveObj);
        },
        failure: function(response) {
          var rejectObj = {};
          rejectObj.response = response;
          rejectObj.me = me;
          reject(rejectObj)
        }
      })
    });
    return tempPromise;
  },

  /**
   * This handler responsible for upload for image file in file upload field.
   * @param {filefield} Object, contains reference of file field in form.
   * @param {value} String, Contains file path as string format.
   * @param {eOpts} Object, Event related details.
   */
  onDocumentImgChange: function(filefield, value, eOpts) {
    try {
      var me = this;
      var empid = me.getView().down('[reference=employee]').value;
      me.getView().up('mainviewport').mask()
      AmazonS3.uploadFile(filefield).then(function(img) {
        Utility.imageurl = img
        console.log('image_url', img)
        Utility.toastReuseFn('t', Messages.INITIATEEXIT.TOAST.DOCUMENT);
      });
      me.getView().up('mainviewport').unmask();
    } catch (err) {
      Utility.showToast(Messages.INITIATEEXIT.TOAST.AMAZON, err);
    }

  }

});