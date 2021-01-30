/**
 * This view is responsible for displaying nominate other  form for the details of employee.
 * @class 'DDO.view.profile.nominate.NominateForm'
 * @extends 'Ext.form.Panel'
 * @alias 'widget.ratingform'
 * @ViewModel 'DDO.view.profile.nominate.NominateWindowModel'
 * @Controller 'DDO.view.profile.nominate.NominateWindowController'
 */
Ext.define('DDO.view.profile.nominate.NominateForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ratingform',

    requires: [
        'DDO.ux.progressbar.MultiCircularProgressBar'
    ],

    cls: 'ddo-mobile-rating-form',

    scrollable: 'y',

    config: {
        ratingId: 0
    },

    centered: false,
    hideOnMaskTap: true,
    fullscreen: true,
    top: 50,
    right: 0,
    left: 0,
    bottom: 0,

    items: [{
        xtype: 'label',
        cls: 'ddo-nominate-name',
        bind: {
            html: '{nominateName}'
        }
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center',
            pack: 'center'
        },
        items: [{
            xtype: 'multicircularprogressbar',
            reference: 'multicircularprogressbar',
            radius: [165, 125],
            value: [0, 0],
            borderWidth: 15,
            color: ['#fab82e', '#000'],
            labelColor: ['#000', '#fab82e'],
            centerIcon: 'resources/images/rating/Amazing.png',
            spacing: 20,
            animationTime: 5,
            pendingColor: 'transparent',
            start: (Math.PI / 2)
        }]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center',
            pack: 'center'
        },
        items: [{
            bind: {
                html: '<span class="ddo-label-points">Karma Points</span> <br/> ' +
                    '<div class="ddo-points ddo-legend" style="background: {karmapointsColor};"></div>'
            }
        }, {
            margin: '0 0 0 10',
            bind: {
                html: '<span class="ddo-label-points">Reward Points</span> <br/> ' +
                    '<div class="ddo-points ddo-legend" style="background: {rewardpointsColor};"></div>'
            }
        }]
    }, {
        xtype: 'container',
        margin: '20 0 0 0',
        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'center'
        },
        items: [{
            xtype: 'button',
            text: LabelsTitles.PROFILE.ACTIVITY,
            name: 'activity',
            reference: 'actButton',
            cls: 'ddo-mobile-toggle-button',
            value: 'N',
            toggleGroup: 'ratingGroup',
            enableToggle: true,
            pressed: true,
            handler: 'onTypeButtonClick',
            pressedCls: 'onActivityPressed-cls'
        }, {
            xtype: 'button',
            text: LabelsTitles.PROFILE.FEEDBACK,
            name: 'feedback',
            reference: 'feedButton',
            cls: 'ddo-mobile-toggle-button',
            value: 'Y',
            toggleGroup: 'ratingGroup',
            enableToggle: true,
            handler: 'onTypeButtonClick',
            pressedCls: 'onFeedbackPressed-cls'

        }]
    }, {
        xtype: 'selectfield',
        reference: 'ratingCombo',
        name: 'typeList',
        cls: 'rating-combo-cls',
        autoSelect: false,
        store: 'profile.NominateNames',
        bind: {
            placeHolder: '{ratingName}',
            selection: '{activity}'
        },
        labelAlign: 'left',
        displayField: 'name',
        valueField: 'typeid',
        allowBlank: false,
        margin: 20,
        listeners: {
            change: 'onComboValueSelect'
        }
    }, {
        xtype: 'textareafield',
        reference: 'ratingComment',
        cls: 'ddo-mobile-nominate-comment',
        placeHolder: LabelsTitles.PROFILE.COMMENTS,
        clearIcon: false,
        margin: '20 20 0 20',
        bind: {
            value: '{comments}'
        }
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'center'
        },
        items: [{
            xtype: 'button',
            text: LabelsTitles.PROFILE.SUBMIT,
            formBind: true,
            ui: 'roundedbutton',
            handler: 'onRatingFormSubmit',
            cls: 'ddo-mobile-nominate-submit',
            bind: {
                disabled: '{!value}'
            }
        }]
    }]
});