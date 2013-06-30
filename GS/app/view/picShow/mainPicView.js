/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-29
 * Time: 下午9:08
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GS.view.picShow.mainPicView', {
    extend: 'Ext.NavigationView',
    xtype: 'mainPicView',
    id:'mainPicView',
    config: {
        autoDestroy: false,
        items: [
            {    title: '图片展示',
                 xtype: 'picContainer',
            }
        ]
    }







    })