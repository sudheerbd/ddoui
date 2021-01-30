/**
 * The file EducationData is the data view for the education details in the profile view.
 * @extends {Ext.view.View}.
 * @alias 'widget.educationdata'.
 */
Ext.define('DDO.view.profile.details.EducationData', {
    extend: 'Ext.view.View',

    xtype: 'educationdata',

    loadMask: false,

    initComponent: function() {
        this.callParent(arguments);
        var me = this;
        var courseStore = Ext.getStore('coursestore');
        courseStore.load({
            callback: function (records, operation, success) {
                me.tpl.coursesStore = Ext.getStore('coursestore');
            }
        });
    },

    tpl: [
        '<tpl for="."><div class="ddo-dataview-div-line"></div><div class="ddo-education-div">',
        '<div class="ddo-title-wrap"><span class="ddo-school-name">{school}</span><span class="ddo-edit-view">',
        '<img class="ddo-education-edit-img" style="display:none;" src="resources/images/edit.png" >',
        '</span></div><div class="ddo-education-view-text">{[this.getCourse(values)]}</div>',
        '<div class="ddo-education-view-text">',
        '<tpl if="values.todateattended">{todateattended}<tpl else>N/A</tpl></div>',
        '<div class="ddo-education-view-text">{description}</div></div>',
        '<div class="form"></div></tpl>', {
            getCourse: function(values) {
                var comboStore = this.coursesStore,
                    dataArray,
                    rec;
                if (comboStore.totalCount === comboStore.data.length) {
                    rec = comboStore.findRecord('courseid', values.courseid);
                    if (!Ext.isEmpty(rec)) {
                        return rec.data.course;
                    }
                } else {
                    dataArray = comboStore.data.getSource().items;
                    for (var i = 0, len = dataArray.length; i < len; i++) {
                        if (dataArray[i].data.courseid === values.courseid) {
                            return dataArray[i].data.course;
                        }
                    }
                }
            }
        }
    ],
    itemSelector: 'div.ddo-education-div',

    emptyText:LabelsTitles.PROFILE.EDUCATION.EMPTYTEXT,

    listeners: {
        itemclick: 'onEditBtnClick',
        itemmouseenter: 'onItemMouseEnter',
        itemmouseleave: 'onItemMouseLeave'
    }
});