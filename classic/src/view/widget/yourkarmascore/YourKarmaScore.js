/**
 *   This file  is responsible for YourKarmaScore in home page.
 *   @extends {Ext.container}
 *   @alias widget.yourkarmascore
 *   ViewModel: 'DDO.view.widget.yourkarmascore.YourKarmaScoreModel',.
 *   ViewController :'DDO.view.widget.yourkarmascore.YourKarmaScoreController'.
 */
Ext.define('DDO.view.widget.yourkarmascore.YourKarmaScore', {
    extend: 'Ext.Container',
    alias: 'widget.yourkarmascore',
    requires: [
        'DDO.view.widget.yourkarmascore.YourKarmaScoreModel',
        // 'DDO.view.widget.yourkarmascore.YourKarmaScoreController',
        'Ext.toolbar.Fill'
    ],
    // controller: 'yourkarmascore',
    viewModel: {
        type: 'yourkarmascore'
    },
    height: Constants.ViewportHeight * 0.463,
    margin: '20 0 0 0',
    items: [{
        xtype: 'toolbar',
        items: [ {
            xtype: 'container',
            cls: 'karmascore-title',
            bind: {
                html: '{title}'
            }
        }],
        cls: 'score-title'
    }],
    initComponent: function() {
        this.callParent(arguments);
        var me = this;
        Ext.Ajax.request({
            url: '/karma/karmawidget',
            method: 'GET',
            scope: me,
            success: function(response) {
                var resData = Ext.decode(response.responseText);
                if (resData && resData.success) {
                    me.setData(resData.data[0]);
                }
            }
        });
    },

    tpl: [
        '<tpl if="this.isLoadedData(values)">',
        '<div class="wrap {[this.getWrapCls(values)]}">',
            '<tpl if="bcbpid">',
                '<svg class="arc arc-left">',
                //   '<path fill="none" stroke="#446688" stroke-width="1" d="M 80 25 A 75 75 0 0 0 5 99.99999999999999"></path>',
                '<path fill="none" stroke="#446688" stroke-dasharray="5,5" stroke-width="1" d="M 7 147 l 50 -50"></path>',
                // <path id="Path_184" data-name="Path 184" d="M229.382,378.117h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Zm0-8h-1v-4h1Z" transform="translate(-228.382 -190.118)" fill="#707070"/>,
                '</svg>',
            '</tpl>',
            '<tpl if="ucbpid">',
                '<svg class="arc arc-right">',
                // '<title>Hello, World!</title>',
                  '<path fill="none" stroke="#446688" stroke-dasharray="5,5" stroke-width="1" d="M 140,-5 l -90 90"></path>',
                '</svg>',
            '</tpl>',
            '<tpl if="bcbpid">',
                '<div class="karma-info info-left">',
                '<div class="profile-pic" {[this.validEllipsesQtip(values.employeeNameLeft,40)]} data-qtip={employeeNameLeft} style="background:url({[this.profileImgLeft(values)]}) 0px 0px / cover no-repeat,url('+Utility.defaultImg+') 0px 0px / cover no-repeat; margin: 6px;"></div>',
                  '<div class="score">{[this.getKarmaPointsLeft(values)]}</div>',
                //   '<div class="name" {[this.validEllipsesQtip(values.employeeNameLeft, 12)]}>{employeeNameLeft}</div>',
                '</div>',
            '</tpl>',
            '<div class="karma-info info-center">',
            '<div class="profile-pic" style="background:url({[this.profileImgCenter(values)]}) 0px 0px / cover no-repeat, url('+Utility.defaultImg+') 0px 0px / cover no-repeat;"></div>',
              '<div class="score">{[this.getKarmaPointsCenter(values)]}</div>',
              // '<div class="name" data-qtip="{employeeNameCenter}">{employeeNameCenter}</div>',
            '</div>',
            '<tpl if="ucbpid">',
                '<div class="karma-info info-right">',
                '<div class="profile-pic" {[this.validEllipsesQtip(values.employeeNameRight,40)]}  data-qtip={employeeNameRight} style="background:url({[this.profileImgRight(values)]}) 0px 0px / cover no-repeat,url('+Utility.defaultImg+') 0px 0px / cover no-repeat;"></div>',
                  '<div class="score">{[this.getKarmaPointsRight(values)]}</div>',
                //   '<div class="name" {[this.validEllipsesQtip(values.employeeNameRight, 12)]}>{employeeNameRight}</div>',
                '</div>',
            '</tpl>',
          
          '</div>',
        '<tpl else>',
        '<div class="karma-emptyicon-cls"></div>',
        '</tpl>', {

            profileImgCenter: function(values) {
                return Utility.imageCheck(values.profileImgCenter);
            },
            profileImgLeft: function(values) {
                return Utility.imageCheck(values.profileImgLeft);
            },
            profileImgRight: function(values) {
                return Utility.imageCheck(values.profileImgRight);
            },
            getKarmaPointsCenter: function(values) {
                return values.karmapointsCenter || 0;
            },
            getKarmaPointsLeft: function(values) {
                return values.karmapointsLeft ? values.karmapointsLeft : 'Lazy';
            },
            getKarmaPointsRight: function(values) {
                return values.karmapointsRight ? values.karmapointsRight : 'Lazy';
            },
            validEllipsesQtip: function(value, limit) {
                var qtip = " data-qtip='" + value + "'";
                return qtip;
            },
            isLoadedData: function(values) {
                if(values.cbpid) {
                    return true;
                }

                return false;
            },
            getWrapCls: function(values) {
                return (values.bcbpid ? 'show-left' : '') + ' ' + (values.ucbpid ? 'show-right' : '');
            }
    }]
});
