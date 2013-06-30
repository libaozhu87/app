/**
 * Created with JetBrains WebStorm.
 * User: jenny
 * Date: 13-6-30
 * Time: 下午3:25
 * To change this template use File | Settings | File Templates.
 */
Ext.define("GS.view.picShow.show",{
  extend:'Ext.Carousel',
    requires: [
        'Ext.carousel.Carousel',
        'Ext.Img'
    ],
  xtype:'picshow',
  direction: 'horizontal',
  item:null,
})