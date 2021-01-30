Ext.define('DDO.view.loginlanding.LoginHeader', {
    extend: 'Ext.Container',
    xtype: 'loginheader',
    layout: {
        type: 'card',
        animation: 'slide'
    },

    initialize: function() {
        var me = this,
		headerstore = Ext.getStore('headertextstore');

        me.store = headerstore;
        if (headerstore.getData().items.length) {
            me.addItems(headerstore.getData().items);
        }

        me.callParent();
    },
    addItems: function(items) {
        var item;
        for (var key in items) {
            item = items[key];
            this.add({
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'middle',
                    pack: 'center'
                },
                cls: 'logoContainer-cls',
                items: [{
                    xtype: 'image',
                    width: '50%',
                    height: '50%',
                    cls: 'DDO-loginheader-image',
                    src: item.data.src,
                    alt: 'WTC'
                }, {
                    xtype: 'label',
                    html: item.data.header,
                    cls: 'login-headertext',
                    style: 'color:' + item.data.color
                }, {
                    xtype: 'label',
                    html: item.data.details,
                    cls: 'login-headerdetails'
                }]

            })
        }
    }
});
