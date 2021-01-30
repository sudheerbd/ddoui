/**
 *   This file  is responsible for KarmaScoreFilterView.
 *   @extends {Ext.form.Panel}
 *   @alias widget.karmascorefilterview.
 *   ViewModel: 'DDO.view.karmascore.KarmaScoreViewModel'.
 *   ViewController :'DDO.view.karmascore.KarmaScoreViewController'.
 */
Ext.define('DDO.view.karmascore.KarmaScoreFilterView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.karmascorefilterview',
    cls: 'karmascorefilterview-cls',
    requires: [
        'DDO.ux.DateRangeField',
        'DDO.view.karmascore.AdvKarmaScoreSlider'
    ],
    initComponent: function() {
        this.callParent(arguments);
        var store = Ext.getStore('karmascore.DepartmentComboStore');
        if (!(store && store.isLoaded())) {
            store.load();
        }
    },
    margin: '25 0 0 0',
    defaults: {
        margin: '15 0 15 0',
        width: '100%',
        xtype: 'combobox'
    },
    items: [{
        xtype: 'label',
        text: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.FILTERS,
        cls: 'filters-label-cls'
    }, {
        xtype: 'advkarmascoreslider'
    }, {
        xtype: 'daterangefield',
        fieldLabel: '',
        reference: 'daterangeref',
        width: '100%',
        emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.DATARANGE,
        margin: 0,
        padding: '10 0 0 0',
        maxDate:new Date(),
        cls: 'daterange-cls daterange-extra-cls',
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                name: 'projectsorcustomers',
                weight: -2,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        listeners: {
            change: 'onDateRangeChange'
        }
    }, {
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                name: 'projectsorcustomers',
                weight: -2,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        emptyText:  LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.PROJECT,
        reference: 'ProjectsOrCustomers',
        pickerAlign: 'tl-bl',
        cls: 'karmascore-combobox',
        name: 'projectsOrCustomers',
        listConfig: {
            modal: true,
            cls: 'karmascore-list-cls'
        },
        displayField: 'name',
        valueField: 'project_id',
        editable: false,
        store: 'karmascore.ProjectComboStore',
        listeners: {
            select: 'onItemSelect'
        }
    }, {
        cls: 'karmascore-combobox',
        emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.PRIMARYSKILL,
        pickerAlign: 'tl-bl',
        reference: 'PrimarySkill',
        name: 'primarySkill',
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                name: 'projectsorcustomers',
                weight: -2,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        listConfig: {
            modal: true,
            cls: 'karmascore-list-cls'
        },
        displayField: 'name',
        valueField: 'ddo_skills_id',
        editable: false,
        store: 'karmascore.PrimarySkillsComboStore',
        listeners: {
            select: 'onItemSelect'
        }
    }, {
        cls: 'karmascore-combobox',
        emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.DEPARTMENT,
        pickerAlign: 'tl-bl',
        reference: 'Department',
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                name: 'projectsorcustomers',
                weight: -2,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        name: 'department',
        listConfig: {
            modal: true,
            cls: 'karmascore-list-cls'
        },
        displayField: 'name',
        valueField: 'ddo_department_id',
        editable: false,
        store: 'karmascore.DepartmentComboStore',
        listeners: {
            select: 'onItemSelect'
        }
    }, {
        cls: 'karmascore-combobox',
        emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.DESIGNATION,
        reference: 'Designation',
        pickerAlign: 'tl-bl',
        name: 'designation',
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                name: 'projectsorcustomers',
                weight: -2,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        listConfig: {
            modal: true,
            cls: 'karmascore-list-cls'
        },
        displayField: 'name',
        valueField: 'ddo_designation_id',
        editable: false,
        store: 'karmascore.DesignationComboStore',
        listeners: {
            select: 'onItemSelect'
        }
    }, {
        cls: 'karmascore-combobox',
        emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.SUPERVISOR,
        pickerAlign: 'tl-bl',
        reference: 'Supervisor',
        name: 'supervisor',
        triggers: {
            cancel: {
                cls: 'cancel-cls',
                name: 'projectsorcustomers',
                weight: -2,
                hidden: true,
                handler: 'onTriggerItemClick'
            }
        },
        listConfig: {
            modal: true,
            cls: 'karmascore-list-cls'
        },
        displayField: 'reportingempname',
        valueField: 'reportingempid',
        editable: false,
        store: 'karmascore.SupervisorComboStore',
        listeners: {
            select: 'onItemSelect'
        }
    }]
});
