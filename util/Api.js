/**
 * @class Api
 * This file holds th API url to be used throughout the application.
 * @singleton
 */

Ext.define('DDO.util.Api', {
    singleton: true,

    alternateClassName: ['Api'],

    URL: (function () {

        var host = location.hostname.toLowerCase(),
        hostUrl;
        if(Constants.ENVIORMENTHOSTNAMES.LOCAL === host){
            hostUrl = Constants.LOCAL.NODE
        } else if(Constants.ENVIORMENTHOSTNAMES.STAGING === host){
            hostUrl = Constants.STAGING.NODE
        }  else if(Constants.ENVIORMENTHOSTNAMES.PRODUCTION === host){
            hostUrl = Constants.PRODUCTION.NODE
        } else if(Constants.ENVIORMENTHOSTNAMES.DEV === host){
            hostUrl = Constants.DEV.NODE
        }  
        // To read  images from S3 bucket
        var imageUrl = "https://testingnewnew.s3.amazonaws.com/"; 

        console.log(hostUrl);

        return {
            //for extjs ajax request API's
            hostUrl:hostUrl,
            imageUrl : imageUrl,
            ddonominate: {
                nomination: '/ddonominate',
                calulateKarmaScore: '/ddonominate/calculatekarmascore',
                selfNomination: '/ddonominate/selfnomination',
                selfcalculatekarmascore: '/ddonominate/selfcalculatekarmascore',
                getfrequency: '/ddonominate/getfrequency',
                getkarma : '/ddonominate/getkarma',
                getDerivedKarmaScore: '/ddonominate/getDerivedKarmaScore'
            },

            todo: {
                READ: hostUrl + 'task/get',
                CREATE: hostUrl + 'task/create',
                UPDATE: hostUrl + 'task/update',
                DESTROY: hostUrl + 'task/delete',
                TODODETAILREAD: hostUrl + 'task/getcompleted'
            },

            karma: {
                READ: hostUrl + 'karma/getAllkarmascores'
            },
            karmareportdetails: {
                READ: hostUrl + 'karmareportdetails'
            },

            probationtocnfm:{
               READ: hostUrl + 'employee/probationToCnfm',
               UPDATE : hostUrl + 'employee/updateProbationForm',
               DOWNLOAD_EXCEL : hostUrl + 'download/downloadexcelformat'
            },

            feed: {
                READ: hostUrl + 'feed/get',
                FEEDS_EDIT_UPLOAD_IMAGES: hostUrl + 'feed/feedsPostedPics',
                FEEDS_UPLOAD_IMAGES: hostUrl + 'feeduploadimages/feedsPostedPics'
            },

            feedfollow:{
                 CREATE: hostUrl + 'feedpostfollow/create',
                 DELETE: hostUrl + 'feedpostfollow/delete'
            },

            dashboard: {
                READ: hostUrl + 'dashboard/employeeavailability/groupedresources',
                READRESOURCES: hostUrl + '/dashboard/employeeavailability/resources' 
            },

            about: {
                READ: hostUrl + 'profile'
            },

            jobs: {
                READ: hostUrl + 'experience',
                CREATE: hostUrl + 'experience',
                UPDATE: hostUrl + 'experience'
                // ,DESTROY: hostUrl + 'profile/jobs/remove'
            },

            education: {
                READ: hostUrl + 'education',
                CREATE: hostUrl + 'education',
                UPDATE: hostUrl + 'education'
            },

            interests: {
                READ: hostUrl + 'interest',
                CREATE: hostUrl + 'interest',
                DESTROY: hostUrl + 'interest'
            },

            skills: {
                READ: hostUrl + 'skill',
                CREATE: hostUrl + 'skill',
                UPDATE: hostUrl + 'skill'
            },
            projectclients:{
                READ: hostUrl + 'projectclients',
                CREATE: hostUrl + 'projectclients',
                DELETE: hostUrl + 'projectclients',
                UPDATE: hostUrl + 'projectclients'
            },
            holidays:{
                READ: hostUrl + 'holidays',
                CREATE: hostUrl + 'holidays',
                UPDATE: hostUrl + 'holidays'  
             },
             upcomingholidays:{
                READ: hostUrl + 'holidays/upcomingholidays',
             },
             unansweredqueries:{
                READ: hostUrl + 'unansweredQueries/unansweredqueries',
             },
            profile: {
                GETBYEMPID_BASE_URL: hostUrl + 'profile/',
                USER_PROFILE_PIC: hostUrl + 'image/profilePicture',
                USER_COVER_PIC: hostUrl + 'image/coverPicture',
                EMPDETAILS: hostUrl + 'employee/employeeDetails',
                EMPDESIGNATION: hostUrl + 'employee/employeeWithDesignation'
            },

            groups: {
                READ: hostUrl + 'groups',
                CREATE: hostUrl + 'groups'
            },

            postlikes: {
                READ: hostUrl + 'postlike',
                CREATE: hostUrl + 'postlike'
            },

            // jobApplicants: {
            //     READ: hostUrl + 'jobApplicants/get'
            // },

            projects: {
                READ: hostUrl + 'projectNote',
                CREATE: hostUrl + 'projectNote',
                UPDATE: hostUrl + 'projectNote',
                DELETE: hostUrl + 'projectNote',
                ROLEREAD: hostUrl + 'projectrole',
                ROLECREATE : hostUrl + 'projectrole',
                ROLEUPDATE : hostUrl + 'projectrole',
                ROLEDELETE : hostUrl + 'projectrole',
                ALLOCEMPRECS: hostUrl + 'projectresources/allocemployees'
            },

            wallet: {
                READ: hostUrl + 'wallet/get',
                CREATE: hostUrl + 'wallet/create',
                UPDATE: hostUrl + 'wallet/update'
            },

            karmaicon: {
                READ: hostUrl + 'karmarating',
                UPDATE: hostUrl + 'karmarating'
            },

            karmarule: {
                CREATE: hostUrl + 'karmarule/create',
                READ: hostUrl + 'karmarule/get',
                UPDATE: hostUrl + 'karmarule/update',
                DELETE: hostUrl + 'karmarule/delete'
            },

            karmacategory: {
                CREATE: hostUrl + 'karmacat/create',
                READ: hostUrl + 'karmacat/get',
                UPDATE: hostUrl + 'karmacat/update',
                DELETE: hostUrl + 'karmacat/delete'
            },

            ddokarma: {
                CREATE: hostUrl + 'ddokarma',
                READ: hostUrl + 'ddokarma',
                UPDATE: hostUrl + 'ddokarma'
            },

            karmaprorated: {
                CREATE: hostUrl + 'karmaproratedinstance',
                READ: hostUrl + 'karmaproratedinstance',
                UPDATE: hostUrl + 'karmaproratedinstance',
                DELETE: hostUrl + 'karmaproratedinstance'
            },

            karmarangeinstance: {
                CREATE: hostUrl + 'karmarangeinstance',
                READ: hostUrl + 'karmarangeinstance',
                UPDATE: hostUrl + 'karmarangeinstance',
                DELETE: hostUrl + 'karmarangeinstance'

            },

            karmaratinginstance: {
                CREATE: hostUrl + 'karmaratinginstance',
                READ: hostUrl + 'karmaratinginstance',
                UPDATE: hostUrl + 'karmaratinginstance'

            },

            sharablewallet: {
                READ: hostUrl + 'wallet/sharablewallet'
            },

            karmaapproval: {
                READ: hostUrl + 'ddonominate/pendingapproval',
                ACCEPT: hostUrl + 'ddonominate/approvenomination',
                CARTESIAN : hostUrl + 'ddonominate/chartKarmaScores',
                REJECT: hostUrl + 'ddonominate/rejectnomination',
                SENDBACK:hostUrl + 'ddonominate/sendback',
                BULKACCEPT : hostUrl + 'ddonominate/approvebulknomination',
                BULKREJECT : hostUrl + 'ddonominate/rejectbulknomination'
            },

            hrapproval:{
               READ : hostUrl + 'ddonominate/hrpendingapproval',
               CREATE: hostUrl + 'ddonominate/hrpostreview'
            },

            financeapproval:{
           READ : hostUrl + 'ddonominate/financependingapproval',
           CREATE : hostUrl + 'ddonominate/financepostreview'
            },

            department: {
                CREATE: hostUrl + 'department',
                READ: hostUrl + 'department',
                UPDATE: hostUrl + 'department',
                DELETE: hostUrl + 'department'
            },

            role: {
                CREATE: hostUrl + 'role',
                READ: hostUrl + 'role',
                UPDATE: hostUrl + 'role',
                ADDORUPDATE: 'roleviewaccess/role/addorupdate',
                ROLEVIEWACCESS: 'roleviewaccess/getRole'
            },

            designation: {
                CREATE: hostUrl + 'designation',
                READ: hostUrl + 'designation',
                UPDATE: hostUrl + 'designation'
            },

            employeesetup: {
                CREATE: hostUrl + 'employeesetup',
                READ: hostUrl + 'employeesetup',
                UPDATE: hostUrl + 'employeesetup'
            },

            account: {
                READ: hostUrl + 'account',
                UPDATE: hostUrl + 'account',
                URLPATHAPI: hostUrl + 'companylogo/companyLogoUrlPath'
            },
            redeemgrid: {
                CREATE: hostUrl + 'redeemhistory',
                READ: hostUrl + 'redeemhistory/get',
                UPDATE: hostUrl + 'redeemhistory'
            },
            attribute: {
                READ: hostUrl + 'productattribute',
                CREATE: hostUrl + 'productattribute',
                UPDATE: hostUrl + 'productattribute',
                DESTROY: hostUrl + 'productattribute'
            },
            attributevalue: {
                READ: hostUrl + 'productattributevalues',
                CREATE: hostUrl + 'productattributevalues',
                UPDATE: hostUrl + 'productattributevalues',
                DESTROY: hostUrl + 'productattributevalues'
            },
            categoryvalue: {
                READ: hostUrl + 'productcategory',
                CREATE: hostUrl + 'productcategory',
                UPDATE: hostUrl + 'productcategory',
                DESTROY: hostUrl + 'productcategory'
            },
            product: {
                READ: hostUrl + 'product',
                CREATE: hostUrl + 'product',
                UPDATE: hostUrl + 'product',
                DESTROY: hostUrl + 'product'

            },
            setproductattributes: {
                READ: hostUrl + 'setproductattributes',
                CREATE: hostUrl + 'setproductattributes',
                UPDATE: hostUrl + 'setproductattributes',
                DESTROY: hostUrl + 'setproductattributes'
            },
            productimg: {
                READ: hostUrl + 'productimage',
                CREATE: hostUrl + 'productimage',
                UPDATE: hostUrl + 'productimage',
                DESTROY: hostUrl + 'productimage'

            },
            employee: {
                CREATE: hostUrl + 'employee',
                READ: hostUrl + 'employee',
                UPDATE: hostUrl + 'employee'
            },

            work: {
                CREATE: hostUrl + 'workdetails',
                READ: hostUrl + 'workdetails',
                UPDATE: hostUrl + 'workdetails'
            },

            empsetup: {
                CREATE: hostUrl + 'employee',
                READ: hostUrl + 'employeedetail',
                UPDATE: hostUrl + 'employee'
            },

            goal: {
                READ: hostUrl + 'goal',
                UPDATE: hostUrl + 'goal',
                CREATE: hostUrl + 'goal'
            },

            goaltask: {
                READ: hostUrl + 'goaltask',
                CREATE: hostUrl + 'goaltask',
                UPDATE: hostUrl + 'goaltask',
                DELETE: hostUrl + 'goaltask'
            },

            allgoals: {
                READ: hostUrl + 'goal/allgoals'
            },

            goalnotes: {
                READ: hostUrl + 'goalnote',
                CREATE: hostUrl + 'goalnote'
                //UPDATE: hostUrl + 'goaltask',
                //DELETE: hostUrl + 'goaltask'
            },
            goalstatus: {
                READ: hostUrl + 'goalstatus'
            },
            goalsettings: {
                READ: hostUrl + 'settings/goalsettings'
            },
            financialyear: {
                CREATE: hostUrl + 'financialyear',
                READ: hostUrl + 'financialyear',
                UPDATE: hostUrl + 'financialyear',
                DELETE: hostUrl + 'financialyear'
            },
            karmaaccess: {
                READ: hostUrl + 'karmaaccess',
                CREATE: hostUrl + 'karmaaccess',
                UPDATE: hostUrl + 'karmaaccess'
            },
            utilization: {
                READ: hostUrl + 'employeeutil/emputilizationsummary'
            },
            utilgrid: {
                READ: hostUrl + 'employeeutil/emputilizationdetails'
            },
            nonbillableemp: {
                READ: hostUrl + 'employeeutil/getNonBillableEmpDetails'

            },
            availablemp: {
                READ: hostUrl + 'employeeutil/getAvilableEmpDetails'
            },
            jobopenings: {
                CREATE: hostUrl + 'jobopeningrequest',
                READ: hostUrl + 'jobopeningrequest',
                UPDATE : hostUrl + 'jobopeningrequest/',
                DELETE: hostUrl + 'jobopeningrequest/'
            },
            joblocation:{
                READ : hostUrl + 'jobopeningrequest/getLocationData'
            },
            jobdepartments:{
                READ : hostUrl + 'dashboard/getDepartmentNames'
            },
            jobinterviewrs : {
                READ : hostUrl + 'utility/getempbasiclist'
            },
            jobskills : {
                READ : hostUrl + 'skill/combo'
            },
            jobopeningrecruiters :{
                READ : hostUrl + 'jobopeningrequest/jobrecruiters'
            },
            jobstatus :{
                READ : hostUrl + 'jobopeningrequest/getJobStatusData',
                UPDATE : hostUrl + 'jobopeningrequest/updateJobStatus'
            },
            feedspiestore:{
                READ : hostUrl + 'getposttypecount/get'

            },


            karmabarstore:{
                READ : hostUrl + 'getposttypecount/getmonthlykarma'

            },
            karmapiestore:{
                READ : hostUrl + 'getposttypecount/getyearlykarma'

            },
            feeds:{
                READ : hostUrl +'feed/get'

            },
            groupsAndEmployee:{
                READ : hostUrl + 'groupMembers/groupsandemployees'
              
            },
            searchfeeds:{
                READ : hostUrl + 'feed/get'

            },
            selectedempstore:{
            //    READ : hostUrl + 'groupmembers/groups',
             READ : hostUrl + 'groupmembers'
            

            },
            selectedemptagstore:{
                READ : hostUrl +  'employeegroups/getTaggedGroupEmployees'

            },
            currentjobopenings:{
                READ : hostUrl +  'jobOpenings/getCurrentJobOpenings'

            },
            jobrecruiter:{
                READ : hostUrl +  'jobopeningrequest/getRecruitersList'

            },
            departmentcombostore:{
                READ : hostUrl +  'dashboard/getDepartmentNames'

            },
            designationcombostore:{
                READ : hostUrl +  'designation'

            },
            primaryskillscombostore:{
                READ : hostUrl +  'skill/combo'

            },
            projectcombostore:{
                READ : hostUrl +  'karma/projects'

            },
            supervisorcombostore:{
                READ : hostUrl +  'utility/getsupervisorlist'

            },
            employeecombostore:{
                READ : hostUrl +  'utility/getempbasiclist'

            },
            wallettype:{
                READ : hostUrl +  'utility/getwalletbasiclist'
            },
            yearcombostore:{
                READ : hostUrl +  'wallet/years'

            },
            registrationcitycombostore:{
                READ : hostUrl +  'reg/getcityRegcombo'

            },
            registrationcountrycombostore:{
                READ : hostUrl +  'reg/getcountryRegcombo'

            },
            registrationstatecombostore:{
                READ : hostUrl +  'reg/getstateRegcombo'

            },
            login:{
                READ : hostUrl +  'auth'

            },
            momcomponent:{
                READ : hostUrl +  'momcomponent'

            },
            orgchartdepartmentstore:{
                READ : hostUrl +  'dashboard/getDepartmentNames'

            },
            orgchartempnamesstore:{
                READ : hostUrl +  'dashboard/getEmployeeNames'

            },
            orgchartstore:{
                READ : hostUrl +  'dashboard/organization'

            },
            appaccesssummarystore:{
                READ : hostUrl +  'useraccessapp/accessappsummary'

            },
            details:{
                READ : hostUrl +  'userProfilePics/userdetails'

            },
            nominatenames:{
                READ : hostUrl +  'nominate/getNominateNames'

            },
            nominatestore:{
                READ : hostUrl +  'nominate/createNominate'

            },
            projectsummarystore:{
                READ : hostUrl +  'utility/getempprojectsummary'

            },
            usertimelinestore:{
                READ : hostUrl +  'profile/user/timelineview'

            },
            progressbarstore:{
                READ : hostUrl +  'ddonominate/potentialkarma'

            },
            allocationemployee:{
                READ : hostUrl +  'projectpeople/allocemployees'

            },
            peopleviewstore:{
                READ : hostUrl +  'projectresources'

            },
            selectedemployeestore:{
                READ : hostUrl +  'groupmembers'

            },
            empnamestore:{
                READ : hostUrl +  'dashboard/getEmployeeNames'

            },
            feedbackcombostore:{
                READ : hostUrl +  'projectfeedback'

            },
            momviewstore:{
                READ : hostUrl +  'projectMom'

            },
            momActionItems:{
                READ: hostUrl + 'projectmom/getActionItems'
            },
            followUpActionItems:{
                UPDATE: hostUrl + 'projectmom/followUpActionItems'
            },
            createMomGrid:{
                DELETE: hostUrl + 'projectmom/deleteMomGridRow'
            },
            updateActionItems:{
                UPDATE: hostUrl + 'projectmom/updateActionItemRow'
            },
            projectdashboardstore:{
                READ : hostUrl +  'project',
                AllProjects :hostUrl+'project/allProjects'

            },
            projectsclientstore:{
                READ : hostUrl +  'projecttechnologies/projectclients'

            },
            technologiesstore:{
                READ : hostUrl +  'projecttechnologies'

            },
            redeemhistoryitemsgridstore:{
                READ : hostUrl +  'redeemhistory/items'

            },
            resources:{
                READ : hostUrl +  'dashboard/employeeavailability/groupedresources'

            },
            rolesstore:{
                READ : hostUrl +  'roleviewaccess/getAllRoles'

            },
            rolesviewstore:{
                READ : hostUrl +  'appviews'

            },
            goalsettings:{
                READ : hostUrl +  'settings/goalsettings'

            },
            departmentcombo:{
                READ : hostUrl +  'department'

            },
            citycombostore:{
                READ : hostUrl +  'account/getcitycombo'

            },
            countrycombostore:{
                READ : hostUrl +  'account/getcountrycombo'

            },
            primaryskillcombostore:{
                READ : hostUrl +  'karma/primaryskill'

            },
            repoprtingstore:{
                READ : hostUrl +  'utility/getempbasiclist'

            },
            accountcitycombostore:{
                READ : hostUrl +  'account/getcitycombo'

            },
            accountcountrycombostore:{
                READ : hostUrl +  'account/getcountrycombo'

            },
            accountstatecombostore:{
                READ : hostUrl +  'account/getstatecombo'

            },
            setupdesignationcombostore:{
                READ : hostUrl +  'designation'

            },
            setupsupervisorcombostore:{
                READ : hostUrl +  'utility/getsupervisorlist'

            },
            profileskillscombostore:{
                READ : hostUrl +  'skill/combo',
                CREATE : hostUrl + 'skill/skill',
                UPDATE : hostUrl + 'skill/skill',
                DELETE : hostUrl +'skill/skill' ,

            },
            karmahistorystore:{
                READ : hostUrl +  'wallet/rewardhistory'

            },
            wallethistorystore:{
                READ : hostUrl +  'wallet/wallethistory'
            },
            utility:{
                READ : hostUrl +  'auth/checksession'
            },
            karmareport :{
                READ : hostUrl + 'karma/karmareport'
            },
            employeehistory :{
                ALLEMPLOYEES_HISTORY :hostUrl+'employeehistory',
                EMP_HISTORY:hostUrl+'employeehistory/employee'
            },
            projectapproval: {
                READ: hostUrl + 'projectallocationrequest',
                ACCEPT: hostUrl + 'projectallocationrequest/projectapprove',
                REJECT: hostUrl + 'projectallocationrequest/projectreject',
                READER : hostUrl+'projectallocationrequest',
                READALLOC : hostUrl+'projectallocationrequest/verifyallocation',
                READPROJ: hostUrl + 'projectallocationrequest/exitempallocatedproject'
          },
          projecthistorystore: {
            READ: hostUrl + 'profile/user/projecthistoryview'
          },
          exitemployee: {
            READ: hostUrl + 'employeeexitrequest/exitemployee',
            UPDATE : hostUrl + 'employeeexitrequest/exitemployeeupdate',
            ALLOCUPDATE : hostUrl + 'employeeexitrequest/updateallocation'
          },
          karmascoredashboard:{
            READ: hostUrl + 'karmascoredashboard/karmascoredashboard',
          },
          employeereport:{
            READ: hostUrl + 'employeereport'
          },
          validateotp:{
            UPDATE : hostUrl + 'verify/update'
          }
        }
             
        
    })()
});
