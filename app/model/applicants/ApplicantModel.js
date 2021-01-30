Ext.define('DDO.model.applicants.ApplicantModel', {
    extend: 'Ext.data.Model',

    fields: [
        "ad_client_id",
        "ad_org_id",
        "createdby",
        "created", {
            name: "last_updated_on",
            type: 'date'
        },
        "updatedby",
        "isactive",
        "hr_application_id",
        "candidate_name",
        "recruiter_name", {
            name: "job_designation",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        }, {
            name: "job_application_date",
            type: 'date'
        },
        "highest_education",
        "job_openings",
        "year_of_passing",
        "relevant_experience", {
            name: "base_location",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        }, {
            name: "current_company",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        }, {
            name: "current_city",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        }, {
            name: "skill_type",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        },
        "mobile_number",
        "email_address",
        "status", {
            name: "referred_by",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        },

        "interviewer_name",
        "current_employee_status", {
            name: "notice_days",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        },

        "available_from",
        "interview_date", {
            name: "rating",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        }, {
            name: "application_status",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "None";
                } else {
                    return data;
                }

            }
        }, {
            name: "feedback",
            convert: function(data, record) {
                if (data === "\\N") {
                    return "";
                } else {
                    return data;
                }

            }
        }

    ]
});