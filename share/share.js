/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
var MyApp = null;

function getWindowWidth() {
    return window.innerWidth;
};
/**
 * Retrieves the document height.
 * @return {Number} height in pixels.
 */
function getWindowHeight() {
    return window.innerHeight;
};

var setFontSize = function(){
    var font_small_size = deviceHeight*0.02 +"px";
    $(".fontSize_small").css(
        {"fontSize":font_small_size
        }
    )
    var font_normal_size = deviceHeight*0.03 +"px";
    $(".fontSize_normal").css(
        {"fontSize":font_normal_size
        }
    )
}


var  screenSacle = function(sacle,par){
    par = par||"px";
    var height = parseInt(deviceHeight*sacle);
    if(par){
        height+=par;
    }
    return height;
}
function myWidthScreenSacle(sacle,par){
    par = par||"px";
    return deviceWidth*sacle + par;
}



var objIsBank =function(Obj){
    var flag = true;
    for(var key in Obj){
        flag =false;
        return flag
    }
    return flag;
}


var dealComLogic = function(self){
    if(self.config.flag){
        pageMageStore[self.config.flag]  = self;
    }
}

//处理配置逻辑
var dealConfigLogoic = function(self){
    var logicConfig = self.config.logicConfig||{}
    if( typeof (logicConfig.initialize) == "function"){
        logicConfig.initialize.call(self);
    }
}


var dealConfigData =function(self){
    var dataConfig  = self.config.dataConfig||{}
    if(!objIsBank(dataConfig)){
        if(dataConfig.dataUrl){
            var success = null;
            if(dataConfig.success){
                success = function(textObj){dataConfig.success.call(self,textObj)}
            }
            myRequest("",dataConfig.dataUrl,success);
        }
    }
}

var setConfig = function(myConfig){
    myConfig = myConfig||{};
    var res = {};
    var comConfig = myConfig.comConfig||{};
    if(!objIsBank(comConfig)){
        applyFilter(res,comConfig)
    }
    res.config = res.config||{}
    res.config.logicConfig = myConfig.logicConfig||{};
    if( typeof (res.config.logicConfig.onBefore) == "function"){
        res.items =  myConfig.logicConfig.onBefore(myConfig);
    }
    var selfConfig = myConfig.selfConfig||{};
    if(!objIsBank(selfConfig)){
        applyFilter(res.config,selfConfig)
    }
    res.config.dataConfig = myConfig.dataConfig||{};

    return res
}




function applyFilter(des,obj,filterArr,bool){
    des = des||{};
    filterArr = filterArr||[];
    for(var key in obj){
        if(bool){
            if(filterArr.indexOf(key)!=-1){
                des[key] = obj[key];
            }
        }else{
            if(filterArr.indexOf(key)==-1){
                des[key] = obj[key];
            }
        }
    }
    return des;
}


function getPNav(con,grade){
    grade = grade||1;
    var currentGrade = 1;
    var parent = con.parent;
    while(parent){
        if(parent.isType('myNav')){
            if(currentGrade>= grade){
                return parent
            }else{
                currentGrade++;
            }
        }
        parent = parent.parent;
    }
}


function myRequest(maskObj,url,successBC,timeout,failureBC,method,params){
    var  maskenIcon = null;
    var errorRefresh = null;
    if(maskObj){
         maskenIcon = maskObj.maskenIcon||maskObj;
         maskenIcon.showLoading();
         errorRefresh = maskObj.errorRefresh||"";
    }
    method = method||'GET';
    timeout = timeout||10000;
    successBC = successBC||function(){};
    failureBC= failureBC||function(){};
    $.ajax({
        type: method,
        url: url,
        // data to be added to query string:
        data: params,
        // type of data we are expecting in return:
        dataType: 'json',
        timeout: timeout,
        context: $('body'),
        success: function(data){

            if(maskObj){
                maskenIcon.hideLoading();
                    maskenIcon.hideErrorHtml();
                    if(!data||data.length == 0 ){
                       maskenIcon.showNoInfoHtml();
                    }
            }
            setTimeout(function(){
                successBC(data);
            },10)
        },
        error: function(xhr, type){
            if(maskObj){
                    maskenIcon.hideLoading();
                   if(errorRefresh){
                       maskenIcon.showErrorHtml("数据加载失败，点击请重新加载",errorRefresh);
                   }

            }
            failureBC();
        }
    })
}

  function generatePage(data,itemFlage){
    var self = this;
    var page = null;
    var parent = self.parent;
    var nextPageView = data.stylelist||"third_normal";
    var nextPageType = data.type1||parent.pageType;
    var nextJsonUrl  = data.des2;
    var nextPageId = data.id||null;
    var nextChildPage = data.styleview;
    var defaultPageView =parent.childNextPage|| parent.parent.childNextPage;
    var disType = self.disType;
      var collectType = self.collectType;
      var searchType = self.searchType;
      switch (disType){
          case "company":
              nextPageId = data.companyid;
              nextPageType = "company";
              break;
          case "infos":
              nextPageId = data.infoid;
              nextPageType = "news";
              break;
          case "show":
              nextPageId = data.showid;
              nextPageType = "show";
              break;
          case "product":
              nextPageId = data.productid;
              nextPageType = "product";
              break;
          /*                          case "blog":
           nextPageId = data.blogid;
           nextPageType = "blog";
           break;
           case "group":
           nextPageId = data.groupid;
           nextPageType = "group";
           break;*/
      }
      switch (collectType){
          case "company":
              nextPageId = data.infoid;
              nextPageType = "company";
              break;
          case "news":
          case "image":
              nextPageId = data.infoid;
              nextPageType = "news";
              break;
          case "show":
              nextPageId = data.infoid;
              nextPageType = "show";
              break;
          case "product":
              nextPageId = data.infoid;
              nextPageType = "product";
              break;
          case "blog":
              nextPageId = data.infoid;
              nextPageType = "blog";
              break;
          case "group":
              nextPageId = data.infoid;
              nextPageType = "group";
              break;
      }
      switch(searchType){
          case "newSearch":
              nextPageType =  "news";
              break
      }
    var page =  choosPage(data,nextPageView,nextPageType,defaultPageView,nextChildPage,nextJsonUrl,nextPageId,itemFlage)


    return page;
}


var loadResource =function(bc){
    //preDealConfig()
    //loadModeCss();
    //loadModeJs(bc);
}


function getInfoUrl(type,id,par){
    var url = "";
    id = id||par;
    switch(type){
        case "about":
        case "help":
            url = host+"AboutHelp!Json?"
            break;
        case "news":
        case "image":
        case "newsearch":
            url = host+"Infos!Json?id="
            break;
        case "company":
            url = host+"Company!Json?id="
            break;
        case "group":
            url = host+"Group!Json?id="
            break;
        case "blog":
            url = host+"Blog!Json?id="

            break;
        case "show":
            url = host+"Show!Json?id="
            break;
        case "product":
            url = host+"Product!Json?id=	"

            break;
        case "needs":
            url = host+"Needs!Json?id="
            break;
        case "adv":
            url = host+"Adv!Json?id="
            break;
        case "login":
            url = host+"UserRegist!Login?"
            break;
        case "regist":
            url = host+"UserRegist!Reg?"
            break;
        case "addInfoDis":
            url = host+"InfosDis!Add?"
            break;
        case "addCompanyDis":

            url = host+"CompanyDis!Add?"

            break;
        case "addProductDis":

            url = host+"ProductDis!Add?"

            break;
        case "addShowDis":
            url = host+"ShowDis!Add?"

            break;
        case "advUrl":
            url = host+"Adv!Cid?id=";
            break;
        case "companyDis":
            url = host+"CompanyDis!Local?"
            break;
        case "infosDis":
            url = host+"InfosDis!Local?"

            break;
        case "showDis":

            url = host+"ShowDis!Local?"

            break;
        case "productDis":

            url = host+"ProductDis!Local?"
            break;
        case "addCollect":
            url = host+"UserFav!Add?"
            break
        case "imageCollect":
        case "blogCollect":
        case "productCollect":
        case "groupCollect":
        case "needsCollect":
        case "showCollect":
        case "newsCollect":
            url = host+"UserFav!List?"
            break
        case "feedback":

            url = host+"Feedback!Add?"

            break
        case "getInfoDetail":

            url = host+"UserLocal!Json?uid="
            break
        case "setInfoDetail":
            url = host+"UserLocal!Update?"
            break
        case "passwordModif":
            url = host+"UserRegist!updatePwd?"
            break
        case "search":
            url = host+"Infos!Search?"
            break;
        case "channel":
            url = host+"Channel!getCid?id="
            break;
        case "config":
            url = host+"Mobi!getJson?id=";
            break
        case "bottomUrl":
            url = host+"ConfigFootbtn!List?id=";
            break
        case "baoji_sencond_channel":
            url = host+"Channel!getSecondStep?id=";
            break;
        case "baoji_third_channelUrl":
            url = host+"Channel!getBaojiInfos?id=";
            break;
        case "baoji_four_channelUrl":
            url = host+"Channel!getSecondStep?id=";
            break;
    }
    if(id){
        url +=id;
    }
    return url;
}

function loadCss(src){
    var cssEle = document.createElement('link');
    cssEle.rel = 'stylesheet';
    cssEle.type = 'text/css';
    cssEle.href = src;
    document.getElementsByTagName('head').item(0).appendChild(cssEle);
}

function extend(sub,parent){
    parent.call(sub);
    sub.mySuper = parent.prototype;
    sub.mySub = sub;
    sub.__proto__ = extendObj(parent.prototype,sub.__proto__);

}
function extendObj(target,source){
    var newObj = {};
    applyFilter(newObj,target);
    applyFilter(newObj,source);
    return newObj;
}
function setViewConfig(warp,top,content){
    var items = {};
    var contentObj ={};
    items.warp = warp;
    items.top = top;
    for(var key in content){
        var value = content[key];
        for(var inn in  value){
            if(typeof (value[inn])=="function"){
                contentObj[inn] = value[inn]();
            }else{
                contentObj[inn] = value[inn];
            }
        }
    }
    items.childrens = contentObj;
    return items;
};

function preDealConfig(){
//模板风格
    CONCIG["W_Style_S"] = CONCIG["W_Style_S"].slice(0,CONCIG["W_Style_S"].length-2)||"shangQiu"; //整体风格

}
function setMoveStyleConfig(){

        var dialog_sild_closeWay = (deviceWidth +200);
        var sildWidth = deviceWidth +100
    	var moveStyleConfig = {
        "slide_left":{
            "beginCss":{"-webkit-transform":"translate("+sildWidth+"px)"},
            "showWay":{  "-webkit-transform":"translate(0px)"},
            "colseWay":{"-webkit-transform":"translate(-"+sildWidth+"px)"},
        },
        "silde_cover":{
                "beginCss":{"-webkit-transform":"translate("+sildWidth+"px)","zIndex":5},
                "showWay":{  "-webkit-transform":"translate(0px)"},
                "colseWay":{"zIndex":2},
            },
            "dialog_sild":{
                "beginCss":{"-webkit-transform":"translate("+deviceWidth+"px)"},
                "showWay":{  "-webkit-transform":"translate(0px)"},
                "colseWay":{"-webkit-transform":"translate(-"+dialog_sild_closeWay+"px)"},
            },
    }

    return moveStyleConfig;
}

function applyFAnd(obj,str){
    var res ={};
    for(var key in obj){
        var newKey = str+key;
        res[newKey] = obj[key];
    }
    return res;

}


function fieldFilter(value){
    switch (value) {
        case "nickname": MSG.alert('昵称不能为空');
            return false;
            break;
        case "email":MSG.alert('电子邮箱不能为空');
            return false;
            break;
        case "password": MSG.alert('密码不能为空');
            return false;
            break;
        case "username": MSG.alert('用户名不能为空');
            return false;
            break;
        case "phone": MSG.alert('电话不能为空');
            return false;
            break;
        case "content": MSG.alert('内容不能为空');
            return false;
            break;
        case "title":MSG.alert('标题不能为空');
            return false;
            break;
        case "relation": MSG.alert('联系方式不能为空');
            return false;
            break;
    }
    return true;

}

function formFilter(obj,type){
    var flag = true;
    switch (type){
        case "register":
            var password = obj.password;
            var passwordAgain = obj.passwordAgain;
            if( password!=passwordAgain){
                MSG.alert('2次密码输入不一样');
                flag = false;
            }
            break;
    }
    for(var key in obj){
        var value = obj[key];
        //空值判断
        if(!value){
            flag = fieldFilter(key);
            break;
        }
    }
    return flag;
};
function makePar(parObj){
    var parStr = "";
    for(var key in parObj){
        var str =key+"="+parObj[key]+"&"
        parStr+=str
    }
    parStr= parStr.slice(0 ,parStr.length-1);
    return parStr

};
var warpPar= function(par,type){
    var res ={};
    switch (type){
        case "collect":
            applyFilter(res,par,["id","type"],true)
            res = applyFAnd(res,"info");
            applyFilter(res,par,["id","type"])
            break
    }
    return res;
}

var MSG = {
    "alert":function(msg){
        infoBox_alert.setMsg(msg);
        var flage = InfoBox.show("alert",InfoBoxLayer);
        if(flage){
            shadeLayer.show();
        }

    },
    "confirm":function(msg,sureFun,cancleFun){
        infoBox_confirm.setbackFun(sureFun,cancleFun);
        infoBox_confirm.setMsg(msg);
        var flage = InfoBox.show("confirm",InfoBoxLayer);
        if(flage){
            shadeLayer.show();
        }
    }

}