Ext.define('DDO.view.login.LoadingMask', {
    extend: 'Ext.Container',
    alias: 'widget.loadingmask',
    xtype: 'loadingmask',

    cls: 'ddo-load-mask-custom',

    //fullscreen: true,
    //centered: true, //never user this config use pack:'center' instead of this
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'center'
    },

    items: [{
        src: '/resources/images/defaultloadmask.gif',
        height: 50,
        width: 50,
        xtype: 'image'
            //cls:'load-mask'
    }]
});