/**
 * The file JobDetailsView is the view file for the view of the job details in the profile view.
 * @extends {Ext.view.View}.
 * @alias 'widget.jobdetailsview'.
 */
Ext.define('DDO.view.profile.details.JobDetailsView', {
    extend: 'Ext.view.View',

    alias: 'widget.jobdetailsview',

    cls: 'employeedetailsview-cls',

    scrollable: true,

    loadMask: false,

    tpl: [
        '<tpl for="."><div class="employee">',
        '<div class="line"></div>',
        '<div class="ddo-title-wrap"><h3 class="designation">{designation}</h3>',
        '<img class="ddo-edit-img" style = "display:none" src="resources/images/edit.png" ></div>',
        '<div class="x-clear"></div>',
        '<p>{company}</p>',
        '<p>{convertdate}</p>',
        '<p>{location}</p>',
        '<p>{description}</p>',
        '</div>',
        '<div class="form"></div></tpl>', {
         /*   getDesignation: function(values) {
                if (Ext.isEmpty(values.designation_when_left)) {
                    return values.designation_when_joined;
                } else {
                    return values.designation_when_left;
                }
            }*/
        }
    ],
    itemSelector: 'div.employee',
    trackOver: true,
    overItemCls: 'div-hover',
    emptyText: LabelsTitles.PROFILE.ADDJOB.EMPTYTEXT,

    listeners: {
        itemclick: 'onItemClick',
        itemmouseenter: 'onItemMouseEnter',
        itemmouseleave: 'onItemMouseLeave'
    }
});