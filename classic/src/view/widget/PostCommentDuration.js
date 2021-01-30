  /**
 * This view is responsible for displaying post comment time details in feeds view.
 * @class 'DDO.view.widget.PostCommentDuration'
 * @extends 'Ext.Widget'
 * @alias 'postcommentduration'
 */
Ext.define('DDO.view.widget.PostCommentDuration', {
    extend: 'Ext.Widget',
    xtype: 'postcommentduration',
    config: {
        postDate: null
    },
    element: {
        cls: 'comment-time-cls',
        reference: 'element',

        children: [{
            reference: 'clockEl',
            tag: 'span'
        }, {
            reference: 'timeEl',
            cls: 'header-from-now',
            tag: 'span'
        }]
    },
    updatePostDate: function(postdate, e) {
        var clockIconCls = this.getClockIcon(postdate);
        if (clockIconCls) {
            this.clockEl.setCls(clockIconCls);
        }
        this.timeEl.setHtml(this.getPostDuration(postdate));
    },
    getPostDuration: function(postDate, e) {
        var one_day = 1000 * 60 * 60 * 24,
            postGmt = new Date(postDate),
            postTimeMiliseconds = postGmt.getTime(),
            //var postTime=postTimeMiliseconds-19800000;//+5:30 GMT
            currentDate = new Date(),
            currentTimeMiliseconds = currentDate.getTime(),
            difference_ms = currentTimeMiliseconds - postTimeMiliseconds,
            days = Math.round(difference_ms / one_day),
            minuteDifference, hoursDifference, minute, hours, days;
        if (difference_ms < 60000) {
            this.clockEl.removeCls('x-fa fa-clock-o subcomments-from-now');
            return '<span class="ddo-feeds-comment-time-justnow">Just now</span>';
        } else if (difference_ms < 3600000) {
            minuteDifference = (difference_ms / (60 * 1000));
            minute = Math.floor(minuteDifference);
            return minute + 'm';
        } else if (difference_ms < 86400000 && difference_ms > 3600000 && days < 1) {
            hoursDifference = (difference_ms / (60 * 60 * 1000));
            hours = Math.floor(hoursDifference);
            return hours + 'h';
        } else {
            return days + 'd';
        }
    },
    getClockIcon: function(values) {
        var one_day = 1000 * 60 * 60 * 24,
            postGmt = new Date(values),
            postTimeMiliseconds = postGmt.getTime(),
            //var postTime=postTimeMiliseconds-19800000;//+5:30 GMT
            currentDate = new Date(),
            currentTimeMiliseconds = currentDate.getTime(),
            difference_ms = currentTimeMiliseconds - postTimeMiliseconds;
        days = Math.round(difference_ms / one_day);

        if (difference_ms < 60000) {
            return '';
        } else {
            return 'x-fa fa-clock-o subcomments-from-now';
        }
    }
});
