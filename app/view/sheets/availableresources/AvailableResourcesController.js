/**
 * The file AvailableResourcesController is the controller for the 'DDO.view.sheets.AvailableResources'.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.availableresourcescontroller'
 */
Ext.define('DDO.view.sheets.availableresources.AvailableResourcesController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.availableresourcescontroller',
	
    /**
	 * The function onMenuRender is responsible to iterate the record in the store and to show the menu item.
	 * @param 'grid' which will get the grid instance.
	 * @param 'menu' which renders the menu.
	 * @param 'headerCt' which will get the headercontainer.
	 */
	onMenuRender: function(grid, menu, headerCt) {
		try{
			var viewModel = this.getViewModel(),
				store = grid.getStore(),
				items = [], sc = this,
				noDataFound, itemsMenu, storeRecords,
				itemsMenu = {
					checked: false,
					hideOnClick: false
				};
			// iterate each record in the store
			storeRecords = viewModel.get('gridStoreData') || store.data.items;
			noDataFound = this.checkForStoreData(storeRecords, items, sc, itemsMenu);
			this.doSorting(items);
			if (noDataFound) {
				this.addNoneItems(items, itemsMenu, sc);
			}
			items.forEach(function(rec) {
				if (rec.text == "None") {
					rec.checked = viewModel.get('gridFiltered');
				}
			});
			// add menu item  into the menu and store its reference
			this.addMenuItemFilter(menu, items);
		} catch (err) {
			Utility.showToast(Messages.NOMINATION.TOAST.MENULOADERR, err);
		}
	},
    /** 
	 * The function checkForStoreData is responsible for checking store data in the menu items.
	 * @param {arrray} 'storeRecords' which holds the store records.
	 * @param {array} 'items'.
	 * @param 'sc' which holds 'availableresourcescontroller'.
	 * @param {object} 'menuItems'. 
	 */ 
	checkForStoreData: function(storeRecords, items, sc, menuItems){
		var noDataFound = null;
		storeRecords.forEach(function(metaRecord) {
			if (metaRecord.data.projectnames) {
				var array = metaRecord.data.projectnames.split(","),
					arrayLength = array.length,
					itemsLength = items.length,
					addItem = true, me = sc, i, j;
				for (i = 0; i < arrayLength; i++) {
					for (j = 0; j < itemsLength; j++) {
						if (array[i].trim() == items[j].text) {
							addItem = false;
							break;
						}
					}
					if (addItem) {
						me.addMenuItems(items, menuItems, me, array, i);
					}
				}
			} else {
				noDataFound = true;
			}
		});
		return noDataFound;
	},
  /**
   * The function addMenuItems is fired from the function checkForStoreData to add items in menu.
   * @param {array} 'items'.
   * @param {object} 'menuItems'
   * @param 'me' which holds the current file 'this'.
   * @param 'i' which is a variable used for arrayLength iteration.
   */
	addMenuItems: function(items, menuItems, me, array, i){
		items.push(Ext.apply({
			text: array[i].trim(),
			cls: 'ddo-filter-menu-dash',
			listeners: {
				click: 'onMenuItemClick',
				scope: me
			}
		}, menuItems));
	},
   /**
	* The function doSorting is responsible for the sorting the menu items which is called from the onMenuRender function.
	* @param {array} 'items' which is an array.
	*/
	doSorting: function(items){
		items.sort(function(lhs, rhs) {
			return (lhs.text < rhs.text) ? -1 : ((rhs.text < lhs.text) ? 1 : 0);
		});
	},
   /**
	* The function addNoneItems is responsible for the adding items at the beginning of the array fired from onMenuRender function.
	* @param {array} 'items' which is an array.
	* @param {object} 'itemsMenu'.
	* @param 'sc' which holds the current file 'this'.
	*/
	addNoneItems: function(items, itemsMenu, sc){
		items.unshift(Ext.apply({
			text: 'None',
			cls: 'ddo-filter-menu-dash',
			listeners: {
				click: 'onMenuItemClick',
				scope: sc
			}
		}, itemsMenu));
	},
   /**
	* The function addMenuItemFilter is responsible for the adding filter in the menu.
	* @param 'menu' which renders the menu.
	* @param {array} 'items' which is an array. 
	*/
	addMenuItemFilter: function(menu, items){
		var menuItem = menu.add({
			text: 'Filter',
			itemId: 'resourceFilterMenu',
			menu: items
		});

		menu.on('beforeshow', function() {
			var currentDataIndex = menu.activeHeader.dataIndex;
			if (currentDataIndex === 'projectnames') {
				menuItem.show();
			} else {
				menuItem.hide();
			}
		});
	},
	/*
	 * This event is called after selecting the menu filter options
	 * Based on the checkedItems the grid will be display.
	 * @param {Ext.menu.Item} 'item' the item that was clicked.
	 */

	onMenuItemClick: function(item) {
		try {
			var view = this.getView();
			var gridStore = view.getStore();
			view.suspendLayout = true;
			gridStore.clearFilter(true);
			this.doFilterProcess(item, gridStore);
			view.suspendLayout = false;
			view.updateLayout();	
		} catch (err) {
			Utility.showToast(Messages.NOMINATION.TOAST.MENUITEMCLICK, err);
		}
	},
  /**
   * The function doFilterProcess is responsible for the filter process which is used in the menu.
   * @param {Ext.menu.Item} 'item' the item that was clicked.
   * @param {store} 'gridStore' which contains the current view store. 
   */
	doFilterProcess: function(item, gridStore){
		var filterMenu = item.up('menu').items,
			checkedItems = [];
		filterMenu.each(function(metaRecord) {
			if (metaRecord.checked) {
				checkedItems.push(metaRecord.text.trim());
			}
		});
		if (checkedItems.length > 0) {
			gridStore.filterBy(function(record) {
				var array = record.data.projectnames ? record.data.projectnames.split(",") : ['None'],
					arrayLength = array.length,
					checkedItemsLength = checkedItems.length,
					i, j;
				for (i = 0; i < arrayLength; i++) {
					for (j = 0; j < checkedItemsLength; j++) {
						if (array[i].trim() == checkedItems[j]) {
							return true;
							break;
						}
					}
				}
			});
		}
	}

});