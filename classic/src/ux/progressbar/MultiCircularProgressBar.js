/**
 * @class DDO.ux.progressbar.MultiCircularProgressBar
 * @extend DDO.ux.progressbar.CircularProgressBar
 * @alias multicircularprogressbar
 *
 * A class to show multiple circular progress bars
 *
 * Here is a multi circular progress bar in it's simplest form:
 *
 *     @example
 *     var progressBar = Ext.create('DDO.ux.progressbar.MultiCircularProgressBar');
 *     Ext.Viewport.add(progressBar);
 * 
 *     @example using progress bar with other component
 *      Ext.create('Ext.Container', {
 *          fullscreen: true,
 *          items: [{
 *              xtype: 'label',
 *              html: 'Multi Circular Progressbars'
 *          }, {
 *              xtype: 'multicircularprogressbar',
 *              radius: [165, 125],
 *              value: [20, 70],
 *              borderWidth: 15,
 *              labelColor: ['#fab82e', '#000'],
 *              color: ['#000', '#fab82e'],
 *              centerIcon: 'circle.png',
 *              spacing: 20,
 *              animationTime: 5,
 *              pendingColor: '#fff',
 *              start: (Math.PI / 2)
 *          }]
 *      });
 *
 */
Ext.define('DDO.ux.progressbar.MultiCircularProgressBar', {
    extend: 'DDO.ux.progressbar.CircularProgressBar',
    alias: 'widget.multicircularprogressbar',

    config: {
        /**
         * @cfg {Number / [Number]} radius
         * Optional   
         * Default radius is 100
         * It is also used to set height and width of canvas component
         * Radius of progress bar is calculated as (radius / 2 - spacing)
         */
        radius: 100,

        /**
         * @cfg {Number / [Number]} completed
         * Amount of % completed. Can be an array. If only one values is given
         * then that value is applied to all bars
         */
        value: 100,

        /**
         * @cfg {String / [String]} color
         * Defaults to #000 (black).
         * The colors to be applied to the progress indicator. If only one value is given
         * then that value is applied for all bars
         */
        color: '#000',

        /**
         * @cfg {Boolean} showLabels
         * Defaults to true
         * To show the labels with the values of each bar
         */
        showLabels: true,

        /**
         * @cfg {String / [String]} labelColor
         * Defaults to #f00 (red)
         * The colors for the labels. If single color is given it applies to all
         * the labels
         */
        labelColor: '#f00',

        /**
         * @cfg {String / Number} labelFontSize
         * Defaults to 16.
         * The font size for the label. Default unit is px.
         */
        labelFontSize: 16,

        /**
         * @cfg {String} centerIcon
         * The icon url to be used as an icon for the progress bar.
         * The icon is placed at the center of the highest radius bar.
         */
        centerIcon: null,

        /**
         * @cfg {Number} iconDimension
         * The size of the icon in pixels.
         */
        iconDimension: 60,


        // Used to indicate that the circles are concentric
        concentric: true

    },

    cachedConfig: {
        percent: 6000
    },

    constructor: function(config) {
        // add the canvas to children as per the length of the radius specified
        var me = this,
            showLabels = config.showLabels || me.config.showLabels,
            radius = config.radius || me.config.radius,
            value = config.value || me.config.value,
            concentric = (Ext.isDefined(config.concentric)) ? config.concentric : me.config.concentric,
            noOfBars = (radius) ? radius.length || 1 : 0,
            children = me.element.children,
            footer = children.pop(),
            cls = ['wtc-canvas-el'],
            centerIcon = config.centerIcon || me.config.centerIcon,
            iconDimension = config.iconDimension || me.config.iconDimension,
            innerChildren = [],
            labelFontSize = config.labelFontSize || me.config.labelFontSize,
            i;

        // clear the children array
        children.pop();

        // push the progress wrapper onto children for the element
        children.push({
            reference: 'canvasWrap',
            tag: 'div',
            cls: 'wtc-progress-bar-canvas-wrap',
            children: innerChildren
        });

        // Iterating through the radii to create canvas for each bar
        for (i = 0; i < noOfBars; i++) {

            // attaching the required CSS classes
            cls = ['wtc-canvas-el'];
            cls.push('wtc-canvas-el' + i);
            if (concentric) {
                cls.push('wtc-canvas-el-concentric');
            }

            // pushing the canvas
            innerChildren.push({
                tag: 'canvas',
                reference: 'canvasEl' + i,
                cls: cls.join(' ')
            });

            if (showLabels) {
                // pushing the label if showLabels is true
                innerChildren.push({
                    tag: 'label',
                    reference: 'labelEl' + i,
                    cls: 'wtc-progress-canvas-label-el wtc-progress-canvas-label-el' + i
                });
            }

        }

        if (config.centerIcon) {
            // add the icon if it exists
            innerChildren.push({
                reference: 'iconEl',
                cls: 'wtc-progress-bar-icon-el',
                tag: 'img',
                alt: 'icon'
            })
        }

        if (config.footer) {
            // add the footer if it exists
            innerChildren.push(footer);
        }

        // total number of bars
        me.noOfBars = noOfBars;
        // max radius in the given array
        me.maxRadius = Ext.Array.max(radius) || radius;
        me.maxRadiusIdx = (radius.indexOf) ? radius.indexOf(me.maxRadius) : 0;

        me.callParent([config]);
    },
    
    applyFooter: function(text) {
        var dimension = this.maxRadius;

        this.containerEl.setWidth(dimension);
        this.canvasFooter.setWidth(dimension);

        return text;
    },
    
    updateIconDimension: function(dimension) {
        var iconEl = this.iconEl;

        if (iconEl) {
            iconEl.setHeight(dimension);
            iconEl.setWidth(dimension);
        }
    },
    
    updateRadius: function(radius) {
        var me = this,
            canvasEl, labelEl, iconEl, i;

        // setting the height of the container
        if (me.getConcentric()) {
            me.canvasWrap.setHeight(me.maxRadius);
            me.canvasWrap.setWidth(me.maxRadius);
        }

        // setting the heights of respective canvas
        for (i = 0; i < me.noOfBars; i++) {
            canvasEl = me['canvasEl' + i];
            labelEl = me['labelEl' + i];
            canvasEl.dom.setAttribute('height', radius[i] || radius);
            canvasEl.dom.setAttribute('width', radius[i] || radius);
            canvasEl.setZIndex(i + 1);

            me.setLabelProperties(labelEl, i);
        }

        me.showIndicator();
    },

    // Animated draw
    showAnimatedDraw: function() {
        var me = this,
            start = me.config.start,
            radii = me.config.radius,
            values = me.config.value,
            colors = me.config.color,
            pendingColor = me.config.pendingColor,
            borderWidths = me.config.borderWidth,
            textColors = me.config.textColor,
            percent = me.config.percent,
            interval = [],
            startAngle = [],
            diff = [],
            radius = [],
            concentric = me.getConcentric(),
            cw = [],
            ch = [],
            progressBar,
            ctx, startAngle, completed,
            centerCoordinateX, centerCoordinateY, currentCanvas, textColor, color,
            dimension, i;

        progressBar = function(idx, ctx, centerCoordinateX, centerCoordinateY, radius, cw, diff, completed) {
            diff[idx] = parseFloat(((startAngle[idx] / percent) * Math.PI * 2 * 10).toFixed(2));

            ctx.clearRect(0, 0, cw[idx], ch[idx]);
            ctx.lineWidth = (Ext.isArray(borderWidths)) ? borderWidths[idx] : borderWidths;

            textColor = (Ext.isArray(textColors)) ? textColors[idx] : textColors;
            color = (Ext.isArray(colors)) ? colors[idx] : colors;

            // Drawing outer (pending arc)
            ctx.fillStyle = pendingColor;
            ctx.strokeStyle = pendingColor;
            ctx.beginPath();
            ctx.arc(centerCoordinateX, centerCoordinateY, radius[idx], 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();

            // Drawing progress bar indicator
            me.drawProgess(ctx, color, centerCoordinateX, centerCoordinateY, radius[idx], start, diff[idx], completed, false);

            if (completed < 0) {
                if (startAngle[idx] === (6000 + completed)) {
                    clearTimeout(interval[idx]);
                }
                startAngle[idx] = startAngle[idx] - 1;
            } else {
                if (startAngle[idx] >= completed) {
                    clearTimeout(interval[idx]);
                }
                startAngle[idx] = startAngle[idx] + 1;
            }

        }

        // looping through the bars and run the animation
        for (i = 0; i < me.noOfBars; i++) {
            currentCanvas = me['canvasEl' + i];
            ctx = currentCanvas.dom.getContext('2d');
            completed = parseFloat((Ext.isArray(values)) ? values[i] : values);

            if (completed < 0) {
                startAngle[i] = 6000;
            } else {
                startAngle[i] = 0;
            }

            cw[i] = ctx.canvas.width;
            ch[i] = ctx.canvas.height;

            dimension = (Ext.isArray(radii)) ? radii[i] : radii;
            radius[i] = dimension / 2 - me.config.spacing;

            centerCoordinateX = ctx.shadowOffsetX + (dimension / 2);
            centerCoordinateY = ctx.shadowOffsetY + (dimension / 2);
            if (concentric && i !== me.maxRadiusIdx) {
                currentCanvas.setLeft(ctx.shadowOffsetX + (me.maxRadius / 2) - (dimension / 2));
                currentCanvas.setTop(ctx.shadowOffsetY + (me.maxRadius / 2) - (dimension / 2));
            } else if (dimension === me.maxRadius) {
                // center the icon to outermost canvas
                me.setupCenterIcon(centerCoordinateX, centerCoordinateY);
            }

            // setting the position of the label
            if (me.getShowLabels()) {
                labelEl = me['labelEl' + i];
                me.setupLabel(labelEl, ctx, dimension);
            }

            interval[i] = setInterval(
                progressBar.bind(me, i, ctx, centerCoordinateX, centerCoordinateY, radius, cw, diff, completed, values),
                me.config.animationTime
            );
        }
    },
    
    //Simple draw
    showSimpleDraw: function() {
        var me = this,
            radii = me.config.radius,
            concentric = me.getConcentric(),
            values = me.config.value,
            colors = me.config.color,
            textColors = me.config.textColor ? me.config.textColor : color,
            percent = me.config.percent,
            borderWidth = me.config.borderWidth,
            cw, ch,
            currentCanvas,
            textColor, color,
            ctx, start, completed,
            centerCoordinateX, centerCoordinateY,
            radius, diff,
            iconEl, labelEl, fontSize, extraSpacingX, extraSpacingY,
            i;

        // iterating through canvas
        for (i = 0; i < me.noOfBars; i++) {
            currentCanvas = this['canvasEl' + i];
            ctx = currentCanvas.dom.getContext('2d');
            start = me.config.start;
            cw = ctx.canvas.width;
            ch = ctx.canvas.height;
            dimension = radii[i] || radii;
            completed = values[i] || values;
            completed = parseFloat(completed);

            centerCoordinateX = ctx.shadowOffsetX + (dimension / 2);
            centerCoordinateY = ctx.shadowOffsetY + (dimension / 2);

            if (concentric && i !== me.maxRadiusIdx) {
                currentCanvas.setLeft(ctx.shadowOffsetX + (me.maxRadius / 2) - (dimension / 2));
                currentCanvas.setTop(ctx.shadowOffsetY + (me.maxRadius / 2) - (dimension / 2));
            } else if (dimension === me.maxRadius) {
                // center the icon to outermost canvas
                me.setupCenterIcon(centerCoordinateX, centerCoordinateY);
            }

            radius = dimension / 2 - me.config.spacing;
            color = (Ext.isArray(colors)) ? colors[i] : colors;
            textColor = (Ext.isArray(textColors)) ? textColors[i] : textColors;
            diff = parseFloat(((completed / percent) * Math.PI * 2 * 10).toFixed(2));

            // setting the position of the label
            if (me.getShowLabels()) {
                labelEl = me['labelEl' + i];
                me.setupLabel(labelEl, ctx, dimension);
            }

            ctx.clearRect(0, 0, cw, ch);
            ctx.lineWidth = (Ext.isArray(borderWidth)) ? borderWidth[i] : borderWidth;

            // Drawing outer (pending arc)
            me.drawPending(ctx, centerCoordinateX, centerCoordinateY, radius, 0, Math.PI * 2, true);

            //drawing progress arc
            me.drawProgess(ctx, color, centerCoordinateX, centerCoordinateY, radius, start, diff, completed, false);
        }
    },

    updateCenterIcon: function(icon) {
        var iconEl = this.iconEl;

        if (iconEl) {
            iconEl.dom.setAttribute('src', icon);
        }
    },
    
    setupCenterIcon: function(centerCoordinateX, centerCoordinateY) {
        var me = this,
            iconEl = me.iconEl;
        if (iconEl) {
            iconEl.setLeft(centerCoordinateX - (me.getIconDimension() / 2));
            iconEl.setTop(centerCoordinateY - (me.getIconDimension() / 2));
        }
    },

    updateLabelColor: function() {
        if(this.getShowLabels()) {
            this.updateLabels();
        }
    },

    updateLabelFontSize: function() {
        if(this.getShowLabels()) {
            this.updateLabels();
        }
    },

    updateLabels: function() {
        if(this.getShowLabels()) {
            var me = this,
                ln = me.noOfBars, 
                i;

            for (i = 0; i < ln; i++) {
                me.setLabelProperties(me['labelEl' + i], i);
            }
        }
    },

    setLabelProperties: function(labelEl, i) {
        var me = this,
            dh = Ext.dom.Helper,
            labelColor = me.getLabelColor(),
            value = me.getValue(),
            labelFontSize = me.getLabelFontSize();

        labelFontSize = (Ext.isString(labelFontSize)) ? labelFontSize : labelFontSize + 'px';

        if (labelEl && me.getShowLabels()) {
            labelEl.setZIndex(i + 2);
            labelEl.setHtml((Ext.isDefined(value[i])) ? value[i] + '' : value + '');
            dh.applyStyles(labelEl, {
                color: (Ext.isArray(labelColor)) ? labelColor[i] : labelColor,
                fontWeight: 700,
                fontSize: labelFontSize
            });
        }
    },
    
    setupLabel: function(labelEl, ctx, canvasDimension) {
        var me = this,
            fontSize, extraSpacingX, extraSpacingY;
        fontSize = labelEl.dom.style.fontSize;
        fontSize = Number(fontSize.substr(0, fontSize.indexOf('px')));
        extraSpacingX = (labelEl.dom.innerText.length === 1) ? (fontSize / 2) - 1 : (fontSize / 2) + labelEl.dom.innerText.length;
        extraSpacingY = me.config.spacing - (fontSize / 2 + 1);
        labelEl.setLeft(ctx.shadowOffsetX + (me.maxRadius / 2) - extraSpacingX);
        labelEl.setTop(ctx.shadowOffsetY + (me.maxRadius / 2) - (canvasDimension / 2) + extraSpacingY);
    },
    
    drawPending: function(ctx, x, y, radius, startAngle, endAngle, counter) {
        ctx.fillStyle = this.config.pendingColor;
        ctx.strokeStyle = this.config.pendingColor;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, Math.PI * 2, counter);
        ctx.stroke();
        ctx.closePath();
    },
    
    drawProgess: function(ctx, color, x, y, radius, start, diff, completed, counter) {
        var anticlockwise = (completed < 0) ? true : false;
        
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, start, diff / 10 + start, anticlockwise);
        ctx.stroke();
        ctx.closePath();
    },

    setValue: function(value) {
        var me = this,
            ln, i;
        
        // if any null values make them 0
        if(Ext.isArray(value)) {
            for(i = 0, ln = value.length; i < ln; i++) {
                value[i] = value[i] || 0;
            }
        } else {
            value = value || 0;
        }

        if (Ext.Array.equals(me.initialConfig.value, value) && !me.oldValues) {
            // do the set op
            
            me.oldValues = Ext.clone(me.config.value);
            me.config.value = value;
        } else {
            // do the update op
            
            me.oldValue = Ext.clone(me.config.value);
            me.config.value = value;

            // update the labels with new values
            me.updateLabels();

            me.showIndicator();
        }
    },

    getValue: function() {
        return this.config.value;
    }
});
