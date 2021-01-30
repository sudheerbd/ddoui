/**
 * This is controller file for DDO.view.main.Viewport.
 * @extends 'Ext.app.ViewController'
 * @alias 'viewmodel.mainviewport'
 */
Ext.define('DDO.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',
    listen: {
        controller: {
            '*': {
                newfeedincrement: 'onNewFeedNotification'
            }
        },
        global: {
            redirecttoprofile: 'redirectToProfile'
        }
    },
    routes: {
        ':node': {
            action: 'onRouteChange',
            before: 'validateSession'
        },
        'profile/:empId': {
            action: 'onProfileChange',
            before: 'checkPersonalAccess'
        },
        'karmascoresearch': {
            action: 'showKarmaScoreWindow'
        },
        'karmasetup': {
            action: 'karmasetupClearFilters'
        },
        'findapplication': {
            action: 'findApplication'
        }
    },

    /**
     * The function onProfileChange is perform when the 'action' event is fired
     * from ViewportCOntroller.js .
     * This function is responsible for Profile route change handler.
     * @param 'empId' - The employee id whose profile needs to be accessed
     */
    onProfileChange: function (empId) {
        try{
        Ext.getBody().mask('');
        this.onRouteChange(empId, 'profile');
        } catch (err) {
            Utility.showToast(Messages.VIEWPORT.PROFILECHNAGE, err);
        }
    },

    /**
     * This method is called before the profile route change is called,
     * to check if the profile page that is accessed is the current user's
     * profile or another user's profile and process the route accordingly.
     * @param 'empId' - The employee id whose profile needs to be accessed
     * @param 'action' - The route change action object
     */
    checkPersonalAccess: function (empId, action) {
        try{
        var me = this,
            onCheckSessionSuccess = function (data, responseData) { // success callback for validating the session
                if (responseData.session) { // session exists
                    var cfg;
                    if (empId !== 'user') { // requesting user details from the valid session for current user
                        cfg = {
                            url: "/auth/userdetails",
                            method: "GET",
                            params: {}
                        };
                        Utility.fireAjax(cfg, successCb, failureCb);
                    } else { // if current user profile
                        me.postLoginInitialization(function () {
                            action.resume();
                        });
                    }
                } else { // if no session redirect to login
                    action.stop(true);
                    me.postLogoutCleaning();
                    me.redirectTo('login');
                }
            },
            successCb = function (data, response) {   // success callback for current userdetails request
                me.postLoginInitialization(function () {
                    action.resume();
                });
            },
            failureCb = function () {  // failure callback for current userdetails request
                action.stop(true);
            };
        me.validateSession(null, action, onCheckSessionSuccess);
        } catch (err) {
            Utility.showToast(Messages.VIEWPORT.PERSONALACCESS, err);
        }
    },
    /**
     * The function validateSession will validate the login credentials.
     * @param 'hashTag'- which is containing the new selected view.
     * @param 'action' - Which is an Object.
     * @param 'successCb' - success callback function for current userdetails request.
     * @param 'failureCb' - failure callback function for current userdetails request.
     */
    validateSession: function (hashTag, action, successCb, failureCb) {
        try{
        var me = this;
        var loginView = me.getView().up('loginview');
        var keycloak = KeycloakLoader.getKeycloak();
        if (!keycloak) {
            KeycloakLoader.initialize();
            keycloak = KeycloakLoader.getKeycloak();
        }
        var token = sessionStorage.getItem('authentication');
        var refreshToken = sessionStorage.getItem('refreshToken');
        if (token) {
            keycloak.init({
                onLoad: 'login-required',
                 checkLoginIframe: false,
                token,
                refreshToken
            }).success(function (authenticated) {
                if (authenticated == true) {
                    me.ifAuthenticatTrue(me, keycloak, token, refreshToken, sessionStorage, hashTag, action);
                } else {
                    me.ifAuthenticatNotTrue(me, keycloak, token, refreshToken, sessionStorage, hashTag, action);
                }
            });
        } else {
            loginView.getLayout().setActiveItem(1);
            action.stop(true);
            me.redirectTo('login');
        }
    } catch (err) {
            Utility.showToast(Messages.VIEWPORT.VALIDATE, err);
         }
    },
    /**
     * In This function if the credentials is valid and Authentication is true then it will open the home page.
     * @param {Ext.app.ViewController} me - which is containing the viewport Controller reference.
     * @param {*} token - containing the authentication.
     * @param {*} refreshToken - which is containing the refreshToken item.
     * @param {*} hashTag - which is containing the new selected view.
     * @param {*} action -  Which is an Object.
     */
    ifAuthenticatTrue: function (me, keycloak, token, refreshToken, sessionStorage, hashTag, action) {
        // try{
            
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        Ext.Ajax.setDefaultHeaders({
            'Authorization': 'Bearer ' + keycloak.token
        });
        me.postLoginInitialization(function () {
            if (hashTag === "login" || hashTag === "forgetpasswordview") {
                if (typeof (action) == 'object') {
                    action.stop(true);
                }
                me.redirectTo("home");
            } else {
                if (typeof (action) == 'object') {
                    action.resume();
                }
            }
        }, keycloak.tokenParsed.email);
    // } catch (err) {
    //     Utility.showToast(Messages.VIEWPORT.AUTHENTICAT, err);
    //  }
    },
    /**
     * This function will redirect to lofin page if AuthenticatNo is failed.
     * @param {Ext.app.ViewController} me - which is containing the viewport Controller reference.
     * @param {*} token - containing the authentication.
     * @param {*} refreshToken - which is containing the refreshToken item.
     * @param {*} hashTag - which is containing the new selected view.
     * @param {*} action -  Which is an Object.
     */
    ifAuthenticatNotTrue(me, keycloak, token, refreshToken, sessionStorage, hashTag, action) {
        try{
            // debugger;
        keycloak.updateToken().success(function (res) {
            if (res == true) {
                sessionStorage.setItem('authentication', keycloak.token);
                sessionStorage.setItem('refreshToken', keycloak.refreshToken);
                Ext.Ajax.setDefaultHeaders({
                    'Authorization': 'Bearer ' + keycloak.token
                });
                action.stop(true);
                me.redirectTo('home');
            }
        }).error(function () {
            action.stop(true);
            me.onLogoutClick();
            me.redirectTo('login');

        });
      } catch (err) {
        Utility.showToast(Messages.VIEWPORT.AUTHENTICAT, err);
     }
    },
    /**
     * The function setCurrentView will set the current view page according to the user select view page.
     * @param 'hashTag'- which is containing the new selected view.
     */
    setCurrentView: function (hashTag, prefix) {
        // try {
            // debugger;
        hashTag = (hashTag || '').toLowerCase();
        if (Ext.getStore('login').getAt(0).getData().empcode === hashTag && prefix === "profile") {
            hashTag = 'user';
        }
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            navigationList = refs.navigationTreeList,
            viewModel = me.getViewModel(),
            logo = me.getView().lookupReference('senchaLogo'),
            vmData = viewModel.getData(),
            karmascore = Ext.ComponentQuery.query('yourkarmascore')[0],
            todoGrid,
            maincontainerwrap,
            projectView,
            args, mainLayout, store;
        if (Ext.ComponentQuery.query('karmascoresearch')[0] && Ext.ComponentQuery.query('karmascoresearch')[0].isVisible()) {
            Ext.ComponentQuery.query('karmascoresearch')[0].hide();
        }
        if (Ext.ComponentQuery.query('tododetailview')[0] && Ext.ComponentQuery.query('tododetailview')[0].isVisible()) {
            Ext.ComponentQuery.query('tododetailview')[0].hide();
        }
        // me.mainLayoutFunction(mainCard ,navigationList ,store ,hashTag ,logo ,karmascore);
        if (mainCard) {
            mainLayout = mainCard.getLayout();
            store = navigationList.getStore();
        }
        if (!store) {
            return;
        }
        var adjustYourKarmaScoreWidget = function () {
            if (karmascore && karmascore.hasCls('fixed')) {
                karmascore.removeCls('fixed');
                viewModel.set('scrolltopbtn', true);
            }
        };
        if (hashTag == "home") {
            Ext.getStore('feeds.Groups').load();
            if (logo.hasCls('sencha-add-logo')) {
                logo.removeCls('sencha-add-logo')
            }
            adjustYourKarmaScoreWidget();
        } else {
            if (!logo.hasCls('sencha-add-logo')) {
                logo.addCls('sencha-add-logo')
            }
        }

        // if(hashTag== "holidays"){
        //     debugger;
        // }
        if (hashTag == "groups") {
            adjustYourKarmaScoreWidget();
        }
        var node = store.findNode('routeId', hashTag),
            view = node ? node.get('view') : null,
            lastView = vmData.currentView,
            routeId = prefix || hashTag,
            existingItem = mainCard.child('component[routeId=' + routeId + ']'),
            newView, loadedCb,
            peopleViewStore = Ext.getStore('projects.people.PeopleViewStore'),
            projectViewStore;
        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }
        // if (hashTag.match(/projectdetails/g) && ((hashTag.split('/').length > 1) && (hashTag.split('/').length < 4))) {debugger
        //     projectView = Ext.ComponentQuery.query('projectsview')[0];

        //     PeopleViewStore = Ext.getStore('projects.people.PeopleViewStore'),
        //         store = Ext.getStore('projects.ProjectDashboardStore'),
        //         data;
        //     mainViewModel = Ext.ComponentQuery.query('mainviewport')[0].getViewModel();
        //     mainViewModel.set('projectNewResources', true);

        //     view = 'projects.ProjectsView';

        //     data = store.findRecord('project_id', hashTag.split('/')[1]);
        //     projectId = this.getViewModel().get('projectId');
        //     var tabsView = Ext.ComponentQuery.query('projectstabsview')[0];

        //     if (tabsView) {
        //       var project_combo=tabsView.down('[name=projectSelect]');
        //         projectToolbar = tabsView.down('container[reference="projectstoolbar"]');
        //         //projectToolbar.down('combobox').setValue(data.data.status);
        //         project_combo.setValue('');
        //     }
        //     if (Utility.projectPeopleId == hashTag.split('/')[1]) {
        //         Utility.projectPeopleId++
        //     }
        //     if ((projectId && data.data.project_id != projectId) || Utility.projectPeopleId != hashTag.split('/')[1]) {

        //         if (data) {
        //             this.getViewModel().set('projectId', data.data.project_id);
        //         }
        //         PeopleViewStore.load({
        //             scope: this,
        //             callback: function (st, e, eopts) {
        //                 var form = Ext.ComponentQuery.query('peopleform')[0];

        //                 if (form) {
        //                     var btn = form.down('button');
        //                 }

        //                 var peopleView = Ext.ComponentQuery.query('peopleview')[0];

        //                 if (peopleView) {
        //                     var viewModel = peopleView.getViewModel();
        //                     var stData = [];

        //                     PeopleViewStore.each(function (rec) {
        //                         if (stData.length > 0) {
        //                             var exist = false;
        //                             for (var p = 0; p < stData.length; p++) {
        //                                 if (stData[p].get('cbpid') == rec.get('cbpid')) {
        //                                     exist = true;
        //                                 }
        //                             }
        //                             if (!exist) {
        //                                 stData.push(rec);
        //                             }
        //                         } else {
        //                             stData.push(rec);
        //                         }
        //                     });

        //                     viewModel.set('totalPeople', stData.length);
        //                 }
        //                 Ext.getBody().unmask('');
        //             }
        //         });

        //     }
            //commennted this code as this is causing the store load issue.    
            /*if(!Ext.getStore('projects.NotesStore').isLoaded()) {
                var pro_id = ((data) ? data.data.project_id : hashTag.split('/')[1]);
               
                Ext.getStore('projects.NotesStore').load({
                    params: {
                        projectId: pro_id
                    }
                });                
            }*/
            // if (projectView) {
            //     existingItem = projectView;
            //     projectView.setActiveItem(1);

            //     var tabsView = Ext.ComponentQuery.query('projectstabsview')[0],
            //         projectToolbar = tabsView.down('container[reference="projectstoolbar"]'),
            //         tabDetailView = tabsView.down('projectstabsdetailsview'),
            //         splitValue = hashTag.split('/'),
            //         store = Ext.getStore('projects.ProjectDashboardStore'),
            //         data;

            //     /* if (!store.isLoaded()) {
            //          store.load();
            //      }*/

            //     data = store.findRecord('project_id', hashTag.split('/')[1]);
            //     tabsView.up('projectsview').getViewModel().set('activeProData', data.data);

            //     if (splitValue.length === 2) {

            //         tabsView.down('dataview').setData(data);
            //         projectToolbar.items.items[0].setPressed(true);
            //         tabDetailView.setActiveItem(projectToolbar.items.items[0].text.toLowerCase());
            //         //Load the notes related to selected project
            //         var pro_id = ((data) ? data.data.project_id : hashTag.split('/')[1]);
            //         Ext.getStore('projects.NotesStore').load({
            //             params: {
            //                 projectId: pro_id
            //             }
            //         });
            //         // Ext.getStore('projects.TechnologiesStore').load({
            //         //     params: {
            //         //         projectId: pro_id
            //         //     }
            //         // });

            //     } else if (splitValue.length === 3) {
            //         tabsView.down('dataview').setData(data);
            //         me.toggleTreeList(false);

            //         for (var i = 0, len = projectToolbar.items.items.length; i < len; i++) {
            //             if (projectToolbar.items.items[i].text) {
            //                 if (projectToolbar.items.items[i].text.toLowerCase() === splitValue[2]) {
            //                     projectToolbar.items.items[i].setPressed(true);
            //                 }
            //             }
            //         }

            //         if (splitValue[2] === 'notes') {
            //             var notesToolbar = Ext.ComponentQuery.query('notestoolbar')[0],
            //                 notesStore = Ext.getStore('projects.NotesStore');
            //             if (notesToolbar) {
            //                 notesToolbar.reset();
            //                 notesStore.clearFilter(true);
            //             }
            //             Ext.getStore('projects.NotesStore').load({
            //                 params: {
            //                     projectId: data.data.project_id
            //                 }
            //             });
            //         }
            //          else if (splitValue[2] === 'mom') {
            //             if (data && data.data.project_id) {
            //                 Ext.getStore('projects.MOMViewStore').load({
            //                     params: {
            //                         projectId: data.data.project_id
            //                     }
            //                 });
            //             }
            //         }   else if (splitValue[2] === 'actionitemview') {
            //              if (data && data.data.project_id) {
            //                  Ext.getStore('projects.MOMViewStore').load({
            //                      params: {
            //                          projectId: data.data.project_id
            //                      }
            //                  });
            //              }
            //          }else if (splitValue[2] === 'people') {
            //             Utility.recCountValues = [];
            //             Utility.empDes = null;
            //             var peopleView = Ext.ComponentQuery.query('peopleview')[0];
            //             if (peopleView) {
            //                 var searchPeople = peopleView.down('textfield[reference = "searchpeople"]');
            //                 searchPeople.setValue('');
            //             }
            //         } else if (splitValue[2] === 'technologies') {
            //             var pro_id = ((data) ? data.data.project_id : hashTag.split('/')[1]);
            //             // Ext.getStore('projects.TechnologiesStore').load({
            //             //     params: {
            //             //         projectId: pro_id || data.data.project_id
            //             //     }
            //             // });
            //         }

            //         tabDetailView.setActiveItem(splitValue[2]);
            //         // var peopleViewStores = Ext.getStore('projects.people.PeopleViewStore');
            //         // peopleViewStores.clearFilter(true);

            //     }
            // }
        //} 
        // else if (existingItem && hashTag === 'projects') {
        //     projectView = Ext.ComponentQuery.query('projectsview')[0];
        //     projectView.setActiveItem(0);
        // }
         else if (existingItem && (hashTag === 'allappsmain' ||
                hashTag === 'accesscontrolmain' || hashTag === 'myappsmain')) {
            var allAppView, store, allAppCombo, allAppSearch;

            allAppView = Ext.ComponentQuery.query(hashTag)[0];
            allAppCombo = allAppView.down('combo[name=searchCombo]');
            allAppSearch = allAppView.down('textfield[name=searchText]');
            allAppCombo.clearValue();
            allAppSearch.setValue('');
            store = allAppView.down('grid').getStore();
            store.clearFilter();
            store.reload();
            if (hashTag === 'allappsmain') {
                allAppView.setActiveItem(0);
            } else {
                allAppView.down('combo[name=statusCombo]').setValue('All');
            }
        }

        if (viewModel.get('nonRoleRouteId') &&
            viewModel.get('nonRoleRouteId') == hashTag) {
            existingItem = null;
            view = null;
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            if (view !== null) {
                if (hashTag == "goals") {

                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                } else if (hashTag == "create") {

                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                } else if (hashTag == "allappsmain" || hashTag == 'accesscontrolmain' || hashTag == 'myappsmain') {
                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                } else if (hashTag == "jobopeningslist") { // for talentacquistion

                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });

                } else if (hashTag == "jobapplications") { // for talentacquistion

                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });

                } else if (hashTag == "alljobapplications") { // for talentacquistion

                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });

                } else if (hashTag == "interviewrequest") {
                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                } else if (hashTag == "referrals") {
                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                } else if (hashTag == "applicationenquiry") {
                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                } else if (hashTag == "preferences") {
                    newView = Ext.create(view, {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                } else {
                    newView = Ext.create('DDO.view.' + (view || 'pages.Error'), {
                        hideMode: 'offsets',
                        routeId: hashTag
                    });
                }
            } else if (prefix === 'profile') {
                newView = Ext.create('DDO.view.' + ('profile.UserProfile' || 'pages.Error'), {
                    hideMode: 'offsets',
                    routeId: prefix,
                    empId: hashTag
                });

                Ext.getBody().unmask();

            } else {
                if (Ext.getCmp('Error')) {
                    existingItem = 'Error';
                } else {
                    newView = Ext.create('DDO.view.pages.Error', {
                        hideMode: 'offsets',
                        routeId: 'pageError'
                    });
                }
            }
        }

        /*to show inital screens - Talent Acquisition*/
        if (Ext.ComponentQuery.query('[reference = jobmainview]')[0]) {
            Ext.ComponentQuery.query('[reference = jobmainview]')[0].getLayout().setActiveItem(0);
            Ext.ComponentQuery.query('jobopeningsrequestlistview')[0].getViewModel().getStore('jobOpeningDataViewStore').load();
            var tagPanel = Ext.ComponentQuery.query("jobopeningsfilterview"),
                tagPanelItm = tagPanel[0].items.items;
            tagPanelItm[3].hide();
            tagPanelItm[4].hide();
            tagPanelItm[5].hide();

            var getDataStore = Ext.ComponentQuery.query('jobopeningsrequestlistview')[0].down('dataview').getStore();
            getDataStore.removeFilter("filterByLocation");
            getDataStore.removeFilter("filterByDepartment");
            getDataStore.removeFilter("filterByDate");
        }

        /*to show inital screens - Talent Acquisition*/

        if (Ext.ComponentQuery.query('[reference = jobdataview]')[0] && (hashTag.match(/jobopeningslist/g))) {
            var jobSearchField = Ext.ComponentQuery.query('[reference = jobsearchref]')[0],
                jobStatusCombo = Ext.ComponentQuery.query('[reference = jobstatuscomboref]')[0],
                jobDataView = Ext.ComponentQuery.query('[reference = jobdataview]')[0],
                jobForm = Ext.ComponentQuery.query('[reference = jobform]')[0];

            Ext.ComponentQuery.query('[reference = jobdataview]')[0].getStore().load();
            Ext.ComponentQuery.query('[reference = jobstatuscomboref]')[0].getStore().load();
            jobSearchField.setValue("");
            jobStatusCombo.setValue(null);
            jobStatusCombo.getStore().clearFilter();
            jobDataView.getStore().clearFilter();
            jobDataView.refresh();
            jobForm.reset();
        }
        /* for job interview request - talent acquisition*/
        if (Ext.ComponentQuery.query('[reference = interviewdatalistview]')[0]) {
            var jobSearchField = Ext.ComponentQuery.query('[reference = jobsearchref_interv_req]')[0],
                jobDataView = Ext.ComponentQuery.query('[reference = interviewdatalistview]')[0];

            jobSearchField.setValue("");
            jobDataView.getStore().clearFilter();
            jobDataView.refresh();

            Ext.ComponentQuery.query('[reference = interviewreference]')[0].getLayout().setActiveItem(0);
            Ext.ComponentQuery.query('interviewrequestdesign')[0].getViewModel().getStore('interviewRequestListStore').load({
                params: {
                    loginuser_id: Ext.getStore('login').data.items["0"].data.ddo_employee_id
                }
            });
        }

        /* for job application - talent acquisition*/
        if (Ext.ComponentQuery.query('[reference = jobapplieddataview]')[0]) {
            var jobSearchField = Ext.ComponentQuery.query('[reference = jobsearchref_job_app_all]')[0],
                jobSearchField2 = Ext.ComponentQuery.query('[reference = jobsearchref_job_applied]')[0],
                jobStatusCombo = Ext.ComponentQuery.query('[reference = jobstatuscomboref]')[0],
                jobDataView = Ext.ComponentQuery.query('[reference = jobapplieddataview]')[0],
                jobDataView2 = Ext.ComponentQuery.query('[reference = jobapplicationdataview]')[0],
                obj = {
                    'property': 'ddo_jobopeningstatus_id',
                    'value': 1
                };

            Ext.ComponentQuery.query('[reference = jobapplieddataview]')[0].getStore().load();
            Ext.ComponentQuery.query('[reference = jobstatuscomboref]')[0].getStore().load();
            Ext.ComponentQuery.query('[reference = interviewtyperef]')[0].getStore().load();
            Ext.ComponentQuery.query('[reference = interviewmoderef]')[0].getStore().load();
            jobSearchField.setValue("");
            jobSearchField2.setValue("");
            jobStatusCombo.setValue(null);
            jobStatusCombo.getStore().clearFilter();
            jobDataView.getStore().clearFilter();
            jobDataView2.getStore().clearFilter();
            jobDataView.getStore().addFilter(obj);
            jobDataView.refresh();
            jobDataView2.refresh();

            Ext.ComponentQuery.query('[reference = jobapplicationreference]')[0].getLayout().setActiveItem(0);
            //Ext.ComponentQuery.query('jobapplicationrequest')[0].getViewModel().getStore('jobApplicationsDataViewStore').load();

            var tagPanel = Ext.ComponentQuery.query("jobapplicationfilterview"),
                tagPanelItm = tagPanel[0].items.items;
            tagPanelItm[3].hide();
            tagPanelItm[4].hide();
            tagPanelItm[5].hide();

            var getDataStore = Ext.ComponentQuery.query('jobapplicationrequest')[0].down('dataview').getStore();
            getDataStore.removeFilter("filterByLocation");
            getDataStore.removeFilter("filterByDepartment");
            getDataStore.removeFilter("filterByDate");
        }

        if (Ext.ComponentQuery.query('[reference = interviewdataview]')[0] && (hashTag.match(/interviewrequest/g))) {
            var interviewSearchField = Ext.ComponentQuery.query('[reference = jobsearchref]')[0],
                interviewDataView = Ext.ComponentQuery.query('[reference = interviewdataview]')[0];

            Ext.ComponentQuery.query('[reference = interviewdataview]')[0].getStore().load();
            interviewSearchField.setValue("");
            interviewDataView.getStore().clearFilter();
            interviewDataView.refresh();
        }
        //For All Job Applications
        // if (Ext.ComponentQuery.query('[reference = alljobapplicationreference]')[0] && (hashTag.match(/alljobapplications/g))) {
        //     var interviewSearchField = Ext.ComponentQuery.query('[reference = jobsearchref]')[0];
        //         // interviewDataView = Ext.ComponentQuery.query('[reference = interviewdataview]')[0];

        //     Ext.ComponentQuery.query('[reference = interviewdataview]')[0].getStore().load();
        //     interviewSearchField.setValue("");
        //     interviewDataView.getStore().clearFilter();
        //     interviewDataView.refresh();
        // }
        /* for job referrals - talent acquisition*/
        if (Ext.ComponentQuery.query('[reference = jobdataviewreferrals]')[0]) {
            var jobSearchField = Ext.ComponentQuery.query('[reference = jobsearchref_job_referrals]')[0],
                jobSearchField2 = Ext.ComponentQuery.query('[reference = jobsearchref_job_ref]')[0],
                obj = {
                    'property': 'ddo_jobopeningstatus_id',
                    'value': 1
                },
                jobDataView = Ext.ComponentQuery.query('[reference = jobdataviewreferrals]')[0];
            jobDataView2 = Ext.ComponentQuery.query('[reference = jobmyreferralsdata]')[0];

            Ext.ComponentQuery.query('[reference = jobdataviewreferrals]')[0].getStore().load();
            jobSearchField.setValue("");
            jobSearchField2.setValue("");
            jobDataView.getStore().clearFilter();
            jobDataView.getStore().addFilter(obj);
            jobDataView.refresh();
            jobDataView2.getStore().clearFilter();
            jobDataView2.refresh();

            Ext.ComponentQuery.query('[reference = jobreferralsreference]')[0].getLayout().setActiveItem(0);
            //Ext.ComponentQuery.query('jobopeningsreferralsview')[0].getViewModel().getStore('jobReferralsDataViewStore').load();  
            var tagPanel = Ext.ComponentQuery.query("jobreferralsfilterview"),
                tagPanelItm = tagPanel[0].items.items;
            tagPanelItm[3].hide();
            tagPanelItm[4].hide();
            tagPanelItm[5].hide();

            var getDataStore = Ext.ComponentQuery.query('jobopeningsreferralslistview')[0].down('dataview').getStore();
            getDataStore.removeFilter("filterByLocation");
            getDataStore.removeFilter("filterByDepartment");
            getDataStore.removeFilter("filterByDate");
        }
        /*Application Enquiry*/
        if (Ext.ComponentQuery.query('[reference = applicationenquiryreference]')[0] && (hashTag.match(/applicationenquiry/g))) {
            var appForm = Ext.ComponentQuery.query('[reference = applicationform]')[0],
                store = appForm.up('applicationenquiry').getViewModel().getStore('gridstore'),
                data = {
                    name: '--',
                    email: '--'
                };

            store.load();
            appForm.reset();
            store.removeAll();
            store.add(data);
        }

        // if (Ext.ComponentQuery.query('projectsview')[0] && (hashTag.match(/projectdetails/g) && ((hashTag.split('/').length > 1) && (hashTag.split('/').length < 4)))) {
        //     //debugger;
        //     Ext.ComponentQuery.query('projectsview')[0].setActiveItem(1);
        //     var tabsView = Ext.ComponentQuery.query('projectstabsview')[0],
        //         projectToolbar = tabsView.down('container[reference="projectstoolbar"]'),
        //         project_combo=tabsView.down('[name=projectSelect]'),
        //         tabDetailView = tabsView.down('projectstabsdetailsview'),
        //         splitValue = hashTag.split('/'),
        //         store = Ext.getStore('projects.ProjectDashboardStore'),
        //         data;
        //     if (!store.isLoaded()) {
        //         store.load({
        //             scope: this,
        //             callback: function () {
        //                 data = store.findRecord('project_id', hashTag.split('/')[1]);
        //                 project_combo.setValue(data.data.status);
        //                 tabsView.up('projectsview').getViewModel().set('activeProData', data.data);

        //                 if (splitValue.length === 2) {
        //                     tabsView.down('dataview').setData(data);
        //                     projectToolbar.items.items[0].setPressed(true);
        //                     tabDetailView.setActiveItem(projectToolbar.items.items[0].text.toLowerCase());
        //                     //Load the notes related to selected project
        //                     var pro_id = ((data) ? data.data.project_id : hashTag.split('/')[1]);
        //                     Ext.getStore('projects.NotesStore').load({
        //                         params: {
        //                             projectId: pro_id
        //                         }
        //                     });
        //                     // Ext.getStore('projects.TechnologiesStore').load({
        //                     //     params: {
        //                     //         projectId: pro_id
        //                     //     }
        //                     // });
        //                 } else if (splitValue.length === 3) {
        //                     tabsView.down('dataview').setData(data);

        //                     for (var i = 0, len = projectToolbar.items.items.length; i < len; i++) {
        //                         if (projectToolbar.items.items[i].text)
        //                             if (projectToolbar.items.items[i].text.toLowerCase() === splitValue[2]) {
        //                                 projectToolbar.items.items[i].setPressed(true);
        //                             }
        //                     }

        //                     if (splitValue[2] === 'notes') {
        //                         Ext.getStore('projects.NotesStore').load({
        //                             params: {
        //                                 projectId: data.data.project_id
        //                             }
        //                         });
        //                     } else if (splitValue[2] === 'mom') {
        //                         if (data && data.data.project_id) {
        //                             Ext.getStore('projects.MOMViewStore').load({
        //                                 params: {
        //                                     projectId: data.data.project_id
        //                                 }
        //                             });
        //                         }

        //                     } else if (splitValue[2] === 'people') {
        //                         Utility.recCountValues = [];
        //                         Utility.empDes = null;
        //                     } else if (splitValue[2] === 'technologies') {
        //                         // Ext.getStore('projects.TechnologiesStore').load({
        //                         //     params: {
        //                         //         projectId: data.data.project_id
        //                         //     }
        //                         // });
        //                     }
        //                     tabDetailView.setActiveItem(splitValue[2]);
        //                 }
        //             }
        //         });
        //     }
        // }

        if (prefix === 'profile') {
            loadedCb = function (res) {
                Ext.getBody().unmask();

                if (res.loaded) {
                    me.toggleTreeList(true);

                    if (newView) {
                        Ext.suspendLayouts();
                        mainLayout.setActiveItem(mainCard.add(newView));
                        Ext.resumeLayouts(true);
                    }
                    if (existingItem && existingItem !== lastView) {
                        mainLayout.setActiveItem(existingItem);
                    }
                }
            };
            // firing an event on the profile page to load appropriate data
            args = (hashTag === 'user') ? [true, null, loadedCb] : [false, hashTag, loadedCb];
            args.unshift(newView || existingItem, 'loadprofiledata');
            Utility.fireOn.apply(Utility, args);
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem == 'Error') {
                existingItem = Ext.getCmp('Error');

                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
            } else if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            } else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView && newView.isFocusable(true)) {
            newView.focus();
        }

        vmData.currentView = newView;
        var searchfield = vmData.currentView.down('[reference = "agendaRef"]');
        if (searchfield) {
            searchfield.setValue('');
            var projectStore = Ext.getStore('projects.ProjectDashboardStore');
            if (projectStore) {
                projectStore.clearFilter();
            }
        }
        if (hashTag === 'projects') {
            Ext.getStore('projects.ProjectDashboardStore').clearFilter(true);
            view = Ext.ComponentQuery.query('mainviewport')[0];

            if (view) {
                view.getViewModel().set('projectId', null);
            }
            var statusValue = vmData.currentView.down('tagfield').getValue();
            var length = vmData.currentView.down('tagfield').getValue().length;
            if (length == 3 || length == 1) {
                vmData.currentView.down('tagfield').setValue('');
                vmData.currentView.down('tagfield').setValue(statusValue)
            } else {
                vmData.currentView.down('tagfield').setValue('');
                vmData.currentView.down('tagfield').setValue(['Presales', 'Execution'])
            }
        }
        //To reset the postition of the view on route change
        maincontainerwrap = Ext.ComponentQuery.query('maincontainerwrap')[0];
        if (Ext.isDefined(maincontainerwrap)) {
            maincontainerwrap.getEl().scrollTo('top', 0, true);
        }
    // } catch (err) {
    //     Utility.showToast(Messages.VIEWPORT.CURRENTVIEW, err);
    // }

    },

    // mainLayoutFunction: function(mainCard,navigationList,store,hashTag,logo, karmascore){
    //     debugger;
    //         if (mainCard) {
    //             mainLayout = mainCard.getLayout();
    //             store = navigationList.getStore();
    //         }
    //         if (!store) {
    //             return;
    //         }
    //         var adjustYourKarmaScoreWidget = function () {
    //             if (karmascore && karmascore.hasCls('fixed')) {
    //                 karmascore.removeCls('fixed');
    //                 viewModel.set('scrolltopbtn', true);
    //             }
    //         };
    //         if (hashTag == "home") {
    //             Ext.getStore('feeds.Groups').load();
    //             if (logo.hasCls('sencha-add-logo')) {
    //                 logo.removeCls('sencha-add-logo')
    //             }
    //             adjustYourKarmaScoreWidget();
    //         } else {
    //             if (!logo.hasCls('sencha-add-logo')) {
    //                 logo.addCls('sencha-add-logo')
    //             }
    //         }
    //     },
    // This is hidden in application
    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;
        var html = collapsing ? '<div class="main-small-logo"><img src=resources/images/wtclogo-small.PNG></div>' : '<div class="main-logo"><img src="resources/images/wtclogo.png" alt="Walking Tree"></div>';
        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();
            refs.senchaLogo.update(html);
            refs.senchaLogo.setWidth(new_width);
            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);
            Ext.resumeLayouts(); // do not flush the layout here...
            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout(); // ... since this will flush them
        } else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
                //Added for adjusting the width of the selected item of collapsed item ~ Nagender 1st April
                navigationList.removeCls('nav-list-collapsed');
            }
            refs.senchaLogo.update(html);
            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({
                dynamic: true,
                to: {
                    width: new_width
                }
            });
            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({
                isRoot: true
            });
            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.addCls('nav-list-collapsed'); //Added for adjusting the width of the selected item of collapsed item ~ Nagender 1st April
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                    },
                    single: true
                });
            }
        }
    },
    /**
     * The function onNavigationTreeSelectionChange is fired when user click on any module in the navigation tree.
     * this function will navigate to the selected view .
     * @param 'treelist' - which is containing the list of the navigation tree.
     * @param 'node' - which is a selected module.
     * @param eOpts - which is an object.
     */
    onNavigationTreeSelectionChange: function (treelist, node, eOpts) {
      try{
        var accountView = Ext.ComponentQuery.query('account')[0],
            store = Ext.getStore('setup.AccountStore'),
            me = this,
            fields, cityComboRef, stateComboRef, accountForm, Refs, previousNode,
            fieldType = [];
        if (accountView) {
            accountForm = accountView.getForm();
            if (accountForm.isDirty()) {
                var conWin = Ext.Msg;
                conWin.comp = me;
                conWin.treeList = treelist;
                conWin.on("close", function (win, b, c) {
                    var previousView = (win.comp) && win.comp.getViewModel().data.currentView;
                    if (win.treeList) {
                        var previousNode = win.treeList.getStore().findNode('routeId', previousView.routeId);
                        win.treeList.setSelection(previousNode);
                        conWin.close();
                    }
                });
                me.accountLeaveWindow(node, me, store, conWin, previousNode, treelist, accountForm, accountView, fieldType, fields, cityComboRef, stateComboRef, eOpts);
            } else {
                me.onNavigationTreeSelectionChangeAfter(treelist, node, eOpts);
            }
        } else {
            me.onNavigationTreeSelectionChangeAfter(treelist, node, eOpts);
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.SELECTIONCHANGE, err);
     }
    },
    /**
     * The function accountLeaveWindow  will display one popup window.And it will ask that you want to leave this window without saving change.
     */
    accountLeaveWindow: function (node, me, store, conWin, previousNode, treelist, accountForm, accountView, fieldType, fields, cityComboRef, stateComboRef, eOpts) {
        try{
        conWin.confirm("Confirmation", Messages.VIEWPORT.ACCOUNTMSG , function (btnText) {
            if (btnText === "no") {
                var previousView = me.getViewModel().data.currentView,
                    previousNode = treelist.getStore().findNode('routeId', previousView.routeId);
                treelist.setSelection(previousNode);
                conWin.close();
            } else if (btnText === "yes") {
                fields = accountForm.getFields().items;
                Ext.each(fields, function (field) {
                    if (field.isDirty()) {
                        fieldType.push(field);
                    }
                });
                me.accountResetFun(node, me, store, conWin, previousNode, treelist, accountForm, accountView, fieldType, fields, cityComboRef, stateComboRef, eOpts);
                me.onNavigationTreeSelectionChangeAfter(treelist, node, eOpts);
            }
        });
     } catch (err) {
        Utility.showToast(Messages.VIEWPORT.ACCOUNT, err);
     }
    },

    /**
     * The function accountResetFun will reset the account form.
     */
    accountResetFun: function (node, me, store, conWin, previousNode, treelist, accountForm, accountView, fieldType, fields, cityComboRef, stateComboRef, eOpts) {
        try{
        if (fieldType.length > 1) {
            if (fieldType[0].name == "country" || fieldType[0].name == "state") {
                Utility.accountInitialLoad(accountView);
            } else {
                accountForm.reset();
                Utility.onMakeLoadDirtyFalse(accountView, store);
            }
        } else {
            accountForm.reset();
            Utility.onMakeLoadDirtyFalse(accountView, store);
        }
        Refs = accountView.getReferences();
        cityComboRef = Refs.cityComboRef;
        stateComboRef = Refs.stateComboRef;
        if (stateComboRef && cityComboRef) {
            if (Ext.isEmpty(stateComboRef.getRawValue()) || Ext.isEmpty(cityComboRef.getRawValue())) {
                stateComboRef.setReadOnly(true);
                cityComboRef.setReadOnly(true);
            } else {
                stateComboRef.setReadOnly(false);
                cityComboRef.setReadOnly(false);
            }
        }
     } catch (err) {
            Utility.showToast(Messages.VIEWPORT.ACCOUNTRESETFUNCTION, err);
         }
    },
    /**
     * The function onNavigationTreeSelectionChangeAfter will perform after changing  of the selected module.
     * this function will load the require thinges for selected module.
     * @param 'treelist' - which is containing the list of the navigation tree.
     * @param 'node' - which is a selected module.
     * @param eOpts - which is an object.
     */
    onNavigationTreeSelectionChangeAfter: function (treelist, node, eOpts) {
        try{
        var me = this,
            redirectFn;
        redirectFn = function (me) {
            var feedUploadView = Ext.ComponentQuery.query('feedsuploadedimage')[0];
            if (node && node.data.text == "Availability Sheet") {
                if (Utility.dashboard) {}
                Utility.dashboard = true;
            } else if (node && node.data.text === "Org Chart") {
                // me.orgChartNavigation();
                var orgChart = Ext.ComponentQuery.query('orgchart')[0],
                    orgViewModel, orgChartView, orgViewStore,
                    orgChartSearch, locBtn;
                if (orgChart) {
                    orgViewModel = orgChart.getViewModel();
                    if (orgViewModel.get('locName') || orgViewModel.get('employee_name') || orgViewModel.get('department_code')) {
                        orgChartSearch = orgChart.lookupReference('orgchartsearch');
                        orgChartView = orgChart.lookupReference('orgchartview');
                        orgChart.getController().reInstanceOfViewFn(orgChart.getController(), orgChartView, orgViewModel, orgChartView.getStore());
                        var orgchartsearch = orgChart.down('orgchartsearch'),
                            employeeCombo = orgchartsearch.down('combobox[reference =employeename]'),
                            departmentCombo = orgchartsearch.down('combobox[reference =departmentname]');
                        employeeCombo.reset();
                        departmentCombo.reset();
                    }
                }
            } else if (node && node.data.text === "Groups") {
                var grpComboView = Ext.ComponentQuery.query('groupscombo')[0],
                    grpCombo, store;
                if (grpComboView) {
                    grpCombo = grpComboView.down('combobox[reference = groupname]');
                    store = Ext.getStore('groups.GroupsComboStore');
                    var groupComboRecord = store.getAt(0),
                        groupComboName;
                    if (groupComboRecord != null) {
                        groupComboName = groupComboRecord.data.group_id;
                        grpCombo.setValue(groupComboName);
                        Utility.groupInitialLoad(grpCombo, groupComboRecord, eOpts);
                    }
                }
            } else if (node && node.data.text === "Employee") {
                var employeeTab = Ext.ComponentQuery.query('employeetab')[0] || Ext.widget('employeetab'),
                    utilizationView = Ext.ComponentQuery.query('utilisationview')[0] || Ext.widget('utilisationview'),
                    employeeTabStore = employeeTab.down('[xtype=empgroup]').getStore(),
                    utilizationViewStore = utilizationView.down('[name=filterBy]').getStore(),
                    utilizationGridStore = utilizationView.down('grid').getStore();
                if ((!employeeTabStore.isLoaded()) || (!utilizationViewStore.isLoaded()) || (!utilizationGridStore.isLoaded())) {
                    employeeTabStore.load();
                    utilizationViewStore.load();
                    utilizationGridStore.load();
                }else if(employeeTabStore.isLoaded()){
                    var store = Ext.getStore('setup.employeesetup.EmployeeStore');
                    store.reload();
                }
            } else if (node && node.data.text === "Job Applicants") {
                var gridView = Ext.ComponentQuery.query('applicants')[0];
                if (gridView) {

                    gridView.setMaxHeight('500');
                }
            } else if (node && node.data.text === "Karmascore") {
                var karmascoreView = Ext.ComponentQuery.query('karmascoreview')[0],
                    departmentComboStore = Ext.getStore('karmascore.DepartmentComboStore'),
                    searchform, filterform;
                if (departmentComboStore.getCount() === 0) {
                    Ext.getStore('karmascore.DepartmentComboStore').load();
                    Ext.getStore('karmascore.DesignationComboStore').load();
                    Ext.getStore('karmascore.KarmaGroupComboStore').load();
                    Ext.getStore('karmascore.PrimarySkillsComboStore').load();
                    Ext.getStore('karmascore.ProjectComboStore').load();
                    Ext.getStore('karmascore.SupervisorComboStore').load();
                    Ext.getStore('karmascore.AdvKarmaScoreSlider').load();
                }
                if (karmascoreView) {
                    karmascoreView.down('dataviewcards').setActiveItem(0);
                    searchform = karmascoreView.down('searchformview');
                    filterform = karmascoreView.down('karmascorefilterview');
                    filterform.reset();
                    searchform.reset();
                    karmascoreView.getController().triggerSearch(searchform, filterform);
                    karmascoreView.getController().onKarmaScoreLoad();
                    if (karmascoreView.getViewModel()) {
                        var allKarmascoresStore = karmascoreView.getViewModel().getStore('allkarmascores');
                        if (!allKarmascoresStore.isLoaded()) {
                            allKarmascoresStore.load({
                                params: {
                                    all: true
                                }
                            });
                        }
                    }
                    var Supervisorcombo = filterform.down('combobox[reference =Supervisor]'),
                        Designationcombo = filterform.down('combobox[reference =Designation]'),
                        Departmentcombo = filterform.down('combobox[reference =Department]'),
                        PrimarySkillcombo = filterform.down('combobox[reference =PrimarySkill]'),
                        ProjectsOrCustomerscombo = filterform.down('combobox[reference =ProjectsOrCustomers]'),
                        daterangeRef = filterform.down('textfield[reference =daterangeref]');
                    daterangeRef.triggers.cancel.hide();
                    Supervisorcombo.triggers.cancel.hide();
                    Designationcombo.triggers.cancel.hide();
                    Departmentcombo.triggers.cancel.hide();
                    PrimarySkillcombo.triggers.cancel.hide();
                    ProjectsOrCustomerscombo.triggers.cancel.hide();
                }
                if (Utility.isKarmaMaskLoaded && karmascoreView) {
                    Ext.getBody().mask('');
                }
                Utility.isKarmaMaskLoaded = false;
            } else if (node && node.data.text === "Roles & Security") {
                var rolesView = Ext.ComponentQuery.query('rolesview')[0],
                    roleCombo;
                if (rolesView) {
                    roleCombo = rolesView.lookupReference('rolecombo');
                    roleCombo.setValue('');
                }
            } else if (node && node.data.text === "Redeem") {
                var redeemGridStore = Ext.getStore('redeem.RedeemGridStore');
                if (!redeemGridStore.isLoaded()) {
                    Utility.onStoreLoading(redeemGridStore);
                }
            } else if (node && node.data.text === "Goals") {
                var goalsMain = Ext.ComponentQuery.query('goals-main')[0];
                if (goalsMain) {
                    var goalsmainview = goalsMain.down('goalsmainview'),
                        goalview = goalsmainview.down('goalsview'),
                        goalHeaderView = goalsmainview.down('goalsheader'),
                        comboRef = goalHeaderView.down('combobox[reference=comboref]'),
                        comboStore = comboRef.getStore().getAt(0),
                        goalViewStore = goalview.getStore();
                    if (goalsmainview) {
                        var mainView = goalsmainview.up();
                        if (mainView) {

                            goalcard = mainView.getLayout();
                            goalcard.setActiveItem(1);
                        }
                    }
                    if (!goalViewStore.isLoaded()) {
                        goalViewStore.load({
                            scope: this,
                            success: function () {
                                goalViewStore.clearFilter(true);
                                goalViewStore.filterBy(function (rec) {
                                    if (rec.data.goalType == "Personal") {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            }
                        });
                    }
                }
            } else if (node && node.data.text == "Settings") {
                var goalSettingStore = Ext.getStore('settings.GoalSettings');
                var goalSettingView = Ext.ComponentQuery.query('goalsettings')[0];
                if (goalSettingView) {
                    var goalTagField = goalSettingView.down('tagfield');
                    var tagfieldStore = goalTagField.getStore();
                    if (!tagfieldStore.isLoaded()) {
                        tagfieldStore.load({
                            scope: this,
                            callback: function (records) {
                                Utility.goalSettingStoreFn(goalSettingStore, goalTagField);
                            }
                        })
                    } else {
                        Utility.goalSettingStoreFn(goalSettingStore, goalTagField);
                    }
                }
            } else if (node && node.data.text == 'MoM') {
                var momStore = Ext.getStore('mom.MomComponent');
                if (!momStore.isLoaded()) {
                    momStore.load();
                }
            } else if (node && node.data.text == 'Product') {
                var attributeValueComboStore = Ext.getStore('Redeem.store.AttributeValueStore');
                if (!attributeValueComboStore.isLoaded()) {
                    attributeValueComboStore.load();
                }
                Utility.addAttributes(attributeValueComboStore);
            }
            if (node && node.get('view')) {
                me.redirectTo(node.get("routeId"));
            } else if (node && node.data.leaf === false) {
                if (!location.hash.split('/').includes('#projectdetails')) {
                    var previousView = me.getViewModel().data.currentView,
                        previousNode = treelist.getStore().findNode('routeId', previousView.routeId);
                    treelist.setSelection(previousNode);
                } else {
                    var currentView = location.hash.split('/').includes('#projectdetails');
                    currentView = treelist.getStore().findNode('routeId', currentView.routeId);
                    treelist.setSelection(currentView);
                }
            }
            Utility.feedUploadsImage = [];
            if (feedUploadView) {
                feedUploadView.setData(Utility.feedUploadsImage);
            }
        };
        if (!Ext.isEmpty(Utility.feedUploadsImage)) {
            Ext.Msg.confirm("Confirmation", "Would you like to leave this page?", function (btnText) {
                if (btnText === "no") { //do nothing
                } else if (btnText === "yes") {
                    var imgPath = Utility.feedUploadsImage,
                        data = [];
                    for (var k = 0, len = imgPath.length; k < len; k++) {
                        data.push(imgPath[k].src);
                    }
                    Ext.Ajax.request({
                        url: '/feed/feedsPostedPicsUnlink',
                        scope: this,
                        params: {
                            imgPath: data
                        },
                        success: function (conn, response) { //success part
                        },
                        failure: function (conn, response) { //failure part
                        }
                    });
                    redirectFn(me);
                }
            }, this);
        } else {
            redirectFn(me);
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.NAVITREECHANGEAFTER, err);
     }
    },

    orgChartNavigation: function () {
        try{
        var orgChart = Ext.ComponentQuery.query('orgchart')[0],
            orgViewModel, orgChartView, orgViewStore,
            orgChartSearch, locBtn;
        if (orgChart) {
            orgViewModel = orgChart.getViewModel();
            if (orgViewModel.get('locName') || orgViewModel.get('employee_name') || orgViewModel.get('department_code')) {
                orgChartSearch = orgChart.lookupReference('orgchartsearch');
                orgChartView = orgChart.lookupReference('orgchartview');
                orgChart.getController().reInstanceOfViewFn(orgChart.getController(), orgChartView, orgViewModel, orgChartView.getStore());
                var orgchartsearch = orgChart.down('orgchartsearch'),
                    employeeCombo = orgchartsearch.down('combobox[reference =employeename]'),
                    departmentCombo = orgchartsearch.down('combobox[reference =departmentname]');
                employeeCombo.reset();
                departmentCombo.reset();
            }
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.ORGCHATNAVIGATION, err);
     }
    },

    onUnMatchRouteChange: function (id) {
        var me = this;
        var action = {
            stop: function () {},
            resume: function () {
                me.onRouteChange(id);
            }
        };
        me.validateSession(id, action);
    },

    /**
     * The function onRouteChange will perform  when  we change the Router.
     */
    onRouteChange: function (id, prefix) {
        // try {
        var me = this,
            viewModel = me.getViewModel(),
            vmData = viewModel.getData();
        vmData.hashTag = id;
        let employeeStore = Ext.getStore('setup.employeesetup.EmployeeStore');
        employeeStore.clearFilter();
        var userprofile_model = this.getView().down('userprofile');
        var employee_Id = Ext.getStore('login').getRange()[0].data.ddo_employee_id;
        /*Temporay patch to bypass the login and forget password.
         by default activating the main viewport which is the landing screen of the app BY Ranjit Patra 2nd April*/
        if (id !== 'login' && id !== 'forgetpasswordview' && id !== 'findapplication') {
            var loginView = me.getView().up("loginview"),
                mainviewport = loginView.down("mainviewport");
            loginView.setActiveItem(mainviewport);
        }
        if (id !== 'karmascoresearch' && id !== 'tododetailview') {
            this.setCurrentView(id, prefix);
        }
        this.benchViewFun(id, prefix);
        this.resourchViewFun(id, prefix, userprofile_model);
    // } catch (err) {
    //     Utility.showToast(Messages.VIEWPORT.ROUTECHANGE, err);
    //  }
    },
    /**
     * This function will open the user bench if id is matched.
     * @param id - id of the selected view.  
     */
    benchViewFun: function (id, prefix) {
        try {
        if (id != "settings") {
            var goaldSettings, goalTagField;
            goalSettings = Ext.ComponentQuery.query('goalsettings')[0];
            if (goalSettings) {
                goalTagField = goalSettings.down('tagfield');
                if (goalTagField) {
                    goalTagField.inputEl.dom.value = '';
                    goalTagField.collapse();
                }
            }
        }
        if (id == 'bench') {
            var grid = Ext.ComponentQuery.query('benchview')[0].down('grid');
            var projectColumn = grid.down('[dataIndex=projectnames]');
            var availableFromColumn = grid.down('[dataIndex=availablefrom]');
            var resourcesStore = grid.getStore();
            resourcesStore.load();
            resourcesStore.clearFilter();
            projectColumn.hide();
            availableFromColumn.hide();
            resourcesStore.filterBy(function (val) {
                if (val.data.allocation_per == 0) {
                    return false;
                }
                return true;
            });
        }
       } catch (err) {
        Utility.showToast(Messages.VIEWPORT.BENCH, err);
     }
    },
    /**
     * This function will open the resourceavailability view if id is matched.
     * This function will open the user view if id is matched.
     * This function will open the resourcerequest view if id is matched.
     * @param id - id of the selected view.  
     */
    resourchViewFun: function (id, prefix, userprofile_model) {
        if (id == 'resourceavailability') {
            var availableSheet = Ext.ComponentQuery.query('availibilityview')[0],
                grid = availableSheet.down('grid'),
                resourcesStore = grid.getStore();
            resourcesStore.clearFilter();
        }
        if (id == 'user') {
            employeeId = Ext.getStore('login').getRange()[0].data.ddo_employee_id;
            Utility.profileAppeared = employeeId;
            if (userprofile_model) {
                userprofile_model.getViewModel().set('sendresignation', false);
                userprofile_model.getViewModel().set('editpersoneldetailbutton', false);
            }
        }
        if (id == 'resourcerequest') {
            var projectReq = Ext.ComponentQuery.query('projectrequest')[0];
            projectReq.down('form').reset();
            projectReq.down('[text=Request]').setDisabled(true);
            projectReq.down('[reference=add_to_project]').setDisabled(true);
            var peopleViewStore = this.getView().down('[reference=peoplesearchviewadv]').getStore();
            if (peopleViewStore) {
                peopleViewStore.removeAll();
            }
        }
    },
    /**
     * This function will get the store from viewModel and call the setCurrentView function .
     */
    onStoreLoad: function () {
        try{
        var me = this,
            viewModel = me.getViewModel(),
            vmData = viewModel.getData(),
            id = vmData.hashTag;
        this.setCurrentView(id);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.STORELOAD, err);
     }
    },

    onLoadingColumnChart: function (store, records, successful, operation, eOpts) {
        try{
        var groupedItemsCount = [],
            groupedItemsSkills = [],
            groupedItemsList = store.data.getGroups().items,
            groupItemsLength = groupedItemsList.length,
            skillTotalCount,
            skillName;
        for (var i = 0; i < groupItemsLength; i++) {
            skillTotalCount = groupedItemsList[i].items.length;
            for (var j = 0; j < skillTotalCount; j++) {
                skillName = groupedItemsList[i].items[j].data.skills;
                groupedItemsSkills.push(skillName);
            };
            groupedItemsCount.push({
                skillTotalCount: skillTotalCount,
                skillName: skillName
            });
        };
        store.setData(groupedItemsCount);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.LOADINGCHART, err);
     }
    },
    /**
     * The function onProfileClick  will perform when the 'click' event is fired from Viewport.js
     * Whenever user click on the profile butten then this function will redirect to user profile.
     */
    onProfileClick: function () {
        try {
            // debugger;
        var me = this,
            redirectFn;
        redirectFn = function (me) {
            var userProfileView = Ext.ComponentQuery.query('userprofile')[0],
                feedUploadView = Ext.ComponentQuery.query('feedsuploadedimage')[0],
                profileRef, profileView, profileTbrBtn;

        var viewPortStores = me.getView().getViewModel().storeInfo,
        empStore = viewPortStores.employeestore;
        var logIn_Id = Ext.getStore('login').getRange()[0].data.ddo_employee_id,
        status,basicDetails,userProView,profileRefs;
        empStore.load({
              callback: function(records,operation,success){
                    if(success == true){
                        records.forEach(value => {
                            basicDetails = value.data.basic;
                            if (logIn_Id == basicDetails.ddo_employee_id){
                                status = value.data.workdetails.empstatus;
                                if(status == 'Confirmed'){
                                    userProView = me.getView().down('userprofile');
                                    profileRefs = userProView.getReferences();
                                    profileRefs.provitiontocnfm.hide();
                                }else{
                                    userProView = me.getView().down('userprofile');
                                    profileRefs = userProView.getReferences();
                                    profileRefs.provitiontocnfm.show(); 
                                }
                            }
                        })
                    }else{
                        Ext.Msg.alert('Error', 'Error loading employee store');
                    }
              },
              scope:this
        });


            if (userProfileView) {
                profileRef = userProfileView.getReferences();
                profileView = profileRef.profileuserview;
                profileTbrBtn = profileRef.detailsBtn;
                profileView.setActiveItem(0);
                profileTbrBtn.removeCls('detailsbutton');
                profileTbrBtn.setText('View Timeline');
                profileTbrBtn.addCls('timelinebutton');
                profileRef.printBtn.setHidden(false);
            }
            me.toggleTreeList(true); // redirect to current user profile
            me.redirectTo('profile/user');
            Utility.feedUploadsImage = [];
            if (feedUploadView) {
                feedUploadView.setData(Utility.feedUploadsImage);
            }
        };

        if (!Ext.isEmpty(Utility.feedUploadsImage)) {
            this.feedUploadsImageFun(redirectFn);
            Ext.Msg.confirm("Confirmation",Messages.VIEWPORT.ACCPAGELV, function (btnText) {
                if (btnText === "no") {
                    //do nothing
                } else if (btnText === "yes") {
                    var imgPath = Utility.feedUploadsImage,
                        data = [];
                    for (var k = 0, len = imgPath.length; k < len; k++) {
                        data.push(imgPath[k].src);
                    }
                    Ext.Ajax.request({
                        url: '/feed/feedsPostedPicsUnlink',
                        scope: this,
                        params: {
                            imgPath: data
                        },
                        success: function (conn, response) { //success part
                        },
                        failure: function (conn, response) { //failure part
                        }
                    });
                    redirectFn(me);
                }
            }, this);
        } else {
            redirectFn(me);
        }
       
        var hash = location.hash;
        var profileView = Ext.ComponentQuery.query('profileskillsadded')[0];
       
        if(profileView){
            var btnRef = profileView.down('[reference=Action]');
                if( hash !== '#profile/user'){
            
                btnRef.setHidden(true);
                }
                else if(hash === '#profile/user'){
                    btnRef.setHidden(false);  
                }
    }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.ONPROFILECLICK, err);
     }
    },

    // this function is not used anywere in the ddo so it is commented.
    // onChangePassword: function () {
    //     var changePasswordWindow = Ext.ComponentQuery.query('changepasswordwindow')[0] || Ext.create('DDO.view.changepassword.ChangePasswordWindow');
    //     changePasswordWindow.show();
    // },

    /**
     * The function onLogoutClick will perform when the 'click' event is fired from the Viewport.js
     * this function will logout user profile.
     */
    onLogoutClick: function () {
        try{
        var me = this;
        var config = {
            url: "/auth/logout",
            method: "POST",
            params: {}
        };
        var successCallback = function (data, responseData) {
            responseData = responseData || {};
            if (responseData.session) {
                me.redirectTo("login");
            } else {
                me.postLogoutCleaning();
            }
        };
        var failureCallback = function (failureData) {
            sessionStorage.removeItem('authentication');
            sessionStorage.removeItem('refreshToken');
            me.redirectTo("login");
        };
        Utility.fireAjax(config, successCallback, failureCallback);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.LOGOUT, err);
     }
    },

    //scroll bar even in viewport - maincontainerwrap container By Anil 2nd April for Scroll Button
    onMainContainerRender: function (component, eOpts) {
        var me = this;
        component.getEl().on({
            scroll: Ext.bind(me.onScroll, me),
            scope: me
        });
        component.getEl().on({
            scroll: Ext.bind(me.onMainContainerScoll, me, [component], true),
            scope: me
        });
    },

    onMainContainerWheel: function (evt, html, scope, component) {

    },

    onMainContainerScoll: function (evt, htmlDom, eOpts, component) {
        try{
        var me = this,
            currentView = me.getViewModel().getData().currentView,
            feedsMenu = Ext.ComponentQuery.query('feedsmenuimage')[0],
            feedsTagMenu = Ext.ComponentQuery.query('feedstagmenuimage')[0];

        if (currentView && currentView.$className == "DDO.view.home.Home") {
            if (feedsMenu) {
                feedsMenu.destroy();
            }
            if (feedsTagMenu) {
                feedsTagMenu.destroy();
            }
        }
        this.checkFeedData(evt, htmlDom);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.MAINCONTAINERSCROLL, err);
     }
    },

    checkFeedData: function (evt, htmlDom) {
        try{
        var me = this,
            scrollHeight = htmlDom.scrollHeight,
            scrollTop = htmlDom.scrollTop,
            offsetHeight = htmlDom.offsetHeight,
            scrollPercent = 0;
        scrollPercent = (scrollTop + offsetHeight) / scrollHeight * 100;

        //On 95% of the scroll it will load next set of data for feed.
        if (scrollPercent >= 90) { //before we used 95
            me.loadNextFeedData();
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.FEED, err);
     }
    },

    loadNextFeedData: function () {
        try{
        var me = this;
        Utility.menuform = true;
        Utility.likeImgAnim = false;
        me.fireEvent("loadfeedscrolldata");
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.NEXTFEED, err);
     }
    },

    onNewFeedNorificationClick: function () {
        try{
        var me = this,
            viewModel = me.getViewModel();
        var status = me.fireEvent("loadnewfeeddata");
        if (status !== false) {
            viewModel.set("newFeedsCount", 0);
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.FEEDNOTIFICATIONCLICK, err);
     }
    },

    onNewFeedNotification: function () {
        var me = this,
            viewModel = me.getViewModel(),
            newFeedsCount = viewModel.get("newFeedsCount");
        newFeedsCount++;
    },
    /**
     * The function postLoginInitialization is responible for loading the pofile in home page.
     * @param 'callback' - which is a callback function to load the user data.
     * @param 'email' - email id or the loged user.
     */
    postLoginInitialization: function (callback, email) {
        Utility.likeImgAnim = false;
        var me = this,
            viewModel = me.getViewModel(),
            loginStore = Ext.getStore("login"),
            storeManager = Ext.StoreManager,
            feedsStore, resourcesStore, groupStore;
        if (!loginStore) {
            loginStore = Ext.create("DDO.store.loginlanding.Login");
        }
        if (loginStore.getCount() <= 0) {
            me.loadUserDetails(function (userdata) {
                if (userdata) {
                    loginStore.add([userdata]);
                }
                callback();
            }, email);
        } else {
            callback();
        }
        var resourceAvailView = Ext.ComponentQuery.query('availableresources')[0];
        if (!Ext.isEmpty(resourceAvailView)) {
            resourcesStore = resourceAvailView.getStore();
        }
        resourcesStore = storeManager.lookup("resourcestoreid") || resourcesStore;
        this.homePageLoading(resourcesStore, storeManager, feedsStore, me);
    },
    /**
     * The function homePageLoading will load the home page as a main view.
     */
    homePageLoading: function (resourcesStore, storeManager, feedsStore, me) {
        try{
        setTimeout(function () {
            var me = arguments[0],
                currentView = me.getViewModel().getData().currentView;
            if (!currentView && (location.hash.split('#')[1] && location.hash.split('#')[1] == 'home')) {
                var feedStore = storeManager.lookup("feeds");
                if (feedStore && !feedStore.isLoaded()) {
                    feedStore.load({
                        scope: this,
                        callback: function (records, operation, success) {
                            Ext.getBody().unmask();
                        }
                    });
                }
            }
            if (feedsStore && currentView && currentView.$className == "DDO.view.home.Home") {
                storeManager.lookup("feeds").load({
                    scope: this,
                    callback: function (records, operation, success) {
                        Ext.getBody().unmask();
                    }
                });
            }
            if (resourcesStore && resourcesStore.getCount() === 0 && Utility.dashboard) {
                Utility.onStoreLoading(resourcesStore);
            }
        }, 1000, me);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.HOMEPAGELOADING, err);
     }   
    },
    /**
     * The function loadUserDetails is responible for loading the user Details.
     * @param 'callback' - which is a callback function to load the user data.
     * @param 'email' - email id or the loged user.
     */
    loadUserDetails: function (callback, email) {
        try{
        var me = this;
        var config = {
            url: "/auth/userdetails",
            method: "GET",
            params: {
                email: email
            }
        };
        var successCallback = function (data, responseData) {
            if (data) {
                this.onCheckRollForAvailablitySheet(data.roles); //Comment this line to see Dashboard                              
            }
            callback(data);
        }.bind(me);
        var failureCallback = function () {
            Utility.toastReuseFn('t', AlertMessages.authFailed);
            me.postLogoutCleaning();
        };
        Utility.fireAjax(config, successCallback, failureCallback);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.LOADUSERDETAIL, err);
     } 
    },

    onCheckRollForAvailablitySheet: function (roleid) {
        Utility.dashboardRemovalFn(
            this.lookupReference('navigationTreeList'),
            this.getViewModel()
        );
    },

    postLogoutCleaning: function (callback) {
        sessionStorage.removeItem('authentication');
        sessionStorage.removeItem('refreshToken');
        var keycloak = KeycloakLoader.getKeycloak();
        if (!keycloak) {
            KeycloakLoader.initialize();
            keycloak = KeycloakLoader.getKeycloak();
        }
        keycloak.logout();
        var me = this,
            loginStore = Ext.getStore("login"),
            todoStore = Ext.getStore("todostore"),
            feedsStore = Ext.getStore("feeds");
        if (loginStore) {
            loginStore.removeAll();
        }
        if (feedsStore) {
            feedsStore.removeAll();
        }
        if (todoStore) {
            todoStore.removeAll();
        }
        // Socket.close();
        callback && callback();
    },

    // updateProfilePhotos: function(profileDetailsStore) {
    //     var viewPortModel = this.getViewModel();

    //     var loginStore = Ext.getStore('login'),
    //         userRecord = loginStore.getAt(0),
    //         userData = userRecord.data;

    //     if (!viewPortModel.get('profileImg')) {
    //         viewPortModel.set('profileImg', Utility.profileImg());
    //     }

    //     if (userData.logourl) {
    //         viewPortModel.set('companyLogoUrl', userData.logourl);
    //     }

    //     if (profileDetailsStore.getCount() === 0) {
    //         return;
    //     }

    //     var profileData = profileDetailsStore.getAt(0).getData(),
    //         userProfile = Ext.ComponentQuery.query('userprofile')[0],
    //         userProfileModel;

    //     if (Ext.isDefined(viewPortModel)) {
    //         viewPortModel.set('profileImg', profileData.user_profile_picture);
    //         viewPortModel.set('profileBgUrl', profileData.user_profile_cover);
    //     }
    // },

    /**
     * The function onCompanyLogoClick  will perform when the 'click' event is fired from Viewport.js
     * Whenever user click on the company logo then this function will redirect to home page.
     */
    onCompanyLogoClick: function () {
        try{
        // To remove the profile details while redircting to home
        var me = this,
            currentView = me.getViewModel().getData().currentView;
        if (currentView && currentView.$className == "DDO.view.profile.UserProfile") {
            if (!Utility.isFormDirty) {
                var mainviewport = this.getView(),
                    userprofileview = mainviewport.down('userprofile'),
                    profileView = userprofileview.lookupReference('profileuserview'),
                    detailsBtn = userprofileview.lookupReference('detailsBtn'),
                    viewModel = userprofileview.getViewModel(),
                    searchString = null;
                profileView.setActiveItem(0);
                this.settingViewFun(detailsBtn, viewModel, searchString);
                this.employeeDetailFun();
                Ext.defer(function () {
                    this.toggleTreeList(false, true); // passed extra parameter for only acceptable for profileview
                }, 500, this);
            }
        }
        this.redirectTo('home');
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.COMPANYLOGO, err);
     } 
    },
    /**
     * The function settingViewFun  is responsible for setting currentView,profileImg,etc.
     * @param {Ext.button.Button} 'detailsBtn' - containing the referance of detailsBtn.
     * @param {viewModel} 'viewModel' - containing the ViewportModel referance.
     */
    settingViewFun: function (detailsBtn, viewModel, searchString) {
        detailsBtn.removeCls('detailsbutton');
        detailsBtn.setText('View Timeline');
        detailsBtn.addCls('timelinebutton');
        viewModel.set('currentView', searchString);
        viewModel.set('currentView', searchString);
        viewModel.set('id', searchString);
        viewModel.set('newFeedsCount', searchString);
        viewModel.set('profileImg', searchString);
        viewModel.set('profileBgUrl', searchString);
        viewModel.set('designation', searchString);
        viewModel.set('name', searchString);
        viewModel.set('walletAmount', 0);
    },
    /**
     * The function employeeDetailFun is resposible for rmoving timeline, education, education , interest ,etc.
     */
    employeeDetailFun: function () {
        var query = Ext.ComponentQuery.query,
            jobsVM = query('jobscontainer')[0].getViewModel(),
            jobs = jobsVM && jobsVM.get('jobsdatastore'),
            about = query('aboutlist')[0].getStore(),
            timeline = query('usertimeline')[0].getStore(),
            skillsVM = query('profileskills')[0].getViewModel(),
            skills = skillsVM && skillsVM.get('profileskillsstore'),
            educationVM = query('education')[0].getViewModel(),
            education = educationVM && educationVM.get('educationdatastore'),
            interestVM = query('interestsview')[0].getViewModel(),
            interest = interestVM && interestVM.get('interestStore');
        about.removeAll();
        jobs.removeAll();
        timeline.removeAll();
        education.removeAll();
        interest.removeAll();
    },


    toggleTreeList: function (forceHide, forceShow) {
        var treeList = Ext.ComponentQuery.query('#navigationTreeList')[0];
        Ext.suspendLayouts();
        if (((treeList.getWidth() > 0) && !forceShow) || forceHide) {
            treeList.setWidth(0);
        } else {
            treeList.setWidth(210);
        }
        Ext.resumeLayouts(true);
    },

    /* Modern Viewport Functionalities (Need to be refactored) */
    onBoxReady: function () {
        var loginData = Ext.getStore('login').getAt(0),
            viewModel = this.getViewModel(),
            companyLogoData = viewModel.get('accountCompanyImagUrl'),
            profileImage = Utility.imageCheck(loginData.get('user_profile_pic_url'));
        viewModel.set('profileImg', profileImage);
        if (loginData && loginData.get('logo_url')) {
            var companylogoUrl = Utility.imageCheck(loginData.get('logo_url'));
            viewModel.set('companyLogoUrl', companylogoUrl);
            if (companyLogoData && companyLogoData.getData() && companyLogoData.getData().items.length > 0) {
                var companyLogo = companyLogoData.getData().items[0].data.logo_url;
                viewModel.set('companyLogoUrl', Api.URL.imageUrl + companyLogo);
            } else {
                viewModel.set('companyLogoUrl', Api.URL.imageUrl + loginData.get('logo_url'));
            }
        }
        this.onBoxFunction();
    },
    /**
     * Modern Viewport Functionalities.  
     */
    onBoxFunction: function () {
        var selfnomwindow = Ext.ComponentQuery.query('selfnominatewindow')[0] || Ext.create('DDO.view.nominate.selfnomination.SelfNominateWindow'),
            selfnomwindowModel = selfnomwindow.getViewModel(),
            sentBackNominationsStore = selfnomwindowModel.getStore('sentBackNominationsStore');
        sentBackNominationsStore.load({
            scope: this,
            callbaconk: function () {
                var sentBackNomCount = sentBackNominationsStore.getCount();
                selfnomwindowModel.set('sentBackNomCount', sentBackNomCount);
                viewModel.set('sentBackNomCount', sentBackNomCount);
            }
        })
    },
    onModernImageLogoClick: function () {
        try{
        Utility.likeImgAnim = false;
        var mainview = Ext.ComponentQuery.query('#mainviewcontainer')[0],
            mainViewPort = Ext.ComponentQuery.query('mainviewport')[0],
            headerTitle;
        mainview.down('tabpanel').setActiveItem(0);
        mainview.setActiveItem(0);
        mainViewPort.getViewModel().set('profileBtnMobileVisible', false);
        headerTitle = Ext.ComponentQuery.query('#headertitle')[0];
        headerTitle.setText(null);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.COMPANYLOGO, err);
     }   
    },

    onModernProfileBtnClick: function (button) {
        try{
        var headertitle, detailButton, timelineButton,
            detailstimeline, profile, loginStore, empId,
            mainview, mainViewPort;
        headerTitle = Ext.ComponentQuery.query('#headertitle')[0];
        headerTitle.setText("Profile");
        detailButton = Ext.ComponentQuery.query('#detailedview')[0];
        detailButton.setDisabled(false);
        detailButton.addCls('ddo-mobile-detailedbutton.x-item-disabled x-item-disabled');
        timelineButton = Ext.ComponentQuery.query('#timelineview')[0];
        timelineButton.setDisabled(false);
        timelineButton.removeCls('ddo-mobile-timelinebutton.x-item-disabled x-item-disabled');
        detailstimeline = Ext.ComponentQuery.query('#detailstimeline')[0];
        detailstimeline.setActiveItem(0);
        profile = Ext.ComponentQuery.query('userprofile')[0];
        loginStore = Ext.getStore('login');
        empId = loginStore.data.items[0].get('empcode');
        Utility.fireOn(profile, 'loadprofiledata', empId);
        Ext.Viewport.setActiveItem(1);
        mainViewPort = button.up('mainviewport').getViewModel();
        mainViewPort.set('profileBtnMobileVisible', true);
        mainViewPort.set('headerTitleCls', 'headerTitleCls');
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.MORDENPROFILEBTN, err);
     }
    },

    onSearchButton: function (btn) {
        try{
        var searchText = this.lookupReference('searchtextfield');
        var headerTitle = this.lookupReference('headertitle');
        if (headerTitle.getHidden() != true) {
            headerTitle.setHidden(true);
            searchText.setHidden(false);
        } else if (searchText.getHidden() != true) {
            searchText.setHidden(true);
            headerTitle.setHidden(false);
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.SEARCHBTN, err);
     }
    },

    onTabChange: function (newActiveItem, tab, oldActiveItem, eOpts) {
        try{
        Utility.likeImgAnim = false;
        var headerButton, viewTitle, mainviewtoolbar,
            todoView, todoList, feeds,
            viewModel = this.getViewModel();
        if (newActiveItem.getReference() === 'karmascorelist') {
            Ext.Viewport.setActiveItem(1);
            if (!viewModel.get('modernKarmaLoad')) {
                newActiveItem.getStore().load({
                    scope: this,
                    callback: function () {
                        Ext.Viewport.setActiveItem(0);
                    }
                });
                viewModel.set('modernKarmaLoad', true);
            } else {
                Ext.Viewport.setActiveItem(0);
            }
        }
        if (newActiveItem.getReference() === 'todocontainer') {
            Ext.Viewport.setActiveItem(1);
            todoList = newActiveItem.lookupReference('todolist');
            todoView = todoList.down('dataview');
            if (!viewModel.get('modernTodoLoad')) {
                todoView.getStore().load({
                    scope: this,
                    callback: function () {
                        Ext.Viewport.setActiveItem(0);
                    }
                });
                viewModel.set('modernTodoLoad', true);
            } else {
                Ext.Viewport.setActiveItem(0);
            }
        }
        headerButton = this.lookupReference('headertitle');
        viewTitle = newActiveItem.titleName;
        headerButton.setText(viewTitle);
        mainviewtoolbar = Ext.ComponentQuery.query('#mainvieporttoolbar')[0];
        mainviewtoolbar.show();
        feeds = Ext.ComponentQuery.query('feedcomments')[0];
        if (feeds == null) {
            return true;
        } else {
            feeds.hide();
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.TABCHANGE, err);
     }
    },
/**
 * The function showKarmaScoreWindow will show the karmaScore of the employee
 */
    showKarmaScoreWindow: function () {
        try{
        var me = this,
            flag = false;
        Utility.sliderWidth = [];
        var searchWindow = Ext.ComponentQuery.query('karmascoresearch')[0];
        if (searchWindow && Constants.SHOWMASK) {
            flag = true;
        }
        searchWindow = searchWindow || Ext.widget({ // Check if a karmascore window already exists
            xtype: 'karmascoresearch'
        });
        Ext.getStore('karmascoreslider').load({
            scope: this,
            callback: function (records, operation, success) {
                searchWindow.show(); // show a window with all the karmascores in a grid form
                if (Constants.SHOWMASK) {
                    Utility.myMask = new Ext.LoadMask({
                        target: searchWindow.down('karmascoresearchview'), // Here searchWindow is the component you wish to mask
                        msg: ''
                    });
                    Utility.myMask.show();
                }
                if (flag) {
                    searchWindow.down('textfield[name=employee]').reset();
                    searchWindow.down('multislider[name=karmaScoreRange]').reset();
                    searchWindow.down('karmascoresearchview').getStore().clearFilter();
                    searchWindow.down('karmascoresearchview').getStore().load();
                }
                Constants.SHOWMASK = false;
            }
        });
      } catch (err) {
        Utility.showToast(Messages.VIEWPORT.KARMASCOREWINDOW, err);
      }
    },

    // showTodoDetails: function() {

    //     var menu = Ext.ComponentQuery.query('todomenu')[0];

    //     if (menu) {
    //         menu.destroy();
    //     }

    //     var todoWindow = Ext.ComponentQuery.query('tododetailview')[0];

    //     // Check if a karmascore window already exists
    //     todoWindow = todoWindow || Ext.widget({
    //         xtype: 'tododetailview'
    //     });

    //     if (todoWindow) {
    //         todoWindow.show();
    //     }
    // },


    /**
     * clearing karma and karmacategory store while navigating
     * to karma setup to avoid filtering in nominate
     * have got no arguments.
     */
    karmasetupClearFilters: function () {
        try{
        var categoryStore, karmaStore,
            karmaCategoryGrid, karmaGrid;
        karmaGrid = Ext.ComponentQuery.query('karmagrid')[0];
        karmaCategoryGrid = Ext.ComponentQuery.query('karmalist')[0];
        karmaStore = Ext.getStore('karmasetup.KarmaStore');
        categoryStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
        if (karmaCategoryGrid) {
            karmaCategoryGrid.suspendLayouts(true);
        }
        categoryStore.clearFilter(true);
        categoryStore.load({
            scope: this,
            callback: function (records, options, succes) {
                if (karmaCategoryGrid) {
                    karmaCategoryGrid.suspendLayouts(false);
                    karmaCategoryGrid.updateLayout();
                }
            }
        });
        this.karmaClearFum(karmaGrid, karmaStore);
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.KARMASETUPFILTERS, err);
      } 
    },
    /**
     * clearing karma and karmacategory store while navigating
     */
    karmaClearFum: function (karmaGrid, karmaStore) {
        try{
        if (karmaGrid) {
            karmaGrid.suspendLayouts(true);
        }
        karmaStore.clearFilter(true);
        karmaStore.load({
            scope: this,
            callback: function (records, options, succes) {
                if (karmaGrid) {
                    karmaGrid.suspendLayouts(false);
                    karmaGrid.updateLayout();
                }
            }
        });
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.KARMACLEAR, err);
      } 
    },

    findApplication: function () {
        this.redirectTo('findapplication');
    },

    redirectToProfile: function (employeeCode) {
        this.redirectTo('profile/' + employeeCode);
    },

    scrollTopBtn: function (button) {
        var outer = Ext.first('maincontainerwrap');
        var inner = outer.down('container[reference=mainCardPanel]');
        var animate = {
            duration: 1500,
            to: {
                y: 0
            }
        };
        inner.getEl().scrollIntoView(outer.getEl(), false, animate, true);

    },
    /**
     * The function 'onScroll' will fired when user will scroll the feeds in home of main view.
     * this function is responsible for scrolling the KarmaScore , ToDOList,YourPosition ,YourScore.
     * @param 'e' - which is an event.
     * @param 't' - which is a feed.
     * @param 'eOpts' - Object.
     */
    onScroll: function (e, t, eOpts) {
        try{
        var menu = Ext.ComponentQuery.query('#navigationTreeList')[0];
        var scrollTop = Ext.get(t).getScrollTop();
        if (menu && scrollTop) {
            scrollTop > 0 ? menu.addCls('fixed') : menu.removeCls('fixed');
        }
        if (location.hash.split('#')[1] && location.hash.split('#')[1] == 'home') {
            var scrollTop = Ext.get(t).getScrollTop(),
                karmascoreBox, headerBox, todolistBox,
                karmascore = Ext.ComponentQuery.query('yourkarmascore')[0];
            header = Ext.ComponentQuery.query('toolbar[itemId=headerBar]')[0];
            todolist = Ext.ComponentQuery.query('todolist[name=homeTodoList]')[0];
            if (karmascore && header && todolist) {
                this.scrollingFun(karmascore, header, todolist, karmascoreBox, headerBox, todolistBox, e, t, eOpts);
            }
        }
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.ONSCROLL, err);
     } 
    },
    /**
     * the function is responsible for setting the KarmaScore,ToDoLisScore,YourScore and YourProfile.
     * @param 'karmascore' - containing the karma Score of employee.
     * @param 'karmascore' - containing the header.
     * @param 'karmascore' - containing the todolist.
     * @param 'e' - which is an event.
     * @param 't' - which is a feed.
     * @param 'eOpts' - Object.
     */
    scrollingFun: function (karmascore, header, todolist, karmascoreBox, headerBox, todolistBox, e, t, eOpts) {
        karmascoreBox = karmascore.getEl().getBox(),
            headerBox = header.getEl().getBox(),
            todolistBox = todolist.getEl().getBox();
        if (!karmascore.hasCls('fixed')) {
            if ((karmascoreBox.top - headerBox.bottom) <= 20) {
                Ext.util.CSS.removeStyleSheet('ScrollFixKarmaHeader');
                karmascore.addCls('fixed');
                eOpts.scope.getViewModel().set('scrolltopbtn', false);
            }
        } else {
            if ((karmascoreBox.top - todolistBox.bottom) <= 20) {

                karmascore.removeCls('fixed');
                eOpts.scope.getViewModel().set('scrolltopbtn', true);
            }
        }
        this.checkFeedData(e, t);
    },
/**
 * This function will show the scroll top button
 * @param {Ext.button.Button} btn - which is a butten referance.
 */
    onShowScrollTopBtn: function (btn) {
        btn.removeCls('hide');
        btn.addCls('show');
    },
/**
 * This function will hide the scroll top button
 * @param {Ext.button.Button} btn - which is a butten referance.
 */
    onHideScrollTopBtn: function (btn) {
        btn.removeCls('show');
        btn.addCls('hide');
    },
    /**
     * The function onRedeemBtnClick is fired when the 'click' event is hit in the ViewPort.js.
     * this function will open the redeem window .
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     * @param e - which is an event.
     */
    onRedeemBtnClick: function (btn, e) {
        try{
        var redeemView, loginStore,
            rewardPoints;
        redeemView = Ext.ComponentQuery.query('redeem-view')[0] || Ext.create('Redeem.view.RedeemView');
        Ext.getStore('aboutlist.UserAbout').load({
            scope: this,
            callback: function (records, operation, success) {
                console.log(records);
                loginStore = Ext.getStore('login');
                if (records && records.length > 0) {
                    loginStore.getAt(0).get('score').rewardpoints = records[0].get('rewardpoints');
                }
                rewardPoints = loginStore.getAt(0).get('score').rewardpoints;
                if (redeemView) {
                    redeemView.getViewModel().set('rewardPoints', rewardPoints);
                    redeemView.show();
                }
            }
        });
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.REDEEM, err);
     }
    },
    /**
     * The function onNominateBtnClick is fired when the 'click' event is hit in the ViewPort.js.
     * this function will open the nominate window  according to user requirement.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     */
    onNominateBtnClick: function (btn) {
        try{
        var onject = {};
        var nominateView, catStore, karmaStore,
            nomViewModel, nomWindowForm, nominateIcons,
            karmaId = null,
            isFeedBack, htmlEditor;
        Utility.nominateProjectId = null;
        Utility.isKarmaNominate = true;
        catStore = Ext.getStore('karmasetup.KarmaCategoriesStore');
        karmaStore = Ext.getStore('karmasetup.KarmaNominateStore');
        Ext.getStore('setup.employeesetup.ReportingStore').load();
        Ext.getBody().mask('Loading...');
        if (btn.name !== "nominateothers") {
            var loginStore = Ext.getStore('login'),
                designation;
            if (loginStore) {
                designation = loginStore.getAt(0).data.designation;
            }
            catStore.getProxy().extraParams = {
                designation: designation
            }
        } else {
            catStore.getProxy().extraParams = {
                designation: ''
            }
        }
        catStore.load({
            scope: this,
            callback: function (record, response, success) {
                Ext.getBody().unmask();
                if (btn.name == "nominateothers") {
                    nominateView = Ext.ComponentQuery.query('nominateotherswindow')[0] || Ext.create('DDO.view.nominate.nominateothers.NominateOthersWindow');
                } else {
                    nominateView = Ext.ComponentQuery.query('selfnominatewindow')[0] || Ext.create('DDO.view.nominate.selfnomination.SelfNominateWindow');
                }
                karmaStore.load({
                    scope: this,
                    callback: function (record, response, success) {
                        Ext.getBody().unmask();
                        //   this.storeReferanceFn(btn, htmlEditor,nominateView);
                        if (btn.name == "nominateothers") {
                             nomWindowForm = nominateView.lookupReference('nominateviewform');
                             nomViewModel = nomWindowForm.getViewModel();
                             nomRatingView = nomWindowForm.lookupReference('nominateratingselectorref');
                             nomWinController = nomWindowForm.getController();
                             nomcomboContainerRef = nomWindowForm.lookupReference('nominatecontainer');
                            karmaComboView = nomWindowForm.down('combo[reference=nominatekarmacombo]');
                            // nomBtnGrp = nomRatingView.down('buttongroup');
                            // nomSplitBtnRef = nomRatingView.down('splitbutton[reference=splitbtnref]');
                             nomWindowForm.lookupReference('karmaGivenDate').setHidden(false);
                           var  textarea = nomWindowForm.down('textarea');
                            if (textarea.hasCls('profilenominatehtmledit-top')) {
                                textarea.removeCls('profilenominatehtmledit-top');
                                textarea.addCls('nominatehtmledit-top');
                            };
                        } else {
                            nomWindowForm = nominateView.down('selfnominateviewform');
                            nomViewModel = nominateView.getViewModel();
                            // nomRatingView = nominateView.down('nominateratingselector');
                            nomRatingView = nominateView.down('nominateothersratingselector');
                            nomWinController = nominateView.getController();
                            karmaComboView = nomWindowForm.down('combo[reference=selfnominatekarmacombo]');
                        }
                         nomViewModel.set('profileNominationType', false);
                         nomViewModel.set('iconSelection', null);
                         nomViewModel.set('points', 0);
                         nomViewModel.set('ratingView', true);
                         nomViewModel.set('ruleView', true);
                         nomViewModel.set('scoreText', "For Each Member");
                         // nominateIcons = nomWindowForm.down('nominateviewicons');
                        nominateIcons = nomWindowForm.down('nominateothersviewicons');
                        if (nominateIcons) {
                            var selModel = nominateIcons.getSelectionModel();
                            selModel.deselectAll(true);
                            navModel = nominateIcons.getNavigationModel();
                            if (navModel && navModel.getLastFocused()) {
                                navModel.lastFocused = null;
                            }
                        }
                        if (btn.name == "nominateothers") {
                            // if (nomBtnGrp == null) {
                            //     Utility.isRendered = true;
                            // }
                            // if (nomBtnGrp) {
                            //     nomBtnGrp.items.items.forEach(function (rec) {
                            //         if (rec.hasCls("nom-selected-btn-cls")) {
                            //             rec.removeCls("nom-selected-btn-cls");
                            //             rec.addCls("nominate-btn-cls");
                            //         }
                            //     });
                            // }
                            // if (nomRatingView.hasCls("nominate-profiledetailview-cls")) {
                            //     nomRatingView.removeCls("nominate-profiledetailview-cls");
                            //     nomRatingView.addCls("nominate-detailview-cls");
                            // }
                            // if (nomcomboContainerRef.hasCls("nominateprofilecombocontainer")) {
                            //     nomcomboContainerRef.removeCls("nominateprofilecombocontainer");
                            //     nomcomboContainerRef.addCls("nominatecombocontainer");
                            // }
                        }
                        if (btn.name == "nominateothers") {
                            nomViewModel = nomWindowForm.getViewModel();
                        } else {
                            nomViewModel = nominateView.getViewModel();
                        }
                        nomViewModel.set('iconSelection', null);
                        nomViewModel.set('points', 0);
                        nominateView.getViewModel().set('profileName', this.getViewModel().get('name'));
                        // nomViewModel.set('nomBtn', false);
                        if (btn.name == "nominateothers") {
                            // if (nomSplitBtnRef) {
                            //     nomSplitBtnRef.setText("Events");
                            // }
                            // if (nomBtnGrp) {
                            //     nomBtnGrp.items.items.forEach(function (rec) {
                            //         if (rec.text == "Feedback") {
                            //             if (btn.name == "selfnominate") {
                            //                 var recText = rec.text;
                            //                 nomViewModel.set("categoryName", recText);
                            //                 nomViewModel.set('category', rec.id);
                            //             }
                            //             isFeedBack = true;
                            //             rec.addCls("nom-selected-btn-cls");
                            //             karmaStore.clearFilter(true);
                            //             karmaStore.filterBy(function (rec) {
                            //                 if (rec.get('karmacategoryname') == "Feedback") {
                            //                     nomViewModel.set('categoryComboValue', rec.data.karmacategoryid);
                            //                     nomViewModel.set('iconSelection', null);
                            //                     if ((rec.get('karmacategoryname') == "Feedback") && isFeedBack && (rec.get('name') == "Customer FeedBack")) {
                            //                         karmaId = rec.get('ddo_karma_id');
                            //                         console.log(karmaId);
                            //                         nomWinController.onKarmaComboSelect(karmaComboView, rec);
                            //                         return true;
                            //                     }
                            //                     return true;
                            //                 }
                            //                 return false;
                            //             });
                            //         }
                            //     });
                            //     if (!isFeedBack) {
                            //         karmaStore.filter(function (rec) {
                            //             if (rec.get('karmacategoryname') == "-") {
                            //                 nomViewModel.set('categoryComboValue', rec.data.karmacategoryid);
                            //                 nomViewModel.set('iconSelection', null);
                            //                 karmaStore.clearFilter(true);
                            //             }
                            //         })
                            //     }
                            // }
                             nomWindowForm.lookupReference('ratingcomment').setValue(null);
                             nomWindowForm.down('tagfield').setHidden(false);
                             nomViewModel.set('karmaComboValue', karmaId);
                             nomViewModel.set('tagId', null);
                        } else {
                            if (nominateView.down("form")) {
                                nominateView.down("form").reset();
                                var nominateFormView = nominateView.down("form"),
                                    empCombo = nominateFormView.down('[name=emp_id_combo]'),
                                    textArea = nominateFormView.down('[name=comments]'),
                                    loginStore = Ext.getStore('login'),
                                    loginEmployeeId = loginStore.getData().getAt(0).get('ddo_employee_id'),
                                    roles = loginStore.getData().getAt(0).get('roles');
                                var match = true;
                                roles.forEach(function (rec) {
                                    if (rec.rolename == "Admin") {   // empCombo.setHidden(false);
                                        empCombo.setValue(loginEmployeeId);  // setReadOnly(false) if you want to edit the combo value.
                                        empCombo.setReadOnly(true);
                                        textArea.addCls('nominate-form-htmleditor-cls');
                                        nominateView.down("form").removeCls('selfNom-form');
                                        match = false;
                                    }
                                })
                                if (match == true) {
                                    empCombo.setHidden(true);
                                    textArea.removeCls('nominate-form-htmleditor-cls');
                                    nominateView.down("form").addCls('selfNom-form')
                                }
                            }
                            var karmaComboStore = Ext.getStore('karmasetup.KarmaNominateStore');
                            karmaComboStore.clearFilter(true);
                            karmaComboStore.filterBy(function (rec) {
                                if (rec.get('karmacategoryname') == '-') {
                                    return true;
                                }
                                return false;
                            });
                        }
                        Ext.getBody().unmask();
                        catStore.clearFilter(true);
                        // if (btn.name == 'sendbackbtn') {
                        //     if (this.getView().getViewModel().get('sentBackNomCount') == 0) {
                        //         Utility.toastReuseFn('t', 'You Dont Have Sent Back Nominations');
                        //     }
                        //     nominateView.down('tabpanel').setActiveTab(1);
                        // } else if (btn.name == 'selfnominate') {
                        //     nominateView.down('tabpanel').setActiveTab(0);
                        // }
                        nominateView.show().center();
                    }
                });
            }
        });
    } catch (err) {
        Utility.showToast(Messages.VIEWPORT.NOMINATEBTN, err);
     }
    },

    //     storeReferanceFn: function(btn, htmlEditor ,nominateView){
    //         debugger;
    //     if (btn.name == "nominateothers") {
    //         nomWindowForm = nominateView.lookupReference('nominateviewform');
    //         nomViewModel = nomWindowForm.getViewModel();
    //         nomRatingView = nomWindowForm.lookupReference('nominateratingselectorref');
    //         nomWinController = nomWindowForm.getController();
    //         nomcomboContainerRef = nomWindowForm.lookupReference('nominatecontainer');
    //         karmaComboView = nomWindowForm.down('combo[reference=nominatekarmacombo]');
    //         nomBtnGrp = nomRatingView.down('buttongroup');
    //         nomSplitBtnRef = nomRatingView.down('splitbutton[reference=splitbtnref]');
    //         nomWindowForm.lookupReference('karmaGivenDate').setHidden(false);
    //         htmlEditor = nomWindowForm.down('htmleditor');
    //         if (htmlEditor.hasCls('profilenominatehtmledit-top')) {
    //             htmlEditor.removeCls('profilenominatehtmledit-top');
    //             htmlEditor.addCls('nominatehtmledit-top');
    //         };
    //     } else {
    //         nomWindowForm = nominateView.down('selfnominateviewform');
    //         nomViewModel = nominateView.getViewModel();
    //         // nomRatingView = nominateView.down('nominateratingselector');
    //         nomRatingView = nominateView.down('nominateothersratingselector');
    //         nomWinController = nominateView.getController();
    //         karmaComboView = nomWindowForm.down('combo[reference=selfnominatekarmacombo]');
    //     }
    // },

    /**
     * The function profileRender is render when user click on the profile butten.
     * This function will set the profile picture.
     * @param 'comp' - which is containing the manuitem .
     * @param 'eve' - which is an event.
     */
    profileRender: function (comp, eve) {
        var compEl = document.getElementsByClassName(comp.iconCls)[0],
            mainViewPort = Ext.ComponentQuery.query('mainviewport')[0],
            image = mainViewPort.getViewModel().get('profileImg');
        compEl.style.background = "url(" + image + "),url(" + Utility.defaultImg + ")";
        compEl.style.borderRadius = '50%';
        compEl.style.backgroundSize = 'cover';
    },
    /**
     * The function showLocation will perform when the  'click' event is fired from Viewport.js.
     * This function will open the location window.
     * @param 'a' - which is containing the manuitem .
     * @param 'b' - which is an event.
     */
    showLocation: function (a, b) {
        try{
        var viewPort = Ext.ComponentQuery.query('mainviewport')[0],
            record = Ext.getStore('login').getRange()[0].getData();
        var win = Ext.create('Ext.window.Window', {
            title: 'Location',
            height: Constants.ViewportHeight * 0.771,
            width: Constants.ViewportWidth * 0.366,
            viewModel: 'mainviewport',
            mainView: viewPort,
            items: [{
                xtype: 'ddomap'
            }]
        });
        win.show();
       } catch (err) {
        Utility.showToast(Messages.VIEWPORT.LOCATION, err);
     }
    }

});