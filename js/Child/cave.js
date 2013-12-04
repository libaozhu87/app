var cave;
cave = (function () {
	var caveEle = null;
    function initData(thisEle) {
		caveEle = thisEle;
	    setTimeout(function () {
            caveEle.bind("click", ButtonClick);
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
                 childMode.close("cave")
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