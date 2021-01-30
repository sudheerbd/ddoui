/**
 * This view is responsible for share tab in goals view.
 * @class 'Goals.view.ShareGoalsForm'
 * @extends 'Ext.container.Container'
 * @alias 'widget.sharegoalsform'
 * @ViewModel 'Goals.view.ExecutivePlanViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
Ext.define('Goals.view.ShareGoalsForm', {
    extend: 'Ext.container.Container',

    alias: 'widget.sharegoalsform',

    requires: [
        'Goals.overrides.form.field.Tag'
    ],

    layout: {
        type: 'hbox'
    },

    width: '100%',

    items: [{
        xtype: 'tagfield',
        width: '100%',
        margin:20,
        cls: 'sharegroup-cls',
        reference: 'tagscomboview',
        anyMatch: true,
        editable: true,
        matchFieldWidth: false,
        hideTrigger: true,
        forceSelection: false,
        store: 'karmasetup.wallet.EmployeeComboStore',
        emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.SELECTEMP,
        displayField: 'empname',
        valueField: 'empid',
        queryMode: 'local',
        filterPickList: true,
        listConfig: {
            cls: 'tag-view-list',
            width: Constants.ViewportWidth*0.22
        },
        tpl: [
            '<ul class="x-list-plain"><tpl for=".">',
            '<li role="option" class="x-boundlist-item">',
            '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
            '<div class="ddo-tag-Name">{empname}</div></li>',
            '</tpl>',
            '</ul>', {
                getTags: function(values) {
                    if (typeof(values) === "object") {
                    if(values.profilepic){
                        return '<img class="tagUrl-img"  src="' + values.profilepic + '" >';
                    }
                }
                }
            }
        ],
        listeners: {
             select: function( combo , record , eOpts )  {
                 combo.inputEl.dom.value = '';
                 combo.collapse();            
            }
        }

    }]


});