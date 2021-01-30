Ext.define('TalentAcquisition.overrides.window.Toast', {
    override: 'Ext.window.Toast',
    stickOnClick: false,
    xtype: 'toast',
    autoCloseDelay: 900
});
/*,function (Toast) {
    Ext.toast = function (message, title, align, iconCls) {
        var config = message,
            toast,
            customToast;

        if (Ext.isString(message)) {
            config = {
                title: title,
                html: message,
                iconCls: iconCls
            };
            if (align) {
                config.align = align;
            }
        }
        customToast = Ext.ComponentQuery.query('toast');
        if( !Ext.isEmpty(customToast) && customToast.length > 0){
            for(i=0;i<customToast.length;i++){
                customToast[i].destroy();
            }
        }
        toast = new Toast(config);
        toast.show();
        return toast;
    };
}*/

Ext.define('TalentAcquisition.model.employeereferral.EmployeeReferral', {
    extend: 'Ext.data.Model',
    fields: [
        'primaryskills',
        'candidatename',
        'email',
        'phone',
        'location',
        'recommendation',
        'relation',
        'referredby',
        'curriculumvitae',
        {
            name: 'ddo_jobopenings_id',
            type: 'number'
        },
        {
            name: 'ddo_jobapplicationstatus_id',
            type: 'number'
        },
        {
            name: 'ddo_employeereferral_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.interviewdetails.InterviewDetails', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'ddo_jobapplications_id',
            type: 'number'
        },
        'username',
        {
            name: 'interviewdate',
            type: 'date'
        },
        'skilltype',
        'mobilenumber',
        'email',
        'status',
        {
            name: 'intervieweremployeeid',
            type: 'number'
        },
        'interviewtype',
        'feedback',
        'rating'
    ]
});

Ext.define('TalentAcquisition.model.jobapplication.JobApplication', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'ddo_jobapplications_id',
            type: 'number'
        },
        {
            name: "candidatename",
            type: "string",
            convert: function(value, record) {
                var middlename = Ext.isEmpty(record.get('middlename')) ? " " : record.get('middlename') + " ";
                value = record.get('firstname') + ' ' + middlename + record.get('lastname');
                return value;
            }
        },
        'fathersname',
        {
            name: 'yearofpassing',
            type: 'date'
        },
        'skilltype',
        'mobilenumber',
        'email',
        'address',
        'currentcity',
        'currentemploymentstatus',
        'ddo_jobsource_name',
        'ddo_jobopenings_name',
        'ddo_jobeducation_name',
        'ddo_designation_name',
        'ddo_jobapplicationstatus_name',
        {
            name: 'totalexperience',
            type: 'number'
        },
        'idproof',
        'idproofnumber',
        {
            name: 'appliedon',
            type: 'date'
        },
        {
            name: 'availablefrom',
            type: 'date'
        },
        {
            name: 'noticeperiodindays',
            type: 'number'
        },
        'curriculumvitae',
        {
            name: 'ddo_jobsource_id',
            type: 'number'
        },
        {
            name: 'jobsourcevalue',
            type: 'number'
        },
        'comments',
        {
            name: 'ddo_jobopenings_id',
            type: 'number'
        },
        {
            name: 'ddo_jobeducation_id',
            type: 'number'
        },
        {
            name: 'ddo_designation_id',
            type: 'number'
        },
        {
            name: 'recruitedby',
            type: 'number'
        },
        {
            name: 'referredby',
            type: 'number'
        },
        {
            name: 'vendorname',
            type: 'number'
        },
        {
            name: 'jobportalname',
            type: 'number'
        },
        {
            name: 'ddo_jobapplicationstatus_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.jobapplicationstatus.JobApplicationStatus', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobapplicationstatus_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.jobeducation.JobEducation', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobeducation_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.jobinterviewrating.JobInterviewRating', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobinterviewrating_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.jobinterviewstatus.JobInterviewStatus', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobinterviewstatus_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.joblocation.JobLocation', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        {
            name: 'ddo_joblocation_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.jobopenings.JobOpenings', {
    extend: 'Ext.data.Model',
    fields: [
        'jobcode',
        'name',
        'totalexperience',
        'openpositions',
        'responsibilities',
        'primaryskills',
        'secondaryskills',
        'jobstatus',
        {
            name: 'validfrom',
            type: 'date'
        },
        {
            name: 'validto',
            type: 'date'
        },
        'isbillable',
        {
            name: 'ddo_department_id',
            type: 'number'
        },
        {
            name: 'ddo_joblocation_id',
            type: 'number'
        },
        {
            name: 'ddo_jobopenings_id',
            type: 'number'
        },
        {
            name: 'ddo_designation_id',
            type: 'number'
        },
        {
            name: 'ddo_jobeducation_id',
            type: 'number'
        }
    ]
});
/*jobcode character varying(20) NOT NULL,
    name character varying(20) NOT NULL,
    totalexperience  NUMERIC (2, 2) NOT NULL,
    openpositions INTEGER  NOT NULL,
    responsibilities text NOT NULL,
    primaryskills text NOT NULL,
    secondaryskills text,
    jobstatus character (20),
    validfrom timestamp without time zone NOT NULL,
    validto timestamp without time zone,
    isbillable character (1) DEFAULT 'N',
    DDO_Client_ID INTEGER NOT NULL, 
    DDO_Department_ID INTEGER NOT NULL,
    DDO_JobLocation_ID INTEGER NOT NULL,
    DDO_JobEducation_ID INTEGER NOT NULL,
    DDO_Designation_ID INTEGER NOT NULL,*/

Ext.define('TalentAcquisition.model.jobsource.JobSource', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobsource_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.jobsourcelines.JobSourceLines', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        'ddo_jobsource_name',
        {
            name: 'ddo_jobsourcelines_id',
            type: 'number'
        },
        {
            name: 'ddo_jobsource_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.jobtype.JobType', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'description',
        {
            name: 'ddo_jobtype_id',
            type: 'number'
        }
    ]
});

Ext.define('TalentAcquisition.model.scheduleinterview.ScheduleInterview', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'ddo_scheduleinterview_id',
            type: 'number'
        },
        'interviewtype',
        {
            name: 'interviewdate',
            type: 'date'
        },
        'time',
        {
            name: 'ddo_jobopenings_id',
            type: 'number'
        },
        {
            name: 'ddo_jobapplications_id',
            type: 'number'
        },
        {
            name: 'intervieweremployeeid',
            type: 'number'
        },
        {
            name: 'ddo_designation_id',
            type: 'number'
        },
        'candidatename',
        'isdone',
        'curriculumvitae',
        'ddo_designation_name',
        'ddo_jobopenings_name',
        'intervieweremployeeid_name',
        'isconfirmed'
    ]
});

Ext.define('TalentAcquisition.store.ReportingsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.reportingsstore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/utility/getempbasiclist',
        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});

Ext.define('TalentAcquisition.store.employeereferral.EmployeeReferralStore', {
    extend: 'Ext.data.Store',
    alias: 'store.employeereferralstore',
    requires: [
        'TalentAcquisition.model.employeereferral.EmployeeReferral'
    ],
    storeId: 'employeereferralstore',
    model: 'TalentAcquisition.model.employeereferral.EmployeeReferral',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/employeereferral',
            update: '/employeereferral',
            create: '/employeereferral',
            destroy: '/employeereferral'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.employeereferral.MyReferralsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.myreferralsstore',
    requires: [
        'TalentAcquisition.model.employeereferral.EmployeeReferral'
    ],
    storeId: 'myreferralsstore',
    model: 'TalentAcquisition.model.employeereferral.EmployeeReferral',
    proxy: {
        type: 'ajax',
        api: {
            read: '/employeereferral'
        },
        actionMethods: {
            read: 'GET'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.interviewdetails.Interviewdetails', {
    extend: 'Ext.data.Store',
    alias: 'store.interviewdetailsstore',
    requires: [
        'TalentAcquisition.model.interviewdetails.InterviewDetails'
    ],
    model: 'TalentAcquisition.model.interviewdetails.InterviewDetails'
});
/* proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }*/

Ext.define('TalentAcquisition.store.jobapplication.JobApplicationStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobapplicationstore',
    requires: [
        'TalentAcquisition.model.jobapplication.JobApplication'
    ],
    model: 'TalentAcquisition.model.jobapplication.JobApplication',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobapplications',
            update: '/jobapplications',
            create: '/jobapplications',
            destroy: '/jobapplications'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobapplicationstatusstore',
    requires: [
        'TalentAcquisition.model.jobapplicationstatus.JobApplicationStatus'
    ],
    model: 'TalentAcquisition.model.jobapplicationstatus.JobApplicationStatus',
    storeId: 'jobapplicationstatusstore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobapplicationstatus',
            update: '/jobapplicationstatus',
            create: '/jobapplicationstatus',
            destroy: '/jobapplicationstatus'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobeducation.JobEducationStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobeducationstore',
    requires: [
        'TalentAcquisition.model.jobeducation.JobEducation'
    ],
    model: 'TalentAcquisition.model.jobeducation.JobEducation',
    autoLoad: 'true',
    storeId: 'jobeducationstore',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobeducation',
            update: '/jobeducation',
            create: '/jobeducation',
            destroy: '/jobeducation'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobinterviewratingstore',
    requires: [
        'TalentAcquisition.model.jobinterviewrating.JobInterviewRating'
    ],
    model: 'TalentAcquisition.model.jobinterviewrating.JobInterviewRating',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobinterviewrating',
            update: '/jobinterviewrating',
            create: '/jobinterviewrating',
            destroy: '/jobinterviewrating'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobinterviewstatus.JobInterviewStatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobinterviewstatusstore',
    requires: [
        'TalentAcquisition.model.jobinterviewstatus.JobInterviewStatus'
    ],
    model: 'TalentAcquisition.model.jobinterviewstatus.JobInterviewStatus',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobinterviewstatus',
            update: '/jobinterviewstatus',
            create: '/jobinterviewstatus',
            destroy: '/jobinterviewstatus'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.joblocation.JobLocationStore', {
    extend: 'Ext.data.Store',
    alias: 'store.joblocationstore',
    requires: [
        'TalentAcquisition.model.joblocation.JobLocation'
    ],
    storeId: 'joblocationstores',
    model: 'TalentAcquisition.model.joblocation.JobLocation',
    proxy: {
        type: 'ajax',
        api: {
            read: '/joblocation',
            update: '/joblocation',
            create: '/joblocation',
            destroy: '/joblocation'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobopenings.ApplicationDetailsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.applicationdetailstore',
    storeId: 'applicationdetailstore',
    requires: [
        'TalentAcquisition.model.jobapplication.JobApplication'
    ],
    model: 'TalentAcquisition.model.jobapplication.JobApplication',
    proxy: {
        type: 'ajax',
        api: {},
        //  read: '/jobapplications',
        // update: '/jobapplications',
        //create: '/jobapplications',
        //destroy: '/jobapplications'
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobopenings.JobOpeningsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobopeningsstore',
    requires: [
        'TalentAcquisition.model.jobopenings.JobOpenings'
    ],
    storeId: 'jobopeningsstores',
    model: 'TalentAcquisition.model.jobopenings.JobOpenings',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobopenings',
            update: '/jobopenings',
            create: '/jobopenings',
            destroy: '/jobopenings'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobsource.JobSourceStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobsourcestore',
    requires: [
        'TalentAcquisition.model.jobsource.JobSource'
    ],
    storeId: 'jobsourcestores',
    model: 'TalentAcquisition.model.jobsource.JobSource',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobsource',
            update: '/jobsource',
            create: '/jobsource',
            destroy: '/jobsource'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobsourcelines.JobSourceLinesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobsourcelinesstore',
    requires: [
        'TalentAcquisition.model.jobsourcelines.JobSourceLines'
    ],
    storeId: 'jobsourcelinesstores',
    model: 'TalentAcquisition.model.jobsourcelines.JobSourceLines',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobsourceline',
            update: '/jobsourceline',
            create: '/jobsourceline',
            destroy: '/jobsourceline'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.store.jobsourcelines.Portal', {
    extend: 'Ext.data.ChainedStore',
    requires: [
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'
    ],
    source: 'jobsourcelinesstores',
    alias: 'store.portal',
    storeId: 'portal',
    autoLoad: true,
    filters: [
        function(item) {
            return item.get('ddo_jobsource_name') == "Job Portal" ? true : false;
        }
    ]
});

Ext.define('TalentAcquisition.store.jobsourcelines.Vendor', {
    extend: 'Ext.data.ChainedStore',
    requires: [
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'
    ],
    source: 'jobsourcelinesstores',
    alias: 'store.vendor',
    autoLoad: true,
    storeId: 'vendor',
    filters: [
        function(item) {
            return item.get('ddo_jobsource_name') == "Consultancy" ? true : false;
        }
    ]
});

Ext.define('TalentAcquisition.store.jobtype.JobTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobtypestore',
    requires: [
        'TalentAcquisition.model.jobtype.JobType'
    ],
    storeId: 'jobtypestores',
    model: 'TalentAcquisition.model.jobtype.JobType',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobtype',
            update: '/jobtype',
            create: '/jobtype',
            destroy: '/jobtype'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});


Ext.define('TalentAcquisition.store.scheduledinterview.ScheduledInterviewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.scheduledinterviewstore',
    requires: [
        'TalentAcquisition.model.scheduleinterview.ScheduleInterview'
    ],
    model: 'TalentAcquisition.model.scheduleinterview.ScheduleInterview',
    proxy: {
        type: 'ajax',
        api: {
            read: '/scheduleinterview'
        },
        actionMethods: {
            read: 'GET'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    sorter: {
        property: 'ddo_scheduleinterview_id',
        order: 'DESC'
    }
});

Ext.define('TalentAcquisition.store.scheduleinterview.ScheduleInterviewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.scheduleinterviewstore',
    requires: [
        'TalentAcquisition.model.scheduleinterview.ScheduleInterview'
    ],
    model: 'TalentAcquisition.model.scheduleinterview.ScheduleInterview',
    proxy: {
        type: 'ajax',
        api: {
            update: '/scheduleinterview',
            create: '/scheduleinterview',
            destroy: '/scheduleinterview'
        },
        actionMethods: {
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('TalentAcquisition.ux.container.CollapsibleContainerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.collapsiblecontainerviewmodel',
    data: {
        northRegion: false,
        hideBtn: true,
        buttontext: 'Confirm',
        portal: true,
        consultency: true,
        reffredBy: true,
        joiend: false
    }
});

Ext.define('TalentAcquisition.ux.container.CollapsibleContainer', {
    alias: 'widget.collapsiblecontainer',
    extend: 'Ext.container.Container',
    cls: 'ta-collapsible-cont',
    //cls:'collapsible-container',
    requires: [
        //'TalentAcquisition.ux.form.SearchField',
        'TalentAcquisition.ux.container.CollapsibleContainerViewModel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.layout.container.Border'
    ],
    cls: 'ta-header',
    config: {
        hideFilter: true,
        fbButtonHide: false,
        mainContainerTitle: 'Main Container',
        eastContainerTitle: 'East Container',
        addBtnText: 'Add New',
        grid: '',
        form: '',
        gridStore: '',
        bigForm: false
    },
    reference: 'collapsiblecontainer',
    defaults: {
        collapsible: true,
        split: false
    },
    layout: 'border',
    height: 600,
    requires: [],
    initComponent: function() {
        var me = this,
            addButtonText = me.getAddBtnText(),
            mainContainerTitle = me.getMainContainerTitle(),
            eastContainerTitle = me.getEastContainerTitle(),
            centerGrid = me.getGrid(),
            eastForm = me.getForm(),
            bigForm = me.getBigForm(),
            gridStore = me.getGridStore();
        (me.filterData) ? me.setHideFilter(false) : me.setHideFilter(true);
        (me.fbButtonRequired) ? me.setFbButtonHide(false) : me.setFbButtonHide(true);
        me.viewModel = Ext.create('TalentAcquisition.ux.container.CollapsibleContainerViewModel');
        Ext.apply(me, {
            items: [
                {
                    title: mainContainerTitle,
                    region: 'north',
                    height: 55,
                    bind: {
                        hidden: '{northRegion}'
                    },
                    collapsible: false,
                    split: false,
                    tools: [
                        {
                            hidden: me.hideFilter,
                            xtype: 'combo',
                            cls: 'ta-search-field',
                            fieldLabel: 'Choose column',
                            store: Ext.create('Ext.data.Store', {
                                fields: [
                                    'value',
                                    'name'
                                ],
                                data: me.filterData
                            }),
                            name: 'filterColumn',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        },
                        {
                            xtype: "tbspacer",
                            width: 30,
                            hidden: me.hideFilter
                        },
                        {
                            xtype: 'searchfield',
                            store: gridStore,
                            name: 'filterField',
                            cls: 'ta-search-field',
                            hidden: me.hideFilter,
                            hasSearch: false,
                            // paramName : 'query',
                            enableKeyEvents: true,
                            onSearchClick: function(field) {
                                var me = (field) ? field : this;
                                var value = (me) ? me.getValue() : '';
                                var property = (me) ? me.up().down('combo').getValue() : '';
                                if (value.length > 0 && property.length > 0) {
                                    // Param name is ignored here since we use custom encoding in the proxy. 
                                    // id is used by the Store to replace any previous filter 
                                    me.activeFilter = new Ext.util.Filter({
                                        property: property,
                                        value: value
                                    });
                                    me.store.setRemoteFilter(false);
                                    me.store.getFilters().add(me.activeFilter);
                                    me.getTrigger('clear').show();
                                    me.updateLayout();
                                } else {
                                    me.onClearClick();
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            scale: 'medium',
                            name: 'mainBackBtn',
                            margin: '0 0 0 10',
                            style: {
                                border: 0
                            },
                            bind: {
                                hidden: '{hideBtn}'
                            },
                            iconCls: 'goalsbackbtn-cls',
                            cls: 'back-btn-cls',
                            handler: function() {
                                var collapsecont = this.up('[name=applicationdetailsviewcolps]'),
                                    collapsecontRefEmp = this.up('[name=referredEmployeeCollCon]');
                                var jobopenmain, referredEmployees;
                                if (!Ext.isEmpty(collapsecont)) {
                                    jobopenmain = collapsecont.up('jobopenings-card');
                                    if (!Ext.isEmpty(jobopenmain)) {
                                        collapsecont.getViewModel().set('hideBtn', true);
                                        jobopenmain.setActiveItem(0);
                                    }
                                }
                                if (!Ext.isEmpty(collapsecontRefEmp)) {
                                    referredEmployees = this.up('referredemployeeview');
                                    if (!Ext.isEmpty(referredEmployees)) {
                                        collapsecontRefEmp.getViewModel().set('hideBtn', true);
                                        collapsecontRefEmp.down('[name=eastpanel]').collapse();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            hidden: (me.fbButtonRequired) ? false : true,
                            reference: 'fbButton',
                            name: (me.scheduleFbButton) ? 'scheduleFbButton' : 'fbButton',
                            iconCls: 'rule-plus',
                            focusable: false,
                            floating: true,
                            shadow: false,
                            autoShow: true,
                            tooltip: addButtonText,
                            cls: 'ta-float-btn x-floating',
                            handler: function() {
                                var eastPanel = this.up('collapsiblecontainer').down('[name=eastpanel]');
                                if (!Ext.isEmpty(eastPanel)) {
                                    this.up('collapsiblecontainer').down('form').reset();
                                    eastPanel.toggleCollapse();
                                    eastPanel.down('textfield').focus();
                                }
                            }
                        }
                    ]
                },
                {
                    title: eastContainerTitle,
                    xtype: 'panel',
                    scrollable: true,
                    itemId: 'eastcontainer',
                    region: 'east',
                    name: 'eastpanel',
                    preventHeader: true,
                    hideCollapseTool: true,
                    collapseMode: 'mini',
                    split: false,
                    collapsed: true,
                    margin: '5 0 0 0',
                    width: bigForm ? '100%' : '50%',
                    items: [
                        {
                            xtype: eastForm
                        }
                    ],
                    listeners: {
                        expand: function() {
                            var eastPanel = this.up('collapsiblecontainer').down('[name=eastpanel]'),
                                collapsiblecontainer = this.up("collapsiblecontainer"),
                                me = this;
                            console.log("Main Container going to be expand and Fab setHidden :", !collapsiblecontainer.getFbButtonHide());
                            collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(!collapsiblecontainer.getFbButtonHide());
                            //To hide serch fields
                            if (!collapsiblecontainer.getHideFilter()) {
                                collapsiblecontainer.down('combo[name=filterColumn]').setHidden(true);
                                collapsiblecontainer.down('searchfield[name=filterField]').setHidden(true);
                            }
                        },
                        collapse: function() {
                            var eastPanel = this.up('collapsiblecontainer').down('[name=eastpanel]'),
                                collapsiblecontainer = this.up("collapsiblecontainer");
                            console.log("Main Container going to be collapse and Fab setHidden :", collapsiblecontainer.getFbButtonHide());
                            collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(collapsiblecontainer.getFbButtonHide());
                            //To show search fields
                            if (!collapsiblecontainer.getHideFilter()) {
                                collapsiblecontainer.down('combo[name=filterColumn]').setHidden(false);
                                collapsiblecontainer.down('searchfield[name=filterField]').setHidden(false);
                            }
                        }
                    }
                },
                {
                    hideHeaders: true,
                    collapsible: false,
                    region: 'center',
                    items: [
                        {
                            xtype: centerGrid,
                            store: gridStore
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    },
    listeners: {
        boxready: function(cmp, width, height, eOpts) {
            cmp.down('[reference=fbButton]').setHidden(cmp.getFbButtonHide());
        }
    }
});

Ext.define('TalentAcquisition.ux.plugins.MandatoryFieldPlugin', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.mandatoryfieldplugin',
    init: function(cmp) {
        this.setCmp(cmp);
        var element = cmp;
        if (!element.allowBlank) {
            element.labelSeparator = element.labelSeparator + ' <span style="color: rgb(255, 0, 0); padding-left: 2px;">*</span>';
        }
    }
});

Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplicationForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore',
        'TalentAcquisition.store.jobsource.JobSourceStore',
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore',
        'TalentAcquisition.store.ReportingsStore',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobsourcelines.Portal',
        'TalentAcquisition.store.jobsourcelines.Vendor'
    ],
    alias: 'widget.jobapplicationform',
    defaults: {
        width: '100%'
    },
    padding: 20,
    scrollable: true,
    bbar: {
        cls: 'appwindow-cls',
        layout: {
            type: 'hbox'
        },
        padding: '25 0 21 0',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'eastContainerCollapse'
            },
            {
                xtype: 'button',
                text: 'Save',
                cls: 'app-window-save-btn',
                formBind: true,
                handler: 'eastContainerCollapse',
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    },
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                cls: 'rule-name-cls',
                labelWidth: '25%',
                padding: 10,
                msgTarget: 'side',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>'
            },
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobapplications_id'
                },
                {
                    xtype: 'combobox',
                    columnWidth: 0.5,
                    fieldLabel: 'Job Opening',
                    allowBlank: false,
                    store: 'jobopeningsstores',
                    editable: false,
                    forceSelection: true,
                    displayField: 'name',
                    valueField: 'ddo_jobopenings_id',
                    name: 'ddo_jobopenings_id',
                    bind: {
                        readOnly: '{joiend}'
                    },
                    listeners: {
                        beforequery: function(qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Candidate Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'First Name',
                            name: 'firstname',
                            allowBlank: false,
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Middle Name',
                            xtype: 'textfield',
                            name: 'middlename',
                            beforeLabelTextTpl: '',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Last Name',
                            xtype: 'textfield',
                            name: 'lastname',
                            allowBlank: false,
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: "Father's name",
                            name: 'fathersname',
                            columnWidth: 0.5,
                            beforeLabelTextTpl: '',
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Highest Education',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            store: 'jobeducationstore',
                            displayField: 'name',
                            valueField: 'ddo_jobeducation_id',
                            name: 'ddo_jobeducation_id',
                            allowBlank: false,
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            },
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Year of Passing',
                            name: 'yearofpassing',
                            allowBlank: false,
                            columnWidth: 0.5,
                            maxValue: new Date(),
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Skill Type',
                            editable: false,
                            store: {
                                type: 'jobopeningsstore'
                            },
                            displayField: 'primaryskills',
                            valueField: 'primaryskills',
                            name: 'skilltype',
                            columnWidth: 0.5,
                            allowBlank: false,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Communication Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Mobile Number',
                            name: 'mobilenumber',
                            columnWidth: 0.5,
                            allowBlank: false,
                            minValue: 0,
                            //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            maxLength: 12,
                            minLength: 10,
                            regex: /^[0-9]*$/i,
                            invalidText: "Please enter valid data",
                            enforceMaxLength: 10,
                            //emptyText: 'Enter mobile number ',
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Email',
                            xtype: 'textfield',
                            name: 'email',
                            vtype: 'email',
                            columnWidth: 0.5,
                            allowBlank: false,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Address',
                            xtype: 'textarea',
                            name: 'address',
                            columnWidth: 0.5,
                            allowBlank: false,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Other Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Current City',
                            name: 'currentcity',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Current Employment Status',
                            editable: false,
                            name: 'currentemploymentstatus',
                            store: [
                                "Employed",
                                "Not Employed",
                                "Serving Notice"
                            ],
                            displayField: 'name',
                            valueField: 'name',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Previous Company',
                            xtype: 'textfield',
                            name: 'previouscompany',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            mouseWheelEnabled: false,
                            minValue: 0,
                            maxLength: 4,
                            fieldLabel: "Total Experience (Years)",
                            labelAlign: 'center',
                            name: 'totalexperience',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'ID. Proof',
                            xtype: 'textfield',
                            name: 'idproof',
                            //allowBlank: false,
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ID. Proof Number',
                            name: 'idproofnumber',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Available From',
                            xtype: 'datefield',
                            name: 'availablefrom',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Applied On',
                            xtype: 'datefield',
                            name: 'appliedon',
                            columnWidth: 0.5,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            fieldLabel: 'Notice Period (Days)',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            columnWidth: 0.5,
                            mouseWheelEnabled: false,
                            minValue: 0,
                            maxLength: 3,
                            minLength: 1,
                            regex: /^[0-9]*$/i,
                            invalidText: "Please enter valid data",
                            name: 'noticeperiodindays',
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.5,
                            allowBlank: false,
                            typeAhead: true,
                            typeAheadDelay: 50,
                            // queryMode: 'local',
                            forceSelection: true,
                            name: 'ddo_designation_id',
                            fieldLabel: 'Requested Designation',
                            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                            store: {
                                type: 'designationstore',
                                autoLoad: 'true'
                            },
                            displayField: 'name',
                            valueField: 'ddo_designation_id',
                            bind: {
                                readOnly: '{joiend}'
                            },
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Hiring Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        // width: '50%',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Recruiter',
                            store: {
                                type: 'reportingsstore'
                            },
                            columnWidth: 0.5,
                            allowBlank: false,
                            name: 'recruitedby',
                            displayField: 'empname',
                            valueField: 'empid',
                            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            bind: {
                                readOnly: '{joiend}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.5,
                            fieldLabel: 'Status',
                            store: 'jobapplicationstatusstore',
                            displayField: 'name',
                            allowBlank: false,
                            valueField: 'ddo_jobapplicationstatus_id',
                            name: 'ddo_jobapplicationstatus_id',
                            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                            editable: false,
                            bind: {
                                readOnly: '{joiend}'
                            },
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Hiring Source',
                            store: 'jobsourcestores',
                            name: 'ddo_jobsource_id',
                            displayField: 'name',
                            valueField: 'ddo_jobsource_id',
                            editable: false,
                            bind: {
                                readOnly: '{joiend}'
                            },
                            columnWidth: 0.5,
                            listeners: {
                                change: function(me, newdata, olddata) {
                                    var parentView = this.up('[name=jobapplicationviewcolps]'),
                                        viewmodel;
                                    if (!Ext.isEmpty(parentView)) {
                                        viewmodel = parentView.getViewModel();
                                        if (me.getRawValue() == "Job Portal") {
                                            viewmodel.set('portal', false);
                                            viewmodel.set('consultency', true);
                                            viewmodel.set('reffredBy', true);
                                        } else if (me.getRawValue() == "Consultancy") {
                                            viewmodel.set('portal', true);
                                            viewmodel.set('consultency', false);
                                            viewmodel.set('reffredBy', true);
                                        } else if (me.getRawValue() == "Referred by employee") {
                                            viewmodel.set('portal', true);
                                            viewmodel.set('consultency', true);
                                            viewmodel.set('reffredBy', false);
                                        }
                                        viewmodel.notify();
                                    }
                                },
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'form',
                            //columnWidth:0.5,
                            columnWidth: 0.49,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    anchor: '100%',
                                    xtype: 'filefield',
                                    opType: 'upload',
                                    name: 'feedsImage',
                                    buttonOnly: true,
                                    buttonConfig: {
                                        cls: 'request-access-btn',
                                        width: "100%",
                                        text: 'Browse doc, pdf extension files only'
                                    },
                                    bind: {
                                        readOnly: '{joiend}'
                                    },
                                    listeners: {
                                        change: 'onCVupload'
                                    },
                                    fieldLabel: "Upload CV :"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'hiddenfield',
                    name: 'curriculumvitae'
                },
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Referred By',
                            store: {
                                type: 'reportingsstore'
                            },
                            name: 'referredby',
                            bind: {
                                hidden: '{reffredBy}'
                            },
                            displayField: 'empname',
                            valueField: 'empid',
                            columnWidth: 0.5,
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Consultancy Name',
                            name: 'vendorname',
                            editable: false,
                            store: {
                                type: 'vendor'
                            },
                            bind: {
                                hidden: '{consultency}'
                            },
                            displayField: 'name',
                            columnWidth: 0.5,
                            valueField: 'ddo_jobsourcelines_id',
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Job Portal Name',
                            editable: false,
                            name: 'jobportalname',
                            store: {
                                type: 'portal'
                            },
                            bind: {
                                hidden: '{portal}'
                            },
                            displayField: 'name',
                            columnWidth: 0.5,
                            valueField: 'ddo_jobsourcelines_id',
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Comments',
                            bind: {
                                readOnly: '{joiend}'
                            },
                            columnWidth: 1,
                            name: 'comments'
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplicationGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobapplicationgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Application No.',
            dataIndex: 'ddo_jobapplications_id',
            flex: 0.4,
            hidden: true,
            height: 42
        },
        {
            text: 'Job Opening',
            dataIndex: 'ddo_jobopenings_name',
            flex: 0.4
        },
        {
            text: 'Candidate Name',
            dataIndex: 'candidatename',
            flex: 0.4
        },
        {
            text: 'Status',
            dataIndex: 'ddo_jobapplicationstatus_name',
            flex: 0.3
        },
        {
            text: 'Address',
            dataIndex: 'address',
            hidden: true,
            flex: 0.4
        },
        {
            text: 'Mobile No.',
            dataIndex: 'mobilenumber',
            flex: 0.4
        },
        {
            text: 'Education',
            dataIndex: 'ddo_jobeducation_name',
            flex: 0.4
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 0.5
        },
        {
            xtype: 'widgetcolumn',
            width: 120,
            align: 'center',
            widget: {
                xtype: 'button',
                text: 'Interview',
                tooltip: 'Schedule Interview',
                cls: 'request-access-btn',
                handler: 'onAScheduleInterviewBtnClick'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_jobapplications_id: rec.get('ddo_jobapplications_id')
                        };
                        Ext.Ajax.request({
                            url: '/jobapplications',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobapplicationcontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            colaps = view.down('[name=jobapplicationviewcolps]'),
            model = colaps.getViewModel(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        setTimeout(function() {
            if (record.get('ddo_jobapplicationstatus_name') == "Joined" || record.get('ddo_jobapplicationstatus_name') == "Offer Rejected") {
                model.set('joiend', true);
            } else {
                model.set('joiend', false);
            }
        }, 1000);
        view.down('form').oldValues = record.data;
        view.down('form').oldValues.ddo_jobapplicationstatus_name = record.get('ddo_jobapplicationstatus_name');
        var collapsiblecontainer = this.getView().down('collapsiblecontainer'),
            eastpanel = collapsiblecontainer.down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            colaps = view.down('[name=jobapplicationviewcolps]'),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
        if (!Ext.isEmpty(colaps)) {
            var viewmodel = colaps.getViewModel();
            viewmodel.set('portal', true);
            viewmodel.set('consultency', true);
            viewmodel.set('reffredBy', true);
            viewmodel.set('joiend', false);
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            colps = view.down('[name=jobapplicationviewcolps]'),
            form = view.down('form'),
            status = form.down('[name = ddo_jobapplicationstatus_id]'),
            model = colps.getViewModel(),
            values = form.getValues(),
            grid = view.down('grid'),
            oldValues = form.oldValues,
            names = status.getRawValue();
        form.reset();
        if (model.get('joiend')) {
            Ext.toast('Allready Joined', false, 't');
            return;
        }
        if (Ext.isEmpty(values.ddo_jobapplications_id)) {
            delete values.ddo_jobapplications_id;
        }
        values.mobilenumber = values.mobilenumber + '';
        Ext.Ajax.request({
            url: '/jobapplications',
            method: Ext.isEmpty(values.ddo_jobapplications_id) ? 'POST' : 'PUT',
            params: values,
            success: function(resp, b) {
                grid.getStore().reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
                console.log('chirag names', names);
                console.log(names == "Joined");
                if (names == "Joined") {
                    console.log('coming in side');
                    //  if(oldValues.ddo_jobapplicationstatus_name != "Joined"){
                    Ext.Ajax.request({
                        url: '/ddonominate',
                        method: 'POST',
                        params: {
                            points: 20,
                            karmaId: 1000035,
                            toCbpid: values.recruitedby,
                            comment: 'Employee joined,                                                            ',
                            karmaCategoryId: 1000000,
                            projectEmpIds: values.recruitedby,
                            selfnomi: true
                        },
                        success: function(resp, b) {},
                        failure: function(resp, b) {}
                    });
                    if (!Ext.isEmpty(values.referredby)) {
                        setTimeout(function() {
                            Ext.Ajax.request({
                                url: '/ddonominate',
                                method: 'POST',
                                params: {
                                    points: 30,
                                    karmaId: 1000036,
                                    toCbpid: values.referredby,
                                    comment: 'New Candidate Joined - Referred Employee                                 ',
                                    karmaCategoryId: 1000000,
                                    projectEmpIds: values.referredby,
                                    selfnomi: true
                                },
                                success: function(resp, b) {},
                                failure: function(resp, b) {}
                            });
                        }, 500);
                    }
                }
                // }
                else if (names == "No Show") {
                    // if(oldValues.ddo_jobapplicationstatus_name != "No Show"){
                    Ext.Ajax.request({
                        url: '/ddonominate',
                        method: 'POST',
                        params: {
                            points: -10,
                            karmaId: 1000037,
                            toCbpid: values.recruitedby,
                            comment: 'If the candidate did not join after accepting the offer          ',
                            karmaCategoryId: 1000001,
                            projectEmpIds: values.recruitedby,
                            selfnomi: true
                        },
                        success: function(resp, b) {},
                        failure: function(resp, b) {}
                    });
                }
            },
            // }
            failure: function(resp, b) {
                Ext.getBody().unmask();
                if (!Ext.isEmpty(resp.responseText)) {
                    var data = Ext.decode(resp.responseText);
                    Ext.toast(data.message, false, 't');
                } else {
                    Ext.toast('Failed To Perform Opertion', false, 't');
                }
            }
        });
    },
    onAScheduleInterviewBtnClick: function(btn) {
        var record = btn.getWidgetRecord();
        var jobApplicationMain = this.getView().up('jobapplicationmainview');
        var scheduleinterviewview = jobApplicationMain.down('scheduleinterviewview');
        var collapsiblecontainer = scheduleinterviewview.down('collapsiblecontainer');
        var mainmodel = collapsiblecontainer.getViewModel();
        var model = scheduleinterviewview.getViewModel();
        var grid = jobApplicationMain.down('scheduleinterviewgrid');
        mainmodel.set('northRegion', true);
        grid.getStore().removeAll();
        if (model) {
            model.set('isdone', 'N');
            model.set('ddo_jobapplications_id', record.get('ddo_jobapplications_id'));
            model.set('ddo_designation_id', record.get('ddo_designation_id'));
            model.set('ddo_jobopenings_id', record.get('ddo_jobopenings_id'));
            model.set('curriculumvitae', record.get('curriculumvitae'));
            model.set('recruitedby', record.get('recruitedby'));
        }
        Ext.Ajax.request({
            url: '/scheduleinterview/' + record.get('ddo_jobapplications_id'),
            // url: '/jobapplication/'+ 1,
            method: 'GET',
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().loadData(data.data);
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
        jobApplicationMain.setActiveItem(scheduleinterviewview);
        //scheduleinterviewview.down('button').setHidden(false);
        scheduleinterviewview.customRecord = record;
        collapsiblecontainer.down('[name=scheduleFbButton]').setHidden(false);
    },
    /**
     * This is the handler for the filefield change event.
     * for upload the icons.
     * @param filefield The filefield reference.
     * @param value :  string,The file value returned by the underlying file input field.
     * @param eOpts : Object.
     *
     */
    onCVupload: function(filefield, value, eOpts) {
        var me = this,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = value,
            reader = new FileReader(),
            format = file.type,
            form = filefield.up('form'),
            curriculumvitaeField = form.up('form').down('hiddenfield[name=curriculumvitae]');
        reader.onload = function() {
            if (format == "application/msword" || format == "application/pdf" || format == "application/doc" || format == "application/docx" || format == "application/txt" || format == "application/wps" || format == "application/odt" || format == "application/wpd" || format == "application/rtf") {
                /**
                 * Docx format preventing due to stored file format issue (Storing like a zip file on server)
                 * format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                 */
                form.submit({
                    url: '/feed/feedsPostedPics',
                    waitMsg: 'Uploading your cv...',
                    success: function(res, msg) {
                        var text = Ext.JSON.decode(msg.response.responseText),
                            pathImg = text.data;
                        curriculumvitaeField.setValue(pathImg);
                        Ext.toast({
                            html: 'File uploaded successfully',
                            width: 150,
                            align: 't'
                        });
                    },
                    // iconsViewStore.add({
                    //     name: '',
                    //     imagepath: pathImg,
                    //     ddo_karmarating_id: Ext.id()
                    // });
                    // filefield.setDisabled(true);
                    failure: function(res) {
                        Ext.toast({
                            html: 'File not loaded',
                            width: 150,
                            align: 't'
                        });
                    }
                });
            } else {
                Ext.toast({
                    html: 'Invalid Format',
                    width: 150,
                    align: 't'
                });
            }
        };
        reader.readAsDataURL(file);
    }
});

Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplicationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobapplicationviewmodel',
    data: {
        portal: true,
        consultency: true,
        reffredBy: true,
        joiend: false
    }
});

Ext.define('TalentAcquisition.view.jobapplication.jobapplications.JobApplication', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobapplicationview',
    requires: [
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationGrid',
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationController',
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplicationViewModel',
        'TalentAcquisition.store.jobapplication.JobApplicationStore'
    ],
    controller: 'jobapplicationcontroller',
    viewModel: {
        type: 'jobapplicationviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Job Applications',
            grid: 'jobapplicationgrid',
            name: 'jobapplicationviewcolps',
            gridStore: Ext.create('TalentAcquisition.store.jobapplication.JobApplicationStore'),
            form: 'jobapplicationform',
            bigForm: true,
            filterData: [
                {
                    name: "Job openings",
                    value: "ddo_jobopenings_name"
                },
                {
                    name: "Candidate Name",
                    value: "candidatename"
                },
                {
                    name: "Email",
                    value: "email"
                },
                {
                    name: "Mobile Number",
                    value: "mobilenumber"
                }
            ],
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('grid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.ReportingsStore'
    ],
    alias: 'widget.scheduleinterviewform',
    defaults: {
        width: '100%'
    },
    cls: 'ta-header',
    scrollable: true,
    bigForm: true,
    //padding: 20,
    bbar: {
        layout: {
            type: 'hbox'
        },
        cls: 'appwindow-cls',
        padding: '25 0 21 0',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'eastContainerCollapse',
                listeners: {
                    click: function() {
                        this.up('form').getForm().reset();
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                cls: 'app-window-save-btn',
                formBind: true,
                handler: 'eastContainerCollapse',
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    },
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                cls: 'rule-name-cls',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                width: '50%',
                //padding: 10,
                msgTarget: 'side'
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_scheduleinterview_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobapplications_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_designation_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'isdone'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Job Opening',
                    store: 'jobopeningsstores',
                    displayField: 'name',
                    readOnly: true,
                    valueField: 'ddo_jobopenings_id',
                    name: 'ddo_jobopenings_id',
                    hideTrigger: true,
                    bind: {
                        value: '{ddo_jobopenings_id}'
                    },
                    listeners: {
                        change: function(me, newvalue, oldvalue) {
                            if (Ext.isEmpty(me.getValue())) {
                                me.setValue(oldvalue);
                            }
                        }
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Interview Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        cls: 'ta-search-field',
                        width: '50%',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            //editable :false,
                            store: {
                                type: 'reportingsstore'
                            },
                            displayField: 'empname',
                            valueField: 'empid',
                            fieldLabel: 'Interviewer Name',
                            allowBlank: false,
                            queryMode: 'local',
                            forceSelection: true,
                            name: 'intervieweremployeeid',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Interview Type',
                            //editable :false,
                            store: new Ext.data.SimpleStore({
                                fields: [
                                    'interviewtype'
                                ],
                                data: [
                                    [
                                        'Telephonic'
                                    ],
                                    [
                                        'Skype'
                                    ],
                                    [
                                        'Face to face'
                                    ]
                                ]
                            }),
                            displayField: 'interviewtype',
                            valueField: 'interviewtype',
                            allowBlank: false,
                            name: 'interviewtype',
                            editable: false
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        width: '50%',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            fieldLabel: 'Date',
                            xtype: 'datefield',
                            name: 'interviewdate',
                            editable: false,
                            allowBlank: false,
                            minValue: new Date()
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Time',
                            editable: false,
                            store: new Ext.data.SimpleStore({
                                fields: [
                                    'time'
                                ],
                                data: [
                                    [
                                        '09:00 am'
                                    ],
                                    [
                                        '09:30 am'
                                    ],
                                    [
                                        '10:00 am'
                                    ],
                                    [
                                        '10:30 am'
                                    ],
                                    [
                                        '11:00 am'
                                    ],
                                    [
                                        '11:30 am'
                                    ],
                                    [
                                        '12:00 am'
                                    ],
                                    [
                                        '12:30 pm'
                                    ],
                                    [
                                        '01:00 pm'
                                    ],
                                    [
                                        '01:30 pm'
                                    ],
                                    [
                                        '02:00 pm'
                                    ],
                                    [
                                        '02:30 pm'
                                    ],
                                    [
                                        '03:00 pm'
                                    ],
                                    [
                                        '03:30 pm'
                                    ],
                                    [
                                        '04:00 pm'
                                    ],
                                    [
                                        '04:30 pm'
                                    ],
                                    [
                                        '05:00 pm'
                                    ],
                                    [
                                        '05:30 pm'
                                    ],
                                    [
                                        '06:00 pm'
                                    ],
                                    [
                                        '06:30 pm'
                                    ],
                                    [
                                        '07:00 pm'
                                    ],
                                    [
                                        '07:30 pm'
                                    ],
                                    [
                                        '08:00 pm'
                                    ],
                                    [
                                        '08:30 pm'
                                    ],
                                    [
                                        '09:00 pm'
                                    ],
                                    [
                                        '09:30 pm'
                                    ],
                                    [
                                        '010:00 pm'
                                    ],
                                    [
                                        '10:30 pm'
                                    ],
                                    [
                                        '11:00 pm'
                                    ],
                                    [
                                        '11:30 pm'
                                    ],
                                    [
                                        '12:00 am'
                                    ],
                                    [
                                        '12:30 am'
                                    ]
                                ]
                            }),
                            displayField: 'time',
                            valueField: 'time',
                            name: 'time',
                            allowBlank: false
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.scheduleinterviewgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Interviewer Name',
            dataIndex: 'intervieweremployeeid_name',
            flex: 0.4
        },
        {
            text: 'Interview Type',
            dataIndex: 'interviewtype',
            flex: 0.4
        },
        {
            text: 'Date',
            dataIndex: 'interviewdate',
            flex: 0.4,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        },
        {
            text: 'Time',
            dataIndex: 'time',
            flex: 0.4
        },
        {
            text: 'Job Opening',
            dataIndex: 'ddo_jobopenings_name',
            flex: 0.4
        },
        {
            text: 'Designation',
            dataIndex: 'ddo_designation_name',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_scheduleinterview_id: rec.get('ddo_scheduleinterview_id')
                        };
                        Ext.Ajax.request({
                            url: '/scheduleinterview',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scheduleinterviewcontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            model = view.getViewModel(),
            form = view.down('form').getForm();
        view.down('[iconCls=rule-plus]').setHidden(true);
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    onFeedbackSubmitClick: function(btn, e, eOpts) {
        var feedbackWindow = Ext.ComponentQuery.query('jobinterviewfeedback')[0] || Ext.create('TalentAcquisition.view.jobapplication.scheduleinterview.JobInterviewFeedback');
        feedbackWindow.show();
    },
    eastContainerCollapse: function() {
        var view = this.getView();
        // view.setActiveItem(0);
        if (view.down('scheduleinterviewform') && view.down('scheduleinterviewform').isNewForm) {
            view.down('scheduleinterviewform').isNewForm = false;
            view.setActiveItem(0);
        } else {
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
            view.down('[iconCls=rule-plus]').setHidden(false);
            view.down('form').reset();
            if (!Ext.isEmpty(eastpanel)) {
                eastpanel.toggleCollapse();
            }
        }
    },
    onInterviewDetailsClick: function(btn) {
        var view = this.getView(),
            main = view.up('jobapplicationmainview'),
            jobapplicationgrid = main.down('interviewdetailsgrid'),
            form = main.down('interviewdetailsform'),
            interviewdetailsview = main.down('interviewdetailsview');
        jobapplicationgrid.getStore().removeAll();
        interviewdetailsview.getViewModel().set('customReadOnly', false);
        form.getForm().setValues(view.customRecord.getData());
        interviewdetailsview.getViewModel().set('customReadOnly', true);
        main.setActiveItem(interviewdetailsview);
        interviewdetailsview.down('button').setHidden(false);
        Ext.Ajax.request({
            url: '/jobinterviewdetails/' + view.customRecord.get('ddo_jobapplications_id'),
            method: 'GET',
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                jobapplicationgrid.getStore().loadData(data.data);
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast('Unable to save data', false, 't');
                Ext.toast(data.message, false, 't');
            }
        });
    },
    onFabBtnClick: function(btn) {
        var view = this.getView();
        view.setActiveItem(1);
        view.down('scheduleinterviewform').isNewForm = true;
    },
    onBackButtonClick: function(btn) {
        var view = this.getView(),
            main = view.up('jobapplicationmainview'),
            jobapplication = main.down('jobapplicationview'),
            mainView = jobapplication.down('collapsiblecontainer'),
            mainmodel = mainView.getViewModel();
        mainmodel.set('northRegion', false);
        main.setActiveItem(jobapplication);
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            model = view.getViewModel(),
            form = view.down('[name = scheduleinterview]'),
            values = form.getValues(),
            grid = view.down('grid'),
            recruitedby = model.get('recruitedby');
        form.reset();
        if (Ext.isEmpty(values.ddo_scheduleinterview_id)) {
            delete values.ddo_scheduleinterview_id;
            values.ddo_jobopenings_id = model.get('ddo_jobopenings_id');
            values.ddo_jobapplications_id = model.get('ddo_jobapplications_id');
            values.ddo_designation_id = model.get('ddo_designation_id');
            values.isdone = model.get('isdone');
        }
        Ext.Ajax.request({
            url: '/scheduleinterview',
            method: Ext.isEmpty(values.ddo_scheduleinterview_id) ? 'POST' : 'PUT',
            params: values,
            success: function(resp, b) {
                grid.getStore().removeAll();
                Ext.Ajax.request({
                    url: '/scheduleinterview/' + model.get('ddo_jobapplications_id'),
                    method: 'GET',
                    success: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        grid.getStore().loadData(data.data);
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                        if (!Ext.isEmpty(recruitedby) && Ext.isEmpty(values.ddo_scheduleinterview_id)) {
                            Ext.Ajax.request({
                                url: '/ddonominate',
                                method: 'POST',
                                params: {
                                    points: 1,
                                    karmaId: 1000038,
                                    toCbpid: recruitedby,
                                    comment: 'Interview Scheduled,                                                            ',
                                    karmaCategoryId: 1000000,
                                    projectEmpIds: recruitedby,
                                    selfnomi: true
                                },
                                success: function(resp, b) {},
                                failure: function(resp, b) {}
                            });
                        }
                    },
                    failure: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    }
                });
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });
    }
});

Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.scheduleinterviewviewmodel',
    data: {
        ddo_jobapplications_id: null,
        ddo_designation_id: null,
        isdone: null,
        ddo_jobopenings_id: null,
        curriculumvitae: null,
        buttontext: 'Confirm',
        recruitedby: null
    }
});

Ext.define('TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterview', {
    extend: 'Ext.container.Container',
    alias: 'widget.scheduleinterviewview',
    requires: [
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewGrid',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewController',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterviewViewModel',
        'TalentAcquisition.store.scheduleinterview.ScheduleInterviewStore'
    ],
    controller: 'scheduleinterviewcontroller',
    viewModel: {
        type: 'scheduleinterviewviewmodel'
    },
    mainContainerTitle: 'Schedule Interview',
    layout: 'card',
    activeItem: 0,
    items: [
        {
            xtype: 'panel',
            cls: 'ta-header',
            title: 'Schedule Interview',
            //bodyCls:'scheduleinterviewview-grid-cls',
            tools: [
                {
                    xtype: 'button',
                    iconCls: 'goalsbackbtn-cls',
                    scale: 'medium',
                    cls: 'back-btn-cls',
                    style: {
                        border: 0
                    },
                    listeners: {
                        click: 'onBackButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    margin: '0 0 0 10',
                    style: {
                        border: 0
                    },
                    scale: 'medium',
                    text: 'Interview Details',
                    cls: 'back-btn-cls',
                    listeners: {
                        click: 'onInterviewDetailsClick'
                    }
                }
            ],
            items: [
                {
                    xtype: 'collapsiblecontainer',
                    mainContainerTitle: 'Schedule Interview',
                    grid: 'scheduleinterviewgrid',
                    gridStore: Ext.create('TalentAcquisition.store.scheduleinterview.ScheduleInterviewStore'),
                    form: 'scheduleinterviewform',
                    bigForm: true,
                    fbButtonRequired: true,
                    scheduleFbButton: true
                }
            ],
            lbar: {
                width: 30,
                height: '100%',
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'rule-plus',
                        focusable: false,
                        floating: true,
                        shadow: false,
                        autoShow: true,
                        tooltip: 'Add New',
                        cls: 'ta-float-btn x-floating',
                        handler: 'onFabBtnClick'
                    }
                ]
            }
        },
        {
            xtype: 'panel',
            //bodyCls:'scheduleinterviewview-grid-cls',
            title: 'Schedule Interview',
            tools: [
                {
                    xtype: 'button',
                    iconCls: 'goalsbackbtn-cls',
                    scale: 'medium',
                    cls: 'back-btn-cls',
                    style: {
                        border: 0
                    },
                    listeners: {
                        click: 'onBackButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    margin: '0 0 0 10',
                    style: {
                        border: 0
                    },
                    scale: 'medium',
                    text: 'Interview Details',
                    cls: 'back-btn-cls',
                    listeners: {
                        click: 'onInterviewDetailsClick'
                    }
                }
            ],
            xtype: "scheduleinterviewform",
            name: 'scheduleinterview'
        }
    ]
});

Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore',
        'TalentAcquisition.store.jobsource.JobSourceStore'
    ],
    //'DDO.store.resources.Resources'
    alias: 'widget.interviewdetailsform',
    bigForm: true,
    defaults: {
        width: '100%'
    },
    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Candidate Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        labelSeparator: '',
                        width: '50%',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Candidate Name',
                            name: 'firstname',
                            bind: {
                                readOnly: '{customReadOnly}'
                            }
                        },
                        {
                            fieldLabel: 'Application No',
                            xtype: 'numberfield',
                            name: 'ddo_jobapplications_id',
                            hideTrigger: true,
                            bind: {
                                readOnly: '{customReadOnly}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        labelSeparator: '',
                        width: '50%',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Phone Number',
                            xtype: 'textfield',
                            name: 'mobilenumber',
                            bind: {
                                readOnly: '{customReadOnly}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: "Skill Type",
                            name: 'skilltype',
                            bind: {
                                readOnly: '{customReadOnly}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        labelSeparator: '',
                        width: '50%',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            name: 'email',
                            bind: {
                                readOnly: '{customReadOnly}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Status',
                            name: 'ddo_jobapplicationstatus_name',
                            bind: {
                                readOnly: '{customReadOnly}'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.interviewdetailsgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Interviewer',
            dataIndex: 'interviewername',
            flex: 0.4,
            height: 42
        },
        {
            text: 'Date',
            dataIndex: 'interviewdate',
            flex: 0.4,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        },
        {
            text: 'Interview Sequence Level',
            dataIndex: 'interviewtype',
            flex: 0.4
        },
        {
            text: 'Rating',
            dataIndex: 'rating',
            flex: 0.4
        },
        {
            text: 'Feedback',
            dataIndex: 'feedback',
            flex: 0.4
        }
    ]
});

Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interviewdetailscontroller',
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        Ext.first('#eastcontainer').toggleCollapse(false);
    },
    onInterviewBackButtonClick: function(btn) {
        var view = this.getView(),
            main = view.up('jobapplicationmainview'),
            scheduleinterviewview = main.down('scheduleinterviewview');
        main.setActiveItem(scheduleinterviewview);
        view.down('button').setHidden(true);
        scheduleinterviewview.down('button').setHidden(false);
    }
});

Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.interviewdetailsviewmodel',
    data: {
        customReadOnly: true
    }
});

Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.interviewdetailsview',
    cls: 'ta-header',
    requires: [
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsGrid',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsController',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsViewModel',
        'TalentAcquisition.store.interviewdetails.Interviewdetails'
    ],
    controller: 'interviewdetailscontroller',
    viewModel: {
        type: 'interviewdetailsviewmodel'
    },
    title: 'Interview Details',
    layout: 'vbox',
    tools: [
        {
            xtype: 'button',
            scale: 'medium',
            iconCls: 'goalsbackbtn-cls',
            cls: 'back-btn-cls',
            style: {
                border: 0
            },
            listeners: {
                click: 'onInterviewBackButtonClick'
            }
        }
    ],
    items: [
        {
            xtype: 'interviewdetailsform',
            width: '100%'
        },
        {
            xtype: 'interviewdetailsgrid',
            flex: 1,
            store: Ext.create('TalentAcquisition.store.interviewdetails.Interviewdetails')
        }
    ]
});

Ext.define('TalentAcquisition.view.jobapplication.JobApplication', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobapplicationmainview',
    requires: [
        'TalentAcquisition.view.jobapplication.jobapplications.JobApplication',
        'TalentAcquisition.view.jobapplication.scheduleinterview.ScheduleInterview',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetails'
    ],
    cls: 'goalstab-cls',
    layout: 'card',
    items: [
        {
            title: 'Application',
            xtype: 'jobapplicationview'
        },
        {
            title: 'Schedule Interview',
            xtype: 'scheduleinterviewview'
        },
        {
            title: 'Interview Details',
            xtype: 'interviewdetailsview'
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('[name=filterColumn]').reset();
        }
    }
});

Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.JobInterviewFeedback', {
    extend: 'Ext.window.Window',
    modal: true,
    resizable: false,
    cls: 'rule-window-cls',
    closable: false,
    closeAction: 'hide',
    requires: [
        'TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore'
    ],
    //'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewController'
    alias: 'widget.jobinterviewfeedback',
    title: 'Job Interview Feedback',
    controller: 'scheduledinterviewcontroller',
    listeners: {
        show: function(win, opts) {
            win.center();
        }
    },
    //cls:'department-winform-cls',
    width: 700,
    height: 350,
    items: [
        {
            xtype: 'form',
            defaults: {
                padding: '30 0 0 30'
            },
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '15 0 21 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'karmaform-cancel-btn',
                        listeners: {
                            click: 'onFormCancelClick'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'karmaform-save-btn',
                        formBind: true,
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobapplications_id'
                },
                {
                    xtype: 'combobox',
                    allowBlank: false,
                    name: 'ddo_jobinterviewrating_id',
                    fieldLabel: 'Rating',
                    cls: 'ta-search-field',
                    editable: false,
                    store: {
                        type: 'jobinterviewratingstore'
                    },
                    displayField: 'name',
                    valueField: 'ddo_jobinterviewrating_id'
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Feedback',
                    cls: 'ta-search-field',
                    width: '90%',
                    allowBlank: false
                }
            ]
        }
    ]
});
//emptyText: 'Feedback',

Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.ReportingsStore'
    ],
    alias: 'widget.scheduledinterviewform',
    //height:1000,
    defaults: {
        width: '100%'
    },
    //scrollable: true,
    bbar: {
        layout: {
            type: 'hbox'
        },
        padding: '25 0 21 0',
        cls: 'appwindow-cls',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                listeners: {
                    click: 'eastContainerCollapse'
                }
            },
            {
                xtype: 'button',
                bind: {
                    text: '{buttontext}'
                },
                cls: 'app-window-save-btn',
                handler: "onFeedbackSubmitClick"
            }
        ]
    },
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                cls: 'rule-name-cls',
                width: '50%',
                padding: 10
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_scheduleinterview_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobapplications_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_designation_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'isdone'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'isconfirmed'
                },
                {
                    xtype: 'hiddenfield',
                    reference: 'cvpath',
                    name: 'curriculumvitae'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'intervieweremployeeid'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Job Opening',
                    store: 'jobopeningsstores',
                    readOnly: true,
                    displayField: 'name',
                    valueField: 'ddo_jobopenings_id',
                    name: 'ddo_jobopenings_id'
                },
                {
                    xtype: 'button',
                    text: 'Download CV',
                    //iconCls: 'ta-download-icon',
                    width: 150,
                    rigth: 0,
                    cls: 'request-access-btn view-cv-btn-cls',
                    listeners: {
                        click: 'onViewCVBtnClick'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Interview Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        width: '50%',
                        padding: 10
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            editable: false,
                            fieldLabel: 'Interviewee Name',
                            name: 'intervieweename',
                            reference: 'intervieweename'
                        },
                        /*{
                    xtype: 'combobox',
                    readOnly:true,
                    store:{
                        type:'reportingsstore'
                    },
                    name:'intervieweename',
                    fieldLabel: 'Interviewee Name',
                    displayField:'empname',
                    valueField: 'empid',
                }*/
                        ,
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Interview Type',
                            readOnly: true,
                            store: new Ext.data.SimpleStore({
                                fields: [
                                    'interviewtype'
                                ],
                                data: [
                                    [
                                        'Telephonic'
                                    ],
                                    [
                                        'Skype'
                                    ],
                                    [
                                        'Face to face'
                                    ]
                                ]
                            }),
                            displayField: 'interviewtype',
                            valueField: 'interviewtype',
                            name: 'interviewtype'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        width: '50%',
                        padding: 10
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            fieldLabel: 'Date',
                            xtype: 'datefield',
                            readOnly: true,
                            name: 'interviewdate'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Time',
                            readOnly: true,
                            store: new Ext.data.SimpleStore({
                                fields: [
                                    'time'
                                ],
                                data: [
                                    [
                                        '09:00 am'
                                    ],
                                    [
                                        '09:30 am'
                                    ],
                                    [
                                        '10:00 am'
                                    ],
                                    [
                                        '10:30 am'
                                    ],
                                    [
                                        '11:00 am'
                                    ],
                                    [
                                        '11:30 am'
                                    ],
                                    [
                                        '12:00 am'
                                    ],
                                    [
                                        '12:30 pm'
                                    ],
                                    [
                                        '01:00 pm'
                                    ],
                                    [
                                        '01:30 pm'
                                    ],
                                    [
                                        '02:00 pm'
                                    ],
                                    [
                                        '02:30 pm'
                                    ],
                                    [
                                        '03:00 pm'
                                    ],
                                    [
                                        '03:30 pm'
                                    ],
                                    [
                                        '04:00 pm'
                                    ],
                                    [
                                        '04:30 pm'
                                    ],
                                    [
                                        '05:00 pm'
                                    ],
                                    [
                                        '05:30 pm'
                                    ],
                                    [
                                        '06:00 pm'
                                    ],
                                    [
                                        '06:30 pm'
                                    ],
                                    [
                                        '07:00 pm'
                                    ],
                                    [
                                        '07:30 pm'
                                    ],
                                    [
                                        '08:00 pm'
                                    ],
                                    [
                                        '08:30 pm'
                                    ],
                                    [
                                        '09:00 pm'
                                    ]
                                ]
                            }),
                            displayField: 'time',
                            valueField: 'time',
                            name: 'time'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        // labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        width: '50%',
                        padding: 10
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Profile',
                            readOnly: true,
                            name: 'ddo_jobopenings_name'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Designation',
                            readOnly: true,
                            name: 'ddo_designation_name'
                        }
                    ]
                }
            ]
        }
    ]
});
// },{
//     xtype: 'container',
//     defaults: {
//         labelSeparator: '',
//         width: '50%',
//         padding: 10
//     },
//     layout: {
//         type: 'hbox',
//         pack: 'start',
//         align: 'stretch',
//         float:'left'
//     },
//     items:[{
//         xtype:'button',
//         text:'View CV',
//         width: 150,
//         cls: 'viewcv-btn-cls',
//         listeners:{
//             click:'onViewCVBtnClick'
//         }
//     }]
// },

Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.scheduledinterviewgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Candidate Name',
            dataIndex: 'intervieweename',
            flex: 0.4
        },
        {
            text: 'Interview Type',
            dataIndex: 'interviewtype',
            flex: 0.4
        },
        {
            text: 'Date',
            dataIndex: 'interviewdate',
            flex: 0.4,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        },
        {
            text: 'Time',
            dataIndex: 'time',
            flex: 0.4
        },
        {
            text: 'Job Opening',
            dataIndex: 'ddo_jobopenings_name',
            flex: 0.4
        },
        {
            text: 'Designation',
            dataIndex: 'ddo_designation_name',
            flex: 0.4
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scheduledinterviewcontroller',
    requires: [
        'TalentAcquisition.view.jobapplication.scheduledinterview.JobInterviewFeedback',
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            model = view.down('[name=scheduledinterviewviewcols]').getViewModel(),
            collapsiblecontainer = view.down('collapsiblecontainer'),
            eastpanel = collapsiblecontainer.down('[name=eastpanel]'),
            form = view.down('form').getForm();
        form.setValues(record.data);
        if (record.get('isconfirmed') == 'Y') {
            model.set('buttontext', 'Feedback');
        } else {
            model.set('buttontext', 'Confirm');
        }
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
        collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(true);
    },
    onWindowOutsideTap: function(event, target) {
        var view = this.getView();
    },
    //Utility.onSetUpWinOutterTap(event, target, view);
    onFeedbackSubmitClick: function(btn, e, eOpts) {
        var values = this.getView().down('form').getValues();
        if (btn.getText() == "Confirm") {
            values.isconfirmed = 'Y';
            delete values.ddo_designation_name;
            delete values.ddo_jobopenings_name;
            delete values.curriculumvitae;
            delete values.intervieweename;
            Ext.Ajax.request({
                url: '/scheduleinterview',
                method: 'PUT',
                params: values,
                success: function(resp, b) {},
                failure: function(resp, b) {}
            });
            btn.setText("Feedback");
        } else {
            if (values.isdone == 'Y') {
                Ext.Msg.alert("Alert", 'You have allready given feedback');
                return;
            }
            var aapstore = Ext.ComponentQuery.query('jobapplicationgrid')[0] ? Ext.ComponentQuery.query('jobapplicationgrid')[0].getStore() : '';
            var apprec;
            var feedbackWindow = Ext.ComponentQuery.query('jobinterviewfeedback')[0] || Ext.create('TalentAcquisition.view.jobapplication.scheduledinterview.JobInterviewFeedback', {
                    customview: this.getView()
                });
            if (!Ext.isEmpty(aapstore)) {
                apprec = aapstore.findRecord('ddo_jobapplications_id', parseInt(values.ddo_jobapplications_id));
                if (!Ext.isEmpty(apprec)) {
                    feedbackWindow.apprec = apprec;
                }
            }
            feedbackWindow.customData = values;
            feedbackWindow.show();
        }
    },
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            me = this,
            custom = view.customview,
            button = custom.down('scheduledinterviewform').down('[text=Cancel]'),
            record = view.customData,
            apprec = view.apprec,
            grid = custom.down('grid');
        record.ddo_jobinterviewrating_id = view.down('combobox').getValue();
        record.feedback = view.down('textarea').getValue();
        button.fireEvent('click', button);
        var params = {
                feedback: record.feedback,
                ddo_jobinterviewrating_id: record.ddo_jobinterviewrating_id,
                ddo_jobopenings_id: record.ddo_jobopenings_id,
                ddo_scheduleinterview_id: record.ddo_scheduleinterview_id,
                ddo_jobapplications_id: record.ddo_jobapplications_id
            };
        Ext.Ajax.request({
            url: '/jobinterviewfeedback',
            method: 'POST',
            params: params,
            success: function(resp, b) {
                view.hide();
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
                grid.getStore().load();
                Ext.Ajax.request({
                    url: '/ddonominate',
                    method: 'POST',
                    params: {
                        points: 5,
                        karmaId: 1000040,
                        toCbpid: record.intervieweremployeeid,
                        comment: 'Feed back is Done                                                          ',
                        karmaCategoryId: 1000000,
                        projectEmpIds: record.intervieweremployeeid,
                        selfnomi: true
                    },
                    success: function(resp, b) {},
                    failure: function(resp, b) {}
                });
                if (!Ext.isEmpty(apprec)) {
                    setTimeout(function() {
                        Ext.Ajax.request({
                            url: '/ddonominate',
                            method: 'POST',
                            params: {
                                points: 2,
                                karmaId: 1000040,
                                toCbpid: apprec.get('recruitedby'),
                                comment: 'Feed back is Done                                                          ',
                                karmaCategoryId: 1000000,
                                projectEmpIds: apprec.get('recruitedby'),
                                selfnomi: true
                            },
                            success: function(resp, b) {},
                            failure: function(resp, b) {}
                        });
                    }, 100);
                }
            },
            failure: function(resp, b) {}
        });
    },
    onFormCancelClick: function() {
        var feedbackForm = this.getView();
        feedbackForm.down('form').getForm().reset();
        feedbackForm.hide();
    },
    onViewCVBtnClick: function(btn) {
        var me = this,
            view = me.getView(),
            cvpath = view.lookupReference('cvpath').getValue(),
            interviewername = view.lookupReference('intervieweename').getValue(),
            downloadablePath = window.location.origin + '/' + cvpath;
        if (Ext.isEmpty(cvpath)) {
            Ext.toast('CV does not exits', false, 't');
        } else {
            window.open(downloadablePath);
        }
    }
});
// var pom = document.createElement('a');
//     pom.setAttribute('href', downloadablePath);
//     pom.setAttribute('download');
//    pom.click();
//    var downloadFrame = document.createElement("iframe"); 
//         downloadFrame.setAttribute('src',downloadablePath);
//         downloadFrame.setAttribute('class',"screenReaderText"); 
//         document.body.appendChild(downloadFrame); 
// window.open(downloadablePath, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
// window.focus();
// document.body.removeChild(downloadFrame);

Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.scheduledinterviewviewmodel',
    data: {
        buttontext: 'Confirm'
    }
});

Ext.define('TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterview', {
    extend: 'Ext.container.Container',
    alias: 'widget.scheduledinterviewview',
    requires: [
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewGrid',
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewController',
        'TalentAcquisition.view.jobapplication.scheduledinterview.ScheduledInterviewViewModel',
        'TalentAcquisition.store.scheduledinterview.ScheduledInterviewStore',
        'Ext.window.MessageBox'
    ],
    controller: 'scheduledinterviewcontroller',
    viewModel: {
        type: 'scheduledinterviewviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Interview Request',
            name: 'scheduledinterviewviewcols',
            grid: 'scheduledinterviewgrid',
            hideButton: true,
            bigForm: true,
            gridStore: Ext.create('TalentAcquisition.store.scheduledinterview.ScheduledInterviewStore'),
            form: 'scheduledinterviewform',
            fbButtonRequired: false
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            //this.down('collapsiblecontainer').down('button[iconCls=rule-plus]').disable();
            var store = this.down('grid').getStore();
            var loggedInEmployeeId = Ext.getStore('login').data.items[0].getData().ddo_employee_id;
            store.load();
            store.setRemoteFilter(false);
            store.filter({
                property: 'intervieweremployeeid',
                value: loggedInEmployeeId
            });
            store.sort({
                property: 'ddo_scheduleinterview_id',
                direction: 'DESC'
            });
            setTimeout(function() {
                if (store.getCount() == 0) {
                    Ext.Msg.alert("Alert", ' No Interview is scheduled for you ');
                }
            }, 1500);
        }
    }
});

Ext.define('TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobapplicationstatusform',
    initComponent: function() {
        this.callParent(arguments);
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                cls: 'appwindow-cls',
                padding: '25 0 21 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobapplicationstatus_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    msgTarget: 'side',
                    required: true,
                    cls: 'rule-name-cls',
                    listeners: {
                        focus: function(rec) {
                            if (rec.value != null || "") {
                                if (rec.value == "Joined" || rec.value == "No Show" || rec.value == "Offer Rejected" || rec.value == "Offer Revoked") {
                                    this.setEditable(false);
                                    Ext.toast('This value cannot be changed as it is being used in another screen', false, 't');
                                } else //this.up().down('textfield[name=description]').setEditable(false);
                                {
                                    this.setEditable(true);
                                }
                            }
                        }
                    }
                },
                //this.up().down('textfield[name=description]').setEditable(true);
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobapplicationstatusgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        if (rec.data.name == 'Joined' || rec.data.name == 'No Show' || rec.data.name == 'Offer Rejected' || rec.data.name == 'Offer Revoked') {
                            Ext.toast('This value cannot be deleted as it is being used in another screen', false, 't');
                        } else {
                            params = {
                                ddo_jobapplicationstatus_id: rec.get('ddo_jobapplicationstatus_id')
                            };
                            Ext.Ajax.request({
                                url: '/jobapplicationstatus',
                                method: 'DELETE',
                                params: params,
                                success: function(resp, b) {
                                    gridStore.removeAt(rowIndex);
                                    gridStore.reload();
                                    Ext.getBody().unmask();
                                    var data = Ext.decode(resp.responseText);
                                    Ext.toast(data.message, false, 't');
                                },
                                failure: function(resp, b) {
                                    Ext.getBody().unmask();
                                    var data = Ext.decode(resp.responseText);
                                    Ext.toast(data.message, false, 't');
                                }
                            });
                        }
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobapplicationstatuscontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            if (Ext.isEmpty(values.ddo_jobapplicationstatus_id)) {
                for (var i = 0; i < store.data.length; i++) {
                    if (store.data.items[i].data.name.toUpperCase() === values.name.toUpperCase()) {
                        Ext.toast('record already exits', false, 't');
                        var breaked = true;
                        break;
                    }
                }
                if (!breaked) {
                    params = {
                        name: values.name,
                        description: values.description,
                        ddo_jobapplicationstatus_id: values.ddo_jobapplicationstatus_id
                    };
                    form.reset();
                    Ext.Ajax.request({
                        url: '/jobapplicationstatus',
                        method: Ext.isEmpty(values.ddo_jobapplicationstatus_id) ? 'POST' : 'PUT',
                        params: params,
                        success: function(resp, b) {
                            grid.getStore().reload();
                            Ext.getBody().unmask();
                            var data = Ext.decode(resp.responseText);
                            Ext.toast(data.message, false, 't');
                        },
                        failure: function(resp, b) {
                            Ext.getBody().unmask();
                            var data = Ext.decode(resp.responseText);
                            Ext.toast(data.message, false, 't');
                        }
                    });
                }
            } else if (!Ext.isEmpty(values.ddo_jobapplicationstatus_id)) {
                params = {
                    name: values.name,
                    description: values.description,
                    ddo_jobapplicationstatus_id: values.ddo_jobapplicationstatus_id
                };
                form.reset();
                Ext.Ajax.request({
                    url: '/jobapplicationstatus',
                    method: Ext.isEmpty(values.ddo_jobapplicationstatus_id) ? 'POST' : 'PUT',
                    params: params,
                    success: function(resp, b) {
                        grid.getStore().reload();
                        Ext.getBody().unmask();
                        var data = Ext.decode(resp.responseText);
                        Ext.toast(data.message, false, 't');
                    },
                    failure: function(resp, b) {
                        Ext.getBody().unmask();
                        var data = Ext.decode(resp.responseText);
                        Ext.toast(data.message, false, 't');
                    }
                });
            }
        }
    }
});
/*if(!Ext.isEmpty(store) ){
            record = store.findExact('name',values.name);
            if(record == -1){
                record = store.findExact('name',values.name.toUpperCase());
                if(record == -1){
                    record = store.findExact('name',values.name.toLowerCase());
                }
            }
            if(record!= -1 && Ext.isEmpty(values.ddo_jobapplicationstatus_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }else if(record!= -1 && !Ext.isEmpty(values.ddo_jobapplicationstatus_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }
        }
        params = {
            name:values.name,
            description:values.description,
            ddo_jobapplicationstatus_id:values.ddo_jobapplicationstatus_id,
        };
        form.reset();
        Ext.Ajax.request({
            url: '/jobapplicationstatus',
            method: Ext.isEmpty(values.ddo_jobapplicationstatus_id)?'POST':'PUT',
            params: params,
            success: function(resp, b) {
                grid.getStore().reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });*/

Ext.define('TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobapplicationstatusviewmodel'
});

Ext.define('TalentAcquisition.view.jobapplicationstatus.JobApplicationStatus', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobapplicationstatusview',
    requires: [
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusGrid',
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusController',
        'TalentAcquisition.view.jobapplicationstatus.JobApplicationStatusViewModel',
        'TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore'
    ],
    controller: 'jobapplicationstatuscontroller',
    viewModel: {
        type: 'jobapplicationstatusviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Application Status',
            grid: 'jobapplicationstatusgrid',
            gridStore: Ext.create('TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore'),
            form: 'jobapplicationstatusform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobapplicationstatusgrid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.jobeducation.JobEducationForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobeducationform',
    initComponent: function() {
        this.callParent(arguments);
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 21 0',
                cls: 'appwindow-cls',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobeducation_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    msgTarget: 'side',
                    required: true,
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobeducation.JobEducationGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobeducationgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobeducation.JobEducationStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_jobeducation_id: rec.get('ddo_jobeducation_id')
                        };
                        Ext.Ajax.request({
                            url: '/jobeducation',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobeducation.JobEducationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobeducationcontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            if (Ext.isEmpty(values.ddo_jobeducation_id)) {
                for (var i = 0; i < store.data.length; i++) {
                    if (store.data.items[i].data.name.toUpperCase() === values.name.toUpperCase()) {
                        Ext.toast('record already exits', false, 't');
                        break;
                    } else {
                        params = {
                            name: values.name,
                            description: values.description,
                            ddo_jobeducation_id: values.ddo_jobeducation_id
                        };
                        form.reset();
                        Ext.Ajax.request({
                            url: '/jobeducation',
                            method: Ext.isEmpty(values.ddo_jobeducation_id) ? 'POST' : 'PUT',
                            params: params,
                            success: function(resp, b) {
                                grid.getStore().reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                        break;
                    }
                }
            } else if (!Ext.isEmpty(values.ddo_jobeducation_id)) {
                params = {
                    name: values.name,
                    description: values.description,
                    ddo_jobeducation_id: values.ddo_jobeducation_id
                };
                form.reset();
                Ext.Ajax.request({
                    url: '/jobeducation',
                    method: Ext.isEmpty(values.ddo_jobeducation_id) ? 'POST' : 'PUT',
                    params: params,
                    success: function(resp, b) {
                        grid.getStore().reload();
                        Ext.getBody().unmask();
                        var data = Ext.decode(resp.responseText);
                        Ext.toast(data.message, false, 't');
                    },
                    failure: function(resp, b) {
                        Ext.getBody().unmask();
                        var data = Ext.decode(resp.responseText);
                        Ext.toast(data.message, false, 't');
                    }
                });
            }
        }
    }
});
/*params = {
         name:values.name,
         description:values.description,
         ddo_jobeducation_id:values.ddo_jobeducation_id,
     };
     form.reset();
     Ext.Ajax.request({
         url: '/jobeducation',
         method: Ext.isEmpty(values.ddo_jobeducation_id)?'POST':'PUT',
         params: params,
         success: function(resp, b) {
             grid.getStore().reload();
             Ext.getBody().unmask();
             var data = Ext.decode(resp.responseText);
             Ext.toast(data.message, false, 't');

         },
         failure: function(resp, b) {
             Ext.getBody().unmask();
             var data = Ext.decode(resp.responseText);
             Ext.toast(data.message, false, 't');

         }
     });*/

Ext.define('TalentAcquisition.view.jobeducation.JobEducationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobeducationviewmodel'
});

Ext.define('TalentAcquisition.view.jobeducation.JobEducation', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobeducationview',
    requires: [
        'TalentAcquisition.view.jobeducation.JobEducationForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobeducation.JobEducationGrid',
        'TalentAcquisition.view.jobeducation.JobEducationController',
        'TalentAcquisition.view.jobeducation.JobEducationViewModel',
        'TalentAcquisition.store.jobeducation.JobEducationStore'
    ],
    controller: 'jobeducationcontroller',
    viewModel: {
        type: 'jobeducationviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Job Education',
            grid: 'jobeducationgrid',
            gridStore: Ext.create('TalentAcquisition.store.jobeducation.JobEducationStore'),
            form: 'jobeducationform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobeducationgrid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.jobinterviewrating.JobInterviewRatingForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobinterviewratingform',
    initComponent: function() {
        this.callParent(arguments);
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 21 0',
                cls: 'appwindow-cls',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobinterviewrating_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    msgTarget: 'side',
                    required: true,
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobinterviewrating.JobInterviewRatingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobinterviewratinggrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_jobinterviewrating_id: rec.get('ddo_jobinterviewrating_id')
                        };
                        Ext.Ajax.request({
                            url: '/jobinterviewrating',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobinterviewrating.JobInterviewRatingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobinterviewratingcontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            if (Ext.isEmpty(values.ddo_jobinterviewrating_id)) {
                for (var i = 0; i < store.data.length; i++) {
                    if (store.data.items[i].data.name.toUpperCase() === values.name.toUpperCase()) {
                        Ext.toast('record already exits', false, 't');
                        var breaked = true;
                        break;
                    }
                }
                if (!breaked) {
                    params = {
                        name: values.name,
                        description: values.description,
                        ddo_jobinterviewrating_id: values.ddo_jobinterviewrating_id
                    };
                    form.reset();
                    Ext.Ajax.request({
                        url: '/jobinterviewrating',
                        method: Ext.isEmpty(values.ddo_jobinterviewrating_id) ? 'POST' : 'PUT',
                        params: params,
                        success: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            grid.getStore().reload();
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        },
                        failure: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        }
                    });
                }
            } else if (!Ext.isEmpty(values.ddo_jobinterviewrating_id)) {
                params = {
                    name: values.name,
                    description: values.description,
                    ddo_jobinterviewrating_id: values.ddo_jobinterviewrating_id
                };
                form.reset();
                Ext.Ajax.request({
                    url: '/jobinterviewrating',
                    method: Ext.isEmpty(values.ddo_jobinterviewrating_id) ? 'POST' : 'PUT',
                    params: params,
                    success: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        grid.getStore().reload();
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    },
                    failure: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    }
                });
            }
        }
    }
});
/*if(!Ext.isEmpty(store) ){
            record = store.findExact('name',values.name);
            if(record == -1){
                record = store.findExact('name',values.name.toUpperCase());
                if(record == -1){
                    record = store.findExact('name',values.name.toLowerCase());
                }
            }
            if(record!= -1 && Ext.isEmpty(values.ddo_jobinterviewrating_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }else if(record!= -1 && !Ext.isEmpty(values.ddo_jobinterviewrating_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }
        }

        params = {
            name:values.name,
            description:values.description,
            ddo_jobinterviewrating_id:values.ddo_jobinterviewrating_id,
        };
        form.reset();
        Ext.Ajax.request({
            url: '/jobinterviewrating',
            method: Ext.isEmpty(values.ddo_jobinterviewrating_id)?'POST':'PUT',
            params: params,
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });*/

Ext.define('TalentAcquisition.view.jobinterviewrating.JobInterviewRatingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobinterviewratingviewmodel'
});

Ext.define('TalentAcquisition.view.jobinterviewrating.JobInterviewRating', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobinterviewratingview',
    requires: [
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingGrid',
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingController',
        'TalentAcquisition.view.jobinterviewrating.JobInterviewRatingViewModel',
        'TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore'
    ],
    controller: 'jobinterviewratingcontroller',
    viewModel: {
        type: 'jobinterviewratingviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Interview Rating',
            grid: 'jobinterviewratinggrid',
            gridStore: Ext.create('TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore'),
            form: 'jobinterviewratingform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobinterviewratinggrid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobinterviewstatusform',
    initComponent: function() {
        this.callParent(arguments);
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 21 0',
                cls: 'appwindow-cls',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobinterviewstatus_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    msgTarget: 'side',
                    required: true,
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobinterviewstatusgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_jobinterviewstatus_id: rec.get('ddo_jobinterviewstatus_id')
                        };
                        Ext.Ajax.request({
                            url: '/jobinterviewstatus',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobinterviewstatuscontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            record = store.findExact('name', values.name);
            if (record == -1) {
                record = store.findExact('name', values.name.toUpperCase());
                if (record == -1) {
                    record = store.findExact('name', values.name.toLowerCase());
                }
            }
            if (record != -1 && Ext.isEmpty(values.ddo_jobinterviewstatus_id)) {
                var rec = store.getAt(record);
                if (rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                    Ext.toast('record already exits', false, 't');
                    return;
                }
            } else if (record != -1 && !Ext.isEmpty(values.ddo_jobinterviewstatus_id)) {
                var rec = store.getAt(record);
                if (rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                    Ext.toast('record already exits', false, 't');
                    return;
                }
            }
        }
        params = {
            name: values.name,
            description: values.description,
            ddo_jobinterviewstatus_id: values.ddo_jobinterviewstatus_id
        };
        form.reset();
        Ext.Ajax.request({
            url: '/jobinterviewstatus',
            method: Ext.isEmpty(values.ddo_jobinterviewstatus_id) ? 'POST' : 'PUT',
            params: params,
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
    }
});

Ext.define('TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobinterviewstatusviewmodel'
});

Ext.define('TalentAcquisition.view.jobinterviewstatus.JobInterviewStatus', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobinterviewstatusview',
    requires: [
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusGrid',
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusController',
        'TalentAcquisition.view.jobinterviewstatus.JobInterviewStatusViewModel',
        'TalentAcquisition.store.jobinterviewstatus.JobInterviewStatusStore'
    ],
    controller: 'jobinterviewstatuscontroller',
    viewModel: {
        type: 'jobinterviewstatusviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Interview Status',
            grid: 'jobinterviewstatusgrid',
            gridStore: Ext.create('TalentAcquisition.store.jobinterviewstatus.JobInterviewStatusStore'),
            form: 'jobinterviewstatusform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobinterviewstatusgrid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.joblocation.JobLocationForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.joblocationform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('joblocationview').getController();
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 21 0',
                cls: 'appwindow-cls',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_joblocation_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    msgTarget: 'side',
                    required: true,
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.joblocation.JobLocationGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.joblocationgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.joblocation.JobLocationStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    // handler: 'onGridDeleteClick'
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_joblocation_id: rec.get('ddo_joblocation_id')
                        };
                        Ext.Ajax.request({
                            url: '/joblocation',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                Ext.toast('Unable to delete data', false, 't');
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.joblocation.JobLocationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.joblocationcontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            breaked = false,
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            if (Ext.isEmpty(values.ddo_joblocation_id)) {
                for (var i = 0; i < store.data.length; i++) {
                    if (store.data.items[i].data.name.toUpperCase() === values.name.toUpperCase()) {
                        Ext.toast('record already exits', false, 't');
                        var breaked = true;
                        break;
                    }
                }
                if (!breaked) {
                    params = {
                        name: values.name,
                        description: values.description,
                        ddo_joblocation_id: values.ddo_joblocation_id
                    };
                    form.reset();
                    Ext.Ajax.request({
                        url: '/joblocation',
                        method: Ext.isEmpty(values.ddo_joblocation_id) ? 'POST' : 'PUT',
                        params: params,
                        success: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            grid.getStore().reload();
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        },
                        failure: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        }
                    });
                }
            } else if (!Ext.isEmpty(values.ddo_joblocation_id)) {
                params = {
                    name: values.name,
                    description: values.description,
                    ddo_joblocation_id: values.ddo_joblocation_id
                };
                form.reset();
                Ext.Ajax.request({
                    url: '/joblocation',
                    method: Ext.isEmpty(values.ddo_joblocation_id) ? 'POST' : 'PUT',
                    params: params,
                    success: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        grid.getStore().reload();
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    },
                    failure: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    }
                });
            }
        }
    },
    /* if(!Ext.isEmpty(store) ){
             record = store.findExact('name',values.name);
             if(record == -1){
                 record = store.findExact('name',values.name.toUpperCase());
                 if(record == -1){
                     record = store.findExact('name',values.name.toLowerCase());
                 }
             }
             if(record!= -1 && Ext.isEmpty(values.ddo_joblocation_id)){
                 var rec = store.getAt(record);
                 if(rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                     Ext.toast('record already exits',false,'t');
                     return ;
                 }
             }else if(record!= -1 && !Ext.isEmpty(values.ddo_joblocation_id)){
                 var rec = store.getAt(record);
                 if(rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                     Ext.toast('record already exits',false,'t');
                     return ;
                 }
             }
         }

         params = {
             name:values.name,
             description:values.description,
             ddo_joblocation_id:values.ddo_joblocation_id,
         };
         form.reset();
         Ext.Ajax.request({
             url: '/joblocation',
             method: Ext.isEmpty(values.ddo_joblocation_id)?'POST':'PUT',
             params: params,
             success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                 grid.getStore().reload();
                 Ext.getBody().unmask();
                 Ext.toast(data.message, false, 't');
             },
             failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                 Ext.getBody().unmask();
                 Ext.toast(data.message, false, 't');
             }
         });*/
    onGridDeleteClick: function() {
        var view = this.getView(),
            grid = view.down('grid'),
            gridStore = grid.getStore(),
            rec = gridStore.getAt(rowIndex),
            //find alt of rowIndex
            params;
        params = {
            ddo_joblocation_id: rec.get('ddo_joblocation_id')
        };
        Ext.Ajax.request({
            url: '/joblocation',
            method: 'DELETE',
            params: params,
            success: function(resp, b) {
                gridStore.removeAt(rowIndex);
                gridStore.reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });
    }
});

Ext.define('TalentAcquisition.view.joblocation.JobLocationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.joblocationviewmodel'
});

Ext.define('TalentAcquisition.view.joblocation.JobLocation', {
    extend: 'Ext.container.Container',
    alias: 'widget.joblocationview',
    requires: [
        'TalentAcquisition.view.joblocation.JobLocationForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.joblocation.JobLocationGrid',
        'TalentAcquisition.view.joblocation.JobLocationController',
        'TalentAcquisition.view.joblocation.JobLocationViewModel',
        'TalentAcquisition.store.joblocation.JobLocationStore'
    ],
    controller: 'joblocationcontroller',
    viewModel: {
        type: 'joblocationviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Job Location',
            grid: 'joblocationgrid',
            gridStore: Ext.create('TalentAcquisition.store.joblocation.JobLocationStore'),
            form: 'joblocationform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('joblocationgrid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpeningsForm', {
    extend: 'Ext.form.Panel',
    requires: [
        //'DDO.store.setup.department.DepartmentStore',
        'TalentAcquisition.store.joblocation.JobLocationStore',
        //'DDO.store.setup.designation.DesignationStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore'
    ],
    alias: 'widget.jobopeningsform',
    defaults: {
        width: '100%'
    },
    padding: 20,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                padding: 10,
                cls: 'rule-name-cls',
                labelWidth: '25%',
                msgTarget: 'side',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>'
            },
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobopenings_id'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Job Code',
                    allowBlank: false,
                    columnWidth: 0.5,
                    name: 'jobcode'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Job Name',
                    allowBlank: false,
                    columnWidth: 0.5,
                    name: 'name'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Job Description',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        msgTarget: 'side',
                        //labelSeparator: '',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        labelWidth: '25%',
                        padding: 10,
                        cls: 'ta-search-field',
                        columnWidth: 0.5
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            allowBlank: false,
                            name: 'ddo_department_id',
                            fieldLabel: 'Department',
                            store: {
                                type: 'departmentstore',
                                autoLoad: 'true'
                            },
                            displayField: 'name',
                            valueField: 'ddo_department_id',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            allowBlank: false,
                            name: 'ddo_joblocation_id',
                            fieldLabel: 'Location',
                            store: {
                                type: 'joblocationstore',
                                autoLoad: 'true'
                            },
                            displayField: 'name',
                            valueField: 'ddo_joblocation_id',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            //queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            allowBlank: false,
                            name: 'ddo_designation_id',
                            fieldLabel: 'Designation',
                            store: {
                                type: 'designationstore',
                                autoLoad: 'true'
                            },
                            displayField: 'name',
                            valueField: 'ddo_designation_id',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            allowBlank: false,
                            name: 'ddo_jobeducation_id',
                            fieldLabel: 'Qualification',
                            store: {
                                type: 'jobeducationstore',
                                autoLoad: 'true'
                            },
                            displayField: 'name',
                            valueField: 'ddo_jobeducation_id',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            //queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            minValue: 0,
                            fieldLabel: 'Total Experience',
                            maxValue: 50,
                            name: 'totalexperience',
                            allowBlank: false
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            maxValue: 200,
                            minValue: 0,
                            allowDecimals: false,
                            //regex:/^[0-9_]+$/,
                            invalidText: "Please enter valid data",
                            allowBlank: false,
                            fieldLabel: 'Open Position',
                            name: 'openpositions'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Effective Date',
                            name: 'validfrom',
                            beforeLabelTextTpl: '',
                            allowBlank: false,
                            value: new Date(),
                            minValue: new Date()
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Expiration Date',
                            beforeLabelTextTpl: '',
                            name: 'validto',
                            listeners: {
                                expand: function() {
                                    var fromDate = this.up().down('datefield[name=validfrom]').value;
                                    if (!Ext.isEmpty(fromDate)) {
                                        this.setMinValue(fromDate);
                                    }
                                }
                            }
                        },
                        {
                            columnWidth: 0.5,
                            xtype: 'combo',
                            fieldLabel: 'Status',
                            beforeLabelTextTpl: '',
                            store: new Ext.data.SimpleStore({
                                data: [
                                    [
                                        1,
                                        'Vacant'
                                    ],
                                    [
                                        2,
                                        'Filled'
                                    ]
                                ],
                                id: 0,
                                fields: [
                                    'value',
                                    'text'
                                ]
                            }),
                            valueField: 'text',
                            name: 'jobstatus',
                            displayField: 'text',
                            triggerAction: 'all',
                            editable: false
                        },
                        {
                            columnWidth: 0.5,
                            xtype: 'combo',
                            fieldLabel: 'Billable',
                            beforeLabelTextTpl: '',
                            store: new Ext.data.SimpleStore({
                                data: [
                                    [
                                        "Y",
                                        'YES'
                                    ],
                                    [
                                        "N",
                                        'NO'
                                    ]
                                ],
                                fields: [
                                    'value',
                                    'text'
                                ]
                            }),
                            valueField: 'value',
                            name: 'isbillable',
                            displayField: 'text',
                            triggerAction: 'all',
                            editable: false
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Responsibilities',
            cls: 'rule-name-cls',
            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
            //labelSeparator: '',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: '25%',
            columnWidth: 0.5,
            name: 'responsibilities'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Primary Skills',
            msgTarget: 'side',
            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
            cls: 'rule-name-cls',
            //labelSeparator: '',
            labelWidth: '25%',
            columnWidth: 1,
            allowBlank: false,
            name: 'primaryskills'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Secondary Skills',
            name: 'secondaryskills',
            labelWidth: '25%',
            //labelSeparator: '',
            columnWidth: 1,
            cls: 'rule-name-cls'
        }
    ],
    bbar: {
        padding: '25 0 21 0',
        cls: 'appwindow-cls',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'eastContainerCollapse'
            },
            {
                xtype: 'button',
                text: 'Save',
                cls: 'app-window-save-btn',
                formBind: true,
                handler: 'eastContainerCollapse',
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    }
});

Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpeningsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobopeningsgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobopenings.JobOpeningsStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Job Name',
            dataIndex: 'name',
            flex: 0.4,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Department',
            dataIndex: 'ddo_department_name',
            flex: 0.4,
            hidden: true
        },
        {
            text: 'Location',
            dataIndex: 'ddo_joblocation_name',
            flex: 0.4
        },
        {
            text: 'Designation',
            dataIndex: 'ddo_designation_name',
            flex: 0.4
        },
        /*{
     text: 'Description',
     dataIndex: 'description',
     flex: 0.4
     },*/
        {
            text: 'Qualification',
            dataIndex: 'ddo_jobeducation_name',
            flex: 0.4
        },
        {
            text: 'Total Experience',
            dataIndex: 'totalexperience',
            flex: 0.4
        },
        {
            text: 'Open Positions',
            dataIndex: 'openpositions',
            flex: 0.4
        },
        {
            text: 'Responsibilities',
            dataIndex: 'responsibilities',
            hidden: true,
            flex: 0.4
        },
        {
            text: 'Skills',
            dataIndex: 'primaryskills',
            flex: 0.4
        },
        {
            text: 'Status',
            dataIndex: 'jobstatus',
            flex: 0.4
        },
        {
            xtype: 'widgetcolumn',
            width: 120,
            align: 'center',
            widget: {
                xtype: 'button',
                text: 'Applications',
                tooltip: 'Applications Detail',
                //cls: 'request-access-btn',
                cls: 'request-access-btn',
                //glyph: 'xf0c7@FontAwesome',
                handler: 'onApplicationBtnClick'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    // handler: 'onGridDeleteClick'
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_jobopenings_id: rec.get('ddo_jobopenings_id')
                        };
                        Ext.Ajax.request({
                            url: '/jobopenings',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});
//select: 'onRecSelect'

Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpeningsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobopeningscontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onApplicationBtnClick: function(btn, e, eOpts) {
        var record = btn.getWidgetRecord();
        var jobOpeningsMain = this.getView().up('jobopenings-card');
        var grid = jobOpeningsMain.down('applicationdetailsgrid');
        var collapsiblecontainer = jobOpeningsMain.down('applicationdetailsview').down('collapsiblecontainer');
        var form = this.getView().up('jobopenings-card').down('applicationdetailsform');
        form.reset();
        grid.getStore().removeAll();
        collapsiblecontainer.down('[name=eastpanel]').collapse();
        jobOpeningsMain.down('applicationdetailsview').down('[name=applicationdetailsviewcolps]').getViewModel().set('hideBtn', false);
        Ext.Ajax.request({
            url: '/jobapplication/' + record.get('ddo_jobopenings_id'),
            // url: '/jobapplication/'+ 1,
            method: 'GET',
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().loadData(data.data);
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
        jobOpeningsMain.setActiveItem(1);
        collapsiblecontainer.down('button').hide();
        collapsiblecontainer.down('[reference=fbButton]').setHidden(true);
    },
    /*onRecSelect: function(me, record){
        var form = this.getView().up('jobopenings-card').down('applicationdetailsform');
        var grid = this.getView().up('jobopenings-card').down('applicationdetailsgrid');
        grid.getStore().removeAll();
       Ext.Ajax.request({
            url: '/jobapplication/'+record.get('ddo_jobopenings_id'),
            // url: '/jobapplication/'+ 1,
            method: 'GET',
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                  grid.getStore().loadData(data.data);           
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast('Unable to save data',false,'t');
                Ext.toast(data.message, false, 't');

            }
        });
    },*/
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid');
        params = {
            name: values.name,
            ddo_designation_id: values.ddo_designation_id,
            ddo_jobopenings_id: values.ddo_jobopenings_id,
            ddo_jobeducation_id: values.ddo_jobeducation_id,
            ddo_joblocation_id: values.ddo_joblocation_id,
            ddo_department_id: values.ddo_department_id,
            jobstatus: values.jobstatus,
            openpositions: values.openpositions,
            primaryskills: values.primaryskills,
            responsibilities: values.responsibilities,
            secondaryskills: values.secondaryskills,
            totalexperience: values.totalexperience,
            validfrom: values.validfrom,
            validto: values.validto,
            jobcode: values.jobcode
        };
        Ext.isEmpty(values.ddo_jobopenings_id) ? delete params.ddo_jobopenings_id : console.log("Do nothing");
        form.reset();
        Ext.Ajax.request({
            url: '/jobopenings',
            method: Ext.isEmpty(values.ddo_jobopenings_id) ? 'POST' : 'PUT',
            params: params,
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
    },
    onGridDeleteClick: function() {
        var view = this.getView(),
            grid = view.down('grid'),
            gridStore = grid.getStore(),
            rec = gridStore.getAt(rowIndex),
            //find alt of rowIndex
            params;
        params = {
            ddo_jobopenings_id: rec.get('ddo_jobopenings_id')
        };
        Ext.Ajax.request({
            url: '/jobopenings',
            method: 'DELETE',
            params: params,
            success: function(resp, b) {
                gridStore.removeAt(rowIndex);
                gridStore.reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });
    }
});

Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpeningsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobopeningsviewmodel'
});

Ext.define('TalentAcquisition.view.jobopenings.openings.JobOpenings', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobopeningsview',
    requires: [
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsGrid',
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsController',
        'TalentAcquisition.view.jobopenings.openings.JobOpeningsViewModel',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore'
    ],
    controller: 'jobopeningscontroller',
    viewModel: {
        type: 'jobopeningsviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Job Openings',
            grid: 'jobopeningsgrid',
            gridStore: Ext.create('TalentAcquisition.store.jobopenings.JobOpeningsStore'),
            form: 'jobopeningsform',
            bigForm: true,
            filterData: [
                {
                    name: "Job Name",
                    value: "name"
                },
                /*{
            name:"Department",
            value:"ddo_department_name"
        },*/
                {
                    name: "Location",
                    value: "ddo_joblocation_name"
                },
                {
                    name: "Designation",
                    value: "ddo_designation_name"
                },
                {
                    name: "Skills",
                    value: "primaryskills"
                },
                {
                    name: "Status",
                    value: "jobstatus"
                }
            ],
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobopeningsgrid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    padding: 20,
    alias: 'widget.applicationdetailsform',
    defaults: {
        width: '100%'
    },
    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                width: '50%',
                padding: 10,
                editable: false,
                msgTarget: 'side',
                labelWidth: '25%',
                cls: 'rule-name-cls'
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Job Opening',
                    name: 'ddo_jobopenings_name'
                },
                {
                    xtype: 'hiddenfield',
                    reference: 'cvpath',
                    name: 'curriculumvitae'
                },
                {
                    xtype: 'button',
                    scale: 'small',
                    width: 120,
                    text: 'Download CV',
                    cls: 'request-access-btn view-cv-btn-cls',
                    margin: '0 0 0 50',
                    listeners: {
                        click: 'onViewCVBtnClick'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Candidate Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        labelWidth: '25%',
                        padding: 10,
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'First Name',
                            name: 'firstname'
                        },
                        {
                            fieldLabel: 'Middle Name',
                            xtype: 'textfield',
                            name: 'middlename'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        editable: false,
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Last Name',
                            xtype: 'textfield',
                            name: 'lastname'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: "Father's name",
                            name: 'fathersname'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        editable: false,
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Highest Education',
                            name: 'ddo_jobeducation_name'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Year of Passing',
                            name: 'yearofpassing',
                            readOnly: true,
                            hideTrigger: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '49%',
                        padding: 10,
                        editable: false,
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Skill Type',
                            name: 'skilltype'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Communication Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        labelWidth: '25%',
                        padding: 10,
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: ' Mobile Number',
                            name: 'mobilenumber',
                            hideTrigger: true
                        },
                        {
                            fieldLabel: 'Email',
                            xtype: 'textfield',
                            name: 'email',
                            vtype: 'email'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '100%',
                        padding: 10,
                        labelWidth: '25%',
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Address :',
                            xtype: 'textarea',
                            name: 'address'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Other Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        labelWidth: '25%',
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Current City',
                            name: 'currentcity'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Current Employment Status',
                            name: 'currentemploymentstatus'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        labelWidth: '25%',
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Previous Company',
                            xtype: 'textfield',
                            name: 'previouscompany'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: "Total Experience (Years)",
                            name: 'totalexperience',
                            hideTrigger: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        labelWidth: '25%',
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'ID. Proof',
                            xtype: 'textfield',
                            name: 'idproof'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ID. Proff Number',
                            name: 'idproofnumber',
                            hideTrigger: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        labelWidth: '25%',
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Availabel From',
                            xtype: 'datefield',
                            name: 'availablefrom',
                            readOnly: true,
                            hideTrigger: true
                        },
                        {
                            fieldLabel: 'Applied On',
                            xtype: 'datefield',
                            name: 'appliedon',
                            readOnly: true,
                            hideTrigger: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '49%',
                        padding: 10,
                        labelWidth: '25%',
                        editable: false,
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Notice Period (Days)',
                            xtype: 'textfield',
                            name: 'noticeperiodindays',
                            hideTrigger: true
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Hiring Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        editable: false,
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        "float": 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Recruiter',
                            name: 'recruitedby'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Status',
                            name: 'ddo_jobapplicationstatus_name'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '49%',
                        padding: 10,
                        editable: false,
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Hiring Source',
                            name: 'ddo_jobsource_name'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '50%',
                        padding: 10,
                        editable: false,
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Referred By',
                            name: 'referredby',
                            hidden: true,
                            displayField: 'referredby',
                            valueField: 'referredby'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Vendor Name :',
                            name: 'vendorname',
                            hidden: true,
                            displayField: 'vendorname',
                            valueField: 'vendorname'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Job Portal Name :',
                            name: 'jobportalname',
                            hidden: true,
                            displayField: 'jobportalname',
                            valueField: 'jobportalname'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Comments:',
                            name: 'comments'
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.applicationdetailscontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            collapsiblecontainer = view.down('collapsiblecontainer'),
            eastpanel = collapsiblecontainer.down('[name=eastpanel]'),
            form = view.down('form').getForm();
        form.reset();
        form.setValues(record.data);
        collapsiblecontainer.setFbButtonHide(false);
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onBackButtonClick: function() {
        this.getView().up('jobopenings-card').setActiveItem(0);
    },
    onViewCVBtnClick: function(btn) {
        var me = this,
            view = me.getView(),
            cvpath = view.lookupReference('cvpath').getValue(),
            downloadablePath = window.location.origin + '/' + cvpath;
        if (Ext.isEmpty(cvpath)) {
            Ext.toast('CV does not exits', false, 't');
        } else {
            window.open(downloadablePath);
        }
    }
});

Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'TalentAcquisition.store.jobopenings.ApplicationDetailsStore',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsController'
    ],
    alias: 'widget.applicationdetailsgrid',
    //store: type:{'applicationdetailstore'},
    /*store: {
     type: 'applicationdetailstore'
     },*/
    //store: Ext.create('TalentAcquisition.store.jobopenings.ApplicationDetailsStore'),
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    //controller: 'applicationdetailscontroller',
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Application No.',
            dataIndex: 'ddo_jobapplications_id',
            flex: 0.4,
            hidden: true,
            height: 42
        },
        {
            text: 'Job Opening',
            dataIndex: 'ddo_jobopenings_name',
            flex: 0.4
        },
        {
            text: 'Candidate Name',
            dataIndex: 'firstname',
            flex: 0.4,
            renderer: function(value, cell, record) {
                var data = record.data;
                return data.firstname + ' ' + data.lastname;
            }
        },
        {
            text: 'Status',
            dataIndex: 'ddo_jobapplicationstatus_name',
            flex: 0.4
        },
        {
            text: 'Address',
            dataIndex: 'address',
            hidden: true,
            flex: 0.4
        },
        {
            text: 'Mobile Number',
            dataIndex: 'mobilenumber',
            flex: 0.4
        },
        {
            text: 'Education',
            dataIndex: 'ddo_jobeducation_name',
            flex: 0.4
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 0.4
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetails', {
    extend: 'Ext.container.Container',
    alias: 'widget.applicationdetailsview',
    requires: [
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsGrid',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetailsController',
        'TalentAcquisition.store.jobopenings.ApplicationDetailsStore'
    ],
    controller: 'applicationdetailscontroller',
    items: [
        {
            xtype: 'collapsiblecontainer',
            name: 'applicationdetailsviewcolps',
            mainContainerTitle: 'Application Details',
            grid: 'applicationdetailsgrid',
            gridStore: Ext.create('TalentAcquisition.store.jobopenings.ApplicationDetailsStore'),
            form: 'applicationdetailsform',
            bigForm: true,
            filterData: [
                {
                    name: "status",
                    value: "ddo_jobapplicationstatus_name"
                }
            ],
            fbButtonRequired: false
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('applicationdetailsgrid').getStore().load();
            this.down('applicationdetailsgrid').getStore().sort({
                property: 'ddo_jobapplications_id',
                direction: 'DESC'
            });
        }
    }
});

Ext.define('TalentAcquisition.view.jobopenings.JobOpeningsCard', {
    extend: 'Ext.container.Container',
    requires: [
        'TalentAcquisition.view.jobopenings.openings.JobOpenings',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetails'
    ],
    alias: 'widget.jobopenings-card',
    layout: {
        type: 'card',
        activeItem: 0
    },
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            items: [
                {
                    xtype: "jobopeningsview"
                },
                {
                    xtype: 'applicationdetailsview'
                }
            ]
        });
        me.callParent(arguments);
    },
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('[name=filterColumn]').reset();
        }
    }
});

Ext.define('TalentAcquisition.view.jobopenings.JobOpeningsMain', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobopenings-main',
    requires: [
        'TalentAcquisition.view.jobopenings.openings.JobOpenings',
        'TalentAcquisition.view.jobopenings.applicationdetails.ApplicationDetails'
    ],
    layout: {
        type: 'fit'
    },
    requires: [],
    //controller: 'executiveplanview',
    viewModel: {},
    //type: 'executiveplanview'
    items: [
        {
            xtype: 'tabpanel',
            cls: 'goalstab-cls',
            items: [
                {
                    xtype: "jobopeningsview",
                    title: "Job Openings"
                },
                {
                    title: "Application Details",
                    xtype: "applicationdetailsview"
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobsource.JobSourceForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobsourceform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('jobsourceview').getController();
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                cls: 'appwindow-cls',
                padding: '25 0 21 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobsource_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    msgTarget: 'side',
                    required: true,
                    editable: true,
                    cls: 'rule-name-cls',
                    listeners: {
                        focus: function(rec) {
                            if (rec.value != null || "") {
                                if (rec.value == "Job Portal" || rec.value == "Consultancy" || rec.value == "Referred by employee") {
                                    this.setEditable(false);
                                    Ext.toast('This value cannot be changed as it is being used in another screen', false, 't');
                                } else //this.up().down('textfield[name=description]').setEditable(false);
                                {
                                    this.setEditable(true);
                                }
                            }
                        }
                    }
                },
                //this.up().down('textfield[name=description]').setEditable(true);
                // if ()                  
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobsource.JobSourceGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobsourcegrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobsource.JobSourceStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    // handler: 'onGridDeleteClick'
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        if (rec.data.name == 'Job Portal' || rec.data.name == 'Consultancy' || rec.data.name == 'Referred by employee') {
                            Ext.toast('This value cannot be deleted as it is being used in another screen', false, 't');
                        } else {
                            params = {
                                ddo_jobsource_id: rec.get('ddo_jobsource_id')
                            };
                            Ext.Ajax.request({
                                url: '/jobsource',
                                method: 'DELETE',
                                params: params,
                                success: function(resp, b) {
                                    gridStore.removeAt(rowIndex);
                                    gridStore.reload();
                                    Ext.getBody().unmask();
                                    var data = Ext.decode(resp.responseText);
                                    Ext.toast(data.message, false, 't');
                                },
                                failure: function(resp, b) {
                                    Ext.getBody().unmask();
                                    Ext.toast('Unable to delete data', false, 't');
                                    var data = Ext.decode(resp.responseText);
                                    Ext.toast(data.message, false, 't');
                                }
                            });
                        }
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobsource.JobSourceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobsourcecontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
            eastpanel.down('textfield').focus();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            if (Ext.isEmpty(values.ddo_jobsource_id)) {
                for (var i = 0; i < store.data.length; i++) {
                    if (store.data.items[i].data.name.toUpperCase() === values.name.toUpperCase()) {
                        Ext.toast('record already exits', false, 't');
                        var breaked = true;
                        break;
                    }
                }
                if (!breaked) {
                    params = {
                        name: values.name,
                        description: values.description,
                        ddo_jobsource_id: values.ddo_jobsource_id
                    };
                    form.reset();
                    Ext.Ajax.request({
                        url: '/jobsource',
                        method: Ext.isEmpty(values.ddo_jobsource_id) ? 'POST' : 'PUT',
                        params: params,
                        success: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            grid.getStore().reload();
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        },
                        failure: function(resp, b) {
                            var data = Ext.decode(resp.responseText);
                            Ext.getBody().unmask();
                            Ext.toast(data.message, false, 't');
                        }
                    });
                }
            } else if (!Ext.isEmpty(values.ddo_joblocation_id)) {
                params = {
                    name: values.name,
                    description: values.description,
                    ddo_jobsource_id: values.ddo_jobsource_id
                };
                form.reset();
                Ext.Ajax.request({
                    url: '/jobsource',
                    method: Ext.isEmpty(values.ddo_jobsource_id) ? 'POST' : 'PUT',
                    params: params,
                    success: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        grid.getStore().reload();
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    },
                    failure: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    }
                });
            }
        }
    },
    /*if(!Ext.isEmpty(store) ){
            record = store.findExact('name',values.name);
            if(record == -1){
                record = store.findExact('name',values.name.toUpperCase());
                if(record == -1){
                    record = store.findExact('name',values.name.toLowerCase());
                }
            }
            if(record!= -1 && Ext.isEmpty(values.ddo_jobsource_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }else if(record!= -1 && !Ext.isEmpty(values.ddo_jobsource_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }
        }
        params = {
            name:values.name,
            description:values.description,
            ddo_jobsource_id:values.ddo_jobsource_id,
        };
        form.reset();
        Ext.Ajax.request({
            url: '/jobsource',
            method: Ext.isEmpty(values.ddo_jobsource_id)?'POST':'PUT',
            params: params,
            success: function(resp, b) {
            	var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
            	var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');

            }
        });*/
    onGridDeleteClick: function() {
        var view = this.getView(),
            grid = view.down('grid'),
            gridStore = grid.getStore(),
            rec = gridStore.getAt(rowIndex),
            //find alt of rowIndex
            params;
        params = {
            ddo_jobsource_id: rec.get('ddo_jobsource_id')
        };
        Ext.Ajax.request({
            url: '/jobsource',
            method: 'DELETE',
            params: params,
            success: function(resp, b) {
                gridStore.removeAt(rowIndex);
                gridStore.reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });
    }
});

Ext.define('TalentAcquisition.view.jobsource.JobSourceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobsourceviewmodel'
});

Ext.define('TalentAcquisition.view.jobsource.JobSource', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobsourceview',
    requires: [
        'TalentAcquisition.view.jobsource.JobSourceForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobsource.JobSourceGrid',
        'TalentAcquisition.view.jobsource.JobSourceController',
        'TalentAcquisition.view.jobsource.JobSourceViewModel',
        'TalentAcquisition.store.jobsource.JobSourceStore'
    ],
    controller: 'jobsourcecontroller',
    viewModel: {
        type: 'jobsourceviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Sourcing Partners',
            grid: 'jobsourcegrid',
            gridStore: Ext.create('TalentAcquisition.store.jobsource.JobSourceStore'),
            form: 'jobsourceform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobsourcegrid').getStore().load();
            this.down('jobsourcegrid').getStore().sort({
                property: 'ddo_jobsource_id',
                direction: 'DESC'
            });
        }
    }
});

Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLinesForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'
    ],
    alias: 'widget.jobsourcelinesform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('jobsourcelinesview').getController();
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                layout: {
                    type: 'hbox'
                },
                cls: 'appwindow-cls',
                padding: '25 0 21 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobsourcelines_id'
                },
                {
                    xtype: 'combobox',
                    allowBlank: false,
                    msgTarget: 'side',
                    name: 'ddo_jobsource_id',
                    emptyText: 'Job Source',
                    cls: 'rule-name-cls',
                    reference: 'jobSourceCombo',
                    editable: false,
                    store: {
                        type: 'jobsourcestore'
                    },
                    displayField: 'name',
                    valueField: 'ddo_jobsource_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    msgTarget: 'side',
                    required: true,
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLinesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobsourcelinesgrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore',
        'TalentAcquisition.store.jobsource.JobSourceStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Source Line',
            dataIndex: 'ddo_jobsource_name',
            flex: 0.4
        },
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    // handler: 'onGridDeleteClick'
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_jobsourcelines_id: rec.get('ddo_jobsourcelines_id')
                        };
                        Ext.Ajax.request({
                            url: '/jobsourceline',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                Ext.toast('Unable to delete data', false, 't');
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLinesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobsourcelinescontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            if (Ext.isEmpty(values.ddo_jobsourcelines_id)) {
                for (var i = 0; i < store.data.length; i++) {
                    if (store.data.items[i].data.name.toUpperCase() === values.name.toUpperCase()) {
                        Ext.toast('record already exits', false, 't');
                        var breaked = true;
                        break;
                    }
                }
                if (!breaked) {
                    params = {
                        name: values.name,
                        description: values.description,
                        ddo_jobsourcelines_id: values.ddo_jobsourcelines_id,
                        ddo_jobsource_id: values.ddo_jobsource_id
                    };
                    form.reset();
                    Ext.Ajax.request({
                        url: '/jobsourceline',
                        method: Ext.isEmpty(values.ddo_jobsourcelines_id) ? 'POST' : 'PUT',
                        params: params,
                        success: function(resp, b) {
                            Ext.getBody().unmask();
                            if (!Ext.isEmpty(resp.responseText))  {
                                var data = Ext.decode(resp.responseText);
                            }
                            
                            grid.getStore().reload();
                            Ext.toast(data.message, false, 't');
                        },
                        failure: function(resp, b) {
                            Ext.getBody().unmask();
                            if (!Ext.isEmpty(resp.responseText))  {
                                var data = Ext.decode(resp.responseText);
                            }
                            
                            Ext.toast(data.message, false, 't');
                        }
                    });
                }
            } else if (!Ext.isEmpty(values.ddo_joblocation_id)) {
                params = {
                    name: values.name,
                    description: values.description,
                    ddo_jobsourcelines_id: values.ddo_jobsourcelines_id,
                    ddo_jobsource_id: values.ddo_jobsource_id
                };
                form.reset();
                Ext.Ajax.request({
                    url: '/jobsourceline',
                    method: Ext.isEmpty(values.ddo_jobsourcelines_id) ? 'POST' : 'PUT',
                    params: params,
                    success: function(resp, b) {
                        Ext.getBody().unmask();
                        if (!Ext.isEmpty(resp.responseText))  {
                            var data = Ext.decode(resp.responseText);
                        }
                        
                        grid.getStore().reload();
                        Ext.toast(data.message, false, 't');
                    },
                    failure: function(resp, b) {
                        Ext.getBody().unmask();
                        if (!Ext.isEmpty(resp.responseText))  {
                            var data = Ext.decode(resp.responseText);
                        }
                        
                        Ext.toast(data.message, false, 't');
                    }
                });
            }
        }
    },
    /*if(!Ext.isEmpty(store) ){
            record = store.findExact('name',values.name);
            if(record == -1){
                record = store.findExact('name',values.name.toUpperCase());
                if(record == -1){
                    record = store.findExact('name',values.name.toLowerCase());
                }
            }
            if(record!= -1 && Ext.isEmpty(values.ddo_jobsourcelines_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }else if(record!= -1 && !Ext.isEmpty(values.ddo_jobsourcelines_id)){
                var rec = store.getAt(record);
                if(rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                    Ext.toast('record already exits',false,'t');
                    return ;
                }
            }
        }
            params = {
                name:values.name,
                description:values.description,
                ddo_jobsourcelines_id: values.ddo_jobsourcelines_id,
                ddo_jobsource_id:values.ddo_jobsource_id
            };

        form.reset();
        Ext.Ajax.request({
            url: '/jobsourceline',
            method: Ext.isEmpty(values.ddo_jobsourcelines_id) ? 'POST':'PUT',
            params: params,
            success: function(resp, b) {
                Ext.getBody().unmask();
                if(!Ext.isEmpty(resp.responseText))
                	var data = Ext.decode(resp.responseText);
                    grid.getStore().reload();
                    Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                if(!Ext.isEmpty(resp.responseText))
                	var data = Ext.decode(resp.responseText);
                    Ext.toast(data.message, false, 't');
            }
        });*/
    onGridDeleteClick: function() {
        var view = this.getView(),
            grid = view.down('grid'),
            gridStore = grid.getStore(),
            rec = gridStore.getAt(rowIndex),
            //find alt of rowIndex
            params;
        params = {
            ddo_jobsourcelines_id: rec.get('ddo_jobsourcelines_id')
        };
        Ext.Ajax.request({
            url: '/jobsourceline',
            method: 'DELETE',
            params: params,
            success: function(resp, b) {
                gridStore.removeAt(rowIndex);
                gridStore.reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });
    }
});

Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLinesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobsourcelinesviewmodel'
});

Ext.define('TalentAcquisition.view.jobsourcelines.JobSourceLines', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobsourcelinesview',
    requires: [
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesGrid',
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesController',
        'TalentAcquisition.view.jobsourcelines.JobSourceLinesViewModel',
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'
    ],
    controller: 'jobsourcelinescontroller',
    viewModel: {
        type: 'jobsourcelinesviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Profile Sources',
            grid: 'jobsourcelinesgrid',
            gridStore: Ext.create('TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'),
            form: 'jobsourcelinesform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobsourcelinesgrid').getStore().load();
            Ext.getStore('jobsourcestores').load();
            this.down('jobsourcelinesgrid').getStore().sort({
                property: 'ddo_jobsourcelines_id',
                direction: 'DESC'
            });
        }
    }
});

Ext.define('TalentAcquisition.view.jobtype.JobTypeForm', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.jobtypeform',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.up('jobtypeview').getController();
    },
    items: [
        {
            xtype: 'form',
            bbar: {
                cls: 'appwindow-cls',
                layout: {
                    type: 'hbox'
                },
                padding: '25 0 21 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        cls: 'app-window-cancel-btn',
                        handler: 'eastContainerCollapse'
                    },
                    {
                        xtype: 'button',
                        text: 'Save',
                        cls: 'app-window-save-btn',
                        formBind: true,
                        handler: 'eastContainerCollapse',
                        listeners: {
                            click: 'onFormSaveClick'
                        }
                    }
                ]
            },
            //cls: 'rule-winform-cls',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobtype_id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'name',
                    emptyText: 'Name',
                    required: true,
                    msgTarget: 'side',
                    cls: 'rule-name-cls'
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    emptyText: 'Description',
                    cls: 'rule-name-cls'
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.jobtype.JobTypeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobtypegrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobtype.JobTypeStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 0.4
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [
                {
                    iconCls: 'delete-plus',
                    tooltip: 'Delete',
                    // handler: 'onGridDeleteClick'
                    handler: function(grid, rowIndex, colIndex) {
                        var gridStore = grid.getStore(),
                            rec = gridStore.getAt(rowIndex),
                            params;
                        params = {
                            ddo_jobtype_id: rec.get('ddo_jobtype_id')
                        };
                        Ext.Ajax.request({
                            url: '/jobtype',
                            method: 'DELETE',
                            params: params,
                            success: function(resp, b) {
                                gridStore.removeAt(rowIndex);
                                gridStore.reload();
                                Ext.getBody().unmask();
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            },
                            failure: function(resp, b) {
                                Ext.getBody().unmask();
                                Ext.toast('Unable to delete data', false, 't');
                                var data = Ext.decode(resp.responseText);
                                Ext.toast(data.message, false, 't');
                            }
                        });
                    }
                }
            ]
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.jobtype.JobTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobtypecontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onWindowOutsideTap: function() {},
    eastContainerCollapse: function() {
        var view = this.getView(),
            eastpanel = view.down('collapsiblecontainer').down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var view = this.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid'),
            store = grid.getStore(),
            record;
        values.name = values.name.trim();
        if (!Ext.isEmpty(store)) {
            record = store.findExact('name', values.name);
            if (record == -1) {
                record = store.findExact('name', values.name.toUpperCase());
                if (record == -1) {
                    record = store.findExact('name', values.name.toLowerCase());
                }
            }
            if (record != -1 && Ext.isEmpty(values.ddo_jobtype_id)) {
                var rec = store.getAt(record);
                if (rec.get('name').toUpperCase() == values.name.toUpperCase()) {
                    Ext.toast('record already exits', false, 't');
                    return;
                }
            } else if (record != -1 && !Ext.isEmpty(values.ddo_jobtype_id)) {
                var rec = store.getAt(record);
                if (rec.get('name').toUpperCase() == values.name.toUpperCase() && (rec.get('description') == values.description || Ext.isEmpty(values.description))) {
                    Ext.toast('record already exits', false, 't');
                    return;
                }
            }
        }
        params = {
            name: values.name,
            description: values.description,
            ddo_jobtype_id: values.ddo_jobtype_id
        };
        form.reset();
        Ext.Ajax.request({
            url: '/jobtype',
            method: Ext.isEmpty(values.ddo_jobtype_id) ? 'POST' : 'PUT',
            params: params,
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
    },
    onGridDeleteClick: function() {
        var view = this.getView(),
            grid = view.down('grid'),
            gridStore = grid.getStore(),
            rec = gridStore.getAt(rowIndex),
            //find alt of rowIndex
            params;
        params = {
            ddo_jobtype_id: rec.get('ddo_jobtype_id')
        };
        Ext.Ajax.request({
            url: '/jobtype',
            method: 'DELETE',
            params: params,
            success: function(resp, b) {
                gridStore.removeAt(rowIndex);
                gridStore.reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });
    }
});

Ext.define('TalentAcquisition.view.jobtype.JobTypeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jobtypeviewmodel'
});

Ext.define('TalentAcquisition.view.jobtype.JobType', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobtypeview',
    requires: [
        'TalentAcquisition.view.jobtype.JobTypeForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobtype.JobTypeGrid',
        'TalentAcquisition.view.jobtype.JobTypeController',
        'TalentAcquisition.view.jobtype.JobTypeViewModel',
        'TalentAcquisition.store.jobtype.JobTypeStore'
    ],
    controller: 'jobtypecontroller',
    viewModel: {
        type: 'jobtypeviewmodel'
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Job Type',
            grid: 'jobtypegrid',
            gridStore: Ext.create('TalentAcquisition.store.jobtype.JobTypeStore'),
            form: 'jobtypeform',
            fbButtonRequired: true
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('jobtypegrid').getStore().load();
        }
    }
});

Ext.define('TalentAcquisition.view.referemployee.ReferEmployeeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.referemployeeform',
    defaults: {
        width: '100%'
    },
    cls: 'ta-header',
    title: 'Employee Referral Form',
    padding: 20,
    scrollable: true,
    bigForm: true,
    hideButton: true,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    tools: [
        {
            xtype: 'button',
            scale: 'medium',
            iconCls: 'goalsbackbtn-cls',
            cls: 'back-btn-cls',
            style: {
                'border': 0
            },
            handler: 'onBackButtonClick'
        }
    ],
    bbar: {
        cls: 'appwindow-cls',
        layout: {
            type: 'hbox'
        },
        padding: '25 0 21 0',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'onCancelBtnClick'
            },
            {
                xtype: 'button',
                text: 'Refer',
                cls: 'app-window-save-btn',
                formBind: true,
                //handler: 'eastContainerCollapse',
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                padding: 10,
                xtype: 'textfield',
                cls: 'rule-name-cls',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                msgTarget: 'side'
            },
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobopenings_id'
                },
                {
                    hidden: false,
                    submitValue: false,
                    name: 'name',
                    //allowBlank: false,
                    columnWidth: 0.5,
                    fieldLabel: 'Job Opening'
                },
                {
                    fieldLabel: 'Main skill',
                    name: 'primaryskills',
                    allowBlank: false,
                    columnWidth: 0.5,
                    emptyText: 'Enter user skills here'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Candidate Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        padding: 10,
                        xtype: 'textfield',
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            fieldLabel: 'Name',
                            name: 'candidatename',
                            allowBlank: false,
                            // vtype: 'alphanum',
                            columnWidth: 0.5,
                            emptyText: 'Please enter user name'
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'email',
                            vtype: 'email',
                            allowBlank: false,
                            columnWidth: 0.5,
                            emptyText: 'user@example.com'
                        },
                        {
                            fieldLabel: 'Phone',
                            name: 'phone',
                            xtype: 'numberfield',
                            columnWidth: 0.5,
                            allowBlank: false,
                            minValue: 0,
                            //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            maxLength: 12,
                            minLength: 10,
                            regex: /^[0-9]*$/i,
                            invalidText: "Please enter valid data",
                            mouseWheelEnabled: false,
                            emptyText: 'Please enter mobile number'
                        },
                        {
                            fieldLabel: 'Location',
                            name: 'location',
                            allowBlank: false,
                            columnWidth: 0.5,
                            emptyText: 'Please enter location'
                        },
                        {
                            xtype: 'form',
                            columnWidth: 0.49,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    anchor: '100%',
                                    xtype: 'filefield',
                                    opType: 'upload',
                                    name: 'feedsImage',
                                    buttonOnly: true,
                                    buttonConfig: {
                                        cls: 'request-access-btn',
                                        width: "100%",
                                        text: 'Browse doc, pdf extension files only'
                                    },
                                    bind: {
                                        readOnly: '{joiend}'
                                    },
                                    listeners: {
                                        change: 'onCVupload'
                                    },
                                    fieldLabel: "Upload CV :"
                                }
                            ]
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'curriculumvitae'
                        },
                        {
                            fieldLabel: 'How do you know this person ?',
                            name: 'relation',
                            beforeLabelTextTpl: '',
                            columnWidth: 1,
                            xtype: "textarea"
                        },
                        {
                            fieldLabel: 'Recommendation',
                            name: 'recommendation',
                            beforeLabelTextTpl: '',
                            columnWidth: 1,
                            xtype: "textarea"
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.referemployee.ReferEmployeeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.referemployeegrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.jobopenings.JobOpeningsStore'
    ],
    tbar: {
        height: 30,
        layout: {
            type: 'hbox'
        },
        items: [
            {
                xtype: 'tbspacer',
                width: '70%'
            },
            {
                xtype: 'label',
                html: '<b>Job not listed? </b>'
            },
            // <span style="font-size:17px;>
            {
                xtype: 'button',
                text: '<font color="blue"><b>Enter details</font>',
                handler: 'onEnterCandidateDetailsBtnClick'
            }
        ]
    },
    //scale: 'large',
    //cls: 'back-btn-cls'
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Job Name',
            dataIndex: 'name',
            flex: 0.3,
            height: 42,
            filter: {
                type: 'string',
                itemDefaults: {
                    emptyText: 'Search...'
                }
            }
        },
        {
            text: 'Department',
            dataIndex: 'ddo_department_name',
            flex: 0.4,
            hidden: true
        },
        {
            text: 'Location',
            dataIndex: 'ddo_joblocation_name',
            flex: 0.4
        },
        {
            text: 'Designation',
            dataIndex: 'ddo_designation_name',
            flex: 0.4
        },
        {
            text: 'Qualification',
            dataIndex: 'ddo_jobeducation_name',
            flex: 0.4
        },
        {
            text: 'Total Experience',
            dataIndex: 'totalexperience',
            flex: 0.4
        },
        {
            text: 'Open Positions',
            dataIndex: 'openpositions',
            flex: 0.4
        },
        {
            text: 'Responsibilities',
            dataIndex: 'responsibilities',
            hidden: true,
            flex: 0.4
        },
        {
            text: 'Skills',
            dataIndex: 'primaryskills',
            flex: 0.4
        },
        {
            text: 'Status',
            dataIndex: 'jobstatus',
            flex: 0.4
        },
        {
            xtype: 'widgetcolumn',
            width: 150,
            align: 'center',
            widget: {
                xtype: 'button',
                text: 'Refer a friend',
                cls: 'request-access-btn',
                tooltip: 'Refer a friend',
                handler: 'onReferAnEmployeeBtnClick'
            }
        }
    ]
});

Ext.define('TalentAcquisition.view.referemployee.ReferEmployeeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.referemployeecontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onReferAnEmployeeBtnClick: function(view, rowIndex, colIndex, item, e, record, row) {
        this.onSetActiveItem(1);
        var activeItem = this.onGetActiveItem(),
            formData = view.$widgetRecord.data,
            form = activeItem.getForm();
        form.setValues(formData);
        activeItem.down('textfield[name=name]').show();
        activeItem.down('textfield[name=name]').setEditable(false);
        activeItem.down('textfield[name=primaryskills]').setEditable(false);
    },
    onEnterCandidateDetailsBtnClick: function(view, rowIndex, colIndex, item, e, record, row) {
        this.onSetActiveItem(1);
        var activeItem = this.onGetActiveItem();
        activeItem.down('textfield[name=name]').hide();
        activeItem.down('textfield[name=name]').setEditable(true);
        activeItem.down('textfield[name=primaryskills]').setEditable(true);
    },
    onCancelBtnClick: function(btn, ent) {
        var me = this,
            view = me.getView(),
            form = view.down('form');
        form.reset() , this.onSetActiveItem(0);
    },
    onBackButtonClick: function(btn, ent) {
        this.onSetActiveItem(0);
        this.getView().down('referemployeeform').reset();
    },
    onSetActiveItem: function(item) {
        var me = this;
        me.getView().getLayout().setActiveItem(item);
    },
    onGetActiveItem: function() {
        var me = this;
        return me.getView().getLayout().getActiveItem();
    },
    onFormSaveClick: function() {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid');
        form.reset();
        Ext.Ajax.request({
            url: '/employeereferral',
            method: 'POST',
            params: values,
            success: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                grid.getStore().reload();
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
                me.onSetActiveItem(0);
            },
            failure: function(resp, b) {
                var data = Ext.decode(resp.responseText);
                Ext.getBody().unmask();
                Ext.toast(data.message, false, 't');
            }
        });
    },
    onCVupload: function(filefield, value, eOpts) {
        var me = this,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = value,
            reader = new FileReader(),
            format = file.type,
            form = filefield.up('form'),
            curriculumvitaeField = form.up('form').down('hiddenfield[name=curriculumvitae]');
        reader.onload = function() {
            if (format == "application/msword" || format == "application/pdf" || format == "application/doc" || format == "application/docx" || format == "application/txt" || format == "application/wps" || format == "application/odt" || format == "application/wpd" || format == "application/rtf") {
                /**
                 * Docx format preventing due to stored file format issue (Storing like a zip file on server)
                 * format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                 */
                form.submit({
                    url: '/feed/feedsPostedPics',
                    waitMsg: 'Uploading your cv...',
                    success: function(res, msg) {
                        var text = Ext.JSON.decode(msg.response.responseText),
                            pathImg = text.data;
                        curriculumvitaeField.setValue(pathImg);
                        Ext.toast({
                            html: 'File uploaded successfully',
                            width: 150,
                            align: 't'
                        });
                    },
                    // iconsViewStore.add({
                    //     name: '',
                    //     imagepath: pathImg,
                    //     ddo_karmarating_id: Ext.id()
                    // });
                    // filefield.setDisabled(true);
                    failure: function(res) {
                        Ext.toast({
                            html: 'File not loaded',
                            width: 150,
                            align: 't'
                        });
                    }
                });
            } else {
                Ext.toast({
                    html: 'Invalid Format',
                    width: 150,
                    align: 't'
                });
            }
        };
        reader.readAsDataURL(file);
    }
});

Ext.define('TalentAcquisition.view.referemployee.ReferEmployeeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.referemployeeviewmodel'
});

Ext.define('TalentAcquisition.view.referemployee.ReferEmployee', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.referemployeeview',
    requires: [
        'TalentAcquisition.view.referemployee.ReferEmployeeForm',
        'TalentAcquisition.view.referemployee.ReferEmployeeGrid',
        'TalentAcquisition.view.referemployee.ReferEmployeeController',
        'TalentAcquisition.view.referemployee.ReferEmployeeViewModel'
    ],
    //'TalentAcquisition.store.referemployee.ReferEmployeeStore'
    // title: 'Refer a Friend',
    controller: 'referemployeecontroller',
    viewModel: {
        type: 'referemployeeviewmodel'
    },
    layout: {
        type: "card",
        activeItem: 0
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Job Openings',
            grid: 'referemployeegrid',
            gridStore: Ext.create('TalentAcquisition.store.jobopenings.JobOpeningsStore'),
            filterData: [
                {
                    name: "Job Name",
                    value: "name"
                },
                {
                    name: "Location",
                    value: "ddo_joblocation_name"
                },
                {
                    name: "Designation",
                    value: "ddo_designation_name"
                },
                {
                    name: "skills",
                    value: "primaryskills"
                },
                {
                    name: "status",
                    value: "jobstatus"
                }
            ],
            fbButtonRequired: false
        },
        {
            xtype: "referemployeeform"
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('[name=filterColumn]').reset();
        }
    }
});

Ext.define('TalentAcquisition.view.referemployee.myreferrals.MyReferralsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.myreferralsgrid',
    title: 'My Referrals',
    cls: 'karmalist-cls ta-header',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.employeereferral.MyReferralsStore'
    ],
    height: 500,
    width: '100%',
    store: Ext.create('TalentAcquisition.store.employeereferral.MyReferralsStore'),
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Job Opening',
            dataIndex: 'ddo_jobopenings_name',
            flex: 0.3
        },
        {
            text: 'Candidate Name',
            dataIndex: 'candidatename',
            flex: 0.4
        },
        {
            text: 'email',
            dataIndex: 'email',
            flex: 0.4
        },
        {
            text: 'Phone',
            dataIndex: 'phone',
            flex: 0.4
        },
        {
            text: 'Location',
            dataIndex: 'location',
            flex: 0.4
        },
        {
            text: 'Status',
            dataIndex: 'ddo_jobapplicationstatus_name',
            flex: 0.4,
            renderer: function(val) {
                return Ext.isEmpty(val) ? 'Processing' : val;
            }
        },
        {
            text: 'Referred By',
            dataIndex: 'referredby_name',
            hidden: true,
            flex: 0.4
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            var store = this.getStore();
            var loggedInEmployeeId = Ext.getStore('login').data.items[0].getData().ddo_employee_id;
            store.load();
            store.filter([
                {
                    property: 'referredby',
                    value: loggedInEmployeeId
                }
            ]);
        }
    }
});

Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.referredemployeeviewmodel',
    data: {
        portal: true,
        consultency: true,
        reffredBy: true,
        joiend: false
    }
});

Ext.define('TalentAcquisition.view.referemployee.referredemployee.ConvertToApplicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.converttoapplicationcontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onFormSaveClick: function() {
        var form = this.getView(),
            values = form.getValues();
        form.reset();
        if (Ext.isEmpty(values.ddo_jobapplications_id)) {
            delete values.ddo_jobapplications_id;
        }
        Ext.Ajax.request({
            url: '/jobapplications',
            method: Ext.isEmpty(values.ddo_jobapplications_id) ? 'POST' : 'PUT',
            params: values,
            success: function(resp, b) {
                //grid.getStore().reload();
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
                form.up().setActiveItem(0);
                form.up('referredemployeeview').down('[name=referredEmployeeCollCon]').down('[name=eastpanel]').toggleCollapse();
            },
            failure: function(resp, b) {
                Ext.getBody().unmask();
                var data = Ext.decode(resp.responseText);
                Ext.toast(data.message, false, 't');
            }
        });
    },
    onCancelClick: function() {
        var view = this.getView();
        view.up().setActiveItem();
    },
    /**
     * This is the handler for the filefield change event.
     * for upload the icons.
     * @param filefield The filefield reference.
     * @param value :  string,The file value returned by the underlying file input field.
     * @param eOpts : Object.
     *
     */
    onCVupload: function(filefield, value, eOpts) {
        var me = this,
            file = filefield.fileInputEl.dom.files[0],
            fileValue = value,
            reader = new FileReader(),
            format = file.type,
            form = filefield.up('form'),
            curriculumvitaeField = form.up('form').down('hiddenfield[name=curriculumvitae]');
        reader.onload = function() {
            if (format == "application/msword" || format == "application/pdf" || format == "application/doc" || format == "application/docx" || format == "application/txt" || format == "application/wps" || format == "application/odt" || format == "application/wpd" || format == "application/rtf") {
                /**
                 * Docx format preventing due to stored file format issue (Storing like a zip file on server)
                 * format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                 */
                form.submit({
                    url: '/feed/feedsPostedPics',
                    waitMsg: 'Uploading your cv...',
                    success: function(res, msg) {
                        var text = Ext.JSON.decode(msg.response.responseText),
                            pathImg = text.data;
                        curriculumvitaeField.setValue(pathImg);
                        Ext.toast({
                            html: 'File uploaded successfully',
                            width: 150,
                            align: 't'
                        });
                    },
                    // iconsViewStore.add({
                    //     name: '',
                    //     imagepath: pathImg,
                    //     ddo_karmarating_id: Ext.id()
                    // });
                    // filefield.setDisabled(true);
                    failure: function(res) {
                        Ext.toast({
                            html: 'File not loaded',
                            width: 150,
                            align: 't'
                        });
                    }
                });
            } else {
                Ext.toast({
                    html: 'Invalid Format',
                    width: 150,
                    align: 't'
                });
            }
        };
        reader.readAsDataURL(file);
    }
});

Ext.define('TalentAcquisition.view.referemployee.referredemployee.ConvertToApplication', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobeducation.JobEducationStore',
        'TalentAcquisition.store.jobapplicationstatus.JobApplicationStatusStore',
        'TalentAcquisition.store.jobsource.JobSourceStore',
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore',
        'TalentAcquisition.store.ReportingsStore',
        'TalentAcquisition.store.jobopenings.JobOpeningsStore',
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeViewModel',
        'TalentAcquisition.view.referemployee.referredemployee.ConvertToApplicationController'
    ],
    alias: 'widget.converttoapplication',
    bigForm: true,
    //padding: 20,
    title: 'Convert To Application',
    cls: 'ta-header',
    defaults: {
        width: '100%'
    },
    viewModel: {
        type: 'referemployeeviewmodel'
    },
    controller: 'converttoapplicationcontroller',
    scrollable: true,
    bbar: {
        cls: 'appwindow-cls',
        layout: {
            type: 'hbox'
        },
        padding: '25 0 21 0',
        items: [
            {
                xtype: 'button',
                text: 'Cancel',
                cls: 'app-window-cancel-btn',
                handler: 'onCancelClick'
            },
            {
                xtype: 'button',
                text: 'Save',
                cls: 'app-window-save-btn',
                formBind: true,
                //handler: 'eastContainerCollapse',
                listeners: {
                    click: 'onFormSaveClick'
                }
            }
        ]
    },
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                cls: 'rule-name-cls',
                padding: 10,
                msgTarget: 'side'
            },
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobapplications_id'
                },
                {
                    xtype: 'combobox',
                    columnWidth: 0.5,
                    fieldLabel: 'Job Opening',
                    allowBlank: false,
                    store: 'jobopeningsstores',
                    editable: false,
                    forceSelection: true,
                    displayField: 'name',
                    valueField: 'ddo_jobopenings_id',
                    name: 'ddo_jobopenings_id',
                    listeners: {
                        beforequery: function(qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Candidate Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        // labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'First Name',
                            name: 'firstname',
                            allowBlank: false,
                            columnWidth: 0.5
                        },
                        {
                            fieldLabel: 'Middle Name',
                            xtype: 'textfield',
                            name: 'middlename',
                            beforeLabelTextTpl: '',
                            columnWidth: 0.5
                        },
                        {
                            fieldLabel: 'Last Name',
                            xtype: 'textfield',
                            name: 'lastname',
                            allowBlank: false,
                            columnWidth: 0.5
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: "Father's name",
                            name: 'fathersname',
                            beforeLabelTextTpl: '',
                            columnWidth: 0.5
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Highest Education',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            store: 'jobeducationstore',
                            displayField: 'name',
                            valueField: 'ddo_jobeducation_id',
                            name: 'ddo_jobeducation_id',
                            allowBlank: false,
                            columnWidth: 0.5,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Year of Passing',
                            name: 'yearofpassing',
                            allowBlank: false,
                            columnWidth: 0.5,
                            maxValue: new Date()
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Skill Type',
                            editable: false,
                            store: {
                                type: 'jobopeningsstore'
                            },
                            displayField: 'primaryskills',
                            valueField: 'primaryskills',
                            name: 'skilltype',
                            columnWidth: 0.5,
                            allowBlank: false
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Communication Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Mobile Number',
                            name: 'mobilenumber',
                            columnWidth: 0.5,
                            allowBlank: false,
                            minValue: 0,
                            //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            maxLength: 12,
                            minLength: 10,
                            regex: /^[0-9]*$/i,
                            invalidText: "Please enter valid data",
                            enforceMaxLength: 10,
                            emptyText: 'Enter mobile number '
                        },
                        {
                            fieldLabel: 'Email',
                            xtype: 'textfield',
                            name: 'email',
                            vtype: 'email',
                            columnWidth: 0.5,
                            allowBlank: false
                        },
                        {
                            fieldLabel: 'Address',
                            xtype: 'textarea',
                            name: 'address',
                            columnWidth: 0.5,
                            allowBlank: false
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Other Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Current City',
                            name: 'currentcity',
                            columnWidth: 0.5
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Current Employment Status',
                            editable: false,
                            name: 'currentemploymentstatus',
                            store: [
                                "Employed",
                                "Not Employed"
                            ],
                            displayField: 'name',
                            valueField: 'name',
                            columnWidth: 0.5
                        },
                        {
                            fieldLabel: 'Previous Company',
                            xtype: 'textfield',
                            name: 'previouscompany',
                            columnWidth: 0.5
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            minValue: 0,
                            maxLength: 4,
                            fieldLabel: "Total Experience (Years)",
                            name: 'totalexperience',
                            columnWidth: 0.5
                        },
                        {
                            fieldLabel: 'ID. Proof',
                            xtype: 'textfield',
                            name: 'idproof',
                            //allowBlank: false,
                            columnWidth: 0.5
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ID. Proof Number',
                            name: 'idproofnumber',
                            columnWidth: 0.5
                        },
                        {
                            fieldLabel: 'Available From',
                            xtype: 'datefield',
                            name: 'availablefrom',
                            columnWidth: 0.5
                        },
                        {
                            fieldLabel: 'Applied On',
                            xtype: 'datefield',
                            name: 'appliedon',
                            columnWidth: 0.5
                        },
                        {
                            fieldLabel: 'Notice Period (Days)',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            columnWidth: 0.5,
                            minValue: 0,
                            maxLength: 3,
                            minLength: 1,
                            regex: /^[0-9]*$/i,
                            invalidText: "Please enter valid data",
                            name: 'noticeperiodindays'
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.5,
                            allowBlank: false,
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            name: 'ddo_designation_id',
                            fieldLabel: 'Requested Designation',
                            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                            store: {
                                type: 'designationstore',
                                autoLoad: 'true'
                            },
                            displayField: 'name',
                            valueField: 'ddo_designation_id',
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Hiring Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        // width: '50%',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Recruiter',
                            store: {
                                type: 'reportingsstore'
                            },
                            columnWidth: 0.5,
                            allowBlank: false,
                            name: 'recruitedby',
                            displayField: 'empname',
                            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                            valueField: 'empid',
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.5,
                            fieldLabel: 'Status',
                            store: 'jobapplicationstatusstore',
                            displayField: 'name',
                            allowBlank: false,
                            beforeLabelTextTpl: '<span class="ta-mandatory-field-cls">*</span>',
                            valueField: 'ddo_jobapplicationstatus_id',
                            name: 'ddo_jobapplicationstatus_id',
                            editable: false,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Hiring Source',
                            store: 'jobsourcestores',
                            name: 'ddo_jobsource_id',
                            displayField: 'name',
                            valueField: 'ddo_jobsource_id',
                            editable: false,
                            columnWidth: 0.5,
                            listeners: {
                                change: function(me, newdata, olddata) {
                                    var parentView = this.up('referredemployeeview'),
                                        viewmodel;
                                    if (!Ext.isEmpty(parentView)) {
                                        viewmodel = parentView.getViewModel();
                                        if (me.getRawValue() == "Job Portal") {
                                            viewmodel.set('portal', false);
                                            viewmodel.set('consultency', true);
                                            viewmodel.set('reffredBy', true);
                                        } else if (me.getRawValue() == "Consultancy") {
                                            viewmodel.set('portal', true);
                                            viewmodel.set('consultency', false);
                                            viewmodel.set('reffredBy', true);
                                        } else if (me.getRawValue() == "Referred by employee") {
                                            viewmodel.set('portal', true);
                                            viewmodel.set('consultency', true);
                                            viewmodel.set('reffredBy', false);
                                        }
                                        viewmodel.notify();
                                    }
                                }
                            }
                        }
                    ]
                },
                /*, {
                    xtype: 'form',
                    columnWidth:0.5,
                    items:[{
                        anchor: '100%',
                        xtype: 'filefield',
                        opType: 'upload',
                        name: 'feedsImage',
                        buttonOnly: true,
                        buttonConfig: {
                             cls: 'request-access-btn',
                             width: "100%",
                             text: 'Browse doc, pdf extension files only'
                        },
                        listeners: {
                            change: 'onCVupload'
                        },
                        fieldLabel: "Upload CV :",
                    }]
                }*/
                {
                    xtype: 'hiddenfield',
                    name: 'curriculumvitae'
                },
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        labelWidth: '25%',
                        cls: 'ta-search-field',
                        padding: 10,
                        msgTarget: 'side'
                    },
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Referred By',
                            store: {
                                type: 'reportingsstore'
                            },
                            name: 'referredby',
                            bind: {
                                hidden: '{reffredBy}'
                            },
                            displayField: 'empname',
                            valueField: 'empid',
                            columnWidth: 0.5,
                            typeAhead: true,
                            typeAheadDelay: 50,
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforequery: function(qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Consultancy Name',
                            name: 'vendorname',
                            editable: false,
                            store: {
                                type: 'vendor'
                            },
                            bind: {
                                hidden: '{consultency}'
                            },
                            displayField: 'name',
                            columnWidth: 0.5,
                            valueField: 'ddo_jobsourcelines_id'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Job Portal Name',
                            editable: false,
                            name: 'jobportalname',
                            store: {
                                type: 'portal'
                            },
                            bind: {
                                hidden: '{portal}'
                            },
                            displayField: 'name',
                            columnWidth: 0.5,
                            valueField: 'ddo_jobsourcelines_id'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Comments',
                            columnWidth: 1,
                            name: 'comments'
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeForm', {
    extend: 'Ext.form.Panel',
    required: [
        'TalentAcquisition.store.jobapplication.JobApplicationStore'
    ],
    alias: 'widget.referredemployeeform',
    defaults: {
        // labelSeparator: '',
        width: '100%'
    },
    padding: 20,
    scrollable: true,
    hideButton: true,
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'stretch'
    },
    //
    bbar: {
        layout: {
            type: 'hbox'
        },
        cls: 'appwindow-cls',
        padding: '25 0 21 0',
        items: [
            {
                xtype: 'button',
                text: 'Reject',
                cls: 'app-window-cancel-btn',
                // handler: 'onFormSaveClick',
                listeners: {
                    click: 'onFormSaveClick'
                }
            },
            {
                xtype: 'button',
                text: 'Convert',
                cls: 'app-window-save-btn',
                handler: 'onConvertToApplication'
            }
        ]
    },
    items: [
        {
            xtype: 'container',
            defaults: {
                //labelSeparator: '',
                width: '50%',
                padding: 10,
                editable: false,
                xtype: 'textfield',
                cls: 'rule-name-cls'
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobopenings_id'
                },
                //
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_jobapplicationstatus_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'referredby'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'ddo_employeereferral_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'curriculumvitae'
                },
                {
                    name: 'ddo_jobopenings_name',
                    fieldLabel: 'Job Opening',
                    submitValue: false
                },
                {
                    fieldLabel: 'Main skill',
                    name: 'primaryskills'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Candidate Details',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        cls: 'ta-search-field',
                        width: '50%',
                        padding: 10,
                        editable: false,
                        xtype: 'textfield'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Name',
                            name: 'candidatename'
                        },
                        {
                            fieldLabel: 'Location',
                            name: 'location',
                            emptyText: 'location'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        //labelSeparator: '',
                        cls: 'ta-search-field',
                        width: '50%',
                        padding: 10,
                        msgTarget: 'side',
                        xtype: 'textfield',
                        editable: false
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Email',
                            name: 'email'
                        },
                        {
                            fieldLabel: 'Phone',
                            name: 'phone',
                            xtype: 'numberfield',
                            hideTrigger: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        editable: false,
                        width: '100%',
                        padding: 10,
                        cls: 'ta-search-field'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'How do you know this person',
                            name: 'relation',
                            xtype: "textarea"
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        width: '100%',
                        padding: 10,
                        cls: 'ta-search-field',
                        editable: false,
                        labelWidth: '20%'
                    },
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel: 'Recommendation',
                            name: 'recommendation',
                            xtype: "textarea"
                        }
                    ]
                }
            ]
        }
    ],
    /*{
            xtype: 'container',
            defaults: {
                width: '50%',
                padding: 10
            },

            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
            xtype: 'combobox',
            name: 'ddo_jobapplicationstatus_id',
            fieldLabel: 'Choose Status',
            cls: 'rule-name-cls',
            editable: false,
            store: {
                    type: 'jobapplicationstatusstore'
                },
                allowBlank: false,
            displayField: 'name',
            valueField: 'ddo_jobapplicationstatus_id'
        }{
           xtype: 'combobox',
           fieldLabel: 'Choose Status',
           store: new Ext.data.SimpleStore({
                   data: [
                       ["hold", 'On Hold'],
                       ["convert", 'Convert toApplication'],
                       ["refect", 'Reject']                 
                   ],
                   fields: ['value', 'text']
               }),
               valueField: 'value',
               name: 'ddo_jobapplicationstatus_id',
               displayField: 'text',
               triggerAction: 'all',
               editable: false
           }, {
                    xtype:'button',
                    text:'Convert to Application',
                    width: 300,
                    cls:'request-access-btn convert-to-app-btn',
                    //scale: 'medium',
                    margin: '0 0 0 50',
                    handler: 'onConvertToApplication'
                }]  
    }*/
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {}
    }
});
//this.down('referredemployeegrid').getStore().load();

Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.referredemployeegrid',
    cls: 'karmalist-cls',
    viewConfig: {
        loadMask: false
    },
    requires: [
        'TalentAcquisition.store.employeereferral.EmployeeReferralStore'
    ],
    height: 500,
    width: '100%',
    margin: '0 0 0 10',
    padding: '0px 10px 0px 0px',
    columns: [
        {
            text: 'Job Opening',
            dataIndex: 'ddo_jobopenings_name',
            flex: 0.3
        },
        {
            text: 'Name',
            dataIndex: 'candidatename',
            flex: 0.4
        },
        {
            text: 'email',
            dataIndex: 'email',
            flex: 0.4
        },
        {
            text: 'Phone',
            dataIndex: 'phone',
            flex: 0.4
        },
        {
            text: 'Location',
            dataIndex: 'location',
            flex: 0.4
        },
        {
            text: 'Referred By',
            dataIndex: 'referredby_name',
            flex: 0.4
        },
        {
            text: 'Status',
            dataIndex: 'ddo_jobapplicationstatus_name',
            flex: 0.4,
            renderer: function(val) {
                return Ext.isEmpty(val) ? 'Processing' : val;
            }
        }
    ],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});

Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.referredemployeecontroller',
    requires: [
        'TalentAcquisition.overrides.window.Toast'
    ],
    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm(),
            applicationStatus = record.getData().ddo_jobapplicationstatus_id;
        collapsiblecontainer = view.down('collapsiblecontainer') , eastpanel = collapsiblecontainer.down('[name=eastpanel]');
        form.setValues(record.data);
        var eastpanel = this.getView().down('collapsiblecontainer').down('[name=eastpanel]');
        this.getView().down('collapsiblecontainer').getViewModel().set('hideBtn', false);
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
        collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(true);
        if (!Ext.isEmpty(applicationStatus)) {
            var rejectBtn = view.down('form').down('button[text=Reject]'),
                convertBtn = view.down('form').down('button[text=Convert]');
            if (applicationStatus == 5) {
                Ext.Msg.alert('Info', 'You have already rejected this application');
                rejectBtn.disable();
                convertBtn.disable();
            } else {
                rejectBtn.enable();
                convertBtn.enable();
            }
        }
    },
    onConvertToApplication: function() {
        var view = this.getView();
        var values = view.down('collapsiblecontainer').down('referredemployeeform').getValues();
        var activeForm = view.setActiveItem(1);
        values.firstname = values.candidatename;
        values.mobilenumber = values.phone;
        values.ddo_jobapplicationstatus_id = '';
        activeForm.getForm().setValues(values);
    },
    eastContainerCollapse: function() {
        var view = this.getView(),
            collapsibleContainer = view.down('collapsiblecontainer');
        collapsibleContainer.down('button[iconCls=rule-plus]').disable();
        eastpanel = collapsibleContainer.down('[name=eastpanel]');
        view.down('form').reset();
        if (!Ext.isEmpty(eastpanel)) {
            eastpanel.toggleCollapse();
        }
    },
    onFormSaveClick: function() {
        var me = this,
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues(),
            grid = view.down('grid');
        // values.ddo_jobapplicationstatus_id = 5;
        var dd = Ext.getStore('jobapplicationstatusstore');
        dd.findExact('name', 'Offer Rejected');
        var kk = dd.findExact('name', 'Offer Rejected');
        var rec = Ext.getStore('jobapplicationstatusstore').getAt(kk);
        var status_id = rec.data.ddo_jobapplicationstatus_id;
        values.ddo_jobapplicationstatus_id = status_id;
        if (values.ddo_jobopenings_id == '0') {
            values.ddo_jobopenings_id = '';
        }
        Ext.Msg.confirm('Info.', 'Are you sure you want to reject this application?', function(choice) {
            if (choice === 'yes') {
                form.reset();
                Ext.Ajax.request({
                    url: '/employeereferral',
                    method: 'PUT',
                    params: values,
                    success: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        grid.getStore().reload();
                        Ext.getBody().unmask();
                        Ext.toast('The application has been rejected', false, 't');
                    },
                    //me.onSetActiveItem(0);
                    failure: function(resp, b) {
                        var data = Ext.decode(resp.responseText);
                        Ext.getBody().unmask();
                        Ext.toast(data.message, false, 't');
                    }
                });
                collapsibleContainer = view.down('collapsiblecontainer');
                eastpanel = collapsibleContainer.down('[name=eastpanel]');
                view.down('form').reset();
                if (!Ext.isEmpty(eastpanel)) {
                    eastpanel.toggleCollapse();
                }
            }
        });
    }
});

Ext.define('TalentAcquisition.view.referemployee.referredemployee.ReferredEmployee', {
    extend: 'Ext.container.Container',
    alias: 'widget.referredemployeeview',
    requires: [
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeForm',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeGrid',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeController',
        'TalentAcquisition.view.referemployee.referredemployee.ReferredEmployeeViewModel',
        'TalentAcquisition.store.employeereferral.EmployeeReferralStore',
        'TalentAcquisition.view.referemployee.referredemployee.ConvertToApplication'
    ],
    controller: 'referredemployeecontroller',
    viewModel: {
        type: 'referredemployeeviewmodel'
    },
    layout: {
        type: "card",
        activeItem: 0
    },
    items: [
        {
            xtype: 'collapsiblecontainer',
            mainContainerTitle: 'Referred Employees',
            name: 'referredEmployeeCollCon',
            grid: 'referredemployeegrid',
            gridStore: Ext.create('TalentAcquisition.store.employeereferral.EmployeeReferralStore'),
            form: 'referredemployeeform',
            bigForm: true,
            fbButtonRequired: false
        },
        {
            xtype: "converttoapplication"
        }
    ],
    listeners: {
        activate: function(newActiveItem, me, oldActiveItem, eOpts) {
            this.down('referredemployeegrid').getStore().load();
        }
    }
});

