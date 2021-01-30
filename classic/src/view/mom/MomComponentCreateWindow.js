// /**
//  * The file MomComponentCreateWindow is the window which comes by clicking on CreateMoM button in MoM page.
//  * @extends {Ext.window.Window}
//  * @alias 'widget.momcomponentcreatewindow'.
//  * ViewModel: 'DDO.view.mom.MomComponentCreateWindowViewModel'.
//  * ViewController : 'DDO.view.mom.MomComponentCreateWindowController'
//  */
// Ext.define('DDO.view.mom.MomComponentCreateWindow', {
//     extend: 'Ext.window.Window',

//     alias: 'widget.momcomponentcreatewindow',

//     requires: [
//         'DDO.view.mom.MomComponentCreateWindowController',
//         'DDO.view.mom.MomComponentCreateWindowViewModel',
//         'Ext.form.field.Time',
//         'Ext.form.field.Date',
//         'DDO.overrides.form.field.Tag',
//         'DDO.ux.button.FabButton'
//     ],

//     controller: 'momcomponentcreatewindowcontroller',

//     viewModel: {
//         type: 'momcomponentcreatewindowviewmodel'
//     },

//     scrollable: 'y',

//     initComponent: function() {
//         this.callParent(arguments);
//         var controller = this.getController(),
//             empStore = Ext.getStore('projects.EmpNamesStore');
//         if (!empStore.isLoaded()) {
//             empStore.load();
//         }
//         Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
//     },

//     destroy: function() {
//         var controller = this.getController();
//         Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
//     },

//     modal: true,
//     resizable: false,
//     bind: {
//         title: '{title}'
//     },
//     cls: 'momwindow-cls',
//     width: Constants.ViewportWidth*0.593,
//     scrollable: 'y',
//     maxHeight: Constants.ViewportHeight,
//     bbar: {
//         cls: 'mom-bbar-cls',
//         height:56,
//         items: [{
//             xtype: 'tbfill'
//         }, {
//             xtype: 'button',
//             text: LabelsTitles.MoM.DRAFTS,
//             cls: 'mom-drafts-cls',
//             width: Constants.ViewportWidth*0.073,
//              height:45,
//             // padding : '0px 0px 6px 0px',
//             margin: '0px 0px 0px 12px',
//             bind: {
//                 disabled: '{BtnVisible}'
//             },
//             listeners: {
//                 click: 'onDraftSubmitClick'
//             }
//         }, {
//             xtype: 'button',
//             cls: 'mom-submit-cls',
//             width: Constants.ViewportWidth*0.073,
//             height:45,
//             // padding : '0px 0px 6px 0px',
//             margin: '0px 12px 0px 12px',
//             bind: {
//                 text: '{BtnText}'
//             },
//             listeners: {
//                 click: 'onMomSubmitClick'
//             }
//         }]
//     },

//     items: [{
//         xtype: 'form',
//         reference: 'agenda-ref',
//         layout: {
//             type: 'hbox'
//         },

//         items: [{
//             xtype: 'textarea',
//             name: 'mom_agenda',
//             required: true,
//             cls: 'mom-title-txtarea-cls',
//             disabledCls: 'mom-item-disabled',
//             flex: 1.5,
//             preventScrollbars: false,
//             grow: true,
//             growMax: 50,
//             enforceMaxLength: true,
//             maxLength: 250,
//             emptyText: LabelsTitles.MoM.TITLE,
//             bind: {
//                 value: '{agenda}'
//             }
//         }]
//     }, {
//         xtype: 'container',
//         layout: {
//             type: 'vbox'
//         },
//         items: [{
//             xtype: 'container',
//             reference: 'dateValues',
//             layout: {
//                 type: 'hbox'
//             },
//             flex:0.5,
//             items: [{
//                 xtype: 'label',
//                 cls: 'mom-label-cls',
//                 text: LabelsTitles.MoM.STARTDATE
//             }, {
//                 xtype: 'datefield',
//                 width: Constants.ViewportWidth*0.126,
//                 cls: 'mom-start-date-cls',
//                 required: true,
//                 alwaysOnTop: true,
//                 name: 'start_date',
//                 disabledCls: 'notestatus-item-disabled',
//                 reference: 'fromDate',
//                 bind: {
//                     value: '{start_date}'
//                 },
//                 emptyText:  LabelsTitles.MoM.DATEEMPTY,
//                 format: 'd-m-Y',
//                 submitFormat: 'd-m-Y',
//                 maskRe: /[0-9\-\/]/,
//                 listeners: {
//                     focusleave:"onKeyDownDate"
//                 },
//                 minValue: new Date(),
//                 createPicker: function() {
//                     var me = this,
//                         format = Ext.String.format;

//                     return Ext.create('Ext.picker.Date', {
//                         pickerField: me,
//                         ownerCt: me.ownerCt,
//                         renderTo: document.body,
//                         floating: true,
//                         hidden: true,
//                         focusOnShow: true,
//                         cls: 'ddo-create-datepicker',
//                         minDate: me.minValue,
//                         maxDate: me.maxValue,
//                         disabledDatesRE: me.disabledDatesRE,
//                         disabledDatesText: me.disabledDatesText,
//                         disabledDays: me.disabledDays,
//                         disabledDaysText: me.disabledDaysText,
//                         format: me.format,
//                         showToday: me.showToday,
//                         startDay: me.startDay,
//                         minText: format(me.minText, me.formatDate(me.minValue)),
//                         maxText: format(me.maxText, me.formatDate(me.maxValue)),
//                         listeners: {
//                             scope: me,
//                             select: me.onSelect

//                         },
//                         keyNavConfig: {
//                             esc: function() {
//                                 me.collapse();
//                             }
//                         }
//                     });
//                 }
//             },
//             {
//               xtype : 'tbspacer',
//               width : 80
//             },
//             {
//                 xtype: 'label',
//                 cls: 'mom-time-label-cls',
//                 text: LabelsTitles.MoM.STARTTIME,
                
//             }, {
//                 xtype: 'timefield',
//                 name: 'start_time',
//                 reference: 'startTime',
//                 disabledCls: 'mom-item-disabled',
//                 required: true,
//                 width: Constants.ViewportWidth*0.135,
//                 bind: {
//                     value: '{start_time}'
//                 },
//                 editable: false,
//                 cls: 'mom-start-time-cls',
//                 emptyText: LabelsTitles.MoM.TIMEEMPTY,
//                 minValue: '00:00',
//                 maxValue: '24:00',
//                 hideTrigger: false,
//                 format: 'H-i',
//                 increment: 30,
//                 listConfig: {
//                     cls: 'mom-stime-cls'
//                 },
//                 listeners: {
//                     select: 'onStartTimeSelect'
//                 }
//             },
//             {
//                 xtype : 'tbspacer',
//                 width : 80
//               }, {
//                 xtype: 'label',
//                 cls: 'mom-end-label-cls',
//                 text: LabelsTitles.MoM.ENDTIME,
//             }, {
//                 xtype: 'timefield',
//                 name: 'end_time',
//                 required: true,
//                 reference: 'endTime',
//                 disabledCls: 'mom-item-disabled',
//                 width: Constants.ViewportWidth*0.135,
//                 bind: {
//                     value: '{end_time}'
//                 },
//                 cls: 'mom-end-time-cls',
//                 editable: false,
//                 emptyText: LabelsTitles.MoM.TIMEEMPTY,
//                 minValue: '00:00',
//                 maxValue: '24:00',
//                 format: 'H-i',
//                 increment: 30,
//                 listConfig: {
//                     cls: 'mom-etime-cls'
//                 },
//                 listeners: {
//                     select: 'onEndTimeSelect'
//                 }
//             },
//             {
//                 xtype : 'tbspacer',
//                 width : 80
//               }, {
//                 xtype: 'label',
//                 cls: 'mom-duration-label-cls',
//                 text: LabelsTitles.MoM.DURATION
//             }, 
//             {
//                 xtype: 'numberfield',
//                 name: 'duration',
//                 editable: false,
//                 reference: 'duration',
//                 required: true,
//                 width: Constants.ViewportWidth*0.048,
//                 emptyText: LabelsTitles.MoM.HRS,
//                 hideTrigger: true,
//                 bind: {
//                     value: '{duration}'
//                 },
//                 cls: 'mom-duration-cls'
//             },
//              {
//                 xtype: 'label',
//                 cls: 'mom-duration-text-label-cls',
//                 bind: {
//                     text: '{getDurationTextValue}'
//                 }
//             }
//         ]
//         }]
//     }, {
//         xtype: 'ddohtmleditor',
//         reference: 'editor-ref',
//         name: 'mom_desc',
//         required: true,
//         emptyText: LabelsTitles.MoM.DESCRIPTION,
//         submitEmptyText: false,
//         cls: 'mom-html-editor-cls',
//         disabledCls: 'mom-item-disabled',
//         width: Constants.ViewportWidth*0.594,
//         height: Constants.ViewportHeight*0.28,
//         bind: {
//             value: '{mom_desc}'
//         },
//         listeners: {
//             render: function(editor) {
//                 editor.getToolbar().hide();
//             }
//         }
//     }, {
//         xtype: 'grid',
//         reference: 'gridValues',
//         width: '100%',
//         height: Constants.ViewportHeight*0.33,
//         layout: 'fit',
//         columnLines: true,
//         rowLines: false,
//         cls: 'mom-grid-view',
//         disabledCls: 'mom-item-disabled',
//         plugins: {
//             ptype: 'cellediting',
//             clicksToEdit: 1,
//             clicksToMoveEditor: 2,
//             autoCancel: false,
//             listeners: {
//                 edit: function(editor, context, eOpts) {
//                     var name, store, record;
//                     if (arguments[1].record.data) {
//                         name = arguments[1].record.data.assigned_to;
//                     }

//                     store = Ext.getStore('projects.EmpNamesStore');

//                     if (store) {
//                         record = store.findRecord("user_full_name", name, 0, true);
//                     }

//                     if (store && record) {
//                         arguments[1].record.data.user_id = record.data.user_id;
//                     }
//                 }
//             }
//         },

//         store: 'projects.MOMGridStore',

//         columns: [{
//             xtype: 'rownumberer',
//             align: 'center',
//             text: LabelsTitles.MoM.SNO,
//             flex: 0.2
//         }, {
//             xtype: 'gridcolumn',
//             dataIndex: 'action_item',
//             flex: 1.2,
//             text: LabelsTitles.MoM.ACTIONITEM,
//             editor: {
//                 xtype: 'textfield',
//                 emptyText: LabelsTitles.MoM.ACTIONITEM,
//                 disabledCls: 'mom-item-disabled',
//                 bind: {
//                     value: '{actionItem}'
//                 }

//             }
//         }, {
//             xtype: 'gridcolumn',
//             flex: 0.7,
//             dataIndex: 'assigned_to',
//             reference: 'assignedTo',
//             text: LabelsTitles.MoM.ASSIGNEDTO,
//             editor: {
//                 xtype: 'combobox',
//                 emptyText: LabelsTitles.MoM.ASSIGNEDTO,
//                 typeAhead: true,
//                 forceSelection: true,
//                 queryMode: 'local',
//                 lastQuery: '',
//                 minChars: 1,
//                 displayField: 'user_full_name',
//                 valueField: 'user_full_name',
//                 disabledCls: 'mom-item-disabled',
//                 bind: {
//                     value: '{assigned_to}'
//                 },
//                 store: 'projects.EmpNamesStore'
//             },
//             renderer: function(value, metaData, record, rowIdx, colIdx, store) {
//                 metaData.tdAttr = 'data-qtip="' + value + '"';
//                 var empStore = Ext.getStore('projects.EmpNamesStore');
//                 empStore.reload();
//                 return value;
//             }
//         }, {
//             xtype: 'gridcolumn',
//             dataIndex: 'due_date',
//             flex: 0.5,
//             text: LabelsTitles.MoM.DUEDATE,
//             menuDisabled: true,
//             autoSync: true,
//             renderer: Ext.util.Format.dateRenderer('d-m-Y'),
//             editor: {
//                 xtype: 'datefield',
//                 disabledCls: 'mom-item-disabled',
//                 bind: {
//                     value: '{due_date}'
//                 },
//                 emptyText: LabelsTitles.MoM.DATEEMPTY,
//                 format: 'd-m-Y',
//                 minValue: new Date(),
//                 createPicker: function() {
//                     var me = this,
//                         format = Ext.String.format;

//                     return Ext.create('Ext.picker.Date', {
//                         pickerField: me,
//                         ownerCt: me.ownerCt,
//                         renderTo: document.body,
//                         floating: true,
//                         hidden: true,
//                         focusOnShow: true,
//                         cls: 'ddo-create-datepicker',
//                         minDate: me.minValue,
//                         maxDate: me.maxValue,
//                         disabledDatesRE: me.disabledDatesRE,
//                         disabledDatesText: me.disabledDatesText,
//                         disabledDays: me.disabledDays,
//                         disabledDaysText: me.disabledDaysText,
//                         format: me.format,
//                         showToday: me.showToday,
//                         startDay: me.startDay,
//                         minText: format(me.minText, me.formatDate(me.minValue)),
//                         maxText: format(me.maxText, me.formatDate(me.maxValue)),
//                         listeners: {
//                             scope: me,
//                             select: me.onSelect
//                         },
//                         keyNavConfig: {
//                             esc: function() {
//                                 me.collapse();
//                             }
//                         }
//                     });
//                 }
//             },
//             listeners: {
//                 focusleave:"onKeyDownDate"
//             }
//         }, {
//             xtype: 'gridcolumn',
//             dataIndex: 'status',
//             flex: 0.5,
//             text: LabelsTitles.MoM.STATUS,
//             editor: {
//                 xtype: 'textfield',
//                 readOnly: true,
//                 emptyText: LabelsTitles.MoM.STATUS,
//                 disabledCls: 'mom-item-disabled',
//                 bind: {
//                     value: '{status}'
//                 }
//             }
//         }]

//     }, {
//         xtype: 'fabbutton',
//         fabUi: 'add',
//         position: 'br',
//         listeners: {
//             click:'addTaskGrid'
//         }
//     }, {
//         xtype: 'tagfield',
//         reference: 'comboTagview',
//         matchFieldWidth: false,
//         width: '100%',
//         clearOnBackspace: false,
//         width: '100%',
//         tagCustomiseMom: true,
//         tagMomOwnerId: '123',
//         cls: 'share-group-cls',
//         forceSelection: false,
//         store: 'feeds.Groups',
//         emptyText: LabelsTitles.MoM.PARTICIPANTS,
//         displayField: 'tagName',
//         valueField: 'tagId',
//         disabledCls: 'mom-item-disabled',
//         queryMode: 'local',
//         filterPickList: true,
//         listConfig: {
//             cls: 'tag-view-list',
//             width:  Constants.ViewportWidth*0.22
//         },
//         tpl: [
//             '<ul class="x-list-plain"><tpl for=".">',
//             '<li role="option" class="x-boundlist-item">',
//             '<tpl if="values.isGroup">',
//             '<span class="ddo-groupTag-round">{[this.getGroupTags(values)]}</span>',
//             '{tagName}</tpl>',
//             '<tpl else if="!values.isGroup">',
//             '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
//             '<div class="ddo-tag-Name">{tagName}</div></tpl></li></tpl>',
//             '</ul>', {

//                 getGroupTags: function(values) {
//                     if (typeof(values) === "object") {
//                         if (values.isGroup) {
//                             return values.tagName[0];
//                         }
//                     }

//                 },
//                 getTags: function(values) {
//                     if (typeof(values) === "object") {
//                         if (!values.isGroup) {
//                             var tagPic=Utility.imageCheck(values.tagPic)
//                             if (tagPic) {
//                                 return '<img class="tagUrl-img"  src="' + tagPic + '" onerror =' + Utility.defaultUserImg+'>';
//                             }
//                         }
//                     }
//                 }
//             }
//         ],
//         listeners: {
//             select: function(combo, record, eOpts) {
//                 combo.inputEl.dom.value = '';
//                 combo.collapse();
//             },
//             // beforedeselect:'beforeParticipantsDeselect',
//             afterrender: function(me, e, eopts) {

//             }
//         }
//     }],
//     listeners: {
//         beforeClose: function(winPanel) {
//             var view = winPanel.down('gridview'),
//                 vm = winPanel.getViewModel();

//             if (view && view.editingPlugin) {
//                 view.editingPlugin.cancelEdit();
//             }
//             vm.set('isExists', false);
//         },

//         afterrender: function(me, eOpts) {
//             var tagView = me.down('tagfield[reference=comboTagview]'),
//                 particpantTagStore = tagView.getStore(),
//                 winVm = me.getViewModel(),
//                 loginStore, empId, loginParticipantData, loginEmpId;

//             particpantTagStore.load({
//                 callback: function() {
//                     loginStore = Ext.getStore('login'),
//                         empId = loginStore.getData().items[0].data.ddo_employee_id,
//                         loginParticipantData = particpantTagStore.findRecord("tagId", empId);

//                     if (loginParticipantData && loginParticipantData.data) {
//                         loginEmpId = loginParticipantData.data.tagId;
//                         winVm.set('loginEmpId', loginEmpId);
//                         tagView.setValue(loginParticipantData.data.tagId);
//                         winVm.set('isExists', true);
//                     }

//                 }
//             })
//         }
//     }
// });