Ext.define('DDO.util.Utility', {
    singleton: true,
    alternateClassName: ['Utility'],

    isProfileImage: true,

    isFormDirty: false,

    likeImgAnim: false,

    profileAppeared: null,

    todoEdited: false,

    userAboutData: null,

    ratingId: 0,

    dashboard: false,

    sliderEndRangeValue: null,

    toastReusable: null,

    myMask: null,

    nominatAlert: true,

    feedUploadsImage: [],

    shareValue: true,

    commentsData: null,

    feedEditedForm: null,

    menuform: true,

    MONTHNAME: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    metaUrlArr: [],

    postTimer: "",

    empDes: null,

    isNewlyAddedRecords: false,

    emptyTextDataArray: null,

    recCountValues: [],

    goalsArray: [],

    addedTags: [],

    deletedTags: [],

    goalsharetaggedList: [],

    //goaldate:null,

    projectPeopleId: null,

    nominateProjectId: null,

    hashCodeUrl: null,

    imageurl: null,

    feedsStartValue: 0,

    minChars:20,

    isFeedScrollLoad: true,

    colorPicker: ['#ea4536', '#34a750', '#f8bb13', '#afafaf', '#131313'],
    holidaysroleaccess:['HR Manager'],

    filterObj: {},

    isIconSelected: false,

    isAlertActive: false,

    activeWindowCount: 0,

    isRendered: false,
    sentBackRecords: [],
    selfSendBackgridRec: [],
    appImage: null,
    appChangedImage: [],
    isKarmaMaskLoaded : true,
    reportingManagerChanged :null,
    currentReportingManager : null,
    defaultUserImg:"this.src=`resources/images/profileImageMissing.jpg`",
    defaultImg:'resources/images/profileImageMissing.jpg',
    defaultPostImg:"this.src=`resources/images/postNotFound.jpg`",
    defaultProjectImg:"this.src=`resources/images/project.jpeg`",
    projectImg:"resources/images/project.jpeg",
    reportingManagerOldVal :null,
    reportingManagernewVal:null,

    countRadioNewAllocation: 0,
    countAsset:1,
    countKarmaData: 0,
    karmaCategoryCount : 0,
    constructor: function(config) {
        var me = this;
        Ext.apply(this, config);
        this.initConfig(config);
        Ext.Ajax.on('requestexception', function (connection, response, options) {
            if (response && response.status == 401) {
                me.clearSession();
            }
        });
    },

    clearSession: function () {
        sessionStorage.removeItem('authentication');
        sessionStorage.removeItem('refreshToken');
        var keycloak = KeycloakLoader.getKeycloak();
        if (!keycloak) {
            KeycloakLoader.initialize();
            keycloak = KeycloakLoader.getKeycloak();
        }
        keycloak.logout();
    },

    /**
     * To reuse the toast box
     * params -> align and message
     */
    toastReuseFn: function (align, message) {
        if (!Utility.toastReusable) {
            Utility.toastReusable = Ext.create('Ext.window.Toast', {
                closeAction: 'hide',
                align: align,
                saveDelay: 3000
            });
        }
        Utility.toastReusable.update(message);
        Utility.toastReusable.show();
    },

    /**
     * To verify the image format
     * whether it is in JPG, JPEG, PNG format
     * params -> scope(scope), filefield, url, scb & fcb(callbacks)
     */
    uploadImgFormatFn: function (scope, filefield, url, scb, fcb) {
        var me = scope,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = filefield.value,
            reader = new FileReader(),
            format = file.type;

        reader.onload = function () {
            if (format == "image/png" || format == "image/jpg" || format == "image/jpeg") {
                document.domain = document.domain;
                // filefield.up('form').add({
                //     xtype:'hiddenfield',
                //     name:'domain',
                //     value: document.domain
                // });
                filefield.up('form').submit({
                    url: url,
                    scope: filefield.up('form'),
                    params: {
                        domain: document.domain
                    },
                    success: function (formPanel, action) {
                        scb(formPanel, action);
                    },
                    failure: function (formPanel, action) {
                        fcb(formPanel, action);
                    }
                });
            } else {
                Utility.toastReuseFn('t', AlertMessages.imageFormat);
                filefield.reset();
            }
        };
        reader.readAsDataURL(file);
    },

    getNoonText: function () {
        var currentTime = Ext.Date.format(new Date(), 'H');
        var noon;
        if (currentTime >= 00 && currentTime < 12) {
            noon = 'Morning';
        } else if (currentTime >= 12 && currentTime < 16) {
            noon = 'Afternoon';
        } else {
            noon = 'Evening';
        }
        return noon;
    },

    isSessionActive: function (success, failure) {
        var sessionResult = false;
        Ext.Ajax.request({
            //url: Api.URL.utility.READ,

            url: '/auth/checksession',

            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj) {
                    sessionResult = obj.session;
                    if (sessionResult) {
                        success();
                    } else {
                        failure();
                    }
                }
            },
            failure: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj) {
                    sessionResult = obj.session;
                    failure();
                }
            }
        });
    },

    fireAjax: function (config, successCallback, failureCallback, callback, roleAccessGrid) {
        Ext.Ajax.request({
            url: config.url,
            method: config.method || "GET",
            params: config.params || {},
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj) {
                    success = obj.success;
                    if (obj.data) {
                        if (obj.data.about && obj.data.about.length > 0) {
                            Utility.profileAppeared = obj.data.about[0].ddo_employee_id;
                        }
                    } else {
                        Utility.profileAppeared = null;
                    }

                    if (success) {
                        successCallback && successCallback(obj.data, obj, roleAccessGrid);
                    } else {
                        failureCallback && failureCallback({});
                    }
                }
            },
            failure: function (response, opts) {
                failureCallback && failureCallback({
                    type: "networkfailure"
                });
            },
            callback: function () {
                callback && callback();
            }
        });
    },

    gravatarImageUrl: function (email) {
        if (email) {
            if (!String.prototype.trim) {
                email = email.toLowerCase().replace(/^\s+|\s+$/g, '');
            } else {
                email = email.toLowerCase().trim();
            }
        } else {
            email = '';
        }
        return Api.GRAVATAR_URL + md5(email) + Api.GRAVATAR_DEFAULT_PARAMS_URL;
    },

    profileImg: function () {
        var loginStore = Ext.getStore('login'),
            userRecord = loginStore.getAt(0),
            userData = userRecord.data;
        return this.imageCheck(userData.user_profile_pic_url)
    },

    dashboardRemovalFn: function (navigationTreeList, viewModel) {
        //*******//
        if (navigationTreeList) {
            var rolesConfig = {
                url: "roleviewaccess/getRoles"
            }
            var roleSuccessCallback = function (data1) {
                //TODO: Add validation for null data from getroles.

                if (data1 && !Ext.isEmpty(data1.cumulativeAccess)) {
                    var rolesAccess = data1.cumulativeAccess;
                    var keepRec = [];
                    var mainCardPanel = Ext.ComponentQuery.query('#contentPanel')[0];

                    Ext.each(rolesAccess, function (obj) {
                        var rec = navigationTreeList.getStore().findNode('viewId', obj.viewId);

                        if (rec) {

                            if ((obj.viewId != 1) && obj.isRead == false && obj.isWrite == false) {

                                rec.remove();

                            } else {
                                keepRec.push(rec.get('viewId'));
                            }
                        } else if (obj.isRead == true || obj.isWrite == true) {
                            keepRec.push(parseInt(obj.viewId));
                        } else {
                            //do nothing
                        }
                    });

                    //commented since not using for admin
                    // if (data1.roles[0].roleId == 91919191919) {
                    //     keepRec.push(3);
                    // }

                    var store = navigationTreeList.getStore();

                    for (var r = 0; r < store.getCount(); r++) {
                        var listItem = store.getAt(r);
                        var c;

                        var index = keepRec.indexOf(listItem.get('viewId'));


                        if (index == -1) {

                            listItem.remove();
                            r--;
                        }
                    }

                    if (viewModel) {
                        if (!viewModel.get('roleAccessingle') && mainCardPanel && mainCardPanel.items && mainCardPanel.items.items.length > 0) {
                            var mainCard, rec, routeId;

                            mainCard = mainCardPanel.items.items[0];

                            if (store.findNode('routeId', 'projects') && (location.hash.match(/project/) &&
                                    location.hash.match(/project/).length > 0)) {
                                //do nothing
                            } else {
                                routeId = mainCard.routeId;
                                rec = store.findNode('routeId', routeId);

                                if (!rec) {
                                    viewModel.set('nonRoleRouteId', routeId);

                                    var newView = Ext.create('DDO.view.pages.Error', {
                                        hideMode: 'offsets'
                                    });

                                    Ext.suspendLayouts();
                                    mainCardPanel.getLayout().setActiveItem(mainCardPanel.add(newView));
                                    Ext.resumeLayouts(true);
                                }
                                viewModel.set('roleAccessingle', true);
                            }
                        }
                    }
                    // If the user has acces to both karmascore and karmascore filters then only
                    // show the filters otherwise karmascore will be shown 
                    // TODO: Need to avoid using static id's 
                    if (keepRec.indexOf(26) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('showkarmascorefilters', false);
                    }
                    if (keepRec.indexOf(3) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('showkarmascorelogo', false);
                    }
                    if (keepRec.indexOf(29) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('addNewProject', false);
                    }
                    if (keepRec.indexOf(30) != -1) {
                        // navigationTreeList.up('mainviewport').getViewModel().set('projectNewResources', false);
                    }
                    if (keepRec.indexOf(75) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('showJobsCreateBtn', false);
                    }
                    if (keepRec.indexOf(70) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('editAction', true);
                    }
                    if (keepRec.indexOf(71) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('deleteAction', true);
                    }
                    if (keepRec.indexOf(72) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('closeAction', true);
                    }
                    if (keepRec.indexOf(73) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('approveAction', true);
                    }
                    if (keepRec.indexOf(74) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('rejectAction', true);
                    }
                    if (keepRec.indexOf(76) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('showJobAppCreateBtn', false);
                    }
                    if (keepRec.indexOf(77) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('editJobApplication', true);
                    }
                    if (keepRec.indexOf(78) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('deleteJobApplication', true);
                    }
                    if (keepRec.indexOf(79) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('addInterviewShow', true);
                    }
                    if (keepRec.indexOf(81) != -1) {
                        navigationTreeList.up('mainviewport').getViewModel().set('jobAppStatusDisable', false);
                    }

                }

            }
            var roleFailureCallback = function (data1) {}

            var roleCallback = function () {}

            Utility.fireAjax(rolesConfig, roleSuccessCallback, roleFailureCallback, roleCallback);

        }
        //*******//
    },

    // modified the code related to work the animation functionality in modern viewshowJobsCreateBtn

    setFadeAnim: function (view, from, to) {
        var element;
        if (view.element)
            element = view.element;
        else
            element = view.getEl();

        element.animate({
            duration: 1000,
            keyframes: {
                from: {
                    opacity: from
                },
                to: {
                    opacity: to
                }
            }
        });
        return view;
    },

    /** 
     * This method is used set the month field to current month when year field
     * points to the current year and the month selected is greater than the current month.
     *
     * @param {Object} The year field reference
     * @param {Object} The month field reference
     */
    validateMonth: function (yearfield, monthfield) {
        var enteredvalue = parseInt(yearfield.getValue()),
            currentyear = new Date().getFullYear(),
            currentmonth = Ext.Date.format(new Date(), 'm'),
            monthvalue, monthindex, currentmonthindex;

        if (monthfield.lastSelection && monthfield.lastSelection[0]) {
            monthvalue = monthfield.lastSelection[0].data.value;
            monthindex = Ext.Date.getMonthNumber(monthvalue) || parseInt(monthvalue) - 1;
            currentmonthindex = new Date().getMonth();

            if (enteredvalue === currentyear) {

                if (currentmonthindex > monthindex) {
                    //do nothing
                } else {
                    monthfield.setValue(currentmonth);
                }
            }
        }
    },

    validateDescription: function (editor, newValue, oldValue) {
        if (newValue.length > 1023) {

            Ext.Msg.alert("Error", "Maximum Length is exceeded");
            editor.setValue(newValue.substring(0, 1023));
        }
    },



    /**
     * This method fires an event on a component.
     * This implements a mechanism to call itself recursively until 
     * the component exists.
     *
     * @param target The query selector of the component or the component itself.
     * @param eventName The name of the event to be fired upon the target.
     * @param args ... The rest of the arguments to pass to the firing event.
     */
    fireOn: function (target, eventName) {
        // target is not a component then query for it
        targetCmp = (typeof target !== 'string') ? target : Ext.ComponentQuery.query(target)[0];
        if (!targetCmp) {
            Ext.defer(
                Ext.bind(this.fireOn, this, arguments),
                500
            );
            return;
        }
        var args = Ext.Array.slice(arguments, 1);
        // args.unshift(eventName);

        targetCmp.fireEvent.apply(targetCmp, args);
    },


    userLiked: function (values) {
        var likedUsers = values || [],
            loginStore = Ext.getStore("login"),
            userRecord = loginStore.getAt(0),

            // Currently not using user_id, instead using cbpid
            // userId = userRecord && userRecord.get("user_id"),
            userId = userRecord && userRecord.get("ddo_employee_id"),

            likedUser = Ext.Array.findBy(likedUsers, function (o) {
                return o.like_user_id == userId;
            });
        return likedUser ? true : false;
    },


    EndYearChange: function (endyearfield, me) {
        var startyearvalue = me.getView().lookupReference('startyear').getValue(),
            endyear = endyearfield.getValue(),
            startmonth, startmonthindex, endmonthfield, endmonth, tomonthindex;

        if (startyearvalue) {
            if (endyear < startyearvalue) {
                Ext.Msg.alert('ERROR', 'Start year cannot be greater than end year.');
                endyearfield.setValue('');
            } else if (endyear === startyearvalue) {
                startmonth = me.getView().lookupReference('startmonth').getValue();
                startmonthindex = new Date(startmonth + '-1-01').getMonth() || parseInt(startmonth) - 1;
                endmonthfield = me.getView().lookupReference('endmonth');
                endmonth = endmonthfield.getValue();
                tomonthindex = Ext.Date.getMonthNumber(endmonth) || parseInt(endmonth) - 1;
                if (startmonthindex > tomonthindex) {
                    Ext.Msg.alert('ERROR', 'Start month cannot be greater than end month.');
                    endmonthfield.setValue('');
                }
            }
        }
    },

    EndMonthChange: function (endmonthfield, me) {
        var fromMonth = me.getView().lookupReference('startmonth').getValue(),
            endMonth = endmonthfield.getValue(),
            startYearValue = me.getView().lookupReference('startyear').getValue(),
            endYearValue = me.getView().lookupReference('endyear').getValue(),
            endMonthIndex, fromMonthIndex;

        if (endMonth) {
            endMonthIndex = Ext.Date.getMonthNumber(endMonth) || parseInt(endMonth) - 1;
        }
        if (fromMonth) {
            fromMonthIndex = Ext.Date.getMonthNumber(fromMonth) || parseInt(fromMonth) - 1;
        }
        if (startYearValue === endYearValue && !Ext.isEmpty(fromMonthIndex) && !Ext.isEmpty(endMonthIndex)) {
            if (endMonthIndex < fromMonthIndex) {
                Ext.Msg.alert('ERROR', 'Start month cannot be greater than end month.');
                endmonthfield.setValue('');
            }

        }
    },

    StartMonthChange: function (startmonthfield, me) {
        var toMonth = me.getView().lookupReference('endmonth').getValue(),
            fromMonth = startmonthfield.getValue(),
            startYearValue = me.getView().lookupReference('startyear').getValue(),
            endYearValue = me.getView().lookupReference('endyear').getValue(),
            toMonthIndex, fromMonthIndex;

        if (toMonth) {
            toMonthIndex = Ext.Date.getMonthNumber(toMonth) || parseInt(toMonth) - 1;
        }
        if (fromMonth) {
            fromMonthIndex = Ext.Date.getMonthNumber(fromMonth) || parseInt(fromMonth) - 1;
        }
        if (startYearValue === endYearValue && !Ext.isEmpty(toMonthIndex) && !Ext.isEmpty(fromMonthIndex)) {
            if (fromMonthIndex > toMonthIndex) {
                Ext.Msg.alert('ERROR', 'Start month cannot be greater than end month.');
                startmonthfield.setValue('');
            }

        }
    },

    StartYearChange: function (startyearfield, me) {
        var endYearValue = me.getView().lookupReference('endyear').getValue(),
            startYear = startyearfield.getValue(),
            startMonth, startMonthIndex, endMonthField, endMonth, toMonthIndex;

        if (startYear && endYearValue) {
            if (startYear > endYearValue) {
                Ext.Msg.alert('ERROR', 'Start year cannot be greater than end year.');
                startyearfield.setValue('');
            }
        } else if (endYearValue === startYear) {
            startMonth = me.getView().lookupReference('startmonth').getValue();
            startMonthIndex = new Date(startMonth + '-1-01').getMonth() || parseInt(startMonth) - 1;
            endMonthField = me.getView().lookupReference('endmonth');
            endMonth = endMonthField.getValue();
            toMonthIndex = Ext.Date.getMonthNumber(endMonth) || parseInt(endMonth) - 1;
            if (startMonthIndex > toMonthIndex) {
                Ext.Msg.alert('ERROR', 'Start month cannot be greater than end month.');
                endMonthField.setValue('');
            }
        }
    },
    //mobile specific methods 

    mobileUserLiked: function (values) {
        var likedUsers = values.post_like_users || [],
            loginStore = Ext.getStore("login"),
            userRecord = loginStore.getAt(0),
            userId = userRecord && userRecord.get("user_id"),
            likedUser = Ext.Array.findBy(likedUsers, function (o) {
                return o.like_user_id == userId;
            });
        return likedUser ? "like-heart-active" : "";
    },

    mobileUserLikedAnim: function (values) {
        var likedUsers = values.post_like_users || [],
            loginStore = Ext.getStore("login"),
            userRecord = loginStore.getAt(0),
            userId = userRecord && userRecord.get("user_id"),
            likedUser = Ext.Array.findBy(likedUsers, function (o) {
                return o.like_user_id == userId;
            });
        return likedUser ? "likeAnim" : "";
    },

    feedsUrlLinkView: function (urllink, me) {
        var deferred = new Ext.Deferred(),
            data;

        Ext.Ajax.request({
            url: '/feed/linkUrl',
            method: 'POST',
            params: {
                data: urllink[0]
            },
            scope: me,
            success: function (response) {
                if (response.responseText) {
                    data = Ext.decode(response.responseText);
                }
                deferred.resolve(data);
            },
            failure: function (response) {
                Ext.Msg.alert('Error', "A critical error has occured.");
                deferred.reject(data);
            }

        });
        return deferred.promise;
    },

    confirmMessage: function (message, title, callback) {
        var confirmMsg = Ext.Msg.show({
            title: title,
            message: message,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: callback
        });
        return confirmMsg;
    },
    saveGroup: function (store, me, win, empArr) {
        if (store) {
            var method, params;
            var references = me.getReferences(),
                grpCombo = Ext.ComponentQuery.query('groupscombo')[0],
                grpView = Ext.ComponentQuery.query('groupsview')[0],
                grpName = grpCombo.down('combobox[reference = groupname]').getValue(),
                groupId = grpName;

            method = "POST";
            params = {
                emplist: empArr,
                group_id: groupId
            };

            Ext.Ajax.request({
                url: '/groupmembers',
                scope: me,
                method: method,
                params: params,
                success: function (response, opts) {
                    var viewModel = grpView.getViewModel(),
                        label = grpCombo.down('label[reference = labelref]'),
                        grpName = grpCombo.down('combobox[reference = groupname]').rawValue,
                        res = Ext.decode(response.responseText),
                        addPeopleGrpCnt = grpView.lookupReference('addpeopletogroupcnt');

                    viewModel.set('disableFormFields', true);
                    viewModel.set('nonEditSelections', true);
                    viewModel.set('nonEditEmpSelect', true);
                    viewModel.set('addGroupBtnDisable', true);
                    viewModel.set('editOrSaveButtonText', 'Edit');


                    viewModel.set('groupSearchFieldValue', null);

                    if (store.getCount() === 0) {
                        label.setData(grpName);
                    } else {
                        label.setData(grpName + ' (' + store.getCount() + ')');
                    }

                    addPeopleGrpCnt.refresh();
                    addPeopleGrpCnt.getStore().load({
                        params: {
                            group_id: groupId
                        }
                    });

                    Utility.toastReuseFn('t', AlertMessages.empAddedSuccess);
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
            if (win) {
                win.close();
            }
        }
    },
    groupInitialLoad: function (combo, record, eOpts) {
        var groupsView = Ext.ComponentQuery.query('groupsview')[0],
            grpWindow = Ext.ComponentQuery.query('groupswindow')[0] ||
            Ext.create('DDO.view.groups.GroupsWindow',{
                parentViewRef : groupsView
            }),
            label = groupsView.lookupReference('labelref'),
            userBtn = groupsView.lookupReference('usersref'),
            viewModel = groupsView.getViewModel(),
            empgroupstore = grpWindow.lookupReference('groupssearchview').getStore(),
            view = groupsView.lookupReference('addpeopletogroupcnt'),
            store = Ext.getStore('groups.SelectedEmpStore'),
            grpName = record.data.group_name,
            groupId = record.data.group_id,
            addpeopleBTn = groupsView.lookupReference('addPeopleBtn');

        if (grpName && grpName.length > 0) {
            userBtn.setData(grpName[0].toUpperCase());
        }

        if (userBtn) {
            userBtn.removeCls('userIcon-cls');
        }

        viewModel.set('addPeopleVisibility', false);
        viewModel.set('searchForm', true);
        viewModel.set('empListVisibility', true);
        viewModel.set('addPeopleLabel', true);
        viewModel.set('editOrSaveButtonText', 'Edit');
        viewModel.set('editOrSaveBtnDisable', true);
        viewModel.set('nonEditSelections', true);
        viewModel.set('nonEditEmpSelect', false);

        store.getProxy().extraParams = {
            'group_id': groupId
        };

        store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (records) {
                    empgroupstore.filterBy(function (rec) {
                        var exist;
                        for (var i = 0, len = records.length; i < len; i++) {
                            if (rec.data.c_bpartner_id === records[i].data.c_bpartner_id) {
                                exist = true;
                            }
                        }

                        if (exist) {
                            return false;
                        } else {
                            return true;
                        }
                    });
                    if (view.getStore().getCount() === 0) {
                        label.setData(grpName);
                    } else {
                        label.setData(grpName + ' (' + store.getCount() + ')');
                    }
                } else {
                    empgroupstore.clearFilter(true);
                    label.setData(grpName);
                }
            }
        });

        view.getStore().removeAll();

        if (view.getStore().getCount() === 0) {
            label.setData(grpName);
        }
    },

    accountInitialLoad: function (me) {
          var store = Ext.getStore('setup.AccountStore');
        
        store.load({
            scope: me,
            callback: function (records, operations, eOpts) {
                if (records && records.length > 0) {
                    var rec, Refs,
                        cityRef, stateRef;

                    rec = records[0];
                    Refs = me.getReferences();

                    me.getForm().loadRecord(rec);

                    Ext.defer(function () {
                        Utility.onMakeLoadDirtyFalse(me, store);
                    }, 500, this);

                }
            }
        });
    },

    onMakeLoadDirtyFalse: function (form, store) {
        var storeRecord = store.getAt(0);

        if (!(storeRecord.data == null)) {
            record = storeRecord.data;

            fields = form.getForm().getFields().items;
            Ext.each(fields, function (field) {
                if (field.xtype == "combobox") {
                    record = field.getStore().findRecord(field.valueField, field.getValue());
                    if (record) {
                        field.originalValue = record.data[field.valueField];
                    } else if (Ext.isEmpty(field.getValue())) {
                        field.originalValue = field.getValue();
                    }
                } else {
                    field.originalValue = field.getValue();
                }
            });
        }
    },


    /* Meta Replace Block Functionalities*/

    //To verfiy url status and send to metaUrlMap funtion
    metaUrlReplaceStatus: function (post_content, post_id, access) {
        var urlSplit = post_content.replace(/(?:\r\n|\r|\n)/g, '<br />'),
            urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
            urllink = urlSplit.match(urlRegex);

        if (urllink && Ext.os.deviceType === 'Desktop') {
            this.metaUrlMap(post_id, urllink[0], access);
        }
    },

    //To push or get or send xhr request map function
    metaUrlMap: function (id, metaUrl, access) {
        if (id && metaUrl && !access) {
            this.metaUrlArr.push({
                id: id,
                metaUrl: metaUrl
            })
        }

        if (!access) {
            if (metaUrl) {
                this.replaceUrlWithMetadata(id, metaUrl);
            } else {
                for (var i = 0, len = this.metaUrlArr.length; i < len; i++) {
                    this.replaceUrlWithMetadata(this.metaUrlArr[i].id, this.metaUrlArr[i].metaUrl)
                }
            }
        } else {
            if (id && metaUrl) {
                this.replaceUrlWithMetadata(id, metaUrl);
            }
        }
    },

    //Replace the metadata to the feeds by loading xhr request
    replaceUrlWithMetadata: function (id, metaUrl) {
        //simple XHR request in pure JavaScript
        function load(url, callback) {
            var xhr;

            if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
            else {
                var versions = ["MSXML2.XmlHttp.5.0",
                    "MSXML2.XmlHttp.4.0",
                    "MSXML2.XmlHttp.3.0",
                    "MSXML2.XmlHttp.2.0",
                    "Microsoft.XmlHttp"
                ]

                for (var i = 0, len = versions.length; i < len; i++) {
                    try {
                        xhr = new ActiveXObject(versions[i]);
                        break;
                    } catch (e) {}
                } // end for
            }

            xhr.onreadystatechange = ensureReadiness;

            function ensureReadiness() {
                if (xhr.readyState < 4) {
                    return;
                }

                if (xhr.status !== 200) {
                    return;
                }

                // all is well  
                if (xhr.readyState === 4) {
                    callback(xhr);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var params = 'data=' + metaUrl + '&post_id=' + id;
            xhr.send(params);
        }

        //and here is how you use it to load a json file with ajax
        load('/feed/linkUrl', function (xhr) {
            //Need feeds view to update the layout since updating the metadata using dom element
            var feedscontainer = Ext.ComponentQuery.query('feedscontainergrid')[0];

            feedscontainer.suspendLayout = true;

            var result = Ext.decode(xhr.responseText);
            if (result.data.data) {
                var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                var resData = result.data.data;
                resData.staticUrl = resData.staticUrl.replace(urlRegex, function (url) {
                    var refUrl;

                    if (!url.match(/http/)) {
                        refUrl = "http://" + url;
                    } else {
                        refUrl = url;
                    }


                    return refUrl;
                });

                var htmlContent = '<a class="link-ref-cls" href="' + resData.staticUrl + '" target="_blank"><table><tr>';

                if (resData.ogTitle || resData.ogDescription) {
                    htmlContent = htmlContent.concat('<td class="postUrlView-feed-div">');

                    if (resData.ogTitle) {
                        htmlContent = htmlContent.concat('<span class="postUrl-title">' + resData.ogTitle + '</span><br>');
                    }

                    if (resData.ogDescription) {
                        htmlContent = htmlContent.concat('<span class="postUrl-description">' + resData.ogDescription + '</span>');
                    }

                    htmlContent = htmlContent.concat('</td>');
                }

                htmlContent = htmlContent.concat('</tr></table></a></div>');

                if (result.data.data && result.data.data.postId && document.getElementById('post_id_' + result.data.data.postId)) {
                    document.getElementById('post_id_' + result.data.data.postId).innerHTML = htmlContent;
                } else {
                    //do nothing
                }

                feedscontainer.suspendLayout = false;

                feedscontainer.updateLayout();
            }
        });
    },
    IdeatePostSetInterval: function (setTimerValue, feedsScope) {
        var me = this;

        if (setTimerValue) {
            if (me.emptyTextDataArray) {
                me.setTimerFn(me.emptyTextDataArray, feedsScope);
            } else {
                Ext.Ajax.request({
                    url: 'resources/data/postemptytext.json',
                    method: 'GET',
                    scope: me,
                    success: function (response) {
                        me.emptyTextDataArray = Ext.decode(response.responseText);
                        me.setTimerFn(me.emptyTextDataArray, feedsScope);

                    }
                });
            }



        } else {
            if (me.postTimer) {
                clearInterval(me.postTimer);
            }

        }

    },
    setTimerFn: function (emptyTextDataArray, feedsScope) {
        var me = this,
            count = 0;
        me.postTimer = setInterval(function () {
            feedsScope.getViewModel().set('postEmptyText', emptyTextDataArray.data[count].emptyText);
            if (count == 3) {
                count = 0;
            } else {
                count = count + 1;
            }

        }, 120000);
    },
    //Reusable purpose for tap to the outside of the window
    onWindowOutterTap: function (event, target, sourceController) {
        var target = target || event.target,
            cls = target.getAttribute('class'),
            window;
        if (cls && (cls.indexOf('x-mask') !== -1)) {
            window = sourceController.getView();
            if (sourceController.type == "walletwindowview" || sourceController.type == "karmawindowviewscontroller" || sourceController.type == "selfnominatewindowcontroller" || sourceController.type == "ruleviewcontroller" || sourceController.type == "employeesetupassignrolewindowcontroller") {
                //commented to remove animation for window outtertap.
                /* Ext.create('Ext.fx.Anim', {
                     target: window,
                     duration: 500,
                     from: {
                         bottom: 500,
                         top: 150
                     },
                     to: {
                         bottom: 150,
                         top: -700
                     }
                 });

                 Ext.defer(function() {
                     window.close();
                 }, 500, window);*/
                window.close();
            } else {
                window.close();
            }

        }
    },

    //Reusable purpose for tap to the outside of the window
    onSetUpWinOutterTap: function (event, target, sourceController) {
        var messageBox = Ext.ComponentQuery.query('window')[0];
        if (messageBox && messageBox.isVisible()) {
            return false;
        }
        var target = target || event.target,
            cls = target.getAttribute('class'),
            window, form, windowViewType,
            window = sourceController.getView(),
            form = window.down('form');

        if (cls && (cls.indexOf('x-mask') !== -1)) {

            windowViewType = sourceController.type;

            var selfnominatewindow = sourceController.getView();
            if (selfnominatewindow.xtype == 'selfnominatewindow') {
                selfnominatewindow.close();
            }
            if (selfnominatewindow.xtype == 'nominateotherswindow') {
                window.close();
            }
            if (form) {
                if (form.isDirty() == false) {
                    if (windowViewType) {
                        //commented to remove animation for window outtertap.
                        /* Ext.create('Ext.fx.Anim', {
                             target: window,
                             duration: 500,
                             from: {
                                 bottom: 500,
                                 top: 150
                             },
                             to: {
                                 bottom: 150,
                                 top: -700
                             }
                         });

                         Ext.defer(function() {
                             window.close();
                         }, 500, window);*/
                        window.close();

                    }

                } else if (form.isDirty() == false) {
                    window.close();
                }
            } else {
                window.close();
            }

        }
    },

    topAlertMessage: function (title, message) {
        var confirmMsg = Ext.create('Ext.window.MessageBox', {
            closeAction: 'destroy',
            alwaysOnTop: true,
            modal: true,
            listeners: {
                activate: function (me, eOpts) {
                    Utility.nominatAlert = false;
                },
                deactivate: function (me, eOpts) {
                    Utility.nominatAlert = true;

                }
            }
        }).show({
            buttons: Ext.Msg.OK,
            title: title,
            message: message
        });

        return confirmMsg;
    },

    notificationAlert: function (NotificationParams) {
        var n;
        if (Notification.permission !== 'granted') {

            Notification.requestPermission();
        }
        if (NotificationParams.type == "comment") {

            NotificationParams.message = "Comments on " + NotificationParams.message;

        } else {
            NotificationParams.username = "Post from " + NotificationParams.username;

        }

        n = new Notification(NotificationParams.username, {
            body: NotificationParams.message,
            icon: NotificationParams.userpic
        });
        n.onclick = function (event) {
            /*
                Focusing on the View 
            */
            window.focus();
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            //window.open('http://localhost:3100/#home');
        }
    },

    //request call for ddonomination API (reusable function)
    /** 
        @param scope - scope
        @params nominateParams - {karmaCategoryId, karmaId, karmaRatingId, karmaUnits, toCbpid, points, projectId, instantApprovalCbpid}
            # karmaCategoryId - karmaCategoryId (//ddo_karmacategory_id - Activity(1000000))
            # karmaId - karmaId (//ddo_karam_id - Ideate(1000017), SocialActivity(1000016))
            # karmaRatingId - karmaRatingId
            # karmaUnits - karmaUnits
            # toCbpid - toCbpid
            # points - points (karma_points & reward_points)
            # projectId - projectId
            # karmaRuleId: ruleId,
            # likePostCbpId: likePostCbpId
        @param comment - comment //Nominate and feedwindow comments
        @param showalert - showalert //To show the alert, if nominated successfully
        @param callback - cb //If want any callback from success or failure function
        @param successCallback - successCallback //success callback function
        @param failureCallback - failureCallback //failure callback function
    */
    nominateProcess: function (scope, nominateParams, comment, showalert, cb, successCallback, failureCallback) {

        var params = {
                comment: comment,
                points: nominateParams.points,
                karmaId: nominateParams.karmaId,
                toCbpid: nominateParams.toCbpid,
                projectId: nominateParams.projectId,
                karmaUnits: nominateParams.karmaUnits,
                karmaRuleId: nominateParams.karmaRuleId,
                likePostCbpId: nominateParams.likePostCbpId,
                karmaRatingId: nominateParams.karmaRatingId,
                karmaCategoryId: nominateParams.karmaCategoryId,
                instantApprovalCbpid: nominateParams.instantApprovalCbpid,
                postId: nominateParams.postId,
                activityName: nominateParams.activityName,
                projectEmpIds: (nominateParams.projectEmpIds) ? nominateParams.projectEmpIds.toString() : null,
                karmaGivenDate: nominateParams.karmaGivenDate
            },
            profileView, profileViewModel;

        profileView = Ext.ComponentQuery.query('userprofile')[0];
        if (profileView) {
            profileViewModel = profileView.getViewModel();
        }

        Ext.Ajax.request({
            url: Api.URL.ddonominate.nomination,
            params: params,
            method: 'POST',
            scope: scope,
            success: function (response, opts) {
                console.log('Successfully Credited');
                var obj = Ext.decode(response.responseText);

                if (showalert || comment) {
                    if (obj.credited === "Y") {
                        if (profileViewModel) {
                            var karmapoints = parseInt(profileViewModel.get('rewardsPoint')),
                                points = parseInt(nominateParams.points);
                            profileViewModel.set('rewardsPoint', karmapoints + points);
                        }
                    }

                    Ext.Msg.alert('Success', obj.message);
                    //scope.getView().up('nominateviewwindow').close();
                }

                if (cb) {
                    if (success) {
                        successCallback && successCallback(obj.data, obj);
                    } else {
                        failureCallback && failureCallback({});
                    }
                }
            },

            failure: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                if (!obj.success) {
                    Ext.Msg.alert('ERROR', obj.message);
                }
                if (cb) {
                    failureCallback && failureCallback({
                        type: "networkfailure"
                    });
                }
            }
        });
    },

    selfnominateProcess: function (scope, nominateParams, categoriesList, showalert, cb, successCallback, failureCallback) {
        var profileView, profileViewModel, sentBackRecords,
            scopeViewModel = scope.getView().getViewModel(),
            sentBackNominationsStore = scopeViewModel.getStore('sentBackNominationsStore');
        mainviewport = Ext.ComponentQuery.query('mainviewport')[0],
            mainviewportModel = mainviewport.getViewModel();
        profileView = Ext.ComponentQuery.query('userprofile')[0];
        if (profileView) {
            profileViewModel = profileView.getViewModel();
        }

        sentBackRecords = Utility.sentBackRecords;
        var jsonData = categoriesList,
            url = Api.URL.ddonominate.selfNomination,
            method = 'POST';
        if (sentBackRecords.length > 0) {
            if (jsonData.length > 0) {
                jsonData.forEach(jsonDt => {
                    let nomId = jsonDt.ddo_nomination_id;
                    if (nomId) {

                    } else {
                        delete jsonDt.ddo_nomination_id;
                        sentBackRecords.push(jsonDt);

                    }
                });
            }
            jsonData = sentBackRecords;
            url = Api.URL.karmaapproval.SENDBACK,
                method = 'PUT'
        }
        Ext.Ajax.request({
            url: url,
            jsonData: Ext.JSON.encode(jsonData),
            method: method,
            scope: scope,
            success: function (response, opts) {
                console.log('Successfully Credited');
                var obj = Ext.decode(response.responseText);

                if (showalert || comment) {
                    if (obj.credited === "Y") {
                        if (profileViewModel) {
                            var karmapoints = parseInt(profileViewModel.get('rewardsPoint')),
                                points = parseInt(nominateParams.points);
                            profileViewModel.set('rewardsPoint', karmapoints + points);
                        }
                    }

                    Ext.Msg.alert('Success', obj.message);
                    Utility.sentBackRecords = [];

                    var scopeViewModel = scope.getView().getViewModel();
                    var sentBackNominationsStore = scopeViewModel.getStore('sentBackNominationsStore');
                    sentBackNominationsStore.load({
                        scope: this,
                        callback: function () {
                            let count = sentBackNominationsStore.count();
                            scopeViewModel.set('sentBackNomCount', count);
                            mainviewportModel.set('sentBackNomCount', count)
                        }
                    })

                    //scope.getView().up('nominateviewwindow').close();
                }

                if (cb) {
                    if (success) {
                        successCallback && successCallback(obj.data, obj);
                    } else {
                        failureCallback && failureCallback({});
                    }
                }
            },

            failure: function (response, opts) {
                var obj = Ext.decode(response.responseText);

                sentBackNominationsStore.load({
                    scope: this,
                    callback: function () {
                        let count = sentBackNominationsStore.count();
                        scopeViewModel.set('sentBackNomCount', count);
                        mainviewportModel.set('sentBackNomCount', count)
                    }
                });
                if (obj && obj.success && obj.success == false) {
                    Ext.Msg.alert('ERROR', obj.message);
                }
                if (cb) {
                    failureCallback && failureCallback({
                        type: "networkfailure"
                    });
                }
            }
        });
    },

    createKarmaRatingItems: function (karmaRatingView, rec) {
        karmaRatingView.add({
            xtype: 'fieldcontainer',
            ref: 'formImagesRef',
            layout: {
                type: 'vbox',
                align: 'middle',
                pack: 'center'
            },
            defaults: {
                padding: '0 20 0 0'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'ratingId',
                value: rec.data.karmaratingsinstance
            }, {
                xtype: 'checkbox',
                name: 'isactive',
                cls: 'karmasetup-checkbox-cls',
                ref: 'checkbox',
                value: rec.data.isactive,
                uncheckedValue: 'N',
                checked: true,
                inputValue: 'Y',
                listeners: {
                    change: 'onChange'
                }
            }, {
                xtype: 'image',
                src: rec.data.imagepath,
                alt: 'image.png',
                ref: 'imgRef',
                disabled: false,
                name: 'imgPath',
                cls: 'rulebased-uploadicon',
                width: 70,
                height: 67

            }, {
                xtype: 'label',
                forId: 'myFieldId',
                name: 'labelTxt',
                padding: '8 0',
                ref: 'labelText',
                disabled: false,
                disabledCls: 'notestatus-item-disabled',
                cls: 'rulebased-name',
                html: '<div class="karma-tooltip" data-qtip="' + rec.data.name + '">' + rec.data.name + '</div>'
            }, {
                xtype: 'numberfield',
                cls: 'rulebased-num-cls',
                ref: 'fieldPoints',
                emptyText: 'Points',
                minLength: 1,
                value: rec.data.rewardpoints,
                disabled: false,
                hideTrigger: true,
                enforceMinLength: true,
                required: true,
                allowBlank: false,
                readOnlyCls: 'x-item-disabled',
                name: 'rewardpoints',
                listeners: {
                    change: 'onRatingChange'
                }
            }]
        });
    },

    onStoreLoading: function (store) {
        Ext.getBody().mask('');
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                Ext.getBody().unmask();
            }
        });
    },

    goalSettingStoreFn: function (goalSettingStore, goalTagField) {
        goalSettingStore.load({
            scope: this,
            callback: function (records) {
                if (records && records.length > 0) {
                    var roleIds = records[0].get('roleids').split(",");
                    goalTagField.setValue(roleIds);
                } else {
                    goalTagField.setValue(null);
                }
            }
        });
    },

    addAttributes: function (store) {
        var win = Ext.ComponentQuery.query('setattributewindow')[0] ||
            Ext.create('Redeem.order.product.SetAttributeWindow'),
            tabsPanelView = win.items.items[0],
            attributeView = tabsPanelView.items.items[1],
            comboStore = Ext.getStore('Redeem.store.AttributeStore'),
            formRef = attributeView.down('form');

        //removing the form added records.
        formRef.reset();
        formRef.removeAll();

        var groupsArr = store.getGroups();

        groupsArr.each(function (rec) {
            formRef.add({
                xtype: 'combobox',
                name: rec._groupKey,
                displayField: 'productattributevalue',
                valueField: 'ddo_productattribute_value_id',
                typeAhead: true,
                forceSelection: true,
                minChars: 1,
                emptyText: rec._groupKey,
                queryMode: 'local',
                lastQuery: '',
                store: Ext.create('Ext.data.Store', {
                    fields: ['ddo_productattribute_value_id', 'description', 'ddo_productattribute_id', 'productattribute', 'productattributevalue'],
                    data: rec.items
                }),
                columnWidth: 0.25
            });


        });
        formRef.add([{
            xtype: 'textfield',
            allowBlank: false,
            name: 'quantity',
            emptyText: 'Quantity',
            required: true,
            columnWidth: 0.25,
            maskRe: /[0-9.]/
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: '',
            iconCls: 'plus-new-icon-cls',
            cls: 'upload-button-cls',
            width: 20,
            formBind: true,
            height: 20,
            margin: '10 0 0 5',
            listeners: {
                click: 'onAddItemClick'
            }
        }]);
    },

    addKarmaCategories: function (store, me) {
        var nominateRatingView = me;
        store.clearFilter(true);
        if (nominateRatingView.up("nominateothersviewform")) {
            var nomView = nominateRatingView.up('nominateothersviewform');
            store.filter('self_nominate', false);
        } else {
            // var nomView = nominateRatingView.up('karmaselfnominatewindow')
            var nomView = nominateRatingView.up('selfnominatewindow');
            store.filter('self_nominate', true);
        }
        var nomViewModel,
            btnGrp, projectsMenuView, menuView,
            karmaComboStore = Ext.getStore('karmasetup.KarmaNominateStore');
        if (nomView) {
            nomViewModel = nomView.getViewModel();
        }
        var itemsArr = store.getData().items;
        var len = itemsArr.length;
        for (var i = 0; i < len; i++) {
            if (i <= 2) {
                btnGrp = nominateRatingView.down('buttongroup[reference=btnGrpRef]');
                if (btnGrp == null) {
                    nominateRatingView.add({
                        xtype: 'buttongroup',
                        reference: 'btnGrpRef',
                        columns: 4,
                        cls: 'nominatebtn-grp-cls',
                        bodyPadding: '10 0 3 0',
                        defaults: {
                            cls: 'nominate-btn-cls',
                            enableToggle: true,
                            width: 140,
                            height: 35,
                            margin: 4
                        }
                    });
                    btnGrp = nominateRatingView.down('buttongroup[reference=btnGrpRef]');
                }
                btnGrp.add({
                    text: itemsArr[i].data.name,
                    recordid: itemsArr[i].data.ddo_karmacategory_id,
                    iconCls: this.getNominateIcons(itemsArr[i].data.name),
                    bind: {
                        disabled: '{nomBtn}'
                    },
                    listeners: {
                        click: 'onSelect'
                    }
                });
            } else {
                projectsMenuView = nominateRatingView.down('splitbutton[reference=splitbtnref]');
                if (projectsMenuView == null) {
                    projectsMenuView = btnGrp.add({
                        xtype: 'splitbutton',
                        reference: 'splitbtnref',
                        iconCls: 'x-fa fa-volume-off',
                        text: 'Events',
                        menu: [{}],
                        bind: {
                            disabled: '{nomBtn}'
                        }
                    });
                    projectsMenuView = nominateRatingView.down('splitbutton[reference=splitbtnref]');
                }
                menuView = projectsMenuView.menu;
                menuView.add({
                    text: itemsArr[i].data.name,
                    recordid: itemsArr[i].data.ddo_karmacategory_id,
                    iconCls: 'nominate-view-icon-cls',
                    handler: function (menuItem, e) {
                        var selectedText = menuItem.text;
                        projectsMenuView.setText(selectedText);
                        btnGrp.items.items.forEach(function (rec) {
                            if (rec.hasCls("nom-selected-btn-cls")) {
                                rec.removeCls("nom-selected-btn-cls");
                                rec.addCls("nominate-btn-cls");
                            }
                        });
                        nomViewModel.set('iconSelection', null);
                        nomViewModel.set('points', 0);
                        nomViewModel.set('ratingView', true);
                        nomViewModel.set('ruleView', true);
                        nomViewModel.set('categoryName', selectedText);

                        karmaComboStore.clearFilter(true);
                        karmaComboStore.filterBy(function (rec) {
                            if (rec.get('karmacategoryname') == selectedText) {
                                return true;
                            }
                            return false;
                        });
                        projectsMenuView.el.addCls("nom-selected-btn-cls");
                        nomViewModel.set('categoryComboValue', menuItem.recordid);
                    }
                });
            }
        }
    },
    getNominateIcons: function (name) {
        if (name == 'Activity') {
            return 'x-fa fa-bullseye';
        } else if (name == 'Feedback') {
            return 'x-fa fa-comment';
        } else if (name == 'Project') {
            return 'x-fa fa-certificate';
        }
    },

    parseDateFormate: function (value, format) {
        return Ext.Date.parse(new Date(value), format);
    },

    updatedWallet: function () {
        Ext.Ajax.request({
            url: '/ddonominate/updatedWallet',
            method: 'GET',
            scope: this,
            success: function (response) {

                var data = Ext.decode(response.responseText);
                profileView = Ext.ComponentQuery.query('userprofile')[0];
                if (profileView) {
                    profileViewModel = profileView.getViewModel();
                    profileViewModel.set('walletAmount', data.data.points);

                }
            }
        });
    },

    //for progressbar(your karma score) 
    addProgressbar: function (store, me) {
        var ProgressbarStore = Ext.getStore('progressbar.ProgressbarStore');
        var loginRecord = Ext.getStore('login').getAt(0);
        Ext.Ajax.request({
            url: '/ddonominate/potentialkarma',
            method: 'GET',
            scope: this,
            success: function (response) {
                var data = Ext.decode(response.responseText);
                ProgressbarStore.setData(data.consolidateddata);
                // loginRecord.set("user_profile_pic_url", data.user_profile_pic_url);
                // loginRecord.set("totaActualKarma", data.totaActualKarma);
                // loginRecord.set("totalPotentialKarma", data.totalPotentialKarma);
            }
        });
    },

    addCircularbar: function (store, me) {
        var viewmodel = me.getViewModel();
        Ext.Ajax.request({
            url: '/ddonominate/potentialkarma',
            method: 'GET',
            scope: this,
            success: function (response) {
                var data = Ext.decode(response.responseText);
                viewmodel.set("user_profile_pic_url", data.user_profile_pic_url);
                viewmodel.set("totaActualKarma", data.totaActualKarma);
                viewmodel.set("totalPotentialKarma", data.totalPotentialKarma);
            }
        });
    },
    isDate: function (str) {
        var parms = str.split(/[\.\-\/]/);
        var yyyy = parseInt(parms[2]);
        var y = parms[2];
        var mm = parseInt(parms[1]);
        var dd = parseInt(parms[0]);
        var date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
        if (mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear() && y.length === 4) {
            mm = mm.toString();
            dd = dd.toString();
            yyyy = yyyy.toString();
            if (mm.length < 2 && mm != "0") {
                mm = "0" + mm
            }
            if (dd.length < 2 && dd != "0") {
                dd = "0" + dd
            }
            return dd + "-" + mm + "-" + yyyy

        } else {
            if (str) {
                this.toastReuseFn('t', "<span style='color:red'>please enter correct format. DD-MM-YYYY </span>");
            }
        }
    },
    onDateField: function (dateField, e, eOpts) {
        var val = dateField.getRawValue();
        var validFullDate = Utility.isDate(val);
        if (validFullDate) {
            var todayDate = new Date();
            var dateSplit = validFullDate.split('-');
            var validDate = parseInt(dateSplit[0]);
            var validMonth = parseInt(dateSplit[1]);
            var validYear = parseInt(dateSplit[2]);
            var enteredDate = new Date(validYear, validMonth - 1, validDate);
            todayDate.setHours(0, 0, 0, 0);
            if (enteredDate < todayDate) {
                dateField.setValue('');
                Utility.toastReuseFn('t', "<span style='color:red'>Entered date should not be before current Date</span>");
            } else {
                dateField.setValue(validFullDate);
            }
        } else {
            dateField.setValue('');
        }
    },
    isAdmin: function () {
        var roles = Ext.getStore('login').getData().getAt(0).get('roles'),
            admin = false;
        roles.forEach(function (rec) {
            if (rec.rolename == "Admin") {
                admin = true;
            }
        })
        return admin;
    },
    imageCheck: function (value) {
        if (value) {
            if (!value.includes('www.gravatar.com')) {
                var url = Api.URL.imageUrl + value;
                var urlAfterSplit = url.split("://");
                var urlWithoutHttp = urlAfterSplit[1].replace(/\/\//g, "/");
                imageUrl = urlAfterSplit[0] + "://" + urlWithoutHttp;
                return imageUrl;
            } else if (value.includes('www.gravatar.com')) {
                return value;
            }

        } else {
            return Utility.defaultImg;
        }
    },
    geocodeAddres: function (address, callback, scope) {
        var me = this;
        if (address) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: address
            }, function (result, status) {
                if (status === 'OK') {
                    var latLng = result[0].geometry.location;
                    var location = {
                        latitude: latLng.lat(),
                        longitude: latLng.lng(),
                        title: result[0].address_components[0].long_name
                    };
                    scope = scope || me;
                    callback.call(scope, location);
                }
            });
        }
    },
    showToast: function (msg, err) {
        Ext.toast({
            html: msg,
            width: 200,
            align: 't'
        });
        console.log('msg - ', msg);
        console.log('err - '+ err);
    },
    // envConfigs: {
    //     development: {
    //         nodeUrl: 'http://localhost:3300/'
    //     },
    //     staging: {
    //         nodeUrl: 'http://ddonodest.walkingtree.tech/'
    //     },
    //     production: {
    //         nodeUrl:  'http://node.ddo.walkingtree.tech/'
    //     }
    // },
    // getEnvValues: function (identifier, defaultValue) {
    
    //     var me = this,
    //         env = Ext.manifest['env'],
    //         envConfig,
    //         value = {},
    //         currPath = [],
    //         chain;

    //     if (!env) {
    //         throw new Error('No env set in manifest');
    //     }

    //     envConfig = me.envConfigs[env];
    //     if (!envConfig) {
    //         throw new Error('No configuration found for environment '
    //             + env);
    //     }

    //     value = envConfig;



    //     // var me = this,
    //     //     value = me.active,
    //     //     currPath = [],
    //     //     chain;

    //     if (!identifier) {
    //         return value;
    //     }

    //     chain = identifier.split('.');

    //     for (var index in chain) {
    //         var path;
    //         if (!chain.hasOwnProperty(index)) {
    //             continue;
    //         }

    //         path = chain[index];
    //         currPath.push(path);

    //         if (typeof value[path] === 'undefined') {
    //             if (typeof defaultValue === 'undefined') {
    //                 throw new Error(
    //                     'Path ' + identifier + ' could not be' + 
    //                     ' resolved from payload. Failed at "' + 
    //                     currPath.join('.') + '"'
    //                 );
    //             }

    //             return defaultValue;
    //         } else {
    //             value = value[path];
    //         }
    //     }
    //     // return "Bhavana Kommineni "
    //     return value;
    // }
});