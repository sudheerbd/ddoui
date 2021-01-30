/**
 * The file ProjectsViewController is the controller for the 'DDO.view.projects.ProjectsTabsView'.
 * @extends {Ext.app.ViewController}
 * @alias controller.projectsviewcontroller.
 */
Ext.define('DDO.view.projects.ProjectsViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.projectsviewcontroller',
  /**
   * The function onDataItemClick is responsible to open the project window with the data values and to edit the project view.
   * @param {projectdashboardview} 'view' which opens the view. 
   * @param {record} 'record' which gets the selected item record values. 
   * @param {item} 'item' the selected item. 
   * @param {number} 'index' the index of the data item selected. 
   * @param {Event} 'e' the click event. 
   * @param {object} 'eOpts' the events object passed. 
   */
  onDataItemClick: function (view, record, item, index, e, eOpts) {
    // try{
var projectsView = this.getView(),
a = projectsView.lookupReference('tabscontainer');
projectsView.getViewModel().set('activeProData', record.data);
var tabsView = projectsView.down('projectstabsdetailsview');
projectsView.selectedProjectId = record.data.project_id;
a.getLayout().setActiveItem(1);
tabsView.setActiveTab(0);
// var projectsView = view.up();
// projectsView.down('container').getLayout().setActiveItem(1);
    // var wrapId = e.target.getAttribute('wrap-td'),
    //   projectView = this.getView(),
    //   imgView = projectView.down('projectstabsview').down('dataview'),
    
    //   targetCls = e.target.classList;
    //   //this prject id is use for seting project id in people module
    // this.getViewModel().set('projectId', record.data.project_id);
    // if (targetCls[0] == "pro-name-cls-icon") {
    //   var projectID = record.data.project_id;
    //   var addProjectWindow = Ext.create('DDO.view.projects.AddProjectWindow', {
    //     editMode: true,
    //     title: '<span class="nom-name-cls">Edit Project</span>',
    //     projectIDValue: projectID
    //   });
    //   this.windowSetValues(addProjectWindow,record);
     
    // }
    // this.dynamicConditionChecking(wrapId,record);
    // combobox = projectView.down('projectstabsview').down('[name = status]');
    // combobox.setValue(record.data.status);
  // }
  // catch(err){
  //   Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.RECORDSELECT, err);
  // }
  },
  /**
   * The function windowSetValues is responsible to set the window values and to show the window.
   * @param {window} 'addProjectWindow' which contains the project window.
   * @param {record} 'record' which gets the selected item record values.   
   */
  windowSetValues : function(addProjectWindow,record){
    addProjectWindow.down('[name = projectName]').setValue(record.data.name);
    addProjectWindow.down('[name = searchKey]').setValue(record.data.value);
    addProjectWindow.down('[name = salesRepresentativeId]').setHidden(true);
    addProjectWindow.down('[reference = imageUploadForm]').setHidden(true);
    addProjectWindow.down('[name = ddo_projects_clients_id]').setValue(record.data.ddo_projects_clients_id);
    addProjectWindow.down('[name = projectImage]').setValue(record.data.image_url);
    addProjectWindow.show();
  },
  /**
   * The function dynamicConditionChecking is responsible to check with different conditions based on the dashboard item click.
   * @param {string} 'wrapId' which contains the image url. 
   * @param {record} 'record' which gets the selected item record values.   
   */
  dynamicConditionChecking : function(wrapId,record){
    switch (wrapId) {
      case 'people_count':
        this.dashItemClick(record.data, '/people');
        break;
      case 'risks_unresolved':
        this.dashItemClick(record.data, '/notes');
        break;
      case 'cam_icon':
        this.onCamIconClickFn(record.data);
        break;
      default:
        this.dashItemClick(record.data, '/notes');
        break;
    }
  },
  /**
   * The function dashItemClick is responsible to redirect to the people page.
   * @param {data} 'data' the data which is passed. 
   * @param {view} 'redirectView' the redirect view. 
   */
  dashItemClick: function (data, redirectView) {
    this.redirectTo('projectdetails/' + data.project_id + redirectView);
  },
/**
 * The function onCamIconClickFn is responsible to upload the image of the project.
 * @param {number} 'project_id' it takes the project id to upload the image. 
 */
  onCamIconClickFn: function (project_id) {
    var uploadFormWindow = Ext.ComponentQuery.query('externaluploadform')[0] ||
      Ext.create('DDO.view.projects.ExternalUploadForm');
    uploadFormWindow.getViewModel().set('project_id', project_id);
    uploadFormWindow.show();
  },
  /**
   * The function onBtnClick will perform when the  'click' event is fired  in the  ProjectTabsView.js file.
   * It will open the people view when we click on the people button.
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   */
  onBtnClick: function (btn) {
    try {
      btn.setPressed(true);
      var detailsView = this.getView().down('projectstabsdetailsview');
      this.redirectTo('projectdetails/' + window.location.hash.split('/')[1] + '/' + btn.text.toLowerCase());
      if (btn.text == 'People') {
        var peopleDataView = this.getView().down('peopledataview');
        if (peopleDataView) {
          peopleDataView.updateLayout();
        }
      }
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.PEOPLEPAGE, err);
    }
  },
    /**
     * The function onNoteCloseClick is responsible to close the note window by clicking on the close icon.
     * @param {Ext.button.Button} 'btn' which holds the button. 
     * @param {Event} 'e' the click event. 
     * @param {object} 'eOpts' the options object passed. 
     */
  onNoteCloseClick: function (btn, e, eOpts) {
    try{
    btn.up('notewindow').hide();
    }catch(err){
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTECLOSE, err);
    }
  },
  /**
   * The function onNoteSubmitClick is responsible to hide the note window by clicking on the submit button.
   * @param {Ext.button.Button} 'btn' which holds the button. 
   * @param {Event} 'e' the click event. 
   * @param {object} 'eOpts' the options object passed. 
   */
  onNoteSubmitClick: function (btn, e, eOpts) {
    try{
    var formValues = btn.up('form').getValues();
    console.log(formValues);
    btn.up('notewindow').hide();
    }catch(err){
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.NOTESUBMIT, err);
    }
  },
  /**
   * The function onFeedbackClick is responsible to open the feedback window.
   * @param {Ext.button.Button} 'btn' which holds the button. 
   * @param {Event} 'e' the click event. 
   * @param {object} 'eOpts' the options object passed.
   */
  onFeedbackClick: function (btn, e, eOpts) {
    try{
    var nominateObj = {};
    var categoryStore,projectRec,
      peoplesViewStore,
      projectMemberArray = [];
    var view = this.getView(),
        peopleDataView = view.down('peopledataview');
    peoplesViewStore = peopleDataView.getStore();
    Utility.nominateProjectId = this.getViewModel().get('activeProData').project_id;
    peoplesViewStore.each(function (rec) {
      if ((Utility.nominateProjectId == rec.data.project_id) && (rec.data.projectrole != "Past resources")) {
        projectMemberArray.push(rec.data.cbpid);
      }
    });
    categoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
    Ext.getStore('setup.employeesetup.ReportingStore').load();
    categoryStore.clearFilter(true);
    categoryStore.load({
      scope: this,
      callback: function (record, response, success) {
        projectRec = categoryStore.findRecord('name', 'Project');
        if (projectRec) {
          karmacategoryId = projectRec.get('ddo_karmacategory_id');
        };
        this.createFeedBackWindow(nominateObj);
        this.karmaStoreFilter(nominateObj)
        this.setFeedViewModel(nominateObj,projectMemberArray);
      }
    });
  }catch(err){
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.FEEDBACK, err);
  }
  },
  /**
   * The function createFeedBackWindow is responsible to open the feedback window by clicking on the button.
   * @param {object} 'nominateObj' which holds the variable values. 
   */
  createFeedBackWindow:function(nominateObj){
    nominateObj.feedBackWindow = Ext.ComponentQuery.query('feedbackwindow')[0] || Ext.create('DDO.view.projects.FeedbackWindow');
    nominateObj.nomViewForm = nominateObj.feedBackWindow.down('nominateothersviewform');
    nominateObj.nomViewModel = nominateObj.nomViewForm.getViewModel();
    nominateObj.nomcomboContainerRef = nominateObj.nomViewForm.lookupReference('nominatecontainer');
    //nominateObj.nomRatingSelector = nominateObj.nomViewForm.lookupReference('nominateratingselectorref');
    //nominateObj.nomBtnGrp = nominateObj.nomRatingSelector.down('buttongroup[reference=btnGrpRef]');
    // if (nominateObj.nomBtnGrp) {
    //   nominateObj.nomBtnGrp.items.items.forEach(function (rec) {
    //     if (rec.text == "Project") {
    //       rec.addCls("nom-selected-btn-cls");
    //     }
    //   });
    // }
    nominateObj.feedBackWindow.getViewModel().set("profileName", "");
    nominateObj.nominateIcons = nominateObj.nomViewForm.down('nominateothersviewicons');
    if (nominateObj.nominateIcons) {
      var selModel = nominateObj.nominateIcons.getSelectionModel();
      selModel.deselectAll(true);
      var navModel = nominateObj.nominateIcons.getNavigationModel();
      if (navModel && navModel.getLastFocused()) {
        navModel.lastFocused = null;
      }
    }
  },
  /**
   * The function karmaStoreFilter is responsible to clear the filter on the store and filter based on the name.
   * @param {object} 'nominateObj' which holds the variable values. 
   */
  karmaStoreFilter:function(nominateObj){
    // if (nominateObj.nomRatingSelector.hasCls("nominate-profiledetailview-cls")) {
    //   nominateObj.nomRatingSelector.removeCls("nominate-profiledetailview-cls");
    //   nominateObj.nomRatingSelector.addCls("nominate-detailview-cls");
    // }
    if (nominateObj.nomcomboContainerRef.hasCls("nominateprofilecombocontainer")) {
      nominateObj.nomcomboContainerRef.removeCls("nominateprofilecombocontainer");
      nominateObj.nomcomboContainerRef.addCls("nominatecombocontainer");
    }
    nominateObj.karmaStore = Ext.getStore('karmasetup.KarmaNominateStore');
    nominateObj.karmaStore.load();
    nominateObj.karmaStore.clearFilter(true);
    nominateObj.karmaStore.filterBy(function (rec) {
      if (rec.get('karmacategoryname') == 'Project') {
        nominateObj.nomViewModel.set('categoryComboValue', rec.data.karmacategoryid);
        return true;
      }
    });
  },
  /**
   * The function setFeedViewModel is responsible to set the values in the view model and to show the feedback window.
   * @param {object} 'nominateObj' which holds the variable values. 
   * @param {array} 'projectMemberArray'  array which holds the people view store data.
   */
  setFeedViewModel:function(nominateObj,projectMemberArray){
    var feedBackWindowForm = nominateObj.feedBackWindow.lookupReference('nominateviewform');
    var feedViewModel = feedBackWindowForm.getViewModel();
    feedViewModel.set('tagId', null);
    feedViewModel.set('userID', this.getViewModel().get('name'));
    feedViewModel.set('iconSelection', null);
    feedViewModel.set('points', 0);
    feedViewModel.set('scoreText', "For Each Member");
    feedViewModel.set('ratingView', true);
    feedViewModel.set('ruleView', true);
    nominateObj.nomViewModel.set('nomBtn', true);
    nominateObj.nomViewModel.set('nomSubBtn', true);
    feedBackWindowForm.lookupReference('ratingcomment').setValue(null);
    feedBackWindowForm.lookupReference('nominatekarmacombo').setValue(null);
    feedBackWindowForm.down('tagfield').setHidden(false);
    feedViewModel.set('tagId', projectMemberArray);
    nominateObj.feedBackWindow.show();
  },
  /**
   * The function onAddProjectClick is responsible to open the project window by clicking on the add project button.
   * @param {Ext.button.Button} 'btn' which is the button. 
   */
  onAddProjectClick: function (btn) {
    try{
    var uploadFormWindow = Ext.ComponentQuery.query('addprojectwindow')[0] || Ext.create('DDO.view.projects.AddProjectWindow');
    uploadFormWindow.show();
    }catch(err){
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.ADDPROJECT, err);
    }
  },
  /**
   * The function onProjectImgChange will perform when the  'change' event  of the filefield is fired  in the  ProjectTabsView.js file.
   * It will upload the Project Status of projectsTabsView.
   * @param {Ext.form.field.File} 'filefield' which is the form field.
   * @param {string} 'Value' which takes the name of the selected entered.
   * @param {Object} 'eOpts' which is a object.
   */
  onProjectImgChange: function (filefield, value, eOpts) {
    try {
      var me = this,
        view = me.getView(),
        dashboardView = view.down('projectdashboardview'),
        tabsView = view.down('projectstabsview'),
        project_id = me.getViewModel().get('activeProData').project_id,
        store = dashboardView.getStore();
      var projectViewModel = me.getViewModel();
      AmazonS3.uploadFile(filefield, project_id).then(function (rec) {
        store.load({
          scope: this,
          callback: function () {
            var data = store.findRecord('project_id', project_id);
            console.log('image_url', rec)
            data.set('image_url', rec);
            tabsView.down('dataview').setData(data);
          }
        });
        dashboardView.refresh();
        Utility.toastReuseFn('t', "<span style='color:green'>Project image changed successfully</span>");
      });
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.IMAGELOAD, err);
    }
  },

  // onProjectSetStatus: function(combo) {
  //   // debugger;
  //   combo.setValue("Presales");
  // },
  /**
   * The function onSelectStatusValue will perform when the  'select' event  is fired in the  ProjectTabsView.js file.
   * It will upload the Project Status of projectsTabsView.
   * @param { Ext.form.field.Field} 'combo'which is the form field.
   * @param {Ext.data.Model} 'record' The selected record.
   * @param {Object} 'eOpts' which is a object.
   */
  onSelectStatusValue: function (combo, record, eOpts) {
    try {
      var me = this;
          projectId = me.getViewModel().data.activeProData.project_id;
    // debugger;
      // var combobox =  this.getView().down('projectstabsview').down('[name= status]');
      //     combobox.setValue(record.data.status);
      var promiseForSelectStatus = new Promise(function (resolve, reject) {
        Ext.Ajax.request({
          url: '/project/updateStatus',
          scope: me,
          params: {
            value: record.data.status,
            projectId: projectId
          },
          success: function (conn, response) {
            var resolveObj = {};
            resolveObj.scope = me;
            resolveObj.response = response;
            resolve(resolveObj);
          },
          failure: function (conn, response) {
            Utility.toastReuseFn('t', Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.STATUSUPDATEFAIL);
          }
        });
      });
      promiseForSelectStatus.then(function (resolveObj) {
        Utility.toastReuseFn('t', Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.STATUSUPDATESUCCESS);
        var view = resolveObj.scope.getView(),
            projectDashboard = view.down('projectdashboardview'),
            ProjectDashboardStore = projectDashboard.getStore();
        ProjectDashboardStore.reload();
       
        var projectRequest = Ext.ComponentQuery.query('projectrequest')[0];
        if (projectRequest) {
          var projectListCombo = projectRequest.down('[name = choose_project]'),
              projectListStore = projectListCombo.getStore();
          if (projectListStore) {
            projectListStore.reload();
          }
        }
      });
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.STATUS, err);
    }
  },
  /**
   * The function onProjectStatusSelect is responsible to select the status of the project and to clear the filter.
   * @param {Ext.form.field.Field} 'combo' the combobox. 
   * @param {record} 'record' the selected records. 
   * @param {object} 'eOpts' which is a object. 
   */
  onProjectStatusSelect: function (combo, record, eOpts) {
    try{
    
    // var projectStoreStatus = Ext.getStore('projects.ProjectDashboardStore');
    var view = this.getView(),
        ProjectDashboardView = view.down('projectdashboardview'),
        projectStoreStatus = ProjectDashboardView.getStore();
    
    projectStoreStatus.clearFilter(true);
    combo.inputEl.dom.value = '';
    combo.collapse();
    statusData = [];
    for (i = 0; i < record.length; i++) {
      statusData.push(record[i]);
    }
    projectStoreStatus.filter(function (record) {
      if (statusData.length > 0 && statusData.includes(record.data.status)) {
        return true;
      } else if (statusData.length == 0) {
        projectStoreStatus.clearFilter(true);
        projectStoreStatus.reload();
      }
    });
    let statusValue1 = statusData[0] ? statusData[0] : '';
    let statusValue2 = statusData[1] ? statusData[1] : '';
    let statusValue3 = statusData[2] ? statusData[2] : '';
    if (statusValue1 != "" || statusValue2 != "" || statusValue3 != "") {
      let totalStatusValue = statusValue1 + " " + statusValue2 + " " + statusValue3;
      Utility.toastReuseFn('t', "<span style = 'color:green'>" + totalStatusValue + " projects are showing.</span>");
    }
  }catch(err){
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.STATUSSELECT, err);
  }
  },
  /**
   * The function onClickBackNavigate will perform when the  'beforequery' event  is fired in the  ProjectTabsView.js file.
   * this function will redirect to the projects page.
   * @param {Ext.button.Button} 'btn' when button is being clicked.
   * @param 'e' - click event.
   * @param {Object} 'eOpts' which is a object.
   */
  onClickBackNavigate: function (btn, e, eopts) {
    try {
      this.redirectTo('projects');
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.PROJECTPAGE, err);
    }
  },
  /**
   * The function onSelectProjectName will perform when the  'select' event  is fired in the  ProjectTabsView.js file.
   * What project we select This function will redirect to that page.
   * @param { Ext.form.field.Field} 'combo'which is the form field.
   * @param {Ext.data.Model} 'record' The selected record.
   * @param {Object} 'eOpts' which is a object.
   */
  onSelectProjectName: function (combo, record, eOpts) {
    try {
      this.redirectTo('projectdetails/' + record.data.project_id + "/notes");
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.PROJECTNAME, err);
    }
  },
  /**
   * The function onSelectProjectName will perform when the  'beforequery' event  is fired in the  ProjectTabsView.js file.
   * this function will search project in combo.
   */
  onSerchProjectName: function (search) {
    try {
      search.query = new RegExp(search.query, 'i');
      search.forceAll = true;
    } catch (err) {
      Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.SEARCHPROJECT, err);
    }
  },
   /**
    * The function onProjectSearchText is responsible to filter the records in the textfield.
    * @param {Ext.form.field.Text} 'field' the textfield. 
    * @param {Event} 'e' the  click event. 
    * @param {Object} 'eOpts' the events object. 
    */
  onProjectSearchText: function (field, e, eOpts) {
    try{
      // debugger;
      var view = this.getView(),
          ProjectDashboardView = view.down('projectdashboardview'),
         
          projectStore = ProjectDashboardView.getStore(),
          searchString = Ext.String.trim(field.getRawValue());
          // var projectsStatus = view.down('[reference = statustagview]').getValue();
          // for(var i=0; i< projectsStatus.length; i++){
    if (searchString) {
      projectStore.clearFilter(true);
      projectStore.filter(function (record) {
    //  var  statusvales = projectsStatus[i].toLowerCase(),
    //      statusdata = record.data.status.toLowerCase();
        //  debugger;
        if (record.data.name.toLowerCase().includes(searchString.toLowerCase())) {
             var projectsStatus = view.down('[reference = statustagview]').getValue();
          for(var i=0; i< projectsStatus.length; i++){
            if (record.data.status == projectsStatus[i]){
              return true;
            }
          }
        
        }
        else if (record.data.clientname != null) {
          if ((record.data.clientname.toLowerCase().search(new RegExp(searchString.toLowerCase(), 'gi')) == 0)) {
            return true;
          } else {
            return false;
          }
        } else if (record.data.technology_name != null) {
          var technologiesArr = record.data.technology_name;
          for (var i = 0; i < technologiesArr.length; i++) {
            if ((technologiesArr[i].toLowerCase().search(new RegExp(searchString.toLowerCase(), 'gi')) == 0)) {
              return true;
            }
          }
        } 
        else {
          return false;
        }
      }, this);
  
    
  }else if (searchString.length == 0) {
      projectStore.clearFilter(true);
      projectStore.reload();
    }
  // } 
  }catch(err){
    Utility.showToast(Messages.EXECUTIVEDASHBOARD.PROJECTVIEW.PROJSEARCH, err);
  }
  },
  onBackButtonClickView:function(btn){
    // debugger;
    var view = this.getView('[xtype = projectsview]');
     combobox = view.down('projectstabsview').down('[name = status]');
    combobox.reset();
    view.setActiveItem();
    ProjectDashboardView = view.down('projectdashboardview'),
    projectStoreStatus = ProjectDashboardView.getStore();
    projectStoreStatus.reload();
  },
  onNoteClick: function(btn){
    this.redirectTo('projectdetails/' + record.data.project_id + "/notes");
  }
});