/**
 *   This file  is responsible for SelectedGroupsView.
 *   @extends {Ext.view.View}
 *   @alias widget.selectedgroupsview
 *   ViewModel: 'DDO.view.groups.GroupsViewModel',.
 *   ViewController :'DDO.view.groups.GroupsViewController'.
 */
Ext.define('DDO.view.groups.SelectedGroupsView', {
    extend: 'Ext.view.View',
    alias: 'widget.selectedgroupsview',
    cls: 'ddo-group-search-view',
    loadMask: false,
    width: '100%',
    height:'100%',
    // bind:{
    //     store : '{selectemployeestore}'
    // },
    store: 'groups.SelectedEmpStore',
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.ADDPPLEMPTYTEXT,
    itemTpl: [
        '<div class="empListView-cls ddo-emp-list-item">',
            '<div class="profile-img-wrap">',
            '<img class="profileImage-cls" src="{[this.getProfileImg(values)]}" onerror='+Utility.defaultUserImg+'>',
            '</div>',
            '<div class="name-wrapper">',
                '<div class="scorerName-cls" ',
                    '{[this.validEllipsesQtip(values.employee, 20)]}',
                    '>{[this.shorten(values.employee, 20)]}</div>',
                    '<br>',
                '<div class="profession-cls"',
                    '{[this.validEllipsesQtip(values.hr_designation, 20)]}',
                    '>{[this.shorten(values.hr_designation, 20)]}</div>',
            '</div>',
            '<div class="group-wrapper">',
                '<span class="{[this.selectPermit(values)]}"></span>',
            '</div>',
        '</div>', {
            getProfileImg: function (values) {
                return Utility.imageCheck(values.user_profile_pic_url);
            },
            
            shorten: function (string, limit) {
                // return Ext.String.ellipsis(string, limit);
                return string;
            },
            
            validEllipsesQtip: function (value, limit) {
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            },
            
            selectPermit: function (values) {
                var groupView = Ext.ComponentQuery.query('groupsview')[0],
                        editPermit = groupView.getViewModel().get('nonEditSelections');

                if (editPermit) {
                    return 'group-delete-cls';
                }
                return '';
            }
        }
    ],
    
    itemSelector: 'span.group-delete-cls',
    
    listeners: {
        itemclick: 'groupedUnlinkRec'
    }
});