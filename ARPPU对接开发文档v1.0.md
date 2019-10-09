# ARPPU对接开发文档v1.0


[TOC]



## 1 文档说明

### 1.1 适应范围
ARPPU.CN移动游戏智能运营决策平台，为开发者提供玩家全网画像、前置分级、流失预警、所需要物品特价折扣等数据赋能和算法赋能的服务，旨在通过赋能，为开发者精细化运营游戏、提升玩家付费率和LTV提供全方位的决策输出支持。
本文档适用于游戏通过服务器API对接的方式将数据接入到ARPPU。



### 1.2 概念说明
为了能够在接入过程中保持概念的统一，针对一些通用的概念做如下说明
设备：指某一台安装了游戏的终端，如iPhone Xs、OnePlus 7、Huawei P30 Pro等。
账号：指玩家在同一游戏中的唯一标识，ARPPU会以上报的user_id+server_id+role_id拼成玩家的账号来处理数据，如果这3个条件不能标识唯一性，请在user_id字段进行唯一化处理后再上报。



## 2 接入方法

### 2.1 申请AppID
打开 <http://www.arppu.cn> 成功注册登录后，点击右上角头像小图标后，再点击“App管理”-“添加App”后即可添加App，添加成功后会获得一个32位16进制的AppID及secretKey，用来唯一识别您刚添加的App。为了保证您的数据安全，请勿将AppID及secretKey泄露给他人。



### 2.2 服务器地址
 <http://api.arppu.cn> 



### 2.3 参数说明
文档中必填的参数是必须要有数值的，否则数据无法上报成功。

所有请求统一用UTF-8编码，请求方式用post。

**签名算法：MD5(app_id@timestamp@secretKey)**

部分枚举类的参数中没有您要上报的数值时，请与我们提前联系进行添加，以便对接上报。



### 2.4 其它说明
玩家设备信息、年龄、性别、等级、充值、消费等数据，都是人工智能做出决策所要学习的重要数据，上报这些数据将有助于ARPPU对玩家画像、流失预测、购买推荐等决策更有效和精准，从而让ARPPU对运营工具的帮助最大化。

随着ARPPU提供更多的决策输出，系统需要获取更多的数据输入让AI来进行学习，让决策更精准。本说明文档会不断更新迭代，请开发者及时关注。



## 3 接口说明

### 3.1接口通用参数
ARPPU API接口分为上报接口和返回接口两部分，事件上报与返回通过不同的接口进行区分。
通用的上报参数有统一格式和字段，每一个上报接口都需要按要求上报才可成功。
不同的接口可能会附加不同的事件参数，会在各个接口说明中单独列出。事件参数需与通用参数一起上报。

通用上报参数：

| 参数          | 必填        | 类型   | 说明                                                         |
| ------------- | ----------- | ------ | ------------------------------------------------------------ |
| 通用字段-上报 |             |        |                                                              |
| app_id        | 是          | string | 创建产品时获得的32位字符长度的AppID                          |
| user_id       | 是          | string | 账号标识识，支持英文、数字、下划线                           |
| user_name     | 否          | string | 账号名称，该值不存在时请传user_id                            |
| server_id     | 是          | string | 游戏服务器ID，如果分服务器请设置，如果不分则设置为1          |
| server_name   | 否          | string | 服务器名称                                                   |
| role_id       | 是          | string | 角色标识，支持英文、数字、下划线，该值不存在时请传user_id    |
| role_name     | 否          | string | 角色名称(昵称)，使用广告过滤服务时必填，该值不存在时请传user_name |
| timestamp     | 是          | long   | 事件产生时间的13位时间戳，时间戳为秒时需乘以1000转成毫秒     |
| signature     | 是          | string | 本次请求的签名，签名算法：MD5(app_id@timestamp@secretKey)    |
| context       | 是          | object | 有关用户的信息，包含以下参数                                 |
| {             |             |        |                                                              |
| device_id     | 是          | string | iOS：内容填写idfa的值。Android：内容填写imei的值，无则填写android_id的值取值 |
| idfa          | IOS必填     | string | 广告标示符                                                   |
| idfv          | 否          | string | Vindor标示符                                                 |
| imei          | Android必填 | string | 手机唯一识别码                                               |
| android_id    | Android必填 | string | 手机唯一识别码                                               |
| mac           | Android必填 | string | 手机Mac地址                                                  |
| network       | 否          | string | 网络制式：2G、3G、4G、5G、WIFI                               |
| resolution    | 是          | string | 分辨率                                                       |
| op            | 否          | string | 运营商，例如：中国移动(CMCC)、中国联通(CUCC)、中国电信(CTCC) |
| ip            | 是          | string | 客户端IPV4，与IPV6二选一必填                                 |
| ipv6          | 是          | string | 客户端IPV6，与IPV4二选一必填                                 |
| tz            | 是          | string | 时区，默认+8                                                 |
| manufacturer  | 是          | string | 设备品牌                                                     |
| ryos          | 是          | string | 设备是Android还是iOS系统                                     |
| ryosversion   | 否          | string | 设备系统的版本，例如：10.1.2，请务必只传版本号，不要附加其他内容，如version |
| rydevice_type | 是          | string | 设备类型如iphone6s、sansung-GT9300                           |
| country       | 是          | string | 用户国家的代码，由ISO 3166-1定义的三位国家代码，例如：CHN中国。如果未定义“IP”参数，则需要使用该参数。如果设置了“IP”，则“Country”参数将被忽略。 |
| locale        | 是          | string | 发生地点，由RFC 1766定义的用户设备的区域设置。它用于选择推送通知的语言 |
| platform      | 是          | enum   | 用户设备的平台，允许的值为：Android、iOS、MacOSX、UWP、web   |
| store         | 是          | enum   | 用户安装的应用商店，允许的值为：AmazonStore、AppleAppStore、Facebook、GooglePlay、Kongregate、MacAppStore、WindowsStore、Odnoclassniki、SamsungApps、SFRPixtel、VK、Apkpure、Blackmart、F-Droid、AppSales、Aptoide、1MobileMarket、Uptodown、9Apps、Myapp、360、Baidu、Huawei、Xiaomi、Vivo、Oppo、Wandoujia、Anzhi、91、Meizu、Leshi、OnePlus、Liqu、CoolPad、Lenovo、ZTE、Taptap、Other。您的值不存在时请联系我们为您添加 |
| app_version   | 否          | string | app版本，例如：1.0.0                                         |
| }             |             |        |                                                              |

以充值接口为请求示例：

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "app_id": "AEC2A3135BD243BD8F717D187D05C4A8", \ 
   "user_id": "89918001102", \ 
   "user_name": "", \
   "server_id": "10", \ 
   "server_name": "逍遥岛", \ 
   "role_id": "1", \ 
   "role_name": "龙骑战士", \ 
   "timestamp": 1568261457387, \ 
   "signature": "F8F3D5C3E1CC4D80BBE985CB0C330C44", \ 
   "context": { \ 
     "device_id": "86325403890211157", \
     "idfa": "", \ 
     "idfv": "", \ 
     "imei": "86325403890211157", \ 
     "android_id": "93cba5be2210b8c1", \ 
     "mac": "20:82:c0:2d:b5:c6", \ 
     "network": "4g", \ 
     "resolution": "1560*720", \ 
     "op": "cmcc", \ 
     "ip": "39.156.69.79", \ 
     "ipv6": "2001:0DB8:0000:0023:0008:0800:200C:417A", \ 
     "tz": "utc+8" \ 
     "manufacturer": "iphone", \ 
     "ryos": "android", \ 
     "ryosversion": "10.1.2", \ 
     "rydevice_type": "iphone6s", \      
     "country": "chn", \ 
     "locale": "0804", \ 
     "platform": "android", \ 
     "store": "huawei", \ 
     "app_version": "1.0.0", \ 
   }, \ 
   "what": { \ 
     "transaction_id":"20190912121057090001", \ 
     "payment_type":"alipay", \ 
     "currency_type":"cny", \ 
     "currency_amount":680, \ 
     "coin_amount":200, \ 
     "inapp_name":"product_1", \ 
     "inapp_amount":2 \ 
 } \ 
 }' 'http://api.arppu.cn/receive/purchase'
```



### 3.2注册/receive/register

在玩家注册游戏时，记录玩家的注册数据，具体记录账号的时机和位置由开发者自己来决定，每一次注册发送且仅发送一次register。

注册事件无特殊参数上报，与通用上报参数一致。



### 3.3登录/receive/login

玩家每次登录到游戏时上报，记录玩家的登录数据。

登录事件无特殊参数上报，与通用上报参数一致。



### 3.4充值/receive/purchase

玩家充值游戏币或直充购买物品时上报；为保证数据准确性，请在完成交易后上报。

充值事件上报：

| 参数            | 必填 | 类型   | 说明                                                         |
| --------------- | ---- | ------ | ------------------------------------------------------------ |
| what            | 是   | object | 事件信息                                                     |
| {               |      |        |                                                              |
| transaction_id  | 是   | String | 交易流水号，请确保唯一                                       |
| payment_type    | 是   | String | 支付类型，允许的值为：支付宝(alipay)、银联(unionpay)、微信支付(weixinpay)、易宝支付(yeepay)。您的值不存在时请联系我们为您添加 |
| currency_type   | 是   | String | 货币类型，按照国际标准组织ISO 4217中规范的3位字母，例如：CNY人民币、USD美元 |
| currency_amount | 是   | int    | 支付的金额，单位：分。如果单位是元，请乘以100                |
| coin_amount     | 是   | int    | 通过充值获得游戏币的总数量，例如：200                        |
| inapp_name      | 是   | String | 充值购买游戏币包的ID，例如：product_1                        |
| inapp_amount    | 是   | int    | 充值购买游戏币包的数量，例如：2                              |
| ｝              |      |        |                                                              |

 请求示例：

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "app_id": "string", \ 
   "user_id": "string", \ 
   "user_name": "string", \
   "server_id": "string", \ 
   "server_name": "string", \ 
   "role_id": "string", \ 
   "role_name": "string", \ 
   "timestamp": 0, \ 
   "signature": "string", \ 
   "context": { \ 
     "device_id": "string", \
     "idfa": "string", \ 
     "idfv": "string", \ 
     "imei": "string", \ 
     "android_id": "string", \ 
     "mac": "string", \ 
     "network": "string", \ 
     "resolution": "string", \ 
     "op": "string", \ 
     "ip": "string", \ 
     "ipv6": "string", \ 
     "tz": "string" \ 
     "manufacturer": "string", \ 
     "ryos": "string", \ 
     "ryosversion": "string", \ 
     "rydevice_type": "string", \      
     "country": "string", \ 
     "locale": "string", \ 
     "platform": "string", \ 
     "store": "string", \ 
     "app_version": "string", \ 
   }, \ 
   "what": { \ 
     "transaction_id":"string", \ 
     "payment_type":"string", \ 
     "currency_type":"string", \ 
     "currency_amount":"string", \ 
     "coin_amount":"string", \ 
     "inapp_name":"string", \ 
     "inapp_amount":"string" \ 
 } \ 
 }' 'http://api.arppu.cn/receive/purchase'
```



### 3.5玩家详情/deliver/profile

要获取针对某个玩家的信息时，发起请求，玩家详情信息会在返回参数中下发。

上报参数与通用上报参数相同，无特殊事件参数。

详情返回：

| 参数            | 必填 | 类型   | 说明                                                         |
| --------------- | ---- | ------ | ------------------------------------------------------------ |
| app_id          | 是   | string | 创建产品时获得的32位字符长度的AppID                          |
| user_id         | 是   | string | 账号唯一标识，支持英文、数字、下划线                         |
| user_name       | 否   | string | 账号名称                                                     |
| server_id       | 是   | string | 游戏服务器ID，不分服时值为1                                  |
| server_name     | 否   | string | 服务器名称                                                   |
| role_id         | 是   | string | 角色唯一标识                                                 |
| role_name       | 否   | string | 角色名称(昵称)                                               |
| group           | 是   | string | 分组                                                         |
| revenue         | 是   | number | 累计充值金额，单位：分，如需展示为元，请除以100              |
| timestamp       | 是   | long   | 返回参数时服务器时间的13位时间戳                             |
| profile         | 是   | object | 玩家详情信息                                                 |
| {               |      |        |                                                              |
| country         | 是   | String | 用户国家的代码，由ISO   3166-1定义的三位国家代码，例如：CHN中国 |
| platform        | 是   | enum   | 用户设备的平台，允许的值为：Android、iOS、MacOSX、UWP、web   |
| store           | 是   | String | 用户安装应用的应用商店                                       |
| reg_time        | 是   | string | 玩家注册时间                                                 |
| last_login_time | 是   | string | 玩家最后登录时间                                             |
| potential       | 是   | object | 高潜玩家预测数据                                             |
| {               |      |        |                                                              |
| pay_potential   |      | string | 玩家是高潜力玩家的预测结果code和概率rate，预测结果0表示非高潜力玩家，1表示是高潜力玩家；概率是0-1之间的值。例如：{"code":"1","rate":"93.22"} |
| }               |      |        |                                                              |
| {               |      |        |                                                              |
| loss_7day       | 是   | string | 玩家的7日流失预测结果code和概率rate，预测结果0表示不会流失，1表示会流失；流失概率是0-1之间的值。例如：{"code":"1","rate":"89.55"} |
| }｝             |      |        |                                                              |

 返回示例：

```
{
	"code": 200,
	"message": "ok",
	"data": {
	    "app_id": "AEC2A3135BD243BD8F717D187D05C4A8",
	    "user_id": "89918001102",
	    "user_name": "",
	    "server_id": "10",
	    "server_name": "逍遥岛",
	    "role_id": "1",
	    "role_name": "龙骑战士",
	    "group":"4728",
	    "revenue":680,
	    "timestamp": 1568270389120,
		"profile": {
			"country": "chn",
			"platform": "android",
			"store": "huawei",
			"reg_time": "1568261457387",
			"last_login_time": "1568269387124",
			"potential": {
				"pay_potential": {
					"code": "1",
					"rate": "93.22"
				}
			},
			"loss": {
				"loss_7day": {
					"code": "1",
					"rate": "89.55"
				}
			}
		}
	}
}
```

