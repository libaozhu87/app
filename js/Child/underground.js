var underground;
underground = (function () {
	var undergroundEle = null;
    function initData(thisEle) {
		undergroundEle = thisEle;
	    setTimeout(function () {
            undergroundEle.bind("click", ButtonClick);
        }, 100);
    }
    function loadData() {
       // alert("我是 副本 在显示的时候调用的哦")
    }
   
	/*按钮绑定*/
    function ButtonClick(event) {
        var id = event.target.id;
        switch (id ) {
            case "close":
                 childMode.close("underground")
				break;
            case "cave":
               	childMode.show("cave","#Child");
				break;
            
        }
    }
    return {
        "initData":initData,
        "loadData":loadData
    }
})();