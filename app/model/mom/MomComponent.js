Ext.define('DDO.model.mom.MomComponent', {
    extend: 'Ext.data.Model',

    alias: 'model.momcomponent',

    fields: [{
        name: 'agenda'
    }, {
        name: 'created_by'
    }, {
        name: 'description'
    }, {
        name: 'description_normal',
        convert: function(value, record) {
            return Ext.util.Format.stripTags(record.data.description);
        }
    }, {
        name: 'end_time'
    }, {
        name: 'from_date'
    }, {
        name: 'is_publish'
    }, {
        name: 'mom_id'
    }, {
        name: 'participants'
    }, {
        name: 'project_id'
    }, {
        name: 'start_time'
    }, {
        name: 'to_date'
    }, {
        name: 'action_items'
    },{
        name: 'duration'
    },{
        name: 'convertTime',
        convert: function(rec, value) {
            var getTimed = function(time) {
                var t = time.split("-");
                var d = new Date();

                d.setHours(t[0]);
                d.setMinutes(t[1]);
                return d;
            }
            var valuesTime = (getTimed(value.data.end_time) - getTimed(value.data.start_time)) / (1000 * 60 * 60);
            if (isNaN(valuesTime)) {
                return 0;
            } else {
                return valuesTime;
            }
        }
    }, {
        name: 'convertFromDate',
        convert: function(rec, value) {
            var fromDateFormat = value.data.from_date,
                formatDate = Ext.Date.format(new Date(fromDateFormat), "dS M Y");
            return formatDate;
        }
    }, {
        name: 'convertTaskItems',
        convert: function(rec, value) {
            var converItems = 0;
            value.data.action_items.forEach(function(rec) {
                if (rec.todo_completed == 'Y') {
                    converItems = converItems + 1;
                }
            });
            return converItems + '/' + value.data.action_items.length;
        }
    }, {
        name: 'created_date'
    }]
});