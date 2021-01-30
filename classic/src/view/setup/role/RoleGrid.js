/**
*   This file is responsible for containing views of all available roles.
*   @extends {Ext.grid.Panel} - gridpanel.
*   ViewController : 'DDO.view.setup.role.RoleViewController'
*/
Ext.define('DDO.view.setup.role.RoleGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.rolegrid',
    cls: 'karmalist-cls',
    height: Constants.ViewportHeight*0.775,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    makeDirty:false,
    viewConfig: {
        loadMask: false
    },

    columns: [{
        text: LabelsTitles.EMPSETUP.ROLE.NAME,
        dataIndex: 'name',
        flex: 0.3,
        height: 42,
        sortable: true
    }, {
        text: LabelsTitles.EMPSETUP.ROLE.DESCRIPTION,
        dataIndex: 'description',
        flex: 0.7,
        sortable: true
    }],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});