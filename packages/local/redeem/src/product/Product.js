Ext.define('Redeem.product.Product', {
	extend: 'Ext.view.View',

	alias: 'widget.product',

	cls: 'redeem-product',

	emptyText: 'No products available',

	tpl: [
		'<tpl for=".">',
			'<div class="product-wrap">',
				'<div class="product-name">{[this.getNames(values)]}</div>',
				'<img src="{[this.getImage(values)]}" class = "product-img" />',
				'<div class="product-color">',
						'<tpl for="attributeOptions.color">',
							'<div class="color" style ="box-shadow: 1px 3px 10px #aeaeae; border-color:{.};"></div>',
						'</tpl>',
					'</div>',
					'<div class="product-size">',
					'<tpl for="attributeOptions.size">',
						'<div class="size">{.}</div>',
					'</tpl>',
				'</div>',
				'<div class="product-value">',
				'<div class="value"><span class = "pointscls">P</span>{[this.getPoints(values)]}</div>',
				'<div class="buy-btn">Buy</div>',
				'</div>',
			'</div>',
		'</tpl>', {
			getImage: function(values) {
				if (Ext.isEmpty(values.image_url)) {
					return "resources/images/redeem/comingsoon.jpg";
				}
				return values.image_url;
			},
			getPoints:function(values){
				console.log('values: ', values);
				return parseInt(values.points);
			},
			getNames:function(values){
				return values.name;
			}
		}
	],

	itemSelector: 'div.product-wrap',

	listeners: {
		itemclick: 'onItemClick'
	}
});