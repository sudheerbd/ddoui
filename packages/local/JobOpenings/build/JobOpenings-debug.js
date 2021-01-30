Ext.define('JobOpenings.model.jobopeningrequest.JobOpeningsRequestDataModel', {
    extend: 'Ext.data.Model',
    fields: [
        'title',
        'recruiter_name',
        {
            name: 'count'
        }
    ]
});


Ext.define('JobOpenings.store.jobopeningrequest.JobOpeningsRecruiter', {
    extend: 'Ext.data.Store',
    alias: 'store.jobopeningsrecruiter',
    requires: [
        'JobOpenings.model.jobopeningrequest.JobOpeningsRequestDataModel'
    ],
    model: 'JobOpenings.model.jobopeningrequest.JobOpeningsRequestDataModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'resources/data/jobopenings/recruiterslist.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('JobOpenings.store.jobopeningrequest.JobOpeningsRequestDataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jobopeningsrequestdatastore',
    //storeId: 'jobopenings',
    requires: [
        'JobOpenings.model.jobopeningrequest.JobOpeningsRequestDataModel'
    ],
    model: 'JobOpenings.model.jobopeningrequest.JobOpeningsRequestDataModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'resources/data/jobopenings/jobopeningsdata.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('JobOpenings.view.jobopeningrequest.JobOpeningsDataView', {
    extend: 'Ext.container.Container',
    xtype: 'jobopeningsdataview',
    requires: [
        'JobOpenings.store.jobopeningrequest.JobOpeningsRequestDataStore'
    ],
    cls: 'jobopening-cls noscrollbar',
    //  height:500,
    //  width:500,
    items: [
        {
            xtype: 'dataview',
            emptyText: 'No images available',
            store: 'JobOpenings.store.jobopeningrequest.JobOpeningsRequestDataStore',
            itemTpl: [
                '<div class="jobsdiv-cls ddo-jobopening-item">',
                '<div class="title-div-cls"><span class="title-cls">{title}</span>',
                '<span> | </span>',
                '<span class="creator-cls">Created By {creator}</span>',
                '<div class="positions-cls">(4)Positions</div>',
                '</div>',
                '<div class="loc-exp"><span><i class="x-fa fa-suitcase arrow-cls"></i>&nbsp{experience}Years Experience </span>',
                '<span><i class="x-fa fa-location-arrow arrow-cls"></i>&nbsp{location}</span>',
                '</div>',
                '<div class="skill-cls"><i class="x-fa fa-dot-circle-o arrow-cls"></i>{skils}</div>',
                '<div class="desc-cls">{jobdesc}</div>',
                '</div>',
                '<div class="status-div-cls"><span>Status: {status}</span>',
                '<div class="status-combo-cls">{[this.listRecruiter(values)]}',
                // '<select class="select-cls">Assign To ',
                //'',
                // '<tpl for ="values.recruiter_name">',
                // '{%debugger;%}',
                // '<option>{recruiter_name}</option>',
                // '</tpl>',
                // '</select>',
                // '<i class="x-fa fa-sort-desc arrow-cls"></i>',
                '<span> | </span>',
                '<div class="act-cls">Actions <i class="x-fa fa-sort-desc arrow-cls"></i>',
                '<div class="act-list act-removecls"><ul><li>edit</li><li>delete</li></ul></div></div>',
                // '<select class="select-cls">',
                // '<option selected disabled>Actions</option>',
                // '<option>Edit</option><option>Delete</option><option>Close</option></select>',
                '</div>',
                '</div>',
                {
                    listRecruiter: function(values) {
                        var lists = [],
                            jobOpeningsStore = Ext.getStore('JobOpenings.store.jobopeningrequest.JobOpeningsRecruiter');
                        // console.log('jobOpeningsStore', jobOpeningsStore.getCount());
                        if (jobOpeningsStore && jobOpeningsStore.getCount() > 0) {
                            jobOpeningsStore.each(function(rec) {
                                lists.push('<li><i class="checkImg"></i>' + rec.get('recruiter_name') + '</li>');
                            });
                        }
                        // console.log('check: ', lists, '<select class="select-cls">' + lists.toString() + '</select>');
                        return '<div class="rec-assigncls">Assign To <i class="x-fa fa-sort-desc arrow-cls"></i><div class="act-removecls"><ul>' + lists.toString() + '</ul></div></div>';
                    }
                }
            ],
            itemSelector: 'div.status-div-cls',
            listeners: {
                itemclick: function(vw, record, item, index, e, eOpts) {
                    if (e.target.lastChild.classList.value !== "act-showcls") {
                        e.target.lastChild.className = "act-showcls";
                        e.target.lastChild.classList.remove('act-removecls');
                    } else {
                        e.target.lastChild.className = "act-removecls";
                        e.target.lastChild.classList.remove('act-showcls');
                    }
                }
            }
        }
    ]
});

Ext.define('JobOpenings.view.jobopeningrequest.JobOpeningsView', {
    extend: 'Ext.container.Container',
    xtype: 'jobopeningsview',
    requires: [
        //'DDO.view.jobopenings.jobopeningrequest.JobOpeningSearchView',
        'JobOpenings.view.jobopeningrequest.JobOpeningsDataView'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    margin: '10 0 0 10',
    //width:500,
    // height:500,   
    items: [
        //     {
        //     xtype:'jobopeningsearchview'
        // },
        {
            xtype: 'jobopeningsdataview'
        }
    ]
});

