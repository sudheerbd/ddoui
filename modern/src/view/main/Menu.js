Ext.define('DDO.view.main.Menu', {
    extend: 'Ext.Container',
    //extend: 'Ext.NavigationView',   
    alias: 'widget.mainmenu',
    requires: [
        'DDO.store.main.Menu'
    ],
    reference: 'mainmenu',
    cls: 'mainmenu-cls',
    layout: {
        type: 'card'
    },
    activeItem: 0,
    items: [{
        xtype: 'list',
        store: {
            type: 'menuStore'
        },
        itemCls: 'listItem-cls',
        itemTpl: ['<tpl for=".">',
            '<div class="title-cls"><i class="{iconcls}"></i>{title}</div>',
            '</tpl>'
        ],
        listeners: {
            itemtap: function(listItem, index, target, record, e, eOpts) {
                var me = this;
                var mainview = Ext.ComponentQuery.query('#logincontainer')[0];
                //var panel = btn.up('panel');
                var config = {
                    url: "/auth/logout",
                    method: "POST",
                    params: {}
                }
                var successCallback = function(data, responseData) {
                    responseData = responseData || {};
                    if (responseData.session) {
                        panel.hide(true);
                        mainview.setActiveItem(1);
                    } else {
                        window.location.reload();
                      //  panel.hide(true);
                       // mainview.setActiveItem(0);
                    }
                }
                var failureCallback = function(failureData) {
                    //Failure logic
                }
                Utility.fireAjax(config, successCallback, failureCallback);
            }
        }
    }, {
        xtype: 'container',
        cls: 'availability-sheet-container',
        title: 'Availability sheet',
        items: [{
            xtype: 'toolbar',
            //cls:'forgotPwdToolbar-cls',
            flex: 0.4,
            //reference:'forgotPwdTollbar',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-arrow-left',
                cls: 'backBtn-cls',
                reference: 'backbtn',
                handler: function(btn) {
                    btn.up('mainmenu').setActiveItem(0);
                }
            }, {
                xtype: 'label',
                html: 'Availability sheet',
                //cls: 'forgotLbl-cls',
                //reference:'loginLabel',
                flex: 1
            }]
        }, {
            xtype: 'container',
            flex: 1
        }]
    }]

});
