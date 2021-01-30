/**
 * The file DesignationGrid is the grid view of the DDO.view.setup.designation.Designation
 * @extends {Ext.grid.Panel}
 * @alias widget.designationgrid.
 * ViewController : 'DDO.view.setup.designation.DesignationViewController'.
 */
Ext.define('DDO.view.setup.designation.DesignationGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.designationgrid',

    cls: 'karmalist-cls',
    
    viewConfig: {
        loadMask: false
    },
    height : Constants.ViewportHeight * 0.78,
    width: '100%',
    margin: '0 0 0 10',
    padding:'0px 10px 0px 0px',
    makeDirty:false,
    columns: [{
        text: LabelsTitles.EMPSETUP.DESIGNATION.NAME,
        dataIndex: 'name',
        flex: 0.25,
        height: Constants.ViewportHeight * 0.07
    }, {
        text: LabelsTitles.EMPSETUP.DESIGNATION.DESCRIPTION,
        dataIndex: 'description',
        flex: 0.25
    },{
        text: LabelsTitles.EMPSETUP.DESIGNATION.ACRONYM,
        dataIndex: 'acronym',
        flex: 0.15
    },{
        text: LabelsTitles.EMPSETUP.DESIGNATION.RESPONSIBILITIES,
        dataIndex: 'role_and_responsibility',
        flex:0.35
    }],
    listeners: {
        rowdblclick: 'onGridRowClick'
    }
});