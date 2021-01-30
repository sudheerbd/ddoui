/**
 * The file EmployeeSetupWindow is the view file of the Employee Setup Window.
 * @extends {DDO.ux.window.FormPanel}
 * @alias 'widget.employeesetupwindow'.
 * ViewModel : 'DDO.view.setup.employeesetup.EmployeeSetupWindowViewModel'.
 * ViewController : 'DDO.view.setup.employeesetup.EmployeeSetupWindowViewController'.
 */

Ext.define('DDO.view.setup.employeesetup.EmployeeSetupWindow', {
    extend: 'DDO.ux.window.FormPanel',

    requires: [
        'DDO.view.setup.employeesetup.WorkDetails',
        'DDO.view.setup.employeesetup.EmployeeForm',
        'DDO.view.setup.employeesetup.AccessDetails',
        'DDO.view.setup.employeesetup.EmployeeAddress',
        'DDO.view.setup.employeesetup.EmployeeSetupWindowViewModel',
        'DDO.view.setup.employeesetup.EmployeeSetupWindowViewController',
        'DDO.view.setup.employeesetup.EmployeeSkills',
        'DDO.view.setup.employeesetup.WorkExperience',
    ],

    alias: 'widget.employeesetupwindow',
   reference:'employeesetupwindow',
    controller: 'employeesetupwindowcontroller',
    viewModel: {
        type: 'employeesetupwindowviewmodel'
    },

    initComponent: function() {
        // debugger;
        this.callParent(arguments);

        // var profileSkillsCombo = Ext.getStore('skillslist.ProfileSkillsComboStore');
        // profileSkillsCombo.load();

        var controller = this.getController();
        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },

    listeners: {
        show: function(win, opts) {
            win.center();
        },
        close: function(panel, eopts) {
            var tabpanel = panel.down('tabpanel');
            tabpanel.setActiveItem(0);
            Ext.getStore('setup.role.RoleStore').clearFilter(true);
        }
    },
    closable: true,
    cls: 'attributevalue-win-cls',
    modal: true,
    width: Constants.ViewportWidth * 0.613,
    height: Constants.ViewportHeight * 0.855,
    maxHeight: Constants.ViewportHeight * 0.855,
    maxWidth: Constants.ViewportWidth * 0.613,
    header: true,
    constrain: true,
    layout: 'fit',
    resizable: false,
    items: [{
        xtype: 'tabpanel',
        padding: 20,
        name:'windowtabpanel',
        cls: 'wallethistorytab-cls',
        tabBar: {
            layout: {
                pack: 'center'
            },
            height: 70
        },

        items: [{
            xtype: 'employeeform',
            reference: 'employeeFormRef',
            bind: {
                disabled: '{tab1}'
            }
        }, {
            xtype: 'workdetails',
            reference: 'wrkdetailsref',
            bind: {
                disabled: '{tab2}'
            }
        }
        , {
            xtype: 'employeeskills',
            reference: 'skillsref',
            bind: {
                disabled: '{tab6}'
            }
        },
        {
            xtype:'employeeworkexperience',
            reference:'employeeexpref',
            bind:{
                disabled: '{tab7}'
            }
        },
 {
            xtype: 'personaldetailstab',
            reference: 'personaldetailstabref',
            bind: {
                disabled: '{tab3}'
            }
        }, {
            xtype: 'employeeaddress',
            bind: {
                disabled: '{tab4}'
            }
        }, {
            xtype: 'accessdetails',
            reference: 'accessdetails',
            bind: {
                disabled: '{tab5}'
            }
        },
        // {
        //     xtype: 'employeeskills',
        //     // reference: 'skillsref',
        //     bind: {
        //         disabled: '{tab7}'
        //     }
        // }
    ],
        listeners: {
            beforetabchange: 'onBeforeTabChange',
            tabchange:"onAftertabChange"
        }
    }]
});