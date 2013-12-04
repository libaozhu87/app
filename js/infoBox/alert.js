var infoBox_alert;
infoBox_alert = (function () {
    var infoBox_alertEle = null;
    function initData(thisEle) {
        infoBox_alertEle = thisEle;
        setTimeout(function () {
            infoBox_alertEle.bind("tapstart", ButtonClick);
        }, 100);
    }
    function loadData() {
        //alert("我是 副本 在显示的时候调用的哦")
    }
    function setMsg(msg){
        infoBox_alertEle.find("#popupTxt").html(msg)
    }
    /*按钮绑定*/
    function ButtonClick(event) {
        var id = event.target.id;
        switch (id) {
            case "alert_sure":
                InfoBox.close("alert")
                shadeLayer.hide();
                break;
        }
        event.stopPropagation();
    }
    return {
        "initData":initData,
        "loadData":loadData,
        "setMsg":setMsg
    }
})();