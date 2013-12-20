var pictureSource;      //图片来源
var destinationType;        //设置返回值的格式
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady(){
    // PhoneGap准备就绪，可以使用！
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    navigator.splashscreen.hide();
}

/*// 当成功获得一张照片的Base64编码数据后被调用
    function onPhotoDataSuccess(imageData) {
    
        // 取消注释以查看Base64编码的图像数据
        // console.log(imageData); 
        // 显示拍摄的照片
        // 使用内嵌CSS规则来缩放图片
        document.getElementById("userPhoto").src = "data:image/jpeg;base64," + imageData;
    }*/

// 当成功得到一张照片的URI后被调用
   function onPhotoURISuccess(imageURI) {
        // 显示拍摄的照片
        // 使用内嵌CSS规则来缩放图片
        document.getElementById("userPhoto").src = imageURI;
    }
       
   // “Capture Photo”按钮点击事件触发函数
   function cameraOpen() {
        // 使用设备上的摄像头拍照，并获得Base64编码字符串格式的图像
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,sourceType:Camera.PictureSourceType.CAMERA});
   }

   //“From Photo Library”/“From Photo Album”按钮点击事件触发函数
   function openBrowser(source) {
        // 从设定的来源处获取图像文件URI
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,sourceType: source });
   }


    // 当有错误发生时触发此函数
   function onFail(mesage) {
        alert('Failed because:' + message);
   }


$('#btn_show_welcome').on('tap', J.showWelcome);
$('#section_container').on('pageinit','#index_section',function(){
     J.Refresh({
        selector : '#index_con',
        type : 'both',
        pullText : '正在刷新',
        releaseText : '努力拽吧',
        refreshTip : '',
        pullCallback : function(){
            var scroll = this;
            setTimeout(function () {
                $('#index_con ul.list li').text('我被更新了');
                scroll.refresh();
                J.showToast('更新成功','success');
            }, 2000);
        },
        upCallback : function(){
            var scroll = this;
            setTimeout(function () {
                var html = '';
                for(var i=0;i<10;i++){
                    html += '<li style="color:#E74C3C">我是被拉出来的...</li>'
                }
                $('#index_con ul.list').append(html);
                scroll.refresh();
                J.showToast('加载成功','success');
            }, 2000);
        }
    })
   /* J.Refresh({
        selector : '#index_con',
        type : 'pullDown',
        pullText : '你敢往下拉么...',
        releaseText : '快松开的你的咸猪手！！',
        refreshTip : '使劲往下拽吧，亲',
        callback : function(){
            var scroll = this;
            setTimeout(function () {
                $('#index_con ul.list li').text('擦，我被更新了');
                scroll.refresh();
                J.showToast('更新成功','success');
            }, 2000);
        }
    });
//    最简约的调用方式
    J.Refresh('#index_con','pullUp', function(){
        var scroll = this;
        setTimeout(function () {
            var html = '';
            for(var i=0;i<10;i++){
                html += '<li style="color:#E74C3C">我是被拉出来的...</li>'
            }
            $('#index_con ul.list').append(html);
            scroll.refresh();
            J.showToast('加载成功','success');
        }, 2000);
    })*/

});


$('#section_container').on('articleshow','#h_scroll_article',function(){
    J.Scroll('#h_scroll_demo',{hScroll:true,hScrollbar : false});
})
$('#section_container').on('pageload','#menu_section',function(){
    var asides = J.Page.loadContent('html/custom_aside.html');
    var $asides = $(asides);
    $('#aside_container').append($asides);
});
$('#btn_scan_barcode').on('tap',function(){
    window.plugins.barcodeScanner.scan('all',function(result) {
            if(!result.cancelled){
                J.alert('扫描结果：','结果：'+result.text+'<br>格式：'+result.format);
            }
        }, function(error) {
            J.showToast("扫描失败: " + error,'error');
        }
    );
})
$(function () {
    Jingle.launch({
        showPageLoading : true
    });
})
