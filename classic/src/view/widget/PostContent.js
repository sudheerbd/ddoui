  /**
 * This view is responsible for displaying Post related in feeds view.
 * @class 'DDO.view.widget.PostContent'
 * @extends 'Ext.Widget'
 * @alias 'postcontent'
 */
Ext.define('DDO.view.widget.PostContent', {
    extend: 'Ext.Widget',

    xtype: 'postcontent',

    config: {
        postContent: null
    },

    element: {
        cls: 'comment',
        reference: 'element',

        children: [{
            reference: 'contentEl',
            tag: 'pre'
        },
        {
            reference: 'PostContentEl',
            tag: 'div',
            //tag         : 'li',
            cls: 'commentCommentCls',
            // delegate : 'morelink',
            listeners:{
                click:'moreLink'
            }
        }]
    },
 /**
     * updatePostContent function is method for custom config which defined above and calling it in the feedsDataItem.js.
     * @param {postContent} 'postcontent' is the parameter which will take the latest posted content.
     */
    updatePostContent: function(postContent, meta_url_data) {
        try{
            var len =600;
            var raw_value = new DOMParser().parseFromString(postContent, 'text/html');
           var new_value= raw_value.body.textContent || "";
            if(new_value.length > len){
                this.setPostContent(postContent);
                this.updatePostLength(postContent);
            }else{
                this.PostContentEl.setHtml(postContent);
            }
        }catch (err){
            Utility.showToast(Messages.FEEDSPOSTCONTENT.TOAST.POSTCONTENT, err);
        }  
     },

    decodedPostContent: function(content, meta_url_data) {
        var post_content = content;
        if (typeof(post_content) === "object") {
            post_content = post_content.post_content;
            var linkContent = post_content.split('undefined');
            if (linkContent.length === 2) {
                post_content = linkContent[0] + linkContent[1];
            } else {
                post_content = linkContent[0];
            }
        }

        post_content = post_content.replace(/(?:\r\n|\r|\n)/g, '<br />');
        var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
            urllink = post_content.match(urlRegex);
        if (urllink && meta_url_data) {
            if (urllink && (content.trim() == urllink[0])) {
                post_content = post_content.replace(urllink[0], "");
            } else if (urllink[0] == content.trim().substr(content.lastIndexOf(urllink[0]))) {
                post_content = post_content.replace(urllink[0], "");
            } else {
                post_content = post_content.replace(urllink[0], "");
            }
        }

        post_content = post_content.replace(urlRegex, function(url) {
            var refUrl;

            if (!url.match(/http/)) {
                refUrl = "http://" + url;
            } else {
                refUrl = url;
            }


            return '<a href="' + refUrl + '" target="_blank">' + url + '</a>';
        });

        return post_content;
    },
    moreLink: function (e) {
        var className = e.target.classList;
        if(!Ext.isEmpty(className)){
            if(className[0] == 'morelink'){
                var moreComp = this.el.dom.getElementsByClassName('morelink')[0],
                    text = moreComp.innerText;
                    var hg= this.PostContentEl.getHeight(),
                    compContHeight,compContc;
                    var comp = Ext.fly(this.PostContentEl.getId());
                    var compCont = comp.component.up().id;
                    compContc = Ext.getCmp(compCont);
                    compContHeight = compContc.getHeight();
                    if (text == 'Show more') {
                        
                        this.PostContentEl.setHtml(this.getPostContent() + '... <span class="morelink">Show less</span>');
                    } else {
                        if (this.getPostContent().length>600) {
                            this.updatePostLength(this.getPostContent());
                        }
                    }
                    this.up('feedsdataitem').updateLayout();
            }
        }
    },
     /**
    * The function updatePostLength is to take the specified caluculated length and add showmore , showless to the descripton.
    * @param {value} 'value' which is getting the raw value of latest posted content  
    */

    updatePostLength: function (value) {
        try{
            var len = 600;
            var raw_value = new DOMParser().parseFromString(value, 'text/html');
            var new_value= raw_value.body.textContent || "";
            var ellipsestext = "...";
            var moretext = "Show more";
           var limitedChar = new_value.substr(0, len);
            var restOfTheContent = new_value.substr(len - 1, new_value.length - len);
            var html = '<span>'+limitedChar + '<span >' + ellipsestext + '&nbsp;</span><span class="morecontent" ><span  class = "com-text">' + restOfTheContent + '</span></span><span id = "more" class="morelink">' + moretext + '</span></span>';
            this.PostContentEl.setHtml(html);
        }catch(err){
            Utility.showToast(Messages.FEEDSPOSTCONTENT.TOAST.UPDATEPOSTCONTENTLENGTH, err)
        } 
    }
});