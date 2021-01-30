/**
 * The file UserTimelineController is the view controller for 'DDO.view.profile.timeline.UserTimeline'.
 * @extends {Ext.app.ViewController} 
 * @alias 'controller.usertimelinecontroller'.
 */
Ext.define('DDO.view.profile.timeline.UserTimelineController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.usertimelinecontroller',

	timelineRenderer: function(value, metaData, record, rowIndex) {
		var page = "<table><tr><td rowspan='3'><img src='resources/images/user-profile/5.png' alt='Smiley face' height='50' width='50'></td><td><h4>" + record.data.name + "</h4></td></tr><tr><td><div width='200px'>" + record.data.content + "</div></td></tr></table>";
		switch (rowIndex) {
			case 0:
				page = '<div class="timeline-item">' +
					"<div class='timeline-day'>" + record.data.date + "</div>" +
					"<div class='timeline-outer'><div class='timeline-inner' ></div></div>" +
					"<div class='timeline-box'><div class='timeline-title'>" + record.data.title + "</div>" +
					"<div class='timeline-content'>" + record.data.content + "</div>" +
					"<div class='timeline-image'>" +
					"<img src='resources/images/user-profile/6.png' alt='Smiley face'>" +
					"<img src='resources/images/user-profile/6.png' alt='Smiley face'>" +
					"<img src='resources/images/user-profile/6.png' alt='Smiley face'>" +
					"</div>" +
					"</div></div>";
				break;

			case 1:
				page = '<div class="timeline-item">' +
					"<div class='timeline-day'>" + record.data.date + "</div>" +
					"<div class='timeline-outer'><div class='timeline-inner' ></div></div>" +
					"<div class='timeline-box'><div class='timeline-title'>" + record.data.title + "</div>" +
					"<div class='timeline-content'>" + record.data.content + "</div>" +
					"<div class='timeline-attach'>" +
					"<img src='resources/attach.png' width='18' height='18' alt='Smiley face'/>" +
					"<div class='timeline-attachedData'>" + record.data.attachedData + "</div>" +
					"</div>" +
					"</div></div>";
				break;
			case 2:
				page = '<div class="timeline-item">' +
					"<div class='timeline-day'>" + record.data.date + "</div>" +
					"<div class='timeline-outer'><div class='timeline-inner' ></div></div>" +
					"<div class='timeline-box'><div class='timeline-title'>" + record.data.title + "</div>" +
					"<div class='timeline-content'>" + record.data.content + "</div>" +
					"<div class='timeline-image'>" +
					"<img src='resources/images/user-profile/6.png' alt='Smiley face'>" +
					"</div>" +
					"</div></div>";
				break;

		}
		return page;
	}
});