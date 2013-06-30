/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-29
 * Time: 下午11:14
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.view.picShow.picContainer', {

    extend: 'Ext.DataView',
    xtype: 'picContainer',
    id:'myCon',
    config:{
        store: 'picStore',
        itemTpl:'<div style="width:100%;height:50%" float: left;"><img style="width:100%;height:100%" src="{url}"><p style="text-align:center;font-size: 1em;">{title}</p></div>',
        scrollable: {
            direction: 'vertical'
        }

/*        tpl:Ext.create('Ext.XTemplate','<div style="width:40%;height:40%" float: left;margin: 2%"><img style="width:100%;height:100%" src="{url}"><p style="text-align:center;font-size: 1em;">{title}</p></div>'),*/


    },
    //variableHeights: true,
    scrollable: {
        direction: 'vertical',
    }
/*    initialize:function(){
       this.callParent();
       var getWeatherTemplate =  function(){
            return new Ext.XTemplate([
                '<tpl for=".">',
                '<div><img src="{url}" /></div>',
                '</tpl>'
            ].join(''));
        }

        var data =   [
            {
                "url": "resources/images/yM.jpg",
                "title": "游戏",
            },
            {
                "url": "resources/images/dM.jpg",
                "title": "动漫",
            }
        ];
        Ext.Ajax.request({
            url: 'data/pic.json',
            success: function(response) {

                var tpl =  getWeatherTemplate();
                var con = Ext.getCmp('myCon');
                var data = Ext.decode( response.responseText)
                con.setHtml(tpl. apply(data.pics));

            },
            failure: function() {
                contentView.unmask();
            }
        });
    }*/



    //,

});
/*
Ext.create('Ext.DataView', {
    fullscreen: true,
    cls: 'twitterView',
    store: {
        autoLoad: true,
        fields: ['from_user', 'text', 'profile_image_url'],

        proxy: {
            type: 'jsonp',
            url: 'http://search.twitter.com/search.json?q=Sencha Touch',

            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    },

    itemTpl: '<img src="{profile_image_url}" /><h2>{from_user}</h2><p>{text}</p><div style="clear: both"></div>'
});*/
