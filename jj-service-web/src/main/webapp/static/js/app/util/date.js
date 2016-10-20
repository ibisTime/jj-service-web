define([], function() {
	return {
		// date to str
		format: function(date, pattern) {
			pattern = pattern || 'yyyy-MM-dd';
			/*
			 函数：填充0字符
			 参数：value-需要填充的字符串, length-总长度
			 返回：填充后的字符串
			 */
			var zeroize = function (value, length) {
				if (!length) {
					length = 2;
				}
				value = new String(value);
				for (var i = 0, zeros = ''; i < (length - value.length) ; i++) {
					zeros += '0';
				}
				return zeros + value;
			};

			return pattern.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
				switch ($0) {
					case 'd': return date.getDate();
					case 'dd': return zeroize(date.getDate());
					case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
					case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
					case 'M': return date.getMonth() + 1;
					case 'MM': return zeroize(date.getMonth() + 1);
					case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
					case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
					case 'yy': return new String(date.getFullYear()).substr(2);
					case 'yyyy': return date.getFullYear();
					case 'h': return date.getHours() % 12 || 12;
					case 'hh': return zeroize(date.getHours() % 12 || 12);
					case 'H': return date.getHours();
					case 'HH': return zeroize(date.getHours());
					case 'm': return date.getMinutes();
					case 'mm': return zeroize(date.getMinutes());
					case 's': return date.getSeconds();
					case 'ss': return zeroize(date.getSeconds());
					case 'l': return date.getMilliseconds();
					case 'll': return zeroize(date.getMilliseconds());
					case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
					case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
				}
			});
		},
		
		// str to date
		//parse: function(dateStr, pattern) {
		//	pattern = pattern || 'YYYY-MM-DD HH:mm:ss';
		//	return moment(dateStr, pattern).toDate();
		//},
		
		// one dateformat to another
		//formatStr: function(dateStr, pattern, toPattern) {
		//	toPattern = toPattern || 'YYYY-MM-DD';
		//	return this.format(this.parse(dateStr, pattern), toPattern);
		//},
		
		// get the different number between two date
		//diff: function(endDate, startDate, unit) {
		//	unit = unit || 'days'; // values: 'years', 'months', 'days' ...
		//	var e = moment(endDate);
		//	var s = moment(startDate);
		//	return e.diff(s, unit);
		//},
		
		// add number according base date
		//add: function(date, number, unit, pattern) {
		//	unit = unit || 'days';
		//	pattern = pattern || 'YYYY-MM-DD';
		//	moment(date).add(number, unit).format(pattern);
		//},
		
		/**
         * @param hisTime 历史时间戳
         * @param nowTime 当前时间戳
         * @returns {string} 直接显示
         */
        ago: function(hisTime, nowTime) {
            var now =nowTime ? nowTime : new Date().getTime(),
                diffValue = now - hisTime,
                result='',
                minute = 1000 * 60,
                hour = minute * 60,
                day = hour * 24,
                halfamonth = day * 15,
                month = day * 30,
                year = month * 12,

                _year = diffValue/year,
                _month =diffValue/month,
                _week =diffValue/(7*day),
                _day =diffValue/day,
                _hour =diffValue/hour,
                _min =diffValue/minute;

            if(_year>=1) result=parseInt(_year) + "年前";
            else if(_month>=1) result=parseInt(_month) + "个月前";
            else if(_week>=1) result=parseInt(_week) + "周前";
            else if(_day>=1) result=parseInt(_day) +"天前";
            else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
        },

		countDown: function(time) {
			var days = Math.floor(time / 86400);
			if (days) {
				var remainder = time % 86400;
				if (remainder) {
					var hours = Math.floor(remainder / 3600);
					if (hours) {
						return '还剩'+ days + '天' + hours + '小时';
					} else {
						return '还剩'+ days + '天';
					}
				} else {
					return '还剩'+ days + '天';
				}
			} else {
				var hours = Math.floor(time / 3600);
				if (hours) {
					return '还剩'+ hours + '小时';
				} else {
					var minutes = Math.floor(time / 60);
					if (minutes) {
						return '还剩'+ minutes + '分';
					} else {
						return '还剩' + time + '秒';
					}
				}
			}
		}
	};
});