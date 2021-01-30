/**
 * This is viewModel file for DDO.view.main.Viewport.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.mainviewport'
 */

Ext.define('DDO.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',
    requires: [
        'DDO.model.widget.karmascore.KarmaScore',
        'DDO.model.profile.Details',
        'DDO.store.setup.employeesetup.EmployeeStore',
        'DDO.store.loginlanding.Login'
    ],
    data: {
        currentView: null,
        hashTag: null,
        id: null,
        newFeedsCount: 0,
        profileImg: null,
        profileBgUrl: 'resources/images/user-bg/10-bg.png',
        titleName: null,
        headerTitleCls: '',
        profileBtnMobileVisible: false,
        modernKarmaLoad: false,
        modernTodoLoad: false,
        showkarmascorefilters: true,
        showkarmascorelogo: true,
        projectId: null,
        scrolltopbtn: true,
        showJobsCreateBtn: true,
        showJobAppCreateBtn: true,
        showAction: "display:none",
        editAction: false,
        deleteAction: false,
        closeAction: false,
        rejectAction: false,
        approveAction: false,
        editJobApplication: false,
        deleteJobApplication: false,
        addIntvwschviewHide: true,
        addInterviewShow: false,
        cancelReschedulebtnsHide: true,
        jobAppStatusDisable: true,
        companyLogoUrl: 'resources/images/engazewell_logo_head.png',
        sentBackNomCount: 0,
        roleAccessingle: false,
        nonRoleRouteId: null,
        addNewProject: true,
        projectNewResources: true,
        dateObj: null,
        mapData: [{
            details: '9th Floor, 903 And 904 Manjeera Trinity Corporate, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072',
            title: 'secunderab'
        }]
    },
    formulas: {
        getNewFeedCount: function (get) {
            var count = get("newFeedsCount");
            if (count < 10) {
                return "0" + count;
            } else if (count > 10) {
                return "10+"
            } else {
                return count;
            }
        },
        isNewFeedCountZero: function (get) {
            return get("newFeedsCount") == 0 ? true : false;
        }
    },
    stores: {
        navigationtree: {
            type: 'navigationstore'
        },
        employeestore: {
             type: 'employeestore'
        },
        logstore: {
            type:'login'
        },
        accountCompanyImagUrl: {
            proxy: {
                type: 'ajax',
                url: 'generatepresignedurl/presignedImgUrl',

                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            },
            autoLoad: false,
            session: true,
        },
        mapStore: {
            model: 'Ext.data.Model',
            autoLoad: true,
            fields: [{
                name: 'latitude',
                mapping: 'coordinates.latitude'
            }, {
                name: 'longitude',
                mapping: 'coordinates.longitude'
            }],
            data: [{
                address: 'walkingtree technologies manjeera trinity corporate'
            }, {
                address: 'scunderabad'
            }]
        }
    }
});
