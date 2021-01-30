/**
* @class Constants
* This file holds all the constant values to be used throughout the application.
* @singleton
*/
Ext.define('Goals.util.Constants', {
    singleton: true,
    alternateClassName: ['Constants'],
    
    //Write all the constant values here.
    PAGESIZE: 25,
    ViewportHeight: 644,
    ViewportWidth: 1366,
    DEFAULT_PROFILE_BG_URL: 'resources/images/user-bg/10-bg.png',
    BASE_FEED_IMAGE_PATH : 'resources/images/feeds/',
    SHOWMASK:false,
    SHOWTAB:0,

    //karmarule hardcoded store
    karmarulestore:['Range','Prorated'],

    //for ideate and social activity passing params
    instantApprovalCbpid: 1000868,

    karmaCategoryId: 1000000,

    IdeateKarmaId: 1000017,
    IdeateKarmaRatingId: 1000002,

    ShareKarmaId: 1000016,
    ShareKarmaRatingId: 1000002,

    points: 1,

    STATUS:{
        PRESALE: 'Presales',
        EXECUTION: 'Execution',
        COMPLETED: 'Completed'
    },
    ENVIORMENTHOSTNAMES:{
        LOCAL: 'localhost',
        STAGING: 'ddost.walkingtree.tech',
        PRODUCTION: 'ddo.walkingtree.tech',
        DEV: 'ddodev.walkingtree.tech'
    },
    LOCAL: {
        NODE: 'http://localhost:3300/',
        APPSCRIPT: 'https://testingnewnew.s3.ap-south-1.amazonaws.com/DDOComponentST.js',
        // KEYCLOAK: "KeycloakDev.js",
    },
    DEV: {
        NODE: 'http://ddonodedev.walkingtree.tech/',
        APPSCRIPT: 'https://testingnewnew.s3.ap-south-1.amazonaws.com/DDOComponentST.js',
       // KEYCLOAK: "KeycloakDev.js",
    },
    STAGING: {
        NODE: 'http://ddonodest.walkingtree.tech/',
        APPSCRIPT: 'https://testingnewnew.s3.ap-south-1.amazonaws.com/DDOComponentST.js',
        // KEYCLOAK: "KeycloakSt.js",
    },
    PRODUCTION:{
        NODE: 'http://node.ddo.walkingtree.tech/',
        APPSCRIPT: 'https://testingnewnew.s3.ap-south-1.amazonaws.com/walkingtree-apps.js',
        // KEYCLOAK: "KeycloakProd.js",
    }
});