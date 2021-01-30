Ext.define('TalentAcquisition.store.interviewdetails.Interviewdetails', {
    extend: 'Ext.data.Store',

    alias: 'store.interviewdetailsstore',

    requires: [
        'TalentAcquisition.model.interviewdetails.InterviewDetails'
    ],
    model: 'TalentAcquisition.model.interviewdetails.InterviewDetails',
   /* proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }*/
});
