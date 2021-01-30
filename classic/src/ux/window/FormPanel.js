/**
 * The file FormPanel is a window which is used in the Employee Setup module.
 */
Ext.define('DDO.ux.window.FormPanel', {
    extend: 'Ext.window.Window',

    alias: 'widget.formpanel',
    modal: true,
    resizable: false,
    cls: 'rule-window-cls',
    width:Constants.ViewportWidth*0.44,
    closable: false,
    closeAction: 'hide'
     //commented to remove form animation.
    /*listeners: {
        show: function(w) {
           
           Ext.create('Ext.fx.Anim', {
                target: w,
                duration: 1000,
                from: {
                    top: -300,
                    bottom: 150 //starting width 400
                },
                to: {
                    top: 150, //end width 300
                    bottom: 400 // end height 300
                }
            });
        }
    }*/
});
