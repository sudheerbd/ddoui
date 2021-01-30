/**
 * This view is responsible for displaying designation potential in home page.
 * @class 'DDO.view.karmascore.DesignationPotentialHeaderView'
 * @extends 'Ext.panel.Panel'
 * @alias 'designationpotentialheaderview'
 * @ViewModel 'DDO.view.widget.karmascore.KarmaScoreModel'
 * @Controller 'DDO.view.widget.karmascore.KarmaScoreController'
 */
Ext.define('DDO.view.karmascore.DesignationPotentialHeaderView', {
    extend: 'Ext.panel.Panel',
    xtype: 'designationpotentialheaderview',

    requires: ['DDO.store.setup.designation.DesignationStore'],
    
    width : '100%',
    items: [{
        xtype: "toolbar",
        cls: 'desig-poten-header',
        items: [{
            xtype: "combobox",
            width : '100%',
            listConfig: {
                cls: 'karma-desi-combo'
            },
            cls: "karma-desi-combo-style topadjust",
            displayField: "name",
            valueField: "ddo_designation_id",
            store: 'setup.designation.DesignationStore',
            reference: 'myCombo',
            name : 'designation',
            value : '',
            typeAhead: true,
            queryMode: 'local',
            lastQuery: '',
            autoLoad : true,
            listeners: {
                select: "onComboSelection",
                afterrender:"onComborender"
            }
        }]
    }]
});
