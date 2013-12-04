/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 下午6:19
 * To change this template use File | Settings | File Templates.
 */
//Zepto(function($){
    $(document).ready(function(){
    deviceWidth =  getWindowWidth();
    deviceHeight = getWindowHeight();
    MyApp = new  viewPort();
    setFontSize();
    var alertEle = $('<div id="popupBox">\
                <h3></h3>\
                <p id="popupTxt"></p>\
                <div id="popupBtn">\
                    <input id="alert_sure" type="button" class="confirm" value="确定" />\
                </div>\
                </div>');
    var     confirm = $(	'<div id="popupBox">\
                <h3></h3>\
                <p id="popupTxt"></p>\
                <div id="popupBtn">\
                    <input id="confirm_sure"   type="button" class="confirm" value="确定" />\
                    <input id="confirm_cancle"  type="button" class="confirm" value="取消" />\
                </div>\
                </div>')

    var modeConfig = {"Pugin":{
        },
        "Dialogue":{
        },
        "InfoBox":{
            "alert":{
               "htmlEle":alertEle,
                "initData":function(ele){infoBox_alert.initData(ele)},
                "js": "js/infoBox/alert.js"
            },
            "confirm":{
                "htmlEle":confirm,
                "initData":function(ele){infoBox_confirm.initData(ele)},
                "js": "js/infoBox/confirm.js"
            }
        }
    }


    $.MODE.initConfig(modeConfig);
    $.MODE.setStyle(setMoveStyleConfig());
    Pugin = $.MODE.createMode("Pugin","slide_left");

   //,"silde_cover" slide_left
   // shadeLayerWarp = $(".puginWarp");
        shadeLayer = $("#shadeLayer");
        shadeLayer.css({width:deviceWidth,height:deviceHeight})
        DialogueLayer =  $("#dialogueLayer");
        Dialogue = $.MODE.createMode("Dialogue","dialog_sild");
        InfoBoxLayer = $("#infoLayer");
        InfoBox = $.MODE.createMode("InfoBox","dialog_sild");
        setTimeout(function(){
            InfoBox.load("alert");
            InfoBox.load("confirm");
        },2000)
        var configUrl = getInfoUrl("config",appId);
        MyApp.loadData(MyApp,configUrl);
        //var configUrl = "data/config.json"



})