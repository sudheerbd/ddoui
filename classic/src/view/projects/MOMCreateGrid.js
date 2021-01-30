Ext.define('DDO.view.projects.MOMCreateGrid',{
    extend: "Ext.container.Container",
    xtype:'momcreatcontainer',
    // title:'ToDo',
    layout:'vbox',
    items:[{
        xtype:'label',
        // dock:'top',
        html:'<h4>To Do</h4>',
        cls:'momnew-label-cls'
    },{
        xtype:'grid',
        cls:'momcreategrid-cls',
        // width: '100%',
        // padding: '20px 0px 0px 0px',
        height: 250,
        // height: Constants.ViewportHeight*0.33,
        layout: 'fit',
        columnLines: true,
        rowLines: false,
        columns:[
            {
                xtype: 'rownumberer',
                align: 'center',
                text: '#',
                align:'center',
                flex: 0.2
            },{
                xtype: 'gridcolumn',
                dataIndex: 'action_item',
                flex: 1,
                align:'center',
                text: 'Action Item/Task Details',
                editor: {
                    xtype: 'textfield',
                    emptyText: 'Add task details',
                    disabledCls: 'mom-item-disabled',
                    // bind: {
                    //     disabled: '{nonEditablePermit}',
                    //     value: '{actionItem}'
                    // }
                }
            
        },{
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'assigned_to',
            reference: 'assignedTo',
            align:'center',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
            editor: {
                xtype: 'combobox',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
                typeAhead: true,
                forceSelection: true,
                queryMode: 'local',
                lastQuery: '',
                minChars: 1,
                displayField: 'user_full_name',
                valueField: 'user_full_name',
                disabledCls: 'mom-item-disabled',
                // bind: {
                //     disabled: '{nonEditablePermit}',
                //     value: '{assigned_to}'
                // },
                // store: 'projects.EmpNamesStore'
            },
            // renderer: function(value, metaData) {
            //     metaData.tdAttr = 'data-qtip="' + value + '"';
            //     var empStore = Ext.getStore('projects.EmpNamesStore');
            //         empStore.reload();
            //     return value;
            // }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'due_date',
            flex: 1,
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DUEDATE,
            menuDisabled: true,
            autoSync: true,
            align:'center',
            renderer: Ext.util.Format.dateRenderer('d-m-Y'),
            editor: {
                xtype: 'datefield',
                disabledCls: 'mom-item-disabled',
                // bind: {
                //     disabled: '{nonEditablePermit}',
                //     value: '{due_date}'
                // },
                emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DATEEMPTY,
                format: 'd-m-Y',
                minValue: new Date(),
                createPicker: function() {
                    var me = this,
                        format = Ext.String.format;
                    return Ext.create('Ext.picker.Date', {
                        pickerField: me,
                        ownerCt: me.ownerCt,
                        renderTo: document.body,
                        floating: true,
                        hidden: true,
                        focusOnShow: true,
                        cls: 'ddo-create-datepicker',
                        minDate: me.minValue,
                        maxDate: me.maxValue,
                        disabledDatesRE: me.disabledDatesRE,
                        disabledDatesText: me.disabledDatesText,
                        disabledDays: me.disabledDays,
                        disabledDaysText: me.disabledDaysText,
                        format: me.format,
                        showToday: me.showToday,
                        startDay: me.startDay,
                        minText: format(me.minText, me.formatDate(me.minValue)),
                        maxText: format(me.maxText, me.formatDate(me.maxValue)),
                        listeners: {
                            scope: me,
                            select: me.onSelect
                        },
                        keyNavConfig: {
                            esc: function() {
                                me.collapse();
                            }
                        }
                    });
                }
            }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'status',
            align:'center',
            flex:1,
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
            editor: {
                xtype: 'textfield',
                readOnly: true,
                emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
                disabledCls: 'mom-item-disabled',
                // bind: {
                //     value: '{status}'
                // }
            }
        }]
    }
   
]
});