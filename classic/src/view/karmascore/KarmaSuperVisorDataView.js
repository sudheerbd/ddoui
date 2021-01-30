Ext.define('DDO.view.karmascore.KarmaSuperVisorDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.karmasupervisordataview',
    cls: 'ddo-adv-karma-search-view noscrollbar',
    loadMask: false,
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.NODATAFOUNT, 
    tpl: [
       '<tpl for=".">',
            '<tpl if="this.getGrouped(values)">',
                 '<div class="supervisor-div-cls" super-visor-id="{supervisor_id}">',
                    '<div class="design-div-cls {[this.getDesignDivCls(values)]}">',
                        '<div class="profile-adv-img-wrap">',
                            '<tpl if="values.supervisor_profile_img">',
                                '<img sup-emp-code="{supervisor_id}" class="profileImage-adv-cls" src="{[this.getSupervisorProfileImg(values)]}">',
                            '</tpl>',
                        '</div>',
                        '<div class="name-adv-wrapper">',
                            '<div style="{[this.getAlignmentForName(values,true)]}" sup-emp-code="{supervisor_id}" class="scorerName-cls" ',
                            '{[this.validEllipsesQtip(values.supervisorname, 16)]}',
                            '>{[this.shorten(values.supervisorname, 16)]}</div>',
                            '<br>',
                            '<div class="profession-cls"',
                            '{[this.validEllipsesQtip(values.supervisordesignation, 16)]}',
                            '>{[this.shorten(values.supervisordesignation, 16)]}</div>',
                        '</div>',
                        '<div class="score-adv-wrapper">',
                            '<span class="score-adv-cls">{[this.getKarmaPoints(values.supervisor_karmapoints)]}</span>',
                        '</div>',
                    '</div>',
                    '<table class="count-people-cls">',
                        '<tr>',
                            '<td class="td-design-cls">',
                                 '<div class="people-count-block-cls">',
                                    '{[this.empCount(values, xindex)]}<br />People',
                                '</div>',
                            '</td>',
                            '<td class="td-design-avg-cls">',
                                 '<div>',
                                    '<div class="design-score-cls">{[this.averageCount(values)]}</div>&nbsp;&nbsp;Avg',
                                '</div>',
                            '</td>',
                            '<td class="td-design-cls">',
                                 '<div>',
                                    '<span class="design-score-cls">{average}</span>&nbsp;&nbsp;Org Avg',
                                '</div>',
                            '</td>',
                        '</tr>',
                    '</table>',
                    '<div class="karma-usersicon-cls"></div>',
                '</div>',
                '<div class="extra-line-cls {[this.itemHidden(values)]}"></div>',
            '</tpl>',
            '<div class="scoreView-cls ddo-adv-design-search-item {[this.itemHidden(values)]}" emp-code="{c_bpartner_id}">',
                '<div class="profile-adv-img-wrap">',
                    '<img class="profileImage-adv-cls" src="{[this.getProfileImg(values)]}">',
                '</div>',
                '<div class="name-adv-wrapper">',
                    '<div style="{[this.getAlignmentForName(values,false)]}" class="scorerName-cls" ',
                    '{[this.validEllipsesQtip(values.employee, 16)]}',
                    '>{[this.shorten(values.employee, 16)]}</div>',
                    '<br>',
                    '<div class="profession-cls"',
                    '{[this.validEllipsesQtip(values.hr_designation, 16)]}',
                    '>{[this.shorten(values.hr_designation, 16)]}</div>',
                '</div>',
                '<div class="score-adv-wrapper">',
                    '<span class="score-adv-cls">{[this.getKarmaPoints(values.karmapoints)]}</span>',
                '</div>',
            '</div>',
        '</tpl>', {
            commonVar: function() {
                var obj = {},
                    karmaView = Ext.ComponentQuery.query('karmascoreview')[0],
                    viewModel = karmaView.getViewModel();
                obj.karmaView = karmaView;
                obj.viewModel = viewModel;
                return obj;
            },
            getGrouped: function(values) {
                var commonVar = this.commonVar(),
                    karmaView = commonVar.karmaView,
                    viewModel = commonVar.viewModel;

                if ((!Ext.isEmpty(values.supervisor_id)) 
                    && karmaView && (commonVar.viewModel.get('empSuperVisorName') != values.supervisor_id)) {
                    viewModel.set('empSuperVisorName', values.supervisor_id);
                    return true;
                }
               return false;
            },
            itemHidden: function(values) {
                var commonVar = this.commonVar(),
                    karmaView = commonVar.karmaView;
                if((!Ext.isEmpty(commonVar.viewModel.get('selecSuperVisorId'))) 
                    && values.supervisor_id == commonVar.viewModel.get('selecSuperVisorId')) {
                    return '';
                }
                return 'x-hidden';
            },  
            empCount: function(values, index) {
                var commonVar = this.commonVar(),
                    karmaView = commonVar.karmaView,
                    viewModel = commonVar.viewModel,
                    store = viewModel.get('allkarmascores'),
                    count;
                if(!Ext.isEmpty(store.getGroupField())) {
                    count = viewModel.get('supervisorCount');
                    viewModel.set('supervisorCount', count+1);
                    if(store.getGroups().items[count]) {
                        return store.getGroups().items[count].length;                        
                    } else {
                        return 0;
                    }
                }
                return 0;
            },
            averageCount: function(values) {
                 var commonVar = this.commonVar(),
                    karmaView = commonVar.karmaView,
                    viewModel = commonVar.viewModel,
                    store = viewModel.get('allkarmascores'),
                    count, viewItem, sum=0;

                if(!Ext.isEmpty(store.getGroupField())) {
                    count = viewModel.get('supervisorCount');
                    viewItem = store.getGroups().items[viewModel.get('supervisorCount')-1];

                    if(viewItem) {
                        for(var i=0; i<viewItem.length; i++) {
                            sum += parseInt(viewItem.items[i].get('karmapoints'));
                        }
                        return Math.round((sum/viewItem.length)*100)/100;                      
                    }
                }
            },
            getKarmaPoints: function(karmapoints) {
                if (Ext.isEmpty(karmapoints)) {
                    karmapoints = 0;
                }
                var karma = parseFloat(karmapoints);
                /* if (karma >= 1000) {
                     karma = karma / 1000;
                     karma = karma + 'K';
                 }*/
                return karma;
            },
            getSupervisorProfileImg: function(values) {
                return Utility.imageCheck(values.supervisor_profile_img);
            },
            getProfileImg: function(values) {
                return Utility.imageCheck(values.user_profile_pic_url);
            },
            shorten: function(string, limit) {
                //return Ext.String.ellipsis(string, limit);
                if(string == 'No designation') {
                    string = "";
                }
                return string;                
            },
            validEllipsesQtip: function(value, limit) {
                if(value) {
                    var qtip = " data-qtip='" + value + "'";                    
                    return (value.length > limit) ? qtip : '';
                } else {
                    return '';
                }
            },
            //based on filter view display or not
            //cls will be added to adjust the width
            getDesignDivCls: function(values) {
                var mainViewPort, showFilters, clsName;

                clsName = "";
                mainViewPort = Ext.ComponentQuery.query('mainviewport')[0];

                if(mainViewPort) {
                    showFilters = mainViewPort.getViewModel().get('showkarmascorefilters');

                    if(!showFilters) {
                        clsName = 'deisgn-div-filter-visible-cls';
                    }
                }

                return clsName;
            },
            getAlignmentForName:function(values,flag){ 
                var designation = flag?values.supervisordesignation:values.hr_designation;
                if(designation == '' || designation == null){
                    var style = 'padding-top:8px;';
                    return style;
                }else{
                    return '';
                }
            }
        }
    ],
    itemSelector: '.supervisor-div-cls',
    listeners: {
        itemclick: 'onSuperVisorItemHeaderClick',
        render: 'onSuperVisorViewRender',
        beforerefresh:'onKarmaBeforeRefresh'
    }
});