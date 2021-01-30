/**
 * The file KarmaAccessViewModel is the View Model for KarmaAccessView.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.karmaaccess'.
 */
Ext.define('DDO.view.karmasetup.karmaaccess.KarmaAccessViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmaaccess',
    requires : ['DDO.model.karmasetup.karmaaccess.KarmaAccess'],
    data:{
        search:false
    },
    stores: {
        karmaaccessstore :{
            model: 'DDO.model.karmasetup.karmaaccess.KarmaAccess',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                api: {
                    read: Api.URL.karmaaccess.READ,
                    update: Api.URL.karmaaccess.UPDATE,
                    create: Api.URL.karmaaccess.CREATE
                },
                reader: {
                    type: 'json',
                    rootProperty: "data"
                },
                actionMethods: {
                    read: 'GET',
                    create: 'POST',
                    update: 'PUT'
                },
                writer: {
                    writeAllFields: true
                }
            }
        }
    }
});
