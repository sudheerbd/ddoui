  /**
 * This view is responsible for displaying owner permisssion in feeds view.
 * @class 'DDO.view.widget.OwnerEdit'
 * @extends 'Ext.Widget'
 * @alias 'owneredit'
 */
Ext.define('DDO.view.widget.OwnerEdit', {
    extend: 'Ext.Widget',

    xtype: 'owneredit',
    flex:0.04,
    config: {
        userId: null
    },

    element: {
        reference: 'element',
        tag: 'span',
        listeners: {
            click: 'onClick'
        }
    },

    onClick: function(event) {
        this.fireEvent('onclickediticon', event, this);
    },

    updateUserId: function(value) {
        var login = Ext.getStore('login'),
            loginData = login.getData().items[0].data,
            employeeId = parseInt(loginData.ddo_employee_id);

        if (parseInt(value) === employeeId) {
            this.element.addCls('post-menu-cls');
        } else {
            this.element.removeCls('post-menu-cls');
        }
    }
});