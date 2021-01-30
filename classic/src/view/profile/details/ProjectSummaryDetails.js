Ext.define('DDO.view.profile.details.ProjectSummaryDetails', {
    extend: 'Ext.view.View',
    xtype: 'projectsummarydetails',
    requires: [
        'DDO.store.profile.ProjectSummaryStore'
    ],
    cls: 'ddo-projectsummary-box',
    store: 'profile.ProjectSummaryStore',
    emptyText: '<div class="ddo-pro-summary-empty-text">No Projects Found</div>',
    loadMask: false,
    margin: '0 0 0 0',
    tpl: [
        '<div class="ddo-project-psummary-columns">',
            '<div class="ddo-project-summary-pname-text">Name</div>',
            '<div class="ddo-project-summary-prole-text">Role</div>',
            '<div class="ddo-project-summary-pallocation-text">Allocation(%)</div>',
            '<div class="ddo-project-summary-start-text">Start Date</div>',
            '<div class="ddo-project-summary-end-text">End Date</div>',
        '</div>',
        '<div class="project-summary-inner-scroll">',
            '<tpl for=".">',
                '<div class="ddo-project-psummary-details">',
                    '<div data-qtip="{projectname}" class="ddo-project-psummary-name">{project_name}</div>',
                    '<div data-qtip="{role}" class="ddo-project-psummary-role">{project_role_name}</div>',
                    '<div class="ddo-project-psummary-allocation">{allocpercent}</div>',
                    '<div data-qtip="{empname}" class="ddo-project-psummary-start-date">{[this.dateFormating(values)]}</div>',
                    '<div data-qtip="{projectname}" class="ddo-project-psummary-end-date">{[this.endDateFormat(values)]}</div>',
                    '</div>',
            '</tpl>',
        '</div>',
         {
            // Formatting date of timeline
            dateFormating: function(values) {
                var dt = new Date(values.startdate);
                return Ext.Date.format(dt, 'j M Y');
            },
            endDateFormat: function(values){
                var dt = new Date(values.enddate);
                return Ext.Date.format(dt, 'j M Y');
            }
        },
    ],
    itemSelector: 'div.ddo-project-summary-details'
});