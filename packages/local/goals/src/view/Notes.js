/**
 * This view is responsible for notes tab in goals view.
 * @class 'Goals.view.Notes'
 * @extends 'Ext.form.Panel'
 * @alias 'widget.notes',
 * @ViewModel 'Goals.view.ExecutivePlanViewModel'
 * @Controller 'Goals.view.ExecutivePlanViewController'
 */
Ext.define('Goals.view.Notes', {
    extend: 'Ext.form.Panel',
    alias: 'widget.notes',
    
    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'grid',
        reference: 'notegrid',
        disabledCls: 'goal-gridcls',
        maxHeight: Constants.ViewportHeight * 0.62,
        height: Constants.ViewportHeight * 0.62,
        columnLines: true,
        viewConfig: {
            stripeRows: false
        },
        emptytext: LabelsTitles.GOALS.EXECUTIVEVIEW.NOTES.NOREC,

        cls: 'notesgrid-cls',
        bind: {
            store: '{goalNoteStore}'
        },
        columns: [
            {
                xtype: 'gridcolumn',
                text: LabelsTitles.GOALS.EXECUTIVEVIEW.NOTES.NOTETYPE,
                cls:'notetype-cls',
                dataIndex: 'notetype',
                flex: 0.5,
                renderer: function(data) {
                   if(data == "Standard"){
                       var image= "resources/images/goals/standard.png"
                       return  '<span><img width = "20px" height= "20px" src="' + image + '" /></span>'+' '+'<span>'+data+'</span>';
                   }else if(data == "Re-Open"){
                       var image= "resources/images/goals/undo.png"
                       return  '<span><img width = "20px" height= "20px" src="' + image + '" /></span>'+' '+'<span>'+data+'</span>';
                   }else if(data == "Cancel"){
                       var image= "resources/images/goals/close.png"
                       return  '<span><img width = "20px" height= "20px" src="' + image + '" /></span>'+' '+'<span>'+data+'</span>';
                   }else{
                       var image= "resources/images/goals/goalstats.png"
                       return  '<span><img width = "20px" height= "20px" src="' + image + '" /></span>'+' '+'<span>'+data+'</span>';
                   }
                }
            }, {
                xtype: 'gridcolumn',
                text: LabelsTitles.GOALS.EXECUTIVEVIEW.NOTES.COMMENT,
                emptyText: LabelsTitles.GOALS.EXECUTIVEVIEW.NOTES.COMMENT,
                value: LabelsTitles.GOALS.EXECUTIVEVIEW.NOTES.LIPSUM,
                dataIndex: 'details',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                text: LabelsTitles.GOALS.EXECUTIVEVIEW.NOTES.DATECREATED,
                dataIndex: 'targetdate',
                flex: 0.6,
                renderer: function(data) {
                    if (data) {
                        var value = Ext.Date.format(new Date(data), 'd-M-Y');
                        return value;
                    } else {
                        return "";
                    }
                }
            }
        ],
        width: Constants.ViewportWidth * 0.293
    }]
});