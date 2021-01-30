Ext.define('DDO.view.applicants.Applicants', {
    extend: 'Ext.grid.Panel',

    requires: [

        'DDO.view.applicants.ApplicantsController',
        'DDO.view.applicants.ApplicantsViewModel'
    ],
    height: 500,
    alias: 'widget.applicants',

    controller: 'applicantscontroller',

    viewModel: {
        type: 'applicantsviewmodel'
    },

    initComponent: function() {
        this.callParent(arguments);

        var store = Ext.getStore('applicants.ApplicantsStore');

        if (!store.isLoaded()) {
            store.load();
        }
    },


    store: 'applicants.ApplicantsStore',

    cls: 'ddo-applicants-grid',

    title: 'Job Applicants',

    columns: [{
        text: 'Candidate',
        dataIndex: 'candidate_name',
        width: 200,
        filter: {
            type: 'string'
        }
    }, {
        text: 'Recruiter',
        dataIndex: 'recruiter_name',
        width: 200,
        filter: {
            type: 'string'
        }
    }, {
        text: 'Job Designation',
        dataIndex: 'job_designation',
        width: 200
    }, {
        text: 'Job Application Date',
        dataIndex: 'job_application_date',
        width: 150,
        renderer: function(data) {
            var value = Ext.Date.format(new Date(data), 'd-M-Y');
            return value;
        },
        filter: {
            type: 'date',
            pickerDefaults: {
                cls: 'ddo-create-datepicker'
            }
        }
    }, {
        text: 'Highest Education',
        dataIndex: 'highest_education',
        width: 100
    }, {
        text: 'Job Openings',
        dataIndex: 'job_openings',
        width: 250,
        filter: {
            type: 'string'
        }
    }, {
        text: 'Year of Passing',
        dataIndex: 'year_of_passing',
        width: 100
    }, {
        text: 'Relevant Experience',
        dataIndex: 'relevant_experience',
        width: 150
    }, {
        text: 'Base Location',
        dataIndex: 'base_location',
        width: 100
    }, {
        text: 'Current City',
        dataIndex: 'current_city',
        width: 100
    }, {
        text: 'Current Company',
        dataIndex: 'current_company',
        width: 100
    }, {
        text: 'Skill Type',
        dataIndex: 'skill_type',
        width: 100
    }, {
        text: 'Mobile Number',
        dataIndex: 'mobile_number',
        width: 150
    }, {
        text: 'Email',
        dataIndex: 'email_address',
        width: 150
    }, {
        text: 'Notice Period',
        dataIndex: 'notice_days',
        width: 100
    }, {
        text: 'Application Status',
        dataIndex: 'application_status',
        renderer: function(data) {
            if (data === "None") {
                return "";
            } else {
                return data;
            }
        },
        filter: {
            type: 'list'
        },
        width: 150
    }, {
        text: 'Referred By',
        dataIndex: 'referred_by',
        width: 150
    }, {
        text: 'Last updated on',
        dataIndex: 'last_updated_on',
        width: 200,
        renderer: function(data) {
            var value = Ext.Date.format(new Date(data), 'd-M-Y');
            return value;
        }
    }],
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: ['<table class="applicants-rowexpand-cls" style = "width:42%"><tr><td style = "width:35%"><span class="applicants-rowexpand-text-cls">Interviewer Name:</span>{interviewer_name}</td><td><span class="applicants-rowexpand-text-cls">Date:</span>{[this.getFormatedDate(values.job_application_date)]}</td></tr>',
            '<tr><td style="padding-top:1%"><span class="applicants-rowexpand-text-cls">Rating:</span>{rating}</td><td><span class="applicants-rowexpand-text-cls">Application Status:</span>{application_status}</td></tr>',
            '<tr class="applicants-disc-cls"><td colspan="2" style="padding-top:1%"><span class="applicants-rowexpand-text-cls">FeedBack:</span>{feedback}</td></tr></table>', {
                getFormatedDate: function(data) {
                    var value = Ext.Date.format(new Date(data), 'd-M-Y');
                    return value;
                }
            }
        ]

    }, {
        ptype: 'gridfilters'
    }]

});
