/**
 * The file AppAccessSummary is the view for app access summary for the user in the profiles view.
 * @extends {Ext.view.View}.
 * @alias 'widget.appaccesssummary'
 */
Ext.define('DDO.view.profile.details.AppAccessSummary', {
    extend: 'Ext.view.View',

    xtype: 'appaccesssummary',

    requires: [
        'DDO.store.profile.AppAccessSummaryStore'
    ],

    cls: 'ddo-projectsummary-box',

    store: 'profile.AppAccessSummaryStore',

    emptyText: LabelsTitles.PROFILE.APPACCESS.EMPTYTEXT,

    loadMask: false,

    margin: '20 0 0 0',

    tpl: [
        '<div class="ddo-project-summmary-header">App Access Summary</div>',
        '<div class="project-summary-inner-scroll">',
            '<tpl for=".">',
                '<div class="ddo-app-summary-details">',

                   '<div data-qtip="{projectname}" class="ddo-app-summary-name">{appName}</div>',
                    '<div><span class="ddo-app-summary-role-text">Owner Name</span> : <span data-qtip="{appOwner.empname}" class="ddo-app-summary-owner">{appOwner.empname}</span></div>',
                    '<span class="ddo-app-summary-role-text">Period</span> : <span class="ddo-app-summary-owner"><span>{fromdate}</span>  to <span>{enddate}</span>',
                '</div>',
            '</tpl>',
        '</div>'
    ],
    itemSelector: 'div.ddo-project-summary-details'
});