/**
 * This view is responsible for displaying user profile with the details of work.
 * @class 'DDO.view.profile.UserProfile'
 * @extends 'Ext.container.Container'
 * @alias 'userprofile'
 * @ViewModel 'DDO.view.profile.UserProfileModel'
 * @Controller 'DDO.view.profile.UserProfileController'
 */
Ext.define('DDO.view.profile.UserProfile', {
    extend: 'Ext.container.Container',
    xtype: 'userprofile',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'DDO.view.profile.Header',
        'DDO.view.profile.UserProfileModel',
        'DDO.view.profile.UserProfileController',
        'DDO.view.profile.ProfileUserView',
        'DDO.view.profile.nominateview.NominateViewWindow',
        'DDO.view.profile.editPersonelDetails.EditPersonelDetailsWindow',
        'DDO.view.profile.sendresignation.SendResignationWindow',
        'DDO.view.profile.projectsummary.ProjectSummarywin'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    controller: 'userprofile',
    viewModel: {
        type: 'userprofile'
    },

    printTpl: [

        '<style>',
        '.ddo-print-header {',
        '  border-radius: 5px;',
        //'  background: #DBE5F1;',
        '  padding: 10px;',
        '  font-size: 16px;',
        '  border: 1px solid;',
        '  margin-bottom: 10px;',
        '  margin-top: 20px;',
        '  font-weight:bold;',
        '}',

        '.ddo-print-detail,',
        '.ddo-print-detail-education-footer,.ddo-print-detail-experience-footer {',
        '  font-size: 13px;',
        '  margin: 5px;',
        '}',

        '.ddo-print-detail-experience-footer {',
        '  border-bottom: 0.5px solid;',
        '}',

        '.ddo-print-detail-experience-footer:last-child {',
        '  border-bottom: 0px;',
        '}',

        '.ddo-print-detail-education-footer {',
        '  border-bottom: 0.5px solid;',
        '}',

        '.ddo-print-detail-education-footer:last-child {',
        '  border-bottom: 0px;',
        '}',

        '.wtc-logo {',
        'text-align: center;',
        '}',

        '.about-name{',
        'font-size:27px;',
        '}',

        '.starimage-cls{',
        'height:16px;',
        'width:16px;',
        '}',

        '.skillsView-cls{',
        'margin:10px;',
        '}',

        '.rating-cls{',
        'float:right;',
        '}',

        '</style>',

        //for logo and name
        '<div class="wtc-logo">',
        '<img src="/resources/images/Logo_head.png"  style="width:230px; height:44px; margin-bottom: 10px;">',
        '<div class="about-name">{about.name}</div>',

        '</div>',


        //'About' details tpl
        '<div class="ddo-print-item">',
        '  <div class="ddo-print-header">Overview</div>',
        '  <div class="ddo-print-detail">{about.role}</div>',
        '  <div class="ddo-print-detail">{about.tempaddress}</div>',
        '  <div class="ddo-print-detail">{about.permanentaddress}</div>',
        '  <div class="ddo-print-detail">{about.education}</div>',
        '  <div class="ddo-print-detail">Primary Skill : {about.primaryskill}</div>',
        '  <div class="ddo-print-detail">Other Skills : {about.otherskills}</div>',
        '</div>',

        //Experience tpl
        '<tpl if="!Ext.isEmpty(jobs)">',
        '<div>',
        '<div class="ddo-print-header">Professional Experience</div>',
        '<tpl for="jobs"><div class="print-employee">',
        '<div class="print-employee">',
        '    <div class="ddo-print-detail">{designation_when_joined}</div><img class="ddo-edit-img" style="display:none" src="resources/images/edit.png"></div>',
        '  <div class="x-print-clear"></div>',
        '  <div class="ddo-print-detail">{company}</div>',
        '  <div class="ddo-print-detail">{convertdate}</div>',
        '  <div class="ddo-print-detail">{location}</div>',
        '  <div class="ddo-print-detail-experience-footer">{description}</div>',
        '</tpl>',
        '</div>',
        '</tpl>',

        // Skills tpl
        '<tpl if="!Ext.isEmpty(skills)">',
        '<div class="ddo-print-header">Technical Summary</div>',
        '<tpl for="skills">',
        '<div class="skillsView-cls"><span class="ddo-print-detail">{[this.getSkillName(values)]}</span>',
        '<span class="rating-cls">{[this.getStars(values)]}</span><br/>',
        //'<br/>',
        '</div>',
        '</tpl>',
        '</tpl>',


        //Education tpl
        '<tpl if="!Ext.isEmpty(education)">',
        '<div class="ddo-edu-div">',
        '<div class="ddo-print-header">Education</div>',
        '<tpl for="education">',
        '<div class="ddo-title-wrap"><span class="ddo-print-detail">{school}</span><span class="ddo-edit-view"></span></div>',
        '<div class="ddo-print-detail">{[this.getCourse(values)]}</div>',
        '<div class="ddo-print-detail">',
        '<tpl if="fromdateattended" style="font-size:30px;margin-bottom:10px;">{todateattended}<tpl else>N/A</tpl></div>',
        '<div class="ddo-print-detail-education-footer">{description}</div>',
        '</tpl>',
        '</div>',
        '</tpl>',

        //interests tpl
        '<tpl if="!Ext.isEmpty(interest)">',
        '<div class = "ddo-print-header">',
        'Interests',
        '</div>',
        '<tpl for="interest">',
        '<div class = "ddo-interesttpl">',
        '<div data-qtip = "{area}" class="ddo-print-detail">{area:ellipsis(10)}</div>',
        '<tpl if="this.getDeleteBtn(values)">',
        '<div class="ddo-interests-delete" data-action="deleteInterest"></div>',
        '</tpl>',
        '</div>',
        '</tpl>',
        '</tpl>',


        {
            getCourse: function(values) {
                var comboStore = Ext.getStore('coursestore'),
                    dataArray,
                    rec;
                if (comboStore.totalCount === comboStore.data.length) {
                    rec = comboStore.findRecord('courseid', values.courseid);
                    if (!Ext.isEmpty(rec)) {
                        return rec.data.school;
                    }
                } else {
                    dataArray = comboStore.data.getSource().items;
                    for (var i = 0, len = dataArray.length; i < len; i++) {
                        if (dataArray[i].data.courseid === values.couseid) {
                            return dataArray[i].data.school;
                        }
                    }
                }
            },

            getSkillName: function(values) {
                //this store is used everywhere in the application so we cannot made it local.
                var comboStore = Ext.getStore('skillslist.ProfileSkillsComboStore'),
                    dataArray,
                    rec;

                if (comboStore.totalCount === comboStore.data.length) {
                    if (values.data) {
                        rec = comboStore.findRecord('ddo_skills_id', values.data.skillid);
                    } else {
                        rec = comboStore.findRecord('ddo_skills_id', values.skillid);
                    }
                    if (!Ext.isEmpty(rec)) {
                        return rec.data.name;
                    }
                } else {
                    dataArray = comboStore.data.items;
                    for (var i = 0, len = dataArray.length; i < len; i++) {
                        if (dataArray[i].data.ddo_skills_id === values.skillid) {
                            return dataArray[i].data.name;
                        }
                    }
                }
            },
            /** displays the stars based on the rating value
             *  @param{object} [values] whole object
             **/
            getStars: function(values) {
                var html = [],
                    i = 1,
                    rating = parseFloat(values.rating),
                    tpl = "";
                for (var len = Math.floor(rating); i < 6; i = i + 1) {
                    if (i <= len) {
                        html.push(tpl.replace("", "<img src='resources/images/profile/Star.png' class='starimage-cls'>"));
                    } else if (rating % 1 !== 0 && i === (len + 1)) {
                        html.push(tpl.replace("", "<img src='resources/images/profile/Half.png' class='starimage-cls'>"));
                    } else {
                        html.push(tpl.replace("", "<img src='resources/images/profile/Star_line.png' class='starimage-cls'>"));
                    }
                }
                return (html.join(" "));
            }
        }
    ],

    padding: '20 20 20 20',
    cls: 'userProfile-container noscrollbar',

    items: [{
        xtype: 'profileheader',
        cls: 'profileheader-cls',
        bind: {
            style: {
                background: 'url("{profileBgUrl}"),url(resources/images/user-bg/10-bg.png)'
            }
        },
        height: Constants.ViewportHeight * 0.62

    }, {
        xtype: 'toolbar',
        height: 50,
        docked: 'bottom',
        items: [
            {
            xtype: 'button',
            reference: 'nominatebtn',
            iconCls: 'nominate-cls',
            text: LabelsTitles.PROFILE.NOMINATE,
            cls: 'nominatebutton',
            bind: {
                hidden: '{nominateAccess}'
            },
            handler: 'onNominateBtnClick'

        }, 
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'button',
            text: LabelsTitles.PROFILE.PROVITIONTOCNFM,
            reference: 'provitiontocnfm',
            cls: 'nominatebutton',
            handler: 'onProvitiontocnfmbtnClick'
        },
        {
            xtype: 'button',
            text: LabelsTitles.PROFILE.ALLOCATION,
            reference: 'ProjectSummary',
            cls: 'nominatebutton',
            handler: 'onProjectSummarybtnClick'
        },{
            xtype: 'button',
            text:LabelsTitles.PROFILE.EDITPERSONAL,
            reference: 'EditPersonelDetails',
            bind:{
                hidden:'{editpersoneldetailbutton}'
            },
            cls: 'nominatebutton',
            handler: 'onEditPersonelDetailsbtnClick'
        },
         {
            xtype: 'button',
            reference: 'printBtn',
            iconCls: 'x-fa fa-print',
            handler: 'onPrintBtnClick'
        },{
            xtype: 'button',
            text: LabelsTitles.PROFILE.PROJECTHISTORY,
            reference: 'projectHistory',
            cls: 'nominatebutton',
            handler: 'onProjectHistoryClick',
        },{
            xtype: 'button',
            reference: 'reporting',
            text: LabelsTitles.PROFILE.REPORTINGMNGRHISTORY,
            cls: 'nominatebutton',
            handler: 'onReportingHistoryClick',

        },{
            text: LabelsTitles.PROFILE.VIEWTIMELINE,
            reference: 'detailsBtn',
            cls: 'timelinebutton',
            handler: 'onDetailsBtnClick'
        }]
    }, {
        xtype: 'profileuserview',
        reference: 'profileuserview'
    }],
    listeners: {
        /**
         * This custom event is fired to load the data for the user profile views.
         * Loads the data form proxy or manually based on the value of loadProxy
         * boolean.
         * @param loadProxy:
         *      - true to load the store's proxy for each view
         *      - false to load the details from a manual request
         * @param [record] This is the selected record for which the data needs to 
         *      be loaded.
         */
        loadprofiledata: 'onLoadProfileData',
        activate:'onActivatingUserProfile'
    }
});
