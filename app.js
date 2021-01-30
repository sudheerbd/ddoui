/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

 
Ext.application({
    name: 'DDO',

    extend: 'DDO.Application',

    requires: [
        'DDO.util.KeycloakLoader',
        'DDO.util.Utility',
        'DDO.view.login.LoginView',
        'DDO.util.LabelsTitles',
        'DDO.util.Messages',
        'DDO.util.Constants',
        'DDO.util.Api',
        'DDO.util.ShareLink',
        'DDO.util.AlertMessages',
        'DDO.util.CheckBoxColumns'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'DDO.view.main.Main'
    mainView: 'DDO.view.login.LoginView',

    //Changing the default timeout for the ajax Request

    launch: function() {
        Ext.Ajax.setTimeout(60000);
        if (Ext.View && Ext.view.AbstractView) {
            Ext.view.AbstractView.prototype.loadingText = '';
        }
        DDO.util.ShareLink.loadLinkWindow();
        var viewSize = Ext.getBody().getViewSize();
        if(!Ext.isEmpty(viewSize)){
            Constants.ViewportHeight = viewSize.height;
            Constants.ViewportWidth = viewSize.width;
        }
    }

    //-------------------------------------------------------------------------
    // Most customizations should be made to DDO.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});