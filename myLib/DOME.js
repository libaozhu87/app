/**
 * Created with JetBrains WebStorm.
 * author: zhangHong
 * Date: 13-5-31
 * Time: 下午10:42
 * To change this template use File | Settings | File Templates.
 */
(function ($){
    var modeManage = {};
    var showStyleManage = {"normal":function(){return 0}};
    var closeStyleManage = {"normal":function(){return 0}};
    var beginCssManage = {"normal":{}};

    function manageMode (){
        this.ConfigManage = {};
		this.showTime = 500;
		this.styleManage = {};
    }
    manageMode.prototype ={
        constructor : manageMode,
        /**
         *@author zhanghong
         * @function  设置模块配置
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]config 配置参数
         */
        initConfig : function(config){
            if( typeof config == 'object'){
                for(key in config){
                    this.ConfigManage[key] =config[key];
                }
            }
        },
        addConfig:function(modeName, config){
            var mode = this.ConfigManage[modeName]||{};
            if( typeof config == 'object'){
                for(key in config){
                    mode[key] =config[key];
                }
            }
        },

        applyFilter:function (des,obj,filterArr,bool){
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
         },


        /**
         *@author zhanghong
         * @function  创建模块
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] ModeName 模块名, [String] [styleWay] 模块名的显示方式,默认为normal
         *@return new coreTemplete();
         *
         */
        createMode :function(ModeName,styleWay){
            if(typeof this.ConfigManage[ModeName] != 'undefined'&& !modeManage[ModeName]){
              var  showWay =(showStyleManage[styleWay]&&styleWay)||"normal";
              var  closeWay =(closeStyleManage[styleWay]&&styleWay)||"normal";
                var beginCss =(beginCssManage[styleWay]&&styleWay)||"normal";
                modeManage[ModeName] = {};
                modeManage[ModeName].context = new coreTemplete(ModeName,this.ConfigManage[ModeName],showWay,closeWay,beginCss);
                modeManage[ModeName].itemIndex = 0;
                modeManage[ModeName].showsContainer = {};
                  }
            return (modeManage[ModeName])&&modeManage[ModeName].context
        },

        JqAnimate:function(){
            var showManage =  self.styleManage.showStyle;
            var closeManage =  self.styleManage.closeStyle;
            var beginManage =  self.styleManage.beginStyle;
            for(var key in showManage){
                showStyleManage[key] = function(NUM){
                    return    (function(ele){
                        if(typeof showManage[NUM].opt == "object" ){
                            //setTimeout(function(){
                                ele.css(showManage[NUM].opt);
                            //},100)
                        }
                        //ele.animate(showManage[NUM].opt, showManage[NUM].showTime);

                        return 600;
                    })
                }(key)
            }
            for(var key in closeManage){
                closeStyleManage[key] = function(NUM){
                    return   (function(ele){
                        if(typeof closeManage[NUM].opt == "object" ){
                            //setTimeout(function(){
                                ele.css(closeManage[NUM].opt);
                           // },100)
                        }
                        return 600;
                    })
                }(key)

            }
            if( typeof beginManage == 'object'){
                for(key in beginManage){
                    beginCssManage[key] = beginManage[key].opt;
                }
            }
        },
        /**
         *@author zhanghong
         * @function  设置总体显示方式配置
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]StyleObj 配置参数
         */

        setStyle :function(StyleObj){
            self = this;
            this.styleManage = {"showStyle":{},"closeStyle":{},"beginStyle":{}};
            var showManage =  self.styleManage.showStyle;
            var closeManage =  self.styleManage.closeStyle;
            var beginManage =  self.styleManage.beginStyle;
            if( typeof StyleObj == 'object'){
                for(var key in StyleObj){
                    var styleName = key;
                    var styleNameObj = StyleObj[key];
                    var showTime = 0;
                    for(var newKey in styleNameObj){
                        var value = styleNameObj[newKey];
                        switch(newKey){
                            case "beginCss":
                                beginManage[key]= beginManage[key]||{};
                                beginManage[key]["opt"] = value;
                                break;
                            case "showWay":
                                showManage[key]= showManage[key]||{};
                                showManage[key]["opt"] = value;
                                break;
                            case "colseWay":
                                closeManage[key]= closeManage[key]||{};
                                closeManage[key]["opt"] = value;

                            case "runTime":
                                showTime = value;

                                ; break;
                        }


                    }
                    showManage[key]&&(showManage[key]["showTime"] =showTime||500 );
                    closeManage[key]&&(closeManage[key]["showTime"] =showTime||500 );


                }
                self.JqAnimate();

            }


        },

    }
    function loadScript(src, callback, errorCallback){
        if(!src){
            return callback();
        }
        var scriptEle = document.createElement("script");
        callback = callback || function(){};
        errorCallback = errorCallback || function(){ console.log(src + ' -- load error !'); };
        scriptEle.type = "text/javascript";
        scriptEle.setAttribute("load_type","js");
        scriptEle.setAttribute("charset", "utf-8");
        scriptEle.src = src;
        scriptEle.charset = 'utf-8';
        document.getElementsByTagName("head").item(0).appendChild(scriptEle);
        scriptEle.onload = scriptEle.onreadystatechange = function(){
            if(  !scriptEle.readyState  || scriptEle.readyState=='loaded' || scriptEle.readyState=='complete'){
                callback();
            }
        }
        scriptEle.onerror = function(){
            errorCallback
        };
    }
    function loadCss(src){
        var cssEle = document.createElement('link');
        cssEle.rel = 'stylesheet';
        cssEle.type = 'text/css';
        cssEle.setAttribute("load_type","css");
        cssEle.href = src;
        document.getElementsByTagName('head').item(0).appendChild(cssEle);
    }

    function coreTemplete(currentMode,config,showWay,closeWay,beginCss){
        this.config = config;
        this.target = "";
        this.ModeType = currentMode;
        this.htmlEle = null;
        this.showWay = showWay;
        this.closeWay = closeWay;
        this.isRunNow = false;
        this.loadT = [];//
        this.runedT = {};
        this.beginCss = beginCss
    }
    coreTemplete.prototype = {
        constructor : coreTemplete,//构造函数
        initHtmlTemplete:function(str){
           this.content =$(str);
        },
        getConfigValue : function(itemName, key) {
            if(typeof this.config[itemName][key] != "undefined") {
                return this.config[itemName][key];
            }
            return false;
        },
        /**
         *@author zhanghong
         * @function  加载具体模块的某项配置选项
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] itemName 模块具体选项名, [String] [target] 如果有此参数 则直接加载并且显示,[Every] [par] 显示时运行的参数 [Boolean] [closeMoveOnce] 此次显示是否停止显示方式；
         *@return ;
         *
         */
        load : function (itemName,target,par,closeMoveOnce,showStyleWay,closeStyleWay) {
            var self = this;
            if(self.loadT.indexOf(itemName) == -1) {
                self.loadT.push(itemName);
                self.loadCss(itemName);
                if(target){
                    return   self.loadJs(itemName, function () {
                       return self.show(itemName, target,par,closeMoveOnce,showStyleWay,closeStyleWay);
                    })
                }else{
                    setTimeout(self.loadJs(itemName, function () {
                        self.show(itemName);
                    }), 300)
                }
            }
        },
        loadJs : function(itemName, callback) {
            var urlJs = this.getConfigValue(itemName, 'js');
            return  loadScript(urlJs, callback);
        },
        loadCss : function(itemName){
            var urlCss = this.getConfigValue(itemName, 'css');
            urlCss&&loadCss(urlCss);
        },
        /**
         *@author zhanghong
         * @function  显示具体模块的某项配置选项 
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] itemName 模块具体选项名, [String] target 如果有此参数 则直接加载并且显示,[Every] [par] 显示时需要传递的参数 [Boolean] [closeMoveOnce] 此次显示是否停止显示方式；
         *@return null;
         *
         */

        show : function(itemName, target,par,closeMoveOnce,showStyleWay,closeStyleWay,beginStyleWay){
            var html = null;
            if(!this.runedT[itemName]){//没有加载完成的话
                if(this.loadT.indexOf(itemName) == -1){
                    return  this.load(itemName,target,par,closeMoveOnce,showStyleWay,closeStyleWay);//重新加载
                }else{
                    var initData = this.getConfigValue(itemName, "initData");
                    html = this.htmlEle = this.getConfigValue(itemName, "htmlEle")||"";
                    this.htmlEle.css({position:"absolute"})
                    //this.htmlEle.css({position:"absolute","webkitTransition":"all 0.5s ease"})
					if(initData && typeof initData == 'function'){
                        initData(this.htmlEle);
                        }
                    var showWay = showStyleWay||(this.getConfigValue(itemName, "showWay"))||this.showWay;
                    var closeWay = closeStyleWay||(this.getConfigValue(itemName, "closeWay"))||this.closeWay;
                    var beginCss = beginStyleWay||(this.getConfigValue(itemName, "beginCss"))||this.beginCss;
                    var showObj = new creatShowStylePar(this.target,showWay,closeWay,beginCss,this.itemName,this.ModeType,this.htmlEle);
                    var showInstant = new ShowStyle(showObj)
                    this.runedT[itemName] = showInstant;
					this.isRunNow = (target)?true:false;
                    if(this.isRunNow){
                        return this.run(itemName,target,par,closeMoveOnce);
                    }

                }
            }else{//已经运行过了
                 this.runedT[itemName].htmlEle;
                return this.run(itemName,target,par,closeMoveOnce);

            }
        },
        run :function(itemName,target,par,closeMoveOnce){
            var loadData = this.getConfigValue(itemName, "loadData");

			this.runedT[itemName].target = target;
            var flag = this.runedT[itemName].show(closeMoveOnce);
            if(loadData && typeof loadData == 'function') {
                loadData(par);
            }
            return flag;

        },
        /**
         *@author zhanghong
         * @function  关闭具体模块的某项配置选项
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] itemName 模块具体选项名, [function] [fun] 关闭完成时要调用的函数
         *@return null;
         *
         */
        close : function(itemName, fun){
            if(this.runedT[itemName] && this.runedT[itemName].view){
                 return this.runedT[itemName].close(fun);
            }
        }
    }

       function creatShowStylePar(target,showWay,closeWay,beginCss,itemName,ModeType,htmlEle){
            this.target = target||"";;
            this.showWay = showWay;
            this.closeWay = closeWay;
            this.itemName = itemName||"";
            this.htmlEle = htmlEle||null;
            this.ModeType = ModeType;
           this.beginCss = beginCss
        }
      function ShowStyle(opt){
            var currentMode = modeManage[opt.ModeType];
            this.target = opt.target || null;
            this.htmlEle = opt.htmlEle || null;
            this.showWay = opt.showWay;
            this.closeWay = opt.closeWay;
            this.modeType = opt.ModeType;
            this.itemName = opt.itemName;
			this.beginCss = opt.beginCss;
			this.closeMoveOnce = false;
            this.view = false;
            this.isAppend = false;
            this.myIndex = (currentMode.itemIndex++);
            currentMode.showsContainer[this.myIndex] = this;
            this.currentContainer =currentMode.showsContainer;
        }
        ShowStyle.prototype = {
            show : function(closeMoveOnce){
                var self = this;
                if(!this.view){
                    self.showFun(closeMoveOnce);
                    return true

              }
                return false
            },
            setbeginCss:function(){
                var self = this;
                var cssObj = beginCssManage[self.beginCss];
                if(typeof cssObj =="object"){

                    //setTimeout(function(){
                        self.htmlEle.css(cssObj);
                    //},5)



                }

            },

            showFun : function(closeMoveOnce){
                var self = this;
                var processTime = 0;
                if(!closeMoveOnce){
                    self.setbeginCss();
                }
                self.target.append(self.htmlEle);
/*                if(!self.isAppend){
                    self.target.append(self.htmlEle);
                    self.isAppend = true
                }else{
                    self.htmlEle.show();
                }*/
                setTimeout(function(){
                    self.htmlEle.css({"webkitTransition":"all 0.5s ease"})
                    if(typeof showStyleManage[self.showWay] =="function"&&!closeMoveOnce){
                        processTime = showStyleManage[self.showWay].call(self,self.htmlEle);
                        setTimeout(function(){
                            self.htmlEle.trigger("show");
                        },processTime)
                        self.view =true;
                    }else{
                        self.view =true;
                        self.htmlEle.trigger("show");
                    }
                    self.closeOthers();
                },10)


            },
            close : function(fun){
                var value = this.currentContainer[this.myIndex];
                if(value.view){
                    var outValueArr = [value];
                    this.closeFun(outValueArr, fun);
                }
            },
            closeFun : function(closeArr, overFn){
                var self = this;
                var processTime = 0;
                for(var i = 0; i < closeArr.length; i++){
                    var vaule = closeArr[i];
                    if(typeof closeStyleManage[self.closeWay] =="function"){
                            processTime = closeStyleManage[self.closeWay].call(self,vaule.htmlEle);
                            setTimeout(function(){
                                removeValue.call(self,vaule,overFn)
                            },processTime)
                    }else{
                        removeValue(vaule,overFn)
                    }
                }
                function removeValue(vaule,overFn){
                    vaule.htmlEle.trigger("close");
                    //vaule.htmlEle.hide();
                    var parentEle = vaule.target[0];
                    parentEle.removeChild(vaule.htmlEle[0]);

                    vaule.htmlEle.css({"webkitTransition":"none "})
                    vaule.view = false;
                    if( overFn && typeof overFn == "function"){
                        overFn();
                    }
                };
            },
            closeOthers : function(type){
                var self = this;
                var outValueArr = [];
                for(var key in this.currentContainer){
                    if(key != this.myIndex){
                        var value = this.currentContainer[key];
                        if(value.view && (value.target == this.target)){
                            outValueArr.push(value);
                            self.closeFun(outValueArr);
                          }
                     }
                }
            }
        }
		
   $.MODE  = (function (){
      return  new  manageMode();
    })()	
		

})($)