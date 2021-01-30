Ext.define('DDO.view.loginlanding.login.LoginCarouselController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.logincarousel',

    onIconClick:function(button,e){
        var caroselView = this.getView(),
        id = button.getItemId(),
        arr = id.split(""),
        buttonId = arr[1],
        extension ='.png',
        source = '../resources/images/Assets for Slider/',
        imageEle = caroselView.down('image');
        imageEle.setSrc(source+buttonId+extension);
        var textPanel = caroselView.down('panel'),
        textNum = parseInt(buttonId);
        var text = LabelsTitles.CAROUSELTEXT[textNum-1];
        textPanel.setHtml(text);
    }
});
