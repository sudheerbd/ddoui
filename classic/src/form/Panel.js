// Ext.define('DDO.form.Panel', {
//     extend: 'Ext.form.Panel',

//     alias: 'widget.ddoform',
//     alternateClassName: ['DDO.form.DDOFormPanel'],


//     title: 'Form',
//     layout: 'column',
//     labelAlign: 'top',
//     defaults: {
//         xtype: 'container',
//         layout: 'form',
//         columnWidth: 0.7
//     },

//     items: [{
//         xtype: 'combobox',
//         name: 'note_type',
//         reference: 'noteType',
//         displayField: 'note_name',
//         valueField: 'note_type',
//         emptyText: 'Note Type',
//         width: 135,
//         editable: false,
//         allowBlank: false,
//         store: 'projects.NoteComboStore',
//         bind: {
//             readOnly: '{nonEditablePermit}',
//             value: '{noteTypeValue}'
//         },
//         listConfig: {
//             cls: 'note-list-cls'
//         }
//     }, {
//         xtype: 'textfield',
//         name: 'note_title',
//         emptyText: 'Title',
//         enableKeyEvents: true,
//         reference: 'noteTitle',
//         bind: {
//             readOnly: '{nonEditablePermit}',
//             value: '{noteTitleValue}'
//         },
//         cls: 'note-title-cls',
//         allowBlank: false,
//         width: '100%',
//         listeners: {
//             keyup: 'onNoteTitleFieldKey'
//         }
//     }, {
//         xtype: 'textfield',
//         emptyText: 'Titletext',
//         name: 'textvalue'
//     }, {
//         xtype: 'htmleditor',
//         name: 'note_description',
//         reference: 'noteDesc',
//         cls: 'noteditor-cls',
//         bind: {
//             readOnly: '{nonEditablePermit}',
//             value: '{noteDescValue}'
//         },
//         width: 100,
//         height: 50
//     }, {
//         items: [{
//         	 xtype:'container',
//         	 layout:'hbox',
//         	 pack:'center',
//         items:[{
//             xtype: 'checkbox',
//             boxLabel: 'Box label',
//             name: 'checkbox',
//             inputValue: 'cbvalue'

//         }, {
//             xtype: 'checkbox',
//             boxLabel: 'Box label',
//             name: 'checkbox',
//             inputValue: 'cbvalue'

//         }]
//     }]
//     }, {
//         items: [{
//             xtype: 'button',
//             //cls: 'notes-create-btn-cls',
//             width: 100,
//             height: 40,
//             text: 'Add Wallet',
//             listeners: {
//                 //click: 'onMOMCreateBtnClick'
//             }
//         }, {
//             xtype: 'button',
//             //cls: 'notes-create-btn-cls',
//             width: 100,
//             height: 40,
//             text: 'Add Wallet'
//         }]
//     }]

// });