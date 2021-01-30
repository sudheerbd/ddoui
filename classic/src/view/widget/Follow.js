 
Ext.define('DDO.view.widget.Follow', {
    extend: 'Ext.Widget',

    xtype: 'follow',

    userCls: 'follow',

    config: {
        followCount: null,
        text:null
    },

    element: {
        reference: 'element',
        // listeners: {
        //     click: 'onFollowClick'
        // },
        children: [
            {
                children: [{
                    // reference: 'hearSubInnerElement',
                    cls: 'follow-icon-cls',
                }]
        }, 
         {
            reference: 'followText',
            cls: 'follow-cls',
            tag: 'span',
            listeners: {
                click: 'onClickFollowText'
            }
        },{
            reference: 'followCount',
            cls: 'follow-count-cls',
            tag: 'span'
        }]
    },

    updateFollowCount: function(value,text) {
        var me = this;
       if(value == 0){
        me.followCount.setHtml(value);
       }else{
        me.followCount.setHtml("("+value+")");
       }
        this.followText.setHtml(text);
        this.text = text;
    },

    onClickFollowText:function(text){
        this.fireEvent('onnewfollowclick' , text);
 }
});