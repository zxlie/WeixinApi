/**!
 * 微信内置浏览器的Javascript API，功能包括：
 *
 * 1、分享到微信朋友圈
 * 2、分享给微信好友
 * 3、分享到腾讯微博
 * 4、新的分享接口，包含朋友圈、好友、微博的分享（for iOS）
 * 5、隐藏/显示右上角的菜单入口
 * 6、隐藏/显示底部浏览器工具栏
 * 7、获取当前的网络状态
 * 8、调起微信客户端的图片播放组件
 * 9、关闭公众平台Web页面
 * 10、判断当前网页是否在微信内置浏览器中打开
 * 11、增加打开扫描二维码
 * 12、支持WeixinApi的错误监控
 *
 * @author zhaoxianlie(http://www.baidufe.com)
 */
var WeixinApi = (function () {

    "use strict";

    /**
     * 分享到微信朋友圈
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    appId      公众平台的appId（服务号可用）
     * @p-config    {String}    imgUrl     图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinShareTimeline(data, callbacks) {
        callbacks = callbacks || {};
        var shareTimeline = function (theData) {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.title,
                "title":theData.desc, // 注意这里要分享出去的内容是desc
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    // share_timeline:cancel 用户取消
                    case 'share_timeline:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // share_timeline:confirm 发送成功
                    case 'share_timeline:confirm':
                    case 'share_timeline:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // share_timeline:fail　发送失败
                    case 'share_timeline:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    shareTimeline(newData);
                };
                // 然后就绪
                callbacks.ready && callbacks.ready(argv);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(argv);
                shareTimeline(data);
            }
        });
    }

    /**
     * 发送给微信上的好友
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    appId      公众平台的appId（服务号可用）
     * @p-config    {String}    imgUrl     图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinSendAppMessage(data, callbacks) {
        callbacks = callbacks || {};
        var sendAppMessage = function (theData) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.desc,
                "title":theData.title,
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    // send_app_msg:cancel 用户取消
                    case 'send_app_msg:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // send_app_msg:confirm 发送成功
                    case 'send_app_msg:confirm':
                    case 'send_app_msg:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // send_app_msg:fail　发送失败
                    case 'send_app_msg:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    sendAppMessage(newData);
                };
                // 然后就绪
                callbacks.ready && callbacks.ready(argv);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(argv);
                sendAppMessage(data);
            }
        });
    }

    /**
     * 分享到腾讯微博
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinShareWeibo(data, callbacks) {
        callbacks = callbacks || {};
        var shareWeibo = function (theData) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content":theData.desc,
                "url":theData.link
            }, function (resp) {
                switch (resp.err_msg) {
                    // share_weibo:cancel 用户取消
                    case 'share_weibo:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // share_weibo:confirm 发送成功
                    case 'share_weibo:confirm':
                    case 'share_weibo:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // share_weibo:fail　发送失败
                    case 'share_weibo:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    shareWeibo(newData);
                };
                // 然后就绪
                callbacks.ready && callbacks.ready(argv);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(argv);
                shareWeibo(data);
            }
        });
    }


    /**
     * 新的分享接口
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    appId      公众平台的appId（服务号可用）
     * @p-config    {String}    imgUrl     图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv,shareTo)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp,shareTo)    取消
     * @p-config    {Function}  fail(resp,shareTo)      失败
     * @p-config    {Function}  confirm(resp,shareTo)   成功
     * @p-config    {Function}  all(resp,shareTo)       无论成功失败都会执行的回调
     */
    function weixinGeneralShare(data, callbacks) {
        callbacks = callbacks || {};
        var generalShare = function (general,theData) {

            // 如果是分享到朋友圈，则需要把title和desc交换一下
            if(general.shareTo == 'timeline') {
                var title = theData.title;
                theData.title = theData.desc || title;
                theData.desc = title;
            }

            // 分享出去
            general.generalShare({
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.desc,
                "title":theData.title,
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    // general_share:cancel 用户取消
                    case 'general_share:cancel':
                        callbacks.cancel && callbacks.cancel(resp ,general.shareTo);
                        break;
                    // general_share:confirm 发送成功
                    case 'general_share:confirm':
                    case 'general_share:ok':
                        callbacks.confirm && callbacks.confirm(resp ,general.shareTo);
                        break;
                    // general_share:fail　发送失败
                    case 'general_share:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp ,general.shareTo);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp ,general.shareTo);
            });
        };
        WeixinJSBridge.on('menu:general:share', function (general) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    generalShare(general,newData);
                };
                // 然后就绪
                callbacks.ready && callbacks.ready(general,general.shareTo);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(general,general.shareTo);
                generalShare(general,data);
            }
        });
    }

    /**
     * 加关注（此功能只是暂时先加上，不过因为权限限制问题，不能用，如果你的站点是部署在*.qq.com下，也许可行）
     * @param       {String}    appWeixinId     微信公众号ID
     * @param       {Object}    callbacks       回调方法
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     */
    function addContact(appWeixinId,callbacks){
        callbacks = callbacks || {};
        WeixinJSBridge.invoke("addContact", {
            webtype: "1",
            username: appWeixinId
        }, function (resp) {
            var success = !resp.err_msg || "add_contact:ok" == resp.err_msg || "add_contact:added" == resp.err_msg;
            if(success) {
                callbacks.success && callbacks.success(resp);
            }else{
                callbacks.fail && callbacks.fail(resp);
            }
        })
    }

    /**
     * 调起微信Native的图片播放组件。
     * 这里必须对参数进行强检测，如果参数不合法，直接会导致微信客户端crash
     *
     * @param {String} curSrc 当前播放的图片地址
     * @param {Array} srcList 图片地址列表
     */
    function imagePreview(curSrc,srcList) {
        if(!curSrc || !srcList || srcList.length == 0) {
            return;
        }
        WeixinJSBridge.invoke('imagePreview', {
            'current' : curSrc,
            'urls' : srcList
        });
    }

    /**
     * 显示网页右上角的按钮
     */
    function showOptionMenu() {
        WeixinJSBridge.call('showOptionMenu');
    }


    /**
     * 隐藏网页右上角的按钮
     */
    function hideOptionMenu() {
        WeixinJSBridge.call('hideOptionMenu');
    }

    /**
     * 显示底部工具栏
     */
    function showToolbar() {
        WeixinJSBridge.call('showToolbar');
    }

    /**
     * 隐藏底部工具栏
     */
    function hideToolbar() {
        WeixinJSBridge.call('hideToolbar');
    }

    /**
     * 返回如下几种类型：
     *
     * network_type:wifi     wifi网络
     * network_type:edge     非wifi,包含3G/2G
     * network_type:fail     网络断开连接
     * network_type:wwan     2g或者3g
     *
     * 使用方法：
     * WeixinApi.getNetworkType(function(networkType){
     *
     * });
     *
     * @param callback
     */
    function getNetworkType(callback) {
        if (callback && typeof callback == 'function') {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
                callback(e.err_msg);
            });
        }
    }

    /**
     * 关闭当前微信公众平台页面
     * @param       {Object}    callbacks       回调方法
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  success(resp)   成功
     */
    function closeWindow(callbacks) {
        callbacks = callbacks || {};
        WeixinJSBridge.invoke("closeWindow",{},function(resp){
            switch (resp.err_msg) {
                // 关闭成功
                case 'close_window:ok':
                    callbacks.success && callbacks.success(resp);
                    break;

                // 关闭失败
                default :
                    callbacks.fail && callbacks.fail(resp);
                    break;
            }
        });
    }

    /**
     * 当页面加载完毕后执行，使用方法：
     * WeixinApi.ready(function(Api){
     *     // 从这里只用Api即是WeixinApi
     * });
     * @param readyCallback
     */
    function wxJsBridgeReady(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            var Api = this;
            var wxReadyFunc = function () {
                readyCallback(Api);
            };
            if (typeof window.WeixinJSBridge == "undefined"){
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
                    document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
                }
            }else{
                wxReadyFunc();
            }
        }
    }

    /**
     * 判断当前网页是否在微信内置浏览器中打开
     */
    function openInWeixin(){
        return /MicroMessenger/i.test(navigator.userAgent);
    }

    /*
     * 打开扫描二维码
     * @param       {Object}    callbacks       回调方法
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  success(resp)   成功
     */
    function scanQRCode (callbacks) {
        callbacks = callbacks || {};
        WeixinJSBridge.invoke("scanQRCode",{},function(resp){
            switch (resp.err_msg) {
                // 打开扫描器成功
                case 'scan_qrcode:ok':
                    callbacks.success && callbacks.success(resp);
                    break;

                // 打开扫描器失败
                default :
                    callbacks.fail && callbacks.fail(resp);
                    break;
            }
        });
    }

    /**
     * 开启Api的debug模式，比如出了个什么错误，能alert告诉你，而不是一直很苦逼的在想哪儿出问题了
     * @param    {Function}  callback(error) 出错后的回调，默认是alert
     */
    function enableDebugMode(callback){
        /**
         * @param {String}  errorMessage   错误信息
         * @param {String}  scriptURI      出错的文件
         * @param {Long}    lineNumber     出错代码的行号
         * @param {Long}    columnNumber   出错代码的列号
         */
        window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber) {

            // 有callback的情况下，将错误信息传递到options.callback中
            if(typeof callback === 'function'){
                callback({
                    message : errorMessage,
                    script : scriptURI,
                    line : lineNumber,
                    column : columnNumber
                });
            }else{
                // 其他情况，都以alert方式直接提示错误信息
                var msgs = [];
                msgs.push("额，代码有错。。。");
                msgs.push("\n错误信息：" , errorMessage);
                msgs.push("\n出错文件：" , scriptURI);
                msgs.push("\n出错位置：" , lineNumber + '行，' + columnNumber + '列');
                alert(msgs.join(''));
            }
        }
    }

    return {
        version         :"2.4",
        enableDebugMode :enableDebugMode,
        ready           :wxJsBridgeReady,
        shareToTimeline :weixinShareTimeline,
        shareToWeibo    :weixinShareWeibo,
        shareToFriend   :weixinSendAppMessage,
        generalShare    :weixinGeneralShare,
        addContact      :addContact,
        showOptionMenu  :showOptionMenu,
        hideOptionMenu  :hideOptionMenu,
        showToolbar     :showToolbar,
        hideToolbar     :hideToolbar,
        getNetworkType  :getNetworkType,
        imagePreview    :imagePreview,
        closeWindow     :closeWindow,
        openInWeixin    :openInWeixin,
        scanQRCode      :scanQRCode
    };
})();