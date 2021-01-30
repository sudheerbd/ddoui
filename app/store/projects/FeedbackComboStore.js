Ext.define('DDO.store.projects.FeedbackComboStore', {
    extend: 'Ext.data.Store',

    alias: 'store.feedbackcombostore',

    requires: [
        'DDO.model.projects.FeedbackCombo'
    ],

    model: 'DDO.model.projects.FeedbackCombo',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Api.URL.feedbackcombostore.READ,

        reader: {
            type: 'json',
            rootProperty: "data"
        }
    }
});