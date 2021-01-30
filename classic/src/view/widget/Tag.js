 /**
 * This view is responsible for displaying tags in feeds view.
 * @class 'DDO.view.widget.Tag'
 * @extends 'Ext.Widget'
 * @alias 'taglist'
 */
Ext.define('DDO.view.widget.Tag', {
    extend: 'Ext.Widget',
    xtype: 'taglist',
    userCls: 'taglist',
    config: {
        tagVisible: true
    },
    element: {
        reference: 'element',
        //tag: 'li',
        cls: 'feedTags',
        children: [{
            reference: 'innerEl',
            tag: 'span',
            html: '&nbsp;Tagged',
            children: [{
                reference: 'tagmenuimg',
                tag: 'span',
                cls: 'tagMenu-img',
                listeners: {
                    click: 'onClickTagMenuImg'
                }
            }]
        }]
    },
    onClickTagMenuImg: function(event) {
        var evt = event;
        this.fireEvent('onclicktagmenuimg', evt);
    },
    updateTagVisible: function(value) {
        if (value) {
            this.element.show();
            this.element.dom.style.display = 'inline-block';
        } else {
            this.element.hide();
            this.element.dom.style.display = 'none';
        }

    }

});
