var infoBox_confirm;
infoBox_confirm = (function () {
    var infoBox_confirmEle = null;
    var confirm_sureFun = null;
    var confirm_cancleFun = null;
    function initData(thisEle) {
        infoBox_confirmEle = thisEle;
        setTimeout(function () {
            infoBox_confirmEle.bind("tapstart", ButtonClick);
        }, 100);
    }
    function loadData() {
    }
    function setMsg(msg){
        infoBox_confirmEle.find("#popupTxt").html(msg)
    }
    function setbackFun(sureFun,cancleFun){
        confirm_sureFun =sureFun;
        confirm_cancleFun = cancleFun
    }
    /*按钮绑定*/
    function ButtonClick(event) {
        var id = event.target.id;
        switch (id ) {
             case "confirm_sure":
                  if(typeof  confirm_sureFun =="function"){
                      confirm_sureFun();
                      confirm_sureFun = null;
                  }
                 InfoBox.close("confirm");
                 shadeLayer.hide();
             break;
             case "confirm_cancle":
                 if(typeof  confirm_cancleFun =="function"){
                     confirm_cancleFun();
                     confirm_cancleFun = null;
                 }
                 InfoBox.close("confirm");
                 shadeLayer.hide();
             break;
        }
        event.stopPropagation();
    }
    return {
        "initData":initData,
        "loadData":loadData,
        "setbackFun":setbackFun,
        "setMsg":setMsg
    }
})();