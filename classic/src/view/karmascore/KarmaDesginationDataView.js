Ext.define('DDO.view.karmascore.KarmaDesginationDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.karmadesginationdataview',
    cls: 'ddo-adv-karma-search-view noscrollbar',
    loadMask: false,
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.NODATAFOUNT, 
    tpl: [
        '<tpl for=".">',
            '<tpl if="this.getGrouped(values)">',
                 '<div class="design-karma-ind-cls" hr-design-id="{hr_designation_id}">',
                    '<div class="design-div-cls {[this.getDesignDivCls(values)]}">{hr_designation}</div>',
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
                    '<div style="{[this.getAlignmentForName(values)]}" class="scorerName-cls" ',
                    '{[this.validEllipsesQtip(values.employee, 15)]}',
                    '>{[this.shorten(values.employee, 15)]}</div>',
                    '<br>',
                    '<div class="profession-cls"',
                    '{[this.validEllipsesQtip(values.hr_designation, 15)]}',
                    '>{[this.shorten(values.hr_designation, 15)]}</div>',
                '</div>',
                '<div class="score-adv-wrapper">',
                    '<span class="score-adv-cls">{[this.getKarmaPoints(values)]}</span>',
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
                if (karmaView 
                    && (!Ext.isEmpty(values.hr_designation_id)) 
                    &&  (commonVar.viewModel.get('empDesignId') != values.hr_designation_id)) {
                    viewModel.set('empDesignId', values.hr_designation_id);
                    return true;
                }
                return false;
            },
            itemHidden: function(values) {
                var commonVar = this.commonVar(),
                    karmaView = commonVar.karmaView;

                if((!Ext.isEmpty(commonVar.viewModel.get('selecDesignId'))) 
                    && (values.hr_designation_id == commonVar.viewModel.get('selecDesignId'))) {
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
                    count = viewModel.get('count');
                    viewModel.set('count', count+1);
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
                    count = viewModel.get('count');
                    viewItem = store.getGroups().items[viewModel.get('count')-1];

                    if(viewItem && viewItem.length > 0) {
                        for(var i=0; i<viewItem.length; i++) {
                            sum += parseInt(viewItem.items[i].get('karmapoints'));
                        }
                        return Math.round((sum/viewItem.length)*100)/100;                        
                    }
                }
            },
            getKarmaPoints: function(values) {
                var karma = parseFloat(values.karmapoints);
                /*if (karma >= 1000) {
                    karma = karma / 1000;
                    karma = karma + 'K';
                }*/
                return karma;
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
            getAlignmentForName:function(values){
                if(values.hr_designation == '' || values.hr_designation == null){
                    var style = 'padding-top:8px;';
                    return style;
                }else{
                    return '';
                }
            }
        }
    ],
    itemSelector: '.design-karma-ind-cls',
    listeners: {
        itemclick: 'onDesignItemHeaderClick',
        render: 'onDesignViewRender',
        beforerefresh:'onKarmaBeforeRefresh' 
    }
});