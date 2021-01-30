/**
 *  @class AvailResources
 *  @alias availresources
 *  fields config required for define the fields
 *  In this model we defined the resource item properties
 */
Ext.define('DDO.model.resources.AvailResources', {
	extend: 'Ext.data.Model',
	alias: 'model.availresources',
	requires: [
		'Ext.data.field.Field'
	],
	fields: [
		'employee_code',
		'employee',
		'skills',
		'designation', {
			name: 'empexperience',
			convert: function(value) {
				if (value) {
					var yearsQuo = 0,
						yearsRem = 0,
						months = 0,
						monthString = "",
						yearStrig = "";
					yearsQuo = Math.floor((value / 365));
					yearsRem = Math.floor((value % 365));
					months = Math.floor(yearsRem / 30);
					yearStrig = yearsQuo > 1 ? yearsQuo + " Years" : (yearsQuo == 0) ? yearStrig : yearsQuo + " Year";
					monthString = months > 1 ? months + " Months" : (months == 0) ? monthString : months + " Month";
					value = yearStrig + " " + monthString;
				} else {
					value = '';
				}
				return value;
			}
		}, {
			name: 'available'
		}, {
			name: 'joiningdate',
			convert: function(value){
				var date = new Date(value);
				return date.getFullYear() + '-' +   String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}, {
			name: 'currentexperience',
			convert: function (value, record) {
				if (Ext.isEmpty(value) && record.data.joiningdate) {
					var currentDate = new Date();
					var joiningDate = new Date(record.data.joiningdate);
					value = Ext.Date.diff(joiningDate, currentDate, Ext.Date.DAY);
				}
				if (value) {
					var yearsQuo = 0,
						yearsRem = 0,
						months = 0,
						 monthString = "",
                        yearStrig = "";

					yearsQuo = Math.floor((value / 365));
					yearsRem = Math.floor((value % 365));

					months = Math.floor(yearsRem / 30);
					yearStrig = yearsQuo > 1 ? yearsQuo + " Years" : (yearsQuo == 0) ? yearStrig : yearsQuo + " Year";
					monthString = months > 1 ? months + " Months" : (months == 0) ? monthString : months + " Month";
					value = yearStrig + " " + monthString;
				}
				return value;
			}
		}, {
			name: 'daysonbench',
			convert: function(value, rec) {
				return value;
			}
		},
		'employmentstatus',
		'project',
		'potentialproject',
        'preferredlocation',
        {
			name: 'availability',
			convert: function (value, record) {
				if(!Ext.isEmpty(value)){
					return value/100;
				}
			}
		},{
			name:'availablefrom',
			convert: function(value){
				var date = new Date(value);
				return date.getFullYear() + '-' +   String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			}
		}
	]
});