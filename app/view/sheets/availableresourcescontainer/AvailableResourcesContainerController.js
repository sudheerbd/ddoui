/**
 * The file AvailableResourcesContainerController is controller for the 'DDO.view.sheets.AvailableResourcesContainer'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.availableresourcescontainercontroller'
 */
Ext.define('DDO.view.sheets.availableresourcescontainer.AvailableResourcesContainerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.availableresourcescontainercontroller',
    /**
     Excel exporter for availabilitysheet
     AvailabilitySheet grid information can be download in .xls format.
     Used grid exporter plugin to convert format
     @param:{string}{btn} The scope of the button (defaults to current component)
     @param:{eve} Stop the event (`{@link #preventDefault}` and `{@link #stopPropagation}`)
     */

    onDownloadExcelBtnClick: function(btn, evt) {
        evt.stopEvent();
        var grid = btn.up('panel').down('grid');
        var bench = btn.up('benchview');
        var sheetName = LabelsTitles.SHEETS.AVAILABILITYSHEETNAME,
            sheetTitle = LabelsTitles.SHEETS.AVAILABILITYSHEETTITLE;
        if(bench){
            sheetName = LabelsTitles.SHEETS.BENCHSHEETNAME;
            sheetTitle = LabelsTitles.SHEETS.BENCHSHEETTITLE;
        }
        var xml = grid.getPlugin('exporter').getDocumentData({
            title: sheetTitle
        }); //getExcelData(false, true);
        var blob = new Blob([xml], {
            type: LabelsTitles.SHEETS.BLOBTYPE
        });
        // using thrid-party FileSaver.js to save it as xlsx
        saveAs(blob, sheetName+'.xls');

        return false;
    }
});