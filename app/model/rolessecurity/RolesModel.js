/**
 *  @class RolesModel
 *  @alias rolesmodel
 *  fields config required for define the fields
 *  In this model we defined the resource item properties
 */
Ext.define('DDO.model.rolessecurity.RolesModel', {
	extend: 'Ext.data.Model',
	alias: 'model.rolesmodel',
	requires: [
		'Ext.data.field.Field'
	],
	fields: ['role_id','role_name']
});