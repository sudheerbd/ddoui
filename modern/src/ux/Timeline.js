/*
 * Creating timeline custom component by extending grid component. If you want to create timeline component 
 * just extend "DDO.ux.Timeline" class where you want.
 *
 */

Ext.define('DDO.ux.Timeline', {
    extend: 'Ext.dataview.DataView',
    xtype: 'timeline',

    /**
     * @cfg {String} theme is for configure color of vertical scroller.
     */
    theme: '#fabc16',
    // emptyText:'<div class="timeline-emptytext"><div class="timeline-emptytext-item">'+
    //          '<div class="timeline-emptytext-box">'+
    //          '<div class="timeline-left-image"><img src="resources/images/timeline/Icons-1.png" /></div>' +
    //          '<div class="timeline-right-image">'+
    //          '<div class="timeline-icon-3">'+
    //          '<img src="resources/images/timeline/icon-3.png"/></div>'+
    //         '<div class="timeline-icon-2"><img class="icon-2" src="resources/images/timeline/icon-2.png"/><img class="icon-4" src="resources/images/timeline/icon-4.png"/></div>'+
    //          '<div class="timeline-icon-text"><div class="timeline-text">keep up the good work! <br> your timeline will be updated soon </div><span><img src="resources/images/timeline/icon-5.png"/></span></div>'+

    //           '<div class="timeline-icon-6"><img src="resources/images/timeline/icon-6.png"/></div></div>'+


    //          '</div>'+
    //      '</div></div>',
    emptyText: '<div class="timeline-emptytext"><div class="timeline-emptytext-item">' +
        '<div class="timeline-emptytext-box">' +
        '<table style="margin-top:10px;">' +
        '<tbody><tr>' +
        '<td colspan="6"><img src="resources/images/timeline/icon-3.png" ></td>' +
        '</tr>' +

        '<tr>' +
        '<td colspan="3"><img src="resources/images/timeline/icon-2.png" ></td>' +
        '<td colspan="3"><img src="resources/images/timeline/icon-4.png" ></td>' +
        '</tr>' +


        '<tr>' +
        '<td colspan="2"><img class="icon-cls" src="resources/images/timeline/Icons-1.png" ></td>' +
        '<td colspan="2">keep up the good work! <br> your timeline will be updated soon </td>' +
        '<td colspan="2"><img src="resources/images/timeline/icon-5.png" ></td>' +
        '</tr>' +

        '<tr><td colspan="3"></td><td colspan="3"><img src="resources/images/timeline/icon-6.png" ></td></tr>' +

        '</tbody></table>' +
        '</div></div></div>',


    itemTpl: ['<div class="timeline-item">',
        '<div class="timeline-day">{[this.dateFormating(values)]}</div>',
        '<div class="timeline-outer"><div class="timeline-inner" style="background:{[this.ownerView.theme]}">',
        '</div>',
        '</div>',
        '<div class="timeline-box">',
        '<div class="timeline-title">{activity_title}</div>',
        //'<div class="timeline-title">{title}</div>' ,
        '<tpl if="type && (type.toLowerCase() !== \'standard\')">',
        '<img class="timeline-badge" src="resources/images/badges/{[this.getBadge(values.type)]}.png" alt="{searchkey}">',
        '</tpl>',
        '<div class="timeline-content">{activity_description}</div>',
        //'<div class="timeline-content">{content}</div>' ,
        '</div>',
        '</div>', {
            // To get the image name as per the type specified
            getBadge: function(type) {
                return type.replace(' ', '_').toLowerCase();
            },

            // Formatting date of timeline
            dateFormating: function(values) {
                var dt = new Date(values.activity_on);
                //var dt=new Date(values.date);
                return Ext.Date.format(dt, 'j M Y')
            }
        }
    ],

    initialize: function() {

        this.callParent(arguments);
        // for theme
        this.getItemTpl().ownerView = this;
    }

});
