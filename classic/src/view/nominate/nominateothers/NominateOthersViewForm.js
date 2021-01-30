/**
 * The file 'NominateViewForm' is the view form of the window which comes by clicking on the 'Nominate Others' option in the 'Nominate' button.
 * ViewModel:'DDO.view.nominate.SelfNominateWindowModel' is the ViewModel of this file.
 * ViewController:'DDO.view.profile.nominateview.NominateOthersFormController' is the ViewController of this file.
 */

Ext.define('DDO.view.nominate.nominateothers.NominateOthersViewForm', {
    extend: 'Ext.form.Panel',

    alias: 'widget.nominateothersviewform',

    requires: [
        'DDO.view.nominate.SelfNominateWindowModel',
        'DDO.view.nominate.nominateotherform.NominateOthersFormController',
        'DDO.view.nominate.nominateothers.NominateOthersRatingSelector',
        'DDO.view.nominate.nominateothers.NominateOthersViewIcons'
    ],
    width: Constants.ViewportWidth * 0.38,

    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'center'
    },

    cls: 'DDO-ratingForm-cls',

    controller: 'nominateothersviewform',
    viewModel: {
        type: 'selfnominatewindowmodel'
    },
    items: [
        {
     //xtype: 'displayfield',
      html:'<div style="font-size:12px;">Add Colleague,Select the type of Karma,enter objective remarks and submit to recognize them</div>',
      cls:'html-clss'
        },
        {
        xtype: 'tagfield',
        reference: 'comboTagview',
        matchFieldWidth: false,
        name: 'people_tag',
        hideTrigger: true,
        height: 40,
        // fieldLabel: 'Select Month & Year',
        // labelAlign: 'top',
        scrollable: 'y',
        hidden: true,
        cls: 'tagfieldd-scroll',
        forceSelection: true,
        store: 'setup.employeesetup.ReportingStore',
        emptyText: 'Search for Colleagues',
        valueField: 'empid',
        displayField: 'empname',
        disabledCls: 'mom-item-disabled',
        bind: {
            value: '{tagId}'
        },
        queryMode: 'local',
        filterPickList: true,
        listConfig: {
            cls: 'tag-view-list',
            width: Constants.ViewportWidth * 0.22,
        },
        tpl: [
            '<ul class="x-list-plain"><tpl for=".">',
            '<li role="option" class="x-boundlist-item">',
            '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
            '<div class="ddo-tag-Name">{empname}</div></li>',
            '</tpl>',
            '</ul>', {
                getTags: function (values) {
                    if (typeof (values) === "object") {
                        if (values.profilepic) {
                            return '<img class="tagUrl-img"  src="' + values.profilepic + '" >';
                        }
                    }
                }
            }
        ],
        listeners: {
            select: 'onNominateTagSelect',
            change: 'onNominateTagChange'
        }
    }, {
        xtype: 'datefield',
        name: 'karmaGivenDate',
        reference: 'karmaGivenDate',
        emptyText: LabelsTitles.NOMINATION.SELECTDATETEXT,
        format: 'F,Y',
        margin: '0 0 0 10',
        labelAlign: 'top',
        width: 200,
         flex:1,
        fieldLabel: 'Select Month & Year',
        maskRe: /[0-9\-\/]/,
        allowBlank: false,
       // hidden: true,
       cls: 'ddo-adddetails-combo nom-datefiled-cls',
        createPicker: function () {
            var me = this,
                format = Ext.String.format;
            return Ext.create('Ext.picker.Month', {
                pickerField: me,
                ownerCt: me.ownerCt,
                renderTo: document.body,
                floating: true,
                hidden: true,
                focusOnShow: true,
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
                    select: 'onDateSelect',
                    monthdblclick: 'onDateOKClick',
                    yeardblclick: 'onDateOKClick',
                    OkClick: 'onDateOKClick',
                    CancelClick: 'onDateCancelClick'
                },
                keyNavConfig: {
                    esc: function () {
                        me.collapse();
                    }
                }
            });
        }
    }, 
    {
        xtype: 'nominateothersratingselector',
        reference: 'nominateratingselectorref',
       // cls: 'nominate-detailview-cls'
    }, 
    {
        xtype: 'container',
        reference: 'nominatecontainer',
        cls: 'nominatecombocontainer',
        bodyPadding: '5 0 3 0',
        layout: {
            type: 'hbox'
        },
        items: [
            {
                xtype: 'container',
                padding: '0px 5px 0px 0px',
                items: [{
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                   items:[
                    {
                        xtype: 'combobox',
                        width: 200,
                        reference: 'karmacategoryycombo',
                        name: 'karmacategoryycombo',
                        forceSelection: true,
                        editable: false,
                        fieldLabel: 'Choose Karma category',
                        labelSeparator: '',
                        labelAlign: 'top',
                        cls: 'ddo-adddetails-combo',
                        queryMode: 'local',
                        emptyText: 'Select Category',
                        // bind: {
                        //     value: '{karmaComboValue}'
                        // },
                        store: 'karmasetup.KarmaCategoriesStore',
                        //name:'nominatestoreform',
                        margin: '0 0 0 5',
                        displayField: 'name',
                        valueField: 'ddo_karmacategory_id',
                        allowBlank: false,
                        listeners: {
                            select: 'onSelect'
                        }
                    },
                    {
                        xtype: 'combobox',
                        width: 200,
                        reference: 'nominatekarmacombo',
                        name: 'nominatekarmacombo',
                        forceSelection: true,
                        editable: false,
                        fieldLabel: 'Choose Karma Type',
                        labelSeparator: '',
                        labelAlign: 'top',
                        cls: 'ddo-adddetails-combo',
                        queryMode: 'local',
                        emptyText: 'Select Type',
                        bind: {
                            value: '{karmaComboValue}'
                        },
                        store: 'karmasetup.KarmaNominateStore',
                        name:'nominatestoreform',
                        margin: '0 0 0 5',
                        displayField: 'name',
                        valueField: 'ddo_karma_id',
                        allowBlank: false,
                        listeners: {
                            select: 'onKarmaComboSelect'
                        }
                    },
                 
                   ]
                },
            
                 {
                    xtype: 'numberfield',
                    margin: '18 0 0 5',
                    enableKeyEvents: true,
                    name: 'karmaunits',
                    cls: 'karmaunits-num-cls',
                    reference: 'karmaunits',
                    emptyText: LabelsTitles.NOMINATION.KARMAUNITSTEXT,
                    bind: {
                        hidden: '{ruleView}',
                        value: '{karmaUnits}'
                    },
                    allowBlank: false,
                    hideTrigger: true,
                    allowDecimals: false,
                    listeners: {
                        keyup: 'onRuleFocusLeave'
                    }
                },
                 {
                    xtype: 'nominateothersviewicons',
                    name:'ratinginstance',
                    margin: 5,
                    reference: 'nominateviewicons',
                    bind: {
                        hidden: '{ratingView}',
                        selection: '{iconSelection}'
                    }
                 }
             ]

            }, {
                xtype: 'displayfield',
                cls: 'nominate-karmascore-cls',
                name: 'visitor_score',
                width: 178,
                height:160,
                bind: {
                    html: '<div><div class="karmascoreval-cls">{points}</br><span class="karmascoretext-cls">{scoreText}</span></div></div>'
                }
            }
        ]
    }, {
        xtype: 'textarea',
        name: 'comment',
        //hideTrigger: true,
        bind: {
            fieldLabel: 'Enter your message here in {minChars} Charecters'
        },
        reference: 'ratingcomment',
        cls: 'nominate-form-htmleditor-cls nominatehtmledit-top',
        labelSeparator: '',
        margin: '10 10',
        width: '100%',
        height: Constants.ViewportHeight * 0.20,
        emptyText:'Remarks',
        labelAlign: 'top',
        listeners: {
            change: 'onTextAreaLength',
            // render: function (editor) {
            //     editor.getToolbar().hide();
            // }
        }
    }],
    bbar: {
        cls: 'nom-toolbar-cls',
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            reference: 'submit',
            text: LabelsTitles.NOMINATION.NOMINATEOTHERSUBMIT,
            cls: 'nom-submit-cls',
           
            flex:0.25,
            height: 46,
            margin: '5 5 5 12',
            bind: {
                disabled: '{nomSubBtn}'
            },
            listeners: {
                click: 'onNominateFormSubmit'
            }
        }]
    }
});