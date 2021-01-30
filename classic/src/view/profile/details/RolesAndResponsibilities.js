/**
 * The file RolesAndResponsibilities is the view for roles and responsibilities for the user in the profiles view.
 */
Ext.define('DDO.view.profile.details.RolesAndResponsibilities', {
    extend: 'Ext.view.View',

    xtype: 'rolesandresponsibilities',
    cls: 'ddo-projectsummary-box',

    requires: [
        'DDO.store.aboutlist.AboutStore'
    ],
    store: 'aboutstore',

    emptyText:LabelsTitles.PROFILE.ROLESANDRESPONSIBILITIES.EMPTYTEXT ,

    loadMask: false,

    margin: '20 0 0 0',

    tpl: [
        '<div class="ddo-project-summmary-header">Roles And Responsibilities</div>',
        '<div class="project-summary-inner-scroll">',
        '<tpl for=".">',
        '<div class="ddo-app-summary-details">',

        '<div style="color:#9a9a9a;">{[this.responsibility(values)]}</div>',

        '</div>',
        '</tpl>',
        '</div>', {

            responsibility: function (values) {
                if (values.role_and_responsibility == 'null' || !values.role_and_responsibility) {
                    return 'No Roles and Responsibilities given';
                } else {
                    return values.role_and_responsibility;
                }
            }
        }
    ],
    itemSelector: 'div.ddo-project-summary-details',

});