 /**
 * This view is responsible for displaying existing comments in feeds view.
 * @class 'DDO.view.widget.ExistingComment'
 * @extends 'Ext.Widget'
 * @alias 'existingComment'
 */
Ext.define('DDO.view.widget.ExistingComment', {
    extend: 'Ext.Widget',

    xtype: 'existingComment',

    cls: 'commentMainCls',

    config: {
        ui: null,
        name: null,
        imgSrc: null,
        comment: null,
        employeeCode: null
    },

    element: {
        cls: 'commentSubCls',
        reference: 'element',
        children: [{
            reference: 'imageWrapperElement',
            children: [{
                reference: 'imageEl',
                tag: 'img',
                cls: 'commentspic',
                onerror: Utility.defaultUserImg,
            }]
        }, {
            reference: 'mainElement',
            cls: 'commentUiTag',
            children: [{
                reference: 'nameEl',
                cls: 'commentName',
                listeners: {
                    click: 'onClickCommentProfileName'
                }
            },
             {
                reference: 'designationEl',
                tag: 'div',
                //tag         : 'li',
                cls: 'commentCommentCls',
                delegate : 'morelink',
                listeners:{
                    click:'moreLink'
                }
            },
            // {
            //     reference:'designEl',
            //     cls:'des-el-div',
            //     children:[{
            //         reference: 'designationEl',
            //         // tag: 'div',
            //         //tag         : 'li',
            //         cls: 'commentCommentCls',
            //     },{
            //         reference:'moreEl',
            //         tag:'span',
            //         html:'More'
            //     }]
            // }
        ]
        }]
    },

    updateImgSrc: function (image) {
        this.imageEl.applyStyles({
            borderRadius: (this.getUi() == 'profile-box') ? '10%' : '50%'
        });
        this.imageEl.dom.src = Utility.imageCheck(image);

    },

    updateName: function (name) {
        this.nameEl.setHtml(name);
    },

    updateComment: function (designation) {
        var len =135;
        if(designation.length>len){
        this.updateCommentLength(designation);
        }else{
            this.designationEl.setHtml(designation);
        }
    },

    onClickCommentProfileName: function () {
        Ext.GlobalEvents.fireEvent('redirecttoprofile', this.getEmployeeCode());
    },
    moreLink: function (e) {
        var moreComp = this.el.dom.getElementsByClassName('morelink')[0],
        text = moreComp.innerText;
        var hg= this.designationEl.getHeight(),
        compContHeight,compContc;
        var comp = Ext.fly(this.designationEl.getId());
        var compCont = comp.component.up().id;
        compContc = Ext.getCmp(compCont);
        compContHeight = compContc.getHeight();
        if (text == 'more') {
            this.designationEl.setHtml(this.getComment() + '... <span class="morelink">Less</span>');
        } else {
            if (this.getComment().length > 135) {
                this.updateCommentLength(this.getComment());
            }
        }
        this.up('feedsdataitem').updateLayout();
    },
    updateCommentLength: function (value) {

        var len = 135;
        var ellipsestext = "...";
        var moretext = "more";
        var limitedChar = value.substr(0, len);
        var restOfTheContent = value.substr(len - 1, value.length - len);
        var html = '<span>'+limitedChar + '<span >' + ellipsestext + '&nbsp;</span><span class="morecontent" ><span  class = "com-text">' + restOfTheContent + '</span></span><span id = "more" class="morelink">' + moretext + '</span></span>';
        this.designationEl.setHtml(html);
    }
});