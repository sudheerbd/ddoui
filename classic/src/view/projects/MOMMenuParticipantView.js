Ext.define('DDO.view.projects.MOMMenuParticipantView', {
    extend: 'Ext.view.View',

    xtype: 'mommenuparticipantview',

    tpl: [
        '<ul class="menu-ul-list">',
            '<tpl for=".">',
             '<tpl if="!(xindex < 7)">',
              '<li class="menu-li-list"><img class="menu-li-img" src="{[this.getTags(values)]}" width="30px" height="30px">',
              '<span class="menu-li-span"  {[this.validEllipsesQtip(values.user_full_name, 15)]}>{[this.getEllipseText(values.user_full_name, 15)]}</span></li>',
              '</tpl>',
               '</tpl>',

        '</ul>',{

            getTags: function(values) {
            
                if (typeof(values) === "object") {
                   if(values.user_profile_pic_url){
                      return values.user_profile_pic_url;
                   }
                }
            },
             getEllipseText: function(string, limit) {
                return Ext.String.ellipsis(string, limit);
            },
            validEllipsesQtip: function(value, limit) {
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            }
        }
    ],

    itemSelector: '.menu-li-list'
});