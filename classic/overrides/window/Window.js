Ext.define('DDO.overrides.window.Window', {
	override: 'Ext.window.Window',

	initComponent: function() {
		this.callParent(arguments);
		this.on({
			activate: 'activate'
		});
		this.on({
			deactivate: 'deactivate'
		});
	},
	activate: function(me, eOpts) {
		Utility.activeWindowCount = Utility.activeWindowCount + 1;
		Utility.isAlertActive = true;
	},
	deactivate: function(me, eOpts) {
		Utility.activeWindowCount = Utility.activeWindowCount - 1;
		if (Utility.activeWindowCount == 0) {
			Utility.isAlertActive = false;
		}

	},
	afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        this.callParent([arguments]);
        this.removeCls('x-unselectable');
    },
    onResize: function() {

          var popupWindow = this,
              newWidth = popupWindow.getWidth(),
              newHeight = popupWindow.getHeight(),
              //maxWidth = Ext.getViewportWidth(),
			  //maxHeight = Ext.getViewportHeight(),
			  maxWidth = Ext.getBody().getViewSize().width;
			  maxHeight = Ext.getBody().getViewSize().height;
              needToSize = false;

          if (newWidth > maxWidth) {
              newWidth = maxWidth;
              needToSize = true;
          }

          if (newHeight > maxHeight) {
              newHeight = maxHeight;
              needToSize = true;
          }

          if (needToSize) {
              popupWindow.setSize(newWidth, newHeight);
          }
      },

      onPosition: function(x, y) {

          var popupWindow = this,
              maxX = Ext.getBody().getViewSize().width - popupWindow.getWidth(),
              maxY = Ext.getBody().getViewSize().height - popupWindow.getHeight();

          x = parseInt(x);
          y = parseInt(y);

          /* if the popupWindow is moving out of the viewport,
           * then ristricting the popupWindow movement within viewport.
           */
          if (x < 0 || x > maxX || y < 0 || y > maxY) {

              //set x co-ordinate if popupWindow is moving extreme right/left 
              if (x < 0) {
                  x = 0;
              } else if (x > maxX) {
                  x = maxX;
              }

              //set y co-ordinate if popupWindow is moving extreme top/bottom
              if (y < 0) {
                  y = 0;
              } else if (y > maxY) {
                  y = maxY;
              }

              popupWindow.setXY([x, y]);
          }
      }
});