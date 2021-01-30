/**
 * The file EmployeeTabViewModel is the viewmodel for the employee tab view class.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.employeetabviewmodel'.
 */
Ext.define('DDO.view.setup.employeesetup.EmployeeTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employeetabviewmodel',
    requires: ['DDO.model.setup.employeesetup.UtilComboModel'],

    stores: {
        utilcombostore: {
            model: 'DDO.model.setup.employeesetup.UtilComboModel',
            proxy: {
                type: 'ajax',
                url: 'resources/data/utilgroup.json',
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            },
            autoLoad: true
        },
        utilgridstore: {
            groupField: 'name',
            proxy: {
                type: 'ajax',
                api: {
                    read: Api.URL.utilgrid.READ
                },
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            },
            autoLoad: true
        },
        empGroupStore: {
            model: 'Ext.data.Model',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                api: {
                    read: Api.URL.utilization.READ
                },
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            }
        }
    }

});