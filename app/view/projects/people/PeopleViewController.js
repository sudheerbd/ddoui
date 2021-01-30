/**
 * The file PeopleViewController is the controller for the 'DDO.view.projects.people.PeopleView'.
 * @extends {Ext.app.ViewController}
 * @alias controller.peopleviewcontroller
 */
Ext.define('DDO.view.projects.people.PeopleViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.peopleviewcontroller',
  /**
   * The function onKeyupPeopleSearch will perform when the  'keyup' event of the textfield is fired in the  peopleForm.js file.
   * It will search  those people name which are under selected project.
   * @param {Ext.form.field.File} 'field' which is the form field.
   * @param e - The click event
   * @param eOpts -Object 
   */
  onKeyupPeopleSearch: function (field, e, eOpts) {
    try{
      var view = this.getView(),
          peopleDataView = view.down('peopledataview'),
          store = peopleDataView.getStore();
      let isChecked = view.down('[reference=resourceCheckbox]').getValue();
          searchString = field.getValue();
    Utility.recCountValues = [];
    Utility.empDes = null;
    if (searchString) {
      store.filter({
        property: 'empfullname',
        value: searchString,
        anyMatch: true,
        caseSensitive: false
      });
    } else if (searchString.length == 0) {
      store.clearFilter();
      if(!isChecked){
      store.filterBy(function (record) {
        if (record.data.status != "Past resources") {
          return true;
        }
      });
    }
    }
    this.onPeopleLoad();
  } catch (err) {
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PEOPLE.SEARCHBTN, err);
  }
  },
  /**
   * The function onPeopleLoad will perform when the  'load' event is fired in the  peopleViewModel.js file.
   * It will load the people.
   * @param {store} 'store' it is containging the record of peopleviewstore.
   * @param {Ext.data.Model} 'records' The selected record.
   * @param eOpts -Object 
   */
  onPeopleLoad: function (store, records, successful, operation, eOpts) {
    try{
      var view = this.getView(),
          viewModel = view.getViewModel(),
          peopleDataView = view.down('peopledataview'),
          PeopleViewStore = peopleDataView.getStore();
      var stData = [];
      PeopleViewStore.each(function (rec) {
      if (stData.length > 0) {
        var exist = false;
        for (var p = 0; p < stData.length; p++) {
          if (stData[p].get('cbpid') == rec.get('cbpid')) {
            exist = true;
          }
        }
        if (!exist) {
          stData.push(rec);
        }
      } else {
        stData.push(rec);
      }
    });
    viewModel.set('totalPeople', stData.length);
  } catch (err) {
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PEOPLE.PEOPLELOAD, err);
  }
  },
  /**
   * The function onPeopleItemClick will perform when the  'itemclick' event is fired in the  peopleDataView.js file.
   * it will redirecting to the selected user's profile
   * It will delete the people and also add the people in project.
   * @param {Ext.view.view} 'view' it is containing the peopleData view.
   * @param {String} 'record' Which take the selected  record.
   * @param {Number} 'index' The index within the store of the selected record.
   * @param eOpts -Object 
   */
  onPeopleItemClick: function (view, record, item, index, event, eOpts) {
    // redirecting to the selected user's profile
    try{
    var scope = this,
      targetDom = event.getTarget(),
      targetEl = Ext.get(targetDom),
      intereststore,editViewModel,paramsObj;
    if (targetDom.classList[0] == 'scorerName-cls') {
      Ext.getBody().mask('');
      this.redirectTo('profile/' + record.data.cbpid);
    } else {}
  } catch (err) {
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PEOPLE.CLICKONPEOPLE, err);
  }
  },

  /**
   * The function onPeopleDeleteButtonClick will perform when the  'click' event is fired in the  peopleDataView.js file.
   * It will delete the people.
   * @param {Ext.view.view} 'view' it is containing the peopleData view.
   * @param {String} 'record' Which take the selected  record.
   */

  // onPeopleDeleteButtonClick: function (view, record, scope) {
  //   try{
  //   var paramsObj;
  //   intereststore = view.getStore();
  //   paramsObj = {
  //     cbpid: record.data.cbpid,
  //     project_id: record.data.project_id,
  //     project_role: record.data.projectroleid
  //   }
  //   Ext.Ajax.request({
  //     url: '/projectmember',
  //     method: 'DELETE',
  //     scope: scope,
  //     params: paramsObj,
  //     success: function (conn, response, options, eOpts) {
  //       Utility.recCountValues = [];
  //       Utility.empDes = null;
  //       intereststore.load({
  //         scope: scope,
  //         callback: function (operation, eOpts) {
  //           var stData = [];
  //           intereststore.each(function (rec) {
  //             if (stData.length > 0) {
  //               var exist = false;
  //               for (var p = 0; p < stData.length; p++) {
  //                 if (stData[p].get('cbpid') == rec.get('cbpid')) {
  //                   exist = true;
  //                 }
  //               }
  //               if (!exist) {
  //                 stData.push(rec);
  //               }
  //             } else {
  //               stData.push(rec);
  //             }
  //           });
  //           console.log('total data: ', stData.length);
  //           Ext.getStore('projects.ProjectDashboardStore').load();
  //           scope.getViewModel().set('totalPeople', stData.length);
  //         }
  //       });
  //     },
  //     failure: function (conn, response, options, eOpts) {
  //       console.log( Messages.EXECUTIVEDASHBOARD.PEOPLE.DELETEFAIL )
  //     }
  //   });
  //   Utility.recCountValues = [];
  //   view.refresh();
  // } catch (err) {
  //   Utility.showToast(Messages.EXECUTIVEDASHBOARD.PEOPLE.PEOPLEDELETE, err);
  // }
  // },

  /** The function onClickAddPeopleBtn will execute when the 'click' event is is fired from PeopleForm.js file.
   * On clicking on 'Add People' btn, opens a window with employee,
   * role,start date,end date and allocation percent fields in the form.
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   * @param e - The click event
   * @param eOpts -Object 
   */
  onClickAddPeopleBtn: function (btn, e, eOpts) {
    try{
    Ext.getBody().mask('Loading...');
    var projectWindow = Ext.ComponentQuery.query('addpeopleview')[0] || Ext.create('DDO.view.projects.people.AddPeopleView'),
      peopleSearchView = Ext.ComponentQuery.query("resourcerequestlist")[0],
      ref = projectWindow.getReferences(),
      viewModel = this.getViewModel(),
      grpWinViewModel = projectWindow.getViewModel(),
      emppeoplestore = peopleSearchView.getStore(),
      selectEmpStore = Ext.getStore('projects.people.SelectedEmployeeStore'),
      roleStore = Ext.getStore('projects.people.ProjectRole'),
      view = this.getView(),
      peopleDataView = view.down('peopledataview'),
      peopleViewStore = peopleDataView.getStore(),
      dataArr = [];
      viewModel.set('searchForm', false);
    viewModel.set('addPeopleLabel', false);
    viewModel.set('nonEditEmpSelect', false);
    viewModel.set('nonEditSelections', true);
    viewModel.set('empListVisibility', false);
    grpWinViewModel.set('emloyeeSelectedCount', 0);
    ref.peoplesearchview.refresh();
    ref.peopleSearchForm.down('checkbox').reset();
    ref.peopleSearchForm.down('textfield[reference=searchname]').setValue('');
    if (viewModel.get('disableFormFields') || viewModel.get('nonEditSelections')) {
      viewModel.set('disableFormFields', false);
      viewModel.set('nonEditSelections', true);
      ref.peopleSearchForm.down('checkbox').reset();
      ref.peoplesearchview.refresh();
    }
    roleStore.load({
      callback: function () {
        roleStore.clearFilter(true);
        checkgroup = ref.roleRadiogroup;
        checkgroup.removeAll();
        roleStore.each(function (rec) {
          var data = {
            boxLabel: rec.get('name'),
            name: 'role',
            checked: rec.get('checked'),
            inputValue: rec.get('ad_role_id')
          };
          checkgroup.add(data);
        });
      }
    });
    peopleViewStore.each(function (rec) {
      dataArr.push(rec);
    });
    Utility.projectMem = dataArr;
    emppeoplestore.clearFilter(true);
    emppeoplestore.load({
      scope: this,
      callback: function (records, operation, success) {
        if (records) {
          grpWinViewModel.set('emloyeeTotalCount', records.length);
        }
        projectWindow.unmask();
      }
    });
    projectWindow.down('form').reset();
    projectWindow.show();
    Ext.getBody().unmask();
    projectWindow.mask('');
  } catch (err) {
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PEOPLE.ADDPPLBTN, err);
  }
  },
  /**
   * The function resourcesUnChecked will perform when the  'change' event of the checkbox is fired in the  PeopleForm.js file.
   * It will show the records of the employee.
   * @param {Ext.form.field.File} 'chk' which is the form field.
   * @param {boolean} 'newValue' which takes the bolean value.
   */
  resourcesUnChecked: function (chk, newValue) {
    try{
      var view = this.getView(),
          peopleDataView = view.down('peopledataview'),
          store = peopleDataView.getStore();
    store.clearFilter();
    if (!newValue) {
      store.filterBy(function (record) {
        if (record.data.status != "Past resources") {
          return true;
        }
      });
    }
    view.getViewModel().set('totalPeople', store.getData().items.length);

  } catch (err) {
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PEOPLE.CHECHBOX, err);
  }
  },
  /**
   * The function resourcesUnChecked will perform when the 'afterrender' event of the checkbox is fired in the  PeopleForm.js file.
   * It will show the records of the employee.
   * @param {Ext.form.field.File} 'chk' which is the form field.
   * @param {Object} 'eOpts' which is the object.
   */
  resourcesChecked: function (chk, eOpts) {
    try{
      var view = this.getView(),
          peopleDataView = view.down('peopledataview'),
          store = peopleDataView.getStore();
    if (chk.checked == false) {
      store.filterBy(function (record) {
        if (record.data.status != "Past resources") {
          return true;
        }
      });
    }
  } catch (err) {
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PEOPLE.CHECHBOX, err);
  }
  }
});