/**
 * This view is responsible for displaying karma score list for top 10 as widget in home page.
 * @class 'DDO.view.widget.karmascore.KarmaScoreList'
 * @extends 'Ext.view.View'
 * @alias 'widget.karmascorelist'
 * @ViewModel 'DDO.view.widget.karmascore.KarmaScoreModel'
 * @Controller 'DDO.view.widget.karmascore.KarmaScoreController'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreList', {
    extend: 'Ext.view.View',

    alias: 'widget.karmascorelist',

    // requires: [
    //     'DDO.view.widget.karmascore.KarmaScoreController',
    //     'DDO.view.widget.karmascore.KarmaScoreModel'
    // ],

    autoHeight: true,

    loadMask: false,
    emptyText: LabelsTitles.HOME.KARMASCORE.NOUSERFOUND,
    cls : 'karmaScoreList-cls',

    tpl: [
        '<div class="scoreViewData-cls ">',
        '<tpl for=".">',
        '<div style="margin: 10px;" class="scoreView-cls">',
        '<img class="profileImage-cls" src="{[this.getProfileImg(values)]}" onerror='+Utility.defaultUserImg+'>',
        '<div style="{[this.getAlignmentForName(values)]}" class="scorerName-cls ddo-karma-item"',
        '{[this.validEllipsesQtip(values.employee, 13)]}',
        '>{[this.getEllipseText(values.employee, 20)]}</div>',
        '<span class="score-cls">{[this.getKarmaPoints(values)]}</span><br />',
        '<tpl if="this.validDesignation(values.hr_designation)">',
         '<div class="profession-cls" ',
         '{[this.validEllipsesQtip(values.hr_designation, 13)]}',
         '>{[this.getEllipseText(values.hr_designation, 20)]}</div>',
         '</tpl>',
         '</div>',
        '</tpl>',
        '</div>', {
            getKarmaPoints: function(values) {
                return values.karmapoints;
            },

            validDesignation: function(designation) {
                if(!designation 
                    || designation == 'No designation') {
                    return false;
                }
                return true;
            },

            getEllipseText: function(string, limit) {
                if(Ext.isEmpty(string) 
                    || string == 'No designation'){
                    string ="";
                }
                return Ext.String.ellipsis(string, limit);
            },

            getProfileImg: function(values) {
                return Utility.imageCheck(values.user_profile_pic_url);
            },

            validEllipsesQtip: function(value, limit) {
                if(Ext.isEmpty(value) 
                    || value == 'No designation'){
                    value ="";
                }
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            },
            getAlignmentForName:function(values){ 
                if(values.hr_designation == '' 
                    || values.hr_designation == null){
                    var style = 'padding-top:12px;';
                    return style;
                }else{
                    return '';
                }
            }
        }
    ],

    itemSelector: '.ddo-karma-item',

    listeners: {
        'itemclick': 'onKarmaItemClick'
    }
});