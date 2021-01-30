/**
 * @class AvailableResources
 * This file acts as a container for the panel for availableresources as putting the panel directly was causing problem for locked column in the 
 * grid of available resources grid. . 
 * @extends Ext.panel.Panel
 * @alias widget.availableresourcescontainer
 * ViewController : 'DDO.view.sheets.availableresourcescontainer.AvailableResourcesContainerController'
 */
Ext.define('DDO.view.sheets.AvailableResourcesContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'availableresourcescontainer',
    requires: [
        'DDO.view.sheets.availableresourcescontainer.AvailableResourcesContainerController'
    ],
    controller: 'availableresourcescontainercontroller',
    header: {
        items: [{
            xtype: 'button',
            html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22">',
            // iconCls: 'x-fa fa-file-excel-o',
            ui: 'plain',
            tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
            listeners: {
                click: 'onDownloadExcelBtnClick'
            }
        }, {
            xtype: 'tbspacer',
            width: 15
        }]
    }
});
