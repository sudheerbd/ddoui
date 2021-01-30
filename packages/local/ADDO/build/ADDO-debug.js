/**
 * A simple custom row expander that does not add a "+" / "-" column.
 */
Ext.define('ADDO.admin.ux.plugin.RowExpander', {
    extend: 'Ext.grid.plugin.RowExpander',
    alias: 'plugin.uxadmin-rowexpander',
    rowBodyTpl: [
        '<div class="text-wrapper">',
        '<div class="thread-data">',
        '<div class="thread-paragraph">{details}</div>',
        '<div class="thread-toggle collapse"><span>COLLAPSE</span><img src="resources/icons/collapse-thread.png"></div>',
        '</div>',
        '</div>'
    ],
    // don't add the expander +/- because we will use a custom one instead
    addExpander: Ext.emptyFn,
    addCollapsedCls: {
        fn: function(out, values, parent) {
            var me = this.rowExpander;
            if (!me.recordsExpanded[values.record.internalId]) {
                values.itemClasses.push(me.rowCollapsedCls);
            } else {
                values.itemClasses.push('x-grid-row-expanded');
            }
            this.nextTpl.applyOut(values, out, parent);
        },
        syncRowHeights: function(lockedItem, normalItem) {
            this.rowExpander.syncRowHeights(lockedItem, normalItem);
        },
        // We need a high priority to get in ahead of the outerRowTpl
        // so we can setup row data
        priority: 20000
    }
});

Ext.define('ADDO.newticket.NewTicketWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.newticketwindow',
    onSubmitClick: function() {
        var me = this,
            refs = me.getReferences(),
            newTicketView = this.getView(),
            subject = refs.subject.getValue(),
            description = refs.description.getValue(),
            category = refs.category.getValue(),
            priority = refs.priority.getValue(),
            adminGrid = Ext.ComponentQuery.query('ticketadmingrid')[0],
            adminPanel = Ext.ComponentQuery.query('ticketadminpanel')[0],
            adminGridModel = adminGrid.getViewModel(),
            ticketStore = adminGridModel.get('TicketAdminStore'),
            data;
        data = {
            addo_supportusers_id: 0,
            addo_ticket_category_id: category,
            addo_ticket_priority_id: priority,
            addo_ticket_status_id: 1000001,
            tags: "tweeeeet",
            subject: subject,
            details: description,
            attachments: ""
        };
        Ext.Ajax.request({
            url: '/ticket',
            scope: me,
            method: 'POST',
            jsonData: data,
            success: function(response) {
                var newTicketData = Ext.decode(response.responseText);
                ticketStore.add(newTicketData.data[0]);
                newTicketView.hide();
                adminPanel.setActiveItem(0);
            },
            failure: function(response) {
                var data = Ext.decode(response.responseText);
                Ext.toast(data.message, 'Error', 't');
            }
        });
    }
});

Ext.define('ADDO.newticket.NewTicketWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newticketwindow',
    requires: [
        'ADDO.newticket.NewTicketWindowController'
    ],
    controller: 'newticketwindow',
    viewModel: {
        type: 'newticketwindow'
    },
    autoShow: true,
    height: '74%',
    width: '90%',
    padding: 20,
    layout: 'fit',
    title: 'New Ticket',
    border: false,
    closable: true,
    draggable: false,
    bodyBorder: false,
    resizable: false,
    cls: 'panelbody',
    message: '',
    info: false,
    modal: true,
    items: [
        {
            width: '100%',
            height: '100%',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Subject',
                    reference: 'subject',
                    labelAlign: 'top',
                    width: '100%',
                    name: 'subject',
                    labelSeparator: ' ',
                    cls: 'newticket-textfield-cls',
                    emptyText: 'Subject'
                },
                {
                    xtype: 'htmleditor',
                    reference: 'description',
                    cls: 'ticket-htmleditor-cls',
                    width: '100%',
                    height: '60%',
                    name: 'textBody'
                },
                {
                    layout: 'hbox',
                    cls: 'panelbody',
                    defaults: {
                        cls: 'rounded'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            reference: 'category',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'addo_ticket_category_id',
                            store: 'category',
                            emptyText: '(select category)',
                            padding: '0 18 0 0',
                            cls: 'rounded'
                        },
                        {
                            xtype: 'combo',
                            reference: 'priority',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'addo_ticket_priority_id',
                            store: 'priority',
                            emptyText: '(select priority)'
                        },
                        {
                            xtype: 'button',
                            cls: 'transparent-button',
                            iconCls: 'x-fa fa-paperclip',
                            text: 'attach a file',
                            margin: '0 0 0 700'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'Submit',
                    cls: 'rounded',
                    margin: '10 0 0 0',
                    handler: 'onSubmitClick'
                }
            ]
        }
    ]
});

Ext.define('ADDO.newticket.NewTicketWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.newticketwindow'
});

Ext.define('ADDO.store.Category', {
    extend: 'Ext.data.Store',
    alias: 'store.category',
    storeId: 'category',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/priorityandcategory/category',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('ADDO.store.Priority', {
    extend: 'Ext.data.Store',
    alias: 'store.priority',
    storeId: 'priority',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/priorityandcategory/priority',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('ADDO.store.SupportUser', {
    extend: 'Ext.data.Store',
    alias: 'store.supportuser',
    storeId: 'supportuser',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/supportuser',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('ADDO.thread.CommentsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commentsgrid',
    cls: 'commentsgrid',
    hideHeaders: true,
    margin: 20,
    columns: [
        {
            dataIndex: 'comments',
            flex: 1,
            renderer: 'renderTitleColumn'
        }
    ],
    titleTpl: [
        '<div class="text-wrapper">' + '<div class="comments-data">' + '<div class="comments-picture"><img src="{comment_image}"></div>' + '<div class="comments-content">' + '<div class="anchor"></div>' + '<div class="comments-author">{comment_name}</div>' + '<div class="comments-text">{comment}</div>' + '</div>' + '<div class="comments-icon"><img src="resources/icons/clock-icon.png">{[this.getDateFormat(values,"Y-m-d H:i:s")]}</div>' + '</div>' + '<div>',
        {
            getDateFormat: function(values, format) {
                return Ext.Date.format(values.date, format);
            }
        }
    ]
});

Ext.define('ADDO.thread.EditorPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editorpanel',
    margin: '0 20 20 20',
    layout: 'fit',
    bbar: [
        {
            text: 'Reply',
            handler: 'onClickReply'
        },
        {
            text: 'Cancel',
            handler: 'onClickCancel'
        }
    ],
    items: [
        {
            xtype: 'htmleditor'
        }
    ]
});

Ext.define('ADDO.thread.ThreadPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.threadpanel',
    requires: [
        'Ext.grid.plugin.RowExpander'
    ],
    cls: 'threadpanel',
    hideHeaders: true,
    scrollable: 'y',
    margin: 20,
    // tbar : [{
    //            xtype   : 'button',
    //            text    : 'Takeover'
    //        },'->',{
    // 		text : 'Close Ticket',
    // 		iconCls: 'x-fa fa-check'
    // 	}],
    bbar: [
        {
            xtype: 'component',
            reference: 'reply',
            width: '100%',
            padding: 10,
            componentCls: 'ticket-reply',
            html: ' Reply',
            listeners: {
                afterrender: 'onReplyCmpRender'
            }
        }
    ],
    columns: [
        {
            dataIndex: 'subject',
            flex: 1,
            renderer: 'renderThreadDescription'
        }
    ],
    viewConfig: {
        listeners: {
            itemclick: 'onThreadClick',
            expandbody: 'onExpandBody',
            collapsebody: 'onCollapseBody'
        }
    },
    plugins: [
        {
            ptype: 'uxadmin-rowexpander',
            pluginId: 'rowexpander'
        }
    ],
    titleTpl: [
        '<div class="text-wrapper">' + '<div class="thread-data">' + '<div class="thread-picture"><img src="{[this.getProfileImg(values)]}"></div>' + '<div class="thread-content">' + '<div class="thread-title">{subject}</div>' + '<div class="thread-small">by <span class="thread-author">{[this.getAuthor(values)]}</span>' + '<img src="resources/icons/cal-icon.png"/>{[this.getDateFormat(values,"d-m-Y")]}' + '<img src="resources/icons/clock-icon.png"/>{[this.getDateFormat(values,"H:i:s")]}</div>' + '<div class="thread-paragraph thread-paragraph-simple" {expanded}>{details:ellipsis(600, true)}</div>' + '<div class="thread-toggle expand" {expanded}><span>EXPAND</span>' + '<img src="resources/icons/expand-thread.png"></div>' + '</div>' + '</div>' + '<div>',
        {
            getProfileImg: function(values) {
                return Utility.profileImg();
            },
            getAuthor: function(values) {
                var loginStore = Ext.getStore('login'),
                    userRecord = loginStore.getAt(0),
                    userData = userRecord.data;
                return userData.fullname;
            },
            getDateFormat: function(values, format) {
                return Ext.Date.format(values.created, format);
            }
        }
    ]
});

Ext.define('ADDO.thread.TicketDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ticketdetails',
    padding: 10,
    border: false,
    defaults: {
        padding: '10 0 0 15'
    },
    title: 'DETAILS',
    dockedItems: [
        {
            xtype: 'toolbar',
            style: {
                background: '#fff'
            },
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'SUBMIT',
                    handler: 'onSubmitClick'
                }
            ]
        }
    ],
    items: [
        // {
        //     items: [{
        //         layout: 'hbox',
        //         items: [{
        //             xtype: 'label',
        //             bind : {
        //                 html: '<b>#{addo_tickets_id}</b>'
        //             }
        //         }, {
        //             xtype: 'label',
        //             margin: '0 0 0 25',
        //             bind : {
        //                 html: '<b>{ticket_status_name}</b>'
        //             }
        //         }]
        //     }]
        // },
        // {
        //     xtype : 'fieldcontainer',
        //     layout: 'hbox',
        //     items: [{
        //         xtype: 'label',
        //         bind : {
        //             html: '<b>#{addo_tickets_id}</b>'
        //         }
        //     }, {
        //         xtype: 'label',
        //         margin: '0 0 0 25',
        //         bind : {
        //             html: '<b>{ticket_status_name}</b>'
        //         }
        //     }]
        // },
        {
            xtype: 'combo',
            fieldLabel: 'Priority',
            name: 'addo_ticket_priority_id',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'addo_ticket_priority_id',
            store: 'priority',
            triggerAction: 'all',
            bind: {
                value: '{addo_ticket_priority_id}'
            },
            editable: false
        },
        {
            xtype: 'combo',
            fieldLabel: 'Category',
            name: 'addo_ticket_category_id',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'addo_ticket_category_id',
            store: 'category',
            triggerAction: 'all',
            bind: {
                value: '{addo_ticket_category_id}'
            },
            editable: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'From',
            bind: {
                value: '{fromname}'
            },
            name: 'fromname'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Assigned To',
            name: 'addo_supportusers_id',
            store: 'supportuser',
            queryMode: 'local',
            bind: {
                value: '{addo_supportusers_id}'
            },
            valueField: 'addo_supportusers_id',
            displayField: 'fullname',
            triggerAction: 'all',
            editable: false
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date',
            bind: {
                value: '{created}'
            },
            name: 'created'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Due',
            bind: {
                value: '{duedate}'
            },
            name: 'duedate'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Time Spent',
            name: 'timeSpent'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Start Date',
            name: 'startdate',
            bind: {
                value: '{startdate}'
            },
            editable: false
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Close Date',
            bind: {
                value: '{closedate}'
            },
            name: 'closedate'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Tags',
            bind: {
                value: '{tags}'
            },
            name: 'tags'
        }
    ]
});

Ext.define('ADDO.thread.TicketsThreadViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ticketsthreadview',
    data: {},
    stores: {
        threadstore: {
            fields: [
                {
                    name: 'tickethistoryid',
                    type: 'number'
                },
                {
                    name: 'subject',
                    type: 'string'
                },
                {
                    name: 'comment',
                    type: 'string'
                },
                {
                    name: 'fromname',
                    type: 'string'
                },
                {
                    name: 'date',
                    type: 'date'
                },
                {
                    name: 'comment_name',
                    type: 'string'
                },
                {
                    name: 'comment_image',
                    type: 'string'
                },
                {
                    name: 'details',
                    type: 'string'
                }
            ],
            filters: [
                {
                    filterFn: function(item) {
                        return item.data.comment_name.length > 0;
                    }
                }
            ],
            proxy: {
                type: 'ajax',
                url: '/tickethistory',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            sorters: [
                {
                    property: 'tickethistoryid',
                    direction: 'DESC'
                }
            ],
            autoLoad: false
        },
        panelstore: {
            fields: [
                'addo_supportusers_id',
                'addo_ticket_category_id',
                'addo_ticket_priority_id',
                'addo_ticket_status_id',
                'addo_tickets_id',
                'attachments',
                'author_id',
                {
                    name: 'created',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                'details',
                'fromemail',
                'fromname',
                'id',
                'subject',
                'tags',
                'ticket_category_name',
                'ticket_priority_name',
                'ticket_status_name'
            ],
            data: []
        }
    }
});

Ext.define('ADDO.thread.TicketsThreadViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ticketsthread',
    control: {
        'ticketsthreadview': {
            cleardirty: 'removeTicketDetailsFormDirty'
        }
    },
    removeTicketDetailsFormDirty: function() {
        var refs = this.getReferences(),
            ticketDetails = refs.ticketdetails;
    },
    /*ticketDetails.items.each(function(item){
            item.originalValue = item.getValue();
        })*/
    onReplyCmpRender: function(cmp, eOpts) {
        var me = this;
        bodyEl = cmp.getEl();
        bodyEl.on('click', me.onReplyCmpClick, me);
    },
    renderThreadDescription: function(value, metaData, record) {
        var view = this.getView(),
            refs = view.getReferences(),
            grid = refs.threadpanel,
            plugin = grid.getPlugin('rowexpander'),
            tpl = grid.titleTpl;
        if (!tpl.isTemplate) {
            grid.titleTpl = tpl = new Ext.XTemplate(tpl);
        }
        var data = Ext.Object.chain(record.data);
        data.expanded = plugin.recordsExpanded[record.internalId] ? ' style="display: none"' : '';
        return tpl.apply(data);
    },
    onThreadClick: function(dv, record, item, index, e) {
        if (e.getTarget('.thread-toggle')) {
            var view = this.getView(),
                refs = view.getReferences(),
                grid = refs.threadpanel,
                plugin = grid.getPlugin('rowexpander');
            plugin.toggleRow(index, record);
        }
    },
    onExpandBody: function(rowNode) {
        // , record, expandRow, eOpts
        Ext.fly(rowNode).addCls('x-grid-row-expanded');
        Ext.fly(rowNode).down('.thread-paragraph-simple').enableDisplayMode().hide();
        Ext.fly(rowNode).down('.expand').enableDisplayMode().hide();
    },
    onCollapseBody: function(rowNode) {
        //, record, expandRow, eOpts
        Ext.fly(rowNode).removeCls('x-grid-row-expanded');
        Ext.fly(rowNode).down('.thread-paragraph-simple').enableDisplayMode().show();
        Ext.fly(rowNode).down('.expand').enableDisplayMode().show();
    },
    renderTitleColumn: function(value, metaData, record) {
        var view = this.getView(),
            refs = view.getReferences(),
            grid = refs.commentsgrid,
            //plugin = view.getPlugin('rowexpander'),
            tpl = grid.titleTpl;
        if (!tpl.isTemplate) {
            grid.titleTpl = tpl = new Ext.XTemplate(tpl);
        }
        var data = Ext.Object.chain(record.data);
        //data.expanded = plugin.recordsExpanded[record.internalId] ? ' style="display: none"' : '';
        return tpl.apply(data);
    },
    onReplyCmpClick: function(ev) {
        var view = this.getView(),
            refs = view.getReferences();
        refs.editorpanel.setHidden(false);
        refs.reply.setHidden(true);
    },
    onClickReply: function(btn) {
        var me = this;
        var view = this.getView(),
            refs = view.getReferences(),
            htmleditor = refs.editorpanel.items.items[0],
            viewModel = this.getViewModel(),
            threadStore = viewModel.get('threadstore'),
            data = "",
            date = "",
            myDate = "";
        myDate = new Date();
        date = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
        data = {
            "id": threadStore.getCount() + 1,
            "createdby": "Test User",
            "image": "photo-1.png",
            "comment": htmleditor.value,
            "date": date.toString()
        };
        var comment = htmleditor.value;
        if (htmleditor.value != "") {
            //threadStore.add(data); 
            htmleditor.setValue("");
            refs.editorpanel.setHidden(true);
            refs.reply.setHidden(false);
        }
        var params = {
                addo_tickets_id: viewModel.getData().addo_tickets_id,
                details: comment,
                attachments: "",
                addo_supportusers_id: viewModel.getData().addo_supportusers_id
            },
            paramsData = {
                addo_tickets_id: viewModel.getData().addo_tickets_id
            };
        Ext.Ajax.request({
            url: '/tickethistory',
            method: 'post',
            params: params,
            scope: me,
            success: function(response) {
                Ext.apply(threadStore.getProxy().extraParams, paramsData);
                threadStore.load();
            },
            failure: function() {}
        });
    },
    onClickCancel: function(btn) {
        var view = this.getView(),
            refs = view.getReferences();
        refs.editorpanel.setHidden(true);
        refs.reply.setHidden(false);
    },
    onSubmitClick: function() {
        var refs = this.getReferences(),
            ticketDetails = refs.ticketdetails,
            threadview = ticketDetails.up('ticketsthreadview'),
            threadviewModel = threadview.getViewModel(),
            ticketDetailsForm = ticketDetails.getForm(),
            changedValueObject = ticketDetailsForm.getValues(false, true);
        if (ticketDetails.isDirty()) {
            Ext.Ajax.request({
                url: '/ticket',
                method: 'PUT',
                jsonData: {
                    addo_tickets_id: threadviewModel.get('addo_tickets_id')
                },
                params: changedValueObject,
                success: function() {
                    ticketDetails.up('ticketsthreadview').fireEvent('cleardirty');
                },
                failure: function() {}
            });
        }
    },
    onTakeOverClick: function() {
        var refs = this.getReferences(),
            ticketDetails = refs.ticketdetails,
            threadview = ticketDetails.up('ticketsthreadview'),
            threadviewModel = threadview.getViewModel(),
            assignTo = ticketDetails.down('combo[name=addo_supportusers_id]').getValue(),
            loginStore = Ext.getStore('loginstore'),
            loginUsersupportId = loginStore.data.items[0].data.supportuserid;
        if (assignTo != loginUsersupportId) {
            Ext.Ajax.request({
                url: '/ticket',
                method: 'PUT',
                jsonData: {
                    addo_tickets_id: threadviewModel.get('addo_tickets_id')
                },
                params: {
                    addo_supportusers_id: loginUsersupportId
                },
                success: function() {
                    threadviewModel.set('addo_supportusers_id', loginUsersupportId);
                    threadviewModel.notify();
                    ticketDetails.up('ticketsthreadview').fireEvent('cleardirty');
                },
                failure: function() {}
            });
        }
    },
    onBackBttonClick: function(btn) {
        btn.up('ticketadminpanel').setActiveItem(0);
    }
});

Ext.define('ADDO.thread.TicketsThreadView', {
    extend: 'Ext.container.Container',
    alias: 'widget.ticketsthreadview',
    requires: [
        'ADDO.thread.ThreadPanel',
        'ADDO.thread.EditorPanel',
        'ADDO.thread.CommentsGrid',
        'ADDO.thread.TicketsThreadViewModel',
        'ADDO.thread.TicketsThreadViewController'
    ],
    width: '100%',
    controller: 'ticketsthread',
    viewModel: {
        type: 'ticketsthreadview'
    },
    cls: 'noscrollbar',
    layout: {
        type: 'vbox',
        pack: 'right',
        align: 'right'
    },
    scrollable: 'y',
    height: 800,
    items: [
        {
            xtype: 'toolbar',
            width: '100%',
            cls: 'ticket-toolbar-cls',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    cls: 'ticket-btn',
                    margin: '10px 0px 0px 0px',
                    text: 'Back',
                    handler: 'onBackBttonClick'
                }
            ]
        },
        {
            xtype: 'container',
            width: '100%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'threadpanel',
                    reference: 'threadpanel',
                    //height 	: 300,
                    bind: {
                        store: '{panelstore}'
                    }
                },
                {
                    xtype: 'editorpanel',
                    reference: 'editorpanel',
                    hidden: true,
                    height: 200
                },
                {
                    xtype: 'commentsgrid',
                    reference: 'commentsgrid',
                    bind: {
                        store: '{threadstore}'
                    }
                }
            ]
        }
    ]
});
// ,{
// 	xtype : 'ticketdetails',
// 	margin : '20 20 0 20',
// 	bodyStyle: {
// 	    background: '#fff',
// 	    padding: '10px'
// 	},
// 	width  : '25%'
// }

Ext.define('ADDO.ticketadmin.TicketAdminGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ticketadmingrid',
    stores: {
        TicketAdminStore: {
            autoLoad: true,
            fields: [
                'addo_supportusers_id',
                'addo_ticket_category_id',
                'addo_ticket_priority_id',
                'addo_ticket_status_id',
                'addo_tickets_id',
                'attachments',
                'author_id',
                'details',
                'fromemail',
                'fromname',
                'subject',
                'tags',
                'ticket_category_name',
                'ticket_priority_name',
                'ticket_status_name',
                {
                    name: 'created',
                    type: 'date'
                }
            ],
            proxy: {
                type: 'ajax',
                url: '/ticket',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});

Ext.define('ADDO.ticketadmin.TicketAdminGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ticketadmingrid',
    init: function() {
        //initializing reusable stores
        Ext.create('ADDO.store.Category', {});
        Ext.create('ADDO.store.Priority', {});
        Ext.create('ADDO.store.SupportUser', {});
    },
    onTicketClick: function() {
        Ext.widget('newticketwindow', {});
    },
    onCellClick: function(grid, record, tr, rowIndex, e, eOpts) {
        var adminPanel = grid.up('ticketadminpanel'),
            me = this,
            threadView = adminPanel.down('ticketsthreadview'),
            threadViewModel = threadView.getViewModel(),
            ticketDetails = threadView.down('ticketdetails'),
            params = {
                addo_tickets_id: record.data.addo_tickets_id
            };
        var panelStore = threadViewModel.getData().panelstore;
        panelStore.setData([
            record.data
        ]);
        threadViewModel.setData(record.data);
        threadViewModel.notify();
        threadView.fireEvent('cleardirty');
        var threadstore = threadViewModel.getData().threadstore;
        Ext.apply(threadstore.getProxy().extraParams, params);
        threadstore.load();
        adminPanel.setActiveItem(1);
    }
});

Ext.define('ADDO.ticketadmin.TicketAdminGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ticketadmingrid',
    cls: 'ticket-grid-cls',
    requires: [
        'ADDO.ticketadmin.TicketAdminGridModel',
        'ADDO.ticketadmin.TicketAdminGridController',
        'ADDO.newticket.NewTicketWindow'
    ],
    controller: 'ticketadmingrid',
    viewModel: {
        type: 'ticketadmingrid'
    },
    bind: {
        store: '{TicketAdminStore}'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            cls: 'ticket-toolbar-cls',
            dock: 'top',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    cls: 'ticket-btn',
                    iconAlign: 'right',
                    margin: '10px 0px 0px 0px',
                    text: 'New Ticket',
                    handler: 'onTicketClick'
                }
            ]
        }
    ],
    columns: [
        {
            xtype: 'templatecolumn',
            text: 'Subject',
            tpl: '<a class="ticketLink">{subject}</a>',
            flex: 1.5
        },
        {
            text: 'Category',
            dataIndex: 'ticket_category_name',
            flex: 0.5
        },
        {
            text: 'Priority',
            dataIndex: 'ticket_priority_name',
            flex: 0.5
        },
        {
            text: 'Status',
            dataIndex: 'ticket_status_name',
            flex: 0.5
        },
        {
            xtype: 'datecolumn',
            format: 'd-m-Y',
            text: 'Created Date',
            dataIndex: 'created',
            flex: 0.5
        }
    ],
    listeners: {
        rowdblclick: 'onCellClick'
    }
});

Ext.define('ADDO.ticketadmin.TicketAdminPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'ticketadminpanel',
    requires: [
        'ADDO.ticketadmin.TicketAdminGrid',
        'ADDO.thread.TicketsThreadView'
    ],
    layout: 'card',
    items: [
        {
            xtype: 'ticketadmingrid'
        },
        {
            xtype: 'ticketsthreadview'
        }
    ]
});

