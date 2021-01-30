Ext.define('TalentAcquisition.store.jobinterviewrating.JobInterviewRatingStore', {
    extend: 'Ext.data.Store',

    alias: 'store.jobinterviewratingstore',

    requires: [
        'TalentAcquisition.model.jobinterviewrating.JobInterviewRating'
    ],
    model: 'TalentAcquisition.model.jobinterviewrating.JobInterviewRating',
    proxy: {
        type: 'ajax',
        api: {
            read: '/jobinterviewrating',
            update: '/jobinterviewrating',
            create: '/jobinterviewrating',
            destroy: '/jobinterviewrating'
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
