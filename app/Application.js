/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('DDO.Application', {
    extend: 'Ext.app.Application',

    requires : [
        'DDO.overrides.data.Connection'
    ],
    
    name: 'DDO',

    defaultToken: 'login',

    stores: [
        'loginlanding.Quotes',
        'loginlanding.Login',
        'loginlanding.HeaderText',
        'loginlanding.createaccount.RegistrationCityComboStore',
        'loginlanding.createaccount.RegistrationStateComboStore',
        'loginlanding.createaccount.RegistrationCountryComboStore',

        'registration.DesignationComboStore',

        'main.NavigationTree',

        'widget.todo.TodoStore',
        'widget.todo.TodoDetailStore',
        'widget.karmascore.KarmaScore',
        'widget.karmascore.KarmaScoreSlider',
        'widget.wallethistory.KarmaHistoryStore',
        'widget.wallethistory.WalletHistoryStore',

        'feeds.Share',
        'feeds.Groups',
        'feeds.FeedImagesStore',
        'feeds.likes.LikesStore',
        'feeds.likes.UserLikesStore',

        'projects.NotesStore',
        'projects.MOMViewStore',
        'projects.MOMGridStore',
        'projects.MOMViewStore',
        'projects.EmpNamesStore',
        'projects.NoteComboStore',
        'projects.StatusComboStore',
        'projects.people.ProjectRole',
        'projects.FeedbackComboStore',
        'projects.ProjectDashboardStore',
        'projects.people.PeopleViewStore',
        'projects.people.AllocationEmployee',
        'projects.nominate.NominateRatingInstanceStore',
        'projects.TechnologiesComboStore',
        'projects.VersionsStore',

        'profile.NominateNames',
        'profile.NominateStore',
        'profile.ProfileMonthStore',
        'profile.UserTimelineStore',
        'profile.RatingParamsStore',
        'profile.AppAccessSummaryStore',

        'aboutlist.UserAbout',

        'skillslist.ProfileSkillsStore',
        'skillslist.ProfileSkillsComboStore',
        'clientdashboard.ClientDashboardStore',
        'holidays.HolidaysStore',

        'education.CourseStore',
        'education.ComboYearStore',
        'education.EducationDataStore',

        'jobs.JobsStore',
        'jobs.MonthStore',

        'interests.InterestsStore',

        'organization.OrgChartStore',
        'organization.WtcLocationStore',
        'organization.OrgChartEmpNamesStore',
        'organization.OrgChartDepartmentStore',
        'groups.EmpGroupStore',
        'groups.GroupsComboStore',
        'groups.SelectedEmpStore',
        'karmascore.ProjectComboStore',
        'karmascore.AdvKarmaScoreSlider',
        'karmascore.DepartmentComboStore',
        'karmascore.SupervisorComboStore',
        'karmascore.KarmaGroupComboStore',
        'karmascore.DesignationComboStore',
        'karmascore.PrimarySkillsComboStore',

        'karmasetup.KarmaStore',
        'karmasetup.KarmaRuleStore',
        'karmasetup.CategoryComboStore',
        'karmasetup.KarmaCategoriesStore',
        'karmasetup.KarmaIconUploadedStore',
        'karmasetup.KarmaRangeInstanceStore',
        'karmasetup.wallet.WalletComboStore',
        'karmasetup.KarmaRatingInstanceStore',
        'karmasetup.wallet.EmployeeComboStore',
        'karmasetup.KarmaProratedInstanceStore',
        'karmasetup.KarmaProratedInstanceFrequencyStore',
        'setup.AccountStore',
        'setup.role.RoleStore',
        'setup.AccountCityComboStore',
        'setup.AccountStateComboStore',
        'setup.AccountCountryComboStore',
        'setup.employeesetup.StatusStore',
        'setup.SetupSupervisorComboStore',
        'setup.SetupDesignationComboStore',
        'setup.department.DepartmentStore',
        'setup.employeesetup.ReportingStore',
        'setup.employeesetup.CityComboStore',
        'setup.designation.DesignationStore',
        'setup.employeesetup.StateComboStore',
        'setup.department.DepartmentComboStore',
        'setup.employeesetup.CountryComboStore',
        'setup.employeesetup.EmployeeTypeStore',
        'setup.employeesetup.EmployeeSetupStore',
        'setup.employeesetup.PrimarySkillComboStore',
        'setup.employeesetup.EmployeeStatusComboStore',
        'setup.financialyear.FinancialYearStore',

        'filter.AddFilter',
        'filter.SearchFeeds',
        'filter.FilterButton',

        'redeem.RedeemGridStore',
        'redeem.RedeemHistoryItemsGridStore',

        'Redeem.store.AttributeStore',
        'Redeem.store.ProductValueStore',
        'Redeem.store.SetAttributeStore',
        'Redeem.store.CategoryValueStore',
        'Redeem.store.ProductImagesStore',
        'Redeem.store.AttributeJsonStore',
        'Redeem.store.AttributeValueStore',

        'profile.ProjectSummaryStore',
        'setup.employeesetup.EmployeeStore',

        'Goals.store.ExecutiveStore',
        'Goals.store.goals.ProjectStore',
        'Goals.store.ExecutiveGridStore',
        'Goals.store.goals.GoalsViewStore',
        'Goals.store.goals.GoalsParentComboStore',

        'settings.GoalSettings',


        'mom.MomComponent',

        'karmasetup.KarmaNominateStore',
        'ACCTRL.store.AppSatusStore',
        'ACCTRL.store.allapps.ActiveUserStore',
        'ACCTRL.store.allapps.AllAppsGridStore',
        'ACCTRL.store.allapps.DetailStore',
        'ACCTRL.store.allapps.HistoryGridStore',
        'ACCTRL.store.accesscontrol.AccessControlGridStore',
        'ACCTRL.store.myapps.MyAppsGridStore',
    
        'ddocharts.FeedsPieStore',
        'ddocharts.KarmaPieStore',
        'ddocharts.KarmaBarStore',
        'jobopenings.JobRecruiter',
        'jobopenings.ApplicationStatus',
        'jobopenings.JobopeningsActions',
       'progressbar.ProgressbarStore',
    

       'profile.ProjectHistoryStore',
       'projects.people.AddPeopleSearchStore',
       'projects.MOMActionItemsStore'
    ],

    onAppUpdate: function() {
        //Reload the application for any changes in build.
        window.location.reload();
    }
});
