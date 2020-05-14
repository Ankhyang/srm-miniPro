/* *
 * 通用公共js库，主要定义api接口，auth apikey 常量值和通用函数
 */

export default {
	fommatetime: function(value) {
		var year = value.substr(0, 4)
		var month = value.substr(5, 2)
		var day = value.substr(8, 2)
		var hour = value.substr(11, 2)
		var min = value.substr(14, 2)

		return year + "年" + month + "月" + day + "日" + hour + "点" + min + "分"
	},
	fommateDate: function(value) {
		var year = value.substr(0, 4)
		var month = value.substr(5, 2)
		var day = value.substr(8, 2)
		var hour = value.substr(11, 2)
		var min = value.substr(14, 2)

		return year + "-" + month + "-" + day
	},
	newDate(str) {
		// debugger
		if (typeof(str) == 'number') {
			return new Date(str);
		} else if (str.indexOf('T') > -1) {
			var arrDatetime = str.split("T");
			var arrDate = arrDatetime[0].split("-");
			var arrTime = arrDatetime[1].split(":");
			return new Date(arrDate[0], Number(arrDate[1]) - 1, arrDate[2], arrTime[0], arrTime[1], arrTime[2].substring(0, 2));
		} else {
			var arrDatetime = str.split(" ");
			var arrDate = arrDatetime[0].split("-");
			var arrTime = arrDatetime[1].split(":");
			return new Date(arrDate[0], Number(arrDate[1]) - 1, arrDate[2], arrTime[0], arrTime[1], arrTime[2].substring(0, 2));
		}
	},
	//时间格式化
	format(time, format) {
		var date = {
			"M+": time.getMonth() + 1,
			"d+": time.getDate(),
			"h+": time.getHours(),
			"m+": time.getMinutes(),
			"s+": time.getSeconds(),
			"q+": Math.floor((time.getMonth() + 3) / 3),
			"S+": time.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	},
	//获取时间问候语
	getGreetings(time) {
		var date = time;
		if (typeof(time) == "string") {
			date = this.newDate(time);
		}
		var times = date.getHours();
		if (times >= 0 && times < 6) {
			return "凌晨"
		}
		if (times >= 6 && times < 9) {
			return "早上"
		}
		if (times >= 9 && times < 11) {
			return "上午"
		}
		if (times >= 11 && times < 13) {
			return "中午"
		}
		if (times >= 13 && times < 17) {
			return "下午"
		}
		if (times >= 17 && times < 19) {
			return "傍晚"
		}
		if (times >= 19 && times < 24) {
			return "晚上"
		}
	},
	//消息时间
	msgTimeDesc(time) {
		if (!time) return "";
		var dateNow = new Date();
		var date = this.newDate(time);
		// date = this.newDate(date.getTime());
		var timeStr = "";
		if (date.getFullYear() < dateNow.getFullYear()) {
			timeStr = this.format(date, "yyyy/MM/dd") + " ";
		} else {
			if (!(date.getMonth() == dateNow.getMonth() && date.getDate() == dateNow.getDate())) {
				var newDate = this.newDate(dateNow.setDate(dateNow.getDate() - 1));
				if (date.getMonth() == newDate.getMonth() && date.getDate() == newDate.getDate()) {
					timeStr = "昨天 ";
				} else {
					timeStr = this.format(date, "MM/dd") + " ";
				}
			}
		}
		if (!timeStr) {
			timeStr += this.getGreetings(date) + " ";
		}
		timeStr += this.format(date, "hh:mm");
		return timeStr;
	},
	parGetData: function(v) {
		if (v.indexOf('obj-') === 0) {
			v = v.slice(4);
			return JSON.parse(v);
		} else {
			if (v.indexOf('str-') === 0) {
				return v.slice(4);
			}
		}
	},

	parSetData: function(v) {
		if (typeof v == 'object') {
			v = JSON.stringify(v);
			v = 'obj-' + v;
		} else {
			v = 'str-' + v;
		}
		return v;
	},

	concat: function(arr, obj) {
		Object.keys(obj).forEach(function(key) {
			arr.push(obj[key])
		});
		return arr;
	},
	//随机字符
	randomString: function(len) {
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (var i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	//获取系统编号
	//system_code的逻辑是这样的。你登录后调用获取当前登录人详情，里面有org_exinfo信息，如果里面包含了"vendor_id"属性，就传：srm_vendor，否则传递：srm
	getSystemCode() {
		let userInfo = uni.getStorageSync('userInfo');
		if (userInfo && userInfo.org_exinfo) {
			if (userInfo.org_exinfo.hasOwnProperty('vendor_id'))
				return 'srm_vendor'; //供应商访问
			else
				return 'srm'; //核心企业访问
		}
		return '';
	},
	//获取附件扩展名
	extension(str) {
		var ext = '';
		var name = str.toLowerCase();
		var i = name.lastIndexOf(".");
		if (i > -1) {
			var ext = name.substring(i + 1); //去掉.
		}
		return ext;
	},
	//金额大写
	changeMoneyToChinese(money) {
		var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字  
		var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位  
		var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位  
		var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位  
		//var cnInteger = "整"; //整数金额时后面跟的字符  
		var cnIntLast = "元"; //整型完以后的单位  
		var maxNum = 999999999999999.9999; //最大处理的数字  

		var IntegerNum; //金额整数部分  
		var DecimalNum; //金额小数部分  
		var ChineseStr = ""; //输出的中文金额字符串  
		var parts; //分离金额后用的数组，预定义  
		if (money == "") {
			return "";
		}
		money = parseFloat(money);
		if (money >= maxNum) {
			$.alert('超出最大处理数字');
			return "";
		}
		if (money == 0) {
			//ChineseStr = cnNums[0]+cnIntLast+cnInteger;  
			ChineseStr = cnNums[0] + cnIntLast
			//document.getElementById("show").value=ChineseStr;  
			return ChineseStr;
		}
		money = money.toString(); //转换为字符串  
		if (money.indexOf(".") == -1) {
			IntegerNum = money;
			DecimalNum = '';
		} else {
			parts = money.split(".");
			IntegerNum = parts[0];
			DecimalNum = parts[1].substr(0, 4);
		}
		if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换  
			let zeroCount = 0;
			let IntLen = IntegerNum.length;
			for (let i = 0; i < IntLen; i++) {
				let n = IntegerNum.substr(i, 1);
				let p = IntLen - i - 1;
				let q = p / 4;
				let m = p % 4;
				if (n == "0") {
					zeroCount++;
				} else {
					if (zeroCount > 0) {
						ChineseStr += cnNums[0];
					}
					zeroCount = 0; //归零  
					ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
				}
				if (m == 0 && zeroCount < 4) {
					ChineseStr += cnIntUnits[q];
				}
			}
			ChineseStr += cnIntLast;
			//整型部分处理完毕  
		}
		if (DecimalNum != '') { //小数部分  
			let decLen = DecimalNum.length;
			for (let i = 0; i < decLen; i++) {
				let n = DecimalNum.substr(i, 1);
				if (n != '0') {
					ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
				}
			}
		}
		if (ChineseStr == '') {
			//ChineseStr += cnNums[0]+cnIntLast+cnInteger;  
			ChineseStr += cnNums[0] + cnIntLast;
		}
		/* else if( DecimalNum == '' ){ 
			                ChineseStr += cnInteger; 
			                ChineseStr += cnInteger; 
			            } */
		return ChineseStr;
	}
}
