/**
 * @class AvailableResources
 * This file holds the class for the the panel where the grid for Available Resources will be displayed.
 * @extends Ext.grid.Panel
 * @alias widget.availableresources
 * ViewModel : 'DDO.view.sheets.availableresources.AvailableResourcesModel'.
 * ViewController : 'DDO.view.sheets.availableresources.AvailableResourcesController'.
 */
Ext.define('DDO.view.sheets.AvailableResources', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.availableresources',

    requires: [
        'Ext.ux.CheckColumn',
        'Ext.grid.filters.Filters',
        'Ext.grid.plugin.Exporter',
        'DDO.view.sheets.availableresources.AvailableResourcesController',
        'DDO.view.sheets.availableresources.AvailableResourcesModel'
    ],

    controller: 'availableresourcescontroller',

    viewModel: {
        type: 'availableresourcesmodel'
    },

    viewConfig: {
        loadMask: false
    },
    verticalScrollerType: 'paginggridscroller',
    loadMask: true,
    invalidateScrollerOnRefresh: false,
    plugins: [
        'gridfilters', {
            ptype: 'gridexporter',
            pluginId: 'exporter'
        }
    ],

    features: [{
        ftype: 'grouping'
    }],

    headerBorders: false,
    cls: 'ddo-dashboard-grid',
    viewConfig: {
        listeners: {
            refresh: function(dataview) {
                Ext.each(dataview.panel.columns, function(column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                })
            }
        }
    },

    columns: [{
        text: DDO.util.LabelsTitles.SNO,
        xtype: 'rownumberer',
        align: 'left',
        //locked: true,
        width: Constants.ViewportWidth*0.044,
    }, {
        text: DDO.util.LabelsTitles.EMPLOYEEID,
        dataIndex: 'employee_code',
        width: Constants.ViewportWidth*0.074,
        //locked: true,
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.SHEETS.BENCHFACTOR,
        align: 'left',
        dataIndex:'availability',
        width:  Constants.ViewportWidth*0.074
    },{
        text: DDO.util.LabelsTitles.NAME,
        dataIndex: 'employee',
        //locked: true,
        width: Constants.ViewportWidth*0.15,
        filter: {
            type: 'string'
        }
    }, {
        text: DDO.util.LabelsTitles.TECHNOLOGIES,
        dataIndex: 'technologies',
        //autoSizeColumn: true,
        width: Constants.ViewportWidth*0.15,
        filter: {
            type: 'string'
        }
    }, {
        text: DDO.util.LabelsTitles.PRIMARYSKILL,
        dataIndex: 'skillname',
        width: Constants.ViewportWidth*0.08,
        filter: {
            type: 'string'
        }
    }, {
        text: DDO.util.LabelsTitles.DESIGNATION,
        dataIndex: 'hr_designation',
        width: Constants.ViewportWidth*0.15,
        filter: 'list'
    }, {
        text: DDO.util.LabelsTitles.EXPERIENCELEVEL,
        dataIndex: 'empexperience'
    }, {
        text: DDO.util.LabelsTitles.YEARSINWTC,
        dataIndex: 'currentexperience',
        filter: {
            type: 'string'
        }
    }, {
        text: DDO.util.LabelsTitles.AVAILABLEFROM,
        dataIndex: 'availablefrom',
        //  xtype:'datecolumn', 
        //  format:'d-M-Y'
    }, {
        text: DDO.util.LabelsTitles.JOININGDATE,
        dataIndex: 'joiningdate',
        // xtype:'datecolumn', 
        // format:'d-M-Y'

    // }, {
    //     text: DDO.util.LabelsTitles.DAYSONBENCH,
    //     dataIndex: 'daysonbench',
    //     filter: {
    //         type: 'number'
    //     }
    }, {
        text: DDO.util.LabelsTitles.EMPLOYMENTSTATUS,
        dataIndex: 'employmentstatus',
        filter: 'list'
    }, {
        text: DDO.util.LabelsTitles.CURRENTPROJECT,
        dataIndex: 'projectnames',
        width: Constants.ViewportWidth*0.074
    }, {
        text: DDO.util.LabelsTitles.SUPERVISOR,
        dataIndex: 'supervisorname',
        width: Constants.ViewportWidth*0.11,
        filter: {
            type: 'string'
        }
    }, {
        text: DDO.util.LabelsTitles.POTENTIALPROJECT,
        dataIndex: 'potentialproject',
        filter: 'list',
        hidden: true
    }, {
        text: DDO.util.LabelsTitles.PREFERREDLOCATION,
        dataIndex: 'preferredlocation',
        filter: 'list',
        hidden: true
    }],

    //Added to load new url on click of the Group By button in Technologies
    listeners: {
        headermenucreate: 'onMenuRender',
        groupchange: function(store, grouper, eOpts) {
            if (grouper.config.property == "skills") {
                var proxy = store.getProxy();
                // proxy.setUrl('/dashboard/employeeavailability/resources');
                proxy.setUrl(Api.URL.dashboard.READRESOURCES);
                store.load();
            }
        }
    }
});