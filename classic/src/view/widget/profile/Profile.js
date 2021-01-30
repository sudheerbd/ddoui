 /**
 * This view is responsible for displaying profile in feeds view.
 * @class 'DDO.view.widget.profile.Profile'
 * @extends 'Ext.Widget'
 * @alias 'profile'
 */
Ext.define('DDO.view.widget.profile.Profile', {
    extend: 'Ext.Widget',

    xtype: 'profile',

    config: {
        ui: null,
        name: null,
        imgSrc: null,
        designation: null,
        employeeCode: null
    },

    element: {
        cls: 'profile',
        reference: 'element',

        children: [{
            reference: 'imageEl',
            tag: 'img',
            cls: 'profileImage',
            onerror: Utility.defaultUserImg,
        }, {
            reference: 'nameEl',
            tag: 'span',
            cls: 'profileName',
            listeners: {
                click: 'onClickProfileName'
            }
        }, {
            reference: 'minusEl',
            tag: 'span',
            cls: 'minus-gray',
            html: '|'
        }, {
            reference: 'designationEl',
            tag: 'span',
            cls: 'profileDesignation'
        }]
    },

    updateImgSrc: function(image) {
        this.imageEl.applyStyles({
            borderRadius: (this.getUi() == 'profile-box') ? '10%' : '50%'
        });
        this.imageEl.dom.src = image;
    },

    updateName: function(name) {
        this.nameEl.setHtml(name);
    },

    updateDesignation: function(designation) {
        if (designation) {
            this.designationEl.setHtml(designation);
        } else {
            this.minusEl.setHtml(" ");
   onClickProfileName     }
    },

    onClickProfileName: function() {
        Ext.GlobalEvents.fireEvent('redirecttoprofile', this.getEmployeeCode());
    },

    updatecontent: function(userDetails) {
        var me = this,
            profilePicture = '';

        if (userDetails.user_profile_pic_url) {
            profilePicture= Utility.imageCheck(userDetails.user_profile_pic_url);
        }
        me.updateImgSrc(profilePicture);
        me.updateName(userDetails.user_full_name);
        me.updateDesignation(userDetails.user_designation);
        me.setEmployeeCode(userDetails.c_bpartner_id);
    }
});