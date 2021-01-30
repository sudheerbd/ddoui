/**
 * The file InterestsAdded is the view file for user added interests in the profile view.
 * @extends {Ext.view.View}.
 * @alias 'widget.interestsadded'
 */
Ext.define('DDO.view.profile.details.InterestsAdded', {
    extend: 'Ext.view.View',

    xtype: 'interestsadded',

    loadMask: false,

    overItemCls: 'ddo-interest-over',

    emptyText: LabelsTitles.PROFILE.INTERTESTS.NOADDED,

   
tpl: [
       '<tpl for=".">',
       '<div class = "ddo-interesttpl">',
       '<div data-qtip = "{area}" class="ddo-interestsadded">{area:ellipsis(10)}</div>',
       '<tpl if="this.getDeleteBtn(values)">',
       '<div class="ddo-interests-delete" data-action="deleteInterest"></div>',
       '</tpl>',
       '</div>',
       '</tpl>',{
           getDeleteBtn: function(values) {
               var interestModel = Ext.ComponentQuery.query('interestsview')[0].getViewModel(),
                   nonPersonal = interestModel.get('nonPersonalAcccess');
                   if(nonPersonal === false){
                       return true;
                   }else{
                       return false;
                   }

           }
       }
   ],

    itemSelector: 'div.ddo-interesttpl'
});