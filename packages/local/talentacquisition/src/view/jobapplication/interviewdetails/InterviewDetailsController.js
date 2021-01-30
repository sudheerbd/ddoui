Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interviewdetailscontroller',

    onGridRowClick: function(me, record, element, rowIndex, e, eOpts) {
        var view = this.getView(),
            form = view.down('form').getForm();
        form.setValues(record.data);
        Ext.first('#eastcontainer').toggleCollapse(false);
    },
    onInterviewBackButtonClick: function(btn) {
        var view = this.getView(),
            main = view.up('jobapplicationmainview'),
            scheduleinterviewview = main.down('scheduleinterviewview');
        main.setActiveItem(scheduleinterviewview);
        view.down('button').setHidden(true);
        scheduleinterviewview.down('button').setHidden(false);
    }
});