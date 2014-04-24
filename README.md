微信公众平台Js API（WeixinApi）
=======================================

### 1、API能实现什么？
	1、分享到微信朋友圈
	2、分享给微信好友
	3、分享到腾讯微博
	4、隐藏/显示右上角的菜单入口
	5、隐藏/显示底部浏览器工具栏
	6、获取当前的网络状态
	7、调起微信客户端的图片播放组件

### 2、如何使用？
使用起来比较简单，具体可参考demo.html，如：
```javascript
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
			alert("分享被取消");
		},
		// 分享失败了
		fail : function(resp) {
			// 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
			alert("分享失败");
		},
		// 分享成功
		confirm : function(resp) {
			// 分享成功了，我们是不是可以做一些分享统计呢？
			//window.location.href='http://192.168.1.128:8080/wwyj/test.html';
			alert("分享成功");
		},
		// 整个分享过程结束
		all : function(resp) {
			// 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
			alert("分享结束");
		}
	};

	// 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
	Api.shareToFriend(wxData, wxCallbacks);

	// 点击分享到朋友圈，会执行下面这个代码
	Api.shareToTimeline(wxData, wxCallbacks);

	// 点击分享到腾讯微博，会执行下面这个代码
	Api.shareToWeibo(wxData, wxCallbacks);
});
```

详细的使用场景，可以到这里获取：http://www.baidufe.com/item/f07a3be0b23b4c9606bb.html

注意：这只是发烧版本，非微信官方出品！有问题可大家一起来讨论，我很乐意与大家一起来完善这个API。