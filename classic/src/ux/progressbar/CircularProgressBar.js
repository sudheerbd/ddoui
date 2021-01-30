/**
 * @class DDO.ux.progressbar.CircularProgressBar
 * @extend Ext.Widget
 * @alias circularprogressbar
 *
 * A class to show circular progress bar
 *
 * Here is a circular progress bar in it's simplest form:
 *
 *     @example
 *     var progressBar = Ext.create('DDO.ux.progressbar.CircularProgressBar');
 *     Ext.Viewport.add(progressBar);
 * 
 *     @example using progress bar with other component
 *		Ext.create('Ext.Container', {
 *			fullscreen: true,
 *			items: [{
 *				xtype: 'label',
 *				html: 'Circular progressbar'
 *			}, {
 *				xtype: 'circularprogressbar',
 *				radius: 100,
 *				value: 95,
 *				spacing: 20,
 *				showAnimation: true,
 *				color: '#09F',
 *				borderWidth: 5,
 *				animationTime: 10,
 *				textColor: 'green',
 *				footer: 'Sample Progress bar footer text',
 *				pendingColor: 'white',
 *				showPercentText: true
 *
 *			}]
 *		});
 *
 */
Ext.define('DDO.ux.progressbar.CircularProgressBar', {
  extend: 'Ext.Widget',

  alias: 'widget.circularprogressbar',
  
  config: {
    /**
     * @cfg {Boolean} showAnimation
     * true to show drawing path animation.  
     * Defaults to true
     */
    showAnimation: true,
    /**
     * @cfg {int} radius
     * Optional   
     * Default radius is 100
     * It is also used to set height and width of canvas component
     * Radius of progress bar is calculated as (radius / 2 - spacing)
     */
    radius: 103,
    /**
     * @cfg {int} completed
     * Amount of % completed
     * 
     */
    value: 0,
    /**
     * @cfg {int} spacing
     * Provides spacing between top, right, bottom and left
     */
    spacing: 10,
    /**
     * @cfg {String} color
     * Highlight progress percentage color
     */
    color: '#46945A',
    /**
     * @cfg {String} pendingColor
     * Highlights pending percentage color
     */
    pendingColor: '#C00000',
    /**
     * @cfg {Float/int} start
     * start progress point
     * complete circle is of 2Pi
     */
    start: 300,
    /**
     * @cfg {int} borderWidth
     * Radius of circle
     */
    borderWidth: 10,
    /**
     * @cfg {int} animationTime
     * animation time
     */
    animationTime: 30,
    /**
     * @cfg {String} textColor
     * Center percentage color code
     */
    textColor: null,
    /**
     * @cfg {String} footer
     * Progress bar footer text
     */
    footer: null,
    /**
     * @cfg {Boolean} showPercentText
     * True to show percentage completed
     */
    showPercentText: true,
    total: 0,
    showTotal: true,
    profileImg: ''
  },

  cachedConfig: {
    percent: 100
  },

  element: {
    reference: 'element',
    tag: 'div',
    cls: 'wtc-progress-bar',
    children: [{
      tag: 'img',
      reference: 'canvasImg',
      src : '',
      cls: 'wtc-canvas-image',
      onerror:Utility.defaultUserImg
    }, {
      reference: 'canvasEl',
      tag: 'canvas',
      cls: 'wtc-canvas-el'
    }, {
      tag: 'div',
      reference: 'canvasFooter',
      cls: 'wtc-canvas-footer-text'
    }]
  },

  constructor: function(config) {
    this.callParent([config]);
    Ext.getBody().appendChild(this.element);
  },

  applyFooter: function(text) {
    var dimension = this.config.radius;
    this.containerEl.setWidth(dimension);
    this.canvasFooter.setWidth(dimension);
    return text;
  },

  updateFooter: function(text) {
    if (!Ext.isEmpty(text)) {
      this.canvasFooter.setText(text);
    }
  },

  updateProfileImg: function(profileImg) {
    var profileImage = Utility.imageCheck(profileImg);
    this.canvasImg.el.dom.setAttribute('src',profileImage)
   },

  /**
   * Update height and width of inner canvas component based on radius config
   * Default dimension is 100/100
   */
  updateRadius: function(radius) {
    this.canvasEl.dom.setAttribute('height', radius)
    this.canvasEl.dom.setAttribute('width', radius)
    this.showIndicator();
  },

  /**
   * Checks for animation
   * if true call animated draw
   * else draw progress with out any animation
   */
  showIndicator: function() {
    var showAnimation = this.config.showAnimation;
    if (showAnimation) {
      this.showAnimatedDraw();
    } else {
      this.showSimpleDraw();
    }
  },

  // Animated draw
  showAnimatedDraw: function() {
    var me = this;
    var ctx = this.canvasEl.dom.getContext('2d');
    var startAngle = 0;
    var start = this.config.start;
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    var diff;
    var dimension = this.config.radius;
    var completed = this.config.value;
    var centerCoordinateX = ctx.shadowOffsetX + (dimension / 2);
    var centerCoordinateY = ctx.shadowOffsetY + (dimension / 2);
    var radius = dimension / 2 - this.config.spacing;
    var color = this.config.color;
    var pendingColor = this.config.pendingColor;
    var borderWidth = this.config.borderWidth;
    var textColor = this.config.textColor ? this.config.textColor : color;
    var percent = this.config.percent;

    function progressBar() {
      diff = ((startAngle / percent) * Math.PI * 2 * 10).toFixed(2);
      ctx.clearRect(0, 0, cw, ch);
      ctx.lineWidth = borderWidth;
      //Updating center % text
      me.showPercent(ctx, textColor, startAngle, centerCoordinateX, centerCoordinateY, cw);
      // Drawing outer (pending arc)
      ctx.fillStyle = pendingColor;
      ctx.strokeStyle = pendingColor;
      ctx.beginPath();
      ctx.arc(centerCoordinateX, centerCoordinateY, radius, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.closePath();
      // Drawing progress bar indicator
      me.drawProgess(ctx, color, centerCoordinateX, centerCoordinateY, radius, start, diff, false)
      if (startAngle >= completed) {
        clearTimeout(interval);
      }
      startAngle++;
    }
    var interval = setInterval(progressBar, this.config.animationTime);
  },

  //Simple draw
  showSimpleDraw: function() {
    var ctx = this.canvasEl.dom.getContext('2d');
    var start = this.config.start;
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    var diff;
    var dimension = this.config.radius;
    var completed = this.config.value;
    var centerCoordinateX = ctx.shadowOffsetX + (dimension / 2);
    var centerCoordinateY = ctx.shadowOffsetY + (dimension / 2);
    var radius = dimension / 2 - this.config.spacing;
    var color = this.config.color;
    var textColor = this.config.textColor ? this.config.textColor : color;
    var percent = this.config.percent;
    diff = ((completed / percent) * Math.PI * 2 * 10).toFixed(2);
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = this.config.borderWidth;
    //Updating center % text
    this.showPercent(ctx, textColor, completed, centerCoordinateX, centerCoordinateY, cw);
    // Drawing outer (pending arc)
    this.drawPending(ctx, centerCoordinateX, centerCoordinateY, radius, 0, Math.PI * 2, true);
    //drawing progress arc
    this.drawProgess(ctx, color, centerCoordinateX, centerCoordinateY, radius, start, diff, false);
  },

  showPercent: function(ctx, textColor, completed, x, y, cw) {
    var showPercentText = this.getShowPercentText();
    if (showPercentText) {
      // ctx.fillStyle = textColor;
      // ctx.textAlign = 'center';
      // ctx.font = '16px FontAwesome';
      // ctx.fillText('\uF073', x, y - 10, cw / 2);
      // ctx.font = '12px FontAwesome';
      // if (this.config.showTotal)
      //   ctx.fillText(this.config.total + ' Leaves', x, y + 10, cw / 2);
      // else
      //   ctx.fillText(completed + '%', x, y + 10, cw / 2);
    }
  },

  drawPending: function(ctx, x, y, radius, startAngle, endAngle, counter) {
    ctx.fillStyle = this.config.pendingColor;
    ctx.strokeStyle = this.config.pendingColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, Math.PI * 2, counter);
    ctx.stroke();
    ctx.closePath();
  },

  drawProgess: function(ctx, color, x, y, radius, start, diff, counter) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineCap = "square";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(x, y, radius, start, diff / 10 + start, false);
    ctx.stroke();
    ctx.closePath();
  },

  updateValue: function(value) {
    if(value){
    this.config.value = value;
    this.setValue(value);
    this.showIndicator();
    }
  },

  updateTotal: function(newTotal) {
    this.config.total = newTotal;
    this.setTotal(newTotal);
    this.showIndicator();
  }
});