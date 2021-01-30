/**
 * The file ProjectDashboardView is the dashboard view in the projects tab.
 * @extends {Ext.view.View}.
 * @alias 'widget.projectdashboardview'.
 */
Ext.define('DDO.view.projects.ProjectDashboardView', {
    extend: 'Ext.view.View',
    alias: 'widget.projectdashboardview',
    cls: 'project-dashboard-view-cls',
  
    emptyText:'<div class="projects-emptytext-cls">No Projects available</div>',
    initComponent: function() {
        var store = Ext.getStore('projects.ProjectDashboardStore');
        Utility.onStoreLoading(store);
        this.callParent(arguments);
    },
    loadMask: false,
    width : '24%',
    height: '100%',
    scrollable : 'y',
   
    // tpl: [
                        
    //     '<div class="testing">',
    //     // '<h2 style = "color:#707070; "> Client Details </b> </h2>',
    //     // '<tpl if="this.imgExistance(values)">',
    //     // '<img src="{[this.projectImageUrl(values)]}" class="pro-tab-img-cls" wrap-td="image_url" onerror = ' + Utility.defaultProjectImg + '>',
    //     // '<br />',
    //     // '<tpl else>',
    //     // '<div style="background: {[this.nonImgColor(values)]};" wrap-td="image_url" class="pro-tab-non-img-cls"><span class="testing">{[this.getNonImgFirstLetter(values)]}</span></div>',
    //     // '<br />',
    //     // '</tpl>',
    //     '<div class="pro-tab-name-cls" data-qtip="{name}" >{name}</div>',
    //     '<div class = "projectid"> Project Id : {project_id}</div>',
    //     '<p>Client Name:</p>',
    //     '<div class ="clientname-cls">{clientname}</div>',
    //     '</div>',
    //     {
    //         setId: function (values) {
               
    //             var itemId;
    //             itemId = 'input_' + values.project_id;
    //             Ext.Function.defer(this.addListener, 2, this, [itemId, values]);
    //             return itemId;
    //         },
    //         projectImageUrl: function (values) {
    //         //   debugger;
    //             var path = values.image_url;
    //             return (path) ? Utility.imageCheck(path) : Utility.projectImg;
    //         },
    //         imgExistance: function (values) {
    //             // debugger;
    //             if (values.image_url && values.image_url != "null") {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         },
    //         nonImgColor: function (values) {
    //             return values.color || '#FFFFFF 0% 0% no-repeat padding-box;';
    //         },
    //         getNonImgFirstLetter: function (values) {
    //             return values.name[0];
    //         }
    //     }
    // ],
   
    
    tpl: [
        '<tpl for=".">',
            '<div class="project-dashboard-cls">',
                '<table border="1" class="project-dash-table-cls">',
                
                '<tr><div class="pro-tab-name-cls" data-qtip="{name}" > {name}</div></tr>',      
                '<tr><div class = "projectid-cls">  Project Id : {project_id}&nbsp | &nbsp Client:{clientname} &nbsp <div class="act-cls edit-project-cls"> <i class="x-fa fa-pencil act-arrow arrow-cls"></i></div> </div></tr>',
                // '<span  class ="clientname-cls"> Client Name:{clientname}</span></div></tr>',
                // '<tr><p>Client Name:</p></tr>',
                // '<tr><div class ="clientname-cls">{clientname}</div></tr>',
                    // '<tr>',
                    //     '<td rowspan="2" class="pro-dash-td-cls">',
                    //         '<tpl if="this.imgExistance(values)">',
                    //             '<img src="{[this.projectImageUrl(values)]}" class="pro-dash-img-cls" wrap-td="image_url" onerror = '+Utility.defaultProjectImg+'>',
                    //         '<tpl else>',
                    //             '<div style="background: {[this.nonImgColor(values)]};" wrap-td="image_url" class="pro-dash-non-img-cls">',
                    //             '<span class="first-letter-pro-cls">{[this.getNonImgFirstLetter(values)]}</span></div>',
                    //         '</tpl>',
                    //         '<div class="pro-name-cls"><span class = "pro-name-cls-icon"></span>{name}-{project_id}</div>',
                    //     '</td>',
                    //     '<td class="pro-dash-td-cls" wrap-td="people_count"><div wrap-td="people_count"class="dash-count-cls">{people_count}</div>',
                    //     '<br /><span class="x-fa fa-users" wrap-td="people_count"></span> People</td>',
                    //     '<td class="pro-dash-td-cls" wrap-td="todo_count"><div wrap-td="todo_count" class="dash-count-cls">{todo_count}</div>',
                    //     '<br /><span wrap-td="todo_count" class="x-fa fa-file-text-o"></span> Open Todo</td>',
                    // '</tr>',
                    // '<tr>',
                    //     '<td class="pro-dash-td-cls" wrap-td="qa_audit_score"><div wrap-td="qa_audit_score" class="dash-count-cls">{forcast_hrs}</div>',
                    //     '<br /><span wrap-td="qa_audit_score" class="x-fa fa-bookmark-o"></span> Forecasted hrs</td>',
                    //     '<td class="pro-dash-td-cls" wrap-td="risks_unresolved"><div wrap-td="risks_unresolved" class="dash-count-cls">{risks_unresolved}</div>',
                    //     '<br /><span wrap-td="risks_unresolved" class="x-fa fa-object-group"></span> Unresolved Risks</td>',
                    // '</tr>',
                '</table>',
            '</div>',
        '</tpl>',{
            imgExistance: function(values) {
                if(values.image_url && values.image_url != "null") {
                    return true;
                } else {
                    return false;
                }
            },
              projectImageUrl:function(values){
                var path = values.image_url;
                return (path) ? Utility.imageCheck(path) : Utility.projectImg;
            },
            nonImgColor: function(values) {
               values.color = Utility.colorPicker[Math.floor(Math.random()*Utility.colorPicker.length)];
               return values.color;
            },
            getNonImgFirstLetter: function(values) {
                return values.name[0];
            },
            getIndex: function(values, index) {
                return index;
            }
        }
    ],
    
    itemSelector: '.edit-project-cls',
    listeners: {
        itemclick: 'onDataItemClick'
    }
    
});