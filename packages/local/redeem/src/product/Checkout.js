Ext.define('Redeem.product.Checkout', {
	extend: 'Ext.view.View',

	alias: 'widget.checkout',

	cls: 'redeem-checkout',
	
	// tpl: [
	// 	'<tpl for=".">',
	// 		'<div class="checkout-wrap">',				
	// 			'<div class="checkout-img">',					
	// 				'<img src="{[this.getImage(values)]}" class = "product-img" />',
	// 				'<span class="redeem-name">{[this.getNames(values)]}</span>',
	// 				'<span class="exactPointPCls">P</span><span class="exactPointsCls">{exactPoints}</span>',
	// 			'</div>',
	// 			'<div class="checkout-options">',
	// 				// '<div class="product-size">',
	// 				// 	'<tpl for="attributes.size">',
	// 				// 		'<div class="size {selected}">{dispVal}</div>',
	// 				// 	'</tpl>',
	// 				// '</div>',
	// 				'<div class="product-quantity">',
	// 					'<input type="number" value="{qty}" id="{[this.getIds(values)]}" class="txtField"/>',
	// 				'</div>',
	// 				// '<div class="product-color">',
	// 				// 	'<tpl for="attributes.color">',
	// 				// 		'<div class="color {selected}" style ="border-color:{val};"></div>',
	// 				// 	'</tpl>',
	// 				// '</div>', 
	// 			'</div>',
	// 			'<div class="product-value">',
	// 				'<div class="value">{points}</div>',
	// 				'<span class="x-fa fa-trash-o delete"></span>',
	// 			'</div>',
	// 		'</div>',
	// 	'</tpl>',{
	// 		getIds:function(values){
	// 			return values.id
	// 		},
	// 		getNames:function(values){
	// 			return values.name
	// 		},
	// 		getImage:function(values){
	// 			if(Ext.isEmpty(values.img)){
	// 				return "resources/images/redeem/comingsoon.jpg"
	// 			}
	// 			return values.img
	// 		}
	// 	}
	// ],

		tpl: [
		'<tpl for=".">',
			'<div class="checkout-wrap">',
			  '<div class="div-one">',
				'<img src="{[this.getImage(values)]}" class="checkout-image"/>',
			  '</div>',
			  '<div class="div-two" {[this.validEllipsesQtip(values.name, 16)]}>{[this.getEllipseText(values.name, 16)]}</div>',
			  '<div class="div-three">',
				'<span class="exactPointPCls">P</span>',
				'<span class="exactPointsCls">{exactPoints}</span>',
			  '</div>',
			  '<div class="div-four">',
			  '</div>',
			  '<div class="div-five">',
				'<span><input class="txtField"  id="{[this.getIds(values)]}" style="width:50px" type="number" value="{qty}" min="1"/></span>',
				'<span class="x-fa fa-trash-o delete"></span>',
			  '</div>',
			'</div>',
		'</tpl>',{
			getIds:function(values){
				return values.id
			},
			getEllipseText: function(string, limit) {
                if(Ext.isEmpty(string)){
                    string ="";
                }
                return Ext.String.ellipsis(string, limit);
            },
            validEllipsesQtip: function(value, limit) { 
                if(Ext.isEmpty(value)){
                    value ="";
                }
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            },
			getImage:function(values){
				if(Ext.isEmpty(values.img)){
					return "resources/images/redeem/comingsoon.jpg"
				}
				return values.img
			}
		}
	],
	

	itemSelector: 'div.checkout-wrap',

	emptyText: 'No products available',

	listeners: {
		itemclick: 'onCheckoutItemClick',
		change: {
			element: 'el',
			delegate: 'input.txtField',
			fn: 'onchange'
		}
	}
});