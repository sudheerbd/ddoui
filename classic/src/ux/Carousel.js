Ext.define('DDO.ux.Carousel', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.Img',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel'
    ],

    alias: 'widget.carousel',

    viewModel: {
        data: {
            currentImageNo: null,
            imageCount: null
        }
    },

    layout: {
        type: 'column',
        align: 'center',
        pack: 'center'
    },
    width: '100%',
    /**
     * @event handleBottomImages
     * Fires whenever carousel item being initiated.
     * @param {Ext.container.Container} carousel container.     
     */

    /**
     * @event onPrev
     * Fires whenever previous button clicked.
     * Handling images and thumbnail view.     
     */

    /**
     * @event onNext
     * Fires whenever next button clicked.
     * Handling images and thumbnail view.     
     */
    config: {
        /**
         * @cfg {String} thumbnailSize  default thumbnail size
         * @accessor
         */
        thumbnailSize: 10,
        /**
         * @cfg {String} showCountField whether to display count field or not
         * @accessor
         */
        showCountField: false
    },

    items: [{
        xtype: 'button',
        columnWidth: 0.15,
        hidden: false,
        //region: 'west',
        // height:30,
        // maxWidth:30,
        // maxHeight:30,
        cls: 'carousel-preBtn',
        // iconCls: 'fa fa-arrow-circle-left',
        reference: 'preBtn',
        name: 'carousel-preBtn',
        disabled: true,
        listeners: {
            click: function() {
                this.up('carousel').onPrev();
            }
        }
    }, {
        xtype: 'panel',
        name: 'carouselPanel',
        region: 'center',
        reference: 'carousel',
        columnWidth: 0.6,
        maxWidth: 560,
        maxHeight: 650,
        cls: 'carousel-panel'
    }, {
        xtype: 'button',
        columnWidth: 0.15,
        reference: 'nextBtn',
        hidden: false,
        // height:30,
        // maxWidth:30,
        // maxHeight:30,
        cls: 'carousel-nextBtn',
        name: 'carousel-nextBtn',
        // iconCls: 'fa fa-arrow-circle-right',
        listeners: {
            click: function() {
                this.up('carousel').onNext();
            }
        }
    }, {
        xtype: 'displayfield',
        cls: 'carousel-displayFld',
        columnWidth: 1,
        //region:"north",
        hidden: false,
        height: 50,
        maxWidth: 100,
        maxHeight: 50,
        name: 'carouselCountFld',
        bind: {
            value: '{currentImageNo} of {imageCount}'
        }
    }, {
        xtype: 'panel',
        name: 'bottmCarouselPanel',
        hidden: true,
        //region:"south",
        reference: 'bottomarousel',
        columnWidth: 1
    }],

    initComponent: function() {
        this.callParent();
        var me = this;
        var carouselPanel = this.down('panel[name=carouselPanel]');
        var imgCount = 0;

        if (!Ext.isEmpty(this.store)) {
            var store = Ext.getStore('Carousel');
            // imgCount = store.totalCount;
            imgCount = store.getCount();
        }
        /*else {
                   var carouselData = this.carouselData;
                   imgCount = carouselData.length;
               }*/

        for (var i = 0; i < imgCount; i++) {
            if (!Ext.isEmpty(this.store)) {
                var imgData = store.data.items[i].data;
            } else {
                var imgData = carouselData[i];
            }
            var imgField = {
                xtype: 'image',
                alt: 'Uploaded_Images',
                src: Api.URL.imageUrl+imgData.src,
                cls: ['carousel-img']
            };

            carouselPanel.add(imgField);
        }

        var bottomCarouselPanel = this.down('panel[name=bottmCarouselPanel]');
        var carouselData = this.carouselData;

        if (carouselData.length === 1) {
            this.down('button[name=carousel-nextBtn]').setDisabled(true);
        }

        for (var i = 0; i < carouselData.length; i++) {
            var imgData = carouselData[i];
            var imgField = {
                xtype: 'image',
                alt: 'Uploaded_Images',
                src: imgData.src,
                cls: ['carousel-bottom-img'],
                listeners: {
                    el: {
                        click: function(e, t, eOpts) {
                            var parentPanel = this.getParent();
                            var imgIndex = parentPanel.component.items.indexOf(this.component);
                            Ext.ComponentQuery.query('carousel')[0].itemClick(imgIndex);
                        }
                    }
                }
            };
            bottomCarouselPanel.add(imgField);
        }

        this.handleBottomImages();
    },

    /**
     * handleBottomImages function Handling bottom images count and displaying
     * 
     */
    handleBottomImages: function() {
        var bottomCarouselPanel = this.down('panel[name=bottmCarouselPanel]');
        var carouselPanel = this.down('panel[name=carouselPanel]');
        var carouselCountFld = this.down('displayfield[name=carouselCountFld]');

        carouselCountFld.setHidden(!this.getShowCountField());

        var images = bottomCarouselPanel.items.items;

        this.maxImagesCanDisplay = 9;

        for (i = 0; i < images.length; i++) {
            var imgCmp = bottomCarouselPanel.items.items[i];
            var topImgCmp = carouselPanel.items.items[i];

            if (i === 0) {
                imgCmp.addCls('carousel-bottom-img-selected');
            } else {
                topImgCmp.addCls('hide-item');
            }

            if (i >= this.maxImagesCanDisplay) {
                imgCmp.addCls('hide-bottom-img');
            }

            imgCmp.setStyle('width', this.getThumbnailSize() + "%");
        }

        this.currentActiveImgIndex = 0;
        this.getViewModel().set('imageCount', images.length);

        if (images.length !== 0) {
            this.getViewModel().set('currentImageNo', 1);
        } else {
            this.getViewModel().set('currentImageNo', 0);
        }
    },

    /**
     * itemClick event fires when click on thumbnail
     * 
     */
    itemClick: function(imgIndex) {
        var currentImgNo = this.getViewModel().get('currentImageNo');

        this.getViewModel().set('currentImageNo', imgIndex + 1);

        var previousSelectedImgIndex = this.currentActiveImgIndex;
        var bottomCarouselPanel = this.down('panel[name=bottmCarouselPanel]');
        var carouselPanel = this.down('panel[name=carouselPanel]');
        var imgCount = carouselPanel.items.getCount();

        if (imgIndex === 0) {
            this.down('button[name=carousel-preBtn]').setDisabled(true);
        } else {
            this.down('button[name=carousel-preBtn]').setDisabled(false);
        }

        if (imgIndex + 1 === imgCount) {
            this.down('button[name=carousel-nextBtn]').setDisabled(true);
        } else {
            this.down('button[name=carousel-nextBtn]').setDisabled(false);
        }

        if (imgIndex > previousSelectedImgIndex) {
            var imgField = carouselPanel.items.getAt(previousSelectedImgIndex);
            var btmImgFld = bottomCarouselPanel.items.getAt(previousSelectedImgIndex);

            imgField.addCls('hide-item');
            btmImgFld.removeCls('carousel-bottom-img-selected');

            var nxtImgField = carouselPanel.items.getAt(imgIndex);
            var nxtBtmImgFld = bottomCarouselPanel.items.getAt(imgIndex);

            nxtImgField.removeCls('hide-item');
            nxtBtmImgFld.addCls('carousel-bottom-img-selected');

            nxtImgField.el.slideIn('r', {
                easing: 'easeOut',
                duration: 500,
                remove: false,
                useDisplay: false
            });
        } else {
            var imgField = carouselPanel.items.getAt(previousSelectedImgIndex);
            var btmImgFld = bottomCarouselPanel.items.getAt(previousSelectedImgIndex);

            imgField.addCls('hide-item');
            btmImgFld.removeCls('carousel-bottom-img-selected');

            var preImgField = carouselPanel.items.getAt(imgIndex);
            var preBtmImgFld = bottomCarouselPanel.items.getAt(imgIndex);

            preBtmImgFld.addCls('carousel-bottom-img-selected');
            preImgField.removeCls('hide-item');

            preImgField.el.slideIn('l', {
                easing: 'easeOut',
                duration: 500,
                remove: false,
                useDisplay: false
            });
        }

        this.currentActiveImgIndex = imgIndex;
    },

    /**
     * onPrev handler to handler previous button functionality
     * 
     */
    onPrev: function() {
        var cmp = this.down('panel[name=carouselPanel]');
        var bottomCarouselPanel = this.down('panel[name=bottmCarouselPanel]');
        var currentImgNo = this.getViewModel().get('currentImageNo');

        this.getViewModel().set('currentImageNo', currentImgNo - 1);
        this.up('window').getViewModel().set('count', currentImgNo - 1);

        var imgIndex = this.currentActiveImgIndex;

        if ((currentImgNo - 1) === 1) {
            this.down('button[name=carousel-preBtn]').setDisabled(true);
            this.down('button[name=carousel-nextBtn]').setDisabled(false);
        } else {
            this.down('button[name=carousel-nextBtn]').setDisabled(false);
        }

        this.currentActiveImgIndex = this.currentActiveImgIndex - 1;

        var imgField = cmp.items.getAt(imgIndex);
        imgField.addCls('hide-item');

        var preImgField = cmp.items.getAt(imgIndex - 1);
        preImgField.removeCls('hide-item');
        
        Ext.create('Ext.fx.Anim', {
            target: preImgField,
            duration: 250,
            from: {
                left: -preImgField.getWidth() //starting width 400
            },
            to: {
                left: 0 //end width 300

            }
        });
        var btmSelectedImgFld = bottomCarouselPanel.items.getAt(imgIndex);
        btmSelectedImgFld.removeCls('carousel-bottom-img-selected');

        var preBtmImgFld = bottomCarouselPanel.items.getAt(imgIndex - 1);
        preBtmImgFld.addCls('carousel-bottom-img-selected');

        var maxImagesCount = this.maxImagesCanDisplay;

        var lastImgFldInRow = bottomCarouselPanel.items.getAt(this.currentActiveImgIndex + maxImagesCount);
        if (!Ext.isEmpty(lastImgFldInRow)) {
            lastImgFldInRow.addCls('hide-bottom-img');
        }
        var lastImginRow = bottomCarouselPanel.items.getAt(this.currentActiveImgIndex);
        if (!Ext.isEmpty(lastImginRow)) {
            lastImginRow.removeCls('hide-bottom-img');
        }
        //debugger;
        //this.up('window').center();
    },
    /**
     * onNext handler to handler Next button functionality
     * 
     */
    onNext: function() {
        var cmp = this.down('panel[name=carouselPanel]');
        var bottomCarouselPanel = this.down('panel[name=bottmCarouselPanel]');
        var imgCount = cmp.items.getCount();
        var imgIndex = this.currentActiveImgIndex;
        var currentImgNo = this.getViewModel().get('currentImageNo');

        this.getViewModel().set('currentImageNo', currentImgNo + 1);
        this.up('window').getViewModel().set('count', currentImgNo + 1);

        if ((currentImgNo + 1) === imgCount) {
            this.down('button[name=carousel-nextBtn]').setDisabled(true);
            this.down('button[name=carousel-preBtn]').setDisabled(false);
        } else {
            this.down('button[name=carousel-preBtn]').setDisabled(false);
        }

        this.currentActiveImgIndex = this.currentActiveImgIndex + 1;

        var imgField = cmp.items.getAt(imgIndex);
        imgField.addCls('hide-item');

        var nxtImgField = cmp.items.getAt(imgIndex + 1);
        nxtImgField.removeCls('hide-item');

        Ext.create('Ext.fx.Anim', {
            target: nxtImgField,
            duration: 250,
            from: {
                left: nxtImgField.getWidth() //starting width 400
            },
            to: {
                left: 0 //end width 300

            }
        })

        var btmSelectedImgFld = bottomCarouselPanel.items.getAt(imgIndex);
        btmSelectedImgFld.removeCls('carousel-bottom-img-selected');

        var nxtBtmImgFld = bottomCarouselPanel.items.getAt(imgIndex + 1);
        nxtBtmImgFld.addCls('carousel-bottom-img-selected');

        var maxImagesCount = this.maxImagesCanDisplay;

        if (this.currentActiveImgIndex >= maxImagesCount) {
            var firstImgFldInRow = bottomCarouselPanel.items.getAt(this.currentActiveImgIndex - maxImagesCount);
            firstImgFldInRow.addCls('hide-bottom-img');

            var lastImginRow = bottomCarouselPanel.items.getAt(this.currentActiveImgIndex);
            lastImginRow.removeCls('hide-bottom-img');
        }
    }
});