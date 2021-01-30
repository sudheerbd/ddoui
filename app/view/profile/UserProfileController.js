 /**
 * This is controller for view 'DDO.view.profile.UserProfileController'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.userprofile'
 */
Ext.define('DDO.view.profile.UserProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userprofile',
    /**
     * The function onDetailsBtnClick is responsible to show the dynamic views of view profile and timeline.
     * @param {Ext.button.Button} 'btn' which is a view timeline button.
     */
    onDetailsBtnClick: function(btn) {
        try{
        var ref = this.getView().getReferences(),
            timelineRef = ref.profileuserview,
            timelineLayout = timelineRef.getLayout(),
            printBtn = ref.printBtn,
            projectHistory = ref.projectHistory,
            reportingManager=ref.reporting;
        if (projectHistory.getText() !== btn.getText()) {
            projectHistory.removeCls('detailsbutton');
            projectHistory.removeCls('timelinebutton');
            projectHistory.setText('Project History');
            projectHistory.addCls('nominatebutton');
        }
        if (reportingManager.getText() !== btn.getText()) {
            reportingManager.removeCls('detailsbutton');
            reportingManager.removeCls('timelinebutton');
            reportingManager.setText('Reporting Manager History');
            reportingManager.addCls('nominatebutton');
        }
        this.showTimelineView(btn,printBtn,timelineRef);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.DETAILSBUTTON, err);
    }
    },
  /**
   * The function showTimelineView is responsible to change the view as per the button click.
   * @param {Ext.button.Button} 'btn' the timeline button. 
   * @param {Ext.button.Button} 'printBtn' thje print button. 
   * @param {Ext.container.Container} 'timelineRef' which holds the profile user view. 
   */
    showTimelineView:function(btn,printBtn,timelineRef){
        if (btn.getText() === 'View Profile') {
            btn.removeCls('detailsbutton');
            btn.setText('View Timeline');
            btn.addCls('timelinebutton');
            printBtn.setHidden(false);
            timelineRef.setActiveItem(0);
        } else {
            btn.removeCls('timelinebutton');
            btn.setText('View Profile');
            btn.addCls('detailsbutton');
            printBtn.setHidden(true);
            timelineRef.setActiveItem(1);
        }
    },
     /**
     * The function onReportingHistoryClick is responsible to change the views dynamically with the reporting history button to the profile view
     * and to get the employee history from the node.
     * @param {Ext.button.Button} 'btn' the reporting history button. 
     * @param {Event} 'cmp' the click event. 
     */
    onReportingHistoryClick: function(btn, cmp) {
        try{
        var ref = this.getView().getReferences(),
        detailsBtn = ref.detailsBtn,
        projectHistory = ref.projectHistory;
        var profileuserview = this.getView().down('profileuserview'),
        timelineLayout= profileuserview.getLayout();
        var store = Ext.ComponentQuery.query('reportingview')[0].getStore();
        store.removeAll();
        var profileData = Ext.ComponentQuery.query('aboutlist')[0].getStore().getRange()[0].getData();
        this.getReportingManagerView(detailsBtn,btn,projectHistory); 
        if (btn.getText() === 'View Profile') {
        btn.removeCls('detailsbutton');
        btn.setText('Reporting Manager History');
        btn.addCls('nominatebutton');
        profileuserview.setActiveItem(0);
        } else {
            this.getAjaxRequestEmp(profileData,store,btn,profileuserview);
    }  
       }catch(err){
        Utility.showToast(Messages.USERPROFILE.PROJECTMANAGER, err);
       }
        },
 /**
  * The function getReportingManagerView is responsible for dynamically changing the button text and the stylings.
  * @param {Ext.button.Button} 'detailsBtn' which is the details button. 
  * @param {Ext.button.Button} 'btn' which is the nominate button. 
  * @param {Ext.button.Button} 'projectHistory' project history button. 
  */   
    getReportingManagerView : function(detailsBtn,btn,projectHistory){
        if (detailsBtn.getText() !== btn.getText()) {
            detailsBtn.removeCls('detailsbutton');
            detailsBtn.setText('View Timeline');
            detailsBtn.addCls('timelinebutton');
        }
        if (projectHistory.getText() !== btn.getText()) {
            projectHistory.removeCls('detailsbutton');
            projectHistory.setText('Project History');
            projectHistory.addCls('nominatebutton');
        }
     },
  /**
   * The function getAjaxRequestEmp is responsible for ajax call to get the data of the employee.
   * @param {object} 'profileData' which is the user profile data. 
   * @param {Ext.data.Store} 'store' reporting manager store. 
   * @param {Ext.button.Button} 'btn' which is the nominate button. 
   * @param {view} 'profileuserview' which is the user profile view. 
   */   
  getAjaxRequestEmp:function(profileData,store,btn,profileuserview){
    Ext.Ajax.request({
        scope: this,
        url: Api.URL.employeehistory.EMP_HISTORY,
        method: 'GET',
        params: {
        emp_id: profileData.ddo_employee_id
        },
        success: function(res, data) {
        var dta = Ext.decode(res.responseText).data;
        store.setData(dta);
        },
        failure: function(err, data) {}
        });
        btn.removeCls('nominatebutton');
        btn.setText('View Profile');
        btn.addCls('detailsbutton');
        profileuserview.setActiveItem(2);
  },
  /**
   * The functtion onProjectHistoryClick is responsible for dynamic changing of the view for the project history button with the profile view.
   * @param {Ext.button.Button} 'btn' which is the project history button. 
   * @param {Event} 'data' which is the click event. 
   */
    onProjectHistoryClick: function (btn, data) {
        try{
        var ref = this.getView().getReferences(),
            timelineRef = ref.profileuserview,
            timelineLayout = timelineRef.getLayout(),
            printBtn = ref.printBtn,
            detailsBtn = ref.detailsBtn,
            reportingManager=ref.reporting;
            this.setProjectHistoryView(detailsBtn,btn,reportingManager);
      
        if (btn.getText() === 'View Profile') {
            btn.removeCls('detailsbutton');
            btn.removeCls('timelinebutton');
            btn.setText('Project History');
            btn.addCls('nominatebutton');
            printBtn.setHidden(false);
            timelineRef.setActiveItem(0);
        } else {
            btn.removeCls('nominatebutton');
            btn.setText('View Profile');
            btn.addCls('detailsbutton');
            printBtn.setHidden(true);
            timelineRef.setActiveItem(3);
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.PROJECTHISTORY, err);
       }
    },
    /**
     * The function setProjectHistoryView is responsible for the dynamic view of the project historya nd the profile view based on the button text.
     * @param {Ext.button.Button} 'detailsBtn' which is the details button.
     * @param {Ext.button.Button} 'btn' projecthistory button.
     * @param {Ext.button.Button} 'reportingManager' the reporting manager button.
     */
    setProjectHistoryView:function(detailsBtn,btn,reportingManager){
        if (detailsBtn.getText() !== btn.getText()) {
            detailsBtn.removeCls('detailsbutton');
            detailsBtn.setText('View Timeline');
            detailsBtn.addCls('timelinebutton');
        }
        if (reportingManager.getText() !== btn.getText()) {
            reportingManager.removeCls('detailsbutton');
            reportingManager.setText('Reporting Manager History');
            reportingManager.addCls('nominatebutton');
        }
    },
    /**
     * The function onEditPersonelDetailsbtnClick is responsible for opening the window and set the gender based on the login details.
     * @param {Ext.button.Button} 'btn' edit personal details button.
     * @param {Event} 'data' the click event.
     * @param {object} 'empdetails' the options object passed.
     */
    onEditPersonelDetailsbtnClick: function (btn, data, empdetails) {
        try{
        var me = this;
        var win = this.getView().add(Ext.create({
            xtype: 'editpersoneldetailwindow',
            title: 'Personal Details',
            autoShow: true
        }));
        var vm = me.getViewModel(),
            personalDetailsStore = vm.getStore('employestore');
            personalDetailsStore.getProxy().setUrl('/employeedetail');
           personalDetailsStore.load({
               callback:function(records,success){
                var DDO_user_id = (Ext.getStore('login').getAt(0).get('ddo_employee_id'));
                var employeeDetails = personalDetailsStore.findRecord('empId', DDO_user_id);
                if (win) {
                    win.down('form').loadRecord(employeeDetails);
                    win.down('[name=gender]').setValue({
                        "gender": employeeDetails.data.personaldetails.gender
                    });
                    var addCheckBox = win.getReferences().checkbxRef;
                    var addDetails = employeeDetails.data.addresses;
                    if(addDetails.length > 0){
                        var sameAdd = addDetails[0].type;
                        if("same" === sameAdd){
                            addCheckBox.setValue(true);
                        }
                    }
                }
               }
           });
        }catch(err){
            Utility.showToast(Messages.USERPROFILE.EDITPERSONALDETAILS, err);
        }
    },
/**
 * This method handles the mouseover event on jobscontainer to show 'AddJob' button.
 */
    onJobsContainerMouseOver: function() {
        try{
        var userProfileContainer = this.getView().up();
        var jobscontainer = userProfileContainer.down('jobscontainer'),
            jobsform = userProfileContainer.down('addjobsform') || Ext.ComponentQuery.query('addjobsform')[0],
            jobdetailscontainer = jobscontainer.down('jobdetailsview'),
            viewModel = jobscontainer.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            if (jobsform) {
                jobscontainer.getViewModel().set('editing', true);
            } else {
                jobscontainer.getViewModel().set('editing', false);
            }
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDJOB, err);
    }
    },
    /**
     * The function onJobsContainerMouseLeave is responsible to hide the add job button when mouse hover leave.
     */
    onJobsContainerMouseLeave: function() {
        var jobscontainer = this.getView().up().down('jobscontainer'),
            viewModel = jobscontainer.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            jobscontainer.getViewModel().set('editing', true);
        }
    },
    /**
     * The function onEducationContainerMouseOver is responsible to make visible of add education button when mouse hover.
     */
    onEducationContainerMouseOver: function() {
        try{
        var userProfileContainer = this.getView().up();
        var jobscontainer = userProfileContainer.down('education'),
            jobsform = userProfileContainer.down('educationadddetails') || Ext.ComponentQuery.query('educationadddetails')[0],
            viewModel = jobscontainer.getViewModel(),
            editableImg = document.getElementsByClassName('editableimg'),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            if (jobsform) {
                jobscontainer.getViewModel().set('editing', true);
            } else {
                jobscontainer.getViewModel().set('editing', false);
            }
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDEDUCATION, err);
    }
    },
   /**
    * The function onEducationContainerMouseLeave is responsible to hide the button when the mouse hover leave.
    */
    onEducationContainerMouseLeave: function() {
        var userProfileContainer = this.getView().up();
        var jobscontainer = userProfileContainer.down('education'),
            jobsform = userProfileContainer.down('educationadddetails'),
            viewModel = jobscontainer.getViewModel(),
            editableImg = document.getElementsByClassName('editableimg'),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            if (jobsform) {
                jobscontainer.getViewModel().set('editing', false);
            } else {
                jobscontainer.getViewModel().set('editing', true);
            }
        }
    },
   /**
    * The function onInterestsContainerMouseOver is responsible to make visible of add interests button when mouse hover.
    */
    onInterestsContainerMouseOver: function() {
        try{
        var interestsView = this.getView().down('interestsview');
        var interestModel = interestsView.getViewModel(),
            textfield = interestsView.lookupReference('addtextfield');
        nonPersonal = interestModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            if (textfield.hidden != true) {
                interestModel.set('editing', true);
            } else {
                interestModel.set('editing', false);
            }
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDINTERESTS, err);
    }
    },
  /**
   * The function onInterestsContainerMouseLeave is responsible to make the add button in case of mouse hover leave.
   */
    onInterestsContainerMouseLeave: function() {
        var interestModel = this.getView().down('interestsview').getViewModel();
        nonPersonal = interestModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            interestModel.set('editing', true);
        }
    },
    /**
    The function onSkillsContainerMouseOver is responsible to how add skills button when mouse hover.
     */
    onSkillsContainerMouseOver: function() {
        try{
        var userProfileContainer = this.getView().up();
        var skillscontainer = userProfileContainer.down('profileskills'),
            skillsButton = skillscontainer.lookupReference('addskills'),
            skillsform = userProfileContainer.down('profileskillsform'),
            viewModel = skillscontainer.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            if (skillsform) {
                viewModel.set('editing', true);
            } else {
                viewModel.set('editing', false);
            }
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.ADDSKILLS, err);
    }
    },
   /**
    * The function onSkillsContainerMouseLeave is responsible to hide the add button when the mouse hover leave.
    */
    onSkillsContainerMouseLeave: function() {
        var skillscontainer = this.getView().up().down('profileskills'),
            skillsButton = skillscontainer.lookupReference('addskills'),
            viewModel = skillscontainer.getViewModel(),
            nonPersonal = viewModel.get('nonPersonalAcccess');
        if (nonPersonal === false) {
            viewModel.set('editing', true);
        }
    },
   /**
    * The function onPrintBtnClick is responsible to print the user profile data.
    */
    onPrintBtnClick: function() {
        try{
        var userProfileView = this.getView(),
            viewModel = userProfileView.getViewModel();
        if (userProfileView.printTpl.$className != "Ext.XTemplate") {
            userProfileView.printTpl = new Ext.XTemplate(userProfileView.printTpl);
        }
        var html = userProfileView.printTpl.apply(viewModel.getData().profiledata),
            win = window.open(' ');
        win.document.write(html);
        win.document.close();
        Ext.defer(function() {
            win.print();
            win.close();
        }, 250);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.PRINTUSERPROFILE, err);
    }
    },
    /**
     * The function showWalletAndKarmaHistory is responsible to set the viewmodel values with the current view model values.
     * @param {Event} 'field' the click event. 
     */
    showWalletAndKarmaHistory: function(field) {
        var me = this,
            historyWindow, historyWindowViewModel,
            walletHistoryStore, KarmaHistoryStore;
        // TODO:Check if a karmascore window already exists
        //and load data on activeTab 
        historyWindow = Ext.widget({
            xtype: 'walletkarmascoreview'
        });
        walletHistoryStore = Ext.getStore('widget.wallethistory.WalletHistoryStore');
        KarmaHistoryStore = Ext.getStore('widget.wallethistory.KarmaHistoryStore');
        historyWindowViewModel = historyWindow.getViewModel();
        if (historyWindow) {
            me.setWalletViewModel(historyWindowViewModel,me,KarmaHistoryStore,walletHistoryStore,historyWindow);
        }
    },
    /**
     * The function setWalletViewModel is responsible for setting the view model values of the wallet amount and the rewards points.
     * @param {viewmodel} 'historyWindowViewModel' walletkarmahistory viewmodel. 
     * @param {userprofile} 'me' which holds the userprofile view. 
     * @param {store} 'KarmaHistoryStore'  which is the karmahistorystore.
     * @param {store} 'walletHistoryStore' which is the wallethistorystore. 
     * @param {walletkarmascoreview} 'historyWindow' which holds the window view. 
     */
    setWalletViewModel:function(historyWindowViewModel,me,KarmaHistoryStore,walletHistoryStore,historyWindow){
        historyWindowViewModel.set('walletAmount', me.getViewModel().get('walletAmount'));
        historyWindowViewModel.set('rewardsPoint', me.getViewModel().get('rewardsPoint'));
        KarmaHistoryStore.load({
            params: {
                profileCbpid: Utility.profileAppeared
            }
        });
        walletHistoryStore.load({
            params: {
                profileCbpid: Utility.profileAppeared
            }
        });
        historyWindow.down('tabpanel').setActiveTab(Constants.SHOWTAB);
        historyWindow.show();
    },
    /**
     * The function showWalletHistory is fired from the afterWalletRender to show the wallet and karma history.
     * @param {Event} 'field' the click event. 
     */
    showWalletHistory: function(field) {
        var me = this;
        Constants.SHOWTAB = 0;
        me.showWalletAndKarmaHistory(field);
    },
    /**
     * The function showKarmaHistory is fired from afterKarmaScoreRender to show the wallet and karma history.
     * @param {Event} 'field' the click event. 
     */
    showKarmaHistory: function(field) {
        var me = this;
        Constants.SHOWTAB = 1;
        me.showWalletAndKarmaHistory(field);
    },
    /**
     * The function afterWalletRender is responsible to show the wallet window when clicked on the element.
     * @param {Ext.Component} 'cmp' 
     * @param {object} 'Optns' the options object passed. 
     */
    afterWalletRender: function(cmp, Optns) {
        try{
        var me = this;
        cmp.getEl().on({
            scope: me,
            click: me.showWalletHistory
        });
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.WALLETKARMASCORE, err);
    }
    },
    /**
     * The function afterKarmaScoreRender is responsible to show the karma history by clicking on the karma score.
     * @param {Ext.Component} 'cmp' the rendering component. 
     * @param {object} 'Optns' the options object passed. 
     */
    afterKarmaScoreRender: function(cmp, Optns) {
        try{
        var me = this;
        cmp.getEl().on({
            scope: me,
            click: me.showKarmaHistory
        });
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.WALLETKARMASCORE, err);
    }
    },

    
    /**
     * The function onNominateBtnClick is responsble to open the nominate window is to set the values in the view model and for the feed back.
     * @param {Ext.button.Button} 'btn' which is the nominate button. 
     */
    onNominateBtnClick: function(btn) {
        try{
        var nominateView, karmaStore,
            nomBtnGrp, nomRatingView,
            karmaComboView, nomWinController,
            nomViewModel, nomWindowForm,
            nomView, karmaCategoryViewStore,
            isFeedBack = false,
            nominateIcons,
            karmaId = null;
        Utility.nominateProjectId = null;
        karmaCategoryViewStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
        karmaStore = Ext.getStore('karmasetup.KarmaNominateStore');
        karmaCategoryViewStore.load({
            scope: this,
            callback: function (record, response, success) {
                nominateView = Ext.ComponentQuery.query('nominateviewwindow')[0] || Ext.create('DDO.view.profile.nominateview.NominateViewWindow');
                karmaStore.load({
                    scope: this,
                    callback: function (record, response, success) {
                        nomView = Ext.ComponentQuery.query('nominateothersviewform')[0];
                        nomWindowForm = nominateView.lookupReference('nominateviewform');
                        karmaComboView = nomWindowForm.down('combo[reference=nominatekarmacombo]');
                        nomcomboContainerRef = nomWindowForm.lookupReference('nominatecontainer');
                        nomWinController = nomWindowForm.getController();
                        //nomRatingView = nomWindowForm.lookupReference('nominateratingselectorref');
                       // nomBtnGrp = nomRatingView.down('buttongroup');
                        //nomSplitBtnRef = nomRatingView.down('splitbutton[reference=splitbtnref]');
                        nomTagField = nomWindowForm.down('tagfield[reference=comboTagview]');
                        nomWindowForm.down('[reference=karmaGivenDate]').setHidden(true);
                        var textarea = nomWindowForm.down('textarea');
                        if (textarea.hasCls('nominatehtmledit-top')) {
                            textarea.removeCls('nominatehtmledit-top');
                            textarea.addCls('profilenominatehtmledit-top');
                        };
                        // if (nomBtnGrp) {
                        //     nomBtnGrp.items.items.forEach(function (rec) {
                        //         if (rec.hasCls("nom-selected-btn-cls")) {
                        //             rec.removeCls("nom-selected-btn-cls");
                        //             rec.addCls("nominate-btn-cls");
                        //         }
                        //     });
                        // }
                        // if (nomRatingView.hasCls("nominate-detailview-cls")) {
                        //     nomRatingView.removeCls("nominate-detailview-cls");
                        //     nomRatingView.addCls("nominate-profiledetailview-cls");
                        // }
                        if (nomcomboContainerRef.hasCls("nominatecombocontainer")) {
                            nomcomboContainerRef.removeCls("nominatecombocontainer");
                            nomcomboContainerRef.addCls("nominateprofilecombocontainer");
                        }
                        nomViewModel = nomWindowForm.getViewModel();
                        // if (nomSplitBtnRef) {
                        //     nomSplitBtnRef.setText("Events");
                        // }
                        nomViewModel.set('iconSelection', null);
                        nomViewModel.set('points', 0);
                        nomViewModel.set('ratingView', true);
                        nomViewModel.set('ruleView', true);
                        nomViewModel.set('scoreText', null);
                        nominateIcons = nomWindowForm.down('nominateothersviewicons');
                        if (nominateIcons) {
                            var selModel = nominateIcons.getSelectionModel(), navModel;
                            selModel.deselectAll(true);
                            navModel = nominateIcons.getNavigationModel();
                            if (navModel && navModel.getLastFocused()) {
                                navModel.lastFocused = null;
                            }
                        }
                        nominateView.getViewModel().set('profileName', this.getViewModel().get('name'));
                        nomTagField.hide();
                        nomViewModel.set('nomBtn', false);
                        // if (nomBtnGrp) {
                        //     nomBtnGrp.items.items.forEach(function (rec) {
                        //         if (rec.text == "Feedback") {
                        //             isFeedBack = true;
                        //             rec.addCls("nom-selected-btn-cls");
                        //             karmaStore.clearFilter(true);
                        //             karmaStore.filterBy(function (rec) {
                        //                 if (rec.get('karmacategoryname') == "Feedback") {
                        //                     nomViewModel.set('categoryComboValue', rec.data.karmacategoryid);
                        //                     if ((rec.get('karmacategoryname') == "Feedback") && isFeedBack && (rec.get('name') == "Customer FeedBack")) {
                        //                         karmaId = rec.get('ddo_karma_id');
                        //                         // karmaComboView.setRawValue(rec.get('ddo_karma_id'));
                        //                         nomWinController.onKarmaComboSelect(karmaComboView, rec);
                        //                         return true;
                        //                     }
                        //                     return true;
                        //                 }
                        //                 return false;
                        //             });
                        //         }
                        //     });
                        // }
                        nomWindowForm.lookupReference('ratingcomment').setValue(null);
                        nomViewModel.set('karmaComboValue', karmaId);
                        nominateView.show();
                        nominateView.center();
                    }
                });
            }
        });
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.NOMINATECLICK, err);
    }
    },
    /**
     * The function onProfilePicChange is responsible to change the profile pic of the user in the profile.
     * @param {Ext.form.field.File} 'filefield' the file field. 
     * @param {string} 'value'  The file value returned by the underlying file input field
     * @param {object} 'eOpts' the options object passed.
     */
    onProfilePicChange: function (filefield, value, eOpts) {
        try{
        var scb = function (formPanel, action) {
            var text = Ext.JSON.decode(action.response.responseText),
                pathImg = text.data[0].user_profile_picture,
                loginStore = Ext.getStore('login'),
                userRecord = loginStore.getAt(0),
                feedStore = Ext.getStore('feeds');
            userRecord.set('user_profile_pic_url', pathImg);
            var circularProgressbarView = Ext.ComponentQuery.query('circularprogressview')[0];
            if (circularProgressbarView) {
                circularProgressbarViewModel = circularProgressbarView.getViewModel();
                circularProgressbarViewModel.set('user_profile_pic_url', pathImg)
            }
            if (feedStore) {
                //Karmascore store alias name is scoredetails
                var karmaScoreStore = Ext.getStore('widget.karmascore.KarmaScore') || Ext.getStore('scoredetails');
                karmaScoreStore.load();
                feedStore.load();
            }
            Ext.ComponentQuery.query('mainviewport')[0].getViewModel().set('profileImg', Api.URL.imageUrl + pathImg);
            Ext.ComponentQuery.query('userprofile')[0].getViewModel().set('profileImg', Api.URL.imageUrl + pathImg);
            Utility.toastReuseFn('t', AlertMessages.profilePicSuccess);
        };
        var fcb = function () {
            Utility.toastReuseFn('t', AlertMessages.profilePicFailure);
        };
        Utility.uploadImgFormatFn(this, filefield, Api.URL.profile.USER_PROFILE_PIC, scb, fcb);
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.UPLOADPHOTO, err);
    }
    },
   /**
    * The function onCoverPicChange is responsible to upload the user profilepic and the cover pic from the file field
     * @param {Ext.form.field.File} 'filefield' the file field. 
     * @param {string} 'value'  The file value returned by the underlying file input field
     * @param {object} 'eOpts' the options object passed. 
    */
    onCoverPicChange: function(filefield, value, eOpts) {
        // this code is commented because of AmazonS3 bucket code is implementing
        // var scb = function(formPanel, action) {
        //     var text = Ext.JSON.decode(action.response.responseText),
        //         pathImg = text.data[0].user_profile_cover;
            // Ext.ComponentQuery.query('userprofile')[0].getViewModel().set('profileBgUrl', Api.URL.imageUrl + pathImg);
        //     Utility.toastReuseFn('t', AlertMessages.coverPicSuccess);
        // };
        // var fcb = function() {
        //     Utility.toastReuseFn('t', AlertMessages.coverPicFailure);
        // };
        // Utility.uploadImgFormatFn(this, filefield, Api.URL.profile.USER_COVER_PIC, scb, fcb); 
        try{    
        var viewmodel = this.getViewModel(),
            file = filefield.fileInputEl.dom.files[0],
            format = file.type;
        if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
            AmazonS3.uploadFile(filefield, viewmodel).then(function (rec) {
                if (filefield.name == 'coverImage') {
                    viewmodel.set('profileBgUrl', Api.URL.imageUrl + rec);
                    Utility.toastReuseFn('t', AlertMessages.coverPicSuccess);
                 }
                 else if (filefield.name == 'profileImage') {
                    var loginStore = Ext.getStore('login'),
                        userRecord = loginStore.getAt(0),
                        feedStore = Ext.getStore('feeds');
                    userRecord.set('user_profile_pic_url', Api.URL.imageUrl + rec);
                    var circularProgressbarView = Ext.ComponentQuery.query('circularprogressview')[0];
                     // this.amazonProfilePic(rec,viewmodel);
                    if (circularProgressbarView) {
                        circularProgressbarViewModel = circularProgressbarView.getViewModel();
                        circularProgressbarViewModel.set('user_profile_pic_url', rec)
                    }
                    if (feedStore) {
                        //Karmascore store alias name is scoredetails
                        var karmaScoreStore = Ext.getStore('widget.karmascore.KarmaScore') || Ext.getStore('scoredetails');
                        karmaScoreStore.load();
                        feedStore.load();
                    }
                    Ext.ComponentQuery.query('mainviewport')[0].getViewModel().set('profileImg', Api.URL.imageUrl + rec);
                    viewmodel.set('profileImg', Api.URL.imageUrl + rec)
                }
        }); 
       }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.UPLOADPHOTO, err);
    }
    },
    /**
     * This method handles the loadprofiledata custom event on UserProfile.
     * @param {loadProxy} -true to load the store's proxy for each view
     *      - false to load the details from a manual request
     * @param [empId] This is the selected record's employee code for which the data needs to be loaded.
     */
    onLoadProfileData: function(loadProxy, empId, callback) {
        try{
        // TODO use some alternative instead of queries
        var me = this,
            vm = me.getViewModel(),
            query = Ext.ComponentQuery.query,
            jobsVM = query('jobscontainer')[0].getViewModel(),
            jobs = jobsVM && jobsVM.get('jobsdatastore'),
            about = query('aboutlist')[0].getStore(),
            timeline = query('usertimeline')[0].getStore(),
            projectHistory = query('projecthistoryview')[0].getStore(),
            skillsVM = query('profileskills')[0].getViewModel(),
            skills = skillsVM && skillsVM.get('profileskillsstore'),
            educationVM = query('education')[0].getViewModel(),
            education = educationVM && educationVM.get('educationdatastore'),
            interestVM = query('interestsview')[0].getViewModel(),
            interest = interestVM && interestVM.get('interestStore'),
            uploadBtns = query('profileheader filefield[opType=upload]'),
            options = {},
            stores, key, onReqSuccess, onReqFailure, i, ln;
        // recall this function if any of the above is not instantiated yet
        if (!(jobs && about && timeline && projectHistory && skills && education && interest /* && todolist*/ )) {
            Ext.defer(this.onLoadProfileData.bind(this, loadProxy, empId), 500);
            return;
        }
        interest.load({
            params: {
                employeeid: empId
            }
        });
        vm.set('profileEmpId', empId);
        // stores object with all the stores attached to iterate through
        stores = {
            jobs: jobs,
            about: about,
            skills: skills,
            education: education,
            interest: interest,
            timeline: timeline,
            projectHistory: projectHistory
        };
        var validUser = (Ext.getStore('login').getAt(0).get('ddo_employee_id') == empId) ? true : false;
        if (loadProxy || validUser) {
            vm.set('nominateAccess', true);
            interestVM.set('nonPersonalAcccess', false);
            educationVM.set('nonPersonalAcccess', false);
            jobsVM.set('nonPersonalAcccess', false);
            skillsVM.set('nonPersonalAcccess', false);
            me.getViewModel().set('nonPersonalA3cccess', false);
            // showing the todo list for personal access
            // todolist.show();
            for (i = 0, ln = uploadBtns.length; i < ln; i++) {
                uploadBtns[i] && uploadBtns[i].show();
            }

            // load the stores using default proxy
            for (key in stores) {
                if (key === 'about') {
                    options = {
                        scope: me,
                        callback: me.updateProfileHeaderDetails.bind(me, callback)
                    };
                } else {
                    options = {
                        scope: me,
                        callback: me.setProfileVmData.bind(me, callback, key)
                    };
                }
                stores[key].load(options);
            }
        } else if (empId) {
            // set editable false to hide appropriate items in profile view
            vm.set('nominateAccess', false);
            interestVM.set('nonPersonalAcccess', true);
            educationVM.set('nonPersonalAcccess', true);
            jobsVM.set('nonPersonalAcccess', true);
            skillsVM.set('nonPersonalAcccess', true);
            me.getViewModel().set('nonPersonalAcccess', true);
            // hiding the todo list for non-personal access
            // todolist.hide();
            for (i = 0, ln = uploadBtns.length; i < ln; i++) {
                uploadBtns[i] && uploadBtns[i].hide();
            }
            // success callback for the ajax request for profile details
            onReqSuccess = function(stores, data, response) {
                for (var key in stores) {
                    stores[key].setData(data[key]);
                }
                me.getViewModel().set('profiledata', data);
                if(stores){
                stores.projectHistory.clearData()
                if(stores.projectHistory.count() == 0){
                    stores.projectHistory.setData(data.projecthistory);
                  }
                }
                // setting the profile data
                me.updateProfileHeaderDetails(callback, data.about);
            };
            // failure callback for the ajax request for profile details
            onReqFailure = function(err) {
                console.log(err.type);
            };
            // request the details as per the selected empId
            Utility.fireAjax({
                url: Api.URL.profile.GETBYEMPID_BASE_URL + empId
            }, onReqSuccess.bind(this, stores), onReqFailure);
        }
        Ext.getStore('skillslist.ProfileSkillsStore').load({
            params: {
                employeeid: empId
            }
        });
        Ext.getStore('profile.ProjectSummaryStore').load({
            params: {
                employeeid: empId
            }
        });
        Ext.getStore('profile.AppAccessSummaryStore').load({
            params: {
                employeeid: empId
            }
        });
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.PROFILEDATA, err);
    }
    },
    /**
     * To set the profile page header details.
     * @param data The user details for the profile header 
     */
    updateProfileHeaderDetails: function(callback, data) {
        if (!Ext.isArray(data && Ext.isArray(data))) {
            data = data[0].data || data[0];
        }
        //Saving user about details ,and using the data fro nominate graphs
        Utility.userAboutData = data;
        if (data) {
            var dbFieldMap = {
                    /**
                     * dbFieldMap
                     * Maps the viewmodel data name to db column name.
                     *
                     * Note: last part of the db column name ( after the last _ ) 
                     * specifies the type of record to be expected from db.
                     * This is used to determine the default value for the entry.
                     */
                    name: 'name',
                    rewardsPoint: 'karmapoints',
                    walletAmount: 'walletpoints',
                    rating: 'rating_number', // not yet implemented in db
                    profileImg: 'user_profile_picture',
                    profileBgUrl: 'user_profile_cover',
                    designation: 'role',
                    projectCount: 'projectCount_number' // not yet implemented in db
                        // ,email: 'user_emilid_string'
                },
                defaultVal = {
                    number: 0,
                    string: '',
                    karmapoints: 0,
                    walletpoints: 0,
                    profileImg: data.user_profile_picture,
                    cover: Constants.DEFAULT_PROFILE_BG_URL
                },
                vm = this.getViewModel(),
                rel, column, value, type, key;
            for (key in dbFieldMap) {
                // determining type of data to set default values if undefined
                rel = dbFieldMap[key]
                type = rel.substr(rel.lastIndexOf('_') + 1);
                column = rel.substr(0, rel.lastIndexOf('_'));
                value = data[column] || data[rel] || defaultVal[type];
                // setting the values profile header data
                if(key=='profileImg' || key=='profileBgUrl'){
                    var imgValue=Utility.imageCheck(value);
                    vm.set(key,imgValue);
                }
                else{
                    vm.set(key, value);
                }
            }
        }
        if (callback) {
            callback({
                loaded: true
            });
        }
        var vm = this.getViewModel();
        vm.set('profiledata.about', data);
    },
    /**
     * The function setProfileVmData is responsible to set the view model data while rendering the user profile page.
     * @param {string} 'key' which holds the string data.
     * @param {array} 'data' which is an array. 
     */
    setProfileVmData: function(callback, key, data) {
        var vm = this.getViewModel(),
            formattedData = [];
        if (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                formattedData.push(data[i].data || data[i]);
            }
            vm.set('profiledata.' + key, formattedData);
        }
    },
 
   /**
     * The function onsendresignation is responsible for opening the resignation window by clicking on the button.
     */
    onsendresignation:function(){
        try{
        var win =this.getView().add(Ext.create({
            xtype:'resignationwindow',
            title:'Resignation Window',
            autoShow: true
        }))
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.SENDRESIGNATION, err);
    }
    },
  /**
   * The function onActivatingUserProfile is responsible to hide the send reignation and edit personal details based on the login user.
   */  
    onActivatingUserProfile:function(){
        try{
       var view_location = window.location,
       hash = view_location.hash,
       id = hash.substr(9),
       num=Number(id);
       var vm = this.getViewModel(),
       logIn_Id = Ext.getStore('login').getRange()[0].data.ddo_employee_id,
       userProView = this.getView(),
       profileRefs = userProView.getReferences(),
       detailsArray=[];
       if (hash == '#profile/user' || num == NaN || num == logIn_Id) {
           var vm = this.getViewModel();
           vm.set('sendresignation', false);
           vm.set('editpersoneldetailbutton', false);
           if (num == logIn_Id){
            var empStore = vm.storeInfo.employestore;
            empStore.load({
             callback: function(records,operation,success){
                   if(success == true){
                       var filteredArray = records.filter(function(value){
                     var empid = value.data.basic.ddo_employee_id;
                     return empid == id;
                       })
                       var filteredRecord = filteredArray[0];
                       filteredRecord.data.managerHr.forEach(value => {
                         detailsArray.push(value.ddo_employee_id)
                     })
                    //  detailsArray.push(filteredRecord.data.basic.ddo_employee_id);
                    //  detailsArray.push(filteredRecord.data.workdetails.reportingto);
                     var empstatus = filteredRecord.data.workdetails.empstatus;
                    if(empstatus =="Probation"){
                        profileRefs.provitiontocnfm.show(); 
                    }else{
                        profileRefs.provitiontocnfm.hide();
                    }
                    }
                }
           })
        }
       } 
       else {
           var empStore = vm.storeInfo.employestore;
       empStore.load({
        callback: function(records,operation,success){
              if(success == true){
                  var filteredArray = records.filter(function(value){
                var empid = value.data.basic.ddo_employee_id;
                return empid == id;
                  })
                  var filteredRecord = filteredArray[0];
                  filteredRecord.data.managerHr.forEach(value => {
                    detailsArray.push(value.ddo_employee_id)
                })
                detailsArray.push(filteredRecord.data.basic.ddo_employee_id);
                detailsArray.push(filteredRecord.data.workdetails.reportingto);
                var empstatus = filteredRecord.data.workdetails.empstatus; 
                 if(detailsArray.includes(logIn_Id) && empstatus == "Probation"){
                     profileRefs.provitiontocnfm.show();
                 }else{
                    profileRefs.provitiontocnfm.hide();
                 }
              }else{
                Ext.Msg.alert('Error', 'Error loading employee store');
              }
        },
        scope:this
  });

        //    var vm = this.getViewModel();
           vm.set('sendresignation', true);
           vm.set('editpersoneldetailbutton', true);
       }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.RESIGNATIONPERSONALDETAILS, err);
    }
   },
 
    // onProjectSummaryItemClick: function(view, record, item, idx, evt, opts) {
    //     var me, targetDom,
    //         targetEl, projectCode;
    //     me = this;
    //     targetDom = evt.getTarget();
    //     targetEl = Ext.get(targetDom);
    //     if (targetEl.hasCls('ddo-project-summary-name')) {
    //         projectCode = record.get('project_id');
    //         me.redirectTo('projectdetails/' + projectCode + "/people");
    //     }
    // },
//    },
   onProjectSummarybtnClick: function(btn){
    var me = this;
    var win = this.getView().add(Ext.create('DDO.view.profile.projectsummary.ProjectSummarywin',{
        title: 'Project Summary',
        autoShow: true
    }));      
   },



   onProvitiontocnfmbtnClick: function(btn,data){
       var ref = this.getView().getReferences(),
            timelineRef = ref.profileuserview,
            timelineLayout = timelineRef.getLayout(),
            printBtn = ref.printBtn,
            detailsBtn = ref.detailsBtn,
            reportingManager=ref.reporting;
            // this.setProjectHistoryView(detailsBtn,btn,reportingManager);
      
        if (btn.getText() === 'Probation to Confirmation') {
            btn.removeCls('detailsbutton');
            btn.removeCls('timelinebutton');
            btn.setText('View Profile');
            btn.addCls('nominatebutton');
            printBtn.setHidden(false);
            var profileData = this.getView().getViewModel().getData().profiledata,
            emailID = profileData.about.user_emilid,
            employeeID = profileData.about.ddo_employee_id,
            probabitionCnfmGrid = timelineRef.items.items[4],
            store = probabitionCnfmGrid.getStore();
            store.getProxy().setExtraParams({"employeeid": employeeID});
            store.load();
            probabitionCnfmGrid.mailID = emailID;
            timelineRef.setActiveItem(4);
        }
        else if (btn.getText() === 'View Profile') {
            btn.removeCls('detailsbutton');
            btn.setText('Probation to Confirmation');
            btn.addCls('timelinebutton');
            printBtn.setHidden(false);
            timelineRef.setActiveItem(0);
            // timelineRef.setActiveItem(0);
        } 
   }
});


