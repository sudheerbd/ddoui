/**
 *   This file  is responsible for KarmaScoreDataView.
 *   @extends {Ext.view.View}
 *   @alias widget.karmascoredataview.
 *   ViewModel: 'DDO.view.karmascore.KarmaScoreViewModel'.
 *   ViewController :'DDO.view.karmascore.KarmaScoreViewController'.
 */
Ext.define('DDO.view.karmascore.KarmaScoreDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.karmascoredataview',
    cls: 'ddo-adv-karma-search-view noscrollbar',
    loadMask: false,
    emptyText: LabelsTitles.EMPLOYEEDASHBOARD.KARMASCORE.NODATAFOUNT, 
    itemTpl: [
        '<div class="scoreView-cls ddo-adv-karma-search-item">',
        '<div class="profile-adv-img-wrap">',
        '<img class="profileImage-adv-cls" src="{[this.getProfileImg(values)]}" onerror='+Utility.defaultUserImg+'>',
        '</div>',
        '<div class="name-adv-wrapper">',
        '<div style="{[this.getAlignmentForName(values)]}" class="scorerName-cls" ',
        '{[this.validEllipsesQtip(values.employee, 16)]}',
        '>{employee}</div>',
        '<br>',
        '<div class="profession-cls"',
        '{[this.validEllipsesQtip(values.hr_designation, 16)]}',
        '>{[this.getDesignationName(values.hr_designation)]}</div>',
        '</div>',
        '<div class="score-adv-wrapper">',
        '<span class="score-adv-cls">{[this.getKarmaPoints(values)]}</span>',
        '</div>',
        '</div>', {
            getKarmaPoints: function(values){
                return values.karmapoints;
            },
            getProfileImg: function(values) {
                return Utility.imageCheck(values.user_profile_pic_url);
              
            },
            validEllipsesQtip: function(value, limit) {
                if(Ext.isEmpty(value)){
                    value ="";
                }
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            },
            getDesignationName: function(designation) {
                if(designation == 'No designation') {
                    designation = "";
                }

                return designation;
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
    listeners:{
        itemclick:'onKarmaScoreItemClick'
    }
});