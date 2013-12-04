// JavaScript Document

var HtmlObj = {"city":'<div class = "city" >\
                       <p>城镇主页面</p>\
					   <div id = "nav">\
						   <input id="build" type="button" value="建筑"/>\
						   <input id="arm" type="button" value="军队"/>\
						   <input id="ectype" type="button" value="副本"/>\
					   <div>\
                    </div>',
				"ectype":'<div class = "ectype">\
                       <p>副本主页面</p>\
					   <div id = "nav">\
						   <input id = "city" type="button" value="城市"/>\
						   <input id = "underground" type="button" value="地下城"/>\
						   <input id = "cave" type="button" value="山洞"/>\
					   <div>\
                    </div>',
				"arm":'<div class = "arm">\
                       <p>城镇子页面--军队</p>\
					   <div id = "nav">\
					   <input id= "build" type="button" value="建筑"/>\
					   <input id= "close" type="button" value="关闭"/>\
					   <div>\
                    </div>',	
				"build":'<div class = "build">\
                       <p>城镇子页面--建筑</p>\
					   <div id = "nav">\
					   <input id= "arm" type="button" value="军队"/>\
					   <input id= "close" type="button" value="关闭"/>\
					   <div>\
                    </div>',
				"cave":'<div class = "cave">\
                       <p>副本子页面 --山洞</p>\
					   <div id = "nav">\
					   <input id= "close" type="button" value="关闭"/>\
					   <input id= "underground" type="button" value="地下城"/>\
					   <div>\
                    </div>',
				"underground":'<div class = "underground">\
                       <p>副本子页面 --地下城</p>\
					   <div id = "nav">\
					   <input id= "close" type="button" value="关闭"/>\
					   <input id= "cave" type="button" value="山洞"/>\
					   <div>\
                    </div>',			
							
					}

var modeConfig = {"Main":{
	              "city": {
                        "js": "js/Main/city.js",
                        "css": "css/city.css",
                        "loadData":function(pars){city.loadData(pars)},						
						"initData":function(cityEle){city.initData(cityEle)},
						"htmlStr":HtmlObj["city"],
                    },
					"ectype":{
					    "js": "js/Main/ectype.js",
                        "css": "css/ectype.css",
                        "loadData":function(pars){ectype.loadData(pars)},						
						"initData":function(ectypeEle){ectype.initData(ectypeEle)},
						"htmlStr":HtmlObj["ectype"],
						
					},
	
	      },
		 	 "Child":{
					"build":{
					    "js": "js/Child/build.js",
                        "css": "css/build.css",
                        "loadData":function(pars){build.loadData(pars)},						
						"initData":function(buildEle){build.initData(buildEle)},
						"htmlStr":HtmlObj["build"],
						"closeWay":"toss"
						
						
						},
					"arm":{
					    "js": "js/Child/arm.js",
                        "css": "css/arm.css",
                        "loadData":function(pars){arm.loadData(pars)},						
						"initData":function(armEle){arm.initData(armEle)},
						"htmlStr":HtmlObj["arm"],						
						},	
					"cave":{
					    "js": "js/Child/cave.js",
                        "css": "css/cave.css",
                        "loadData":function(pars){cave.loadData(pars)},						
						"initData":function(caveEle){cave.initData(caveEle)},
						"htmlStr":HtmlObj["cave"],
						//"closeWay":"drop",
						
						},								
					"underground":{
					    "js": "js/Child/underground.js",
                        "css": "css/underground.css",
                        "loadData":function(pars){underground.loadData(pars)},						
						"initData":function(undergroundEle){underground.initData(undergroundEle)},
						"htmlStr":HtmlObj["underground"],
						
						}							  
			  }
	   
	}


var modeConfig = {
    "navChild":{

    "city": {
        "js": "js/Main/city.js",
        "css": "css/city.css",
        "loadData":function(pars){city.loadData(pars)},
        "initData":function(cityEle){city.initData(cityEle)},
        "htmlStr":HtmlObj["city"],
    },
    "ectype":{
        "js": "js/Main/ectype.js",
        "css": "css/ectype.css",
        "loadData":function(pars){ectype.loadData(pars)},
        "initData":function(ectypeEle){ectype.initData(ectypeEle)},
        "htmlStr":HtmlObj["ectype"],

    },

},
    "Other":{
        "build":{
            "js": "js/Child/build.js",
            "css": "css/build.css",
            "loadData":function(pars){build.loadData(pars)},
            "initData":function(buildEle){build.initData(buildEle)},
            "htmlStr":HtmlObj["build"],
            "closeWay":"toss"


        },
        "arm":{
            "js": "js/Child/arm.js",
            "css": "css/arm.css",
            "loadData":function(pars){arm.loadData(pars)},
            "initData":function(armEle){arm.initData(armEle)},
            "htmlStr":HtmlObj["arm"],
        },
        "cave":{
            "js": "js/Child/cave.js",
            "css": "css/cave.css",
            "loadData":function(pars){cave.loadData(pars)},
            "initData":function(caveEle){cave.initData(caveEle)},
            "htmlStr":HtmlObj["cave"],
            //"closeWay":"drop",

        },
        "underground":{
            "js": "js/Child/underground.js",
            "css": "css/underground.css",
            "loadData":function(pars){underground.loadData(pars)},
            "initData":function(undergroundEle){underground.initData(undergroundEle)},
            "htmlStr":HtmlObj["underground"],

        }
    }

}


	// slide
	
	var	moveStyleConfig = {
			"slide_left":{
					"showWay":{ move:{direction :"left",
                                 start:"640px",
                                 end:"0px"
                                    }
                                },
					"colseWay":{ move:{direction :"left",
                        start:"0px",
                        end:"-640px"
                                 }
                    },
					"runTime":500,
				   },
            "slide_right":{
                "showWay":{  move:{direction :"right",
                    start:"-640px",
                    end:"0px"
                }},
                "colseWay":{ move:{direction :"left",
                                    start:"0px",
                                    end:"640px"
                    }
                },
                "runTime":500,
            },
        "slide_up":{
            "showWay":{  move:{direction :"up",
                start:"600px",
                end:"0px"
            }},
            "colseWay":{ move:{direction :"up",
                start:"0px",
                end:"-600px"
               }
            },
            "runTime":500,
        },
        "slide_down":{
            "showWay":{  move:{direction :"down",
                start:"-600px",
                end:"0px"
            }},
            "colseWay":{ move:{direction :"down",
                start:"0px",
                end:"600px"
            }
            },
            "runTime":500,
        },

            "drain":{
                "showWay":{ "fade":"in" ,"rotate": 720},
                "colseWay":{"fade":"out" ,"rotate": -720
                },
                "runTime":1000,
            },
        "fade":{
            "showWay":{ "fade":"in" },
            "colseWay":{"fade":"out"
                },
            "runTime":1000
},
        "pageFlip_left":{
            "showWay":{ "flipDirection":"left",iteration:1,turns:1},
            "colseWay":{ "flipDirection":"left",iteration:1,turns:1},
            "runTime":1000
        },
        "phantomZone":{
            "showWay":{ "fade":"in"},
            "colseWay":{ "fade":"out"},
            "runTime":1000

        },
        "raceFlag":{
            "showWay":{ "perspectiveOrigin":"center",fade:"in","scale": {"from": "0%","to": "100%"}},
            "colseWay":{ "perspectiveOrigin":"center",fade:"out","scale": {"from": "100%","to": "0%"}},
            "runTime":1000
        },
        "spin":{
            "showWay":{ "flip":"left",iteration:1,fade:"in"},
            "colseWay":{ "flip":"left",iteration:1,fade:"out"},
            "runTime":1000
        },
        "toss":{
            "showWay":{ iteration:1, move:{direction :"left",
                start:"640px",
                end:"0px"
            }},
            "colseWay":{ iteration:1, move:{direction :"left",
                start:"0px",
                end:"-640px"
            }},
            "runTime":1000
        }
	}		
		 
$.MODE.initConfig(modeConfig);
$.MODE.setStyle(moveStyleConfig);

var mainMode = $.MODE.createMode("navChild","slide_left");
var childMode = $.MODE.createMode("Other","spin");

mainMode.load("city","#Main","我是城镇在显示的时候调用的哦",true,true) //直接加载并且显示
//进行预加载 模式
mainMode.load("ectype") 
childMode.load("arm")
childMode.load("build")
childMode.load("cave")
childMode.load("underground");


//window.innerWidth

