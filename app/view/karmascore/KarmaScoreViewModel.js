/**
 * The file KarmaScoreViewModel is the viewmodel for the 'DDO.view.karmascore.KarmaScoreView'.
 * @extends {Ext.app.ViewModel}
 * @alias 'viewmodel.karmascoreview'.
 */
Ext.define('DDO.view.karmascore.KarmaScoreViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.karmascoreview',
    requires: [
        'DDO.model.widget.karmascore.KarmaScore'
    ],
    data: {
        'searchByNameText': 'Search By Employee Name',
        'empDesignName': null,
        'karmaScorePercentage': '',
        'selecDesignId': null,
        'empSuperVisorName': null,
        'selecSuperVisorId': null,
        'count': 0,
        'supervisorCount': 0
    },
    stores: {
        allkarmascores: {
            type: 'scoredetails',
            proxy: {
                extraParams: {
                    // loading all the records
                    all: true
                }
            },
            // pageSize: 50,
            autoLoad: true,
            scope: this,
            listeners: {
                load: 'onKarmaScoreLoad'
            }
        },
        karmaReportStore: {
            fields:['actual_karma','designations',{name:"employeeid",type:"int"},'employeename','karma_type'],
            proxy: {
                type: 'ajax',
                url: Api.URL.karmareport.READ,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                }
            },
            autoLoad :true
        }
    },
    formulas:{
        downloadBtn:function(get){
            if(Utility.isAdmin()){
                return false;
            }else{
                return true;
            }
        }
    }
});