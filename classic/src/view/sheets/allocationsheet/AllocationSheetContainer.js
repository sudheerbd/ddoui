/**
 * This file is responsible for the view of the AllocationSheet.
 * ViewModel : 'DDO.view.allocationsheet.AllocationSheetModel'.
 * ViewController : 'DDO.view.allocationsheet.AllocationSheetController'.
 */
Ext.define('DDO.view.sheets.allocationsheet.AllocationSheetContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'allocationsheetcontainer',
    requires: [
        'DDO.view.sheets.allocationsheet.AllocationSheetController',
        'DDO.view.sheets.allocationsheet.AllocationSheet',
        'DDO.view.sheets.allocationsheet.AllocationSheetModel',
        'DDO.store.setup.financialyear.FinancialYearStore',
    ],
    viewModel: {
        type: 'allocationsheetmodel'
    },
    controller:"allocationsheetcontroller",
    items: [{
        xtype: 'allocationsheet',
        bind: {
            store: '{allocation}'
        }
    }],
    header: {
        items: [
            {
            xtype:"form",
            layout:"hbox",
            name:"allocationform",
            items:[{
            xtype: 'combobox',
            emptyText: LabelsTitles.SHEETS.SELECTMONTH,
            bind: {
                store: '{allocationmonthstore}'
            },
            displayField:"month",
            name:"month",
            valueField:"id",
            margin:"0 10",
            // queryMode:'local',
            reference:"monthcombo",
            listeners: {
                afterRender:"onmonthComboRender"
            }
        },{
            xtype: 'combobox',
            emptyText: LabelsTitles.SHEETS.SELECTYEAR,
            name:"yearcombo",
            store:"setup.financialyear.FinancialYearStore",
            valueField:"ddo_fyear_id",
            displayField:"name",
           margin:"0 10",
           reference:"yearcombo",
           listeners: {
                beforerender:"onYearComboRender"
            }
        },{
            xtype: 'button',
            text: LabelsTitles.SHEETS.APPLY,
           margin:"0 10",
           reference:"applybtn",
           formBind:true,
            listeners: {
                click: 'onApplyBtnClick'
            }
        },{
            xtype: 'button',
            text: LabelsTitles.SHEETS.RESET,
            reference:"clearbtn",
            margin:"0 10",
            listeners: {
                click: 'onClearBtnClick'
            }
        }]},{
            xtype: 'button',
            // iconCls: 'x-fa fa-file-excel-o',
            html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22">',
            ui: 'plain',
            tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
            listeners: {
                click: 'onDownloadExcelBtnClick'
            }
        }, {
            xtype: 'tbspacer',
            width: 15
        }
    ]
    }
});
