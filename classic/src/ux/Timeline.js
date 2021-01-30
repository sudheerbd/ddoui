/*
 * Creating timeline custom component by extending grid component. If you want to create timeline component 
 * just extend "DDO.ux.Timeline" class where you want.
 *
 */

Ext.define('DDO.ux.Timeline', {
    extend: 'Ext.grid.Panel',
    xtype: 'timeline',

    /**
     * @cfg {String} theme is for configure color of vertical scroller.
     */
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
                    '<div class="timeline-title">{activity_title}',
                       '<tpl if="nominated_by != null">',
                          '<span class="appreciated-author-cls" id="{[this.setId(values)]}"> By - {nominated_by}</span>',
                        '</tpl>',
                        '<tpl if="karmaname != null">',
                          '<span class="categoryname-cls">{karmaname}</span>',
                        '</tpl>',
                    '</div>' ,
                     //commented to remove badge image in view.
                    // '<tpl if="achievement">',
                    // '<img class="timeline-badge" src="resources/images/badges/{achievement}.png" alt="{searchkey}">' ,
                    // '</tpl>',
                    '<div class="timeline-content">{activity_description}</div>' ,
                '</div>',
           '</div>',
            {
            // Formatting date of timeline
            dateFormating: function(values) {
                var dt = new Date(values.activity_on);
                return Ext.Date.format(dt, 'j M Y');
            },
            setId: function(values) {
                var itemId;

                itemId = 'input_goals_id'+ values.nominatedempid;

                Ext.Function.defer(this.addListener, 2, this, [itemId, values]);

                return itemId;
            },
            addListener: function(id, values) {
                if (!Ext.isEmpty(Ext.get(id)) && !Ext.get(id).hasListener('blur')) {
                    Ext.get(id).on('click', function(e, opt) {
                        var targetid = arguments[0].delegatedTarget.id,
                            userProfileView = Ext.ComponentQuery.query('userprofile')[0],
                            view = Ext.ComponentQuery.query('usertimeline')[0],
                            cntrlr = view.getController(),
                            empId = targetid.split("input_goals_id")[1],
                            empLoginId = Ext.getStore("login").getAt(0).getData().ddo_employee_id,
                            profileRef = userProfileView.getReferences(),
                            profileView = profileRef.profileuserview,
                            profileTbrBtn = profileRef.detailsBtn;

                            profileView.setActiveItem(0);
                            profileTbrBtn.removeCls('detailsbutton');
                            profileTbrBtn.setText('View Timeline');
                            profileTbrBtn.addCls('timelinebutton');
                            profileRef.printBtn.setHidden(false);

                            cntrlr.redirectTo('profile/' + empId);

                    }, this);
                }
            }
         }
        ]
    }],
    initComponent:function(){

       this.callParent(arguments);

       //Passing timeline view into column tpl for getting view configs.
       this.columns[0].getTpl('tpl').ownerView = this;
    }
    
});

