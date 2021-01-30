Ext.define('Redeem.product.CheckoutWindowController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.checkoutwindow',

	// config: {
	// 	toastMsg: Ext.create('Ext.window.Toast', {
	// 		width: 200,
	// 		closeAction: 'hide',
	// 		align: 't'
	// 	})
	// },
	 /**
     * @event itemclick fire when checkout item is clicked 
     * Fires when an item is clicked.
     * @cmp :  {Ext.view.View} this view.
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @item :  {HTMLElement} The item's element.
     * @index :  { Number} The item's index.
     * @e :  {Ext.event.Event} The raw event object.
     * @eOpts :  { Object} The options object passed to Ext.util.Observable.addListener.
     */
	onCheckoutItemClick: function(cmp, record, item, index, e, eOpts) {
		
		var classList = e.target.classList,
			vm = Ext.first('redeem-view').getViewModel(),
			view = this.getView(),
			valuepoints = view.down('#valuepoints'),
			orignalvalue = view.down('#orignalvalue');
		if (Ext.Array.contains(classList, 'delete')) {
			cmp.getStore().remove(record);
			if (cmp.getStore().getCount() === 0) {
				Ext.first('#Checkout_button').setDisabled(true);
				vm.set('badgeText', ' ');
				vm.set('selectedItems', []);
				valuepoints.setText('Redeemed ' + 0);
				orignalvalue.setText('Available ' + (orignalvalue.prize + record.get('points')));
			} else {
				var array = vm.get('selectedItems');
				array.pop(record.getData());
				vm.set('selectedItems', array);
				valuepoints.prize = (valuepoints.prize - record.get('points'));
				vm.set('badgeText', '<div class="btn-badge">' + cmp.getStore().getCount() + '</div>');
				valuepoints.setText('Redeemed ' + valuepoints.prize);
				orignalvalue.prize = (orignalvalue.prize + record.get('points'))

				orignalvalue.setText('Available ' +orignalvalue.prize);
			}
		} else if (Ext.Array.contains(classList, 'size')) {
			this.onClickSize(record, e, item.childNodes[1].childNodes[0]);
		} else if (Ext.Array.contains(classList, 'color')) {
			this.onClickColor(record, e, item.childNodes[1].childNodes[2]);
		}
	},
	/* this method is called to select a size 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     */
	onClickSize: function(record, e, sizes) {
		var target = e.getTarget(),
			childNodes = sizes.childNodes,
			view = this.getView().down('checkout'),
			store = view.getStore(),
			size;

		Ext.Array.each(childNodes, function(childNode, index, allitems) {
			if (Ext.Array.contains(childNode.classList, 'selected')) {
				childNode.className = "size";
				return false;
			}
		});

		size = target.innerHTML;

		target.className = target.className + " selected";

		for (x in record.data.attributeOptions.size) {
			if (record.data.attributeOptions.size[x].dispVal == size) {
				record.data.attributeOptions.size[x].selected = " selected";
			} else {
				record.data.attributeOptions.size[x].selected = "";
			}
		}
	},
	/* this method is called to select a color 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     */
	onClickColor: function(record, e, color) {
		var target = e.getTarget(),
			childNodes = color.childNodes,
			view = this.getView().down('checkout'),
			store = view.getStore();

		Ext.Array.each(childNodes, function(childNode, index, allitems) {
			if (Ext.Array.contains(childNode.classList, 'selected')) {
				childNode.className = "color";
				return false;
			}
		});

		var str = target.outerHTML;

		index1 = target.outerHTML.indexOf(':') + 1;
		index2 = target.outerHTML.indexOf(';');
		index3 = index2 - index1;

		cstr = str.substr(index1, index3);

		target.className = target.className + " selected";

		for (x in record.data.attributeOptions.color) {
			if (record.data.attributeOptions.color[x].val == cstr) {
				record.data.attributeOptions.color[x].selected = " selected";
			} else {
				record.data.attributeOptions.color[x].selected = "";
			}
		}
	},
	/**
     * @event click fire when checkout button is clicked 
     * @btn :  { Ext.button.Button} this Button
     */
	onConfirmBtnClick: function(btn, eOpts) {
		var checkoutwindow = this.getView(),
			checkout,
			store,
			salesOrderLineObj = [],
			color,
			size,
			toastMsg = Ext.create('Ext.window.Toast', {
				width: 300,
				height: 200,
				closeAction: 'hide',
				html: 'Success !',
				align: 't'
			});
			var total_order_price ="";

			var attributeStore = Ext.getStore('Redeem.store.AttributeStore');
			var attributeValueStore = Ext.getStore('Redeem.store.AttributeValueStore');

		checkoutwindow.setLoading(true);

		if (!Ext.isEmpty(checkoutwindow)) {
			checkout = checkoutwindow.down('checkout');
			if (!Ext.isEmpty(checkout)) {
				store = checkout.getStore();
				for (i = 0; i < store.getCount(); i++) {
					var rec = store.getAt(i),
						data = rec.getData();
					for (j = 0; j < data.attributeOptions.color.length; j++) {
						if (data.attributeOptions.color[j].selected === " selected") {
							color = data.attributeOptions.color[j].val;
						}
					}
					for (j = 0; j < data.attributeOptions.size.length; j++) {
						if (data.attributeOptions.size[j].selected === " selected") {
							size = data.attributeOptions.size[j].dispVal;
						}
					}
					total_order_price =total_order_price + data.points;
					salesOrderLineObj.push({
						ddo_product_id: data.pid,
						PriceEntered: data.points,
						totalprice:data.points,
						lineprice: data.points,
						unitprice: (data.points/data.qty),
						quantity: data.qty,
						QtyOrdered: data.qty,
						Description: 'Size: ' + size + ' , ' + ' color: ' + color
					});
				}

				var param = Ext.JSON.encode(salesOrderLineObj);

				Ext.Ajax.request({
					url: '/productredeem',
					method: 'POST',
					scope: this,
					params: {
						productListArr: param,
						total_order_price:total_order_price
					},
					success: function(response, opts) {
						var obj, redeemView, loginStore;
						obj = Ext.decode(response.responseText);
						console.log('obj: ', obj);


						if (obj.success) {
							redeemView = Ext.ComponentQuery.query('redeem-view')[0];
							loginStore = Ext.getStore('login');
							toastMsg.update('Success !');
							toastMsg.show();
							Ext.getStore('Redeem.store.ProductValueStore').load();
							Ext.getStore('redeem.RedeemGridStore').load();
							redeemView.getViewModel().getStore('productstore').load();
							redeemView.getViewModel().set('rewardPoints', obj.reward_points);
							loginStore.getAt(0).get('score').rewardpoints = obj.reward_points;
							this.getView().close();
							redeemView.close();
						} else {
							toastMsg.update(obj.message);
							toastMsg.show();
						}
						checkoutwindow.setLoading(false);
					},

					failure: function(response, opts) {
						checkoutwindow.setLoading(false);
						console.log('server-side failure with status code ' + response.status);
					}
				});
			}
		}
	},
	/**
     * @event change fire when number fileds value changed
     * @me : dom element
     * @inputfield : number field
     */
	onchange: function(me, inputfield) {
		var val = parseInt(inputfield.value);
		if(val<1){
           inputfield.value=1;
		}else{
		var id = inputfield.id,
			value = inputfield.value,
			view = this.getView().down('checkout'),
			totalPrize = 0,
			parentView = view.up('checkoutwindow'),
			valueLabel = parentView.down('#valuepoints'),
			valueOrignal = parentView.down('#orignalvalue'),
			store = view.getStore(),
			redeem = parseInt(Ext.getStore('login').getAt(0).getData().score.rewardpoints),
			prize = 0,
			data,
			toastMsg = Ext.create('Ext.window.Toast', {
				width: 300,
				height: 200,
				closeAction: 'hide',
				html: 'Success !',
				align: 't'
			}),
			score = parseInt(Ext.getStore('login').getAt(0).getData().score.rewardpoints),
			record = store.findRecord('id', id);

		if (store) {
			for (i = 0; i < store.getCount(); i++) {
				data = store.getAt(i).getData();
				prize += parseInt(data.points);
			}
			prize -= parseInt(record.get('exactPoints')) * parseInt(record.get('qty'));
			prize = prize + (parseInt(record.get('exactPoints')) * parseInt(value));
			if (score < prize) {
				toastMsg.update('Points are less');
				toastMsg.show();
				inputfield.value = record.get('qty');
				return;
			}

		}

		if (parseInt(record.get('orignalqty')) < parseInt(value)) {
			toastMsg.update('Out Of Stock');
			toastMsg.show();
			inputfield.value = record.get('qty')
			return;
		}

		record.set('qty', value);
		record.set('points', (parseInt(value) * parseFloat(record.get('exactPoints'))));

		for (j = 0; j < store.getCount(); j++) {
			totalPrize += parseInt(store.getAt(j).getData().points);
		}

		valueLabel.setText('Redeemed ' + totalPrize);
		valueLabel.prize = totalPrize;

		valueOrignal.setText('Available ' + (redeem - totalPrize));
		valueOrignal.prize = redeem - totalPrize;
	}
}
});