Ext.define('DDO.util.ShareLink',{
    singleton: true,
    alternateClassName: ['ShareLink'],
    socket : null,

    initComponent : function(){
        var me = this;
        me.loadLinkWindow();
    },
    
    loadLinkWindow : function(){
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1085541584862838',
                xfbml: true,
                version: 'v2.7'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
});
