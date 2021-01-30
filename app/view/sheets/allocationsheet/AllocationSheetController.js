/**
 * The file AllocationSheetController is the controller for 'DDO.view.dashboard.allocationsheet.AllocationSheetContainer'.
 */
Ext.define('DDO.view.sheets.allocationsheet.AllocationSheetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allocationsheetcontroller',
    /**
     Excel exporter for availabilitysheet
     AvailabilitySheet grid information can be download in .xls format.
     Used grid exporter plugin to convert format
     @param:{string}{btn} The scope of the button (defaults to current component)
     @param:{eve} Stop the event (`{@link #preventDefault}` and `{@link #stopPropagation}`)
     */
    /**
     * The function onDownloadExcelBtnClick is responsible to download the sheet in the .xls format.
     *  @param {Ext.button.Button} 'btn' when button is being clicked.
     *  @param {Event} 'evt' which is the click event.
     */
    onDownloadExcelBtnClick: function (btn, evt) {
        try {
            evt.stopEvent();
            var grid = btn.up('panel').down('grid');
            if (btn.up("allocationsheetcontainer")) {
                var xml = grid.getPlugin('exporter').getDocumentData({
                    title: "Allocation Sheet"
                })
            }else {
                var xml = grid.getPlugin('exporter').getDocumentData({
                    title: "Availability Sheet"
                });
            }
            var blob = new Blob([xml], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            // using thrid-party FileSaver.js to save it as xlsx
            if (btn.up("allocationsheetcontainer")) {
                saveAs(blob, 'AllocationSheet.xls');
            } else {
                saveAs(blob, 'AvailabilitySheet.xls');
            }

            return false;
        } catch (err) {
            Utility.showToast(Messages.ALLOCATION.TOAST.DOWNLOAD, err);
        }
    },
    /**
     * The function onmonthComboRender is responsible to set month value in the month combobox.
     * @param {Ext.Component} 'combo' which is the component of combobox.
     */
    onmonthComboRender: function (combo) {
        try {
            var view = this.getView();
            var store = view.down('[reference = monthcombo]').getStore();
            // debugger;
            currentMonth = parseInt(Ext.Date.format(new Date(), 'm'));
            combo.setValue(currentMonth);
        } catch (err) {
            Utility.showToast(Messages.ALLOCATION.TOAST.SELECTMONTH, err);
        }
    },
    /**
     * The function onYearComboRender is responsible to load the date in  the year combobox.
     * @param {Ext.Component} 'combo' which is the component of combobox.
     */
    onYearComboRender: function (combo) {
        try {
            var me = this;
            var view = me.getView();
            var fyearStore = combo.getStore();
            fyearStore.getProxy().setUrl(Api.URL.financialyear.READ);
            fyearStore.load({
                callback: function (val) {
                    var currentFinacialYear = fyearStore.findBy(function (record) {
                        return Ext.Date.between(new Date(), new Date(record.get('startdate')), new Date(record.get('enddate')));
                    });
                    if (currentFinacialYear != -1) {
                        combo.setValue(fyearStore.getAt(currentFinacialYear).get('ddo_fyear_id'));
                    }
                    me.beforeAllocationContainerRender(view)
                }
            });
        } catch (err) {
            Utility.showToast(Messages.ALLOCATION.TOAST.SELECTDATE, err);
        }
    },
    /**
     * The function onApplyBtnClick is responsible for the apply button to load the store.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     */
    onApplyBtnClick: function (btn) {
        var form = btn.up("form"),
            formValues = form.getValues();
        allocationView = this.getView().down("allocationsheet"),
            store = allocationView.getStore();
        store.getProxy().setExtraParams(formValues);
        store.load();
    },
    /**
     * The function onClearBtnClick is responsible to load the store when the reset button is clicked.
     * @param {Ext.button.Button} 'btn' when button is being clicked.
     */
    onClearBtnClick: function (btn) {
        try {
            var monthCombo = this.getView().lookupReference("monthcombo");
            var yearCombo = this.getView().lookupReference("yearcombo");
            this.onmonthComboRender(monthCombo);
            this.onYearComboRender(yearCombo);
            var btn = this.getView().lookupReference("applybtn");
            this.onApplyBtnClick(btn);
        } catch (err) {
            Utility.showToast(Messages.ALLOCATION.TOAST.STORELOAD, err);
        }
    },
    /**
     * The function beforeAllocationContainerRender is responsible for to load the store after modifying access records. 
     * @param {Ext.panel.Panel} 'view' which gets the view of 'DDO.view.dashboard.allocationsheet.AllocationSheetContainer'.
     */
    beforeAllocationContainerRender: function (view) {
        var allocationView = view || this.getView(),
            store = allocationView.getViewModel().get("allocation") || allocationView.getViewModel().getStore('allocation');
        var form = allocationView.down("form[name=allocationform]");
        var formValues = form.getValues();
        var monthCombo = allocationView.lookupReference("monthcombo");
        store.getProxy().setExtraParams(formValues);
        store.load();

    }
});