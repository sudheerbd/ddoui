/**
 * The file HelpMenuViewController is the controller file for the help view.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.helpmenuviewcontroller'.
 */
Ext.define('DDO.view.help.HelpMenuViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.helpmenuviewcontroller',

    /**
     * This handler is responsible for rendering help view
     * @param {Object} panel, scope reference of panel view.
     * @param {Object} eOpts, Event Objects.
     */
    OnHelpRender: function(panel, eOpts) {
        try {
            var vm = this.getView().getViewModel(),
                store = vm.getStore('helpContentStore');
            if (!store.isLoaded()) {
                store.load({
                    callback: function(records, operation, success) {
                        if (success && success == true) {
                    
                            var viewmodel = panel.getViewModel(),
                                i, items = records,
                                j = "",lastContent='',l="",karmaExtraConten='';

                            for (i = 1; i < items.length-4; i++) {
                                var data = records[i].data,
                                    extraContent;
                                    if (items[i].data.point1 && items[i].data.point2) {
                                    extraContent = '<ul class="extra-content-cls"><li>' + items[i].data.point1 + '</li>' +
                                        '<li>' + items[i].data.point2 + '</li></ul>';

                                } else {
                                    extraContent = "";
                                }
                                j += '<div class ="help-subtitle style="color: orange;">' + items[i].data.subtitle + '</div> </br>' +
                                '<r class="help-content">&nbsp&nbsp&nbsp' + items[i].data.content + '</r></br>' +
                                    extraContent +'<hr class="content-bottom-cls">';
                            }
                            if (items[5].data.point1 && items[5].data.point2 &&
                                items[5].data.point3) {
                                karmaExtraContent = '<br><ul class="extra-content-cls pad-cls"><li>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + items[i].data.point1 + '</li>' +
                                    '<li>' + items[i].data.point2 + '</li>' +
                                    '<li>' + items[i].data.point3 + '</li></ul>';
                            }
                            l+= '<div class ="help-subtitle help-last">' + items[5].data.subtitle + '</div> </br>' +
                            '<r class="help-content">&nbsp&nbsp&nbsp' + items[5].data.content + '</r></br>';
                        
                            var forManagersBlock= '<div style="box-shadow:0 8px 6px -6px lightgrey"><div class="manager-cls">' + items[6].data.subheading +'</div>'+
                                                    '<div class ="help-subtitle style="color: orange;">' + items[6].data.subtitle + '</div>'+
                                                    '<div class="last-manager-content">&nbsp&nbsp&nbsp' + items[6].data.content + '</div></div>';
                            var firstContent='<div class="first-content">'+items[0].data.content+'</div>'
                            for(var k=items.length-2;k<items.length;k++) {
                            lastContent += '<div class="last-content">'+items[k].data.content+'</div>'
                            }
                            var brakeTag='<br><br>';
                            var htmlText='<div style="box-shadow:0 8px 6px -6px lightgrey;">'+firstContent+j+l+karmaExtraContent+'</div>'+forManagersBlock+lastContent+brakeTag;
                            viewmodel.set('htmlText',htmlText);
                        }
                    }
                });
            }
        } catch (err) {
            Utility.showToast(Messages.HELP.RENDERERR, err);
        }
    }

});
