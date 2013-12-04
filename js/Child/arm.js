var arm;
arm = (function () {
	var armEle = null;
    function initData(thisEle) {
		armEle = thisEle;
	    setTimeout(function () {
            armEle.bind("click", ButtonClick);
        }, 100);
    }
    function loadData() {
        //alert("我是 副本 在显示的时候调用的哦")
    }
   
	/*按钮绑定*/
    function ButtonClick(event) {
        var id = event.target.id;
        switch (id ) {
            case "close":
                 childMode.close("arm")
				break;
            case "build":
               	childMode.show("build","#Child");
				break;
            
        }
    }
    return {
        "initData":initData,
        "loadData":loadData
    }
})();