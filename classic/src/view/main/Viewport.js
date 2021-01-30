/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 * TODO - Replace this content of this view to suite the needs of your application.
 *   @extends {Ext.Container}
 *   ViewModel :  'DDO.view.main.ViewportModel'
 *   ViewController :'DDO.view.main.ViewportController'.
 */
Ext.define('DDO.view.main.Viewport', {
    extend: 'Ext.Container',
    xtype: 'mainviewport',
    requires: [
        'Ext.list.Tree',
        'DDO.view.home.Home',
        'DDO.view.main.ViewportModel',
        'DDO.view.main.MainContainerWrap',
        'DDO.view.main.ViewportController',
        'DDO.view.feeds.FeedsView',
        'DDO.view.feeds.FeedsTagMenuImage',
        'DDO.view.email.Email',
        'DDO.view.profile.UserProfile',
        'DDO.view.dashboardview.KarmaScoreDashboardView',
        'DDO.view.pages.FAQ',
        'DDO.view.pages.Error',
        'DDO.view.search.Results',
        'DDO.view.organization.OrgChart',
        'DDO.view.rolessecurity.RolesView',
        'DDO.view.groups.GroupsView',
        'DDO.view.projects.ProjectsView',
        'DDO.view.finance.FinanceView',
        'DDO.view.sales.SalesView',
        'DDO.view.hr.HrView',
        'DDO.view.business.BusinessView',
        'DDO.view.performancesummary.PerformanceSumView',
        'DDO.view.help.HelpMenuView',
        'DDO.view.karmascore.KarmaScoreView',
        'DDO.view.karmasetup.KarmaSetupView',
       // 'DDO.view.karmaapproval.KarmaApproval',
        'DDO.view.karmaapproval.KarmaApprovalMainView',
        'DDO.view.setup.Account',
        'DDO.view.setup.role.Role',
        'DDO.view.setup.skills.Skills',
        'DDO.view.setup.projectroles.ProjectRoles',
        'DDO.view.setup.department.Department',
        'DDO.view.setup.designation.Designation',
        'DDO.view.setup.financialyear.FinancialYear',
        'DDO.view.setup.employeesetup.EmployeeSetUpView',
        'DDO.view.setup.clientdashboard.ClientdashboardView',
        'DDO.view.holidays.HolidaysView',
        'DDO.view.nominate.selfnomination.SelfNominateWindow',
        'DDO.view.changepassword.ChangePasswordWindow',
        'Redeem.view.RedeemView',
        'DDO.view.redeem.Redeem',
        'DDO.view.order.CategoryView',
        'DDO.view.order.AttributeView',
        "DDO.view.order.ProductOrderView",
        'DDO.view.order.AttributeValueView',
        'Goals.view.goals.Main',
        'DDO.view.settings.DDOSettings',
        'DDO.view.mom.Mom',
        'DDO.view.ddocharts.DDOCharts',
        'DDO.view.setup.employeesetup.EmployeeTab',
        'DDO.view.employeereportview.EmployeeReportMainView',
        'ACCTRL.view.allapps.Main',
        'ACCTRL.view.accesscontrol.Main',
        'ACCTRL.view.myapps.Main',
        // 'TalentAcquisition.view.jobtype.JobType',
        //     'TalentAcquisition.ux.container.CollapsibleContainer',
        //     'TalentAcquisition.view.jobeducation.JobEducation',
        //     'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatus',
        //     'TalentAcquisition.view.jobinterviewrating.JobInterviewRating',
        //     'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatus',
        //     'TalentAcquisition.view.joblocation.JobLocation',
        //     'TalentAcquisition.view.jobsource.JobSource',
        //     'TalentAcquisition.view.jobsourcelines.JobSourceLines',
        //     'TalentAcquisition.view.jobopenings.JobOpeningsCard',
        //     'TalentAcquisition.view.jobapplication.JobApplication',
        //     'TalentAcquisition.view.referemployee.ReferEmployee',
        //     'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployee',
        //     'TalentAcquisition.view.referemployee.myreferrals.MyReferralsGrid',
        //     'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterview',
        // 'JobOpenings.view.jobopeningrequest.JobOpeningsRequestView',
        // 'JobOpenings.view.jobapplications.JobApplications',
        // 'JobOpenings.view.interviewrequest.InterviewRequest',
        // 'JobOpenings.view.referrals.JobOpeningsReferralsView',
        // 'JobOpenings.view.applicationenquiry.ApplicationEnquiry',
        // 'JobOpenings.view.preferences.PreferencesView',
        // 'JobOpenings.view.alljobapplications.AllJobApplications',
        'DDO.view.home.Map',
        'DDO.view.noticeperiod.EmployeesInNoticePeriodView',
        'DDO.view.initiateexit.InitiateExitView',
        'DDO.view.karmareport.KarmaReportView'
    ],
    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    itemId: 'mainView',
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'center'
    },
    items: [
        {
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
        width: '100%',
        height: Constants.ViewportHeight * 0.101,
        itemId: 'headerBar',
        items: [{
            xtype: 'component',
            reference: 'senchaLogo',
            cls: 'sencha-logo',
            bind: {
                html: '<div class="main-logo"><img src="{companyLogoUrl}" alt="Walking Tree"></div>'
            },
            width: Constants.ViewportWidth * 0.147,
            listeners: {
                render: function(c) {
                    c.getEl().on({
                        click: 'onCompanyLogoClick'
                    });
                }
            }
        }, {
            margin: '0 0 0 5',
            cls: 'delete-focus-bg',
            iconCls: 'x-fa fa-navicon',
            id: 'main-navigation-btn',
            handler: 'onToggleNavigationSize',
            hidden: true // This have to be uncommented on 14th to show R. Patra
        }, {
            xtype: 'tbspacer',
            flex: 1
        }, {
            bind: {
                html: '<div class="update-count-inner-data-cls">{getNewFeedCount}</div>',
                hidden: '{isNewFeedCountZero}'
            },
            cls: 'update-count-cls',
            width: Constants.ViewportWidth * 0.027,
            height: Constants.ViewportHeight * 0.463,
            listeners: {
                click: "onNewFeedNorificationClick"
            }
        }, {
            xtype: 'tbspacer'
        }, {
            xtype: 'component',
            html: '<my-menu></my-menu>'
        }, {
            xtype: 'button',
            reference: 'nominatebtn',
            iconCls:'nominate-btn-icon', 
            text: LabelsTitles.VIEWPORT.NOMINATE,
            cls: 'header-right-nominate-button',
            menu: {
                plain: true,
                width:Constants.ViewportWidth * 0.132,
                cls: 'header-right-nominate-button-list',
                items: [{
                    name: "nominateothers",
                    reference:'nominateothers',
                    iconCls:'x-fa fa-users',
                    text: LabelsTitles.VIEWPORT.NOMINATEOTHER,
                    cls: 'header-right-nominate-button-list-item',
                    listeners: {
                        click: 'onNominateBtnClick'
                    }
                },
                {
                    xtype:'container',
                    cls:'menuContainer',
                    layout:'hbox',
                    items:[{
                        xtype:'button',
                        width:20,
                        itemCls: 'header-right-profile-selfnominate-icon',
                        bind: {
                            style: {
                                'background': 'url("{profileImg}") 0 0/cover no-repeat, url(' + Utility.defaultImg + ') 0 0/cover no-repeat',
                                'width': '20px'
                            }
                        },
                        listeners: {
                            click: 'onNominateBtnClick'
                        }
                    },{
                        text: LabelsTitles.VIEWPORT.SELFNOMINATE,
                      
                        name: "selfnominate",
                        xtype:'button',
                        reference:'selfnominate',
                         width:'75%',
                        listeners: {
                            click: 'onNominateBtnClick'
                        }
                    },
                  ]
                }
            ]
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.VIEWPORT.REDEEM,
            iconCls: 'x-fa fa-shopping-cart',
            cls: 'header-right-redeem-button',
            listeners: {
                click: 'onRedeemBtnClick'
            }
        }, {
            xtype: 'button',
            cls: 'header-right-profile-image-button',
            height: Constants.ViewportHeight *  0.07,
            width: Constants.ViewportWidth * 0.033,
            margin: '0 60 0 0',
            arrowVisible: false,
            alt: LabelsTitles.VIEWPORT.USERIMAGE,
            bind: {
                style: {
                    'background': 'url("{profileImg}") 0 0/cover no-repeat, url(' + Utility.defaultImg + ') 0 0/cover no-repeat',
                    'border': 0
                }
            },
            menu: {
                cls: 'profile-menu',
                plain: true,
                width: Constants.ViewportWidth * 0.103,
                items: [{
                    text: LabelsTitles.VIEWPORT.PROFILE,
                    iconCls: 'profile-pic-icon-cls',
                    listeners: {
                        click: 'onProfileClick',
                        afterrender:'profileRender'
                    }
                }, {
                    text: LabelsTitles.VIEWPORT.LOGOUT,
                    iconCls: 'logout-icon-cls',
                    listeners: {
                        click: 'onLogoutClick'
                    }
                    }, {
                        text: LabelsTitles.VIEWPORT.LOCATION,
                        iconCls: 'settings-icon-cls',
                        listeners: {
                            click: 'showLocation'
                        }
                    }]
               }
        }]
    },
    {
        xtype: 'maincontainerwrap',
        id: 'main-view-detail-wrap',
        reference: 'mainContainerWrap',
        flex: 1,
        listeners: {
            render: 'onMainContainerRender'
        },
        items: [{
            xtype: 'container',
            name: 'menucontainer',
            width: Constants.ViewportWidth * 0.176,
            maxWidth: Constants.ViewportWidth * 0.176,
            layout: 'fit',
            items: [{
                xtype: 'treelist',
                reference: 'navigationTreeList',
                itemId: 'navigationTreeList',
                ui: 'navigation',
                store: "navigationstore",
                width:Constants.ViewportWidth * 0.176,
                maxWidth: Constants.ViewportWidth * 0.176,
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    selectionchange: 'onNavigationTreeSelectionChange'
                }
            }]
        }, {
            xtype: 'container',
            width: Constants.ViewportWidth * 0.773,
            padding: '0px 25px 0px 0px',
            reference: 'mainCardPanel',
            cls: 'sencha-dash-right-main-container',
            itemId: 'contentPanel',
            layout: {
                type: 'card'
            },
            listeners: {
                /*afterrender:function(){
                    if(session=true){
                        var k = window.location.hash;
                        var len = k.length;
                        var newHash = k.substr(1,len-1);
                        Ext.Function.defer(function(){
                            var controler = Ext.ComponentQuery.query('#mainView')[0].getController();
                            controler.setCurrentView(newHash);
                        }, 3000);
                    } 
                }*/
            }
        }]
    }
    ],
    listeners: {
        boxready: 'onBoxReady'
    }
});