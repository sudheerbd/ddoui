/**
 * This view is responsible for provide karma score search view in home page.
 * @class 'DDO.view.widget.karmascore.KarmaScoreSearchView'
 * @extends 'Ext.view.View'
 * @alias 'widget.karmascoresearchview'
 * @ViewModel 'DDO.view.widget.karmascore.KarmaScoreSearchModel'
 * @Controller 'DDO.view.widget.karmascore.KarmaScoreSearchController'
 */
Ext.define('DDO.view.widget.karmascore.KarmaScoreSearchView', {
    extend: 'Ext.view.View',
    alias: 'widget.karmascoresearchview',

    cls: 'ddo-karma-search-view noscrollbar',
    
    loadingText: '',

    emptyText: LabelsTitles.HOME.KARMASCORE.NODATAFOUND,

    itemTpl: [
        '<div class="scoreView-cls ddo-karma-search-item">',
        '<div class="profile-img-wrap">',
        '<img class="profileImage-cls" src="{[this.getProfileImg(values)]}">',
        '</div>',
        '<div class="name-wrapper">',
        '<span class="scorerName-cls" ',
        '{[this.validEllipsesQtip(values.employee, 25)]}',
        '>{[this.shorten(values.employee, 25)]}</span>',
        '<br>',
        '<span class="profession-cls"',
        '{[this.validEllipsesQtip(values.hr_designation, 25)]}',
        '>{[this.shorten(values.hr_designation, 25)]}</span>',
        '</div>',
        '<div class="score-wrapper">',
        '<span class="score-cls">{[this.getKarmaPoints(values)]}</span>',
        '</div>',
        '</div>', {
            getKarmaPoints: function(values) {
                var karma = parseFloat(values.karmapoints);
                if (karma >= 1000) {
                    karma = karma / 1000;
                    karma = karma + 'K';
                }
                return karma;
            },
            getProfileImg: function(values) {
                return values.user_profile_pic_url;
            },
            shorten: function(string, limit) {
                return Ext.String.ellipsis(string, limit);
            },
            validEllipsesQtip: function(value, limit) {
                var qtip = " data-qtip='" + value + "'";
                return (value.length > limit) ? qtip : '';
            }
        }
    ]
});