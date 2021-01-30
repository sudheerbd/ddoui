Ext.define('DDO.model.jobs.JobModel', {
    extend: 'Ext.data.Model',

    idProperty: 'ddo_empworkexperience_id',

    fields: [
        'ddo_empworkexperience_id',
         {
            name: 'designation',
            type: 'string'
        }, {
            name: 'company',
            type: 'string'
        }, {
            name: 'location',
            type: 'string'
        }, {
            name: 'frommonth',
            type: 'string'
        }, {
            name: 'fromyear',
            type: 'string'
        }, {
            name: 'tomonth',
            type: 'string'
        }, {
            name: 'toyear',
            type: 'string'
        }, {
            name: 'fromdate',
            type: 'string'
        }, {
            name: 'todate',
            type: 'string'
        },{
            name:'description',
            type:'string'
        },{
            name: 'currentlyworking',
             type:'string'
        }, {
            name: 'convertdate',
            calculate: function(data) {
                var currentlyworking = data.currentlyworking || false,
                    toyear, fromyear, startmonth, endmonth, fromDateString, toDateString, monthcount, yearcount,
                    period, getValidValue;


                if (!Ext.isEmpty(data.tomonth) && !Ext.isEmpty(data.toyear) && !Ext.isEmpty(data.frommonth) && !Ext.isEmpty(data.fromyear)) {
                    fromDateString = data.fromyear + "/" + data.frommonth + "/" + "01";
                    toDateString = (currentlyworking != 'false') ?
                        Ext.Date.format(new Date(), "Y/m/d") : data.toyear + "/" + data.tomonth + "/" + "01";

                } else if (!Ext.isEmpty(data.frommonth) && !Ext.isEmpty(data.fromyear)) {
                    fromDateString = data.fromyear + "/" + data.frommonth + "/" + "01";
                    toDateString = (currentlyworking != 'false') ?
                        Ext.Date.format(new Date(), "Y/m/d") : data.toyear + "/" + data.tomonth + "/" + "01";

                } else if (!Ext.isEmpty(data.fromdate) && !Ext.isEmpty(data.todate)) {
                    fromDateString = (data.fromdate).split("T")[0];
                    fromDateString = fromDateString.substring(0, fromDateString.length - 3);
                    toDateString = (data.todate).split("T")[0];
                    toDateString = toDateString.substring(0, toDateString.length - 3);

                }

                startmonth = Ext.Date.format(new Date(fromDateString), 'F');
                endmonth = (currentlyworking != 'false') ? Ext.Date.format(new Date(), 'F') : Ext.Date.format(new Date(toDateString), 'F');
                fromyear = Ext.Date.format(new Date(fromDateString), 'Y');
                toyear = (currentlyworking != 'false') ? Ext.Date.format(new Date(), 'Y') : Ext.Date.format(new Date(toDateString), 'Y');
                monthcount = Ext.Date.diff(new Date(fromDateString), new Date(toDateString), Ext.Date.MONTH) % 12;
                yearcount = Ext.Date.diff(new Date(fromDateString), new Date(toDateString), Ext.Date.YEAR);

                if (currentlyworking == false || currentlyworking == ' ') {
                    monthcount = monthcount + 1;
                    if (monthcount == 12) {
                        monthcount = 0;
                        yearcount = yearcount + 1;
                    }
                }

                period = startmonth + ' ' + fromyear + ((currentlyworking != 'false') ? ' - Present ' : (' - ' + endmonth + ' ' + toyear));
                if (monthcount === 0 && yearcount === 0) {
                    period = period.concat(" (0 years)");
                    return period;
                } else {
                    period = period.concat(" (");
                    if (yearcount) {
                        period = period.concat(yearcount + ((yearcount === 1) ? ' year ' : ' years '));
                    }
                    if (monthcount) {
                        period = period.concat(monthcount + ((monthcount === 1) ? ' month' : ' months'));
                    }
                    period = period.concat(")");
                    return period;
                }
            }
        },{
         name: 'role_order_date',
            calculate: function(data) {
                var fromDateString,
                    fromDate;
                    fromDateString = data.fromyear + "/" + data.frommonth + "/" + "01";
                    fromDate = new Date(fromDateString);
                    return fromDate;
            }   
        }
    ]
});