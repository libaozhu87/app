/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-29
 * Time: 下午10:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.view.mapShow.mainMapView', {
    extend: 'Ext.Container',
    xtype: 'mainMapView',
    title: '地图',
    iconCls: 'locate',
    config: {
       items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '谷歌地图'
            },



       ]


    },


/*    initialize: function() {
        var position = new google.maps.LatLng(37.44885, -122.158592),
            infoWindow = new google.maps.InfoWindow({ content: 'Sencha HQ' }),
            map, marker;

        this.callParent();

        map = this.add({
            xtype: 'map',
            mapOptions: {
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        });

        marker = new google.maps.Marker({
            position: position,
            map: map.getMap(),
            visible: true
        });

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
        });

        setTimeout(function() {
            map.getMap().panTo(position);
        }, 1000);
    }*/
/*    initialize: function() {
        var position = new google.maps.LatLng(37.44885, -122.158592),
            map;
        this.callParent();
        var mapCallback = function(){
            map = map.getMap();
            var infobox = new google.maps.Infobox(position, {
                description: 'Sencha HQ', visible: true, offset: new google.maps.Point(0, 10), height: 100,width:180
            });
            map.entities.clear();
            var pushpin= new google.maps.Pushpin(map.getCenter(), null);
            pushpinClick= google.maps.Events.addHandler(pushpin, 'click', function() {
                map.entities.push(infobox);
                infobox.setOptions({visible:true});
            });
            map.entities.push(pushpin);
        }
        map = this.add({
            xtype: 'map',
            mapOptions: {
                center: position,
                mapTypeId:google.maps.MapTypeId.ROADMAP,
                callback: mapCallback
            }
        });
    }*/
  /*  initialize: function() {
        var position = new google.maps.LatLng(37.44885, -122.158592);

     this.add({
    xtype: 'map',
    mapOptions : {
        center : new google.maps.LatLng(37.381592, -122.135672),  //nearby San Fran
        zoom : 12,
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        navigationControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.DEFAULT
        }
    },
    listeners: {
        maprender: function(comp, map) {
            var marker = new google.maps.Marker({
                position: position,
                title : 'Sencha HQ',
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
            setTimeout(function() {
                map.getMap().panTo(position);
            }, 1000);
        }
    }

});
    }*/

})


