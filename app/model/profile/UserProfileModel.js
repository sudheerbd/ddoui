Ext.define('DDO.model.profile.UserProfileModel',{
	extend:'Ext.data.Model',

	fields:[{ 
        name: 'profilePic'
    },{ 
        name: 'profileBgUrl'
    },{ 
        name: 'displayName'
    },{ 
        name: 'designation' 
    },{ 
        name: 'walletAmt' 
    },{ 
        name: 'projectCount' 
    },{ 
        name: 'rewardAmt' 
    },{ 
        name: 'rating'
    }],
    proxy: {
        type: 'ajax',
        url: 'resources/data/usershareditems.json',
        reader: {
            type: 'json',
            rootProperty: 'userData'
        }
    }  
});