// JavaScript Document

// JavaScript Document
var city;
city = (function () {
	var cityEle = null;
    function initData(thisEle) {
		cityEle = thisEle;
	    setTimeout(function () {
            cityEle.bind("click", ButtonClick);
        }, 100);
    }
    function loadData() {
    }
   
	/*按钮绑定*/
    function ButtonClick(event) {
        var id = event.target.id;
        switch (id ) {
            case "build":
                 childMode.show("build","#Child")
				break;
            case "arm":
               	childMode.show("arm","#Child");
				break;
            case "ectype":
                mainMode.show("ectype","#Main");
				break;
            
        }
    }
    return {
        "initData":initData,
        "loadData":loadData
    }
})();

