Ext.define('DDO.store.main.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.navigationstore',

    storeId: 'navigationstore',

    requires: [
        'DDO.model.main.NavigationModel'
    ],

    model: 'DDO.model.main.NavigationModel',

    //Put the data in the store itself temporarily for solving the issue of #home page not loading on refresh ~ Nagender 2nd April
    //if you add any new view please add viewId and add those details in rolesview.json for security purpose.
    root: {
        expanded: true,
        children: [{
            text: 'Home',
            view: 'home.Home',
            iconCls: 'homeIcon-cls',
            leaf: true,
            hidden: true,
            read: false,
            routeId: 'home',
            viewId: 1
        },
            {
            text: 'Employee Dashboard',
            expanded: false,
            leaf: false,
            iconCls: 'emp-nav-cls x-fa fa-user',
            viewId: 2,
            children: [{
                text: 'Karmascore',
                view: 'karmascore.KarmaScoreView',
                iconCls: 'karma-score-icon-cls',
                leaf: true,
                hidden: true,
                read: false,
                routeId: 'karmascore',
                viewId: 3
            },
            {
                text: 'KarmaReport',
                view: 'karmareport.KarmaReportView',
                iconCls: 'x-fa fa-file-text',
                leaf: true,
                hidden: true,
                read: false,
                routeId: 'karmareport',
                viewId: 83
            }, {
                text: 'Karma Setup',
                view: 'karmasetup.KarmaSetupView',
                iconCls: 'karma-setup-icon-cls',
                leaf: true,
                hidden: true,
                read: false,
                routeId: 'karmasetup',
                viewId: 4
            }, 
            {   
                text: 'Karma Dashboard',
                view: 'dashboardview.KarmaScoreDashboardView',
                iconCls: 'x-fa fa-file',
                leaf: true,
                hidden: true,
                read: false,
                routeId: 'dashboard',
                viewId: 30
            },
            // {
            //     text: 'Business Workflow',
            //     view: 'business.BusinessView',
            //     iconCls: 'businessicon-cls',
            //     leaf: true,
            //     read: false,
            //     routeId: 'businessworkflows',
            //     viewId: 5
            // }, 
            {
                text: 'Org Chart',
                view: 'organization.OrgChart',
                iconCls: 'orgicon-cls',
                leaf: true,
                read: false,
                routeId: 'orgchart',
                viewId: 6
            },
            /*{
                           text: 'Job Openings',
                           view: 'jobopenings.JobOpenings',
                           iconCls: 'jobicon-cls',
                           leaf: true,
                           read: false,
                           routeId: 'jobopenings',
                           viewId: 7
                       },*/
            {
                text: 'Groups',
                view: 'groups.GroupsView',
                iconCls: 'usersicon-cls',
                leaf: true,
                viewId: 8,
                routeId: 'groups'
            }, 
            // {
            //     text: 'Performance',
            //     view: 'performancesummary.PerformanceSumView',
            //     iconCls: 'sumicon-cls',
            //     leaf: true,
            //     viewId: 9,
            //     routeId: 'summary'
            // },
            /*{
                           text: 'Settings',
                           view: 'settings.DDOSettings',
                           iconCls: 'settings-icon-cls',
                           leaf: true,
                           viewId: 36,
                           routeId: 'settings'
                       },*/
            {
                text: 'Goals',
                view: 'Goals.view.goals.Main',
                iconCls: 'x-fa fa-tasks',
                leaf: true,
                routeId: 'goals',
                viewId: 38
            },

            {
                text: 'Notice Period',
                view: 'noticeperiod.EmployeesInNoticePeriodView',
                iconCls: 'x-fa fa-clock-o',
                leaf: true,
                routeId: 'noticeperiod',
                viewId: 109
            },
            {
                text: 'Initiate Exit',
                view: 'initiateexit.InitiateExitView',
                iconCls: 'x-fa fa-sign-out',
                leaf: true,
                routeId: 'initiateexit',
                viewId: 72
            }
            ]
        }, {
            text: 'Executive Dashboard',
            expanded: false,
            leaf: false,
            iconCls: 'exe-dashboard-cls',
            viewId: 10,
            children: [{
                text: 'Availability Sheet',
                // view: 'dashboard.availibilitysheet.BorderContainer',
                view: 'sheets.availibilitysheet.AvailibilityView',
                iconCls: 'charticon-cls',
                leaf: true,
                read: false,
                routeId: 'resourceavailability',
                viewId: 11
            // },
            // {
            //     text: 'Bench Sheet',
            //     // view: 'dashboard.bench.BenchView',
            //     view: 'sheets.benchsheet.BenchView',
            //     iconCls: 'charticon-cls',
            //     leaf: true,
            //     read: false,
            //     routeId: 'bench',
            //     viewId: 86
            },
            /*{
                text: 'Job Applicants',
                view: 'applicants.Applicants',
                iconCls: 'jobapp-cls',
                leaf: true,
                read: false,
                routeId: 'jobapplicants',
                viewId: 12
            },*/
            {
                text: 'Allocation Sheet',
                view: 'sheets.allocationsheet.AllocationView',
                iconCls: 'charticon-cls',
                leaf: true,
                read: false,
                routeId: 'allocationsheet',
                viewId: 90
            }, {
                text: 'Projects',
                view: 'projects.ProjectsView',
                iconCls: 'projectsicon-cls',
                leaf: true,
                viewId: 13,
                routeId: 'projects'
            },
             {
                text: 'Finance Karma Review',
                view: 'finance.FinanceView',
                iconCls: 'financeicon-cls',
                leaf: true,
                read: false,
                routeId: 'finance',
                viewId: 14
            }, 
            // {
            //     text: 'Sales',
            //     view: 'sales.SalesView',
            //     iconCls: 'salesicon-cls',
            //     leaf: true,
            //     read: false,
            //     routeId: 'sales',
            //     viewId: 15
            // },
             {
                text: 'HR Karma Review',
                view: 'hr.HrView',
                iconCls: 'hricon-cls',
                leaf: true,
                read: false,
                routeId: 'hr',
                viewId: 16
            },
             {
                text: 'Karma Approval',
                view: 'karmaapproval.KarmaApprovalMainView',
                iconCls: 'karma-score-icon-cls',
                leaf: true,
                read: false,
                routeId: 'karmaapproval',
                viewId: 17
            },{
                text: 'Resource Request',
                view: 'projectrequest.ProjectRequest',
                iconCls: 'karma-score-icon-cls',
                leaf: true,
                read: false,
                routeId: 'resourcerequest',
                viewId: 88
            },{
                text: 'Resource Approval',
                view: 'projectapproval.ProjectApproval',
                iconCls: 'karma-score-icon-cls',
                leaf: true,
                read: false,
                routeId: 'resourceapproval',
                viewId: 87
            },{
                text: 'MoM',
                view: 'mom.Mom',
                iconCls: 'mom-view-icon-cls',
                leaf: true,
                read: false,
                routeId: 'mom',
                viewId: 37
            },
            //  {
            //     text: 'Charts',
            //     view: 'ddocharts.DDOCharts',
            //     iconCls: 'chart-icon-cls',
            //     leaf: true,
            //     read: false,
            //     routeId: 'charts',
            //     viewId: 65
            // },
             {
                text: 'Access Management',
                expanded: false,
                leaf: false,
                iconCls: 'exe-dashboard-cls',
                routeId: 'accessmanagement',
                viewId: 45,
                children: [{
                    text: 'All Apps',
                    view: 'ACCTRL.view.allapps.Main',
                    routeId: 'allappsmain',
                    leaf: true,
                    read: false,
                    viewId: 46
                }, {
                    text: 'Access Control',
                    view: 'ACCTRL.view.accesscontrol.Main',
                    routeId: 'accesscontrolmain',
                    leaf: true,
                    read: false,
                    viewId: 47
                }, {
                    text: 'My Apps',
                    view: 'ACCTRL.view.myapps.Main',
                    routeId: 'myappsmain',
                    leaf: true,
                    read: false,
                    viewId: 48
                }]
            }
                /*,
                                {
                                    text: 'Leave Settings',
                                    expanded: false,
                                    leaf: false,
                                    iconCls: 'exe-dashboard-cls',
                                    routeId: 'leavesettings',
                                    viewId: 40,
                                    children: [{
                                        text: 'Leave Type',
                                        view: 'leavesettings.leavesetup.LeaveType',
                                        iconCls: 'mom-view-icon-cls',
                                        routeId: 'leavetype',
                                        leaf: true,
                                        read: false,
                                        viewId: 41
                                    },{
                                        text: 'Holiday',
                                        view: 'leavesettings.Holiday',
                                        iconCls: 'mom-view-icon-cls',
                                        routeId: 'holiday',
                                        leaf: true,
                                        read: false,
                                        viewId: 42
                                    },{
                                        text: 'Weekly Policy',
                                        view: 'leavesettings.WeeklyPolicy',
                                        iconCls: 'mom-view-icon-cls',
                                        routeId: 'weeklypolicy',
                                        leaf: true,
                                        read: false,
                                        viewId: 43
                                    },{
                                        text: 'Credit Leaves',
                                        view: 'leavesettings.CreditLeaves',
                                        iconCls: 'mom-view-icon-cls',
                                        routeId: 'creditleaves',
                                        leaf: true,
                                        read: false,
                                        viewId: 44
                                    }]
                                },
                                 {
                                    text: 'Leave Management',
                                    view: 'leavemanagement.LeaveMainView',
                                    iconCls: 'mom-view-icon-cls',
                                    leaf: true,
                                    read: false,
                                    routeId: 'leavemanagement',
                                    viewId: 39
                                }*/
            ]
        }, {
            text: 'Employee Setup',
            expanded: false,
            leaf: false,
            iconCls: 'exe-dashboard-cls',
            viewId: 18,
            children: [{
                text: 'Account',
                view: 'setup.Account',
                iconCls: 'x-fa fa-user',
                leaf: true,
                read: false,
                routeId: 'account',
                viewId: 19
            }, {
                text: 'Designation',
                view: 'setup.designation.Designation',
                iconCls: 'x-fa fa-street-view',
                leaf: true,
                read: false,
                routeId: 'designation',
                viewId: 20
            }, {
                text: 'Department',
                view: 'setup.department.Department',
                iconCls: 'x-fa fa-building-o',
                leaf: true,
                read: false,
                routeId: 'department',
                viewId: 21
            }, {
                text: 'Role',
                view: 'setup.role.Role',
                iconCls: 'x-fa fa-tasks',
                leaf: true,
                read: false,
                routeId: 'role',
                viewId: 22
            },
            {
                text : 'Skills',
                view : 'setup.skills.Skills',
                iconCls: 'x-fa fa-cogs',
                leaf:true,
                read:false,
                routeId :'skills',
                 viewId : 91
            }, 
            {
                text:'Project Roles',
                view:'setup.projectroles.ProjectRoles',
                iconCls: 'x-fa fa-tasks',
                leaf:true,
                read:false,
                routeId:'Projectroles',
                viewId:92
            }, {
                text: 'Employee',
                view: 'setup.employeesetup.EmployeeTab',
                iconCls: 'x-fa  fa-pied-piper-alt',
                leaf: true,
                read: false,
                routeId: 'employee',
                viewId: 23
            }, {
                text: 'Financial Year',
                view: 'setup.financialyear.FinancialYear',
                iconCls: 'financeicon-cls',
                leaf: true,
                read: false,
                routeId: 'financialyear',
                viewId: 26
            },{

                text: 'Employee Report',
                view: 'employeereportview.EmployeeReportMainView',
                iconCls: 'x-fa fa-briefcase',
                leaf: true,
                read: false,
                routeId: 'employeereport',
                viewId: 77,
      
      
              },{
                text: 'Client Dashboard',
                view: 'setup.clientdashboard.ClientdashboardView',
                iconCls: 'x-fa fa-desktop',
                leaf: true,
                read: false,
                routeId: 'clientdashboard',
                viewId: 53,
              }
            ]
        },
        {
            text: 'Product Setup',
            expanded: false,
            leaf: false,
            iconCls: 'exe-dashboard-cls',
            viewId: 31,
            children: [{
                text: 'Attribute',
                view: 'order.AttributeView',
                iconCls: 'x-fa fa-user',
                leaf: true,
                read: false,
                routeId: 'attribute',
                viewId: 32
            }, {
                text: 'Attribute Value',
                view: 'order.AttributeValueView',
                iconCls: 'x-fa fa-street-view',
                leaf: true,
                read: false,
                routeId: 'attributevalue',
                viewId: 33
            }, {
                text: 'Category',
                view: 'order.CategoryView',
                iconCls: 'x-fa fa-building-o',
                leaf: true,
                read: false,
                routeId: 'category',
                viewId: 34
            }, {
                text: 'Product',
                view: 'order.ProductOrderView',
                iconCls: 'x-fa fa-building-o',
                leaf: true,
                read: false,
                routeId: 'product',
                viewId: 35
            }]
        },
        //{
        //     text: 'Talent Acquisition',
        //     expanded: false,
        //     iconCls: 'hricon-cls',
        //     leaf: false,
        //     viewId: 64,
        //     children: [{
        //         text: 'Job Type',
        //         view: 'TalentAcquisition.view.jobtype.JobType',
        //         iconCls: 'x-fa fa-user',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'jobtype',
        //         viewId: 50
        //     }, {
        //         text: 'Job Education',
        //         view: 'TalentAcquisition.view.jobeducation.JobEducation',
        //         //iconCls: 'job-education-icon-cls',
        //         iconCls: 'x-fa fa-tasks',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'jobeducation',
        //         viewId: 51
        //     }, {
        //         text: 'Application Status',
        //         view: 'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatus',
        //         iconCls: 'exe-dashboard-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'applicationstatus',
        //         viewId: 52
        //     }, {
        //         text: 'Interview Rating',
        //         view: 'TalentAcquisition.view.jobinterviewrating.JobInterviewRating',
        //         iconCls: 'sumicon-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'interviewrating',
        //         viewId: 53
        //     }, {
        //         text: 'Interview Status',
        //         view: 'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatus',
        //         iconCls: 'financeicon-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'interviewstatus',
        //         viewId: 54
        //     }, /*{
        //      text: 'Interview Rating',
        //      view: 'order.ProductOrderView',
        //      iconCls: 'x-fa fa-building-o',
        //      leaf: true,
        //      //read: false,
        //      routeId: 'product',
        //      viewId: 46
        //      }, {
        //      text: 'Hiring Consultancies',
        //      hidden: true,
        //      view: 'order.ProductOrderView',
        //      iconCls: 'x-fa fa-street-view',
        //      leaf: true,
        //      read: false,
        //      routeId: 'hiringconsultancies',
        //      viewId: 47
        //      }, */{
        //         text: 'Job Location',
        //         view: 'TalentAcquisition.view.joblocation.JobLocation',
        //         //view: 'order.ProductOrderView',
        //         iconCls: 'mom-view-icon-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'joblocation',
        //         viewId: 55
        //     }, {
        //         text: 'Sourcing Partners',
        //         view: 'TalentAcquisition.view.jobsource.JobSource',
        //         iconCls: 'hricon-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'jobsource',
        //         viewId: 56
        //     }, {
        //         text: 'Profile Sources',
        //         view: 'TalentAcquisition.view.jobsourcelines.JobSourceLines',
        //         iconCls: 'exe-dashboard-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'jobsourcelines',
        //         viewId: 57
        //     }, {
        //         text: 'Job Openings',
        //         //view: 'TalentAcquisition.view.jobopenings.JobOpeningsMain',
        //         view: 'TalentAcquisition.view.jobopenings.JobOpeningsCard',
        //         iconCls: 'x-fa fa-street-view',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'jobopenings',
        //         viewId: 58
        //     }, {
        //         text: 'Job Applications',
        //         view: 'TalentAcquisition.view.jobapplication.JobApplication',
        //         iconCls: 'x-fa fa-tasks',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'jobapplications',
        //         viewId: 59
        //     }, {
        //         text: 'Refer A Friend',
        //         view: 'TalentAcquisition.view.referemployee.ReferEmployee',
        //         iconCls: 'usersicon-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'referemployee',
        //         viewId: 60
        //     }, {
        //         text: 'Referred Employees',
        //         view: 'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployee',
        //         iconCls: 'orgicon-cls',
        //         leaf: true,
        //         read: false,
        //         routeId: 'referredemployee',
        //         viewId: 61
        //     }, {
        //         text: 'My Referrals',
        //         view: 'TalentAcquisition.view.referemployee.myreferrals.MyReferralsGrid',
        //         iconCls: 'orgicon-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'myreferrals',
        //         viewId: 62
        //     },{
        //         text: 'Interview Request',
        //         view: 'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterview',
        //         iconCls: 'salesicon-cls',
        //         leaf: true,
        //         //read: false,
        //         routeId: 'scheduledinterview',
        //         viewId: 63
        //     }]
        // }
        // {
        //     text: 'Talent Acquisition',
        //     expanded: false,
        //     iconCls: 'hricon-cls',
        //     leaf: false,
        //     viewId: 85,
        //     children: [{
        //         text: 'Preferences',
        //         view: 'JobOpenings.view.preferences.PreferencesView',
        //         //iconCls: 'x-fa fa-user',
        //         leaf: true,
        //         read: false,
        //         routeId: 'preferences',
        //         viewId: 83
        //     }, {
        //         text: 'Job Openings',
        //         view: 'JobOpenings.view.jobopeningrequest.JobOpeningsRequestView',
        //         //iconCls: 'x-fa fa-user',
        //         leaf: true,
        //         read: false,
        //         routeId: 'jobopeningslist',
        //         viewId: 66
        //     }, {
        //         text: 'Job Applications',
        //         view: 'JobOpenings.view.jobapplications.JobApplications',
        //         //iconCls: 'x-fa fa-user',
        //         leaf: true,
        //         read: false,
        //         routeId: 'jobapplications',
        //         viewId: 67
        //     }, {
        //         text: 'All Job Applications',
        //         view: 'JobOpenings.view.alljobapplications.AllJobApplications',
        //         //iconCls: 'x-fa fa-user',
        //         leaf: true,
        //         read: false,
        //         routeId: 'alljobapplications',
        //         viewId: 84
        //     }, {
        //         text: 'Referrals',
        //         view: 'JobOpenings.view.referrals.JobOpeningsReferralsView',
        //         //iconCls: 'x-fa fa-user',
        //         routeId: 'referrals',
        //         leaf: true,
        //         viewId: 68
        //     }, {
        //         text: 'Interview Request',
        //         view: 'JobOpenings.view.interviewrequest.InterviewRequest',
        //         //iconCls: 'x-fa fa-user',
        //         leaf: true,
        //         read: false,
        //         routeId: 'interviewrequest',
        //         viewId: 69
        //     }
        //     ]
        // }, {
        //     text: 'Application Enquiry',
        //     view: 'JobOpenings.view.applicationenquiry.ApplicationEnquiry',
        //     iconCls: 'hriconleaf-cls',
        //     leaf: true,
        //     read: false,
        //     routeId: 'applicationenquiry',
        //     viewId: 82
        // },
         {
            text: 'Roles & Security',
            view: 'rolessecurity.RolesView',
            iconCls: 'roleslock-cls',
            leaf: true,
            read: false,
            routeId: 'roles',
            viewId: 24
        },
        /*{
                    text: 'Support',
                    view: 'support.SupportView',
                    iconCls: 'supporticon-cls',
                    leaf: true,
                    read: false,
                    routeId: 'support',
                    viewId: 27

                },*/
        {
            text: 'Orders History',
            view: 'redeem.Redeem',
            iconCls: 'x-fa fa-history',
            leaf: true,
            viewId: 28,
            routeId: 'redeem'
        },   {
            text: 'Holidays',
            view: 'holidays.HolidaysView',
            iconCls: 'x-fa fa-gift',
            leaf: true,
            read: false,
            routeId: 'holidays',
            viewId: 99,
          }, {
            text: 'FAQ',
            view: 'help.HelpMenuView',
            iconCls: 'x-fa fa-question-circle',
            leaf: true,
            read: false,
            routeId: 'help',
            viewId: 25
        }
        ]
    }
});