/**
 * This is ViewModel for view 'DDO.view.profile.UserProfile'.
 * @extends 'Ext.app.ViewModel'
 * @alias 'viewmodel.userprofile'
 */
Ext.define('DDO.view.profile.UserProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userprofile',

    requires: [
        'DDO.model.profile.UserProfileModel',
        'DDO.store.reporting.ReportingStore'
    ],

    data: {
        editpersoneldetailswindowsave:true,
        // editpersoneldetailswindowcancel:false,
        sendresignation:true,
        editpersoneldetailbutton:true,
        nominateAccess: false,
        checkedMale: false,
        checkedFemale: false,
        nominateAccess: false,
        "profileImg": null,
        ddo_employee_id:"",
        "profileBgUrl": null,
        "walletAmount": 0,
        "projectCount": 0,
        "rewardsPoint": 0,
        "name": "",
        "designation": "",
        "rating": 5,
        "profiledata": {
            "about": null,
            "jobs": null,
            "skills": null,
            "education": null,
            "interest": null,
            "timeline": null,
            "projecthistory": null
        }
    },

    stores: {
        ratingparamsstore: {
            type: 'ratingparamsstore'
        },
        //store which is used for the reporting view.
        reportingManagerStore:{
            type:'reportingManagerStore'
        },
        //employee store used in edit personal details window.
        employestore:{
            type:'employeestore',
            model:'DDO.model.setup.employeesetup.EmployeeModel',
            autoLoad:true
        }
    }
});