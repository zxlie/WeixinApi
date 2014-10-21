微信公众平台Js API（WeixinApi）
=======================================

### 1、API能实现什么？
	1、分享到微信朋友圈
	2、分享给微信好友
	3、分享到腾讯微博
	4、新的分享接口，包含朋友圈、好友、微博的分享（for iOS）
	5、隐藏/显示右上角的菜单入口
	6、隐藏/显示底部浏览器工具栏
	7、获取当前的网络状态
	8、调起微信客户端的图片播放组件
	9、关闭公众平台Web页面
    10、判断当前网页是否在微信内置浏览器中打开
    11、增加打开扫描二维码
    12、支持WeixinApi的错误监控
    13、检测应用程序是否已经安装（需要官方开通权限）

你可以用微信的“扫一扫”来打开下面这个二维码体验一把：

![Weixin Api Demo](http://www.baidufe.com/upload/images/2014-06-14_3.47.02.png)

### 2、如何使用？
使用起来比较简单，具体可参考demo.html中的实现

#### 1）、初始化等待分享
```javascript
// 开发阶段，开启WeixinApi的调试模式
WeixinApi.enableDebugMode();

// 初始化WeixinApi，等待分享
WeixinApi.ready(function(Api) {

    // 微信分享的数据
    var wxData = {
        "appId": "", // 服务号可以填写appId
        "imgUrl" : 'http://www.baidufe.com/fe/blog/static/img/weixin-qrcode-2.jpg',
        "link" : 'http://www.baidufe.com',
        "desc" : '大家好，我是Alien，Web前端&Android客户端码农，喜欢技术上的瞎倒腾！欢迎多交流',
        "title" : "大家好，我是赵先烈"
    };

    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready : function() {
            // 你可以在这里对分享的数据进行重组
            alert("准备分享");
        },
        // 分享被用户自动取消
        cancel : function(resp) {
            // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
            alert("分享被取消，msg=" + resp.err_msg);
        },
        // 分享失败了
        fail : function(resp) {
            // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
            alert("分享失败，msg=" + resp.err_msg);
        },
        // 分享成功
        confirm : function(resp) {
            // 分享成功了，我们是不是可以做一些分享统计呢？
            alert("分享成功，msg=" + resp.err_msg);
        },
        // 整个分享过程结束
        all : function(resp,shareTo) {
            // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
            alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
        }
    };

    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    Api.shareToFriend(wxData, wxCallbacks);

    // 点击分享到朋友圈，会执行下面这个代码
    Api.shareToTimeline(wxData, wxCallbacks);

    // 点击分享到腾讯微博，会执行下面这个代码
    Api.shareToWeibo(wxData, wxCallbacks);

    // iOS上，可以直接调用这个API进行分享，一句话搞定
    Api.generalShare(wxData,wxCallbacks);
});
```

可能有的朋友不知道appId从哪儿获取，请看这里：[如何获取appId](http://jingyan.baidu.com/article/6525d4b12af618ac7c2e9468.html)


#### 2）、隐藏右上角option menu入口
```javascript
WeixinApi.ready(function(Api) {
	// 隐藏
	Api.hideOptionMenu();
	
	// 显示
	// Api.showOptionMenu();
});
```

#### 3）、隐藏底部工具栏
```javascript
WeixinApi.ready(function(Api) {
	// 隐藏
	Api.hideToolbar();
	
	// 显示
	// Api.showToolbar();
});
```

#### 4）、获取当前的网络类型
```javascript
WeixinApi.ready(function(Api) {
	Api.getNetworkType(function(network){
		/**
		 * network取值：
		 *
		 * network_type:wifi     wifi网络
	     * network_type:edge     非wifi,包含3G/2G
	     * network_type:fail     网络断开连接
	     * network_type:wwan     2g或者3g
	     */
	});
});
```

#### 5）、调起客户端图片播放组件
```javascript
WeixinApi.ready(function(Api) {
	// 需要播放的图片src list
	var srcList = [src1, src2, ..., srcN];
	// 选一个作为当前需要展示的图片src
	var curSrc = src1;
	// 调起
	Api.imagePreview(curSrc, srcList);
});
```

调起客户端图片播放组件，还有一种更屌的方法，不需要依赖这个WeixinApi，直接a标签实现就行，具体格式：


	<a href="weixin://viewimage/`YourImageURL`">AnyThing</a>


我们可以用A标签来嵌套这个img，具体Demo如下：

```html
<a href="weixin://viewimage/http://www.baidu.com/img/bdlogo.gif">
	<img src="http://www.baidu.com/img/bdlogo.gif">
</a>
<a href="weixin://viewimage/http://tb2.bdstatic.com/tb/static-common/img/search_logo_big_6a13b553.gif">
	<img src="http://tb2.bdstatic.com/tb/static-common/img/search_logo_big_6a13b553.gif">
</a>
```

#### 6）、关掉当前微信公众页面窗口
```javascript
WeixinApi.ready(function(Api) {	
	// 关闭窗口
    WeixinApi.closeWindow({
        success : function(resp){
            alert('关闭窗口成功！');
        },
        fail : function(resp){
            alert('关闭窗口失败');
        }
    });
});
```

#### 7）、判断当前网页是否在微信内置浏览器中打开
```javascript

	// true or false
	var flag = WeixinApi.openInWeixin();

```

#### 8）、打开扫描二维码
```javascript
WeixinApi.ready(function(Api) {
	// 扫描二维码
    WeixinApi.scanQRCode({
        success : function(resp){
            alert('扫描器已打开！');
        },
        fail : function(resp){
            alert('扫描器无法打开');
        }
    });
});
```

#### 9）、开启WeixinApi的错误监控
注意，这句代码务必放在WeixinApi.ready之前；上线的时候，根据实际需要，可删掉它

```javascript
// 方法1：不带任何参数，将以alert方式提示出错信息
WeixinApi.enableDebugMode();

// 方法2：给一个callback，自己处理错误信息
WeixinApi.enableDebugMode(function(errObj){
    // errObj = {
    //     message : errorMessage,
    //     script : scriptURI,
    //     line : lineNumber,
    //     column : columnNumber
    // }
});

// 当然，你还可以做一件事：把这些错误信息上报到服务器
```

### 3、其他
详细的使用场景，可以到这里获取：http://www.baidufe.com/item/f07a3be0b23b4c9606bb.html

注意：这只是发烧版本，非微信官方出品！有问题可大家一起来讨论，我很乐意与大家一起来完善这个API。

### 4、招聘广告
鄙人目前在美丽说商业产品前端团队，队里缺靠谱的FE，欢迎推荐或自荐：http://www.baidufe.com/item/25ea3376a893619eea8c.html
