Ext.define('TalentAcquisition.store.jobsourcelines.Vendor', {
    extend: 'Ext.data.ChainedStore',
    requires: [
        'TalentAcquisition.store.jobsourcelines.JobSourceLinesStore'
    ],
    source:'jobsourcelinesstores',
    alias: 'store.vendor',
    autoLoad:true,
    storeId:'vendor',
    filters:[function(item) {
        return item.get('ddo_jobsource_name') == "Consultancy" ? true : false;
    }]
});
