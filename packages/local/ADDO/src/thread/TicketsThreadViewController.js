Ext.define('ADDO.thread.TicketsThreadViewController',{
    extend : 'Ext.app.ViewController',
    alias : 'controller.ticketsthread',
    control : {
        'ticketsthreadview' : {
            cleardirty : 'removeTicketDetailsFormDirty'
        }
    },
    removeTicketDetailsFormDirty : function(){
        var refs   = this.getReferences(),
            ticketDetails = refs.ticketdetails;

        /*ticketDetails.items.each(function(item){
            item.originalValue = item.getValue();
        })*/
    },
    onReplyCmpRender : function(cmp, eOpts){
         var me     = this;
            bodyEl  = cmp.getEl();
            bodyEl.on('click', me.onReplyCmpClick, me );
    },
    renderThreadDescription : function (value, metaData, record) {
        var view   = this.getView(),
            refs   = view.getReferences(),
            grid   = refs.threadpanel,
            plugin = grid.getPlugin('rowexpander'),
            tpl    = grid.titleTpl;

        if (!tpl.isTemplate) {
            grid.titleTpl = tpl = new Ext.XTemplate(tpl);
        }

        var data = Ext.Object.chain(record.data);

            data.expanded = plugin.recordsExpanded[record.internalId] ? ' style="display: none"' : '';

        return tpl.apply(data);
    },
    onThreadClick: function(dv, record, item, index, e) {
        if (e.getTarget('.thread-toggle')) {
            var view   = this.getView(),
                refs   = view.getReferences(),
                grid   = refs.threadpanel,
                plugin = grid.getPlugin('rowexpander');

            plugin.toggleRow(index, record);
        }
    },

    onExpandBody: function (rowNode) {   // , record, expandRow, eOpts
        Ext.fly(rowNode).addCls('x-grid-row-expanded');
        Ext.fly(rowNode).down('.thread-paragraph-simple').enableDisplayMode().hide();
        Ext.fly(rowNode).down('.expand').enableDisplayMode().hide();
    },

    onCollapseBody: function (rowNode) {  //, record, expandRow, eOpts
        Ext.fly(rowNode).removeCls('x-grid-row-expanded');
        Ext.fly(rowNode).down('.thread-paragraph-simple').enableDisplayMode().show();
        Ext.fly(rowNode).down('.expand').enableDisplayMode().show();
    },
    renderTitleColumn: function (value, metaData, record) {
        var view = this.getView(),
            refs = view.getReferences(),
            grid = refs.commentsgrid,
            //plugin = view.getPlugin('rowexpander'),
            tpl = grid.titleTpl;

        if (!tpl.isTemplate) {
            grid.titleTpl = tpl = new Ext.XTemplate(tpl);
        }

        var data = Ext.Object.chain(record.data);

        //data.expanded = plugin.recordsExpanded[record.internalId] ? ' style="display: none"' : '';

        return tpl.apply(data);
    },
    onReplyCmpClick : function(ev){
       var view = this.getView(),
                refs = view.getReferences();

                refs.editorpanel.setHidden(false);
                refs.reply.setHidden(true);
    },
    onClickReply : function(btn){
        var me = this;

        var view        = this.getView(),
            refs        = view.getReferences(),
            htmleditor  = refs.editorpanel.items.items[0],
            viewModel   = this.getViewModel(),
            threadStore = viewModel.get('threadstore'), 
            data="", date="", myDate="";

            myDate = new Date();
            date   = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();

            data = {
                "id"          : threadStore.getCount()+1,
                "createdby"   : "Test User",
                "image"       : "photo-1.png",
                "comment"     : htmleditor.value,
                "date"        : date.toString()
            };
            var comment = htmleditor.value;
            if (htmleditor.value != "") {
                //threadStore.add(data); 
                htmleditor.setValue("");
                refs.editorpanel.setHidden(true);
                refs.reply.setHidden(false);
            }
            var params ={
                   addo_tickets_id:viewModel.getData().addo_tickets_id,
                   details:comment,
                   attachments:"",
                   addo_supportusers_id:viewModel.getData().addo_supportusers_id
            },
            paramsData ={
                addo_tickets_id:viewModel.getData().addo_tickets_id
            };
        Ext.Ajax.request({
            url: '/tickethistory',
            method: 'post',
            params: params,
            scope: me,
            success: function(response) {
           Ext.apply(threadStore.getProxy().extraParams, paramsData);
           threadStore.load();
              
            },
            failure: function() {
               
            }
        });


    },
    onClickCancel : function(btn){
        var view = this.getView(),
            refs = view.getReferences();
            
            refs.editorpanel.setHidden(true);
            refs.reply.setHidden(false);
    },
    onSubmitClick : function(){
        var refs   = this.getReferences(),
            ticketDetails = refs.ticketdetails,
            threadview = ticketDetails.up('ticketsthreadview'),
            threadviewModel = threadview.getViewModel(),
            ticketDetailsForm = ticketDetails.getForm(),
            changedValueObject = ticketDetailsForm.getValues(false,true);

        if(ticketDetails.isDirty()){
            Ext.Ajax.request({
                url : '/ticket',
                method : 'PUT',
                jsonData : {
                    addo_tickets_id : threadviewModel.get('addo_tickets_id')
                },
                params : changedValueObject,
                success : function(){
                    ticketDetails.up('ticketsthreadview').fireEvent('cleardirty');
                },
                failure : function(){

                }
            });
        }
    },
    onTakeOverClick : function(){
        var refs   = this.getReferences(),
            ticketDetails = refs.ticketdetails,
            threadview = ticketDetails.up('ticketsthreadview'),
            threadviewModel = threadview.getViewModel(),
            assignTo = ticketDetails.down('combo[name=addo_supportusers_id]').getValue(),
            loginStore = Ext.getStore('loginstore'),
            loginUsersupportId = loginStore.data.items[0].data.supportuserid;

        if(assignTo != loginUsersupportId){
            Ext.Ajax.request({
                url : '/ticket',
                method : 'PUT',
                jsonData : {
                    addo_tickets_id : threadviewModel.get('addo_tickets_id')
                },
                params : {
                    addo_supportusers_id : loginUsersupportId
                },
                success : function(){
                    threadviewModel.set('addo_supportusers_id',loginUsersupportId);
                    threadviewModel.notify();
                    ticketDetails.up('ticketsthreadview').fireEvent('cleardirty');
                },
                failure : function(){

                }
            });
        }
    },
     onBackBttonClick:function(btn){
        btn.up('ticketadminpanel').setActiveItem(0);
    }
});