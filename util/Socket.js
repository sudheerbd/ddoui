

// Ext.define('DDO.util.Socket',{
//     extend : "Ext.util.Observable",
//     singleton: true,
//     alternateClassName: ['Socket'],
//     socket : null,

//     initialize : function(){
//         var me = this, 
//         url = Api.URL.hostUrl, 
//         socket;
//         socket = io.connect();
//         me.socket = socket;
//         me.initializeEvents();
//     },
//     close : function(){
//         var me = this, socket = me.socket;

//         if(socket){
//             socket.close();
//             me.socket = null;
//         }
//     },
//     initializeEvents : function(){
//         var me = this, socket = me.socket;
//         // if(socket){
//         //     socket.on("newfeed", function(data){
//         //         me.fireEvent("newfeed", data);
//         //     });
//         //     socket.on("newcomment", function(data){
//         //         me.fireEvent("newcomment", data);
//         //     });
//         //     socket.on("feedliked", function(data){
//         //         me.fireEvent("feedliked", data);
//         //     });
//         //     socket.on("feedunliked", function(data){
//         //         me.fireEvent("feedunliked", data);
//         //     });
//         //     socket.on("nominationcallback", function(data){
//         //         me.fireEvent("nominationcallback", data);
//         //     });
//         //     socket.on("orgChartUpdated", function(data){
//         //         me.fireEvent("orgChartUpdated", data);
//         //     });

//         // }
//     },
//     isActive : function(){
//         return this.socket ? true : false
//     }
// });
