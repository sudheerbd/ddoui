Ext.define('ACCTRL.view.window.RevokeWindow', {
    extend: 'Ext.window.Window',

    xtype: 'revokewindow',
    requires: [
        'ACCTRL.view.window.RevokeWindowController'
    ],
    cls: 'appwindow-cls',
    bodyPadding: 40,
    modal: true,
    width: 700,
    height: 400,
    scrollable: true,
    title: 'Revoke',
    titleAlign: 'center',
    gridMode: false,
    userRecord: null,
    controller: 'revokewindowcontroller',

    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController();

        Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    listeners: {
        show: function(revokeWindow, opts) {
            revokeWindow.center();

            var userRecord = revokeWindow.userRecord;
            var data = [];

            if(revokeWindow.gridMode){
                data.push({
                    name : userRecord.data.appUser.empname,
                    profilePic: userRecord.data.appUser.profileimage
                });
            } else {
                for(var i=0; i < userRecord.length; i++){
                    data.push({
                        name : userRecord[i].data.appUser.empname,
                        profilePic: userRecord[i].data.appUser.profileimage
                    });
                }
            }
            revokeWindow.down('dataview[name=userpics]').setData(data);
        }
    },
    items: [{
        xtype: 'form',
        bbar: {
            items: [{
                xtype: 'button',
                text: 'Confirm',
                formBind: true,
                cls: 'revoke-confirm-btn',
                handler: 'onFormConfirmClick'
            }]
        },
        items: [{
           xtype: 'dataview',
           cls: 'profile-img-view',
           name: 'userpics',
           tpl : [
                '<div class="profile-div">',
                    '<tpl for=".">',
                        '<tpl if="this.imgExistance(values)">',
                            '<div class="profile-img-wrap" data-qtip="{name}">',
                                '<img class="profile-thumb-img" src="{profilePic}" width="75px" height="70px">',
                            '</div>',
                            
                        '<tpl else>',
                            '<div data-qtip="{name}" style="background: {[this.nonImgColor(values)]};" class="app-profile-img-dash-non-img-cls">',
                            '<span class="profile-img-first-letter-cls">{[this.getNonImgFirstLetter(values)]}</span></div>',
                        '</tpl>',
                    '</tpl>',
                '</div>',
                {
                imgExistance: function(values) {
                    if(values && values.profilePic && values.profilePic != "null") {
                        return true;
                    } else {
                        return false;
                    }
                },
                nonImgColor: function(values) {
                    if(values){
                        values.color = Utility.colorPicker[Math.floor(Math.random()*Utility.colorPicker.length)];
                        return values.color;
                    }
                },

                getNonImgFirstLetter: function(values) {
                    if(values && values.name && values.name != "null")
                        return values.name[0];
                }
            }],
            itemSelector: '.profile-img-wrap'
        }, {
            xtype: 'textarea',
            allowBlank: false,
            width: '100%',
            labelAlign: 'top',
            labelSeparator: '',
            cls: 'app-window-fields',
            beforeLabelTextTpl: '<span class="mandatory-astric-cls">*</span>',
            fieldLabel: 'Description',
            name: 'description',
            emptyText: 'Write'
        }]
    }]
});