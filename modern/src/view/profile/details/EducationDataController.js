Ext.define('DDO.view.profile.details.EducationDataController', {
    extend: 'DDO.view.education.EducationController',

    alias: 'controller.educationdatacontroller',

    onAddNewClick: function() {
        var educationView = this.getView(),
            form = Ext.create('DDO.view.profile.details.AddEducationDetails');

        form.getViewModel().set('educationFormTitle', 'Add Education');
        form.reset();
        form.show();
    },

    expandOrCollapse: function(btn) {
        var me = this;

        if (btn.getIconCls().indexOf('fa-chevron-down') > 0) {
            btn.setIconCls('fa fa-chevron-up');
            Ext.Array.each(me.lookupReference('educationData').getViewItems(), function(item) {
                item.style.display = "block";
            });
        } else {
            btn.setIconCls('fa fa-chevron-down');
            Ext.Array.each(me.lookupReference('educationData').getViewItems(), function(item, index) {
                if (index > 0) {
                    item.style.display = "none";
                }
            });
        }
    },

    onViewRendered: function() {
        var me = this,
            store = me.lookupReference('educationData').getStore();

        Ext.defer(function() {
            if (!Ext.isEmpty(store) && !Ext.isEmpty(store.data) && store.data.length < 1) {
                me.lookupReference('expandOrCollapse').hide();
            }
        }, 1000);
    },

    onEditBtnClick: function(view, index, target, record, e, eOpts) {
        var targetElement = Ext.toArray(e.target.classList);
        if (targetElement.indexOf('ddo-edit-img') != -1) {
            var form;

            if (record) {
                if (Utility.isFormDirty) {

                } else {
                    Utility.isFormDirty = true;

                    // suspend the layout to add the form
                    view.suspendLayout = true;

                    form = Ext.create('DDO.view.profile.details.AddEducationDetails', {
                        operation: 'editform', // edit operation
                        index: index
                    });
                    form.getViewModel().set('educationFormTitle', 'Edit Education');

                    form.setRecord(record);

                    form.show();
                    
                    var yearOfPassing = form.lookupReference('yearofpassing'),
                        yearStore = yearOfPassing.getStore(),
                        yearRecord = yearStore.findRecord('name', record.data.year_of_passing),
                        course = form.lookupReference('course'),
                        courseStore = course.getStore(),
                        courseRecord = courseStore.findRecord('hr_degrees_id', record.data.hr_degrees_id),
                        courseValue = courseRecord.data.name;

                    course.setValue(courseValue);
                    yearOfPassing.setSelection(yearRecord);

                    view.suspendLayout = false;
                    view.updateLayout();
                }
            }
        }
    }
});