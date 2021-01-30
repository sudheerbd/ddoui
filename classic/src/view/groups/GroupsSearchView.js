/**
 *   This file  is responsible for GroupsSearchView.
 *   @extends {Ext.view.View}
 *   @alias widget.groupssearchview
 *   ViewModel: 'DDO.view.groups.GroupsWindowViewModel',.
 *   ViewController :'DDO.view.groups.GroupsWindowViewController'.
 */
Ext.define('DDO.view.groups.GroupsSearchView', {
    extend: 'Ext.view.View',
    alias: 'widget.groupssearchview',
    requires: [
        'DDO.store.groups.EmpGroupStore'
    ],
    bind: {
        hidden: '{empListVisibility}'
    },
    cls: 'ddo-group-search-view',
    selectedItemCls: 'empselected-cls',
    loadMask: false,
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.SEARCHEMPTYTEXT,
    width: '100%',
    store: {
        type: 'empgroupstore'
    },
    selectionModel: {
        mode: 'SIMPLE',
        allowDeslect: true,
        listeners: {
            selectionchange: 'onSelectionModelChange'
        }
    }, 
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.GROUPS.GROUPSEARCH,
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
            getProfileImg: function(values) {
                return Utility.imageCheck(values.user_profile_pic_url);
            },
            shorten: function(string, limit) {
               // return Ext.String.ellipsis(string, limit);
               return string;
            },
            validEllipsesQtip: function(value, limit) {
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            },
            selectPermit: function(values) {
                var groupView = Ext.ComponentQuery.query('groupsview')[0],
                    editPermit = groupView.getViewModel().get('nonEditEmpSelect');
            
                if(editPermit){
                    return '';
                }else{
                    return 'group-nonselec-cls';
                }
            }
        }
    ],
    itemSelector: 'div.empListView-cls'
});