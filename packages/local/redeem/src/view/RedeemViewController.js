/*var toastMsg = Ext.create('Ext.window.Toast', {
            width: 200,
            closeAction: 'hide',
            align: 't'
});*/
Ext.define('Redeem.view.RedeemViewController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.redeemview',
	// config:{
	// 	toastMsg:Ext.create('Ext.window.Toast', {
 //            width: 200,
 //            closeAction: 'hide',
 //            align: 't'
	// 	})
	// },
	/**
     * @event checkchange
     * Fires when the UI has successfully changed the checked state of a row.
     * @checkbox {Ext.grid.column.Check} this CheckColumn.
     * @rowIndex {Number} rowIndex The row index.
     * @checked {Boolean} checked `true` if the box is now checked.
     * @eOpts {Ext.event.Event} e The underlying event which caused the check change.
     */
	onSelectionChange: function(checkbox, rowIndex, checked, eOpts) {
		var me = this,
			view = me.getView(),
			refs = view.getReferences(),
			grid = refs.categorygrid,
			store = grid.getStore(),
			rec, categoryId = [];

		rec = store.getAt(rowIndex);

		if (!checked) {
			rec.set('selected', true);
		}
		store.each(function(record) {
			if (rec.get('id') == record.get('id')) {
				categoryId.push(record.get('id'));
			} else {
				record.set('selected', false);
			}
		});

		me.filterProduct(categoryId);
	},
	/*
     * Fires when the grid column ia checked to filter the store
     * @categoryId {Array} this Array.
     */
	filterProduct: function(categoryId) {
		var me = this,
			vm = me.getViewModel(),
			productstore = vm.get('productstore');
		if(categoryId.length == 1 && categoryId[0] == 0){
			productstore.clearFilter(true);
			productstore.load();
			return;
		}
		if (categoryId.length != 0 && !Ext.Array.contains(categoryId, 1)) {
			productstore.clearFilter(true);
			productstore.filterBy(function(record) {
				return Ext.Array.contains(categoryId, record.get('categoryId'));
			});
		} else {
			productstore.clearFilter(true);
			productstore.load();
		}
	},
	 /**
     * @event itemclick fire when product item is clicked 
     * Fires when an item is clicked.
     * @cmp :  {Ext.view.View} this view.
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @item :  {HTMLElement} The item's element.
     * @index :  { Number} The item's index.
     * @e :  {Ext.event.Event} The raw event object.
     * @eOpts :  { Object} The options object passed to Ext.util.Observable.addListener.
     */
	onItemClick: function(cmp, record, item, index, e, eOpts) {
		var className = e.getTarget().className;
		if (className == "size") {
			this.size = {
				record: record,
				e: e,
				item: item.childNodes[3]
			};
			this.onClickSize(record, e, item.childNodes[3]);

		} else if (className == "color") {
			this.color = {
				record: record,
				e: e,
				item: item.childNodes[2]
			};
			this.onClickColor(record, e, item.childNodes[2]);

		} else if (className == "buy-btn") {

			this.onClickBuy(record, e, item.childNodes[3],item.childNodes[2]);
		}
	},
	 /**
     * this method is called to select a size 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     */
	onClickSize: function(record, e, sizes) {
		var target = e.getTarget(),
			childNodes = sizes.childNodes;
		Ext.Array.each(childNodes, function(childNode, index, allitems) {
			if (Ext.Array.contains(childNode.classList, 'selected')) {
				childNode.className = "size";
				return false;
			}
		});
		this.customSize = target.innerHTML;
		target.className = target.className + " selected";
	},
	 /**
     * this method is called to select a color 
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @color :  {HTMLElement} The item's element.
     */
	onClickColor: function(record, e, color) {
		var target = e.getTarget(),
			childNodes = color.childNodes;

		Ext.Array.each(childNodes, function(childNode, index, allitems) {
			if (Ext.Array.contains(childNode.classList, 'selected')) {
				childNode.className = "color";
				return false;
			}
		});
		var str = target.outerHTML;
			index1 = target.outerHTML.indexOf(':') +1;
			index2 = target.outerHTML.indexOf(';');
			index3 = index2 - index1;
			cstr = str.substr(index1,index3);
		this.customColor = cstr;
		target.className = target.className + " selected";
	},
	 /**
     * this method is called to buy the items
     * @record :  { Ext.data.Model} The record that belongs to the item.
     * @e:{Ext.event.Event} The raw event object.
     * @sizes :  {HTMLElement} The item's element.
     *@color :  {HTMLElement} The item's element.
     */
	onClickBuy: function(record, e, sizes,color) {
		var viewModel = this.getViewModel(),
			me = this,
			selectedItems = viewModel.get('selectedItems'),
			childNodes = sizes.childNodes,
			colorNodes = color.childNodes,
			sizeSelected = false,
			colorSelected = false,
			flag = true,
			exist = false,
			q = 0;

		Ext.Array.each(childNodes, function(childNode, index, allitems) {
			if (Ext.Array.contains(childNode.classList, 'selected')) {
				sizeSelected = true;
				size = childNode.textContent;
			}
		});

		Ext.Array.each(colorNodes, function(colorNodes, index, allitems) {
			if (Ext.Array.contains(colorNodes.classList, 'selected')) {
				colorSelected = true;
			}
		});
		var toastMsg = Ext.create('Ext.window.Toast', {
			width: 200,
			closeAction: 'hide',
			align: 't'
		});
		if(parseInt(record.data.quantity) === 0 ){
			flag = false;
			toastMsg.update('Out of Stock');
			toastMsg.show();
			return;
		}
		if(record.data.attributeOptions.size.length === 0 || record.data.attributeOptions.color.length === 0){
			sizeSelected = true;
			colorSelected = true;
		}
		if (sizeSelected && colorSelected) {
			var newRecord = {
				'attributeOptions': {
					'size': this.buildSize(record.data.attributeOptions.size),
					'color': this.buildColor(record.data.attributeOptions.color)
				},
				'img': record.data.image_url,
				'name':record.data.name,
				'categoryId': record.data.categoryId,
				'itemId': record.data.itemId,
				'pid': record.data.id,
				'points':parseInt(record.data.points),
				'qty':1,
				'exactPoints':parseInt(record.data.points),
				'orignalqty':record.data.quantity

			}
			newRecord.attributeOptions.size.forEach(function(item) {
				if (!Ext.isEmpty(item.dispVal) && item.dispVal === me.customSize) {
					item.selected = " selected";
				} else {
					item.selected = "";
				}
			});
			newRecord.attributeOptions.color.forEach(function(item) {
				if (!Ext.isEmpty(item.val) && item.val === me.customColor) {
					item.selected = " selected";
				} else {
					item.selected = "";
				}
			});
			var points = parseInt(this.getViewModel().get('rewardPoints')),
				totalPoints = 0;
			for (i = 0; i < selectedItems.length; i++) {
				totalPoints = totalPoints + parseFloat(selectedItems[i].points);
			}
			if (selectedItems.length >= 1) {
				totalPoints = totalPoints + parseFloat(newRecord.points);
			}
			if (selectedItems.length == 0) {
				totalPoints = totalPoints + parseFloat(newRecord.points);
			}
			if (totalPoints <= points) {
				if(selectedItems.length == 0 ){
					flag = false;
					selectedItems.push(newRecord);
				}else{
					for(i=0;i<selectedItems.length;i++){
						if(newRecord.pid === selectedItems[i].pid){
							exist = true;
							for(j=0;j<newRecord.attributeOptions.size.length;j++){
								if(selectedItems[i].attributeOptions.size[j].dispVal === newRecord.attributeOptions.size[j].dispVal
									&& (selectedItems[i].attributeOptions.size[j].selected === " selected" && newRecord.attributeOptions.size[j].selected === " selected") 
									){
									var qty = selectedItems[i].qty + 1;
									if(parseInt(record.data.quantity) <  qty ){
										flag = false;
										toastMsg.update('Out of Stock');
										toastMsg.show();
										return;
									}
									selectedItems[i].qty = qty;
									selectedItems[i].points = parseFloat(record.data.points) * qty;
									flag = false;
								}
							}
						}else{
							flag = false;							
						}
					}
					if(!exist) {
						selectedItems.push(newRecord);
					}
				}
				if(flag){
					selectedItems.push(newRecord);
				}
				viewModel.set('selectedItems', selectedItems);
				viewModel.set('itemsCount', selectedItems.length);
				viewModel.set('badgeText', '<div class="btn-badge">' + selectedItems.length + '</div>');
				toastMsg.update('Added to your cart');
				toastMsg.show();
				var CheckoutButton = this.getView().down('#Checkout_button');
				if (CheckoutButton) {
					CheckoutButton.setDisabled(false);
				}
			} else {
				toastMsg.update('Ponts is less');
				toastMsg.show();
			}
			if (!Ext.isEmpty(this.size)) {
				var childNodes = this.size.item.childNodes;
				Ext.Array.each(childNodes, function(childNode, index, allitems) {
					if (Ext.Array.contains(childNode.classList, 'selected')) {
						childNode.className = "size";
						return false;
					}
				});
				this.size = null;
			}
			if (!Ext.isEmpty(this.color)) {
				var childNodes = this.color.item.childNodes;
				Ext.Array.each(childNodes, function(childNode, index, allitems) {
					if (Ext.Array.contains(childNode.classList, 'selected')) {
						childNode.className = "color";
						return false;
					}
				});
				this.color = null;
			}
		} else {
			toastMsg.update('Please select the size and color');
			toastMsg.show();
		}
	},
	 /**
     * this method is called to build size array for check out window
     * @size :  {Array} this Array.
     */
	buildSize: function(size) {
		var sizeArr = [];

		size.forEach(function(item, index) {
			sizeArr.push({
				dispVal: item
					//available: item.available
			});
		});
		return sizeArr;
	},
	 /**
     * this method is called to build color array for check out window
     * @size :  {Array} this Array.
     */
	buildColor: function(color) {
		var colorArr = [];

		color.forEach(function(item, index) {
			colorArr.push({
				val: item
				//available: item.available
			});
		});
		return colorArr;
	},
	 /**
     * @event click fire when checkout button is clicked 
     * @btn :  { Ext.button.Button} this Button
     */
	onClickCheckOut: function(btn) {
		var viewModel = this.getViewModel(),
			redeemedPoints = 0,
			selectedItems = viewModel.get('selectedItems'),
			store = Ext.create('Ext.data.Store', {
				data: selectedItems
			}),
			points = parseInt(this.getViewModel().get('rewardPoints'));

		selectedItems.forEach(function(item) {
			redeemedPoints += parseFloat(item.points);
		});
		Ext.create('Redeem.product.CheckoutWindow', {
			currentVal: redeemedPoints,
			balanceVal: (points - parseFloat(redeemedPoints)),
			store: store
		});
	},
	 /**
     * Allows additional behavior after rendering is complete. At this stage, the 
     * {@link Ext.Component Component's} {@link Ext.Component#getEl Element} will have 
     * been styled according to the configuration, will have had any configured CSS 
     * class names added, and will be in the configured visibility and configured enable 
     * state.
     * 
     * **Note:** If the Component has a {@link Ext.Component#controller ViewController} 
     * and the controller has an {@link Ext.app.ViewController#afterRender afterRender} 
     * method it will be called passing the Component as the single param.
     *
     * @template
     * @protected
     */
	onCategoryGridRender: function(grid, eOPts) {
		var viewModel, categoryStore;

		viewModel = this.getViewModel();
		categoryStore = viewModel.getStore('categorystore');

		categoryStore.load({
			scope: this,
			callback: function(records, options, success) {
				categoryStore.getAt(0).set('selected', true);
			}
		});
	}
});