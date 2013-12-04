/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-23
 * Time: 上午8:37
 * To change this template use File | Settings | File Templates.
 */

var iconUrl = getInfoUrl("bottomUrl",appId)
var channelUrl =  getInfoUrl("channel",appId)  //主页栏目
var backParPageManage = {};
//模板商城
var initModeConfing = function(){
   backParStore = {
       menuViewCar:setViewConfig(
           {
               "type":"warpCon",
                 comConfig:{
                   "layout":"vbox",
                     width:"100%",
                     initEvent:true,
                     cacheSys:true,
                     "flex":1
               }
           },
           null,[{
                "myMenuView":{
                    comConfig:{
                        "height":screenSacle(0.066,"px"),
                         width:"100%",
                        isCacheTplTime:200,
                        "style":{
                            "backgroundColor":"rgba(0, 0, 0,0)",
                            "backgroundImage":"url(comImages/menuview_bg.png)",
                            "backgroundSize":"100% 100%"
                        },
                        "itemTpl": '<div  class="G_NenuView" style="height:'+screenSacle(0.064,"px")+'"><p id="onItemtapId" class="G_NenuView_title">{title}</p></div>',
                        "itemActiveCls":"G_NenuView_active",
                         flag:"menuView",
                     }
                    }
                    },{
                "myCars":{
                      comConfig:{
                          flex:1,
                          layout:"vbox",
                          width:"100%",
                          flag:"carView"
                        },
                    selfConfig:{
                        continuous:false,
                     }
                           }
                    }
            ]),
       second_list:setViewConfig(
           {
               "type":"warpCon",
                comConfig:{
                   "layout":"vbox",
                    initEvent:true,
                    cacheSys:true,
                    width:"100%",
                    style:{"backgroundColor":"#fff"}
                }
           },
           null,
           [{"myList":{
               comConfig:{
                   "flex":1,
                    isCacheTplTime:200,
                    scrollable:true,
                    padding:true,

               }
           }}]
       ),
       second_view:setViewConfig(
           {
               "type":"warpCon",
                comConfig:{
                   "layout":"vbox",
                    initEvent:true,
                    cacheSys:true,
                    width:"100%",
                    style:{"backgroundColor":"#fff"}
               }
           },
           null,
           [{"mydataView":{
               comConfig:{
                   class:"G_secondDataview",
                   styleHtmlCls:"my_secondDataview",
                   isCacheTplTime:200,
                   flex:1,
                   scrollable:true,
                   padding:true,
               }
           }}]
       ),
       third_normal:setViewConfig({
               "type":"warpCon",
                comConfig:{
                    width:"100%",
                    initEvent:true,
                    cacheSys:true,
                    "style":{
                        "backgroundColor":"#ffffff"
                      },
                    layout:"vbox",
                    flex:1,
                    scrollable:true
                },
           },
           null,
           [{"myCon":{
                comConfig:{
                    "flag":"contentPage",
                     isCacheTplTime:200
                        },
               logicConfig:{
                   "initialize":function(){
                       var self = this;
                       setTimeout(function(){
                           self.dom.bind("tapstart",function(event){self.config.itemtap.call(self,event) } )
                       },3000)

                   }
               },
               selfConfig:{
                   itemtap:function(event){
                       var self = this;
                       var cid = event.target.id;
                       switch (cid){
                           case "contentTip_comment":
                               var nextPageType = parent.pageType;
                               var nextPageId = parent.pageId;
                               var page =  choosPage("","commentFloat",nextPageType,"","","",nextPageId);
                               page.show();
                               break;
                           case "contentTip_collect":
                               var par = {};
                               var recordInfo = self.parent.recordInfo
                               if(userId == 0){
                                   MSG.alert("请先登陆。。。再收藏");
                                   return
                               }
                               applyFilter(par,recordInfo, ["id","title","logo1","des1","price"],true);
                               var nextPageType = self.parent.pageType;
                               switch (nextPageType){
                                   case "image":
                                       par.type = "image"
                                       break
                                   case "show":
                                       par.type = "show"
                                       break
                                   case "news":
                                       par.type = "news"
                                       break
                                   case "blog":
                                       par.type = "blog"
                                       break
                                   case "product":
                                       par.type = "product"
                                       break
                                   case "group":
                                       par.type = "group"
                                       break
                                   case "needs":
                                       par.type = "needs"
                                       break
                                   case "company":
                                       par.type = "company"
                                       break
                               }
                               var res =  warpPar(par,"collect");
                               par = applyFAnd(res,"obj.");
                               par =  generatePar("addCollect",par);
                               var url= getInfoUrl("addCollect","");
                               var success = function(cbObj){
                                   if(cbObj){
                                       MSG.alert("已经成功收藏");
                                   }
                               }
                               myRequest("",url,success,"","","POST",par)

                               break;
                           }

                   },
                   initPage:function(jsonObj){
                    var self = this;
                    var newHtml = document.createElement("div");
                    var titleHtml = jsonObj.title;
                    var logo = jsonObj.logo||jsonObj.logo1;
                    var  content   =jsonObj.content||"";
                    var cssOp = {}
                    var html = "<div id='third_normal_title'>"+titleHtml+"</div><div  id='third_normal_pic'></div><div id='contentTip_warp'><p id='contentTip_comment'></p><p id='contentTip_collect'></p></div><div id='third_normal_content'>"+content+"</div>"
                       if(logo){
                           var imageUrl = picHost+logo;
                           cssOp.backgroundImage =  "url("+imageUrl+")";
                           cssOp.height = myWidthScreenSacle(0.5);
                       }else{
                           cssOp.height = "0px";
                       }
                       newHtml.innerHTML = html;
                       $(newHtml).find("#third_normal_pic").css(cssOp);
                           self.setHtml(newHtml);

                     }
               }
       }}])
   }


    channelStore = {
                "list": {
                        "url":channelUrl,
                        "mode":"NewWin.model.menuMode",
                        "paging":false,
                         flag:"index_Channel",
                },
                dataView:{
                    comConfig:{
                        flag:"index_Channel",
                        itemTpl: '<div style="height: '+myWidthScreenSacle(0.32)+'"  class="G_channel_dataView_Warp" ><div class="G_channel_dataView_icon" style="background-image:url('+sysImageHost+'{logo});"></div></div>',
                        flex:1,
                        "paging":false,
                        flag:"index_Channel",
                    },
                    selfConfig:{
                        "url": channelUrl,
                        "mode":"NewWin.model.menuMode",
                    }
                },
                cars:{
                        comConfig:{
                             //isCacheTplTime:200,
                            "flex":1,
                            "decorateHtml":"<span id='Car_Indicator_shangQiu'></span>",
                            "decorateCls":"Car_Indicator_G_cars_channel",
                        },
                        selfConfig:{
                            continuous:false,
                            startSlide:0,
                            dataViewConfig:{
                                comConfig:{
                                    itemTpl:'<div id="onItemtapId"  style="height: '+screenSacle(0.2)+'"  class="G_channel_dataView_Warp" ><div class="G_channel_dataView_icon" style="background-image:url('+sysImageHost+'{logo});"></div><p class ="G_channel_dataView_title ">{des1}</p></div>',
                                    paging: false,
                                    height:"100%",
                                    flag:"index_Channel"
                                }
                            }
                        },
                        dataConfig:{
                            "dataUrl": channelUrl,
                            "success":function(textObj){
                                var self = this;
                                var dataViewCount = parseInt((textObj.length+1)/6)+1;
                                var  y = 0;
                                var w = 0;
                                var dataViewConfig = self.config.dataViewConfig||{};
                                var item =[];
                                for(var i = 0;i<dataViewCount;i++){
                                    var dataView = new mydataView_Com(configView(dataViewConfig));
                                    var data = null;
                                    y = i;
                                    if(i!=dataViewCount-1){
                                        y = i+6;
                                        w = i;
                                        data = textObj.slice(w,y);
                                        w = y;
                                    }else{
                                        data = textObj.slice(w);
                                    };
                                    dataView.setData(data);
                                    item.push(dataView);
                                }
                                self.add(item)
                                pageMageStore["Cars"] = self;
                            }
                        }
                },
                cell:{

                },
/*        "styleMode2":{
            comConfig:{
                "hideOnMaskTap":false,
                "modal": false,
                centered:false,
                layout:"hbox",
                height:"3.75em",
                style:{"margin-top":"0.5em"},
                items:[{xtype:"floatPanel",
                    width:"2.63em",
                    height:"3.75em",
                    "hideOnMaskTap":false,
                    "modal": false,
                    centered:false,
                    baseCls:"styleMode2_channel"
                },(function(){
                    var myMenuView  = new NewWin.view.myMenuView(configMenuView({
                        comConfig:{
                            "itemTpl":"<div  style='background-image:url("+sysImageHost+"{logo})' class='styleMode2_channel_pic'></div>",
                            "flag":"index_Channel",
                            "switchTap":"channel",
                            "myUrl":channelUrl,
                            baseCls:"myMenuView_channel",
                            flex:1,
                            itemCls:"styleMode2_channel_picWarp"
                            },
                        selfConfig:{
                            generate_styleMode2_Channel:function(self){
                                var myUrl = self.getMyUrl();
                                if(myUrl){
                                    var  store = generateStore("NewWin.model.menuMode",myUrl)
                                    self.setStore(store)
                                    self.getStore().on("load",function(me, records, successful){
                                        if(successful){
                                            var recordsLen = records.length-1;
                                            var itemCls = self.getItemCls();
                                            var v = parseInt(recordsLen/3);
                                            var cls = "scrol_minWidth"+v;
                                            self.setStyleHtmlCls(cls);
                                            var eleArr = self.element.query("."+itemCls);
                                            if(!v){
                                                v = recordsLen%3;
                                                switch (v){
                                                    case 0:  Ext.each(eleArr,function(ele){
                                                        ele.style.width = "100%"
                                                    })
                                                        break;
                                                    case 1:Ext.each(eleArr,function(ele){
                                                        ele.style.width = "50%"
                                                    })
                                                        break;
                                                    case 2: Ext.each(eleArr,function(ele){
                                                        ele.style.width = "33.33%"
                                                    })
                                                        break;
                                                    case 3:
                                                        Ext.each(eleArr,function(ele){
                                                            ele.style.width = "25%"
                                                        })
                                                        break;
                                                }
                                                self.setScrollable(false);
                                            }else{
                                                var value = 25/(v+1);
                                                Ext.each(eleArr,function(ele){
                                                    ele.style.width = value+"%";
                                                })
                                            }
                                        }
                                    })


                                }
                            },
                        },
                        logicConfig:{
                            "initialize":function(){
                                var self = this;
                                 self.config.generate_styleMode2_Channel(self);
                            }
                        }
                    }));
                    return myMenuView
                })()],
               }

        },*/
                baoJi_chanel:{
                        comConfig:{
                            "flag":"index_baoJi_Channel",
                            "itemTpl":"",
                             scrollable: false,

                            "paging":false,
                             height:"100%"
                        },
                    selfConfig:{
                        "url": channelUrl,
                        "mode":"NewWin.model.menuMode",
                        changStyle:function(self){
                                var records =self.getStore().getData().items;
                                var htmlStr = ""
                                var y = 0;
                                var isNext = true;
                                var itemStr = "<div id='baoji_channel_warp'><p id='baoji_channel_bottonBg'></p>";
                                var pageLen =  parseInt((records.length-1)/4)+1;
                                Ext.each(records,function(item,index){
                                    isNext = true;
                                    var recrdsStr = JSON.stringify(item.data);
                                    var picUrl = sysImageHost+item.data.logo;
                                    itemStr +="<div  id='baoji_channel_pic_warp'><p record='"+recrdsStr+"' style='background-image: url("+picUrl+")' id='baoji_channel_pic'></p></div>"
                                    y ++;
                                    if(y ==4){
                                        itemStr +="</div>";
                                        htmlStr += itemStr;
                                        itemStr = "<div id='baoji_channel_warp'><p id='baoji_channel_bottonBg'></p>";
                                        y = 0;
                                        isNext = false;
                                    }
                                })
                                if(isNext){
                                    itemStr +="</div>";
                                    htmlStr += itemStr;
                                }
                                var channelHeight = (pageLen*4.875)+"em";
                                self.setHeight(channelHeight);
                                self.setHtml(htmlStr);

                        },
                    },

                    logicConfig:{
                        "initialize":function(){
                            var self = this;
                            if(self.getStore()){
                                self.getStore().on("load",function(me, records, successful){
                                    if(successful){
                                        self.config.changStyle(self);
                                    }
                                })
                            }
                            self.on("tap",function(me, e, eOpts){
                                    if(me.target.id =="baoji_channel_pic"||me.target.id =="baoji_second_channel_title"){
                                        var record = me.target.getAttribute("record");
                                        record = eval('('+record+')');
                                        self.fireEvent("itemtap",self,"","",record);
                                    }
                            },self,{element: "innerElement"})
                        }
                    },
                }
            }
            channelOption = {
                "list":{"myList":channelStore["list"]},
                "dataView":{'mydataView':channelStore["dataView"]},
                "cars":{'myCars':channelStore["cars"]},
                "cell":{'myCell':channelStore["cell"]},
                "baoJi_chanel":{'mydataView':channelStore["baoJi_chanel"] },
                "styleMode2":{"floatPanel":channelStore["styleMode2"] }
            }

    // mainBar 底栏配置。。。。。。。。。。。。
    var mainBarConfig = {
        "selfConfig":{
            "animation":CONCIG["V_footSwitch_S"],//pop fade' flip slide
            "active_BG":sysImageHost+CONCIG["V_Bar_Active_Bg_S"],
            "itemsEle":null,
            "barNum":4,
            "oldActive":0,
            "currentActive":0,
            "itemHtml":"<div id='mainBar_item'> <a id='mainBar_item_pic'></a></div>",
             tapButtonChange:function(item,index){
                 var self = this;
                var active_BG = self.config.active_BG||"";
                 self.config.oldActive =self.config.currentActive;
                 self.config.currentActive = index;
                 if(self.config.oldActive==self.config.currentActive){
                     return;
                 }

                 if(!self.config.itemsEle){
                     self.config.itemsEle = self.dom.children();
                 }
                 var oldItem = self.config.itemsEle.eq(self.config.oldActive);
                 var picUrl = oldItem.data("picUrl");
                 oldItem.css({
                     "background-image":""
                 });
                 oldItem.find("#mainBar_item_pic").css({"background-image":"url("+picUrl+")"})
                var active_picUrl = item.data("active_picUrl");
                 item.css({
                     "background-image":"url("+active_BG+")"
                 });
                 item.find("#mainBar_item_pic").css({"background-image":"url("+active_picUrl+")"})
                 setTimeout(function(){pageMageStore["mianCars"].slide(index);},100)

            }
         },
        "comConfig":{
             type:"MainBar",
            "flag":"mianNav",
            "height":screenSacle(0.1,"px")
        },
        dataConfig:{"dataUrl":iconUrl,
            "success":function(textObj){
                var self = this;
                var count = self.config.barNum;
                for(var i = 0;i<count;i ++){
                    var value = textObj[i];
                    if(value){
                        var picUrl = sysImageHost+textObj[i].image||'';
                        var active_picUrl = sysImageHost+textObj[i].image1||'';
                        var items =$(self.config.itemHtml)
                        items.data("picUrl",picUrl);
                        items.data("active_picUrl",active_picUrl);
                        items.data("index",i);
                        self.addEle(items);
                        if(i ==0 ){
                            items.find("#mainBar_item_pic") .css({"background-image":"url("+active_picUrl+")"});
                        }else{
                            items.find("#mainBar_item_pic").css({"background-image":"url("+picUrl+")"});
                        }
                    }

                }

            }
        },

        logicConfig:{
            "onBefore":function(myConfig){
                var items = [];
                var count = parseInt(myConfig.selfConfig.barNum)
                if(count){
                    for(var i = 0 ;i<count;i ++){
                        var contentLayout = appConfig.contentConfig.layout[i]||{};
                        var configObj = contentLayout.items||{};
                        items.push(factoryView(configObj));
                    }
                }
                var barCarOption = {
                    comConfig:{
                        flex:1,
                        items:items,
                        layout:"vbox",
                    },
                    selfConfig:{
                        isTouch:false,
                    }
                }
                var barCar = new myCars_Com(configCars(barCarOption));
                pageMageStore["mianCars"] = barCar;
                MyApp.add(barCar);
                return barCar
            },
            "initialize":function(){
                var self = this;
                self.dom.css({
                    backgroundImage:"url("+ sysImageHost+CONCIG["V_BarBg_S"]+")"
                })
                self.dom.bind("tapstart",function(event){
                    var id = event.target.id;
                    switch (id){
                        case "mainBar_item_pic":
                            var parent = $(event.target.parentNode)
                            var  index = parent.data("index");
                            self.config.tapButtonChange.call(self,parent,index)
                     }
                 })
                }
                }
    }

     barStore = {
        MainBar:mainBarConfig
    }


}























