Ext.define('TalentAcquisition.store.jobsourcelines.Portal', {
    extend: 'Ext.data.ChainedStore',
    requires: [
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'
    ],
    source:'jobsourcelinesstores',
    alias: 'store.portal',
    storeId:'portal',
    autoLoad:true,
    filters:[function(item) {
        return item.get('ddo_jobsource_name') == "Job Portal" ? true : false;
    }]
});
