Ext.define('DDO.overrides.form.field.HtmlEditor', {
    override: 'Ext.form.field.HtmlEditor',

    mixins: {
        field: 'Ext.form.field.Field'
    },

    initDefaultFont: function() {
        // It's not ideal to do this here since it's a write phase, but we need to know 
        // what the font used in the textarea is so that we can setup the appropriate font 
        // options in the select box. The select box will reflow once we populate it, so we want 
        // to do so before we layout the first time. 
        var me = this,
            selIdx = 0,
            fonts, font, select,
            option, i, len, lower;

        if (!me.defaultFont) {
            font = me.textareaEl.getStyle('font-family');
            font = Ext.String.capitalize(font.split(',')[0]);
            fonts = Ext.Array.clone(me.fontFamilies);
            font = "Open Sans";
            Ext.Array.include(fonts, font);
            fonts.sort();

            me.defaultFont = font;

            select = me.down('#fontSelect').selectEl.dom;
            for (i = 0, len = fonts.length; i < len; ++i) {
                font = fonts[i];
                lower = font.toLowerCase();
                option = new Option(font, lower);
                if (font === me.defaultFont) {
                    selIdx = i;
                }
                option.style.fontFamily = lower;

                if (Ext.isIE) {
                    select.add(option);
                } else {
                    select.options.add(option);
                }
            }
            // Old IE versions have a problem if we set the selected property 
            // in the loop, so set it after. 
            select.options[selIdx].selected = true;
        }
    }
});