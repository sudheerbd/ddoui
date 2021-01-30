Ext.define('TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.interviewdetailsview',
    cls: 'ta-header',
    requires: [
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsForm',
        'TalentAcquisition.ux.container.CollapsibleContainer',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsGrid',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsController',
        'TalentAcquisition.view.jobapplication.interviewdetails.InterviewDetailsViewModel',
        'TalentAcquisition.store.interviewdetails.Interviewdetails'
    ],
    controller: 'interviewdetailscontroller',
    viewModel: {
        type: 'interviewdetailsviewmodel'
    },
    title: 'Interview Details',
    layout:'vbox',
    tools:[{
        xtype: 'button',
        scale: 'medium',
        iconCls: 'goalsbackbtn-cls',
        cls: 'back-btn-cls',
        style:{
                border: 0
            },
        listeners:{
            click:'onInterviewBackButtonClick'
        }
    }],
    items: [{
        xtype: 'interviewdetailsform',
        width:'100%'

    },{
        xtype:'interviewdetailsgrid',
        flex:1,
        store: Ext.create('TalentAcquisition.store.interviewdetails.Interviewdetails')
    }]
});
