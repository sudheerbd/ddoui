Ext.define('Redeem.order.product.SetProductImages', {
    extend: 'Ext.view.View',
    alias: 'widget.setproductimages',

    loadMask: false,
    selectedItemCls: 'imgselected-cls',
    selectionModel: {
        mode: 'SINGLE',
        allowDeslect: true

    },
    store: 'Redeem.store.ProductImagesStore',

    emptyText: '<div class = "ddo-product-emptytext">No Images Added</div>',

    tpl: [
        '<tpl for=".">',
        '<div class="product-main-cls" {[this.validEllipsesQtip(values.iddefault)]}>',
        '<span class="product-nonselec-cls"></span>',

        '<div class = "ddo-product-uploadicon">',
        '<img src="{imagepath}" class="ddo-product-icon" wrap-td="image_url">',
        '</div>',
        '<div class="ddo-product-icon-delete" data-action="deleteIcon"></div>',
        '</div>',
        '</tpl>',{
            validEllipsesQtip: function(value) {
                var str="Default product image";
                var qtip = " data-qtip= '"+str+"'";
                return (value) ? qtip : '';
            }
        }
    ],

    itemSelector: 'div.product-main-cls',

    listeners: {
        itemclick: 'productSetupItemClick'

    }
});