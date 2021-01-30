/**
 * The file PeopleDataView is the view file for data in he PeopleView.
 * @extends 'Ext.view.View'.
 * @alias widget.peopledataview.
 * ViewModel : 'DDO.view.projects.people.PeopleViewModel'.
 * ViewController : 'DDO.view.projects.people.PeopleViewController'.
 */
Ext.define('DDO.view.projects.people.PeopleDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.peopledataview',
    cls: 'ddo-people-view',
    loadMask: false,
    emptyText:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PEOPLE.NODATAFOUND ,
    width: '100%',
    store: 'projects.people.PeopleViewStore',
    tpl: [
        '<tpl for=".">',
            '<tpl if="this.getHrActive(values,values.projectrole)">',
                '<div><p style="color:gray;">{projectrole}',
                '<span style="font-size:12px;font-weight: 400; color:gray;">',
                '&nbsp({[this.getPeopleCount(values)]})</span></p></div>',
            '</tpl>',
            '<div class="people-thumb-wrap {[this.getShadowResource(values)]}">',
                '<div class="peopleListView-cls ddo-people-list-item">',
                    '<div class="profile-img-wrap">',
                        '<img class="profileImage-cls" src="{[this.getProfileImg(values)]}" onerror='+Utility.defaultUserImg+'>',
                    '</div>',
                    '<div class="name-wrapper">',
                        '<span class="scorerName-cls" ',
                        '{[this.validEllipsesQtip(values.empfullname, 15)]}',
                        '>{[this.shorten(values.empfullname, 15)]}</span>',
                        '<br>',
                        '<span class="profession-cls"',
                        '{[this.validEllipsesQtip(values.projectrole, 18)]}',
                        '>{[this.shorten(values.designationname, 18)]}</span>',
                        '<br>',
                        '<span class="profession-cls"',
                        '>{[this.validDate(values.startdate)]} To ',
                        '{[this.validDate(values.enddate)]}</span>',
                    '</div>',
                    '<div class="score-wrapper">',
                        '<span class="score-cls">{[this.getAllocationPercentage(values)]}</span>',
                    '</div>',
                '</div>',
                '{[this.getDeleteAndEditOption(values)]}',
            '</div>',
        '</tpl>', {
            validDate: function (value) {
                var newDate = Ext.Date.add(new Date(value), Ext.Date.DAY);
                var year = newDate.getFullYear(),
                    month = newDate.getMonth() + 1,
                    date = newDate.getDate();
                if ((month.toString()).length == 1) {
                    month = "0" + month;
                }
                if((date.toString()).length == 1){
                    date = "0" + date;
                }
                return year + "-" + month + "-" + date;
            },
            getDeleteAndEditOption:function(values) {
                var mainViewModel = Ext.ComponentQuery.query('mainviewport')[0].getViewModel(),
                projectNewResources =mainViewModel.get('projectNewResources');
                if(projectNewResources == true){
                    return ""
                }else{
                var str ='<img class="ddo-people-edit" src="../resources/images/edit.png" data-action="editInterest">'/*</img><img class="ddo-people-delete" src="http://image.flaticon.com/icons/svg/54/54501.svg" data-action="deleteInterest"></img>*/;
                return str;    
                }
            },
             getShadowResource:function(values) {
                if(values.status =="Past resources"){
                    return "disable-people-cls"                    
                }else if(values.shadow_resource =='Y'){
                    return "shadow-cls";
                // }else if(values.from_employee && values.approved == 'N'){
                //     return "pending-people-cls"
                }else if(values.status == "Future resources"){
                    return "future-resources-color"
                }
                else{
                   return "";
                }
            },
            getProfileImg: function(values) {
                return Utility.imageCheck(values.user_profile_pic_url);
            },
            shorten: function(string, limit) {
                return Ext.String.ellipsis(string, limit);
            },
            validEllipsesQtip: function(value, limit) {
                var qtip = " data-qtip='" + value + "'";

                return (value && value.length > limit) ? qtip : '';
            },
            getAllocationPercentage: function(values) {
                var allocationScore = values.allocationperct  + "%";
                return allocationScore;
            },
            getHrActive: function(rec,projectrole) {
                // var store = Ext.getStore('projects.people.PeopleViewStore');
                // store.each(function(rec){
                //     if(rec.data.projectrole == null){
                //         rec.data.projectrole = "No Role"
                //     }
                // })
                 if(projectrole == null){
                     projectrole = "No Role"
                 }

                if (projectrole === Utility.empDes) {
                    return false;
                }
                Utility.empDes = projectrole;
                return true;
            },
            getPeopleCount: function(values) {
                var store = Ext.getStore('projects.people.PeopleViewStore'),
                    storeGroups = store.getGroups(),
                    rec;
                var groupsCollection = storeGroups.getByKey(values.projectroleid);

                if(groupsCollection && groupsCollection.items){
                    return groupsCollection.items.length;
                }else{
                    return 0;
                } 
            },
            getPendingResources:function (values) {
                if(values.from_employee && values.approved){
                    return "pending-people-cls";
                }
            }
        }
    ],
    itemSelector: 'div.people-thumb-wrap',
    listeners: {
        itemclick: 'onPeopleItemClick'
    }
});