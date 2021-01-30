/**
 *   This file is responsible for TechnologiesWindow.
 *   @extends {Ext.window.Window}
 *   @alias widget.technologieswindow
 *   ViewModel :'DDO.view.projects.TechnologiesViewModel'.
 *   ViewController :'DDO.view.projects.TechnologiesViewController.
 */
Ext.define('DDO.view.projects.TechnologiesWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.technologieswindow',
    requires: [
        'DDO.store.projects.TechnologiesComboStore',
        'DDO.view.projects.TechnologiesViewController',
        'DDO.view.projects.TechnologiesViewModel'
    ],
    controller: 'technologiesviewcontroller',
    viewModel: {
        type: 'technologiesviewmodel'
    },
    initComponent: function () {
        this.callParent(arguments);
        var controller = this.getController();
        Ext.getStore('projects.TechnologiesComboStore').load();
        Ext.getStore('projects.VersionsStore').load();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function () {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    modal: true,
    header: true,
    resizable: false,
    title: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.ADDTECHNOLOGY,
    cls: 'momwindow-cls',
    width: Constants.ViewportWidth * 0.44,
    height: Constants.ViewportHeight * 0.39,
    items: [{
        xtype: 'form',
        cls: 'form-tech-cls',
        reference: 'technologiesform',
        width: Constants.ViewportWidth * 0.44,
        height: Constants.ViewportHeight * 0.39,
        padding: '30 0 0 0',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [{
            xtype: 'combobox',
            name: 'technology_name',
            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.SEARCHTECHNOLOGY,
            labelWidth: 140,
            labelStyle: 'font-size:14px',
            reference: 'technologynameref',
            displayField: 'technology_name',
            valueField: 'technology_name',
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.TECHNOLOGYNAME,
            editable: true,
            allowBlank: false,
            queryMode: 'local',
            store: 'projects.TechnologiesComboStore',
            listConfig: {
                cls: 'note-list-cls'
            }
        }, {
            xtype: 'combobox',
            name: 'description',
            fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.SELECTVERSION,
            labelWidth: 140,
            labelStyle: 'font-size:14px;',
            reference: 'technologyversionref',
            displayField: 'description',
            valueField: 'description',
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.VERSION,
            editable: true,
            allowBlank: false,
            queryMode: 'local',
            store: 'projects.VersionsStore',
            listConfig: {
                cls: 'note-list-cls'
            }
        }, {
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.TECHNOLOGIES.SUBMITBTN,
            width: Constants.ViewportWidth * .074,
            margin: '25 0 0 0',
            // bind: {
            //     disabled: '{subBtnDisable}'
            // },
            cls: 'tech-window-submit-cls',
            listeners: {
                click: 'onTechSubmitClick'
            }
        }]
    }]
});