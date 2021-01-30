
Ext.define('DDO.model.allocation.Allocation', {
	extend: 'Ext.data.Model',
	fields: [
        "firstname",
        "lastname",
        {
            name: 'fullName',
            calculate: function (data) {
                return data.firstname + ' ' + data.lastname;
            }
        },
        "name",	
        {
            name : "allocation_factor",
            convert : function (value,record){
                if(!Ext.isEmpty(value)){
                    return parseFloat(value).toFixed(2);
                }
            }
        },{
            name:"startdate",
            convert: function (data, record) {
                if(data != null){
                    return Ext.Date.format(new Date(data), 'Y-m-d');
                }else{
                    return data;
                }
            }
        },{
            name:"enddate",
            convert: function (data, record) {
                if(data != null){
                    return Ext.Date.format(new Date(data), 'Y-m-d');
                }else{
                    return data;
                }
            }
        },{
            name : 'experience',
            convert:function(value){
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
        }
    ]
});



