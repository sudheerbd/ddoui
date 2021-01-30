/**
 *  @class RolesModel
 *  @alias rolesmodel
 *  fields config required for define the fields
 *  In this model we defined the resource item properties
 */
Ext.define('DDO.model.rolessecurity.RolesViewModel', {
	extend: 'Ext.data.Model',
	alias: 'model.rolesviewmodel',
	requires: [
		'Ext.data.field.Field'
	],
	fields: [{
		name: 'viewId',
		convert: function(val, rec) {
			return rec.data.app_view_id
		}
	}, {
		name: 'viewName',
		convert: function(val, rec) {
			return rec.data.app_view_name
		}
	}, {
		name: 'isWrite'
	}, {
		name: 'isRead'
	}]
});