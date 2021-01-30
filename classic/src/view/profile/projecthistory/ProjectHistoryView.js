/**
 * The file ProjectHistoryView is the view file gird view of project history in the profile view of the user.
 * @extends {Ext.grid.Panel}.
 * @alias 'widget.projecthistoryview'
 */
Ext.define('DDO.view.profile.projecthistory.ProjectHistoryView',{
    extend: 'Ext.grid.Panel',
    requires:[
        'DDO.model.profile.ProjectHistoryModel',
        'DDO.store.profile.ProjectHistoryStore'
    ],
    xtype: 'projecthistoryview',
    store: {
        type: 'projecthistorystore'
    },
    cls: 'timeline-items-wrap',
    width:'100%',
    layout:'fit',
    hideHeaders: true,
    theme:'#fabc16',

    emptyText:'<div class="timeline-emptytext"><div class="timeline-emptytext-item">'+
                '<div class="timeline-emptytext-box">'+
                '<div class="timeline-left-image"><img src="resources/images/timeline/Icons-1.png" /></div>' +
                '<div class="timeline-right-image">'+
                '<div class="timeline-icon-3">'+
                '<img src="resources/images/timeline/icon-3.png"/></div>'+
               '<div class="timeline-icon-2"><img class="icon-2" src="resources/images/timeline/icon-2.png"/><img class="icon-4" src="resources/images/timeline/icon-4.png"/></div>'+
                '<div class="timeline-icon-text"><div class="timeline-text">keep up the good work! <br> your timeline will be updated soon </div><span><img src="resources/images/timeline/icon-5.png"/></span></div>'+
            
                 '<div class="timeline-icon-6"><img src="resources/images/timeline/icon-6.png"/></div></div>'+


                '</div>'+
            '</div></div>',

    columns: [{
        flex: 1,
        xtype: 'templatecolumn',
        tpl: ['<div class="timeline-item">' ,
                '<div class="timeline-day">{[this.dateFormating(values)]}</div>' ,
                    '<div class="timeline-outer"><div class="timeline-inner" style="background:{[this.ownerView.theme]}">',
                    '</div>',
                '</div>' ,
                '<div class="timeline-box">',
                    '<div class="timeline-title">Allocated {allocpercent} %',
                          '<span class="appreciated-author-cls" > By- {reqtoname}  </span>',
                    '</div>' ,
                    '<div class="timeline-content">',

                        '<div class="ddo-project-summary-columns">',
                        '<div class="ddo-project-summary-start-date-text">Start Date</div>',
                        '<div class="ddo-project-summary-end-date-text">End Date</div>',
                        '<div class="ddo-project-summary-project-text">Project</div>',
                        '<div class="ddo-project-summary-requestby-text">Request By</div>',
                        '</div>',
                        '<div class="project-summary-inner-scroll">',

                        '<div class="ddo-project-summary-details">',
                        '<div data-qtip="{empname}" class="ddo-project-summary-start-date">{[this.dateFormating(values)]}</div>',
                        '<div data-qtip="{projectname}" class="ddo-project-summary-end-date">{[this.endDateFormat(values)]}</div>',
                        '<div class="ddo-project-summary-project">{projectname}</div>',
                        '<div class="ddo-project-summary-requestby">{reqbyname}</div>',
                        '</div>',
                        '</div>',
                '</div>',
           '</div>',
            {
            // Formatting date of timeline
            dateFormating: function(values) {
                var dt = new Date(values.startdate);
                return Ext.Date.format(dt, 'j M Y');
            },
            endDateFormat: function(values){
                
                var dt = new Date(values.enddate);
                return Ext.Date.format(dt, 'j M Y');
            }
        },
    ]}],
    initComponent:function(){

        this.callParent(arguments);
 
        //Passing timeline view into column tpl for getting view configs.
        this.columns[0].getTpl('tpl').ownerView = this;
     }
    
   
});