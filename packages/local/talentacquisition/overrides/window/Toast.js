Ext.define('TalentAcquisition.overrides.window.Toast', {
    override: 'Ext.window.Toast',
    stickOnClick: false,
    xtype:'toast',
    autoCloseDelay:900,

}/*,function (Toast) {
    Ext.toast = function (message, title, align, iconCls) {
        var config = message,
            toast,
            customToast;

        if (Ext.isString(message)) {
            config = {
                title: title,
                html: message,
                iconCls: iconCls
            };
            if (align) {
                config.align = align;
            }
        }
        customToast = Ext.ComponentQuery.query('toast');
        if( !Ext.isEmpty(customToast) && customToast.length > 0){
            for(i=0;i<customToast.length;i++){
                customToast[i].destroy();
            }
        }
        toast = new Toast(config);
        toast.show();
        return toast;
    };
}*/);