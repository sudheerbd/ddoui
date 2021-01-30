

/**
 * This view is responsible for displaying user profile with the details of skills.
 * @class 'DDO.view.profile.details.ProfileSkillsAdded'
 * @extends 'Ext.view.View'
 * @alias 'widget.profileskillsadded'
 * @ViewModel 'DDO.view.skillslist.ProfileSkillsModel'
 * @Controller 'DDO.view.skillslist.ProfileSkillsController'
 */
Ext.define('DDO.view.profile.details.ProfileSkillsAdded', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.profileskillsadded',
    reference: 'profileskillsadded',
    emptyText: LabelsTitles.PROFILE.NOSKILL,
    requires: [
        'DDO.store.skillslist.ProfileSkillsComboStore',
        'DDO.store.skillslist.ProfileSkillsStore'
    ],
    loadMask: false,
    viewModel: {
        type: "profileskills",
      },

    store: 'skillslist.ProfileSkillsStore',
    columns: [
        // { text: 'Id', 
        //   dataIndex: 'ddo_empskills_id'
        //  },
        {
         text: 'Name', 
         dataIndex: 'skillname',
         flex: 1 ,
         align: "center",
        },
       {
            xtype: 'actioncolumn',
            text: 'Primary Skill',
            dataIndex: 'primaryskill',
            align: 'center',
            flex: 1 ,
            items: [{
            getClass: function(value){
        //  debugger;
         // return "<span class = 'primaryValue-cls x-fa fa-check' id='pId'></span>";
         if(value === 'Y'){
             return "x-fa fa-check" ;
         } else {return "x-fa fa-times" ;}
         
     }
     }]
    },
       {
        xtype: 'actioncolumn',
        text: 'Rating', 
        align: "center",
        dataIndex: 'rating',
        flex: 1 ,
        renderer: function(values) {
                        var html = [],
                            i = 1,
                            rating = parseFloat(values),
                            tpl = "";
                        for (var len = Math.floor(rating); i < 6; i = i + 1) {
                            if (i <= len) {
                                html.push(tpl.replace("", "<img src='resources/images/profile/Star.png' class='starimage-cls'>"));
                            } else if (rating % 1 !== 0 && i === (len + 1)) {
                                html.push(tpl.replace("", "<img src='resources/images/profile/Half.png' class='starimage-cls'>"));
                            } else {
                                html.push(tpl.replace("", "<img src='resources/images/profile/Star_line.png' class='starimage-cls'>"));
                            }
                        }
                        return (html.join(" "));
                    } 
       },
        {
            xtype: "actioncolumn",
            flex: 1,
            text: 'Action',
            reference: "Action",
            align: "center",
            items: [
              {
               
                iconCls: "x-fa fa-pencil",
                // handler : "testFun",
                handler: "onEditButton",
                header: "hidden",
                cls: 'btn-icon-cls'
              },
              {
                xtype: 'tbspacer'
              },
              {
                iconCls: "x-fa fa-trash",
                handler: "onSaveClicks",
                header: "hidden",
                cls: 'btn-icon-clss'
              },
            ],
          },
    ],
});


