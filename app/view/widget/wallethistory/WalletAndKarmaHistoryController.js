/**
 * This is controller for view 'DDO.view.widget.wallethistory.WalletAndKarmascoreHistory'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.walletkarmahistory'
 */
Ext.define('DDO.view.widget.wallethistory.WalletAndKarmaHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.walletkarmahistory',
    /**
     * The function onWindowOutsideTap is responsible for the window message box.
    * @param {Ext.event.Event} 'event'
    * @param {HTML element} 'target' the target of the event.
     */
    onWindowOutsideTap: function(event, target) {
        var view = this;
        if (Utility.nominatAlert) {
            Utility.onWindowOutterTap(event, target, view);
        }
    },
    /**
     * The function onDescClick is responsible to show the full description by doubleclicking on the grid cell.
     * @param {Ext.view.Table} 'grid'.
     * @param {HTMLElement} 'td'.
     * @param {Number} 'cellIndex'.
     * @param {Ext.data.Model} 'record'
     * @param {HTMLElement} 'tr'.
     * @param {Number} 'rowIndex'.
     * @param {Event} 'e'.
     * @param {object} 'eOpts' the options object passed.
     */
    onDescClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        try{
        if (td.cellIndex == 2 && record.data.description.length > 110) {
            var descWindow = Ext.ComponentQuery.query('walletdescwindow')[0] || Ext.create('DDO.view.widget.wallethistory.WalletDescriptionWindow');
            descWindow.setHtml("<div style='text-align: center;word-break: break-word;'>" + record.data.description + "</div>");
            descWindow.show();
            descWindow.setScrollable(true);
        } else {
            return;
        }
    }catch(err){
        Utility.showToast(Messages.USERPROFILE.KARMAWALLETHISTORY.DBCLICK, err);
    }
    }

});