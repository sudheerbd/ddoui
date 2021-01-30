/**
 * The file TechnologiesViewModel is the ViewModel of the 'DDO.view.projects.TechnologiesView' And  'DDO.view.projects.TechnologiesWindow'.
 * @extends {Ext.app.ViewModel}
 * @alias viewmodel.technologiesviewmodel
 */
Ext.define('DDO.view.projects.TechnologiesViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.technologiesviewmodel',
    data: {
        activeProId: 'null'
    },
    stores: {
        technologiesstore: {
            // autoLoad: true,
            proxy: {
                type: 'ajax',
                url: Api.URL.technologiesstore.READ,
                reader: {
                    type: 'json',
                    rootProperty: "data"
                }
            }
        }
    }
});