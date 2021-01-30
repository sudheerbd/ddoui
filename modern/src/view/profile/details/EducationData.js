Ext.define('DDO.view.profile.details.EducationData', {
    extend: 'Ext.dataview.DataView',
    xtype: 'educationdata',

    reference: 'educationdata',

    initialize: function() {
        this.callParent(arguments);
        this.getItemTpl().coursesStore = Ext.getStore('coursestore');
    },

    cls: 'educationdata',

    scrollable: false,

    itemTpl: [
        '<tpl for="."><div class="ddo-dataview-div-line"></div><div class="ddo-education-div">',
        '<div class="ddo-title-wrap"><span class="ddo-school-name">{school_college}</span><span class="ddo-edit-view">',
        '<tpl if="this.getValidation(values)">',
        '<img class="ddo-edit-img" src="resources/images/edit.png" >',
        '</tpl>',
        '</span></div><div class="ddo-education-view-text">{[this.getCourse(values)]}</div>',
        '<div class="ddo-education-view-course-text">',
        '<tpl if="values.year_of_passing">{year_of_passing}<tpl else>N/A</tpl></div>',
        '<div class="ddo-education-view-text">{remark}</div></div>',
        '<div class="form"></div></tpl>', {
            getCourse: function(values) {
                var comboStore = this.coursesStore,
                    dataArray,
                    rec;
                if (comboStore.totalCount === comboStore.data.length) {
                    rec = comboStore.findRecord('id', values.hr_degrees_id);
                    if (!Ext.isEmpty(rec)) {
                        return rec.data.name;
                    }
                } else {
                    dataArray = comboStore.data.getSource().items;
                    for (var i = 0, len = dataArray.length; i < len; i++) {
                        if (dataArray[i].data.id === values.hr_degrees_id) {
                            return dataArray[i].data.name;
                        }
                    }
                }
            }
        }, {
            getValidation: function(values) {
                var view = Ext.ComponentQuery.query('educationview')[0],
                    viewModel, nonPersonalAcccess;

                if (view) {
                    viewModel = view.getViewModel();
                    nonPersonalAcccess = viewModel.get('nonPersonalAcccess');
                    return !nonPersonalAcccess;
                }

                return true;
            }
        }
    ],

    emptyText: '<div class="ddo-emptytext">No Records Added</div>',

    listeners: {
        itemtap: 'onEditBtnClick',
        painted: 'onViewRendered'
    }
});