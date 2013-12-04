/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-23
 * Time: 上午8:58
 * To change this template use File | Settings | File Templates.
 */
var viewManage = {};

//工厂方法
function factoryView(items){
    var warpConfig  =  items.warp||{};
    var topConfig = items.top||null;
    var childConfig = items.childrens||{};
    var warpRes = factoryWarp( warpConfig,topConfig);
    var childRes =  factoryChild(childConfig);
    warpRes.add(childRes);
    return warpRes;
}



function factoryNav(navConfig){
    var res = null;
    var navType =  navConfig.comConfig.type;
    switch(navType){
        case "MainBar":
            res = new  mainBar(configBar(navConfig));
            break;
    }
    return res;
}

function factoryChild(childConfig){
    var res  = [];
    if(childConfig){
        for(var key in childConfig){
            var configValue = childConfig[key];
            if(key.indexOf("myList")!=-1){
                var myList = new myList_Com(configList(configValue));
                res.push(myList);
                continue;
            };
            if(key.indexOf("floatPanel")!=-1){
                var panel  =   new  NewWin.view.floatPanel(configFloatPanel(configValue));
                res.push(panel);
                continue;
            };
            if(key.indexOf("myCars")!=-1){
                var myCars  = new myCars_Com(configCars(configValue));
                res.push(myCars);
                continue;
            };
            if(key.indexOf("myCell")!=-1){
                var myCell  = new NewWin.view.myCell(configCell(configValue));
                res.push(myCell);
                continue;
            }
            if( key.indexOf("mydataView")!=-1){
                var mydataView  = new mydataView_Com(configView(configValue));
                res.push(mydataView);
                continue;
            }
            if( key.indexOf("myMenuBar")!=-1){
                var myMenuBar  = new NewWin.view.myMenuBar(configMenuBar(configValue));
                res.push(myMenuBar);
                continue;
            }
            if( key.indexOf("myMenuView")!=-1){
                var myMenuView  = new myMenuView_Com(configMenuView(configValue));
                res.push(myMenuView);
                continue;
            }
            if(key.indexOf("myCon")!=-1){
                var myCon  = new myCon_Com (configCon(configValue));
                res.push(myCon);
                continue;
            }
            if(key.indexOf("myImage")!=-1){
                var myImage  = new NewWin.view.myImage(configImage(configValue));
                res.push(myImage);
            }
            if(key.indexOf("myformPanel")!=-1){
                var myformPanle  = new myformPanel_Com(configFormPanel(configValue));
                res.push(myformPanle);
            }
            if(key.indexOf("warpCon")!=-1){
                var warpCon  = new  warpCon_Com(configWarpCon(configValue));
                res.push(warpCon);
            }
        }
    }
    return res;
}
function factoryWarp(warpConfig,topConfig){
    warpConfig = warpConfig||{}
    var  contentCon = warpConfig.type||'warpCon';
    var res = null;
    switch(contentCon){
        case "myNav":
            res  = new myNav_Com(configNav(warpConfig),topConfig);
            break;
        case "warpCon":
            res  =  new warpCon_Com(configWarpCon(warpConfig),topConfig);
            break;
        case "floatPanel":
            res  =   new  floatPanel_Com(configFloatPanel(warpConfig),topConfig);
            break;
    }
    return res;
}


function choosPage(data,nextPageView,nextPageType,defaultPageView,nextChildPage,nextJsonUrl,nextPageId,itemFlage,boole){
    var childIndex = "";
    var page = null;
    var isCreate = true;
    var  JsonUrl = "";
    if(defaultPageView){
        childIndex = defaultPageView;
        JsonUrl = getInfoUrl(nextPageType,nextPageId);
    }
    if(nextPageView){
        JsonUrl = nextJsonUrl||getInfoUrl(nextPageType,nextPageId);
        childIndex =nextPageView;
    };

    switch(nextPageType){
        case "show":
        case "news":
        case "blog":
        case "group":
        case "needs":
        case "image":
            switch (childIndex){
                case "menuViewCar":
                case "disList":
                    childIndex = "second_list";
                    break;
            }
            break;
        case "product":
        case "company":
            switch (childIndex){
                case "menuViewCar":
                case "disList":
                    childIndex = "second_view";
                    break;
            }
            break;
        case "newsCollect":
        case "imageCollect":
        case "blogCollect":
        case "productCollect":
        case "groupCollect":
        case "needsCollect":
        case "showCollect":
        case "newsCollect":
        case "companyDis":
        case "infosDis":
        case "productDis":
        case "showDis":
        case "about":
        case "help":
            var par = generatePar(nextPageType);
            var parStr = makePar(par);
            JsonUrl = getInfoUrl(nextPageType,"",parStr);
            break;
        case "menu":
            boole = true;
            if(defaultPageView){
                childIndex = "second_view";
            }
    }
/*    switch (childIndex){
        case "menuViewCar":
        case "disList":
            childIndex = "second_list";
            break;
    }*/
    if(childIndex == "second_list"||childIndex =="second_view"||childIndex == "menuViewCar"){
         if(itemFlage){
                if(backParPageManage[itemFlage]){
                    page = backParPageManage[itemFlage]
                    isCreate = false;
                }else{
                    page = factoryView(ChildPageOption[childIndex])
                    var id= page.id
                    var dom = page.dom;
                    gengeratePugin(id,dom);
                    backParPageManage[itemFlage] = page;
                }
         }else{
             page = factoryView(ChildPageOption[childIndex])
              }
      }else{
            var page =   childPageManage[childIndex];
     }

    if(page){
        page.setAttribute({
            "pageView":childIndex,
            "pageType":nextPageType,
            "jsonUrl":JsonUrl,
            "childNextPage":nextChildPage,
            "pageId":nextPageId
        })
           if(data){
                setTimeout(function(){
                    page.selfCreate(data);
                },500)

            }

    }
    return page;
};
function gengeratePugin(flage,ele){
    if(flage&&ele){
        var puginOption = {};
        puginOption[flage] = {
            "htmlEle":ele
        }
        $.MODE.addConfig("Pugin",puginOption);
    }
    return flage

}


function generatePar(type,contentObj){
    var par ={};
    applyFilter(par,contentObj);
    switch (type){
        case "publish":
            par.uid = userId;
            par.cid = appId;
            break;
        case "companyDis":
        case "infosDis":
        case "showDis":
        case "productDis":
            par.id = userId;
            break;
        case "imageCollect":
        case "blogCollect":
        case "productCollect":
        case "groupCollect":
        case "needsCollect":
        case "showCollect":
        case "newsCollect":
            par.uid = userId;
            var collectType = type.slice(0,type.length-7);
            par.type = collectType;
            break;
        case "addCollect":
            par["obj.uid"] = userId;
            par["obj.cid"] = appId;
            break;
        case "feedback":
            par["cid"] = appId;
            break;
        case "register":
            par["cid"] = appId;
            break;
        case "about":
        case "help":
            par["id"] = appId;
            par["style"] = type;
            break;
    }
    return par
}

