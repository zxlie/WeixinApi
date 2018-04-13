微信公众平台Js API（WeixinApi）
=======================================

## 关于WeixinApi
### 1、WeixinApi为何诞生
以前顺便玩儿了下微信公众账号，做Web前端开发的，都对页面脚本充满好奇，所以研究了下，放到[`Blog`](http://www.baidufe.com)上，
也正因为微信官方一直没有放出正式的Api提供给用户来用，所以大量的用户到我blog上去询问`WeixinJSBridge`相关的技术点，索性我就整理了一下，
起个名字叫`WeixinApi`开源到github来，提供给大家使用！

### 2、免责声明
此Api为`非官方`版，由于官方的限制，继续使用此Api还有可能会出现一些意向不到的问题，一切后果请自行承担！

### 3、WeixinApi可能停止更新
目前官方已经出了正式版本的SDK，详情可见[微信JS-SDK说明文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html),
所以大家还是尽早迁移到官方版本吧，这对大家来说是好事，以后出什么问题，官方渠道应该都会第一时间给出解决方案，稳定很多，也不至于经常被黑！
本API可能以后就不会频繁更新了，各位知晓！

## 目录
* [快速使用](#user-content-快速使用)
* [详细Api列表](#user-content-详细api列表)
    * [1、初始化等待分享](#user-content-1初始化等待分享)
    * [2、隐藏右上角option menu入口](#user-content-2隐藏右上角option-menu入口)
    * [3、隐藏底部工具栏](#user-content-3隐藏底部工具栏)
    * [4、获取当前的网络类型](#user-content-4获取当前的网络类型)
    * [5、调起客户端图片播放组件](#user-content-5调起客户端图片播放组件)
    * [6、关掉当前微信公众页面窗口](#user-content-6关掉当前微信公众页面窗口)
    * [7、判断当前网页是否在微信内置浏览器中打开](#user-content-7判断当前网页是否在微信内置浏览器中打开)
    * [8、开启WeixinApi的错误监控](#user-content-8开启weixinapi的错误监控)
    * [9、发送电子邮件](#user-content-9发送电子邮件)
    * [10、禁止用户分享](#user-content-10禁止用户分享)
* [常见问题](#user-content-常见问题)
* [其他](#user-content-其他)

你可以用微信的“扫一扫”来打开下面这个二维码体验一下：

![Weixin Api Demo](/img/2014-06-14_3.47.02.png)

## 快速使用
```javascript
// 定义微信分享的数据
var wxData = {
    "appId": "", // 服务号可以填写appId
    "imgUrl" : 'http://photocdn.sohu.com/20130122/Img364302298.jpg',
    "link" : 'http://www.baidufe.com',
    "desc" : '使用警告：此Api非官方版本，请各位尽量将分享功能迁移至腾讯官方版，会更稳定些！',
    "title" : "欢迎使用WeixinApi"
};

// 分享的回调
var wxCallbacks = {
    // 收藏操作是否触发回调，默认是开启的
    favorite : false,

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
// 自定义分享到：微信好友、朋友圈、腾讯微博、QQ好友
WeixinApi.share(wxData,wxCallbacks);
```

可下载源码，部署sample/sample-new.html进行测试

## 详细Api列表
使用起来比较简单，具体可参考sample/sample-normal.html中的实现

### 1、初始化等待分享
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
        "desc" : '使用警告：此Api非官方版本，请各位尽量将分享功能迁移至腾讯官方版，会更稳定些！',
        "title" : "欢迎使用WeixinApi"
    };

    // 分享的回调
    var wxCallbacks = {
        // 收藏操作不执行回调，默认是开启(true)的
        favorite : false,

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

**分享的数据可以动态修改：**

* 普通模式分享：分享的数据是固定的，代码请参考 [sample/sample-normal.html](https://github.com/zxlie/WeixinApi/blob/master/sample/sample-normal.html)
* 异步模式分享：分享的数据是可以被动态修改的，代码请参考 [sample/sample-async.html](https://github.com/zxlie/WeixinApi/blob/master/sample/sample-async.html)


### 2、隐藏右上角option menu入口
```javascript
WeixinApi.ready(function(Api) {
	// 隐藏
	Api.hideOptionMenu();
	
	// 显示
	// Api.showOptionMenu();
});
```

### 3、隐藏底部工具栏
```javascript
WeixinApi.ready(function(Api) {
	// 隐藏
	Api.hideToolbar();
	
	// 显示
	// Api.showToolbar();
});
```

### 4、获取当前的网络类型
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

### 5、调起客户端图片播放组件
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

### 6、关掉当前微信公众页面窗口
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

### 7、判断当前网页是否在微信内置浏览器中打开
```javascript

	// true or false
	var flag = WeixinApi.openInWeixin();

```

### 8、开启WeixinApi的错误监控
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

### 9、发送电子邮件
```javascript
WeixinApi.sendEmail({
    subject : '邮件标题',
    body : '邮件正文'
},function(resp){
    // 注意这里可不要轻易alert，会卡死的。。。
});
```

### 10、禁止用户分享
```javascript
// 先对Api进行初始化
WeixinApi.ready(function(Api) {
    // 禁止分享
    Api.disabledShare(function(){
        alert('当前页面禁止分享！');
    });
});
```

代码请参考 [sample/sample-normal.html](https://github.com/zxlie/WeixinApi/blob/master/sample/sample-disable.html)

## 常见问题
### 1、用了这个API怎么没生效
如果遇到这种情况，请先回到这里，扫描最上面的 [二维码](#user-content-api能实现什么) Demo，首先验证Demo是否能运行正确；然后再参照demo.html调整自己的代码：

* 1）、`WeixinApi.js`路径是否引用正确
* 2）、`WeixinApi.ready`是否正确执行了？（可以在里面加一个alert，简单粗暴可依赖）
* 3）、开启`WeixinApi.enableDebugMode`方便问题定位

### 2、Android上取消分享依然提示成功
传送门：[为什么分享到朋友圈，取消了依然提示成功？](http://www.baidufe.com/item/4bdcde11a024c63df3af.html)

### 3、想自己做一个按钮直接分享
就我目前了解到的情况来看，是行不通的，官方都有做权限控制，感兴趣可以到这里[去翻一下评论](http://www.baidufe.com/item/f07a3be0b23b4c9606bb.html#content)

### 4、怎样动态修改分享的信息：wxData
用到Api提供的`async:true`配置，具体可阅读[这里的使用介绍](http://www.baidufe.com/item/f07a3be0b23b4c9606bb.html)

### 5、收藏的时候为什么也执行分享的回调了？
请在wxCallbacks中设置`favorite:false`，关闭收藏操作的callback

## 其他
### 1、更多互动
详细的使用场景，还可以到这里获取：http://www.baidufe.com/item/f07a3be0b23b4c9606bb.html

注意：这只是发烧版本，非微信官方出品！有问题可大家一起来讨论，我很乐意与大家一起来完善这个API。


### 3、如果你觉得这个Api对你有用：
![alien-alipay-qrcode-256.png](/img/2014-11-03_21-19-40_5.png)
