Ext.define('DDO.view.setup.employeesetup.WorkExpDetailsView',{
     extens:'Ext.view.View',
     alias:'widget.workexpdetailsview',
     reference:'workexpdetailsview',
     scrollable:true,
     loadMask:false,
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
        '<div class="form"></div></tpl>'
    ],
    itemSelector: 'div.employee',
    trackOver: true,
    overItemCls: 'div-hover',
    emptyText: LabelsTitles.PROFILE.ADDJOB.EMPTYTEXT,

    // listeners: {
    //     itemclick: 'onItemClick',
    //     itemmouseenter: 'onItemMouseEnter',
    //     itemmouseleave: 'onItemMouseLeave'
    // }
});