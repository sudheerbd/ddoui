/**
 * The file ProjectApprovalViewModel is the viewmodel for the ProjectApproval view class.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.projectapprovalviewmodel'.
 */
Ext.define('DDO.view.projectapproval.ProjectApprovalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.projectapprovalviewmodel',
    requires: ['DDO.model.projectapproval.ProjectApproval'],
    stores: {
        //This store is used for Project approval grid.
        projectapprovalstore: {
            model: 'DDO.model.projectapproval.ProjectApproval',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: Api.URL.projectapproval.READ,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});
