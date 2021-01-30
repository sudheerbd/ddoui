Ext.define('DDO.view.profile.projectsummary.ProjectSummarywin', {
    extend: 'Ext.window.Window',
    requires: [
      'Ext.form.Panel',
      'Ext.form.RadioGroup',
      'DDO.ux.form.trigger.Clear',
      'DDO.view.profile.details.ProjectSummaryDetails'
    ],
    xtype: 'projectsummarywin',
    closable: true,
    width: Constants.ViewportWidth * 0.5,
    resizable: false,
    height: Constants.ViewportHeight * 0.56,
    constrain: true,
    modal: true,
    layout: 'fit',
    viewModel: {
      type: 'userprofile',
    },
    items: [{
      xtype: 'projectsummarydetails',
        width: '100%',
    }]
});