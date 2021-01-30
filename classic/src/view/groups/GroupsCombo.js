/**
 *   This file  is responsible for GroupsCombo.
 *   @extends {Ext.container.Container}
 *   @alias widget.groupscombo
 *   ViewModel: 'DDO.view.groups.GroupsViewModel',.
 *   ViewController :'DDO.view.groups.GroupsViewController'.
 */
Ext.define('DDO.view.groups.GroupsCombo', {
    extend: 'Ext.container.Container',
    alias: 'widget.groupscombo',
    layout: {
        type: 'vbox'
    },
    margin: '40 0 0 -22',
    defaults: {
        width: '100%'
    },
    items: [{
        xtype: 'container',
        cls: 'groupsearch-container-cls',
        height: Constants.ViewportHeight * 0.07,
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'button',
            cls: 'user-cls userIcon-cls',
            reference: 'usersref'
        }, {
            xtype: 'combobox',
            emptyText: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.CHOOSEGROUP,
            reference: 'groupname',
            width: Constants.ViewportWidth * 0.154, 
            listConfig: {
                cls: 'grpcombo-list-cls'
            },
            displayField: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.GROUPNAME,
            valueField: 'group_id',
            editable: false,
            reference: 'groupname',
            bind: {
                value: '{comboGroupName}'
            },
            cls: 'grp-combo-cls',
            // bind: {
            //     store:'{groupcombostore}'
            // },
            store: 'groups.GroupsComboStore',
            tpl: [
                '<ul class="x-list-plain"><tpl for=".">',
                '<li role="option" class="x-boundlist-item">',
                '<span class="ddo-group-round">{[this.getGroupSymbol(values)]}</span>',
                '{group_name}</li></tpl>',
                '</ul>', {
                    getGroupSymbol: function(values) {
                        return values.group_name[0].toUpperCase();
                    }
                }
            ],
            listeners: {
                select: 'onGroupComboItemSelect'
            }
        }, {
            xtype: 'tbspacer',
            width: Constants.ViewportWidth * 0.015,
        }, {
            xtype: 'container',
            height: Constants.ViewportHeight * 0.05,
            margin: '8px 2px 0 -12px',
            cls: 'text-cnt-cls',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'textfield',
                cls: 'text-fd-cls',
                reference: 'textfd',
                allowBlank: true,
                enableKeyEvents: true,
                emptyText: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.NEWGROUP,
                bind: {
                    value: '{groupName}'
                },
                listeners: {
                    keydown: 'onGroupTextEnterClick'
                }
            }, {
                xtype: 'button',
                cls: 'grp-plus-btn',
                iconCls: 'x-fa fa-plus',
                bind: {
                    disabled: '{getGroupTextFieldValue}'
                },
                listeners: {
                    click: 'onAddBtnClick'
                }
            }]
        }]
    }, {
        xtype: 'container',
        reference: 'cntref',
        margin: '20px 0px 0px 0px',
        bind: {
            hidden: '{addPeopleVisibility}'
        },
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'tbspacer',
            width: Constants.ViewportWidth * 0.015,
        }, {
            xtype: 'label',
            cls: 'grp-label-cls',
            reference: 'labelref'
        }, {
            xtype: 'tbspacer',
            width: Constants.ViewportWidth * 0.015,
        }, {
            xtype: 'button',
            text: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.DELETE,
            toggleGroup: 'groupChange',
            enableToggle: true,
            cls: 'grp-delete-cls',
            handler: 'onGroupdeleteBtnClick'
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            cls: 'add-people-btn',
            iconAlign: 'right',
            iconCls: 'x-fa fa-plus',
            reference: 'addPeopleBtn',
            text: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.ADDPEOPLE, 
            handler: 'onClickAddPeopleFn'
        }]
    }],
    // listeners: {
    //     afterrender: function(){
    //         debugger;
    //         var grpComboView = Ext.ComponentQuery.query('groupscombo')[0],
    //         grpCombo, store;
    //         if (grpComboView) {
    //             grpCombo = grpComboView.down('combobox[reference = groupname]');
    //             store = Ext.getStore('groups.GroupsComboStore');
    //             var groupComboRecord = store.getAt(0),
    //                 groupComboName;
    //             if (groupComboRecord != null) {
    //                 groupComboName = groupComboRecord.data.group_id;
    //                 grpCombo.setValue(groupComboName);

    //                 Utility.groupInitialLoad(grpCombo, groupComboRecord, eOpts);
    //             }
    //         }
    //     }  
    // }
});
