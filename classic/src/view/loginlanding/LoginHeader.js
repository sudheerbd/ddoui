Ext.define('DDO.view.loginlanding.LoginHeader', {
    extend: 'Ext.container.Container',
    xtype: 'loginheader',
    width: '100%',
    margin: '21 0',
    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'
    },
    items: [{
        xtype: 'image',
        width: 120,
        height: 120,
        src: 'resources/images/loginheader/engageheader_logo.png',
        alt: 'WTC'
    }]
//     },
//     {
//         xtype: 'logingreeting',
//         plugins: 'responsive',
//         responsiveConfig: {
//             'width <= 810': {
//                 visible: false
//             },
//             'width > 810': {
//                 visible: true
//             }
//         }
//     }
// ]
});
