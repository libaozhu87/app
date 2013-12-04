// JavaScript Document
// JavaScript Document

// JavaScript Document
var ectype;
ectype = (function () {
	var ectypeEle = null;
    function initData(thisEle) {
		ectypeEle = thisEle;
	    setTimeout(function () {
            ectypeEle.bind("click", ButtonClick);
        }, 100);
    }
    function loadData() {
       // alert("我是 副本 在显示的时候调用的哦")
    }
   
	/*按钮绑定*/
    function ButtonClick(event) {
        var id = event.target.id;
        switch (id ) {
            case "city":
                 mainMode.show("city","#Main")
				break;
            case "cave":
               	childMode.show("cave","#Child");
				break;
            case "underground":
                childMode.show("underground","#Child");
				break;
            
        }
    }
    return {
        "initData":initData,
        "loadData":loadData
    }
})();