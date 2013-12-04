var build;
build = (function () {
	var buildEle = null;
    function initData(thisEle) {
		buildEle = thisEle;
	    setTimeout(function () {
            buildEle.bind("click", ButtonClick);
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
                 childMode.close("build")
				break;
            case "arm":
               	childMode.show("arm","#Child");
				break;
            
        }
    }
    return {
        "initData":initData,
        "loadData":loadData
    }
})();