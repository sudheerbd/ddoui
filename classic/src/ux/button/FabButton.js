/**
 * A Button class to display a Floating action button(FAB).
 *
 * ## Simple FAB Button
 *
 * Here is a fab Button in it's simplest form:
 *
 *     @example miniphone
 *     var fabButton = Ext.create('FABBUTTON.view.FabButton');
 *     Ext.Viewport.add(fabButton);
 *
 * ## fabUi
 *
 * You can also create a Button with just an icon using the {@link #fabUi} configuration:
 *
 *     @example miniphone
 *     var fabButton = Ext.create('FABBUTTON.view.FabButton', {
 *         fabUi: 'edit'
 *     });
 *     Ext.Viewport.add(fabButton);
 *
 * Use color with the {@link #color} in FAB config.
 *
 * ## color
 *
 *     @example
 *     Ext.create('FABBUTTON.view.FabButton', {
 *         fabUi: 'edit',
 *         color:'red'
 *     });
 *
 * ## position
 *
 * Buttons with different positions.
 * available (if {@link #position} is set)
 * Default postion is br
 *
 * - **tl** - top left
 * - **tc** - top center
 * - **tr** - top right
 * - **bl** - bottom left
 * - **br** - bottom right
 * - **bc** - bottom center
 * - **cl** - center left
 * - **cr** - center right
 * - **cc** - center center
 *
 * ## Example
 *
 * This example shows a fab button on the screen.
 *
 *     @example preview
 *     Ext.define('FABBUTTON.view.MainView', {
 *     extend: 'Ext.TabPanel',
 *     alias: 'widget.mainview',
 *     requires: ['FAB.view.FabButton'],
 *     config: {
 *       fullscreen: true,
 *       tabBarPosition: 'bottom',
 *     defaults: {
 *       styleHtmlContent: true
 *      },
 *      items: [{
 *           title: 'Home',
 *           iconCls: 'home',
 *           html: 'Home Screen'
 *          },{
 *           title: 'Contact',
 *           iconCls: 'user',
 *           html: 'Contact Screen',
 *           items: [{              
 *               xtype:'fabbutton',
 *               dimension: 80,
 *               position: 'br',
 *               fabUi: 'edit',
 *               cls : ['custom-fab'],
 *               color: 'red',
 *            }]
 *         }]      
 *       }
 *     });
 */
Ext.define('DDO.ux.button.FabButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.fabbutton',
    config: {
        /**
         * @cfg {int} dimension
         * Optional dimension  
         * Default dimention (height and width) of fab button (60 X 60)
         */
        dimension: 60,
        /**
         * @cfg {String} Position
         * Optional postion that will set the button w.r.t position specified. 
         * @accessor
         * available postition (tr, tl, tc, br, bl, bc) 
         * Default postion of button will be Bottom-Right
         */
        customPosition: 'br',
        /**
         * @cfg {String} color
         * Optional color seted as the background color for button.
         * Color can be name or hexadecimal color code 
         * @accessor
         */
        color: '#db4437',
        /**
         * @cfg {String} fabUi
         * Optional fabUi
         * Default fab ui is 'add'
         * Set button background image.
         * @accessor
         */
        fabUi: 'add',
        /**
         * @cfg {String} cls
         * Optional
         * Default cls 'x-fab-button'
         */
        cls: 'x-fab-button',
        /**
         * @cfg {Boolean} defaultIcon
         * Optional
         * Default to true.
         * If false Default icon to be used instead of user provided icons.
         */
        defaultIcon: true,
        /**
         * @cfg {Boolean} useFabUi
         * Optional
         * Default to true.
         * If false FAB button ui will not be applied.
         */
        useFabUi: true
    },
    initComponent: function() {
        this.callParent(arguments);
        this.setButtonStyle();
    },
    applyCls: function(fabCls) {
        if (Ext.isString(fabCls)) {
            fabCls = fabCls.split();
        }
        var index = fabCls.indexOf('x-fab-button');
        if (index === -1) {
            fabCls.push('x-fab-button');
        }
        return fabCls;
    },
    applyFabUi: function(fabUi) {
        var fabBtnUi;
        if (fabUi) {
            return fabUi;
        }
    },
    updateFabUi: function(fabUi) {
        var useDefault = this.getDefaultIcon();
        if (useDefault) {
            this.handleFabUi(fabUi);
        } else {
            this.setIcon(fabUi);
        }
    },
    setButtonStyle: function() {
        var me = this;
        var size = me.getDimension();
        var position = me.getCustomPosition();

        me.addCls('x-fab-' + position);
        //if (!size) {
        //    size = 60;
        //}
        //me.setSize(size, size);
        me.setDock('bottom');
        //me.element.dom.style.backgroundColor = this.getColor();
        this.updateBtnPosition(position);
    },
    updateUi: function() {
        this.setUi('plain');
    },
    handleFabUi: function(fabUi) {
        if (!this.config.useFabUi) {
            return;
        }
        var text = {
            done: '&#x2714;',
            add: '&#x271B;',
            edit: '&#x270d;',
            home: '&#x2302;',
            previous: '&larr;',
            next: '&rarr;',
            remove: '&#x2715',
            message: '&#x2709;',
            phone: '&#x2706;',
            flight: '&#x2708;'
        };
        if (Ext.isEmpty(text[fabUi])) {
            console.warn('Available icons are - done, add, edit, home, next, previous, remove, message, phone ');
            return;
        }
        this.setText(text[fabUi]);
    },
    updateBtnPosition: function(position) {
        var btnPosition = {
            tl: 'topLeft',
            tc: 'topCenter',
            tr: 'topRight',
            bl: 'bottomLeft',
            bc: 'bottomCenter',
            br: 'bottomRight',
            cl: 'centerLeft',
            cc: 'center',
            cr: 'centerRight'
        };
        this.currentPosition = btnPosition[position];
    }
});