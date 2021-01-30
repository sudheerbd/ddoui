Ext.define('TalentAcquisition.ux.container.CollapsibleContainer', {
    alias: 'widget.collapsiblecontainer',
    extend: 'Ext.container.Container',
    cls: 'ta-collapsible-cont',
    //cls:'collapsible-container',
    requires:[
        //'TalentAcquisition.ux.form.SearchField',
        'TalentAcquisition.ux.container.CollapsibleContainerViewModel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.layout.container.Border'
    ],
    cls: 'ta-header',
    config: {
        hideFilter: true,
        fbButtonHide: false,
        mainContainerTitle: 'Main Container',
        eastContainerTitle: 'East Container',
        addBtnText: 'Add New',
        grid: '',
        form: '',
        gridStore: '',
        bigForm: false
    },
    reference: 'collapsiblecontainer',
    defaults: {
        collapsible: true,
        split: false
    },
    layout: 'border',
    height: 600,
    requires: [
    ],
    initComponent: function() {
        var me = this,
            addButtonText = me.getAddBtnText(),
            mainContainerTitle = me.getMainContainerTitle(),
            eastContainerTitle = me.getEastContainerTitle(),
            centerGrid = me.getGrid(),
            eastForm = me.getForm(),
            bigForm = me.getBigForm(),
            gridStore = me.getGridStore();
        (me.filterData) ? me.setHideFilter(false) : me.setHideFilter(true);
        (me.fbButtonRequired) ? me.setFbButtonHide(false) : me.setFbButtonHide(true);
        me.viewModel = Ext.create('TalentAcquisition.ux.container.CollapsibleContainerViewModel');
        Ext.apply(me, {
            items: [{
                    title: mainContainerTitle,
                    region: 'north',
                    height: 55,
                    bind:{
                        hidden:'{northRegion}',
                    },
                    collapsible: false,
                    split: false,
                    tools: [{
                        hidden: me.hideFilter,
                        xtype:'combo',
                        cls: 'ta-search-field',
                        fieldLabel: 'Choose column',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : me.filterData
                        }),
                        name:'filterColumn',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value'
                    },{
                        xtype:"tbspacer",
                        width:30,
                        hidden: me.hideFilter
                    },{
                        xtype: 'searchfield',
                        store: gridStore,
                        name:'filterField',
                        cls: 'ta-search-field',
                        hidden: me.hideFilter,
                        hasSearch : false,
                        // paramName : 'query',
                        enableKeyEvents: true,
                        onSearchClick : function(field){
                            
                            var me = (field) ? field : this ;
                            var value = (me) ? me.getValue() : '';
                            var property = (me) ? me.up().down('combo').getValue() : '';

                            if (value.length > 0 && property.length > 0) {
                                // Param name is ignored here since we use custom encoding in the proxy. 
                                // id is used by the Store to replace any previous filter 
                                me.activeFilter = new Ext.util.Filter({
                                    property: property,
                                    value: value
                                });
                                me.store.setRemoteFilter(false);
                                me.store.getFilters().add(me.activeFilter);
                                me.getTrigger('clear').show();
                                me.updateLayout();
                            }else{
                                me.onClearClick();
                            }
                        }
                    },{
                        xtype: 'button',
                        scale: 'medium',
                        name:'mainBackBtn',
                        margin: '0 0 0 10',
                        style:{
                            border: 0
                        },
                        bind: {
                            hidden:'{hideBtn}'
                        },
                        iconCls: 'goalsbackbtn-cls',
                        cls: 'back-btn-cls',
                        handler: function(){
                            var collapsecont =  this.up('[name=applicationdetailsviewcolps]'),
                                collapsecontRefEmp = this.up('[name=referredEmployeeCollCon]');

                            var jobopenmain ,
                                referredEmployees;
                            if(!Ext.isEmpty(collapsecont)){
                                jobopenmain = collapsecont.up('jobopenings-card');
                                if(!Ext.isEmpty(jobopenmain)){
                                    collapsecont.getViewModel().set('hideBtn',true);
                                    jobopenmain.setActiveItem(0);
                                }
                            }  
                            if(!Ext.isEmpty(collapsecontRefEmp)){
                                referredEmployees = this.up('referredemployeeview');
                                if(!Ext.isEmpty(referredEmployees)){
                                    collapsecontRefEmp.getViewModel().set('hideBtn',true);
                                    collapsecontRefEmp.down('[name=eastpanel]').collapse();
                                }
                            }
                        }
                    }, {
                        xtype: 'button',
                        hidden: (me.fbButtonRequired) ? false : true,
                        reference: 'fbButton',
                        name: (me.scheduleFbButton) ? 'scheduleFbButton' :'fbButton',
                        iconCls: 'rule-plus',
                        focusable:false,
                        floating: true,
                        shadow: false,
                        autoShow: true,
                        tooltip: addButtonText,
                        cls: 'ta-float-btn x-floating',                        
                        handler: function() {
                            var eastPanel = this.up('collapsiblecontainer').down('[name=eastpanel]');
                            if(!Ext.isEmpty(eastPanel)) {
                               this.up('collapsiblecontainer').down('form').reset();
                               eastPanel.toggleCollapse();
                               eastPanel.down('textfield').focus();
                            }
                        }
                    }]
                },
                {
                    title: eastContainerTitle,
                    xtype:'panel',
                    scrollable: true,
                    itemId: 'eastcontainer',
                    region: 'east',
                    name:'eastpanel',
                    preventHeader: true,
                    hideCollapseTool: true,
                    collapseMode: 'mini',
                    split: false,
                    collapsed: true,
                    margin: '5 0 0 0',
                    width: bigForm ? '100%':'50%',
                    items: [{
                        xtype: eastForm
                    }],
                    listeners: {
                        expand: function(){
               
                            var eastPanel = this.up('collapsiblecontainer').down('[name=eastpanel]'),
                                collapsiblecontainer = this.up("collapsiblecontainer"),
                                me = this;
                            console.log("Main Container going to be expand and Fab setHidden :", !collapsiblecontainer.getFbButtonHide())
                            collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(!collapsiblecontainer.getFbButtonHide());
                            //To hide serch fields
                             if(!collapsiblecontainer.getHideFilter()){
                                collapsiblecontainer.down('combo[name=filterColumn]').setHidden(true);
                                collapsiblecontainer.down('searchfield[name=filterField]').setHidden(true);
                            }
                        },
                        collapse: function(){

                            var eastPanel = this.up('collapsiblecontainer').down('[name=eastpanel]'),
                                collapsiblecontainer = this.up("collapsiblecontainer");
                                console.log("Main Container going to be collapse and Fab setHidden :", collapsiblecontainer.getFbButtonHide())
                            collapsiblecontainer.down('button[iconCls=rule-plus]').setHidden(collapsiblecontainer.getFbButtonHide());
                            //To show search fields
                            if(!collapsiblecontainer.getHideFilter()){                                
                                collapsiblecontainer.down('combo[name=filterColumn]').setHidden(false);
                                collapsiblecontainer.down('searchfield[name=filterField]').setHidden(false);
                            }
                            
                        },

                    }
                }, {
                    hideHeaders: true,
                    collapsible: false,
                    region: 'center',
                    items: [{
                        xtype: centerGrid,
                        store: gridStore
                    }]
                }
            ]
        });
        this.callParent(arguments);
    },
    listeners:{
        boxready:function(cmp, width, height, eOpts){
            cmp.down('[reference=fbButton]').setHidden(cmp.getFbButtonHide());
        }
    }
});