Ext.define('DDO.view.profile.details.ProfileSkillsFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profileskillsformcontroller',


    /** Canceling and reseting form. Once cancel add skill button enables
     * @param:{string} btn contains The current component always passed as the button reference.
     */
    onCancelTap: function(btn) {
        var skills = Ext.ComponentQuery.query('profileskillsadded')[0];

        skills.show();
        btn.up('profileskillsform').destroy();

    },

    /** Getting form details,adding to view model binded store and sync store.
     * Once details save showing skills views and add skill button enables.
     * @param:{string} btn contains The current component always passed as the button reference.
     */
    onSaveTap: function(btn) {
        var me = this,
            form = btn.up('profileskillsform'),
            values = form.getValues(),
            skills = Ext.ComponentQuery.query('profileskillsadded')[0],
            skills = Ext.ComponentQuery.query('profileskillsadded')[0],
            store = skills.getStore(),
            nonEmpty = 0;

        Ext.Viewport.setActiveItem(1);

        startyear = Ext.Date.format(values.startDate, 'Y');
        startmonth = Ext.Date.format(values.startDate, 'F');

        endyear = Ext.Date.format(values.endDate, 'Y');
        endmonth = Ext.Date.format(values.endDate, 'F');

        paramsObj = {};

        paramsObj = {
            selfcomments: values.selfcomments,
            certification: values.certification,
            rating: values.Rating,
            firstusedyear: startyear,
            firstusedmonth: startmonth,
            lastusedyear: endyear,
            lastusedmonth: endmonth,
            hr_skilltype_id: parseInt(values.skill)
        };

        Ext.Object.each(values, function(key, value, obj) {
            if (key !== 'certification' && !Ext.isEmpty(value)) {
                nonEmpty++;
            }
        });

        if (nonEmpty > 4) {
            btn.up('profileskillsform').destroy();
            /* Need to be refactored */
            Ext.Ajax.request({
                url: '/profile/skills/add',
                method: 'POST',
                params: paramsObj,
                success: function(conn, response, options, eOpts) {
                    Ext.Msg.alert('Status', 'Record created');
                },
                failure: function(conn, response, options, eOpts) {
                    console.log('Status', 'Record not created');
                }
            });

            skills.refresh();
            Ext.Viewport.setActiveItem(0);

            Ext.defer(function() {
                if (!Ext.isEmpty(store) && !Ext.isEmpty(store.data) && store.data.length < 1) {
                    me.lookupReference('expandOrCollapse').hide();
                }
            }, 500);
        } else {
            Ext.Viewport.setActiveItem(0);
            Ext.Msg.alert('Status', 'Please fill the mandatory fields');
        }
    },

    onStartDate: function(startdate, newDate, oldDate, eOpts) {
        var me = this,
            endDate = Ext.ComponentQuery.query('#enddate')[0],
            field = Ext.ComponentQuery.query('selectfield')[0],
            currentyear = parseInt(new Date().getFullYear()),
            currentmonth = parseInt(Ext.Date.format(new Date(), 'm')),
            endMonth = parseInt(Ext.Date.format(newDate, 'm')),
            endYear = parseInt(Ext.Date.format(newDate, 'Y')),
            endDateValue = endDate.getValue();

        if (endDateValue == null) {
            if (newDate) {
                if (currentyear === endYear) {
                    if (currentmonth >= endMonth) {} else {
                        Ext.Msg.alert('ERROR', "Start month should be less than or equal to present month");
                        startdate.reset(true);
                    }
                }
            }

        } else if (newDate != null) {
            if (newDate <= endDateValue) {
                if (currentyear === endYear) {
                    if (currentmonth >= endMonth) {
                        startdate.setValue(newDate);
                    } else {
                        Ext.Msg.alert('ERROR', "Start month should be less than or equal to present month");
                        startdate.reset(true);
                    }
                }
            } else {
                Ext.Msg.alert('Title', 'Start date should not be greater than End date');
                startdate.setValue(null);
            }
        }

        me.onTextChange(field, null, null, eOpts);
    },

    onEndDate: function(enddate, newDate, oldDate, eOpts) {
        var me = this,
            startDate = Ext.ComponentQuery.query('#startdate')[0],
            field = Ext.ComponentQuery.query('selectfield')[0],
            startDateValue = startDate.getValue(),
            currentyear = parseInt(new Date().getFullYear()),
            currentmonth = parseInt(Ext.Date.format(new Date(), 'm')),
            endMonth = parseInt(Ext.Date.format(newDate, 'm')),
            endYear = parseInt(Ext.Date.format(newDate, 'Y'));

        if (startDateValue == null) {
            if (newDate) {
                if (currentyear === endYear) {
                    if (currentmonth >= endMonth) {} else {
                        Ext.Msg.alert('ERROR', "Start month should be less than or equal to present month");
                        enddate.reset(true);
                    }
                }
            }
        } else if (newDate != null) {
            if (newDate >= startDateValue) {
                if (currentyear === endYear) {
                    if (currentmonth >= endMonth) {
                        enddate.setValue(newDate);
                    } else {
                        Ext.Msg.alert('ERROR', "Start month should be less than or equal to present month");
                        enddate.reset(true);
                    }
                }

            } else {
                Ext.Msg.alert('Title', 'End date should be greater than Start date');
                enddate.setValue(null);
            }
        }

        me.onTextChange(field, null, null, eOpts);
    },

    onTextChange: function(field, newValue, oldValue, eOpts) {
        var form = field.up('profileskillsform'),
            record = form.getValues(),
            saveButton = form.lookupReference('savebutton');

        if (Ext.isEmpty(Ext.String.trim(record.skill)) || Ext.isEmpty(Ext.String.trim(record.Rating)) 
            || Ext.isEmpty(record.startDate) || Ext.isEmpty(record.endDate) 
            || Ext.isEmpty(Ext.String.trim(record.selfcomments))) {

            saveButton.setDisabled(true);
        } else {
            saveButton.setDisabled(false);
        }
    }
});