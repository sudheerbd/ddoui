Ext.define('DDO.view.home.Map', {

    extend: 'Ext.ux.GMapPanel',
    requires: ['DDO.view.main.ViewportModel'],
    xtype: 'ddomap',
    width: 500,
    height:500,
    gmapType: 'map',
    viewModel: {
        type: 'mainviewport'
    },
    bind: {
        data: '{mapData}'
    },
    mapOptions: {
        center: {
            geoCodeAddr: "walkingtree technologies manjeera trinity corporate",
            marker: {
                title: 'Holmes Home'
            }

        },
        zoom: 16,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    listeners: {
        afterrender: function (a, b) {
            var me = this;
            var markers = this.markers;
            var ps = [], m = [];
            var lat_lng = [];
            var mpvm = Ext.ComponentQuery.query('gmappanel')[0].viewModel
            var mp = mpvm.get('mapData');
            var record = Ext.getStore('login').getRange()[0].getData();

            Ext.Ajax.request({
                scope: this,
                url: '/employeeaddress',
                method: 'GET',
                params: record,
                success: function (res, data) {
                    var data = Ext.decode(res.responseText).data;
                    var mpvm = Ext.ComponentQuery.query('gmappanel')[0].viewModel
                    var mp = mpvm.get('mapData');
                    var x = data.filter(function (rec) {
                        if (rec.ddo_employee_id == this) {
                            return rec.details;
                        }

                    }, record.ddo_employee_id);
                        mp.push(x[0]);
                        this.mapFunc(mp);
                    
                },
                failure: function(err,res) {
                }
            });
            
           

        }
    },
    mapFunc:function(mp) {
        var me = this;
        var markers = this.markers;
        var ps = [], m = [];
        var lat_lng = [];
        var mpvm = Ext.ComponentQuery.query('gmappanel')[0].viewModel
            Ext.Promise.all(allPromisesData()).then(function (data) {
                var mapPanel = Ext.ComponentQuery.query('gmappanel')[0];
                if (mapPanel) {
                    
                    var MapDom = mapPanel.el.dom;
                    var map = new google.maps.Map(MapDom, mapPanel.mapOptions);
                    var infoWindow = new google.maps.InfoWindow();
                    var latlngbounds = new google.maps.LatLngBounds();

                    for (i = 0; i < data.length; i++) {
                        var datal = data[i]
                        var myLatlng = new google.maps.LatLng(datal.latitude, datal.longitude);
                        lat_lng.push(myLatlng);
                        console.log(lat_lng);
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: datal.title
                        });
                        latlngbounds.extend(marker.position);
                        (function (marker, data) {
                            google.maps.event.addListener(marker, "click", function (e) {
                                infoWindow.setContent(data.description);
                                infoWindow.open(map, marker);
                            });
                        })(marker, data);
                    }

                    map.setCenter(latlngbounds.getCenter());
                    map.fitBounds(latlngbounds);
                    var path = new google.maps.MVCArray();

                    var service = new google.maps.DirectionsService();
                    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
                    for (let j = 0; j < lat_lng.length; j++) {
                        if ((j + 1) < lat_lng.length) {
                            var src = lat_lng[j];
                            var des = lat_lng[j + 1];
                            path.push(src);
                            poly.setPath(path);
                            service.route({
                                origin: src,
                                destination: des,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            }, function (result, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    for (var k = 0, len = result.routes[0].overview_path.length; k < len; k++) {
                                        path.push(result.routes[0].overview_path[k]);
                                    }
                                }
                            });
                        }
                    }

                }


            });
            function allPromisesData() {
                var ps = [];
                for (let i = 0; i < mp.length;i++) {
                    var data = mp[i];
                    if(data){
                        var dd = data.details;
                        var v = promiseAddress(dd);
                        ps[i] = v;
                    }
                }
                return ps;
            }
            function promiseAddress(dt) {
                return new Ext.Promise(function (resolve, reject) {
                    Utility.geocodeAddres(dt, function (coordinates) {
                                if (coordinates) {
                                    console.log(coordinates);
                                    resolve(coordinates);
                                }
                            });
                });
            }
        
    }

});