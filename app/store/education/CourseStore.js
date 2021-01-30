Ext.define('DDO.store.education.CourseStore', {
    extend: 'Ext.data.Store',
    alias: 'store.coursestore',

    storeId: 'coursestore',

    requires: [
        'DDO.model.education.CourseModel'
    ],

    model: 'DDO.model.education.CourseModel',

    autoLoad: false,

    method: 'GET',

    proxy: {
        type: 'ajax',
        //url: '/profile/getEducationForCombo',
        url:'resources/data/profile/educationcourses.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});