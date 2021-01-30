/**
 * The file MomComponent is the view file for components in the MoM view.
 * @extends {Ext.view.View}
 * @alias 'widget.momcomponent'.
 */
Ext.define('DDO.view.mom.MomComponent', {
    extend: 'Ext.view.View',

    xtype: 'momcomponent',

    margin: '4 0 0 0',

    emptyText: LabelsTitles.MoM.EMPTYTEXTDATA,

    loadMask: false,
  
    store: 'mom.MomComponent',
 
    tpl: [
        '<tpl for=".">',
            '<div class="mom-view-cls {[this.getCompletedView(values,true)]}">',
                '<div class="mom-name-cls" {[this.validEllipsesQtip(values.agenda, 45)]}>',
                '{[this.getEllipseText(values.agenda, 45)]}</div>',
                '<tpl>',
                    '<div class="momDesId">',
                        '<pre class="mom-details mom-cmp-details"> {[this.getEllipseText(values.description_normal, 310)]}</pre>',
                    '</div>',
                    '<div style="border-bottom: 1px solid #d0d0d0;">',
                    '<tpl>',
                        '<div class="mom-textheader-cls">',
                            '<span class="mom-tokenNameTime" {[this.validEllipsesQtip(values.created_by, 17)]}>',
                            'By:-&nbsp <b>{[this.getEllipseText(values.created_by, 17)]}</b></span>',
                            '<span class="mom-date-hour-cls">Created on<b>{[this.getDateTime(values)]}</b></span>',
                        '</div>',
                    '</tpl>',
                '</div>',
                '</tpl>',
                '<table width="100%">',
                    '<tr>',
                        '<td class="mom-partcipant-cls">',
                            '<tpl for="participants">',
                                '<tpl if="xindex < 7">',
                                    '<span {[this.getQtip(values)]}>',
                                    '<img  width="30px" height="30px" style="margin-right:4px;" ',
                                    'src={[this.getPartcipants(values,false)]} alt="Post Type" onerror='+Utility.defaultUserImg+'>',
                                    '</span>',
                                '<tpl elseif="xindex === 7">',
                                    '<div class="mom-morePartcipant-cls">{[xcount-(xindex-1)]}more...</div>',
                                '</tpl>',
                            '</tpl>',
                        '</td>',
                        '<td class="mom-partcipant-td-cls">',
                            '<tpl if ="this.getDraftState(values)">',
                                '<div class="draft-mom-cls">',
                                    '<span class="draft-cls"></span>',
                                '</div>',
                            '</tpl>',
                            '<tpl if ="this.getPublishState(values)">',
                                '<div class="mom-btn-cls">',
                                    '<div class="mom-tasks">Open Tasks</div><div class="status-cls">{[this.getCompletedView(values,false)]}</div>',
                                '</div>',
                            '</tpl>',
                        '</td>',
                    '</tr>',
                '</table>',
            '</div>',
        '</tpl>', {
            getEllipseText: function(string, limit) {
                if (string && limit) {
                    return Ext.String.ellipsis(string, limit);
                }
            },
            validEllipsesQtip: function(value, limit) {
                if (value) {
                    var qtip = " data-qtip='" + value + "'";
                    return (value.length > limit) ? qtip : '';
                }
            },
            getQtip: function(value) {
                if (value) {
                    var qtip = " data-qtip='" + value.user_full_name + "'";
                    return qtip;
                }
            },
            getPartcipants: function(values, access) {
                if (!access) {
                    return Utility.imageCheck(values.user_profile_pic_url);
                }
            },
            getDateTime: function(values) {
                return  ' '+ values.convertFromDate + '   ' + 'for' + '   ' + values.duration + '   ' + 'hrs';
            },
            getCompletedView: function(values, isCss){
            var valuesItems = values.convertTaskItems.split("/"),
                valueOpenItems = parseInt(valuesItems[0]),
                valueTotalItems = parseInt(valuesItems[1]);
                
              if(isCss){
                 if(values.is_publish){
                    var actionItems = values.action_items;
                    var completed = true;
                    if(Ext.isEmpty(actionItems)){
                        return "";
                    }
                    if(actionItems) {
                        for(var i=0; i<actionItems.length; i++) {
                            if(actionItems[i].todo_completed == 'N' 
                                && actionItems[i].todo_deleted == 'N') {
                                completed = false;
                            }
                        }
                    } else {
                        completed = false;
                    }

                    if(completed) {
                        return "mom-added-cls"
                    } else {
                        return "";                        
                    }
                 }else{
                     return "";
                 }
              }else{
                 return values.convertTaskItems;
              }
            },
            getDraftState:function(values){
              if(!values.is_publish){
                    return true
                }
            },
            getPublishState:function(values){
                if(values.is_publish){
                    return true
                }

            }
         }
    ],

    itemSelector: 'div.mom-view-cls',
    listeners: {
        itemclick: 'onMomItemClick'
    }
});