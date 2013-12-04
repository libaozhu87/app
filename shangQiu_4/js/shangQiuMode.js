
var ChildPageOption = {};
var  childPageManage ={};
var  menuPageManage = {};

var appConfig = {};
var getNavTopConfig_G = null;
var styleStore = {};
var listStore = {};
var dataViewStore = {};
var formStore = {};

function dealFloatPage(floatTyle,topNav,par,me){
    switch (floatTyle) {
        case "loginOut":
            var truthBeTold = MSG.confirm("你真的要注销吗?",function(){ userId = 0;
                topNav.reset();});
            break;
        case "passwordModif":
            var passwordModif = choosPage("","passwordModif");
            if(passwordModif){
                passwordModif.show();
            }
            break;
        case "version":
            MSG.alert('已经是最新版');
            break;
        case "clear":
            MSG.alert('缓存已经清除了');
            break;

        case "myShare":
            window.jsObj.localShare("<a href='http://app.1035.mobi/3O3G3L'>http://app.1035.mobi/3O3G3L</a>","掌上延安");
            break
    }
}



function initConfig(){

    var carsUrl = getInfoUrl("advUrl",appId) //广告
    var userInfoUrl =CONCIG["W_Style_S"] +'_4/data/userInfo.json';
    var moreUrl1 = CONCIG["W_Style_S"] +'_4/data/more1.json';
    var moreUrl2 = CONCIG["W_Style_S"] +'_4/data/more2.json';
    var shareUrl  =CONCIG["W_Style_S"] + '_4/data/share.json'
    var cellUrl  = CONCIG["W_Style_S"] + '_4/data/cell.json';
//
     listStore ={
        "news":function(me){
            var newTpl =
                '<div id="onItemtapId"  class="shangQiu_newList_Warp">\
                <div  class="shangQiu_newList_image" style="background-image: url('+picHost+'{logo1})";></div>\
                            <div  class="shangQiu_newList_text_Warp">\
                             <p class="shangQiu_newList_title" >{title}</p>\
                             <p class = "shangQiu_newList_des">{des1}</p>\
                            </div></div>'
            return newTpl;
        },
        "image":function(me){
            var newTpl =
                '<div id="onItemtapId"  class="shangQiu_imageList_arrow"><span></span></div>\
           <div  id="onItemtapId"  class="shangQiu_imageList_image_warp">\
             <div class="shangQiu_imageList_image" style="background-image: url('+picHost+'{logo1})";></div>\
                       </div>\
                        <div class="shangQiu_imageList_text_Warp">\
                         <p class="shangQiu_imageList_title" >{title}</p>\
                         <p class = "shangQiu_imageList_des">{des1}</p>\
                        </div>'
            return newTpl;
        },
        "blog":function(me){
            var newTpl =
                '<div id="onItemtapId"  class="shangQiu_blogList_arrow"><span></span></div>\
                 <div class = "shangQiu_blogList-image-warp">\
                 <div class="shangQiu_blogList-image"></div>\
                 </div>\
               <div class="shangQiu_blogList_text_Warp">\
                 <p class="shangQiu_blogList-title" >{title}</p>\
                 <p class = "shangQiu_blogList-des">时间:{regtime}</p>\
                </div>'
            return newTpl;
        },
        "show":function(me){
            var newTpl =
                '<div id="onItemtapId"  class="shangQiu_showList-arrow"><span></span></div>\
                 <div  class="shangQiu_showList-image-warp">\
                  <div class="shangQiu_showList-image" style="background-image: url('+picHost+'{logo1})";></div>\
                                 <p class="shangQiu_showList-style">未结束</p>\
                               </div>\
                               <div >\
                                 <p class="shangQiu_showList-title" >{title}</p>\
                                 <p class = "shangQiu_showList-des">时间:{time1}--{time2}</p>\
                                 <p class = "shangQiu_showList-des">主办方:{master}</p>\
                                </div>'
            return newTpl;
        },
        "needs":function(me,url){

            var newTpl =  '<div id="onItemtapId"  class="shangQiu_needList_arrow"><span></span></div>\
                                         <div >\
                                         <p class="shangQiu_needList_title" >{title}</p>\
                                         <p class="shangQiu_needList_des" >{des}</p>\
                                           <p class = "shangQiu_needList_des"> <span class="shangQiu_needList_tel">电话:{tel}</span><span class="shangQiu_needList_add">地址:{address}</span></p></div>'
            return newTpl

        },
        "company":function(me){
            var newTpl =
                '<div id="onItemtapId"  class="shangQiu_productList_arrow"><span></span></div>\
                 <div  class="shangQiu_productList_image_warp">'+
                    "<div class='shangQiu_productList_image' style='background-image: url(" +picHost+"{logo1})';></div>"+
                    '</div>\
                    <div class="shangQiu_productList_content">\
                      <p class="shangQiu_productList_title" >{title}</p>\
                      <p class = "shangQiu_productList_des">{des1}</p>\
                     </div>'
            return newTpl

        },
        "product":function(me){
            var newTpl =
                '<div  id="onItemtapId"  class="shangQiu_productList_arrow"><span></span></div>\
                <div  class="shangQiu_productList_image_warp">'+
                    "<div class='shangQiu_productList_image' style='background-image: url(" +picHost+"{logo1})';></div>"+
                    '</div>\
                    <div class="shangQiu_productList_content">\
                      <p class="shangQiu_productList_title" >{title}</p>\
                      <p class = "shangQiu_productList_des">{des1}</p>\
                     </div>'
            return newTpl
        },
        "group":function(me,url){
            var newTpl =
                '<div  id="onItemtapId" class="shangQiu_groupList_arrow"><span></span></div>\
                 <div  class="shangQiu_groupList_image_warp">\
                 <div class="shangQiu_groupList_image" style="background-image: url('+picHost+'{logo1})";></div>\
                               </div>\
                                <div class="shangQiu_groupList_text_Warp">\
                                 <p class="shangQiu_groupList_title" >{title}</p>\
                                 <p class = "shangQiu_groupList_des">{des1}</p>\
                                 <p class="shangQiu_groupList_area">地区:{area}</p>\
                                </div>'
            return newTpl
        },

    }


      dataViewStore = {
        "company":function(me){
            var height = shangQiu_dataViewHeight('dataView')
            var newTpl = '<div  id="onItemtapId"  style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_productView_icon" style="background-image:url('+picHost+'{logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';
            return newTpl
        },
        "show":function(me){
            var height = shangQiu_dataViewHeight('dataView');
            var newTpl = '<div id="onItemtapId"  style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_dataView_icon" style="background-image:url('+picHost+'{logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';
            return newTpl
        },
        "news": function(me){
            var height = shangQiu_dataViewHeight('dataView');
            var newTpl = '<div id="onItemtapId"  style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_shadowView_icon" style="background-image:url('+picHost+'{logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';
            return newTpl
        },
        "image":function(me){
            var height = shangQiu_dataViewHeight('dataView');
            var newTpl = '<div id="onItemtapId"  style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_shadowView_icon" style="background-image:url('+picHost+'{logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';
            return newTpl
        },
        "needs":function(me){
            var height = shangQiu_dataViewHeight('dataView');
            var newTpl = '<div id="onItemtapId"  style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_dataView_icon" style="background-image:url('+picHost+'{logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';
            return newTpl
        },
        "group":function(me){
            var height = shangQiu_dataViewHeight('dataView');
            var newTpl = '<div id="onItemtapId"  style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_dataView_icon" style="background-image:url('+picHost+'{logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';

            return newTpl
        },
        "product":function(me){
            var height = shangQiu_dataViewHeight('dataView');
            var newTpl = '<div id="onItemtapId"  style="height: '+height+'"  class="shangQiu_productView_warp" > <div class="shangQiu_shadowView_icon" style="background-image:url('+picHost+'{logo1});"></div><p class ="shangQiu_productView_title">{title}</p></div>';
            return newTpl
        }
    }


    formStore = {
              "comment":{
                  comConfig:{
                      flex:1,
                      html:'<div id="Comment">\
                    <textarea type="text" name ="content" id="txt" placeholder="请留下您的宝贵意见，谢谢~"></textarea>\
                    <p>\
                        <input id="publish" type="button" name="publish"  class="send" value="发送" />\
                        <input id="cancle" type="button" name="cancle"  class="send" value="取消" />\
                    </p>\
                </div>'

                  },
                  selfConfig:{
                      "domTap":function(event){
                          var id = event.target.id;
                          switch(id){
                              case "cancle":
                                  var  self = this;
                                  var parent = self.parent;
                                  parent.hide();
                                  break;
                              case "publish":
                                  var  self = this;
                                  var publishObj = self.getValues();
                                  if(userId == 0){
                                      MSG.alert("请先登陆。。。再发表");
                                      return
                                  }
                                  if(!publishObj.content){
                                      MSG.alert("发表的评论不能为空");
                                  }else{
                                      var pageType = self.parent.pageType;
                                      var pageId =self.parent.pageId;
                                      var interfaceType = "";
                                      switch(pageType){
                                          case "news":
                                          case "image":
                                              publishObj.infoid = pageId;
                                              interfaceType = "addInfoDis"
                                              break;
                                          case "company":
                                              publishObj.companyid = pageId;
                                              interfaceType = "addCompanyDis"
                                              break;
                                          case "product":
                                              publishObj.productid = pageId;
                                              interfaceType = "addProductDis";
                                              break;
                                          case "show":
                                              publishObj.showid = pageId;
                                              interfaceType = "addShowDis";
                                              break;
                                          case "blog":
                                              break;
                                          case "group":
                                              MSG.alert("团购不能评论");
                                              return;
                                              break;
                                          case "needs":
                                              MSG.alert("需求不能评论");
                                              return;
                                              break;
                                          case "adv":
                                              MSG.alert("广告不能评论");
                                              return;
                                              break;
                                      };
                                      publishObj =   generatePar("publish",publishObj);
                                      publishObj = applyFAnd(publishObj,'obj.')
                                      var parStr = makePar(publishObj);
                                      var url = getInfoUrl(interfaceType,"",parStr);
                                      function success(cbObj){
                                          if(cbObj){
                                              MSG.alert("已经发表成功了");
                                              self.parent.hide();
                                          }
                                      }
                                      myRequest(self.parent,url,success);
                                  }
                                  break;
                          }


                      }
                  }


              },
             "login":{
                    comConfig:{
                            flex:1,
                            scrollable:false,
                            layout:"vbox",
                            class:"shangQiu_login_form",
                            html:'<div  class="login_warp">\
                                         <div class = "field_text_warp">\
                                        <span >用 户:</span>\
                                        <div class = "inputText_warp">\
                                        <input class="login_input" name="user"   type="text" />\
                                        </div>\
                                            </div>\
                                                <div class = "field_text_warp">\
                                                    <span>密 码:</span>\
                                                    <div class = "inputText_warp">\
                                                        <input class="login_input" name="password"  type="password"/>\
                                                    </div>\
                                                </div>\
                                                <div class="login_but_warp">\
                                                <div id="login_regist" name = "regist", class="login_regist_but"></div>\
                                                <div id="login_login"  name ="login", class ="login_login_but"></div>\
                                                </div>\
                                         </div>'
                             },
                   selfConfig:{
                       "domTap":function(event){
                           var id = event.target.id;
                           switch(id){
                               case "login_regist":
                                   var self = this;
                                   //var registerView =  choosPage("register");
                                   var parentNav = getPNav(self)
                                   parentNav.addPush("register","注册")
                                   break;
                               case "login_login":
                                   var self = this;
                                   var value =  self.getValues();
                                   var name = value.user;
                                   var password = value.password;
                                   var par = "username="+name+"&password="+password+"&cid="+appId;
                                   var url = getInfoUrl("login","",par);
                                   var self = this;
                               function success(cbObj){
                                   var uid = cbObj.uid;
                                   var parentNav = getPNav(self)
                                   if(uid){
                                       userId = uid;
                                       parentNav.addPush("userInfo","用户信息");
                                   }else{
                                       MSG.alert("用户或密码错误");
                                   }
                                 }
                                   myRequest(self,url,success);
                                   break;
                           }

                       }
                   }

                    },

"register":{
        comConfig:{"flex":1,
                    "layout":"vbox",
                     scrollable:false,
                     html:'<div  class="regist_warp">\
                                <div class="regist_field_warp">\
                                <div class = "regist_field_text_warp">\
                                <span >昵称:</span>\
                        <div class = "inputText_warp">\
                                <input class="regist_input"  type="text" name = "nickname", />\
                                </div>\
                                </div>\
                                <div class = "regist_field_text_warp">\
                                <span>账户:</span>\
                        <div class = "inputText_warp">\
                                <input class="regist_input" name ="username", type="text"/>\
                                </div>\
                                </div>\
                                <div class = "regist_field_text_warp">\
                                <span>密码:</span>\
                        <div class = "inputText_warp">\
                                <input class="regist_input" name = "password", type="password"/>\
                                </div>\
                                </div>\
                                <div class = "regist_field_text_warp">\
                                <span>确认密码:</span>\
                        <div class = "inputText_warp">\
                                <input class="regist_input"  name="passwordAgain", type="password"/>\
                                </div>\
                                </div>\
                                <div class = "regist_field_text_warp">\
                                <span>电话:</span>\
                        <div class = "inputText_warp">\
                                <input class="regist_input"  name = "phone", type="text"/>\
                                </div>\
                                </div>\
                                <div class = "regist_field_text_warp">\
                                <span>电子邮箱:</span>\
                        <div class = "inputText_warp">\
                                <input class="regist_input"  name ="email", type="text"/>\
                                </div>\
                                </div>\
                                </div>\
                          <div id="regist_regist_but" class="regist_regist_but"></div>\
                                </div>'
        },
                        selfConfig:{
                            "domTap":function(event){
                                var id = event.target.id;
                                switch(id){
                                    case "regist_regist_but":
                                        var self = this;
                                        var value =  self.getValues();
                                        var flag = formFilter(value,"register");
                                        if(!flag){
                                            return
                                        }
                                        value = generatePar("register",value)
                                        var fliterValue = {};
                                        applyFilter(fliterValue,value,["passwordAgain"])
                                        var par = applyFAnd(fliterValue,'obj.')
                                        par = makePar(par);
                                        var url = getInfoUrl("regist","",par);
                                    function success(cbObj){
                                        var uid = cbObj.uid
                                        switch (uid){
                                            case -1:MSG.alert('此账号已经被注册');
                                                break;
                                            case -2: MSG.alert('不能包含admin,mana 之类的字符 ');
                                                break;
                                            default :
                                                userId = uid;
                                                MSG.alert('恭喜你已注册成功');
                                                self.reset();
                                        }
                                    }
                                        myRequest(self.parent,url,success);
                                        break;

                                }


                            }
                        }


},
        "search":{
            comConfig:{
                style:{
                    "margin-top": "0.5em"
                },

                html:"<div class = 'search_warp'><div class = 'input_search_warp' > <input type='text'class='input_search' name='search' placeholder='请输入搜索关键字'/></div><div class='search_but' id='search_but' ></div></div>",
            },
            selfConfig:{
                "domTap":function(event){
                    var id = event.target.id;
                    switch(id){
                        case "search_but":
                            var self = this;
                            var par ={};
                            var parent = self.parent;
                            var searchObj = self.getValues();
                            par["str"] = searchObj.search;
                            par["cid"] = appId;
                            var parStr = makePar(par);
                            var myUrl = getInfoUrl("search",parStr);
                            var list = parent.down("myList");
                            list.clearData();
                            list.config.doSearch.call(list,myUrl);
                            break;

                    }


                }
            },
        },

        "detailInfo":{
                comConfig:{
                    scrollable:true,
                    flex:1,
                    layout:"vbox",
                    html:        '<div>\
        <div class="baseInfo">\
                <div class="baseInfo_image"></div>\
                <div class=" baseInfo_form">\
                <div class = "baseInfo_text_warp">\
                <span>姓 名</span>\
        <div class = "inputText_warp">\
                <input class="baseInfo_input" name="realname"  type="text"/>\
                </div>\
                </div>\
                <div class = "baseInfo_text_warp">\
                <span>性 别</span>\
        <div class = "inputText_warp">\
                <input class="baseInfo_input" name="sex"  type="text"/>\
                </div>\
                </div>\
                <div class = "baseInfo_text_warp last">\
                <span>公 司</span>\
        <div class = "inputText_warp ">\
                <input class="baseInfo_input" name="company"  type="text"/>\
                </div>\
                </div>\
                </div>\
                </div>\
                <div class = "detailInfo">\
                <form>\
                <div class = "detailInfo_text_warp">\
                <span>生  日</span>\
        <div class = "inputText_warp">\
                <input class="detailInfo_input" name="birthday"  type="date"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>身份证</span>\
                <div class = "inputText_warp">\
                <input class="detailInfo_input" name="idcard"  type="text"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>地  区</span>\
        <div class = "inputText_warp">\
                <input class="detailInfo_input" name="area"  type="text"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>详细地址</span>\
                <div class = "inputText_warp">\
                <input class="detailInfo_input" name="address"  type="text"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>邮  编</span>\
        <div class = "inputText_warp">\
                <input class="detailInfo_input" name="postcode"  type="text"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>Q  Q</span>\
        <div class = "inputText_warp">\
                <input class="detailInfo_input" name="qq"  type="text"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>个人网站</span>\
                <div class = "inputText_warp">\
                <input class="detailInfo_input" name="web"  type="text"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>职  称</span>\
        <div class = "inputText_warp">\
                <input class="detailInfo_input" name="title"  type="text"/>\
                </div>\
                </div>\
                <div class = "detailInfo_text_warp">\
                <span>个人说明</span>\
                <div class = "inputText_warp">\
                <input class="detailInfo_input" name="des"  type="text"/>\
                </div>\
                </div>\
                </form>\
                <p class="pwdbtn">\
                <input id="detail_sure" type="button" value="保存" />\
                <input id="detail_change" type="button" value="编辑" />\
                </p>\
                </div>\
                </div>'
                },
            selfConfig:{
                "domTap":function(event){
                    var id = event.target.id;
                    var self = this;
                    switch(id){
                        case "detail_sure":
                            var infoValues = self.getValues();
                            console.dir(infoValues);
                            infoValues.uid =userId;
                            infoValues.cid =appId;
                            var par = applyFAnd(infoValues,"obj.");
                            var myUrl = getInfoUrl("setInfoDetail","");
                            var succss = function(obj){
                                if(obj){
                                    self.parent.dom.one("show", function(){self.config.initInfo.call(self)});
                                    MSG.alert("已经保存成功了");
                                    self.disable()
                                }else{
                                    MSG.alert("已经保存失败");
                                };
                            }
                            myRequest(self,myUrl,succss,"","","POST",par);
                            break;
                        case "detail_change":
                              self.enable()
                              MSG.alert("您可以编辑信息了")
                            break;
                    }
                },
                initInfo:function(){
                    var self = this;
                    var myUrl = getInfoUrl("getInfoDetail",userId);
                    var succee =function(userInfo){
                        if(userInfo&&!objIsBank(userInfo)){
                            self.setValues({
                                "birthday":userInfo.birthday,
                                "idcard":userInfo.idcard,
                                "area":userInfo.area,
                                "address":userInfo.address,
                                "postcode":userInfo.postcode,
                                "qq":userInfo.qq,
                                "web":userInfo.web,
                                "title":userInfo.title,
                                "des":userInfo.des,
                                "realname":userInfo.realname,
                                "sex":userInfo.sex,
                                "company":userInfo.company
                            })
                        }
                        self.disable();
                    }
                    myRequest(self.parent,myUrl,succee)
                }
            },
            logicConfig:{
                "initialize":function(){
                    var self = this;
                    setTimeout(function(){
                        self.parent.dom.one("show", function(){self.config.initInfo.call(self)  } );
                    },2000)
                    //
                }
            }



            },
     passwordModif:{
         comConfig:{
             flex:1,
             html:
                    '<div class="editPwd">\
                     <form>\
                    <label>密码：</label>\
                    <input type="text" name="passwordModif"  value="" />\
                    <label>密码确认：</label>\
                    <input type="text" name="passwordConfirm"  value="" />\
                    <p class="pwdbtn">\
                        <input id="modif_sure" type="button" value="确认" />\
                        <input id="modif_cancel" type="button" value="取消" />\
                    </p>\
                    </form>\
                </div>'
         },
         selfConfig:{
             "domTap":function(event){
                 var id = event.target.id;
                 switch(id){
                     case "modif_cancel":
                         var self = this;
                         self.parent.hide();
                         break;
                     case "modif_sure":
                         var self = this;
                         var passValues = self.getValues()
                         if(!passValues["passwordModif"]){
                             MSG.alert("密码不能为空");
                             return
                         }
                         if(passValues["passwordModif"]!= passValues["passwordConfirm"]){
                             MSG.alert("2次密码输入的不一样");
                             return
                         }
                         var par = {};
                         par["password"] = passValues["passwordModif"];
                         par["uid"] = userId;
                         par = applyFAnd(par,"obj.");
                         var parStr = makePar(par);
                         var success = function(cbObj){
                             if(cbObj){
                                 MSG.alert("已经修改成功");
                                 self.parent.hide();
                             }
                         }
                         var url = getInfoUrl("passwordModif","",parStr);
                         myRequest(self.parent,url,success)
                         break;
                 }
             }
             }
        },
        "feedback":{
            comConfig:{
                flex:1,
                html:'<div id="Feedback">\
            <input type="text" name="title" placeholder="请输入标题" value="" />\
            <textarea type="text" name="content" id="txt" placeholder="请留下您的宝贵意见，谢谢~"></textarea>\
            <input type="text"name="relation"  placeholder="请留下您的联系方式（QQ/手机/邮箱均可）" value="" />\
            <input id="feedbackSure" type="button" class="send" value="发送" />\
            </div>'
                    },
            selfConfig:{
                "domTap":function(event){
                    var id = event.target.id;
                    switch(id){
                        case "feedbackSure":
                            var self = this;
                            var feedbackObj = self.getValues();
                            var flag =  formFilter(feedbackObj,"feedback");
                            if(!flag){
                                return;
                            }
                            feedbackObj =  generatePar("feedback",feedbackObj);
                            feedbackObj = applyFAnd(feedbackObj,'obj.')
                            var parStr = makePar(feedbackObj);
                            var url = getInfoUrl("feedback","",parStr);
                        function success(cbObj){
                            if(cbObj){
                               MSG.alert("已经反馈成功了")
                               self.reset();
                            }
                        }
                            myRequest(self,url,success);
                            break;
                    }
                }
            }

                },




        }














    styleStore = {
        "share":function(){
            return{
                "url":moreUrl2,
                "mode":"NewWin.model.menuMode",
                "baseCls":"sharelist",
                "itemTpl":"<div style='background-image: url(myImages/cc_03.png)' class='sharelist_but'></div> <div style='background-image: url({logo})' class='sharelist_icon'></div><div  class='sharelist_title' >{title}</div>",
                "paging":false
            }

        },

        "floatShare":function(){
            return{
                "baseCls":"sharelist",
                "itemTpl":"<div style='background-image: url(myImages/cc_03.png)' class='sharelist_but'></div> <div style='background-image: url({logo})' class='sharelist_icon'></div><div class='sharelist_title' >{title}</div>",
                "paging":false
            }
        },

    };




    getNavTopConfig_G =function(flag,item){
        var config = null;
        var par = flag+"_"+item;
        config =navTopConfig_G[par];
        return config
    }


    var indexUrl = sysImageHost+CONCIG["indexBgImage"];
    var childUrl = sysImageHost+CONCIG["childBgImage"];
    var topOption = {
        "index_Top":{
            comConfig:{
                height: screenSacle(0.098),
                width: "100%",
                backButton: {
                    class:"nav_back_but",
                },
                style:{
                    backgroundImage:"url("+indexUrl+")",
                    backgroundSize:"100%"
                },
                class:"index_shangQiu_top",
                html:"<div><img src='"+sysImageHost+CONCIG["logoBgImage"]+"'class='index_head_log'/><div>",
                title:"",
            },
            children:{
                html:"",
            },

        },

        "index2_Top":{
            comConfig:{
                height: screenSacle(0.098),
                width: "100%",
                animation: false,
                backButton: {
                    class:"nav_back_but",
                },
                style:{
                    backgroundImage:"url("+childUrl+")",
                    backgroundSize:"100% 100%"
                },
                class:"index2_shangQiu_top",
                title:"用户"

            }


        },
        "index3_Top":{
            comConfig:{
                height: screenSacle(0.098),
                width: "100%",
                animation: false,
                backButton: {
                    class:"nav_back_but",
                },
                style:{
                    backgroundImage:"url("+childUrl+")",
                    backgroundSize:"100% 100%"
                },
                class:"index2_shangQiu_top",
                title:"搜索"
            }
        },
        "index4_Top":{
            comConfig:{
                height: screenSacle(0.098),
                width: "100%",
                animation: false,
                backButton: {
                    class:"nav_back_but",
                },
                style:{
                    backgroundImage:"url("+childUrl+")",
                    backgroundSize:"100% 100%"
                },
                class:"index2_shangQiu_top",
                title:"设置"
            }
        }

    }



    var navTopConfig_G = (function (){
        var index_index = null;

        if(CONCIG["isWeather"]=="true"&&CONCIG["isSearch"] == "true"){
            index_index = {
                height: screenSacle(0.178,"px"),
                html:"<div><img src='"+sysImageHost+CONCIG["logoBgImage"]+"' class='index_head_log'/><div class='index_weather_warp'><img src='shangQiu_4/shangQiu-images/weather.png' class='index_weather_log'/><p class='index_weather_value '>10-20度</p><p class='index_weather_area '>杭州</p></div><div class='index_search_warp'><input  class='index_search_text' type='text'/><input class='index_search_but' type='button'/></div><div>",

            };

        }else if(CONCIG["isWeather"]=="false"&&CONCIG["isSearch"] == "false"){
            index_index = {
                height: screenSacle(0.098,"px"),
                html:"<div><img src='"+sysImageHost+CONCIG["logoBgImage"]+"'class='index_head_log'/><div>",

            };

        }else if(CONCIG["isWeather"]=="true"&&CONCIG["isSearch"] == "false"){
            index_index = {
                height: screenSacle(0.098,"px"),

                html:"<div><img src='"+sysImageHost+CONCIG["logoBgImage"]+"' class='index_head_log'/><div class='index_weather_warp'><img src='shangQiu_4/shangQiu-images/weather.png' class='index_weather_log'/><p class='index_weather_value '>10-20度</p><p class='index_weather_area '>杭州</p></div><div>",

            };

        }else if(CONCIG["isWeather"]=="false"&&CONCIG["isSearch"] == "true" ){
            index_index = {
                height: screenSacle(0.178,"px"),
/*                animation: false,
                backButton: {
                    baseCls:"nav_back_but",
                },
                style:{
                    backgroundImage:"url("+indexUrl+")",
                    backgroundColor:"rgba(0,0,0,0)"
                },   */
                html:"<div><img src='"+sysImageHost+CONCIG["logoBgImage"]+"' class='index_head_log'/><div class='index_search_warp'><input  class='index_search_text' type='text'/><input class='index_search_but' type='button'/></div><div>",
                baseCls:"index_shangQiu_top",
            };
        }

        var  index_child = {
            height: screenSacle(0.098),
/*            style:{
                backgroundImage:"url("+childUrl+")",
                backgroundColor:"rgba(0,0,0,0)"
            },
            baseCls:"index_shangQiu_top",*/
            html: "<div id='myPageTitle'></div>",
            //title:"中国旅游"
        };
        var index2_index = {

            "myTitle":"帐户"
        }
        var index2_child = {
/*            height: screenSacle(0.098),
            animation: false,
            backButton: {
                baseCls:"nav_back_but",
            },
            style:{
                backgroundImage:"url("+childUrl+")",
                backgroundColor:"rgba(0,0,0,0)"
            },            baseCls:"index2_shangQiu_top",
            html:"<div id='myPageTitle'></div>"*/
        }
        var index3_index = {

            "myTitle":"搜索"
        }
        var index3_child = {
/*            height: screenSacle(0.098),
            animation: false,
            backButton: {
                baseCls:"nav_back_but",
            },
            style:{
                backgroundImage:"url("+childUrl+")",
                backgroundColor:"rgba(0,0,0,0)"
            },
            baseCls:"index2_shangQiu_top",
            html:"<div id='myPageTitle'></div>"*/
        }
        var index4_index = {

            "myTitle":"设置"
        }
        var index4_child = {
/*            height: screenSacle(0.098),
            animation: false,
            backButton: {
                baseCls:"nav_back_but",
            },
            style:{
                backgroundImage:"url("+childUrl+")",
                backgroundColor:"rgba(0,0,0,0)"
            },
            baseCls:"index2_shangQiu_top",
            html:"<div id='myPageTitle'></div>"*/
        }

        return {index_index:index_index,
            index_child:index_child,
            index2_index:index2_index,
            index2_child:index2_child,
            index3_index:index3_index,
            index3_child:index3_child,
            index4_index:index4_index,
            index4_child:index4_child
        }
    })()






// 各各channel的各自的属性

   var mySelfChanleOption = {
        "list":{},
        "dataView":{},
        "cars":{myCars:{}},
        "cell":{},
        "baoJi_chanel":{}
      }


    var overWriteBackParStore = function(opt){



    }

    var mixChannelOptionFC = function(opt,index){
        index = index||"";
        var reOpt = {};
        if(typeof (channelOption[opt]) == "object"){
            for(var key in channelOption[opt]){
                if(typeof (channelOption[opt][key]) == "object"){
                    var channelOpt = channelOption[opt][key];
                    if(mySelfChanleOption[opt]){
                        if(mySelfChanleOption[opt][key]){
                            var selfOpt = mySelfChanleOption[opt][key]||{}
                            applyFilter(channelOpt,selfOpt);
                        }
                    }
                    if(index){
                        key +=index;
                    }
                    reOpt[key] = channelOpt;
                }
            }
        }
        return  reOpt;
    };


    var myCarsOption = {
        "index_adv":{"flag":"adv",
            comConfig:{
                "height": screenSacle(0.34,"px"),
                "style":{overflow: "hidden"},
                "decorateHtml":"<div id='Car_Indicator_shangQiu'></div>",
                "decorateCls":"myAdv_Indicator"
            },

            dataConfig:{
                dataUrl:carsUrl,
                "success":function(textObj){
                    var self = this;
                    var items = [];
                    for(var key in textObj){
                        var imageUrl = picHost + textObj[key].logo1;
                        var record = textObj[key];
                        var myImageOption = {
                            comConfig:{
                                width:"100%",
                                record:record,
                                height:screenSacle(0.34,"px"),
                                style:{
                                    backgroundImage:"url("+imageUrl+")",
                                    backgroundSize:"100% 100%"
                                }
                            }
                        }
                        var myImage = new myImage_Com(configCars(myImageOption));
                        items.push(myImage);
                    }
                        self.add(items);
                }
            }
        }
    };
   var  myListOption = {
        "indexPage4_list_1":{
             comConfig:{
                 "scrollable":false,
                 "height":"10em",
                 "itemTpl":" <div id='onItemtapId'><div class='more_list_title' >{title}</div></div>",
                 "class": "shangQiu_morelist",
                 "url":moreUrl1
             },
        },
        "indexPage4_list_2":{
            comConfig:{
                "scrollable":false,
                "height":"10em",
                "itemTpl":" <div id='onItemtapId'><div class='more_list_title' >{title}</div></div>",
                "class":"shangQiu_morelist1",
                "url":moreUrl2
            },

        },



        "searchList":{
            comConfig:{
                "flex":1,
                 style:{"margin-top": "1em"},
                 cls:"shangQiu_searchList",
                 itemTpl: '<div class="shangQiu_searchList_warp" id="onItemtapId"> <div class = "shangQiu_searchList-image-warp">\
                            </div>\
                            <div class="shangQiu_searchList_text_Warp">\
                            <div class="shangQiu_searchList-title" >{title}</div>\
                            </div></div>',
                emptyText:"没搜到任何数据",
                cache:false,
                searchType:"newSearch"
                        },

            selfConfig:{
                doSearch:function(url){
                    var self = this;
                    self.loadData(self,url)
                }
            }


        },

        "collect_list":{
            comConfig:{
                "paging":false,
                scrollable:true,
                "class":"collectlist",
                "itemTpl":" <div id='onItemtapId'  class='shangQiu_collectlist_warp'><div  class='collectlist_icon_warp'><div style='background-image: url({logo})' class='collectlist_icon'></div> </div> <div class='collectlist_title' >{title}</div></div>"
            }
        },

        "dis_list":{
            comConfig:{
                "paging":false,
                "scrollable":false,
                 height:"100%",
                "flex":1,
                "itemTpl":"<div id='onItemtapId'  class='shangQiu_dislist_warp'  > <div class='shangQiu_dislist_arrow'><span></span></div><div class='shangQiu_dislist_title' >{title}</div></div>",
                "class":"shangQiu_dislist",
               }
        },
       dis_Info_list:{
           comConfig:{
                height:"100%",
               "flex":1,
               "itemTpl":"<div id='onItemtapId' class='dislist_warp' ><p class='dislist_content' >发布的内容：{content}</p><p class='dislist_time'>时间:{regtime}</p></div>",
               "class":"",
               "emptyText":"此分类暂时没有评论",
               "fixedType":"",
               "cache":false
           }

       },
       collect_info_list:{
           comConfig:{
               height:"100%",
               "flex":1,
               "itemTpl":'<div id="onItemtapId"  class="shangQiu_newList_Warp">\
                <div  class="shangQiu_newList_image" style="background-image: url('+picHost+'{logo1})";></div>\
                            <div  class="shangQiu_newList_text_Warp">\
                             <p class="shangQiu_newList_title" >{title}</p>\
                             <p class = "shangQiu_newList_des">{des1}</p>\
                            </div></div>',
               "class":"",
               emptyText:"此分类收藏没有内容",
               "fixedType":"",
               "cache":false
           }
       },

        "userInfo":{
            comConfig:{
                "paging":false,
                "scrollable":false,
                "itemTpl":"<div id='onItemtapId' class='shangQiu_infolist_warp'><div style='background-image: url({logo})' class='shangQiu_infolist_icon'></div><div class='shangQiu_infolist_title' >{title}</div></div>",
                height:"100%",
                "class":"shangQiu_infolist",
                "url":userInfoUrl
                }
        },

    };




   var  myCellOption = {
        //"index_channel":{"url":cellUrl ,"row":3,"col":1,"flex":1,"defFig":[{"rowKey":1,"colKey":1,"colValue":2 },{"rowKey":3,"colKey":1,"colValue":2 }] },
        "2":{"url":cellUrl,"root":"styleTwo" ,"row":1,"col":2,"flex":1,"defFig":[{"rowKey":1,"colKey":1,"rowValue":2 }] },
    };



   var  myConOption = {
        "third_con_clear":{
            comConfig:{
                "html":"<div id='third_normal_title'></div><div style='height:"+shangQiu_dataViewHeight("thrid_normal_logo")+"' id='third_normal_pic'></div><div id='third_normal_content'></div>",
                "flag":"contentPage_clear",
                 width:"100%",

                scrollable:true
            },
            selfConfig:{
                initPage:function(jsonObj){
                    var self = this;
                    var titleHtml = self.dom.find("#third_normal_title");
                    titleHtml.html(jsonObj.title);
                    var picHtml = self.dom.find("#third_normal_pic");
                    var logo = jsonObj.logo||jsonObj.logo1;
                    if(logo){
                        var imageUrl = picHost+logo;
                        picHtml[0].style.height = myWidthScreenSacle(0.5);
                        picHtml[0].style.backgroundImage = "url("+imageUrl+")";
                    }else{
                        picHtml[0].style.height = "0px";
                    }
                    var contentHtml = this.dom.find("#third_normal_content");
                    contentHtml[0].innerHTML= jsonObj.content
                }
            }
        },
        "third_about_help":{
            comConfig:{
                "flag":"third_about_help",
            },
            selfConfig:{
               initPage:function(jsonObj){
                   var self = this;
                   var newHtml = document.createElement("div");
                   jsonObj = jsonObj[0];
                   var titleHtml = jsonObj.title;
                   var  content   =jsonObj.content||"";
                   var html = "<div id='third_normal_title'>"+titleHtml+"</div><div id='third_normal_content'>"+content+"</div>"
                   newHtml.innerHTML = html;
                   self.setHtml(newHtml);
                }
            }

        },


        "storeAndModif":{
            height:'3em',
            style:{marginBottom:"1em"},
            layout:{
                type:"hbox",
                pack: "center",
                align: 'center'
            },
            items:[
                {
                    xtype: 'button',
                    ui: 'normal',
                    action:"store",
                    width:"20%",
                    text: '保 存'
                },
                {
                    xtype: 'spacer',
                    width:"30%"
                },
                {
                    xtype: 'button',
                    ui: 'normal',
                    width:"20%",
                    action:"modif",
                    text: '编辑'
                }
            ]
        },
        "shareFloat":{
            "flex":1,
            scrollable: 'vertical'
        }

    };
   var warpOption = {
        "index_Warp":{
           "type":"myNav",
            comConfig:{
                width:"100%",
                initEvent:true,
                cacheSys:true,
                style:{
                    display:"webkitBox",
                }
            },


        },
        "index2_Warp":{
            "type":"myNav",
            comConfig:{
                width:"100%",
            },
        },
        "index3_Warp":{
            "type":"myNav",
            comConfig:{
                layout:"vbox",
                width:"100%",
            },

        },
        "index4_Warp":{
          "type":"myNav",
            comConfig:{
                width:"100%",
            },
        },


        "dis_list_Warp":{
            "type":"warpCon",
             comConfig:{
                "flex":1,
                 width:"100%",
                 layout:"vbox"
            }
        },
       "dis_Info_list_Warp":{
           "type":"warpCon",
            comConfig:{
               "flex":1,
                width:"100%",
               layout:"vbox"
           }
       },
       "collect_info_list_Warp":{
           "type":"warpCon",
           comConfig:{
               "flex":1,
               width:"100%",
               layout:"vbox"
           }
       },

        "collect_list_Warp":{
            "type":"warpCon",
            comConfig:{

                width:"100%",

            },

        },

        "share_list_Warp":{
            "type":"warpCon",
            "style":"background-color:#ffffff",
            "layout":"vbox",
             flex:1
        },
        "comment_Warp":{
            "type":"floatPanel",
             comConfig:{
                 width:"90%",
                 class:"commentFloat",
            }
        },
        "feedback_Warp":{
            "type":"warpCon",
            comConfig:{
                width:"100%",
            }


        },

        "login_Warp":{
            "type":"warpCon",
            "layout":"default",
            "flex":1
        },
        "register_Warp":{
            "type":"warpCon",
             comConfig:{
                "flex":1,
                 width:"100%",
                }
        },
        "shareFloat_Warp":{
             "type":"floatPanel",
            comConfig:{
                "style":"background-color:rgba(25, 15, 27,0.3)",
                width:"100%",
                height:"80%",
            }
        },
       third_Warp:{
           "type":"warpCon",
           comConfig:{
               "flex":1,
               width:"100%",
           }

       },
        floatShare_Warp:{
            "type":"floatPanel",
            "style":"background-color:#ffffff",
             width:"100%",
            height:"60%",
        },

        "passwordModif_Warp":{
            "type":"floatPanel",
             comConfig:{
                width:"90%",
                class:"passwordModif",

            }
        },
        "infoDetail_Warp":{
            "type":"warpCon",
            comConfig:{
                width:"100%",
                }

        },

        "userInfo_Warp":{
            "type":"warpCon",
             comConfig:{
                 width:"100%",
                style:{
                    backgroundColor:"rgba(0,0,0,0)",
                },
                "layout":"vbox",
                "flex":1
            }
        }
    };


//mixChannelOptionFC(CONCIG["V1_cellRow_S"],1)


   //-------------------------主页面page ----------------------------------------
    var indexPage1 =  setViewConfig(warpOption["index_Warp"],topOption["index_Top"],[ {'myCars':myCarsOption["index_adv"]},mixChannelOptionFC(CONCIG["V1_cellRow_S"],1)]);
    var indexPage2 =  setViewConfig(warpOption["index2_Warp"],topOption["index2_Top"],[{"myformPanel":formStore["login"]}]);//
    var indexPage3 =  setViewConfig(warpOption["index3_Warp"],topOption["index3_Top"],[{"myformPanel":formStore["search"]},{"myList":myListOption["searchList"]} ])//
    var indexPage4 = setViewConfig(warpOption["index4_Warp"],topOption["index4_Top"],[{'myList':myListOption["indexPage4_list_1"]},{'myList1':myListOption["indexPage4_list_2"]}])
//-------------------------主页面page  end ----------------------------------------------------------------





//-------------------------表格page ----------------------------------------

    var register = setViewConfig(warpOption["register_Warp"],null,[{"myformPanel":formStore["register"]}]);
    var infoDetail =  setViewConfig(warpOption["infoDetail_Warp"],null,[ {"myformPanel":formStore["detailInfo"]}]);
    var passwordModif = setViewConfig(warpOption["passwordModif_Warp"],null,[{"myformPanel":formStore["passwordModif"]}]);

    var feedback = setViewConfig(warpOption["feedback_Warp"],null,[{'myformPanel':formStore["feedback"]}]);
    var commentFloat = setViewConfig(warpOption["comment_Warp"],null,[{'myformPanel':formStore["comment"]}]);
//-------------------------表格page end----------------------------------------

//-------------------------详细页面 end----------------------------------------

    var third_about_help = setViewConfig(warpOption["third_Warp"],null,[{'myCon':myConOption["third_about_help"]}]);
    var third_normal_Info = setViewConfig(warpOption["third_Warp"],null,[{'myCon':myConOption["third_con_clear"]}]);


    //-------------------------商丘模板list   start ----------------------------------------
    var searchList = setViewConfig(warpOption["searchList_Warp"],null,[{"myList":myListOption["searchList"]}]);
    var userInfo = setViewConfig(warpOption["userInfo_Warp"],null,[{'myList':myListOption["userInfo"]}]);
    var dis_list = setViewConfig(warpOption["dis_list_Warp"],null,[{'myList':myListOption["dis_list"]}]);
    var dis_Info_list = setViewConfig(warpOption["dis_Info_list_Warp"],null,[{'myList':myListOption["dis_Info_list"]}]);

    var collect_list = setViewConfig(warpOption["collect_list_Warp"],null,[{'myList':myListOption["collect_list"]}]);
    var collect_info_list  = setViewConfig(warpOption["collect_info_list_Warp"],null,[{'myList':myListOption["collect_info_list"]}]);


    var share_list = setViewConfig(warpOption["share_list_Warp"],null,[{'myList':myListOption["share_list"]}]);

    //-------------------------商丘模板list   end ----------------------------------------


    var floatShare = setViewConfig(warpOption["share_Warp"],null,[  {'myList':myListOption["floatShare"]}]);
    var shareFloat = setViewConfig(warpOption["shareFloat_Warp"],null,[]);

    ChildPageOption = {
        //"shareFloat":shareFloat,
        "menuViewCar":backParStore["menuViewCar"],
        "second_view":backParStore["second_view"],
        "second_list":backParStore["second_list"],
        "third_normal": backParStore["third_normal"],
        //表格page
        "register":register,
        "infoDetail":infoDetail,
        "feedback":feedback,
        "commentFloat":commentFloat,
        "passwordModif":passwordModif,

        //list_page
        "userInfo":userInfo,
        "dis_list":dis_list,
        "dis_Info_list":dis_Info_list,
        "collect_list":collect_list,
        "collect_info_list":collect_info_list,

        //third_page
        "third_about_help":third_about_help,
        "third_normal_Info":third_normal_Info,

    }
//页面的欲加载

    var perDealPage = function(){
        for(var key in ChildPageOption){
            var page = factoryView(ChildPageOption[key]);
            childPageManage[key] = page;
        }
    }



    setTimeout(function(){
        perDealPage();
        var findPageDom = function(index){
            var dom = null;
            if(childPageManage[index]){
                dom = childPageManage[index].dom;
            }
            return dom
        }
        var puginConfig = {
                "third_normal": {
                    "htmlEle":findPageDom("third_normal")
                },
                "register": {
                    "htmlEle":findPageDom("register")
                },
                "userInfo":{
                    "htmlEle":findPageDom("userInfo")
                },
                "dis_list":{
                    "htmlEle":findPageDom("dis_list")
                },
                "dis_Info_list":{
                    "htmlEle":findPageDom("dis_Info_list")
                },
                "collect_list":{
                "htmlEle":findPageDom("collect_list")
                    },
                "third_normal_Info":{
                "htmlEle":findPageDom("third_normal_Info")
              },
            "third_about_help":{
                "htmlEle":findPageDom("third_about_help")
            },
            "collect_info_list":{
                "htmlEle":findPageDom("collect_info_list")
            },
            "infoDetail":{
                "htmlEle":findPageDom("infoDetail")
            },
            "feedback":{
                "htmlEle":findPageDom("feedback")
            },
            "commentFloat":{
                "htmlEle":findPageDom("commentFloat")
            },
            "passwordModif":{
                "htmlEle":findPageDom("passwordModif")
            },


            }

        $.MODE.addConfig("Pugin",puginConfig);
        Pugin.load("third_normal");
        Pugin.load("register");
        Pugin.load("userInfo");
        Pugin.load("dis_list");
        Pugin.load("dis_Info_list");
        Pugin.load("collect_list");
        Pugin.load("collect_info_list");
        Pugin.load("infoDetail");
        Pugin.load("third_about_help");
        Pugin.load("feedback");
        Pugin.load("passwordModif");
        Pugin.load("commentFloat");
    },1000)







//------------------------------
    appConfig = {
        "startConfig": "",
        "bottomConfig":barStore["MainBar"],
        "contentConfig":{"defaultCon":'myNav',
            "layout":[
                { "items":indexPage1},
                { "items":indexPage2 },
                { "items":indexPage3 },
                { "items":indexPage4 },
            ]
        }
    };
}



function shangQiu_dataViewHeight(type,par){
    var  height = null;
    par = par||1;
    switch (type){
        case "dataView":  height = deviceWidth*0.48;break;
        case "channel_dataView":height = deviceWidth*0.32*par;break;
        case "thrid_normal_logo":height = deviceWidth*0.5;break;
        default: height = deviceHeight*0.24;break;;
    };
    return height +"px";
}










