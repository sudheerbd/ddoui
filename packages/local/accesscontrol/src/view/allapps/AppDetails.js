Ext.define('ACCTRL.view.allapps.AppDetails', {
    extend: 'Ext.container.Container',

    alias: 'widget.appdetails',

    requires: [
        'ACCTRL.view.allapps.DetailViewController',
        'ACCTRL.store.allapps.DetailStore'
    ],
    scrollable: 'y',
    controller: 'accessappsdetailviewcontroller',
    cls: 'details-dashboard-view-cls',
    items: [{
        xtype: 'dataview',
        loadMask: false,
        emptyText: 'No Details available',
        store: {
            type: 'detailstore'
        },
        tpl: [
        '<tpl for=".">',
            '<div class="app-details-dashboard-cls">',
                '<table class="app-details-dash-table-cls">',
                    '<tr>',
                        '<td class="app-details-dash-td-cls">',
                            '<tpl if="this.imgExistance(values)">',
                                '<img src="{[this.appImageSet(values)]}" class="app-details-dash-img-cls" onerror='+Utility.defaultProjectImg+'>',
                                
                            '<tpl else>',
                                '<div style="background: {[this.nonImgColor(values)]};" class="app-details-dash-non-img-cls">',
                                '<span class="first-letter-cls">{[this.getNonImgFirstLetter(values)]}</span></div>',
                                
                            '</tpl>',
                            '<div class ="app-name-cls">{name}</div>',
                        '</td>',
                        '<td class="app-owner-details-td-cls">',
                            '<div class ="owner-name">{appOwner.empname}</div>',
                            '<br/>',
                            '<div class ="owner-details-cls">{appOwner.empmailid}</div>',
                            '<br/>',
                            '<div class="owner-details-cls" >{appOwner.phone}</div>' ,
                            '<div class="x-fa fa-key owner-label" > Owner </div>' ,
                        '</td>',
                        '<td class="usercount-td-cls">',
                            '<div class ="activeuser-count">{activeusercount} / {allowedusercount}</div>',
                            '<div class="x-fa fa-user activeuser-label" > Active Users </div>' ,
                        '</td>',
                        
                        '<td class="description-td-cls">',
                        '<img class = "edit-app-btn" src="resources/images/edit.png">',
                        '<div class="app-desc">{description}</div>',
                        '</td>',
                        '<td>',
                        '</td>',
                    '</tr>',                    
                '</table>',
            '</div>',
        '</tpl>',

       {
           imgExistance: function(values) {
                if(values && values.imageurl && values.imageurl != "null") {
                    return true;
                } else {
                    return false;
                }
            },
            appImageSet:function(values){
               return  Api.URL.imageUrl+values.imageurl;
             },
             nonImgColor: function(values) {
                if(values){
                    values.color = Utility.colorPicker[Math.floor(Math.random()*Utility.colorPicker.length)];
                    return values.color;
                }
            },

            getNonImgFirstLetter: function(values) {
                if(values)
                return values.name[0];
            }
        }],
        itemSelector: '.app-details-dashboard-cls',
        listeners: {
            itemclick: 'onEditBtnCLick'
        }
    },{
        xtype: 'dataview',
        margin: 5,
        name: 'userView',
        loadMask: false,
        selectedItemCls : 'selected-round-check',
        emptyText: '<div style="font-size:20px;text-align:center;vertical-align:middle;">No Active User For The App</div>',
        store: {
            type: 'activeuserstore'
        }, 
        multiSelect : true,
        selectionModel : {
            allowDeselect : true,
            mode: 'SIMPLE'
        },
        tpl: [
            '<tpl for=".">',
                '<div class="users-view-cls">',
                    //'<img class="detail-user-icon" src="{userimage}">',
                    '<tpl if="this.imgExistance(values)">',
                        '<img src="{appUser.profileimage}" class="detail-user-icon">',
                        
                    '<tpl else>',
                        '<div style="background: {[this.nonImgColor(values)]};" class="app-user-details-dash-non-img-cls">',
                        '<span class="user-name-first-letter-cls">{[this.getNonImgFirstLetter(values)]}</span></div>',
                        
                    '</tpl>',
                    '<div class="user-details">',
                         '<span class="user-name">{appUser.empname}</span>',
                         '<br/>',
                         '<span class="user-designation">{appUser.emp_designation}</span>',
                    '</div>',
                    '<div class="users-target-date-cls">',
                        '<span>Access Period</span>',
                        '<br/>',
                        '<span class="date-cls">{from:date("d-m-Y")}</span>',
                        '<br/>',
                        '<span>To</span>',
                        '<br/>',
                        '<span class="date-cls">{to:date("d-m-Y")}</span>',
                    '</div>',
                    '<div class="round-check"></div>',
                '</div>',
            '</tpl>',
            {
                imgExistance: function(values) {
                    if(values && values.appUser.profileimage && values.appUser.profileimage != "null") {
                        return true;
                    } else {
                        return false;
                    }
                },
                nonImgColor: function(values) {
                    if(values){
                        values.color = Utility.colorPicker[Math.floor(Math.random()*Utility.colorPicker.length)];
                        return values.color;
                    }
                },

                getNonImgFirstLetter: function(values) {
                    if(values && values.appUser.empname && values.appUser.empname != "null")
                        return values.appUser.empname[0];
                }
        }],
        itemSelector: '.users-view-cls',
        listeners: {
            selectionchange: 'onUserSelectionChange'
        }
    }]
});