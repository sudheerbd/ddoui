Ext.define('DDO.view.profile.details.ExperienceViewController', {
    //extend: 'DDO.view.jobs.JobsContainerController',
    extend: 'Ext.app.ViewController',

    alias: 'controller.experienceviewcontroller',

    /*Job Details Views*/

    // experience job container add button 
    addNewJobButtonTap: function(btn) {
        var experienceView = this.getView(),
            form = Ext.create('DDO.view.profile.details.AddJobsForm');

        form.getViewModel().set('jobsFormTitle', 'Add Experience');
        form.show();
    },


    /* Editing details - Jobs Details View*/

    //editing details of experience
    onEditBtnClick: function(view, index, target, record, e, eOpts) {
        var me = this,
            targetDom = e.getTarget(),
            targetEl = Ext.get(targetDom),
            dataNode, formNode,
            form = me.lookupReference('addjobsform'),
            fromMonth = this.findMonth(record.get('from_month')),
            to_month = this.findMonth(record.get('to_month')),
            iscurrentlyworking = record.get('iscurrentlyworking'),
            isCurrentlyWorkingValue = (iscurrentlyworking === 'Y' ? true : false);

        if (targetEl.hasCls('ddo-edit-img')) {
            var form = Ext.create('DDO.view.profile.details.AddJobsForm', {
                operation: 'editform',
                index: index
            });

            form.getViewModel().set('jobsFormTitle', 'Edit Experience');

            form.setValues({
                cityname: record.data.cityname,
                company: record.data.company,
                designation_when_left: record.data.designation_when_left,
                from_month: record.data.from_month,
                from_year: record.data.from_year,
                iscurrentlyworking: record.data.iscurrentlyworking,
                remark: record.data.remark,
                to_month: record.data.to_month,
                to_year: record.data.to_year,
                hr_employee_workex_id: record.data.hr_employee_workex_id
            });

            var startDateField = form.lookupReference('jobsFormStartDate'),
                //startDate = new Date(record.data.from_month + record.data.from_year),
                endDateField = form.lookupReference('jobsFormEndDate'),
                to_month = record.data.to_month,
                from_month = record.data.from_month,
                from_month_number = ((parseInt(from_month)) - 1),
                to_month_number = ((parseInt(to_month)) - 1),
                toggleCmp;

            if (iscurrentlyworking) {
                toggleCmp = form.lookupReference('iscurrentlyworkingtoglefield');
                toggleCmp.setValue(iscurrentlyworking);
            }   

            if (Ext.isNumber(to_month_number)) {
                var to_month_name = Ext.Date.monthNames[to_month_number],
                    endDate = new Date(to_month_name + record.data.to_year);

            } else {
                var endDate = new Date(record.data.to_month + record.data.to_year);
            }
            
            if (Ext.isNumber(from_month_number)) {
                var from_month_name = Ext.Date.monthNames[from_month_number],
                    startDate = new Date(from_month_name + record.data.from_year);

            } else {
                var startDate = new Date(record.data.from_month + record.data.from_year);
            }
            startDateField.setValue(startDate);
            if (iscurrentlyworking) {
                endDateField.setValue(new Date());

            } else {
                endDateField.setValue(endDate);
            }
            form.show();
        }
    },

    findMonth: function(mon) {
        var mon = mon;
        var d = Date.parse(mon + "1, 2012");
        if (!isNaN(d)) {
            return new Date(d).getMonth();
        } else {
            return new Date().getMonth();
        }
    },

    // If not data expand button will hide
    onJobsViewRendered: function() {
        var me = this,
            store = me.lookupReference('jobdetailsview').getStore();
        Ext.defer(function() {

            if (!Ext.isEmpty(store) && !Ext.isEmpty(store.data) && store.data.length < 1) {
                me.lookupReference('jobsExpandOrCollapse').hide();
            }
        }, 1000);
    },

    //if data more than one it hides
    jobsExpandOrCollapse: function(btn) {
        var me = this;
        if (btn.getIconCls().indexOf('fa-chevron-down') > 0) {
            btn.setIconCls('fa fa-chevron-up');
            Ext.Array.each(me.lookupReference('jobdetailsview').getViewItems(), function(item) {
                item.style.display = "block";
            });
        } else {
            btn.setIconCls('fa fa-chevron-down');
            Ext.Array.each(me.lookupReference('jobdetailsview').getViewItems(), function(item, index) {
                if (index > 0) {
                    item.style.display = "none";
                }
            });
        }
    }
});