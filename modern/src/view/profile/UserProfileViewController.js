Ext.define('DDO.view.profile.UserProfileViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.userprofileviewcontroller',

    requires: [
        'DDO.view.profile.UploadView'
    ],

    onDetailViewTap: function(btn) {
        var wrap, detailedBtn, timelineBtn;

        wrap = this.lookupReference('profiledetailswrap');
        wrap.setActiveItem('userdetails');

        timelineBtn = this.lookupReference('timelineview');
        timelineBtn.setDisabled(false);
        timelineBtn.removeCls('ddo-mobile-timelinebutton.x-item-disabled x-item-disabled');

        detailedBtn = this.lookupReference('detailedview');
        detailedBtn.setDisabled(true);
    },

    onTimelineTap: function(btn) {
        var wrap, detailedBtn, timelineBtn;

        wrap = this.lookupReference('profiledetailswrap');
        wrap.setActiveItem('usertimeline');

        detailedBtn = this.lookupReference('detailedview');
        detailedBtn.setDisabled(false);
        detailedBtn.removeCls('ddo-mobile-detailedbutton.x-item-disabled x-item-disabled');

        timelineBtn = this.lookupReference('timelineview');
        timelineBtn.setDisabled(true);
    },

    onLoadProfileData: function(empId) {
        // TODO use some alternative instead of queries
        var me = this,
            vm = me.getViewModel(),
            query = Ext.ComponentQuery.query,
            jobsVM = query('experienceview')[0].getViewModel(),
            jobs = jobsVM && jobsVM.get('jobsdatastore'),
            about = query('aboutlist')[0].getStore(),
            timeline = query('usertimeline')[0].getStore(),
            skillsVM = query('profileskills')[0].getViewModel(),
            skills = skillsVM && skillsVM.get('profileskillsstore'),
            educationVM = query('educationview')[0].getViewModel(),
            education = educationVM && educationVM.get('educationdatastore'),

            interestVM = query('interest')[0].getViewModel(),
            interest = interestVM && interestVM.get('interestStore'),

            headerVM = query('userprofile')[0].getViewModel(),
            header = headerVM && headerVM.get('profiledetails'),

            options = {},
            stores, key, onReqSuccess, onReqFailure, i, ln;

        Ext.getStore('usertimeline').load();
        Ext.getStore('comboyearstore').load();
        Ext.getStore('coursestore').load();

        // recall this function if any of the above is not instantiated yet
        //if (!(jobs && about && timeline && skills && education && interest && todolist)) {
        if (!(about && jobs && education && skills && interest && timeline && header)) {
            Ext.defer(this.onLoadProfileData.bind(this, empId), 500);
            return;
        }

        // stores object with all the stores attached to iterate through
        stores = {
            jobs: jobs,
            about: about,
            skills: skills,
            education: education,
            interest: interest,
            timeline: timeline,
            header: header
        }

        if (empId) {
            var loginStore = Ext.getStore('login'),
                userEmpID = loginStore.data.items[0].data.empcode;

            if (empId === userEmpID) {
                vm.set('nominateAccess', false);
                headerVM.set('nonPersonalAcccess', false);

                jobsVM.set('editing', false);
                jobsVM.set('nonPersonalAcccess', false);

                educationVM.set('editing', false);
                educationVM.set('nonPersonalAcccess', false);

                skillsVM.set('editing', false);

                interestVM.set('editing', false);
                interestVM.set('nonPersonalAcccess', false);

            } else {
                vm.set('nominateAccess', true);
                headerVM.set('nonPersonalAcccess', true);

                jobsVM.set('editing', true);
                jobsVM.set('nonPersonalAcccess', true);

                educationVM.set('editing', true);
                educationVM.set('nonPersonalAcccess', true);

                skillsVM.set('editing', true);

                interestVM.set('editing', true);
                interestVM.set('nonPersonalAcccess', true);
            }

            // success callback for the ajax request for profile details
            onReqSuccess = function(stores, data, response) {
                for (var key in stores) {
                    stores[key].setData(data[key]);
                }

                // setting the profile data
                me.updateProfileHeaderDetails(data.about);

                var mainview = Ext.ComponentQuery.query('#mainviewcontainer')[0];

                mainview.setActiveItem(1);
                Ext.Viewport.setActiveItem(0);

            };

            // failure callback for the ajax request for profile details
            onReqFailure = function(err) {
                var mainview = Ext.ComponentQuery.query('#mainviewcontainer')[0];

                Ext.Viewport.setActiveItem(0);
                mainview.setActiveItem(1);
            };

            // request the details as per the selected empId
            Utility.fireAjax({
                url: Api.URL.profile.GETBYEMPID_BASE_URL + empId
            }, onReqSuccess.bind(this, stores), onReqFailure);
        }
    },

    updateProfileHeaderDetails: function(data) {
        Ext.Ajax.request({
            url: 'resources/data/ratingparams.json',

            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                data[0].ratingdetails = obj.ratingdetails;

                if (Ext.isArray(data)) {
                    data = data[0].data || data[0];
                }

                //Saving user about details ,and using the data fro nominate graphs
                Utility.userAboutData = data;

                var vm = Ext.ComponentQuery.query('userprofile')[0].getViewModel();

                vm.set('headerData', data);
            }
        });
    },
    onFileLoaderView: function(v) {
        var view = Ext.create('DDO.view.profile.UploadView');
        view.header = v;
        if (!view.getParent()) {
            this.getView().add(view);
        }
        view.show();
    },
    /*
     * Profile image and Cover image changing functionality done in this function.
     * Calling multer node services by form submission.
     */
    onMobileProfilePicChange: function(filefield, value, oldValue, eOpts) {
        if (DDO.util.Utility.isProfileImage == true) {
            filefield.setName('profileImage');

            filefield.up('formpanel').submit({
                url: "/profile/profilePic",
                success: function(com, response , responseText) {

                     var text = Ext.JSON.decode(responseText),
                         pathImg = text.data;

                    var headerView = Ext.ComponentQuery.query('mainviewport')[0].getViewModel(),
                        profileHeader = Ext.ComponentQuery.query('profileheader')[0],
                        data = profileHeader.getData(),
                        feedsview = Ext.ComponentQuery.query('feedscontainer')[0],
                        karmaview = Ext.ComponentQuery.query('karmascorelist')[0];
                        
                    feedsview.down('dataview').getStore().reload();
                    karmaview.getStore().reload();
                    data.user_profile_pic_url = Api.URL.imageUrl + pathImg;
                    headerView.set('profileImg',Api.URL.imageUrl +pathImg);
                    profileHeader.updateData(data);
                },

                failure: function() {
                }
            });

            this.getView().hide();

        } else if (DDO.util.Utility.isProfileImage == false) {

            filefield.setName('coverImage');
            
            filefield.up('formpanel').submit({
                url: "/profile/coverPic",
                success: function(com, response , responseText) {
                    var text = Ext.JSON.decode(responseText),
                        pathImg = text.data;

                    var headerView = Ext.ComponentQuery.query('mainviewport')[0].getViewModel(),
                        profileHeader = Ext.ComponentQuery.query('profileheader')[0],
                        data = profileHeader.getData();

                    data.user_cover_pic_url = '../' + pathImg;

                    profileHeader.updateData(data);
                },
                failure: function() {
                }
            });
            this.getView().hide();
        } else {

            // Nothing going on here.
        }
        
    },

    ratingLogosRenderFn: function(view, target, e) {
        var userProfile = Ext.ComponentQuery.query('userprofile')[0],
            viewModel = userProfile.getViewModel(),
            headerData = viewModel.get('headerData'),
            profileName, ratingDetails,
            mainviewtoolbar = Ext.ComponentQuery.query('#mainvieporttoolbar')[0];

        if (headerData) {
            profileName = headerData.name;
            ratingDetails = headerData.ratingdetails;
            for (var i = 0; i < ratingDetails.length; i++) {
                if (ratingDetails[i].ratingId.toString() === target.getAttribute('rating-id')) {

                    var nominateWindow = Ext.ComponentQuery.query('nominatewindow')[0],
                        view = Ext.create('DDO.view.profile.nominate.NominateWindow'),
                        form = view.down('ratingform'),
                        ref = view.getReferences(),
                        nominateViewModel = view.getViewModel(),
                        progressBar = ref.multicircularprogressbar,
                        targetIcon = target.src,
                        karmaPoints = parseInt(Utility.userAboutData.karmapoints) || 0,
                        rewardPoints = parseInt(Utility.userAboutData.rewardpoints) || 0,
                        ratingComboStore = ref.ratingCombo.getStore(),
                        nominateStore = Ext.getStore('profile.NominateNames');

                    nominateStore.load();

                    Utility.ratingId = target.getAttribute('rating-id');
                    form.setConfig('ratingId', Utility.ratingId);

                    if (target.getAttribute('value') < 0) {
                        nominateStore.getProxy().extraParams = {
                            'ratingType': 'Y',
                            'ratingId': Utility.ratingId
                        };
                    } else {
                        nominateStore.getProxy().extraParams = {
                            'ratingType': 'N',
                            'ratingId': Utility.ratingId
                        };
                    }

                    progressBar.setCenterIcon(targetIcon);
                    progressBar.setValue([karmaPoints, rewardPoints]);

                    nominateViewModel.set('profileName', Ext.String.trim(profileName));

                    nominateStore.load({
                        scope: this,
                        callback: function(records, operation, success) {
                            mainviewtoolbar.hide();
                            view.show();

                            var activityBtn = form.down('button[name=activity]'),
                                feedBackbtn = form.down('button[name=feedback]');
                            if (target.getAttribute('value') < 0) {
                                activityBtn.setHidden(true);
                                feedBackbtn.addCls('ddo-activity-press-cls');
                                nominateViewModel.set('ratingName', 'Feedback');

                            } else {
                                activityBtn.setHidden(false);
                                activityBtn.addCls('ddo-activity-press-cls');
                                nominateViewModel.set('ratingName', 'Activity');
                            }
                        }
                    });
                }
            }
        }
    }
});