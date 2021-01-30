/**
 * The file KarmaApprovalController is the controller for the 'DDO.view.karmaapproval.KarmaApproval'.
 * @extends {Ext.app.ViewController}
 * @alias controller.karmaapprovalcontroller
 */
Ext.define('DDO.view.karmaapproval.KarmaApprovalController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.karmaapprovalcontroller',
  /**
   * The Function showKarmaComments  will perform when the 'cellClick' event  is fired in the karmaapproval.
   * This function will create one window.
   * @param {Ext.view.Table} 'grid' is the owning table view.
   * @param {Number} 'cellIndex' which takes the column index value.
   * @param {String} 'record'-Which take the nominated record.
   * @param {String} 'cell'-Which take the column value.
   * @param {String} 'row'-Which take the row value.
   * @param {Number} 'rowIndex' which takes the rowIndex value.
   * @param {object} 'e' e is a click event.
   * @param {object} 'eOpts' which is the object.
   */
  // showKarmaComments: function(grid, cell, cellIndex, record, row, rowIndex, e, eOpts) {
  //   if (cellIndex == 3 || cellIndex == 4 || cellIndex == 7 || cellIndex == 8 || cellIndex == 9) {
  //     return;
  //   }
  //   var tpl = new Ext.XTemplate(
  //     '<div class="maindivcls">',
  //     '<tpl>',
  //     '<div class="fromcls">From:{"' + record.data.fromName + '"}</div>',
  //     '<div class="tocls">To:{"' + record.data.toName + '"}</div>',
  //     '<div class="commentscls">Comments:{"' + record.data.comment + '"}</div>',
  //     '</tpl>',
  //     '</div>');
  //   this.createWindowFun(record);
  // },
  /**
   * The function createWindowFun will create new window.
   * @param {record} Object, contains reference of selected record.
   */
  // createWindowFun: function(record) {
  //   var win = Ext.create('Ext.window.Window', {
  //     title: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.WINCOMMENT,
  //     width: Constants.ViewportWidth * 0.513,
  //     height: Constants.ViewportHeight * 0.463,
  //     constrain: true,
  //     resizable: false,
  //     modal: true,
  //     layout: 'fit',
  //     name: 'commentswindow',
  //     data: {
  //       fromName: record.get('fromname'),
  //       toName: record.get('toname'),
  //       comment: record.get('comments')
  //     },
  //     tpl: new Ext.XTemplate(
  //       '<div class="commentsmaindiv-cls">',
  //       '<tpl>',
  //       '<div class="fromcls">',
  //       '<div class="fromcls-lable">From:</div>',
  //       '<div class="fromcls-value">{fromName}</div>',
  //       '</div>',
  //       '<div class="tocls">',
  //       '<div class="tocls-lable">To:</div>',
  //       '<div class="tocls-value">{toName}</div>',
  //       '</div>',
  //       '<div class="commentcls">',
  //       '<div class="commentcls-lable">Comment:</div>',
  //       '<div class="commentcls-value">{comment}</div>',
  //       '</div>',
  //       '</tpl>',
  //       '</div>')
  //   }).show();
  // },
  applyBtnOnAddColumns: function (btn) {
    
		var checkbox = btn.up('karmaapproval').down('checkboxgroup'),
			menu = btn.up('karmaapproval').down('menu');
		menu.hide();
		checkbox.items.items.map(function (item) {
			if (item.value === false) {
				btn.up('karmaapproval').getColumns()[item.inputValue].setHidden(true);
			} else {
				btn.up('karmaapproval').getColumns()[item.inputValue].setHidden(false);
			}
		});
  },
  // openAdddColumn:function(btn,e,eOpts){
  //   var view = this.getView();
  //   debugger;
  //   // var win = Ext.ComponentQuery.query('DDO.view.karmaapproval.KarmaApprovalAddColumns',{
  //   //   parentRef: view,
  //   // })
  //   // var win = Ext.create('DDO.view.karmaapproval.KarmaApprovalAddColumns', {
  //   //   parentRef: view,
  //   // });
  //   var win = btn.up('grid').down('[reference = addcolumnsref]');
  //   win.open();
  // },
  onCheckBoxClick:function(view, recIdx, check, eOpts){

    
var view = this;
var karmaapproval = this.getView();
var toolbar = this.getView().down('toolbar');
  var storeItems =this.getViewModel().getStore('karmaapprovalstore');
  var submitrecords = [];
  var newValue = this.getViewModel().get('updateValue');
  var newtoolbar = Ext.create('DDO.view.karmaapproval.KarmaApprovalRandomToolbar',{
    parentView :view,
    karmaapproval : karmaapproval
  });
  if(check == true){
    toolbar.destroy();
       var checked = storeItems.getAt(recIdx);
        submitrecords.push(checked);
      newtoolbar.getViewModel().set('itemsSelected',newValue+1);
      this.getViewModel().set('updateValue',newValue+1);
  }else{
    this.getViewModel().set('updateValue',newValue-1);
    newtoolbar.getViewModel().set('itemsSelected',newValue-1);
     toolbar.destroy();
  }
  karmaapproval.addDocked(newtoolbar);
  // debugger;
  var itemsSelected = newtoolbar.getViewModel().get('itemsSelected');
    if(itemsSelected == 0){
      newtoolbar.destroy();
      var createToolbar = Ext.create('DDO.view.karmaapproval.KarmaApprovalToolBar');
      
      // debugger;

      karmaapproval.addDocked(createToolbar);
    }
  },
  /**
   * The function onAcceptBtnClick will perform when the 'handler' event of the 'button' is fired in the KarmaApproval.
   * It is accept the approval by clicking on accept button and after that it will call clearPendingNominations function .
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   * @param {Number} 'idx' The idx within the store of the selected record.
   * @param {Ext.data.Model} 'rec' The selected record.
   */
  onAcceptBtnClick: function(btn, idx, rec) {
    try {
      //var me = this;
      var view = this;
      var record = btn.getStore().getAt(idx);
      var win = Ext.create('DDO.view.karmaapproval.ProjectedKarmaAcceptWindow', {
        parentViewRef: view,
        rejectBtn: btn,
        rowIndex: idx,
        record:record
      });
      win.show();
      var form = win.down('form');
      form.loadRecord(record);
     // me.clearPendingNominations(btn, true, null, null, null, null, idx);
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.KARMAAPPROVAL.TOAST.ACCEPT, err);
    }
  },
  /**
   * The function onRejectBtnClick will perform when the 'handler' event of the 'button' is fired in the karmaapproval.
   * It will show one window and ask to write the reason.
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   * @param {Number} 'idx' The idx within the store of the selected record.
   * @param {Ext.data.Model} 'rec' The selected record.
   */
  onRejectBtnClick: function (btn, rowIndex, rec) {
      var view = this;
      var record = btn.getStore().getAt(rowIndex);
      var win = Ext.create('DDO.view.karmaapproval.KarmaApprovalWindow', {
        parentViewRef: view,
        rejectBtn: btn,
        rowIndex: rowIndex
      });
     win.show();
      var form = win.down('form');
      form.loadRecord(record);
    
      win.edit = false;

  },
  onSearchName:function(searchField, searchValue){
// debugger;
// var columns =this.getView().getColumns();
  var approvalStore = this.getViewModel().getStore('karmaapprovalstore');
  // searchString = textfield.getValue();
  
  if (!approvalStore.isLoaded()) {
    approvalStore.load();
}
if (approvalStore) {
  approvalStore.clearFilter();
  if(searchValue != ''){
    
    approvalStore.filterBy(function(record){
      if(record.get('fromname')){
       var name = record.get('fromname').toLowerCase();
    }

    if(record.get('karmacategory_name')){
     var categoryName = record.get('karmacategory_name').toLowerCase();
    }
    if(record.get('karma_name')){
     var karmaName = record.get('karma_name').toLowerCase();
  }
  searchValue = searchValue.toLowerCase();
  if (name.indexOf(searchValue) > -1 || categoryName.indexOf(searchValue) > -1 ||  karmaName.indexOf(searchValue) > -1 ) {
    return record;
}
    });
  }
//   approvalStore.filter({
//     //  property: columns,
//      value: searchString,
//      anyMatch: true,
//      caseSensitive: false

//  });
}   
else if (searchString.length == 0) {
  approvalStore.clearFilter(true);
  approvalStore.load();
  this.getView().refresh();
}
  },
  onclickkarmafilterbutton:function(){
    var view = this.getView();
    var win = Ext.create('DDO.view.karmaapproval.KarmaApprovalFilterWin', {
      parentRef: view,
    });
    win.show();
  },
  OnEyeButtonActionClick:function(btn,index,eOtps){
   
    var view = this;
    // debugger;
    var record = btn.getStore().getAt(index);
    var nominationId = record.data.ddo_nomination_id;

   var win = Ext.create('DDO.view.karmaapproval.KarmaApprovalNewWindow',{
    parentRef:view,
    record:record,
    index:index,
    nominationId : nominationId
   });
   
   win.show().center();
   
   var form = win.down('form');
     form.loadRecord(record);
     var field = form.down('[name = karmaunits]');
           field.setRawValue(record.data.karmaunits);
      var submitDate = win.down('[reference = submiteddate]');
          submitDate.setRawValue(record.data.submiteddate);
          var nominateDate = win.down('[reference = nominatemonth]');
          nominateDate.setRawValue(record.data.nominate_month);
          var employeeName = win.down('[reference = employeename]');
          employeeName.setRawValue(record.data.fromname);
          var hrKarma = win.down('[reference = hrkarmaunits]');
          hrKarma.setRawValue(record.data.hr_karma);
          var financeKarma = win.down('[reference = financekarmaunits]');
          financeKarma.setRawValue(record.data.finance_karma);
          var derivedKarma = win.down('[reference = derivekarma]');
          derivedKarma.setRawValue(record.data.derived_karma_points);
          var karmaunits = win.down('[reference = karmaunits]');
          karmaunits.setRawValue(record.data.karmaunits);
  //  debugger;
  },
  /**
   * The function clearPendingNominations will perform after the Accept or Reject butten is clicked in the KarmaApproval.
   * It is used for the ajax request to update the Project Approval and clear the pending nominations in the KarmaApproval file.
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   * @param {boolean} 'flag' contain boolean value. 
   * @param {String} 'message' it is containing message.
   */
  clearPendingNominations: function(btn, flag, message, btnname, alteredPoints, alteredDerivedPoints, rowIndex,window) {
    try {
      //  debugger;
      Ext.getBody().mask('');
      var me = this,
        store = me.getView().getStore(),
        rec,
        // nominationId = btn.getWidgetRecord().get('ddo_nomination_id'),
        // nominationId = btn.getStore().getData().items[0].data.ddo_nomination_id;
        nominationId = store.getAt(rowIndex).data.ddo_nomination_id;
      viewModel = this.getViewModel(),
      recIdx = store.findExact('ddo_nomination_id', nominationId);
      if (recIdx != -1) {
        rec = store.getAt(recIdx);
      }
      var url = flag ? Api.URL.karmaapproval.ACCEPT : Api.URL.karmaapproval.REJECT,
        method = flag ? 'POST' : 'PUT',
        params = flag ? {
          nominationId: rec.get('ddo_nomination_id'),
          points: rec.data.points,
          acceptmsg: message
        } : {
          nominationId: rec.get('ddo_nomination_id'),
          rejectmsg: message,
          alteredPoints: alteredPoints,
          alteredDerivedPoints: alteredDerivedPoints,
          actualPoints: rec.data.points,
      }
      // if (btnname && btnname == 'sendback') {
      //   url = Api.URL.karmaapproval.SENDBACK;
      //   method = 'PUT',
      //     params = {
      //       nominationId: rec.get('ddo_nomination_id'),
      //       rejectmsg: message,
      //       alteredPoints: achievevalue,
      //       actualPoints: rec.data.points,
      //     } }
      var requireobj = {
        store: store,
        viewModel: viewModel,
        recIdx: recIdx,
        btnname: btnname,
        url: url,
        method: method
      };
      this.PendingNominationsAjax(requireobj, params,window);
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.KARMAAPPROVAL.TOAST.PENDINGNOMINATIONFAIL, err);
    }
  },
  /**
   * The function PendingNominationsAjax is used for the ajax request to update in the Karmaapproval.
   * It is used for the ajax request to update the Karma Approval in the ProjctApproval field.
   * @param {Object} - 'requireobj' passing all tha require parameter inside one object.
   * @param {Object} - 'params'
   */
  PendingNominationsAjax: function(requireobj, params,window) {
    var promiseClrPendingReq = new Promise(function(resolve, reject) {
      Ext.Ajax.request({
        url: requireobj.url,
        method: requireobj.method,
        params: params,
        success: function(response, opts) {
         
          var resolveObj = {};
          resolveObj.response = response;
          resolveObj.btnname = requireobj.btnname;
          resolveObj.recIdx = requireobj.recIdx;
          resolveObj.store = requireobj.store;
          resolve(resolveObj);
          window.close();
        },
        failure: function(response, opts) {
          Ext.getBody().unmask();
          var obj = Ext.decode(response.responseText);
          params.viewModel.set('number', 1)
          if (obj) {
            Ext.Msg.alert('Failure', 'Unable to approve the Karma');
          }
        }
      });
    });
    promiseClrPendingReq.then(function(resolveObj) {
      var message;
      me = this,
      obj = Ext.decode(resolveObj.response.responseText);
      if (obj && obj.success) {
        message = obj.message;
        resolveObj.store.removeAt(resolveObj.recIdx);
        if (resolveObj.btnname == 'sendback') {
          var selfnominateView = Ext.ComponentQuery.query('selfnominatewindow')[0] ||
            Ext.create('DDO.view.nominate.selfnomination.SelfNominateWindow'),
            selfNomVM = selfnominateView.getViewModel(),
            sentBackNominationsStore = selfNomVM.getStore('sentBackNominationsStore');
          sentBackNominationsStore.load({
            scope: me,
            callback: function() {
              let count = sentBackNominationsStore.count();
              selfNomVM.set('sentBackNomCount', count);
            }
          });
        }
        Ext.getBody().unmask();
        Ext.Msg.alert('Success', message);
      } else {
        if (obj && obj.success == false && obj.message) {
          message = obj.message;
          Ext.Msg.alert('Failure', message);
        }
      }
      Ext.getBody().unmask();
    })
  },
  
  onKarmaUnitsChange: function(rowIndex, newValue, form){
    var me = this;
    var viewModel = me.getViewModel();
    var store = me.getView().getStore();
    var data = store.getAt(rowIndex).data;
    params = {
      karmaId: data.karma_id,
      // ratingId: ratingId,
      karmaUnits: form.getValues().karmaunits,
      karmaRuleId: data.karmaruleid,
      // projectId: projectId,
      frequency: data.frequency,
      toEmpId: data.to_employee_id,
      empComboDesignation: data.designation
  };

    // var visitorScore = form.down('[reference = visitorscore]');
        // visitorScore.mask('loading...');
        var promiseFrequency = new Promise(function(resolve, reject){
            Ext.Ajax.request({
                url: Api.URL.ddonominate.getDerivedKarmaScore, //API singleton
                params: params,
                method: 'GET',
                success: function (response, opts) {
                    var resolveObj = {};
                    resolveObj.res = response;
                    resolveObj.viewModel = viewModel;
                    resolveObj.form = form;
                    // resolveObj.form = form;
                    resolve(resolveObj);
                    // visitorScore.unmask();
                },
                failure: function (response, opts) {
                    reject(response);
                    // visitorScore.unmask();
                }
            });
        });
        promiseFrequency.then(function(resolveObj){
                var obj, points, errorMessage;
                obj = Ext.decode(resolveObj.res.responseText);
                if (obj.data.errorMessage) {
                    errorMessage = obj.data.errorMessage;
                    Ext.Msg.alert('Warning', errorMessage);
                    points = 0;
                } else {
                    points = obj.data.karmapoints.karma_points || null;
                }
                var derviedKarma = resolveObj.form.down('[name = derived_karma_points]');
                derviedKarma.setRawValue(points);
                // resolveObj.viewModel.set('derivedKarma', points);
        }).catch(function(err){
            console.log(Messages.NOMINATION.SERVERERROR + err.status, err);
        });
  },



});