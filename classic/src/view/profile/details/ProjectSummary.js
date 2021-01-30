/**
 * The file ProjectSummary is the view file for project summary in the profile view.
 * @extends {Ext.view.View}
 * @alias 'widget.projectsummary'
 */
Ext.define('DDO.view.profile.details.ProjectSummary', {
    extend: 'Ext.view.View',

    xtype: 'projectsummary',

    requires: [
        'DDO.store.profile.ProjectSummaryStore'
    ],

    cls: 'ddo-projectsummary-box',

    store: 'profile.ProjectSummaryStore',

    emptyText: LabelsTitles.PROFILE.SUMMARY.EMPTYTEXT,

    loadMask: false,

    margin: '20 0 0 0',

    tpl: [
        '<div class="ddo-project-summmary-header">Project Summary</div>',
        '<div class="ddo-project-summary-columns">',
            '<div class="ddo-project-summary-name-text">Name</div>',
            '<div class="ddo-project-summary-role-text">Role</div>',
            '<div class="ddo-project-summary-allocation-text">Allocation(%)</div>',
        '</div>',
        '<div class="project-summary-inner-scroll">',
            '<tpl for=".">',
                '<div class="ddo-project-summary-details">',
                    '<div data-qtip="{projectname}" class="ddo-project-summary-name">{project_name}</div>',
                    '<div data-qtip="{role}" class="ddo-project-summary-role">{project_role_name}</div>',
                    '<div class="ddo-project-summary-allocation">{allocpercent}</div>',
                    '</div>',
            '</tpl>',
        '</div>'
    ],
    itemSelector: 'div.ddo-project-summary-details'

    /*listeners: {
        itemclick: 'onProjectSummaryItemClick'
    }*/
});